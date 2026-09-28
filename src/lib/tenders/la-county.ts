/**
 * Los Angeles County open solicitations → PMRFP public-tender feed.
 *
 * LA County's bid site publishes "a CSV file with a list of open
 * solicitations" (linked from the public Open Bid List, no login). One
 * request a day. The CSV has one row per commodity code, so a solicitation
 * with three codes appears three times — rows are merged by bid number.
 *
 * Kept: service and construction solicitations whose title or commodity
 * description names building or facility work. Pure supply orders
 * ("Commodity"), software, medical and social-service calls are dropped.
 *
 * Pure apart from fetchLaCountyOpenBids(); the cron route owns the writes.
 */
import type { TenderInsert } from "./canadabuys";
import { CIVIL, EXCLUDE, RULES, clean, slugify } from "./shared";
import { parseCsv } from "./csv";
import { TENDER_UA } from "./florida-vbs";
import { LA_COUNTY_ATTRIBUTION } from "./us-state-sources";

export const LA_COUNTY_CSV_URL = "https://camisvr.co.la.ca.us/LACoBids/Download/Rpt_Listing/OpenBidList.csv";

export type LaCountyRow = Record<string, string>;

export interface LaCountyBid {
  url: string;
  docId: string;
  number: string;
  title: string;
  type: string;
  department: string;
  description: string;
  commodities: string[];
  openDate: string | null;
  /** YYYY-MM-DD, or null for a continuous (always-open) solicitation. */
  closing: string | null;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
}

/** "09/30/2026 12:00PM" → "2026-09-30"; "Continuous" → null. */
export function laDate(s: string | undefined): string | null {
  const m = (s ?? "").trim().match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  return m ? `${m[3]}-${m[1]}-${m[2]}` : null;
}

/** Excel-style `="20468"` cells → `20468`. */
function cell(s: string | undefined): string {
  return clean((s ?? "").replace(/^="?|"$/g, ""));
}

/** Merge the CSV's one-row-per-commodity-code layout into one bid each. */
export function mergeLaCountyRows(rows: LaCountyRow[]): LaCountyBid[] {
  const byNumber = new Map<string, LaCountyBid>();
  for (const r of rows) {
    const url = (r["Bid URL"] ?? "").trim();
    const docId = url.match(/biddocidi=(\d+)/i)?.[1] ?? "";
    const number = cell(r["Bid Number"]);
    if (!docId || !number) continue;
    const commodity = cell(r["Commodity Description"]);
    const prior = byNumber.get(number);
    if (prior) {
      if (commodity && !prior.commodities.includes(commodity)) prior.commodities.push(commodity);
      continue;
    }
    byNumber.set(number, {
      url,
      docId,
      number,
      title: cell(r["Bid Title"]).replace(/\s+/g, " "),
      type: cell(r["Bid Type"]),
      department: cell(r["Department"]),
      description: cell(r["Bid Description"]),
      commodities: commodity ? [commodity] : [],
      openDate: laDate(r["Open Date"]),
      closing: laDate(r["Closing Date"]),
      contactName: cell(r["Contact Name"]),
      contactPhone: cell(r["Contact Phone"]),
      contactEmail: cell(r["Contact Email"]),
    });
  }
  return [...byNumber.values()];
}

// Commodity descriptions that mark a call as work a building trade does.
const TRADE_COMMODITY =
  /roofing|building maint|building construction|remodel|alteration|janitorial|custodial|house cleaning|window cleaning|landscap|grounds|tree|pest|plumbing service|electrical (service|maint|work)|hvac|air condition|heating|elevator|fire (alarm|sprinkler|protection)|painting|flooring|carpet|fenc|asbestos|mold|glazing|door|parking lot|paving|concrete|masonry|waterproof|demolition|snow|waste|security system/i;
const LA_EXCLUDE =
  /software|subscription|brand only|brand specific|medical|hospital|psychiatr|psycholog|mental health|youth|social|insurance|staffing|legal|golf|tennis center|vehicle|automotive|airport|turbine|aircraft|airplane|vessel|laboratory|scanner|computer|network|firearm|canine|cremation|investigat|training|consult|engineering|geotechnical|architect|event|transportation|shuttle|channel clearing/i;

const SUPPLY = /products?\b|supplies|supply\b|equipment|\bparts\b|materials?\b|\bkits?\b/i;

/** PMRFP trade-category slugs (max 3), or [] to skip. */
export function classifyLaCounty(b: LaCountyBid, today: string): string[] {
  if (!/service|construction/i.test(b.type)) return [];
  if (b.closing && b.closing < today) return [];
  const title = b.title.toLowerCase();
  if (!title || EXCLUDE.test(title) || LA_EXCLUDE.test(title) || CIVIL.test(title)) return [];
  const commodities = b.commodities.join(" | ").toLowerCase();
  const byTitle = RULES.filter(([, p]) => p.test(title)).map(([slug]) => slug);
  // A "Commodity / Service" call must be for the service, not a product order.
  if (/commodity/i.test(b.type) && (SUPPLY.test(title) || (!byTitle.length && !TRADE_COMMODITY.test(commodities)))) return [];
  const byCode = TRADE_COMMODITY.test(commodities)
    ? RULES.filter(([, p]) => p.test(commodities)).map(([slug]) => slug)
    : [];
  return [...new Set(byTitle.length ? byTitle : byCode)].slice(0, 3);
}

function titleCase(s: string): string {
  // The County types most titles in capitals: "ROOF REPAIR - FS 73 - JOB WALK".
  if (s !== s.toUpperCase()) return s;
  return s.toLowerCase().replace(/\b([a-z])/g, (c) => c.toUpperCase()).replace(/\b(Fs|Amd|Hvac|La|Jcod)\b/g, (w) => w.toUpperCase());
}

export function laCountyToRfpInsert(b: LaCountyBid, today: string): TenderInsert | null {
  if (!b.url || !b.title) return null;
  const title = titleCase(b.title.replace(/\s*-\s*amd\s*#?\s*\d+\s*$/i, ""));
  const shortTitle = title.length > 180 ? `${title.slice(0, 177)}…` : title;
  const department = b.department || "Los Angeles County";
  const description = b.description && b.description.toUpperCase() !== b.title.toUpperCase() ? b.description : "";
  const summaryBase = description.length > 20 ? description : shortTitle;
  const yesterday = new Date(Date.parse(`${today}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);
  return {
    title: shortTitle,
    slug: `${slugify(title).slice(0, 60)}-lacb-${b.docId}`.replace(/-+/g, "-"),
    summary: `Los Angeles County, California. ${summaryBase.length > 240 ? `${summaryBase.slice(0, 237).trimEnd()}…` : summaryBase}`,
    scope: [description || title, b.commodities.length ? `Commodity codes: ${b.commodities.join("; ")}.` : ""]
      .filter(Boolean)
      .join("\n\n")
      .slice(0, 8000),
    requirements: b.closing ? null : "Continuous solicitation — qualified vendors can apply at any time.",
    province: "California",
    deadline: b.closing,
    submission_instructions:
      `This is a public Los Angeles County solicitation (${b.number}, ${department}). Bids go to the County ` +
      "as the official notice specifies — open it for documents, addenda and job-walk dates. PMRFP does not manage this bid.",
    contact_name: b.contactName || null,
    contact_email: b.contactEmail || null,
    contact_phone: b.contactPhone || null,
    contact_visibility: "public_contact",
    source_type: "public_source",
    source_url: b.url,
    source_notes: `LA County ${b.number} · ${department}. ${LA_COUNTY_ATTRIBUTION}`,
    status: "published",
    is_demo: false,
    published_at: !b.openDate || b.openDate >= yesterday ? `${today}T00:00:00Z` : `${b.openDate}T00:00:00Z`,
  };
}

export async function fetchLaCountyOpenBids(signal?: AbortSignal): Promise<LaCountyBid[]> {
  const res = await fetch(LA_COUNTY_CSV_URL, { cache: "no-store", signal, headers: { "User-Agent": TENDER_UA } });
  if (!res.ok) throw new Error(`LA County open bids fetch failed: HTTP ${res.status}`);
  const text = await res.text();
  if (!text.startsWith("Bid URL") && !text.slice(1).startsWith("Bid URL")) {
    throw new Error("LA County open bids: unexpected response (not the CSV)");
  }
  return mergeLaCountyRows(parseCsv(text));
}
