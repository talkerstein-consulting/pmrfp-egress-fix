/**
 * New York City "Current Solicitations" → PMRFP public-tender feed.
 *
 * NYC Open Data (Socrata dataset 3khw-qi8f) mirrors every procurement notice
 * published in The City Record — the City's official journal — refreshed
 * daily, free to reuse under the NYC Open Data terms of use. One SoQL query
 * pulls only open solicitations (a few hundred rows), so this is one small
 * JSON request a day, not scraping.
 *
 * Kept: construction and non-human-services solicitations naming building
 * work (NYCHA elevator rehabs, hospital cooling towers, roof tanks, park
 * building repairs). Dropped: goods, human services, design/consulting and
 * civil infrastructure. Each listing links to its City Record notice.
 */
import type { TenderInsert } from "./canadabuys";
import { CIVIL, EXCLUDE, RULES, clean, slugify } from "./shared";
import { NYC_ATTRIBUTION } from "./sources";

export const NYC_DATASET_URL = "https://data.cityofnewyork.us/resource/3khw-qi8f.json";
export const NYC_NOTICE_URL = "https://a856-cityrecord.nyc.gov/RequestDetail/";
export const TENDER_INDEXER_UA = "PMRFP tender indexer (+https://pmrfp.com/about)";

export type NycRow = Record<string, string | undefined>;

const CATEGORIES = new Set([
  "Construction/Construction Services",
  "Construction Related Services",
  "Services (other than human services)",
  "Goods and Services",
]);

/**
 * "SMD_A&CM_RFQ #517985 - Elevator Rehabilitation at …" → "Elevator Rehabilitation at …".
 * "02201602-Cumberland IDF MDF Upgrade" → "Cumberland IDF MDF Upgrade". "Correction: …" loses the prefix.
 */
export function nycTitle(raw: string): string {
  let t = clean(raw).replace(/\s+/g, " ");
  t = t.replace(/^(correction|bid extension|re-?bid)\s*:\s*/i, "");
  // Internal routing codes: "SMD_A&CM_RFQ #517934", "SMD_Services_", "SMPD_PS_RFP 523121_".
  t = t.replace(/^[A-Z]{2,}(?:_(?:Services|Construction|Goods|[A-Z&]+)(?![a-z]))+(?:\s*#?\s*[\d, ]+)?\s*[-–_:]?\s*/, "");
  // Leading PIN / EPIN / bid numbers: "02201602-", "85727B0020-2700009-", "HWS2026K-".
  t = t.replace(/^(?:(?:EPIN\s*)?[A-Z]*\d[A-Z0-9]*\s*-\s*)+/, "");
  // A lone code token: "84126MBTR741 Retrofit…", "BEDC-C547B: Shaft…", "BWT-WI-323 Reconstruction…".
  t = t.replace(/^(?!(?:19|20)\d\d\b)(?=[A-Z0-9-]*\d)[A-Z0-9][A-Z0-9-]{3,}:?\s+(?=[A-Za-z])/, "");
  // Some feeds cut the title's head off: "OF COLD FLUID APPLIED … ROOFING SYSTEM".
  t = t.replace(/^of\s+/i, "");
  t = t.replace(/^(?:bid|rfp|rfq|rfx)\s*#?\s*\d+\s*[-–:]\s*/i, "");
  t = t.replace(/^[\s,:;|–—_-]+/, "").replace(/_/g, " – ").trim();
  if (!t) return clean(raw);
  t = t.charAt(0).toUpperCase() + t.slice(1);
  return t.length > 180 ? `${t.slice(0, 177).trimEnd()}…` : t;
}

function stripHtml(html: string): string {
  return clean(
    html
      .replace(/<\/(p|div|li|br)>|<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&#39;|&rsquo;|&lsquo;/g, "'")
      .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
      .replace(/\u001a/g, "'")
      .replace(/[ \t]+/g, " ")
      .replace(/ *\n */g, "\n"),
  );
}

// Concessions (a park snack bar, an amusement park "renovation, operation and
// maintenance") are operator deals; wastewater plants, tunnels and traffic
// signals are civil works; sampling/analysis is consulting.
const NYC_SKIP =
  /concession|snack bar|caf[eé]\b|restaurant|food service|operation,? and maintenance of an?\b|wwtp|wastewater|tunnel|signali[sz]ed|traffic signal|sampling|analysis/;
const SUPPLY_ONLY = /supply (and|&) delivery of|\bsupplies\b/;

/** PMRFP trade slugs (max 3), or [] to skip. */
export function classifyNyc(r: NycRow, today: string): string[] {
  if ((r.type_of_notice_description ?? "") !== "Solicitation") return [];
  if (!CATEGORIES.has(r.category_description ?? "")) return [];
  const due = (r.due_date ?? "").slice(0, 10);
  // Standing lists carry placeholder dates (2040-12-31, 9999-09-09): not a real bid window.
  const horizon = new Date(Date.parse(`${today}T00:00:00Z`) + 400 * 86_400_000).toISOString().slice(0, 10);
  if (!due || due < today || due > horizon) return [];
  if (/cancel/i.test(r.short_title ?? "")) return [];
  const title = nycTitle(r.short_title ?? "").toLowerCase();
  if (title.length < 12 || EXCLUDE.test(title) || CIVIL.test(title) || NYC_SKIP.test(title)) return [];
  if (SUPPLY_ONLY.test(title) && !/install|repair|services?\b|maintenance/.test(title)) return [];
  return RULES.filter(([, p]) => p.test(title)).map(([slug]) => slug).slice(0, 3);
}

export function nycToRfpInsert(r: NycRow, today: string): TenderInsert | null {
  const id = (r.request_id ?? "").trim();
  const raw = clean(r.short_title ?? "");
  if (!/^\d{6,}$/.test(id) || !raw) return null;
  const title = nycTitle(raw);
  const agency = clean(r.agency_name ?? "") || "the City of New York";
  const pin = clean(r.pin ?? "");
  const body = stripHtml(r.additional_description_1 ?? "");
  const description = body.length > 20 ? body : title;
  const posted = (r.start_date ?? "").slice(0, 10);
  const yesterday = new Date(Date.parse(`${today}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);
  return {
    title,
    slug: `${slugify(title).slice(0, 60)}-nyc-${id}`.replace(/-+/g, "-"),
    summary: `New York, NY. ${description.length > 240 ? `${description.slice(0, 237).trimEnd()}…` : description}`,
    scope: description.slice(0, 8000),
    requirements: clean(r.selection_method_description ?? "") || null,
    province: "New York",
    deadline: (r.due_date ?? "").slice(0, 10) || null,
    submission_instructions:
      `This is a public City of New York solicitation issued by ${agency}${pin ? ` (PIN ${pin})` : ""}. ` +
      "Responses go to the agency as the City Record notice specifies (most NYC bids are submitted through " +
      "PASSPort). Open the official notice for documents, addenda and pre-bid dates. PMRFP does not manage this bid.",
    // Named buyer contacts stay on the official notice.
    contact_name: null,
    contact_email: null,
    contact_phone: null,
    contact_visibility: "public_contact",
    source_type: "public_source",
    source_url: `${NYC_NOTICE_URL}${id}`,
    source_notes: `NYC City Record ${id}${pin ? ` · PIN ${pin}` : ""} · ${agency}. ${NYC_ATTRIBUTION}`,
    status: "published",
    is_demo: false,
    published_at: !posted || posted >= yesterday ? `${today}T00:00:00Z` : `${posted}T00:00:00Z`,
  };
}

/** A PIN can have several notices (original + corrections): keep the newest. */
export function dedupeNyc(rows: NycRow[]): NycRow[] {
  const best = new Map<string, NycRow>();
  for (const r of rows) {
    const key = (r.pin ?? "").trim().toUpperCase() || (r.request_id ?? "");
    const prior = best.get(key);
    if (!prior || (r.start_date ?? "") > (prior.start_date ?? "")) best.set(key, r);
  }
  return [...best.values()];
}

export async function fetchNycSolicitations(today: string): Promise<NycRow[]> {
  const q = new URLSearchParams({
    $where: `type_of_notice_description='Solicitation' AND due_date >= '${today}'`,
    $limit: "2000",
    $order: "start_date DESC",
  });
  const res = await fetch(`${NYC_DATASET_URL}?${q}`, {
    cache: "no-store",
    headers: { "User-Agent": TENDER_INDEXER_UA, Accept: "application/json" },
    signal: AbortSignal.timeout(25_000),
  });
  if (!res.ok) throw new Error(`NYC solicitations fetch failed: HTTP ${res.status}`);
  return dedupeNyc((await res.json()) as NycRow[]);
}
