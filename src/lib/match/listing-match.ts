/**
 * Who can do this job: ranks directory companies (trades and suppliers) for a
 * listing. A company only qualifies when it does one of the listing's trades
 * AND covers the listing's area; then the closest coverage, the paid tier
 * and verification decide the order. Pure, so it's unit-tested without a
 * database; lib/match/data.ts feeds it.
 */

export interface MatchListing {
  /** Trade names on the listing ("Roofing"). */
  categories: string[];
  /** The listing's region name ("Toronto", "Ontario", "Florida"). */
  regionName: string | null;
  /** Province or U.S. state name. */
  province: string | null;
  market: "CA" | "US";
}

export interface MatchCandidate {
  slug: string;
  name: string;
  kind: "trade" | "supplier";
  /** Trade names the company lists. */
  categories: string[];
  /** Region names the company serves. */
  regions: string[];
  /** Where the company is based (used only when it lists no service area). */
  province: string | null;
  verified: boolean;
  featured: boolean;
  platinum?: boolean;
}

export interface RegionNode {
  id: string;
  name: string;
  province: string | null;
  country: string;
  parentId: string | null;
}

export interface Match<C extends MatchCandidate = MatchCandidate> {
  company: C;
  score: number;
  /** The listing trade the company matched on. */
  trade: string;
  /** The service area that covers the listing ("Ontario", "Toronto", "Canada"). */
  area: string;
}

const norm = (s: string) => s.trim().toLowerCase();

/**
 * The listing's area from most to least specific: its region, that region's
 * parents, then its province and country even when the region is unknown.
 */
export function areaChain(listing: Pick<MatchListing, "regionName" | "province" | "market">, regions: RegionNode[]): RegionNode[] {
  const byName = new Map(regions.map((r) => [norm(r.name), r]));
  const byId = new Map(regions.map((r) => [r.id, r]));
  const chain: RegionNode[] = [];
  const push = (r: RegionNode | undefined) => {
    if (r && !chain.some((c) => c.id === r.id)) chain.push(r);
  };
  let node = listing.regionName ? byName.get(norm(listing.regionName)) : undefined;
  for (let guard = 0; node && guard < 10; guard++) {
    push(node);
    node = node.parentId ? byId.get(node.parentId) : undefined;
  }
  if (listing.province) push(byName.get(norm(listing.province)));
  push(byName.get(listing.market === "US" ? "united states" : "canada"));
  return chain;
}

/** 3 for the listing's own region, 2.5 for an area in between, 2 for the province/state, 1 for the whole country. */
function areaScore(node: RegionNode, index: number): number {
  if (index === 0 && node.parentId) return 3;
  if (!node.parentId) return 1; // country
  if (node.province && norm(node.province) === norm(node.name)) return 2; // province / state
  return 2.5; // e.g. Greater Toronto Area around Toronto
}

export function coverage(
  candidate: Pick<MatchCandidate, "regions" | "province">,
  chain: RegionNode[],
  listingProvince: string | null,
): { score: number; area: string } | null {
  let best: { score: number; area: string } | null = null;
  for (const [i, node] of chain.entries()) {
    if (!candidate.regions.some((r) => norm(r) === norm(node.name))) continue;
    const score = areaScore(node, i);
    if (!best || score > best.score) best = { score, area: node.name };
  }
  if (best) return best;
  // No service area listed: fall back to where the company is based.
  if (!candidate.regions.length && candidate.province && listingProvince && norm(candidate.province) === norm(listingProvince)) {
    return { score: 1.5, area: candidate.province };
  }
  return null;
}

/** Small stable number per (seed, slug), so equal scores rotate fairly between listings without flickering. */
function jitter(seed: string, slug: string): number {
  let h = 2166136261;
  for (const ch of seed + "|" + slug) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return ((h >>> 0) % 1000) / 10000; // 0 to 0.0999
}

export function rankMatches<C extends MatchCandidate>(
  listing: MatchListing,
  candidates: C[],
  regions: RegionNode[],
  opts: { seed?: string; exclude?: string[] } = {},
): Match<C>[] {
  const trades = listing.categories.map(norm);
  if (!trades.length) return [];
  const chain = areaChain(listing, regions);
  const excluded = new Set((opts.exclude ?? []).map(norm));
  const out: Match<C>[] = [];
  for (const c of candidates) {
    if (excluded.has(norm(c.name)) || excluded.has(norm(c.slug))) continue;
    const trade = c.categories.find((cat) => trades.includes(norm(cat)));
    if (!trade) continue;
    const cov = coverage(c, chain, listing.province);
    if (!cov) continue;
    const tier = (c.platinum ? 3 : 0) + (c.featured ? 2 : 0) + (c.verified ? 0.5 : 0);
    out.push({ company: c, trade, area: cov.area, score: 4 + cov.score + tier + jitter(opts.seed ?? "", c.slug) });
  }
  return out.sort((a, b) => b.score - a.score);
}
