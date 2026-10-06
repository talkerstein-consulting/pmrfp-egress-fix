import { createReadClient } from "@/lib/supabase/read";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { DEMO_RFPS, regionName } from "@/lib/demo-data";
import { getTaxonomyRows } from "./taxonomy";

/** Counts the teaser view without downloading RFP rows or their relations. */
export async function getOpenRfpCounts(region: string | null = null, excludeSlug?: string): Promise<{ totalOpen: number; regionMatchCount: number }> {
  const today = new Date().toISOString().slice(0, 10);
  if (!isSupabaseConfigured()) {
    const open = DEMO_RFPS.filter((r) => !r.deadline || r.deadline >= today);
    return { totalOpen: open.length, regionMatchCount: region ? open.filter((r) => regionName(r.region) === region && r.slug !== excludeSlug).length : 0 };
  }
  const client = createReadClient();
  // GET + limit=0 retains Content-Range's exact count in the shared fetch
  // cache, unlike HEAD, without returning any listing payload.
  const count = async (regionIds?: string[]) => {
    let query = client.from("rfp_public").select("id", { count: "exact" })
      .or(`deadline.is.null,deadline.gte.${today}`).limit(0);
    if (regionIds) {
      query = query.in("region_id", regionIds);
      if (excludeSlug) query = query.neq("slug", excludeSlug);
    }
    const { count, error } = await query;
    if (error) throw error;
    if (count === null) throw new Error("Supabase did not return the open RFP count");
    return count;
  };
  const total = count();
  const regional = async () => {
    if (!region) return 0;
    // Match existing display-name semantics, including duplicate region names
    // and inactive historical names still permitted by anonymous RLS.
    const ids = (await getTaxonomyRows("regions")).filter((r) => r.name === region).map((r) => r.id);
    return ids.length ? count(ids) : 0;
  };
  const [totalOpen, regionMatchCount] = await Promise.all([total, regional()]);
  return { totalOpen, regionMatchCount };
}
