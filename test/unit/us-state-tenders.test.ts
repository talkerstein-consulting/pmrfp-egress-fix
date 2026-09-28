import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { classifyFloridaVbs, floridaVbsToRfpInsert, type FloridaAd } from "@/lib/tenders/florida-vbs";
import { classifyLaCounty, laCountyToRfpInsert, laDate, mergeLaCountyRows } from "@/lib/tenders/la-county";
import { parseCsv } from "@/lib/tenders/csv";
import { publicTenderSource } from "@/lib/tenders/sources";

const TODAY = "2026-09-28";
const fixture = (name: string) => readFileSync(join(__dirname, "fixtures", name), "utf8");

describe("Florida Vendor Bid System", () => {
  const ads = JSON.parse(fixture("florida-vbs-open.json")) as FloridaAd[];
  const byTitle = (t: string) => ads.find((a) => a.title.includes(t))!;

  it("keeps open building-trade bids", () => {
    expect(classifyFloridaVbs(byTitle("Statewide Roof Maintenance"), TODAY)).toEqual(["roofing"]);
    expect(classifyFloridaVbs(byTitle("Janitorial Services- Caldwell"), TODAY)).toEqual(["cleaning-janitorial"]);
    expect(classifyFloridaVbs(byTitle("HVAC Chiller Overhauls"), TODAY)).toContain("hvac");
  });

  it("drops non-biddable notices, addenda, forestry and equipment purchases", () => {
    expect(classifyFloridaVbs(byTitle("Museum Stairs"), TODAY)).toEqual([]); // agency decision
    expect(classifyFloridaVbs(byTitle("Janitorial Services- Ft"), TODAY)).toEqual([]); // informational notice
    expect(classifyFloridaVbs(byTitle("Addendum 1"), TODAY)).toEqual([]);
    expect(classifyFloridaVbs(byTitle("Thunder Hollow"), TODAY)).toEqual([]);
    expect(classifyFloridaVbs(byTitle("Weiler"), TODAY)).toEqual([]);
  });

  it("drops closed bids", () => {
    expect(classifyFloridaVbs(byTitle("Statewide Roof Maintenance"), "2027-01-01")).toEqual([]);
  });

  it("maps to a row linking the official notice, labelled as Florida", () => {
    const ad = byTitle("Statewide Roof Maintenance");
    const ins = floridaVbsToRfpInsert(ad, TODAY)!;
    expect(ins.source_url).toBe(`https://vendor.myfloridamarketplace.com/search/bids/detail/${ad.advertisementId}`);
    expect(ins.slug).toMatch(new RegExp(`-flvbs-${ad.advertisementId}$`));
    expect(ins.province).toBe("Florida");
    expect(ins.deadline).toBe("2026-12-31");
    expect(publicTenderSource(ins.slug).key).toBe("florida-vbs");
  });
});

describe("LA County open bids", () => {
  const bids = mergeLaCountyRows(parseCsv(fixture("la-county-open-bids.csv")));
  const byTitle = (t: string) => bids.find((b) => b.title.includes(t))!;

  it("parses dates and continuous solicitations", () => {
    expect(laDate("09/30/2026 12:00PM")).toBe("2026-09-30");
    expect(laDate("Continuous")).toBeNull();
  });

  it("merges one-row-per-commodity-code into one bid", () => {
    const numbers = bids.map((b) => b.number);
    expect(new Set(numbers).size).toBe(numbers.length);
  });

  it("keeps building-trade services", () => {
    expect(classifyLaCounty(byTitle("ROOF REPAIR - CAMP 11"), TODAY)).toEqual(["roofing"]);
    expect(classifyLaCounty(byTitle("COMMERCIAL BUILDING MAINTENANCE"), TODAY)).toContain("property-maintenance");
  });

  it("drops product orders, IT and professional services", () => {
    expect(classifyLaCounty(byTitle("PLUMBING PRODUCTS"), TODAY)).toEqual([]);
    expect(classifyLaCounty(byTitle("KODAK"), TODAY)).toEqual([]);
    expect(classifyLaCounty(byTitle("Psychological"), TODAY)).toEqual([]);
  });

  it("maps to a row linking the official notice, labelled as LA County", () => {
    const bid = byTitle("ROOF REPAIR - CAMP 11");
    const ins = laCountyToRfpInsert(bid, TODAY)!;
    expect(ins.source_url).toBe(bid.url);
    expect(ins.title).toBe("Roof Repair - Camp 11 - Job Walk");
    expect(ins.slug).toMatch(new RegExp(`-lacb-${bid.docId}$`));
    expect(ins.province).toBe("California");
    expect(publicTenderSource(ins.slug).key).toBe("la-county");
  });
});
