import type { Metadata } from "next";
import Link from "@/i18n/link";
import { redirect } from "next/navigation";
import { Check, Mail, Phone } from "lucide-react";
import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/public/empty-state";
import { JobStatusButton } from "@/components/jobs/job-forms";
import { getSession } from "@/lib/access/access";
import { getEmployerJobs } from "@/lib/jobs/data";
import { FREE_JOB_LIMIT } from "@/lib/jobs/rules";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localizePath, type Locale } from "@/i18n/config";
import { fmt, formatDate, plural } from "@/i18n/format";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: getDictionary(hasLocale(lang) ? lang : "en").jobs.manage.title,
    robots: { index: false, follow: false },
  };
}

function day(d: string, lang: Locale) {
  return formatDate(`${d.slice(0, 10)}T12:00:00Z`, lang, { month: "short", day: "numeric" });
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export default async function ManageJobsPage({ searchParams, params }: { searchParams: Promise<{ posted?: string }> } & { params: Promise<object> }) {
  await setLangFrom(params);
  const lang = getLang();
  const all = getT("jobs");
  const t = all.manage;
  const labels = getT("jobsClient");
  const session = await getSession();
  if (!session) redirect(localizePath(`/sign-in?next=${encodeURIComponent("/jobs/manage")}`, lang));
  if (!session.organization) redirect(localizePath(`/onboarding?next=${encodeURIComponent("/jobs/manage")}`, lang));
  const { posted } = await searchParams;
  const { ready, jobs, applications } = await getEmployerJobs(session.organization.id);
  const today = todayIso();
  const openCount = jobs.filter((j) => j.status === "open" && j.expiresAt >= today).length;

  return (
    <Container className="py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{t.title}</h1>
          <p className="mt-1 text-muted-foreground">
            {fmt(t.summary, {
              org: session.organization.name,
              count: plural(openCount, all.common.openJobs),
              free: session.hasTradeAccess ? "" : fmt(t.ofFree, { n: FREE_JOB_LIMIT }),
            })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/widgets?w=jobs" className={buttonVariants({ size: "lg", variant: "outline" })}>
            {t.careers}
          </Link>
          <Link href="/talent" className={buttonVariants({ size: "lg", variant: "outline" })}>
            {t.findPeople}
          </Link>
          <Link href="/jobs/post" className={buttonVariants({ size: "lg" })}>
            {all.common.postJob}
          </Link>
        </div>
      </div>

      {posted && (
        <p className="mt-6 flex items-center gap-2 rounded-lg border border-teal-300 bg-teal-50/60 p-4 text-sm font-medium">
          <Check className="size-4 text-teal-700" /> {t.live}{" "}
          <Link href={`/jobs/${posted}`} className="text-teal-700 underline">
            {t.seeIt}
          </Link>
        </p>
      )}

      <div className="mt-8">
        {!ready ? (
          <EmptyState title={t.switchingOn} description={all.common.switchingOnDescription} />
        ) : jobs.length === 0 ? (
          <EmptyState title={t.emptyTitle} description={t.emptyDescription}>
            <Link href="/jobs/post" className={buttonVariants()}>
              {all.common.postJob}
            </Link>
          </EmptyState>
        ) : (
          <ul className="space-y-4">
            {jobs.map((j) => {
              const open = j.status === "open" && j.expiresAt >= today;
              const apps = applications.filter((a) => a.jobId === j.id);
              return (
                <li key={j.id} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <Link href={`/jobs/${j.slug}`} className="font-semibold hover:text-teal-700">
                        {j.title}
                      </Link>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {j.city} · {labels.employment[j.employmentType]} ·{" "}
                        {open
                          ? fmt(t.openUntil, { date: day(j.expiresAt, lang) })
                          : j.status === "closed"
                            ? t.closed
                            : fmt(t.expired, { date: day(j.expiresAt, lang) })}
                      </p>
                    </div>
                    {open ? <JobStatusButton jobId={j.id} action="close" /> : <JobStatusButton jobId={j.id} action="renew" />}
                  </div>
                  <details className="mt-4" open={apps.length > 0 && apps.length <= 3}>
                    <summary className="cursor-pointer text-sm font-medium">{plural(apps.length, t.applicants)}</summary>
                    {apps.length > 0 && (
                      <ul className="mt-3 divide-y divide-border rounded-lg border border-border">
                        {apps.map((a) => (
                          <li key={a.id} className="p-4 text-sm">
                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                              <span className="font-semibold">{a.name}</span>
                              <span className="text-xs text-muted-foreground">{day(a.createdAt, lang)}</span>
                            </div>
                            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
                              <a href={`mailto:${a.email}`} className="inline-flex items-center gap-1 hover:text-teal-700">
                                <Mail className="size-3.5" /> {a.email}
                              </a>
                              {a.phone && (
                                <a href={`tel:${a.phone}`} className="inline-flex items-center gap-1 hover:text-teal-700">
                                  <Phone className="size-3.5" /> {a.phone}
                                </a>
                              )}
                              {a.experienceYears != null && <span>{fmt(t.experience, { n: a.experienceYears })}</span>}
                            </div>
                            {a.certifications && <p className="mt-1">{fmt(t.tickets, { list: a.certifications })}</p>}
                            {a.message && <p className="mt-2 whitespace-pre-line text-foreground/90">{a.message}</p>}
                          </li>
                        ))}
                      </ul>
                    )}
                  </details>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Container>
  );
}
