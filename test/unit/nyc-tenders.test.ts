import { describe, expect, it } from "vitest";
import rows from "./fixtures/nyc-solicitations.json";
import { classifyNyc, dedupeNyc, nycTitle, nycToRfpInsert, type NycRow } from "@/lib/tenders/nyc";
import { publicTenderSource } from "@/lib/tenders/sources";

const T = "2026-09-28";
const byId = (id: string) => (rows as NycRow[]).find((r) => r.request_id === id)!;

describe("NYC current solicitations", () => {
  it("tidies titles: drops routing codes and bid numbers", () => {
    expect(nycTitle("SMD_A&CM_RFQ #517985 - Elevator Rehabilitation at Cassidy Lafayette/Woodson Houses")).toBe(
      "Elevator Rehabilitation at Cassidy Lafayette/Woodson Houses",
    );
    expect(nycTitle("02201602-Cumberland IDF MDF Upgrade")).toBe("Cumberland IDF MDF Upgrade");
    expect(nycTitle("Harlem Hospital_Ron Brown Cooling Tower Replacement")).toBe(
      "Harlem Hospital – Ron Brown Cooling Tower Replacement",
    );
    expect(nycTitle("Correction: Roof Replacement at P.S. 12")).toBe("Roof Replacement at P.S. 12");
  });

  it("keeps building work, maps trade, deadline and region", () => {
    expect(classifyNyc(byId("20260904017"), T)).toEqual(["elevator-services", "general-contracting"]);
    expect(classifyNyc(byId("20260902028"), T)).toEqual(["hvac"]);
    expect(classifyNyc(byId("20260821033"), T)).toEqual(["roofing"]);
    expect(nycToRfpInsert(byId("20260821033"), T)!.title).toBe(
      "IDIQ Contract for Annual Cleaning and Inspection of Gravity Roof Tanks at Various NYCHA Buildings, Citywide",
    );
    expect(classifyNyc({ ...byId("20260902028"), due_date: "9999-09-09T00:00:00.000" }, T)).toEqual([]);
    expect(classifyNyc({ ...byId("20260902028"), short_title: "Cancellation: Cooling Tower Replacement" }, T)).toEqual([]);
    const i = nycToRfpInsert(byId("20260904017"), T)!;
    expect(i.deadline).toBe("2026-10-08");
    expect(i.province).toBe("New York");
    expect(i.source_url).toBe("https://a856-cityrecord.nyc.gov/RequestDetail/20260904017");
    expect(i.slug).toMatch(/^elevator-rehabilitation.*-nyc-20260904017$/);
    expect(i.published_at).toBe("2026-09-10T00:00:00Z");
    expect(i.contact_email).toBeNull();
    expect(publicTenderSource(i.slug)).toMatchObject({ key: "nyc", past: false });
  });

  it("drops goods, concessions, testing services and closed notices", () => {
    expect(classifyNyc(byId("20260825027"), T)).toEqual([]); // Mack trucks
    expect(classifyNyc(byId("20260904021"), T)).toEqual([]); // snack bar concession
    expect(classifyNyc(byId("20260903029"), T)).toEqual([]); // asbestos testing
    expect(classifyNyc(byId("20260902028"), "2026-12-01")).toEqual([]);
  });

  it("keeps the newest notice per PIN", () => {
    const a = { ...byId("20260902028"), request_id: "1", start_date: "2026-09-01" };
    const b = { ...byId("20260902028"), request_id: "2", start_date: "2026-09-20" };
    expect(dedupeNyc([a, b]).map((r) => r.request_id)).toEqual(["2"]);
  });
});
