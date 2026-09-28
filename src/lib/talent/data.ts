import { createClient } from "@/lib/supabase/server";
import { createReadClient } from "@/lib/supabase/read";
import { createServiceClient } from "@/lib/supabase/service";
import { isServiceConfigured, isSupabaseConfigured } from "@/lib/supabase/config";
import type { EmploymentType } from "@/lib/jobs/rules";
import { monthStart, type Availability } from "./rules";

export interface TalentProfile {
  userId: string;
  handle: string;
  displayName: string;
  headline: string | null;
  trade: string | null;
  tradeSlug: string | null;
  otherTrades: { slug: string; name: string }[];
  region: string | null;
  regionSlug: string | null;
  province: string | null;
  country: "CA" | "US";
  city: string | null;
  yearsExperience: number | null;
  certifications: string[];
  availability: Availability;
  employmentTypes: EmploymentType[];
  payExpectation: string | null;
  bio: string | null;
  published: boolean;
  contactVisible: boolean;
  updatedAt: string;
}

export interface Endorsement {
  id: string;
  note: string;
  createdAt: string;
  company: { name: string; slug: string; listed: boolean };
}

const COLS =
  "user_id,handle,display_name,headline,other_trade_ids,city,years_experience,certifications,availability,employment_types," +
  "pay_expectation,bio,published,contact_visible,updated_at," +
  "trade_categories(name,slug),regions(name,slug,province,country)";

interface Row {
  user_id: string;
  handle: string;
  display_name: string;
  headline: string | null;
  other_trade_ids: string[] | null;
  city: string | null;
  years_experience: number | null;
  certifications: string[] | null;
  availability: Availability;
  employment_types: EmploymentType[] | null;
  pay_expectation: string | null;
  bio: string | null;
  published: boolean;
  contact_visible: boolean;
  updated_at: string;
  trade_categories: { name: string; slug: string } | null;
  regions: { name: string; slug: string; province: string | null; country: string } | null;
}

type TradeIndex = Map<string, { slug: string; name: string }>;

async function tradeIndex(): Promise<TradeIndex> {
  const { data } = await createReadClient().from("trade_categories").select("id,slug,name");
  return new Map(((data as { id: string; slug: string; name: string }[] | null) ?? []).map((t) => [t.id, { slug: t.slug, name: t.name }]));
}

function toProfile(r: Row, trades: TradeIndex): TalentProfile {
  const us = r.regions?.country === "USA";
  return {
    userId: r.user_id,
    handle: r.handle,
    displayName: r.display_name,
    headline: r.headline,
    trade: r.trade_categories?.name ?? null,
    tradeSlug: r.trade_categories?.slug ?? null,
    otherTrades: (r.other_trade_ids ?? []).map((id) => trades.get(id)).filter((t): t is { slug: string; name: string } => Boolean(t)),
    region: r.regions?.name ?? null,
    regionSlug: r.regions?.slug ?? null,
    province: r.regions?.province ?? (us ? r.regions?.name ?? null : null),
    country: us ? "US" : "CA",
    city: r.city,
    yearsExperience: r.years_experience,
    certifications: r.certifications ?? [],
    availability: r.availability,
    employmentTypes: r.employment_types ?? [],
    payExpectation: r.pay_expectation,
    bio: r.bio,
    published: r.published,
    contactVisible: r.contact_visible,
    updatedAt: r.updated_at,
  };
}

export interface TalentFilters {
  trade?: string;
  region?: string;
  availability?: string;
}

const AVAIL_ORDER: Record<Availability, number> = { available_now: 0, open_to_offers: 1, not_looking: 2 };

/** Published profiles, available-now first, then most recently updated. `ready: false` = migration not applied yet. */
export async function listTalent(filters: TalentFilters = {}): Promise<{ ready: boolean; people: TalentProfile[] }> {
  if (!isSupabaseConfigured()) return { ready: false, people: [] };
  const { data, error } = await createReadClient()
    .from("talent_profiles")
    .select(COLS)
    .eq("published", true)
    .order("updated_at", { ascending: false })
    .limit(500);
  if (error) return { ready: false, people: [] };
  const trades = await tradeIndex();
  let people = ((data as unknown as Row[]) ?? []).map((r) => toProfile(r, trades));
  if (filters.trade) {
    people = people.filter((p) => p.tradeSlug === filters.trade || p.otherTrades.some((t) => t.slug === filters.trade));
  }
  if (filters.region) people = people.filter((p) => p.regionSlug === filters.region);
  if (filters.availability) people = people.filter((p) => p.availability === filters.availability);
  return { ready: true, people: people.sort((a, b) => AVAIL_ORDER[a.availability] - AVAIL_ORDER[b.availability]) };
}

/**
 * One profile by handle. Unpublished profiles only resolve for their owner
 * (RLS decides: the signed-in client sees published rows plus its own).
 */
export async function getTalent(handle: string): Promise<TalentProfile | null> {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.from("talent_profiles").select(COLS).eq("handle", handle).maybeSingle();
  if (error || !data) return null;
  return toProfile(data as unknown as Row, await tradeIndex());
}

/** The signed-in person's own profile (any state), plus their private phone. */
export async function getOwnTalent(userId: string): Promise<{ profile: TalentProfile | null; phone: string | null }> {
  if (!isSupabaseConfigured()) return { profile: null, phone: null };
  const supabase = await createClient();
  const [{ data }, { data: priv }] = await Promise.all([
    supabase.from("talent_profiles").select(COLS).eq("user_id", userId).maybeSingle(),
    supabase.from("talent_private").select("phone").eq("user_id", userId).maybeSingle<{ phone: string | null }>(),
  ]);
  return { profile: data ? toProfile(data as unknown as Row, await tradeIndex()) : null, phone: priv?.phone ?? null };
}

export async function getEndorsements(talentUserId: string): Promise<Endorsement[]> {
  if (!isSupabaseConfigured()) return [];
  const { data } = await createReadClient()
    .from("talent_endorsements")
    .select("id,note,created_at,organizations(name,slug,organization_type)")
    .eq("talent_user_id", talentUserId)
    .order("created_at", { ascending: false })
    .limit(50);
  return (
    (data as unknown as {
      id: string;
      note: string;
      created_at: string;
      organizations: { name: string; slug: string; organization_type: string } | null;
    }[] | null) ?? []
  )
    .filter((e) => e.organizations)
    .map((e) => ({
      id: e.id,
      note: e.note,
      createdAt: e.created_at,
      company: {
        name: e.organizations!.name,
        slug: e.organizations!.slug,
        listed: e.organizations!.organization_type === "trade_company" || e.organizations!.organization_type === "supplier",
      },
    }));
}

/** Messages this company has sent to workers since the 1st of the month. */
export async function contactsThisMonth(organizationId: string): Promise<number> {
  if (!isServiceConfigured()) return 0;
  const { count } = await createServiceClient()
    .from("talent_contacts")
    .select("id", { count: "exact", head: true })
    .eq("organization_id", organizationId)
    .gte("created_at", monthStart());
  return count ?? 0;
}

/** Contact details for an employer, only when the worker chose to show them. Server-side only. */
export async function getVisibleContact(userId: string): Promise<{ email: string | null; phone: string | null }> {
  if (!isServiceConfigured()) return { email: null, phone: null };
  const admin = createServiceClient();
  const [{ data: t }, { data: u }, { data: p }] = await Promise.all([
    admin.from("talent_profiles").select("contact_visible").eq("user_id", userId).maybeSingle<{ contact_visible: boolean }>(),
    admin.from("users_profile").select("email").eq("id", userId).maybeSingle<{ email: string | null }>(),
    admin.from("talent_private").select("phone").eq("user_id", userId).maybeSingle<{ phone: string | null }>(),
  ]);
  if (!t?.contact_visible) return { email: null, phone: null };
  return { email: u?.email ?? null, phone: p?.phone ?? null };
}

/** A published talent profile URL path for this email, if they have one. Server-side only. */
export async function talentPathForEmail(email: string): Promise<string | null> {
  if (!isServiceConfigured()) return null;
  const admin = createServiceClient();
  const { data: u } = await admin.from("users_profile").select("id").ilike("email", email.replace(/[\\%_]/g, (m) => `\\${m}`)).limit(1).maybeSingle<{ id: string }>();
  if (!u) return null;
  const { data: t } = await admin
    .from("talent_profiles")
    .select("handle")
    .eq("user_id", u.id)
    .eq("published", true)
    .maybeSingle<{ handle: string }>();
  return t ? `/talent/${t.handle}` : null;
}
