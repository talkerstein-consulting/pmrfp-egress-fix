import type { Metadata } from "next";
import Link from "@/i18n/link";
import { ArrowRight, Briefcase, UserRound } from "lucide-react";
import { Container } from "@/components/container";
import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/public/empty-state";
import { TalentCard } from "@/components/talent/talent-card";
import { listTalent } from "@/lib/talent/data";
import { AVAILABILITY, FREE_CONTACTS_PER_MONTH } from "@/lib/talent/rules";
import { getCategories, getRegions } from "@/lib/data/taxonomy";
import { cn } from "@/lib/utils";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt, plural } from "@/i18n/format";
import { regionName, tradeName } from "@/i18n/terms";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).jobs.talent.meta;
  return {
    title: t.title,
    description: t.description,
    alternates: alternatesFor(l, "/talent"),
  };
}

const SELECT =
  "h-10 rounded-md border border-input bg-background px-3 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export default async function TalentPage({
  searchParams, params }: {
  searchParams: Promise<{ trade?: string; region?: string; availability?: string }>;
} & { params: Promise<object> }) {
  await setLangFrom(params);
  const lang = getLang();
  const all = getT("jobs");
  const t = all.talent;
  const labels = getT("jobsClient");
  const sp = await searchParams;
  const [{ ready, people }, trades, regions] = await Promise.all([
    listTalent({ trade: sp.trade, region: sp.region, availability: sp.availability }),
    getCategories(),
    getRegions(),
  ]);
  const filtered = Boolean(sp.trade || sp.region || sp.availability);

  return (
    <>
      <section className="grid-tex relative overflow-hidden bg-indigo text-white [--grid-color:rgba(145,242,207,0.06)]">
        <Container className="relative py-14 md:py-16">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-teal-300">{t.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-indigo-100/80">
            {t.lead}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#people" className={cn(buttonVariants({ size: "lg", variant: "accent" }), "active:scale-[0.98]")}>
              {t.seePeople} <ArrowRight className="size-4" />
            </a>
            <Link
              href="/talent/edit"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white active:scale-[0.98]",
              )}
            >
              {t.lookingCta}
            </Link>
          </div>
        </Container>
      </section>

      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <div id="people">
          <form method="get" className="flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
              {all.common.trade}
              <select name="trade" defaultValue={sp.trade ?? ""} className={SELECT}>
                <option value="">{all.common.allTrades}</option>
                {trades.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {tradeName(c.name, lang)}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
              {all.common.region}
              <select name="region" defaultValue={sp.region ?? ""} className={SELECT}>
                <option value="">{all.common.anywhere}</option>
                {regions.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {regionName(r.name, lang)}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
              {t.availability}
              <select name="availability" defaultValue={sp.availability ?? ""} className={SELECT}>
                <option value="">{t.any}</option>
                {AVAILABILITY.map((a) => (
                  <option key={a} value={a}>
                    {labels.availability[a]}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className={buttonVariants()}>
              {t.show}
            </button>
            {filtered && (
              <Link href="/talent" className="pb-2 text-sm font-medium text-teal-700 hover:underline">
                {all.common.clear}
              </Link>
            )}
          </form>

          <div className="mt-8">
            {!ready ? (
              <EmptyState title={t.switchingOn} description={all.common.switchingOnDescription} />
            ) : people.length === 0 ? (
              <EmptyState
                title={filtered ? t.emptyFilteredTitle : t.emptyTitle}
                description={filtered ? t.emptyFilteredDescription : t.emptyDescription}
              >
                <Link href="/talent/edit" className={buttonVariants()}>
                  {all.common.makeFreeProfile}
                </Link>
              </EmptyState>
            ) : (
              <>
                <p className="mb-4 text-sm text-muted-foreground">
                  {plural(people.length, t.count)}
                </p>
                <ul className="space-y-3">
                  {people.map((p) => (
                    <li key={p.userId}>
                      <TalentCard person={p} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <UserRound className="size-4 text-teal-700" /> {all.common.lookingForWork}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.lookingBody}</p>
            <Link href="/talent/edit" className={cn(buttonVariants(), "mt-4 w-full")}>
              {all.common.makeFreeProfile}
            </Link>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="flex items-center gap-2 font-semibold">
              <Briefcase className="size-4 text-teal-700" /> {all.common.hiring}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{fmt(t.hiringBody, { n: FREE_CONTACTS_PER_MONTH })}</p>
            <Link href="/jobs/post" className={cn(buttonVariants({ variant: "outline" }), "mt-4 w-full")}>
              {all.common.postJob}
            </Link>
          </div>
        </aside>
      </Container>
    </>
  );
}
