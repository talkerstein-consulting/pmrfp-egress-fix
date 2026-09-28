"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/access/access";
import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { isServiceConfigured, isSupabaseConfigured } from "@/lib/supabase/config";
import { upsertGhlContact } from "@/lib/ghl/client";
import { endorsementSchema, normalizeTalentHandle, parseTickets, tagSlug, talentProfileSchema } from "./rules";

export interface TalentFormState {
  error?: string;
}

/** Create or update the signed-in person's talent profile. */
export async function saveTalentProfileAction(_prev: TalentFormState, formData: FormData): Promise<TalentFormState> {
  if (!isSupabaseConfigured()) return { error: "This isn't available right now." };
  const session = await getSession();
  if (!session) redirect(`/sign-in?next=${encodeURIComponent("/talent/edit")}`);

  const parsed = talentProfileSchema.safeParse({
    handle: formData.get("handle") ?? "",
    displayName: formData.get("displayName") ?? "",
    headline: formData.get("headline") ?? "",
    primaryTrade: formData.get("primaryTrade") ?? "",
    otherTrades: formData.getAll("otherTrades").map(String),
    region: formData.get("region") ?? "",
    city: formData.get("city") ?? "",
    yearsExperience: formData.get("yearsExperience")?.toString().trim() || undefined,
    tickets: [...formData.getAll("ticketPick").map(String), formData.get("tickets")?.toString() ?? ""].join(","),
    availability: formData.get("availability") ?? "",
    employmentTypes: formData.getAll("employmentTypes").map(String),
    payExpectation: formData.get("payExpectation") ?? "",
    bio: formData.get("bio") ?? "",
    phone: formData.get("phone") ?? "",
    published: formData.get("published") === "on",
    contactVisible: formData.get("contactVisible") === "on",
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  const d = parsed.data;
  const handle = normalizeTalentHandle(d.handle);
  if (!handle) return { error: "That web address won't work. Use 3 to 40 letters, numbers or dashes." };

  const supabase = await createClient();
  const slugs = [d.primaryTrade, ...d.otherTrades.filter((t) => t !== d.primaryTrade)];
  const [{ data: cats }, { data: reg }] = await Promise.all([
    supabase.from("trade_categories").select("id,slug").in("slug", slugs),
    supabase.from("regions").select("id").eq("slug", d.region).maybeSingle<{ id: string }>(),
  ]);
  const catBySlug = new Map(((cats as { id: string; slug: string }[] | null) ?? []).map((c) => [c.slug, c.id]));
  const primary = catBySlug.get(d.primaryTrade);
  if (!primary) return { error: "Pick your main trade." };
  if (!reg) return { error: "Pick your region." };

  const { error } = await supabase.from("talent_profiles").upsert(
    {
      user_id: session.userId,
      handle,
      display_name: d.displayName,
      headline: d.headline || null,
      primary_trade_id: primary,
      other_trade_ids: d.otherTrades.map((s) => catBySlug.get(s)).filter((id): id is string => Boolean(id) && id !== primary),
      region_id: reg.id,
      city: d.city || null,
      years_experience: d.yearsExperience ?? null,
      certifications: parseTickets(d.tickets),
      availability: d.availability,
      employment_types: d.employmentTypes,
      pay_expectation: d.payExpectation || null,
      bio: d.bio || null,
      published: d.published,
      contact_visible: d.contactVisible,
    },
    { onConflict: "user_id" },
  );
  if (error) {
    if (error.code === "23505") return { error: "Someone already has that web address. Try another." };
    if (/talent_profiles/.test(error.message) && /does not exist|schema cache/.test(error.message)) {
      return { error: "Profiles are switching on. Try again in a few minutes." };
    }
    return { error: "Could not save your profile. Please try again." };
  }
  await supabase.from("talent_private").upsert({ user_id: session.userId, phone: d.phone || null, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  if (!session.profile.onboarding_completed) {
    await supabase.from("users_profile").update({ onboarding_completed: true }).eq("id", session.userId);
  }

  const [firstName, ...rest] = d.displayName.split(/\s+/);
  await Promise.allSettled([
    upsertGhlContact({
      email: session.profile.email,
      firstName,
      lastName: rest.join(" ") || undefined,
      phone: d.phone || undefined,
      tags: ["pmrfp-talent", `pmrfp-talent-${tagSlug(d.availability)}`, `pmrfp-trade-${tagSlug(d.primaryTrade)}`],
      customFields: { pmrfp_role: "talent", pmrfp_category: d.primaryTrade, pmrfp_city: d.city },
    }),
  ]);

  revalidatePath("/talent");
  revalidatePath(`/talent/${handle}`);
  redirect(`/talent/${handle}?saved=1`);
}

/**
 * An approved company vouches for someone it has worked with. The proof we
 * can check: they applied to one of the company's jobs, or the company
 * contacted them through PMRFP. One endorsement per company per person.
 */
export async function endorseTalentAction(input: { handle: string; note: string }): Promise<{ error?: string }> {
  const parsed = endorsementSchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the note." };
  const session = await getSession();
  if (!session) return { error: "Sign in to endorse." };
  const org = session.organization;
  if (!org || org.profile_status !== "approved" || org.status !== "active") {
    return { error: "Only approved companies on PMRFP can endorse workers." };
  }
  if (!isServiceConfigured()) return { error: "This isn't available right now." };
  const admin = createServiceClient();
  const { data: t } = await admin
    .from("talent_profiles")
    .select("user_id,published")
    .eq("handle", parsed.data.handle)
    .maybeSingle<{ user_id: string; published: boolean }>();
  if (!t || !t.published) return { error: "That profile isn't available." };
  if (t.user_id === session.userId) return { error: "You can't endorse yourself." };

  const { data: person } = await admin.from("users_profile").select("email").eq("id", t.user_id).maybeSingle<{ email: string | null }>();
  const [{ count: contacted }, { data: jobs }] = await Promise.all([
    admin.from("talent_contacts").select("id", { count: "exact", head: true }).eq("organization_id", org.id).eq("talent_user_id", t.user_id),
    admin.from("job_posts").select("id").eq("organization_id", org.id).limit(500),
  ]);
  let applied = 0;
  const jobIds = ((jobs as { id: string }[] | null) ?? []).map((j) => j.id);
  if (person?.email && jobIds.length) {
    const { count } = await admin
      .from("job_applications")
      .select("id", { count: "exact", head: true })
      .in("job_id", jobIds)
      .ilike("email", person.email.replace(/[\\%_]/g, (m) => `\\${m}`));
    applied = count ?? 0;
  }
  if (!contacted && !applied) {
    return { error: "You can endorse people who applied to your jobs or who you've contacted through PMRFP." };
  }

  const { error } = await admin.from("talent_endorsements").upsert(
    { talent_user_id: t.user_id, organization_id: org.id, endorsed_by: session.userId, note: parsed.data.note },
    { onConflict: "talent_user_id,organization_id" },
  );
  if (error) return { error: "Could not save the endorsement." };
  revalidatePath(`/talent/${parsed.data.handle}`);
  return {};
}
