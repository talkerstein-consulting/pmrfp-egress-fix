import Link from "@/i18n/link";
import { Camera } from "lucide-react";
import { requireRole, isDemoMode } from "@/lib/access/access";
import { projectsReady } from "@/lib/projects/server";
import { buttonVariants } from "@/components/ui/button";
import { listRfps } from "@/lib/data/rfps";
import { StatCard, PageHeader, DemoBanner } from "@/components/dashboard/stat-card";
import { ActivateButton } from "@/components/dashboard/billing-actions";
import { ProfileCompletionCard } from "@/components/dashboard/profile-completion-card";
import { SponsorSlot } from "@/components/sponsors/sponsor-slot";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { fmt } from "@/i18n/format";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDictionary(hasLocale(lang) ? lang : "en").dash.meta.home };
}

export default async function TradeDashboardHome({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("dash").home;
  const session = await requireRole(["trade"]);
  const demo = isDemoMode();
  const org = session.organization;
  const [rfps, photoProjects, tradeSlugs] = await Promise.all([listRfps(), projectsReady(), orgTradeSlugs(org?.id ?? null, demo)]);
  const matchingRfps = rfps.filter((r) => r.status === "open").length;

  return (
    <div>
      {demo && <DemoBanner />}
      <PageHeader
        title={org?.name ? fmt(t.welcomeName, { name: org.name }) : t.welcome}
        description={t.description}
      />

      {/* Prominent profile-completion meter — single source of truth for "what
          to do next." Replaces the previous trio (stat / checklist / recommended-
          action) which were spread across the page and visually inconsistent. */}
      <ProfileCompletionCard org={org} hasActiveSub={session.hasTradeAccess} />

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label={t.subscription}
          value={session.hasTradeAccess ? t.proActive : t.free}
          hint={session.hasTradeAccess ? t.fullAccess : t.upgradeHint}
          href="/dashboard/billing"
        />
        <StatCard label={t.matching} value={matchingRfps} hint={t.openOpps} href="/dashboard/rfps" />
        <StatCard label={t.saved} value={0} href="/dashboard/saved-rfps" />
        <StatCard label={t.interests} value={0} href="/dashboard/interests" />
        <StatCard label={t.views} value={demo ? 42 : 0} hint={t.last30} />
      </div>

      {photoProjects && (
        <Link
          href="/dashboard/projects/new"
          className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-teal-300 bg-teal-50/60 p-6 transition-colors hover:bg-teal-50"
        >
          <div className="flex items-start gap-4">
            <Camera className="mt-0.5 size-6 shrink-0 text-teal-600" />
            <div>
              <h2 className="text-base font-semibold">{t.projectTitle}</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">{t.projectBody}</p>
            </div>
          </div>
          <span className={buttonVariants()}>{t.addProject}</span>
        </Link>
      )}

      {org?.profile_status === "approved" && org.slug && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card p-6">
          <div className="flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/api/badge/${org.slug}`} alt={t.badgeAlt} width={160} height={40} className="mt-1 hidden sm:block" />
            <div>
              <h2 className="text-base font-semibold">{t.badgeTitle}</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">{t.badgeBody}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/badge" className={buttonVariants({ variant: "outline" })}>
              {t.getBadge}
            </Link>
            <Link href="/widgets?w=company" className={buttonVariants({ variant: "outline" })}>
              {t.companyWidget}
            </Link>
          </div>
        </div>
      )}

      {!session.hasTradeAccess && (
        <div className="mt-6 rounded-lg border border-teal-300 bg-teal-50/60 p-6">
          <h2 className="text-base font-semibold">{t.upsellTitle}</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{t.upsellBody}</p>
          <div className="mt-4">
            <ActivateButton />
          </div>
        </div>
      )}

      <SponsorSlot
        className="mt-6 max-w-md"
        ctx={{ placement: "trade_dashboard", categories: tradeSlugs, seed: org?.id ?? "" }}
      />
    </div>
  );
}

/** The trades this company lists under, for picking a relevant sponsor. */
async function orgTradeSlugs(orgId: string | null, demo: boolean): Promise<string[]> {
  if (!orgId || demo) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("organization_categories")
    .select("trade_categories(slug)")
    .eq("organization_id", orgId);
  return ((data as unknown as { trade_categories: { slug: string } | null }[] | null) ?? [])
    .map((r) => r.trade_categories?.slug)
    .filter((s): s is string => Boolean(s));
}
