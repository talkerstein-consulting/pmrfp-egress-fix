import { z } from "zod";
import { EMPLOYMENT_TYPES } from "@/lib/jobs/rules";

/**
 * PMRFP Talent: tradespeople with a public profile employers can find.
 * Pure rules here; reads in ./data, writes in ./actions and /api/talent/contact.
 */

export const AVAILABILITY = ["available_now", "open_to_offers", "not_looking"] as const;
export type Availability = (typeof AVAILABILITY)[number];

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  available_now: "Available now",
  open_to_offers: "Open to offers",
  not_looking: "Not looking",
};

/** Common Canadian tickets, offered as quick picks on the edit form. */
export const COMMON_TICKETS = [
  "309A",
  "313A",
  "306A",
  "G2",
  "G3",
  "WHMIS",
  "Working at Heights",
  "First Aid / CPR",
  "Confined Space",
  "Fall Protection",
  "Red Seal",
  "Forklift",
] as const;

/** Messages a company without Trade Pro can send to workers each month. */
export const FREE_CONTACTS_PER_MONTH = 3;

export function canContactTalent(sentThisMonth: number, pro: boolean): boolean {
  return pro || sentThisMonth < FREE_CONTACTS_PER_MONTH;
}

export function contactsLeft(sentThisMonth: number, pro: boolean): number | null {
  return pro ? null : Math.max(0, FREE_CONTACTS_PER_MONTH - sentThisMonth);
}

/** First moment of the current calendar month (UTC), for counting contacts. */
export function monthStart(now: Date = new Date()): string {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
}

const HANDLE = /^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$/;
const RESERVED = new Set(["edit", "new", "admin", "api", "pmrfp", "settings", "talent", "search", "jobs", "help", "about"]);

/** Lower-case, dash-separated, 3–40 chars; null when it can't be made valid or is reserved. */
export function normalizeTalentHandle(raw: string): string | null {
  const h = raw
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/, "");
  return HANDLE.test(h) && !RESERVED.has(h) ? h : null;
}

/** Tickets typed as "309A, G2; WHMIS" → ["309A", "G2", "WHMIS"], deduped, capped. */
export function parseTickets(raw: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const t of raw.split(/[,;\n]/)) {
    const v = t.trim().replace(/\s+/g, " ").slice(0, 60);
    if (!v || seen.has(v.toLowerCase())) continue;
    seen.add(v.toLowerCase());
    out.push(v);
  }
  return out.slice(0, 30);
}

/** "12 years", "1 year", "" when not given. */
export function yearsLabel(years: number | null): string {
  if (years == null) return "";
  return `${years} year${years === 1 ? "" : "s"}`;
}

/** GHL tag suffix: "open_to_offers" → "open-to-offers". */
export function tagSlug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export const talentProfileSchema = z.object({
  handle: z.string().trim().min(1, "Pick a web address for your profile."),
  displayName: z.string().trim().min(2, "Add your name.").max(80),
  headline: z.string().trim().max(140).optional().default(""),
  primaryTrade: z.string().trim().min(1, "Pick your main trade."),
  otherTrades: z.array(z.string()).max(8).default([]),
  region: z.string().trim().min(1, "Pick your region."),
  city: z.string().trim().max(80).optional().default(""),
  yearsExperience: z.coerce.number().int().min(0).max(60).optional(),
  tickets: z.string().max(2000).optional().default(""),
  availability: z.enum(AVAILABILITY, "Pick your availability."),
  employmentTypes: z.array(z.enum(EMPLOYMENT_TYPES)).max(EMPLOYMENT_TYPES.length).default([]),
  payExpectation: z.string().trim().max(80).optional().default(""),
  bio: z.string().trim().max(3000).optional().default(""),
  phone: z.string().trim().max(30).optional().default(""),
  published: z.boolean(),
  contactVisible: z.boolean(),
});

export const talentContactSchema = z.object({
  handle: z.string().trim().min(3).max(40),
  message: z.string().trim().min(20, "Tell them a little about the job.").max(2000),
});

export const endorsementSchema = z.object({
  handle: z.string().trim().min(3).max(40),
  note: z.string().trim().min(10, "Write a sentence or two.").max(600),
});

export interface PersonForJsonLd {
  name: string;
  headline: string | null;
  trade: string | null;
  city: string | null;
  province: string | null;
  country: "CA" | "US";
  certifications: string[];
  url: string;
}

/** schema.org Person. No contact details. */
export function personJsonLd(p: PersonForJsonLd): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    url: p.url,
    ...(p.trade ? { jobTitle: p.trade } : {}),
    ...(p.headline ? { description: p.headline } : {}),
    ...(p.city || p.province
      ? {
          address: {
            "@type": "PostalAddress",
            ...(p.city ? { addressLocality: p.city } : {}),
            ...(p.province ? { addressRegion: p.province } : {}),
            addressCountry: p.country,
          },
        }
      : {}),
    ...(p.certifications.length
      ? { hasCredential: p.certifications.map((c) => ({ "@type": "EducationalOccupationalCredential", name: c })) }
      : {}),
  };
}
