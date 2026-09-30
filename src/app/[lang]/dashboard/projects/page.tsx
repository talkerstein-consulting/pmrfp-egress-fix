import type { Metadata } from "next";
import Link from "@/i18n/link";
import { redirect } from "next/navigation";
import { Camera, CheckCircle2, Clock, ImageIcon } from "lucide-react";
import { isDemoMode, requireRole } from "@/lib/access/access";
import { listMyInvites, listMyProjects, projectsReady, type MyInvite } from "@/lib/projects/server";
import { canAddProject } from "@/lib/projects/limits";
import { PageHeader, DemoBanner } from "@/components/dashboard/stat-card";
import { StatusBadge } from "@/components/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { ReviewRequestForm } from "@/components/projects/review-request-form";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { fmt, formatDate } from "@/i18n/format";
import { getDictionary, type Messages } from "@/i18n/dictionaries";
import { hasLocale, localizePath, type Locale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDictionary(hasLocale(lang) ? lang : "en").dash.meta.projects };
}

type Strings = Messages["dash"]["projects"];

/**
 * The company's projects (photo captures and typed case studies alike),
 * with "Ask for a review" on each published one. Review requests are a
 * Trade Pro feature; free plans see the upgrade link instead.
 */
export default async function ProjectsPage({
  searchParams, params }: {
  searchParams: Promise<{ published?: string; submitted?: string }>;
} & { params: Promise<object> }) {
  await setLangFrom(params);
  const lang = getLang();
  const t = getT("dash").projects;
  const session = await requireRole(["trade", "supplier"]);
  const org = session.organization;
  if (!org) redirect(localizePath("/onboarding", lang));
  const demo = isDemoMode();
  const paid = session.hasTradeAccess;
  const { published, submitted } = await searchParams;

  const [projects, invites, ready] = demo
    ? ([[], [], false] as const)
    : await Promise.all([listMyProjects(org.id), listMyInvites(org.id), projectsReady()]);

  const activeCount = projects.filter((p) => p.status !== "rejected" && p.status !== "archived").length;
  const canAdd = canAddProject(paid, activeCount);
  const invitesFor = (id: string) => invites.filter((i) => i.caseStudyId === id);

  return (
    <>
      {demo && <DemoBanner />}
      <PageHeader
        title={t.title}
        description={t.description}
        action={
          ready && canAdd ? (
            <Link href="/dashboard/projects/new" className={buttonVariants({ size: "lg" })}>
              <Camera /> {t.add}
            </Link>
          ) : undefined
        }
      />

      {published && (
        <div role="status" className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-teal-300 bg-teal-50 p-4 text-sm">
          <span className="flex items-center gap-2 font-medium text-teal-ink">
            <CheckCircle2 className="size-4" /> {t.live}
          </span>
          <Link href={`/case-studies/${encodeURIComponent(published)}`} className="font-medium text-teal-ink underline">
            {t.seeIt}
          </Link>
        </div>
      )}
      {submitted && (
        <div role="status" className="mb-6 flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <Clock className="size-4" /> {t.sent}
        </div>
      )}

      {!ready && !demo && (
        <p className="mb-6 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
          {t.notReady}{" "}
          <Link href="/dashboard/case-studies/new" className="font-medium text-teal-ink hover:underline">
            {t.notReadyLink}
          </Link>
          .
        </p>
      )}

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-8 text-center">
          <Camera className="mx-auto size-8 text-teal-600" />
          <h2 className="mt-3 text-lg font-semibold">{t.emptyTitle}</h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{t.emptyBody}</p>
          {ready && (
            <Link href="/dashboard/projects/new" className={buttonVariants({ size: "lg", className: "mt-5" })}>
              {t.addFirst}
            </Link>
          )}
        </div>
      ) : (
        <ul className="space-y-4">
          {projects.map((p) => (
            <li key={p.id} className="rounded-xl border border-border bg-card p-4 sm:p-5">
              <div className="flex gap-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-secondary sm:size-24">
                  {p.heroUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element -- dashboard thumbnail
                    <img src={p.heroUrl} alt="" className="size-full object-cover" loading="lazy" />
                  ) : (
                    <ImageIcon className="absolute inset-0 m-auto size-6 text-muted-foreground" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={p.status} />
                    <span className="text-xs text-muted-foreground">{formatDate(p.createdAt, lang)}</span>
                  </div>
                  <h2 className="mt-1 font-semibold leading-snug">{p.title}</h2>
                  <p className="text-xs text-muted-foreground">
                    {[p.city, p.province].filter(Boolean).join(", ")}
                    {p.status === "published" && (
                      <>
                        {p.city || p.province ? " · " : ""}
                        <Link href={`/case-studies/${p.slug}`} className="font-medium text-teal-ink hover:underline">
                          {t.view}
                        </Link>
                      </>
                    )}
                  </p>
                  {p.status === "pending_review" && (
                    <p className="mt-2 text-xs text-muted-foreground">{t.checking}</p>
                  )}
                  {p.status === "rejected" && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {t.rejected} <Link href="/contact" className="text-teal-ink hover:underline">{t.askWhy}</Link>.
                    </p>
                  )}
                </div>
              </div>

              {p.status === "published" && ready && (
                <div className="mt-4 border-t border-border pt-4">
                  <h3 className="text-sm font-semibold">{t.askReview}</h3>
                  {paid ? (
                    <>
                      <p className="mb-2 mt-0.5 text-xs text-muted-foreground">{t.askReviewHint}</p>
                      <ReviewRequestForm caseStudyId={p.id} />
                      <InviteList invites={invitesFor(p.id)} t={t} lang={lang} />
                    </>
                  ) : (
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {t.reviewsUpsell}{" "}
                      <Link href="/pricing" className="font-medium text-teal-ink hover:underline">
                        {t.reviewsUpsellLink}
                      </Link>{" "}
                      {t.reviewsUpsellAfter}
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {projects.some((p) => p.status === "published") && (
        <p className="mt-6 text-sm text-muted-foreground">
          {t.sheetBefore}{" "}
          <Link href="/dashboard/projects/reference-sheet" className="font-medium text-teal-ink hover:underline">
            {t.sheetLink}
          </Link>{" "}
          {t.sheetAfter}
        </p>
      )}

      {ready && !canAdd && (
        <p className="mt-6 text-sm text-muted-foreground">
          {t.freeLimit}{" "}
          <Link href="/pricing" className="font-medium text-teal-ink hover:underline">Trade Pro</Link> {t.freeLimitAfter}
        </p>
      )}
    </>
  );
}

function InviteList({ invites, t, lang }: { invites: MyInvite[]; t: Strings; lang: Locale }) {
  if (invites.length === 0) return null;
  return (
    <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
      {invites.map((i) => (
        <li key={i.id} className="flex flex-wrap items-center gap-x-2">
          <span className="font-medium text-foreground">{i.clientName}</span>
          <span>{i.clientEmail}</span>
          <span>·</span>
          {i.usedAt ? (
            <span className="text-teal-ink">{fmt(t.reviewed, { date: formatDate(i.usedAt, lang) })}</span>
          ) : (
            <span>{fmt(t.asked, { date: formatDate(i.createdAt, lang) })}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
