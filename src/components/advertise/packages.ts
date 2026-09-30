/**
 * Sponsorship packages sold on /advertise. Prices are CAD, billed monthly;
 * paying yearly is 10 months (two free). A sold package is delivered as an
 * entry in lib/sponsors/registry.ts, scoped to its trades. A paid sponsor
 * needs a higher score than the house sponsors (Cleverpays, Talkerstein,
 * Maple: 1–3) so it holds its slot instead of rotating with them.
 */
import type { Locale } from "@/i18n/config";
import type { ClientMessages } from "@/i18n/dictionaries";
import { formatNumber } from "@/i18n/format";

// No Region Spotlight yet: the sponsor registry matches trades, not regions,
// so a region package couldn't be delivered as sold.
export type SponsorPackageId = "trade" | "founding";

export interface SponsorPackage {
  id: SponsorPackageId;
  name: string;
  monthly: number;
  summary: string;
  features: string[];
  /** Short scarcity or terms line under the price. */
  note?: string;
}

/** Months billed when paying for a year up front. */
export const ANNUAL_MONTHS_BILLED = 10;

export const SPONSOR_PACKAGES: SponsorPackage[] = [
  {
    id: "trade",
    name: "Trade Spotlight",
    monthly: 149,
    summary: "One trade, everywhere it shows up on PMRFP.",
    features: [
      "That trade's pages, in every region",
      "Its tender and RFP pages, beside the scope",
      "Dashboards of members in that trade",
      "That trade's daily match emails",
      "Monthly click report",
    ],
  },
  {
    id: "founding",
    name: "Founding Partner",
    monthly: 399,
    summary: "The whole board, for the first three partners.",
    features: [
      "Every trade and every region",
      "The weekly tender digest email",
      "Named as a founding partner on PMRFP",
      "Price locked for 12 months",
      "Monthly click report",
    ],
    note: "3 partners only",
  },
];

export function sponsorPackage(id: string): SponsorPackage | undefined {
  return SPONSOR_PACKAGES.find((p) => p.id === id);
}

/** "$149" in English, "149 $" in French, "$149" / "$1,490" in Spanish (U.S. style). */
export const cad = (n: number, lang: Locale = "en") =>
  lang === "es"
    ? `$${formatNumber(n, lang)}`
    : lang === "en"
      ? `$${n.toLocaleString("en-CA")}`
      : `${formatNumber(n, lang)} $`;

/**
 * Name, summary, features and note in the visitor's language (English text
 * is the same as SPONSOR_PACKAGES; translations in messages/partnersClient).
 */
export function packageCopy(p: SponsorPackage, t: ClientMessages["partnersClient"]): Omit<SponsorPackage, "id" | "monthly"> {
  const c = t.packages[p.id];
  return { name: c.name, summary: c.summary, features: c.features, note: c.note || undefined };
}

/**
 * Signed founding partners, shown on /advertise once there are any. Add one
 * here when the contract is signed (logo goes in /public/logos).
 */
export const FOUNDING_PARTNERS: { name: string; url: string; logo: string }[] = [];
