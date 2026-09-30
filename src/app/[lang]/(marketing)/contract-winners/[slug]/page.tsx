import type { Metadata } from "next";
import Link from "@/i18n/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, CalendarDays, Landmark, Trophy } from "lucide-react";
import { Container, Eyebrow } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { listRfps } from "@/lib/data/rfps";
import { winnersFromRfps, type Winner } from "@/lib/data/winners";
import { compactDollars, daysUntil } from "@/lib/data/fomo";
import { signUpHrefForPlan } from "@/lib/billing/plan-intent";
import { PRICING, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { GcPackageCta } from "@/components/public/gc-package-cta";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localizePath, type Locale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt, formatDate, formatNumber, plural } from "@/i18n/format";
import { regionName, tradeName } from "@/i18n/terms";
import { publicTenderSource } from "@/lib/tenders/sources";

export const revalidate = 3600;

export async function generateStaticParams() {
  return []; // rendered on first visit, then cached (ISR)
}

/** "$1,591,087" in English and Spanish (U.S. style), "1 591 087 $" in French. */
const money = (n: number, lang: Locale) =>
  lang === "fr"
    ? `${formatNumber(n, lang)}\u00a0$`
    : lang === "es"
      ? `$${formatNumber(n, lang)}`
      : `$${n.toLocaleString("en-CA")}`;
const day = (d: string | null, lang: Locale) => (d ? formatDate(`${d.slice(0, 10)}T12:00:00Z`, lang) : "—");

/**
 * Buyer, source label and licence line for one award in the visitor's language.
 * English (and any source without a translation) uses lib/tenders/sources as-is.
 */
function awardSourceCopy(a: Winner["awards"][number], lang: Locale) {
  const override = getDictionary(lang).board.detail.sources[publicTenderSource(a.slug).key];
  const en = getDictionary("en").sharedClient.labels.issuer;
  const local = getDictionary(lang).sharedClient.labels.issuer;
  const key = (Object.keys(en) as (keyof typeof en)[]).find((k) => en[k] === a.source);
  return {
    issuer: override?.issuer ?? a.issuer,
    attribution: override?.attribution ?? a.attribution,
    source: key ? local[key] : a.source,
  };
}

/** "Roofing, HVAC" -> "roofing, hvac" in English; French and Spanish keep acronyms ("toiture, CVC", "techado, HVAC"). */
function lowerTrades(names: string[], lang: Locale): string {
  const list = names.map((n) => tradeName(n, lang)).join(", ");
  if (lang === "en") return list.toLowerCase();
  return list
    .split(" ")
    .map((w) => (w.length > 1 && w === w.toUpperCase() ? w : w.toLocaleLowerCase(lang)))
    .join(" ");
}

async function load(slug: string) {
  const rfps = await listRfps();
  const winner = winnersFromRfps(rfps).find((w) => w.slug === slug) ?? null;
  return { rfps, winner };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lang: string }> }): Promise<Metadata> {
  const { slug, lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).partners.winner.meta;
  const { winner: w } = await load(slug);
  if (!w) return { title: t.notFound };
  const n = w.awards.length;
  const issuers = [...new Set(w.awards.map((a) => awardSourceCopy(a, l).issuer))];
  const title = fmt(t.title, { name: w.name, n, value: w.totalValue ? ` (${compactDollars(w.totalValue, l)})` : "" });
  const description = fmt(t.description, {
    name: w.name,
    n,
    worth: w.totalValue ? fmt(t.worth, { amount: money(w.totalValue, l) }) : "",
    issuers: issuers.slice(0, 2).join(t.and),
    trades: w.categories.length ? ` — ${lowerTrades(w.categories.slice(0, 3), l)}` : "",
  });
  return { title, description, alternates: alternatesFor(l, `/contract-winners/${w.slug}`) };
}

export default async function WinnerPage({ params }: { params: Promise<{ slug: string }> }) {
  await setLangFrom(params);
  const lang = getLang();
  const t = getT("partners").winner;
  const crumbs = getT("partners").crumbs;
  const { slug } = await params;
  const { rfps, winner: w } = await load(slug);
  if (!w) notFound();
  const sources = w.awards.map((a) => awardSourceCopy(a, lang));
  const issuers = [...new Set(sources.map((s) => s.issuer))];
  const attributions = [...new Set(sources.map((s) => s.attribution))];

  const disclosed = w.awards.filter((a) => a.amount);
  const average = disclosed.length ? Math.round(w.totalValue / disclosed.length) : null;
  // Open work in the same trades — the "you could be bidding on this" hook.
  const open = rfps
    .filter((r) => r.status === "open" && (daysUntil(r.deadline) ?? 0) >= 0 && r.categories.some((c) => w.categories.includes(c)))
    .sort((a, b) => (a.deadline ?? "").localeCompare(b.deadline ?? ""));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: crumbs.home, path: localizePath("/", lang) },
          { name: crumbs.winners, path: localizePath("/contract-winners", lang) },
          { name: w.name, path: localizePath(`/contract-winners/${w.slug}`, lang) },
        ])}
      />

      <section className="grid-tex relative overflow-hidden bg-indigo text-white [--grid-color:rgba(145,242,207,0.07)]">
        <Container className="relative z-10 py-14">
          <Link href="/contract-winners" className="text-sm text-indigo-100/70 hover:text-white">
            {t.back}
          </Link>
          <span className="eyebrow mt-6 flex items-center gap-2 text-teal-300">
            <Trophy className="size-3.5" /> {t.eyebrow}
          </span>
          <h1 className="mt-3 max-w-4xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-5xl">{w.name}</h1>
          {w.categories.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {w.categories.slice(0, 6).map((c) => (
                <span key={c} className="rounded-full bg-white/10 px-3 py-1 text-sm text-indigo-100">{tradeName(c, lang)}</span>
              ))}
            </div>
          )}
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
            {[
              [t.stats.won, String(w.awards.length)],
              [t.stats.total, w.totalValue ? compactDollars(w.totalValue, lang) : t.stats.notDisclosed],
              [t.stats.average, average ? compactDollars(average, lang) : "—"],
              [t.stats.recent, day(w.latest, lang)],
            ].map(([k, v]) => (
              <div key={k} className="bg-indigo p-5">
                <dt className="font-mono text-[11px] uppercase tracking-widest text-teal-300">{k}</dt>
                <dd className="mt-1.5 text-2xl font-bold text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container className="grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <Eyebrow>{t.listEyebrow}</Eyebrow>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">{fmt(t.listTitle, { name: w.name })}</h2>
          <ol className="mt-6 space-y-3">
            {w.awards.map((a, i) => (
              <li key={a.slug}>
                <Link
                  href={`/rfps/${a.slug}`}
                  className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-teal-300 hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><Landmark className="size-3.5" /> {sources[i].source}</span>
                      <span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" /> {day(a.date, lang)}</span>
                      {a.regionName && !a.source.includes(a.regionName) && <span>{regionName(a.regionName, lang)}</span>}
                    </div>
                    <h3 className="mt-1.5 font-semibold leading-snug group-hover:text-teal-700">{a.title}</h3>
                    {a.categories[0] && <Badge variant="secondary" className="mt-2">{tradeName(a.categories[0], lang)}</Badge>}
                  </div>
                  <div className="shrink-0 text-right">
                    <div className={cn("text-xl font-extrabold tracking-tight", a.amount ? "text-indigo" : "text-muted-foreground")}>
                      {a.amount ? money(a.amount, lang) : t.valueNotDisclosed}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
            {fmt(t.footnote, { issuers: issuers.join(", "), attributions: attributions.join(" "), site: SITE.name })}
          </p>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl bg-indigo p-6 text-white">
            <h2 className="text-lg font-semibold">
              {open.length > 0 ? plural(open.length, t.open.title) : t.open.none}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-indigo-100/80">
              {t.open.body}
            </p>
            <Link href={signUpHrefForPlan("pro", "monthly")} className={cn(buttonVariants({ variant: "accent" }), "mt-4 w-full")}>
              {fmt(t.open.cta, { price: PRICING.proMonthly })} <ArrowRight className="size-4" />
            </Link>
            {open.length > 0 && (
              <ul className="mt-5 space-y-2 border-t border-white/15 pt-4 text-sm">
                {open.slice(0, 5).map((r) => (
                  <li key={r.slug}>
                    <Link href={`/rfps/${r.slug}`} className="line-clamp-2 text-indigo-100 hover:text-white hover:underline">
                      {r.title}
                    </Link>
                    <span className="text-xs text-teal-300">{fmt(t.open.closes, { date: day(r.deadline, lang) })}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* The winner may need subs — their latest award prefills the first package. */}
          <GcPackageCta awardSlug={w.awards[0]?.slug ?? null} title={t.gcTitle} />

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 text-base font-semibold"><Building2 className="size-4" /> {t.claim.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {fmt(t.claim.body, { site: SITE.name })}
            </p>
            <Link href="/sign-up?role=trade" className={cn(buttonVariants({ variant: "outline" }), "mt-4 w-full")}>
              {t.claim.cta}
            </Link>
          </div>
        </aside>
      </Container>
    </>
  );
}
