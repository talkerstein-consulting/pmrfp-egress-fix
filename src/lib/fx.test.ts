import { describe, expect, it } from "vitest";
import { parseBocRate } from "./fx";
import { toUsd } from "./markets";
import { parseMarketCookie } from "./visitor-geo";

describe("parseBocRate", () => {
  it("flips the Bank of Canada's CAD-per-USD rate into USD per CAD", () => {
    const json = { observations: [{ d: "2026-09-30", FXUSDCAD: { v: "1.3900" } }] };
    expect(parseBocRate(json)).toEqual({ usdPerCad: 0.7194, date: "2026-09-30" });
  });
  it("rejects missing or absurd values", () => {
    expect(parseBocRate({})).toBeNull();
    expect(parseBocRate({ observations: [{ d: "2026-09-30", FXUSDCAD: { v: "abc" } }] })).toBeNull();
    expect(parseBocRate({ observations: [{ d: "2026-09-30", FXUSDCAD: { v: "13.9" } }] })).toBeNull();
  });
});

describe("toUsd", () => {
  it("converts CAD prices to whole U.S. dollars", () => {
    expect(toUsd(249, 0.7194)).toBe(179);
    expect(toUsd(29, 0.7194)).toBe(21);
    expect(toUsd(599, 0.7194)).toBe(431);
  });
});

describe("parseMarketCookie", () => {
  it("accepts only US or CA", () => {
    expect(parseMarketCookie("US")).toBe("US");
    expect(parseMarketCookie("ca")).toBe("CA");
    expect(parseMarketCookie("FR")).toBeNull();
    expect(parseMarketCookie(undefined)).toBeNull();
  });
});
