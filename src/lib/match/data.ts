import { cache } from "react";
import { createReadClient } from "@/lib/supabase/read";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { DEMO_REGIONS } from "@/lib/demo-data";
import { listVendors } from "@/lib/data/directory";
import type { VendorListItem } from "@/lib/data/types";
import { rankMatches, type Match, type MatchCandidate, type MatchListing, type RegionNode } from "@/lib/match/listing-match";

export type MatchedCompany = MatchCandidate & VendorListItem;

/** The region tree with parents, once per request. */
const regionTree = cache(async (): Promise<RegionNode[]> => {
  if (!isSupabaseConfigured()) {
    // Demo data has no parents: Canada, then provinces, then everything else under its province.
    const byName = new Map(DEMO_REGIONS.map((r) => [r.name, r.slug]));
    return DEMO_REGIONS.map((r) => ({
      id: r.slug,
      name: r.name,
      province: r.province,
      country: "Canada",
      parentId: !r.province ? null : r.province === r.name ? "canada" : byName.get(r.province) ?? "canada",
    }));
  }
  const { data } = await createReadClient().from("regions").select("id,name,province,country,parent_id").eq("active", true);
  return ((data as { id: string; name: string; province: string | null; country: string; parent_id: string | null }[] | null) ?? []).map(
    (r) => ({ id: r.id, name: r.name, province: r.province, country: r.country, parentId: r.parent_id }),
  );
});

/** Every approved trade company and supplier, once per request. */
const companies = cache(async (): Promise<MatchedCompany[]> => {
  const [trades, suppliers] = await Promise.all([listVendors(), listVendors({ orgType: "supplier" })]);
  return [
    ...trades.map((v) => ({ ...v, kind: "trade" as const })),
    ...suppliers.map((v) => ({ ...v, kind: "supplier" as const })),
  ];
});

/**
 * Companies to show on a listing: up to `trades` trade companies that do the
 * work there and `suppliers` suppliers that sell into it. `exclude` keeps a
 * company that already appears on the page (e.g. the sponsor) from showing twice.
 */
export async function getListingMatches(
  listing: MatchListing,
  opts: { seed?: string; exclude?: string[]; trades?: number; suppliers?: number } = {},
): Promise<{ trades: Match<MatchedCompany>[]; suppliers: Match<MatchedCompany>[] }> {
  try {
    const [all, regions] = await Promise.all([companies(), regionTree()]);
    const ranked = rankMatches(listing, all, regions, { seed: opts.seed, exclude: opts.exclude });
    return {
      trades: ranked.filter((m) => m.company.kind === "trade").slice(0, opts.trades ?? 4),
      suppliers: ranked.filter((m) => m.company.kind === "supplier").slice(0, opts.suppliers ?? 2),
    };
  } catch (err) {
    // Never break a listing page over a sidebar of suggestions.
    console.error("[match] listing matches failed", err);
    return { trades: [], suppliers: [] };
  }
}
