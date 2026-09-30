import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/i18n/link";
import { ArrowRight, HardHat, UserRound, Users } from "lucide-react";
import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/public/empty-state";
import { JobCard } from "@/components/jobs/job-card";
import { listOpenJobs } from "@/lib/jobs/data";
import { EMPLOYMENT_TYPES, FREE_JOB_LIMIT } from "@/lib/jobs/rules";
import { getCategories, getRegions } from "@/lib/data/taxonomy";
import { gcFormPath } from "@/lib/gc/packages";
import { cn } from "@/lib/utils";
import { PHOTOS } from "@/lib/photos";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt, plural } from "@/i18n/format";
import { regionName, tradeName } from "@/i18n/terms";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).jobs.board.meta;
  return {
    title: t.title,
    description: t.description,
    alternates: alternatesFor(l, "/jobs"),
  };
}

const SELECT =
  "h-10 rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default async function JobsPage({
  searchParams, params }: {
  searchParams: Promise<{ trade?: string; region?: string; type?: string }>;
} & { params: Promise<object> }) {
  await setLangFrom(params);
  const lang = getLang();
  const t = getT("jobs");
  const labels = getT("jobsClient");
  const sp = await searchParams;
  const [{ ready, jobs }, trades, regions] = await Promise.all([
    listOpenJobs({ trade: sp.trade, region: sp.region, type: sp.type }),
    getCategories(),
    getRegions(),
  ]);
  const filtered = Boolean(sp.trade || sp.region || sp.type);

  return (
    <>
      <section className="grid-tex relative overflow-hidden bg-indigo text-white [--grid-color:rgba(145,242,207,0.06)]">
        <Container className="relative grid items-center gap-10 py-14 md:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-300">{t.board.eyebrow}</p>
            <h1 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {t.board.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-indigo-100/80">
              {t.board.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#jobs" className={cn(buttonVariants({ size: "lg", variant: "accent" }), "active:scale-[0.98]")}>
                {t.board.seeOpen} <ArrowRight className="size-4" />
              </a>
              <Link
                href="/jobs/post"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white active:scale-[0.98]",
                )}
              >
                {t.board.hiringCta}
              </Link>
            </div>
          </div>
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 lg:block">
            <Image
              src={PHOTOS.siteCrew.src}
              alt={t.photoAlt.siteCrew}
              fill
              loading="eager"
              sizes="400px"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_320px]" >
        <div id="jobs">
          <form method="get" className="flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
              {t.common.trade}
              <select name="trade" defaultValue={sp.trade ?? ""} className={SELECT}>
                <option value="">{t.common.allTrades}</option>
                {trades.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {tradeName(c.name, lang)}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
              {t.common.region}
              <select name="region" defaultValue={sp.region ?? ""} className={SELECT}>
                <option value="">{t.common.anywhere}</option>
                {regions.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {regionName(r.name, lang)}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
              {t.board.type}
              <select name="type" defaultValue={sp.type ?? ""} className={SELECT}>
                <option value="">{t.board.anyType}</option>
                {EMPLOYMENT_TYPES.map((e) => (
                  <option key={e} value={e}>
                    {labels.employment[e]}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className={buttonVariants()}>
              {t.board.show}
            </button>
            {filtered && (
              <Link href="/jobs" className="pb-2 text-sm font-medium text-teal-700 hover:underline">
                {t.common.clear}
              </Link>
            )}
          </form>

          <div className="mt-8">
            {!ready ? (
              <EmptyState title={t.board.switchingOn} description={t.common.switchingOnDescription} />
            ) : jobs.length === 0 ? (
              <EmptyState
                title={filtered ? t.board.emptyFilteredTitle : t.board.emptyTitle}
                description={filtered ? t.board.emptyFilteredDescription : t.board.emptyDescription}
              >
                <Link href="/jobs/post" className={buttonVariants()}>
                  {t.common.postJobFree}
                </Link>
              </EmptyState>
            ) : (
              <>
                <p className="mb-4 text-sm text-muted-foreground">
                  {plural(jobs.length, t.common.openJobs)}
                </p>
                <ul className="space-y-3">
                  {jobs.map((j) => (
                    <li key={j.id}>
                      <JobCard job={j} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-teal-300 bg-teal-50/50 p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <UserRound className="size-4 text-teal-700" /> {t.common.lookingForWork}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.board.lookingBody}</p>
            <Link href="/talent/edit" className={cn(buttonVariants(), "mt-4 w-full")}>
              {t.common.makeFreeProfile}
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <Users className="size-4 text-teal-700" /> {t.common.hiring}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fmt(t.board.hiringBody, { n: FREE_JOB_LIMIT })}</p>
            <Link href="/jobs/post" className={cn(buttonVariants(), "mt-4 w-full")}>
              {t.common.postJob}
            </Link>
            <Link href="/talent" className="mt-3 block text-center text-sm font-medium text-teal-700 hover:underline">
              {t.board.browsePeople}
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <HardHat className="size-4 text-teal-700" /> {t.board.gcTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.board.gcBody}</p>
            <Link href={gcFormPath()} className={cn(buttonVariants({ variant: "outline" }), "mt-4 w-full")}>
              {t.board.gcCta}
            </Link>
          </div>
        </aside>
      </Container>
    </>
  );
}
