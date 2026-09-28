/**
 * Florida Vendor Bid System (MyFloridaMarketPlace) → PMRFP public-tender feed.
 *
 * The VBS public search (vendor.myfloridamarketplace.com/search/bids) is an
 * Angular app backed by an unauthenticated JSON endpoint — the same one the
 * page calls, no login or token ("pub" routes). State solicitation notices
 * are public records. One daily run = 1 count + ~2 page requests.
 *
 * Kept: open Invitations to Bid / to Negotiate and Requests for Proposals
 * whose title names building or facility work. Agency decisions, grants and
 * informational notices are not biddable and are dropped.
 *
 * Pure apart from fetchFloridaVbsOpenBids(); the cron route owns the writes.
 */
import type { TenderInsert } from "./canadabuys";
import { CIVIL, EXCLUDE, RULES, clean, slugify } from "./shared";
import { FL_VBS_ATTRIBUTION } from "./us-state-sources";

export const FL_VBS_API = "https://vendor.myfloridamarketplace.com/mfmp/pub/search/bids";
export const FL_VBS_NOTICE_URL = "https://vendor.myfloridamarketplace.com/search/bids/detail/";
export const TENDER_UA = "PMRFP tender indexer (+https://pmrfp.com/about)";

export interface FloridaAd {
  advertisementId: number;
  agencyAdNumber?: string | null;
  type: string;
  title: string;
  status: string;
  openDate?: string | null;
  closeDate?: string | null;
  publishDate?: string | null;
  agency?: string | null;
}

const BIDDABLE = new Set(["Invitation to Bid", "Invitation to Negotiate", "Request for Proposals"]);

// Florida's state lands post a lot of forestry and habitat work that the
// shared rules would read as "landscaping" or "fencing".
const FL_EXCLUDE =
  /timber|prescribed (burn|fire)|burning|wetland|habitat|invasive|forest|wma\b|wildlife management|revegetation|re-?nourishment|mitigation credit|site prep|planting|harvesting|muck|canal|erosion|\bweir\b|seeds?\b|purchase of|trucks?\b|motor grader|vessel|incident scene|equipment|lift station|infiltration basin/i;

function date10(s: string | null | undefined): string {
  return (s ?? "").slice(0, 10);
}

function titleOf(ad: FloridaAd): string {
  return clean(ad.title || "")
    .replace(/^(public announcement for|invitation to bid:?)\s*/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** PMRFP trade-category slugs (max 3), or [] to skip. */
export function classifyFloridaVbs(ad: FloridaAd, today: string): string[] {
  if (ad.status !== "OPEN" || !BIDDABLE.has(ad.type)) return [];
  const closing = date10(ad.closeDate);
  if (!closing || closing < today) return [];
  const title = titleOf(ad).toLowerCase();
  // An addendum is a second notice for a solicitation already listed.
  if (!title || /^addendum\b/.test(title)) return [];
  if (EXCLUDE.test(title) || CIVIL.test(title) || FL_EXCLUDE.test(title)) return [];
  return [...new Set(RULES.filter(([, p]) => p.test(title)).map(([slug]) => slug))].slice(0, 3);
}

export function floridaVbsToRfpInsert(ad: FloridaAd, today: string): TenderInsert | null {
  const title = titleOf(ad);
  const id = Number(ad.advertisementId);
  if (!title || !Number.isInteger(id) || id <= 0) return null;
  const agency = clean(ad.agency || "") || "a Florida state agency";
  const number = clean(ad.agencyAdNumber || "") || `AD-${id}`;
  const published = date10(ad.publishDate || ad.openDate);
  const yesterday = new Date(Date.parse(`${today}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);
  const shortTitle = title.length > 180 ? `${title.slice(0, 177)}…` : title;
  return {
    title: shortTitle,
    slug: `${slugify(title).slice(0, 60)}-flvbs-${id}`.replace(/-+/g, "-"),
    summary: `Florida. ${ad.type} from ${agency}: ${shortTitle}.`,
    scope: `${ad.type} ${number} — ${title}. Issued by ${agency}. Open the official notice for the solicitation documents, addenda and any mandatory pre-bid meeting.`,
    requirements: null,
    province: "Florida",
    deadline: date10(ad.closeDate) || null,
    submission_instructions:
      `This is a public State of Florida solicitation (${number}, ${agency}), advertised on the Florida Vendor ` +
      "Bid System. Responses go to the issuing agency as the notice specifies. PMRFP does not manage this bid.",
    contact_name: null,
    contact_email: null,
    contact_phone: null,
    contact_visibility: "public_contact",
    source_type: "public_source",
    source_url: `${FL_VBS_NOTICE_URL}${id}`,
    source_notes: `Florida VBS ${number} · ${agency}. ${FL_VBS_ATTRIBUTION}`,
    status: "published",
    is_demo: false,
    published_at: !published || published >= yesterday ? `${today}T00:00:00Z` : `${published}T00:00:00Z`,
  };
}

const PAGE_SIZE = 100; // the endpoint caps a page at 100
const MAX_PAGES = 5;

function searchBody(page: number) {
  return JSON.stringify({
    pageSize: PAGE_SIZE,
    type: [],
    status: ["OPEN"],
    agency: [],
    adNumber: "",
    agencyAdvertisementNumber: "",
    title: "",
    publishedDate: "",
    openDate: "",
    endDate: "",
    commodityCodes: [],
    intendsToParticipate: "",
    assignee: "",
    page,
  });
}

async function post(url: string, page: number, signal?: AbortSignal): Promise<unknown> {
  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
    signal,
    headers: { "User-Agent": TENDER_UA, Accept: "application/json", "Content-Type": "application/json" },
    body: searchBody(page),
  });
  if (!res.ok) throw new Error(`Florida VBS fetch failed: HTTP ${res.status}`);
  return res.json();
}

export async function fetchFloridaVbsOpenBids(signal?: AbortSignal): Promise<FloridaAd[]> {
  const count = Number(await post(`${FL_VBS_API}/count`, 1, signal));
  if (!Number.isFinite(count)) throw new Error("Florida VBS count was not a number");
  const pages = Math.min(MAX_PAGES, Math.ceil(count / PAGE_SIZE));
  const out = new Map<number, FloridaAd>();
  for (let page = 1; page <= pages; page++) {
    const rows = await post(FL_VBS_API, page, signal);
    if (!Array.isArray(rows)) throw new Error("Florida VBS search did not return a list");
    for (const r of rows as FloridaAd[]) if (r && r.advertisementId) out.set(r.advertisementId, r);
  }
  return [...out.values()];
}
