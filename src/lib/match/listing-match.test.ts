import { describe, expect, it } from "vitest";
import { areaChain, rankMatches, type MatchCandidate, type RegionNode } from "./listing-match";

const REGIONS: RegionNode[] = [
  { id: "ca", name: "Canada", province: null, country: "Canada", parentId: null },
  { id: "on", name: "Ontario", province: "Ontario", country: "Canada", parentId: "ca" },
  { id: "gta", name: "Greater Toronto Area", province: "Ontario", country: "Canada", parentId: "on" },
  { id: "to", name: "Toronto", province: "Ontario", country: "Canada", parentId: "gta" },
  { id: "ott", name: "Ottawa", province: "Ontario", country: "Canada", parentId: "on" },
  { id: "us", name: "United States", province: null, country: "USA", parentId: null },
  { id: "fl", name: "Florida", province: "Florida", country: "USA", parentId: "us" },
];

const co = (slug: string, o: Partial<MatchCandidate> = {}): MatchCandidate => ({
  slug,
  name: slug,
  kind: "trade",
  categories: ["Roofing"],
  regions: [],
  province: null,
  verified: false,
  featured: false,
  ...o,
});

const toronto = { categories: ["Roofing"], regionName: "Toronto", province: "Ontario", market: "CA" as const };

describe("areaChain", () => {
  it("walks from the listing's region up to the country", () => {
    expect(areaChain(toronto, REGIONS).map((r) => r.name)).toEqual(["Toronto", "Greater Toronto Area", "Ontario", "Canada"]);
  });
  it("falls back to province and country when the region is unknown", () => {
    expect(areaChain({ regionName: "Nowhere", province: "Ontario", market: "CA" }, REGIONS).map((r) => r.name)).toEqual([
      "Ontario",
      "Canada",
    ]);
  });
});

describe("rankMatches", () => {
  it("keeps only companies that do the trade and cover the area, closest coverage first", () => {
    const ranked = rankMatches(
      toronto,
      [
        co("national", { regions: ["Canada"] }),
        co("province", { regions: ["Ontario"] }),
        co("local", { regions: ["Toronto"] }),
        co("gta", { regions: ["Greater Toronto Area"] }),
        co("ottawa-only", { regions: ["Ottawa"] }),
        co("wrong-trade", { regions: ["Toronto"], categories: ["Plumbing"] }),
      ],
      REGIONS,
    );
    expect(ranked.map((m) => m.company.slug)).toEqual(["local", "gta", "province", "national"]);
    expect(ranked[0]).toMatchObject({ trade: "Roofing", area: "Toronto" });
  });

  it("ranks paid placements first, then verified, among relevant companies", () => {
    const ranked = rankMatches(
      toronto,
      [co("local", { regions: ["Toronto"] }), co("featured", { regions: ["Ontario"], featured: true }), co("verified", { regions: ["Toronto"], verified: true })],
      REGIONS,
    );
    expect(ranked.map((m) => m.company.slug)).toEqual(["featured", "verified", "local"]);
  });

  it("matches trades case-insensitively and uses the base province when no service area is listed", () => {
    const ranked = rankMatches(toronto, [co("based-on", { categories: ["roofing"], province: "Ontario" }), co("based-qc", { province: "Quebec" })], REGIONS);
    expect(ranked.map((m) => m.company.slug)).toEqual(["based-on"]);
    expect(ranked[0].area).toBe("Ontario");
  });

  it("keeps Canada-wide companies off U.S. listings", () => {
    const florida = { categories: ["Roofing"], regionName: "Florida", province: "Florida", market: "US" as const };
    const ranked = rankMatches(florida, [co("canada", { regions: ["Canada"] }), co("us", { regions: ["United States"] })], REGIONS);
    expect(ranked.map((m) => m.company.slug)).toEqual(["us"]);
  });

  it("drops excluded companies and returns nothing without trades", () => {
    expect(rankMatches(toronto, [co("sponsor", { regions: ["Toronto"], name: "Sponsor Co" })], REGIONS, { exclude: ["sponsor co"] })).toEqual([]);
    expect(rankMatches({ ...toronto, categories: [] }, [co("x", { regions: ["Toronto"] })], REGIONS)).toEqual([]);
  });

  it("orders equal scores the same way every time for a given listing", () => {
    const list = ["a", "b", "c", "d"].map((s) => co(s, { regions: ["Toronto"] }));
    const first = rankMatches(toronto, list, REGIONS, { seed: "rfp-1" }).map((m) => m.company.slug);
    const again = rankMatches(toronto, [...list].reverse(), REGIONS, { seed: "rfp-1" }).map((m) => m.company.slug);
    expect(again).toEqual(first);
  });
});
