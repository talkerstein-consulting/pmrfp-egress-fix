import { describe, expect, it } from "vitest";
import {
  AVAILABILITY,
  AVAILABILITY_LABEL,
  FREE_CONTACTS_PER_MONTH,
  canContactTalent,
  contactsLeft,
  monthStart,
  normalizeTalentHandle,
  parseTickets,
  personJsonLd,
  tagSlug,
  talentProfileSchema,
  yearsLabel,
} from "@/lib/talent/rules";

describe("talent", () => {
  it("normalizes handles to a safe web address", () => {
    expect(normalizeTalentHandle("Sam Técher")).toBe("sam-techer");
    expect(normalizeTalentHandle("  --Joe_Plumber 2-- ")).toBe("joe-plumber-2");
    expect(normalizeTalentHandle("ab")).toBeNull();
    expect(normalizeTalentHandle("edit")).toBeNull();
    expect(normalizeTalentHandle("!!!")).toBeNull();
    expect(normalizeTalentHandle("x".repeat(60))).toHaveLength(40);
  });

  it("gives free companies 3 contacts a month and Trade Pro unlimited", () => {
    expect(FREE_CONTACTS_PER_MONTH).toBe(3);
    expect(canContactTalent(2, false)).toBe(true);
    expect(canContactTalent(3, false)).toBe(false);
    expect(canContactTalent(99, true)).toBe(true);
    expect(contactsLeft(1, false)).toBe(2);
    expect(contactsLeft(5, false)).toBe(0);
    expect(contactsLeft(5, true)).toBeNull();
  });

  it("counts contacts from the 1st of the month", () => {
    expect(monthStart(new Date("2026-09-28T15:00:00Z"))).toBe("2026-09-01T00:00:00.000Z");
  });

  it("labels every availability in plain words", () => {
    expect(AVAILABILITY.map((a) => AVAILABILITY_LABEL[a])).toEqual(["Available now", "Open to offers", "Not looking"]);
    expect(tagSlug("open_to_offers")).toBe("open-to-offers");
  });

  it("splits typed tickets and drops duplicates", () => {
    expect(parseTickets("309A, G2; whmis\nWHMIS,, Working  at Heights")).toEqual(["309A", "G2", "whmis", "Working at Heights"]);
  });

  it("writes years of experience", () => {
    expect(yearsLabel(1)).toBe("1 year");
    expect(yearsLabel(12)).toBe("12 years");
    expect(yearsLabel(null)).toBe("");
  });

  it("validates the profile form", () => {
    const base = {
      handle: "sam",
      displayName: "Sam Tech",
      primaryTrade: "electrical",
      region: "toronto",
      availability: "available_now",
      published: true,
      contactVisible: false,
    };
    expect(talentProfileSchema.safeParse(base).success).toBe(true);
    expect(talentProfileSchema.safeParse({ ...base, availability: "maybe" }).success).toBe(false);
    expect(talentProfileSchema.safeParse({ ...base, employmentTypes: ["full_time", "gig"] }).success).toBe(false);
  });

  it("builds Person markup with no contact details", () => {
    const ld = personJsonLd({
      name: "Sam Tech",
      headline: null,
      trade: "Electrical",
      city: "Vaughan",
      province: "Ontario",
      country: "CA",
      certifications: ["309A"],
      url: "https://pmrfp.com/talent/sam-tech",
    });
    expect(ld["@type"]).toBe("Person");
    expect(ld.jobTitle).toBe("Electrical");
    expect(JSON.stringify(ld)).not.toMatch(/email|telephone/);
  });
});
