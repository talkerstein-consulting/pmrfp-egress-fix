import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/i18n/link";
import { Suspense } from "react";
import {
  AppWindow,
  ArrowRight,
  ArrowUpRight,
  Check,
  FileText,
  HardHat,
  Inbox,
  Landmark,
  LayoutDashboard,
  Layers,
  Mail,
  MousePointerClick,
  Package,
  ShieldCheck,
  Tag,
  Target,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Container, Eyebrow } from "@/components/container";
import { CTASection, SectionHeading } from "@/components/public/section";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { EmailPlacementMock, TenderPageMock } from "@/components/advertise/sponsor-mock";
import {
  ANNUAL_MONTHS_BILLED,
  FOUNDING_PARTNERS,
  SPONSOR_PACKAGES,
  cad,
  packageCopy,
  type SponsorPackage,
} from "@/components/advertise/packages";
import { getCategories, getRegions, type CategoryOption, type RegionOption } from "@/lib/data/taxonomy";
import { getPlatformStats, type PlatformStats } from "@/lib/data/stats";
import { listAllRfpsCached } from "@/lib/data/trade-city";
import { boardStats, compactDollars, isPastContract, type BoardStats } from "@/lib/data/fomo";
import type { RfpListItem } from "@/lib/data/types";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/seo/jsonld";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SponsorEnquiryForm, SponsorEnquiryFromUrl } from "./enquiry-form";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localizePath, type Locale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt, formatNumber } from "@/i18n/format";
import { tradeName } from "@/i18n/terms";

// Reach numbers come from the live board, which refreshes daily.
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).partners.advertise.meta;
  return { title: t.title, description: t.description, alternates: alternatesFor(l, "/advertise") };
}

/**
 * Sells sponsorships. Delivery is the existing sponsor system
 * (lib/sponsors/registry.ts, SponsorSlot, /go/<id> click counting,
 * /admin/sponsors for the monthly report). Every number on this page is
 * computed from the live board: no traffic, open-rate or visitor figures,
 * and a count too small to impress is swapped for a different one.
 */

/** Public buyers the board pulls from every morning (same list as the homepage). Display names: messages/partners. */
const SOURCES = ["CanadaBuys", "SAM.gov", "City of Toronto", "Québec SEAO", "Nova Scotia", "Yukon"];

/** Icons for the audience, principle and placement lists; their copy is in messages/partners (same order). */
const AUDIENCE_ICONS: LucideIcon[] = [Package, Truck, ShieldCheck, Landmark, AppWindow, HardHat];
const PRINCIPLE_ICONS: LucideIcon[] = [Target, Layers, Tag, MousePointerClick];
const PLACEMENT_ICONS: LucideIcon[] = [Layers, FileText, LayoutDashboard, Mail, Inbox];

interface ReachStat {
  value: string;
  label: string;
  href: string;
}

/** Up to four live numbers. A count too small to impress is left out, not shown. */
function reachStats(board: BoardStats, platform: PlatformStats, categories: number, regions: RegionOption[], lang: Locale): ReachStat[] {
  const t = getT("partners").advertise.reach;
  const num = (n: number) => formatNumber(n, lang);
  const out: ReachStat[] = [];
  if (board.open >= 10) out.push({ value: num(board.open), label: t.open, href: "/rfps" });
  if (categories >= 10) out.push({ value: num(categories), label: t.categories, href: "/trades" });
  if (regions.length >= 10) {
    const us = regions.some((r) => r.slug === "united-states" || r.slug.startsWith("us-") || r.country === "USA");
    out.push({ value: num(regions.length), label: us ? t.regionsUs : t.regionsCa, href: "/regions" });
  }
  if (board.awardedValue >= 1_000_000) {
    out.push({ value: compactDollars(board.awardedValue, lang), label: t.awarded, href: "/rfps?view=awarded" });
  } else if (platform.rfpsPostedLast30Days >= 25) {
    out.push({ value: num(platform.rfpsPostedLast30Days), label: t.posted, href: "/rfps" });
  }
  if (platform.tradesListed >= 100) out.push({ value: num(platform.tradesListed), label: t.trades, href: "/directory" });
  if (out.length < 2) out.push({ value: String(SOURCES.length), label: t.sources, href: "/rfps" });
  return out.slice(0, 4);
}

/** Trades with the most open work right now, for the Trade Spotlight pitch. */
function busiestTrades(rfps: RfpListItem[], categories: CategoryOption[]) {
  const open = rfps.filter((r) => r.status === "open" && !isPastContract(r));
  return categories
    .map((c) => ({ slug: c.slug, name: c.name, open: open.filter((r) => r.categories.includes(c.name)).length }))
    .filter((t) => t.open >= 3)
    .sort((a, b) => b.open - a.open || a.name.localeCompare(b.name))
    .slice(0, 8);
}

export default async function AdvertisePage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const lang = getLang();
  const t = getT("partners").advertise;
  const crumbs = getT("partners").crumbs;
  const [rfps, categories, regions, platform] = await Promise.all([
    listAllRfpsCached().catch(() => [] as RfpListItem[]),
    getCategories(),
    getRegions(),
    getPlatformStats().catch((): PlatformStats => ({ rfpsPostedLast30Days: 0, tradesListed: 0 })),
  ]);
  const reach = reachStats(boardStats(rfps), platform, categories.length, regions, lang);
  const busiest = busiestTrades(rfps, categories);
  const lowest = Math.min(...SPONSOR_PACKAGES.map((p) => p.monthly));

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: crumbs.home, path: localizePath("/", lang) },
          { name: crumbs.advertise, path: localizePath("/advertise", lang) },
        ])}
      />
      <JsonLd data={faqSchema(t.faq.items)} />

      {/* ───────────────────────────── HERO ───────────────────────────── */}
      <section className="grid-tex relative overflow-hidden bg-indigo text-white [--grid-color:rgba(145,242,207,0.06)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 size-[640px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(145,242,207,.14), transparent 62%)" }}
        />
        <Container className="relative z-10 grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.1fr_.9fr] lg:py-24">
          <div>
            <Eyebrow className="text-teal-300">{fmt(t.hero.eyebrow, { site: SITE.name })}</Eyebrow>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.06] tracking-tight text-white md:text-5xl lg:text-[3.35rem]">
              {t.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-indigo-100/80">
              {fmt(t.hero.body, { site: SITE.name })}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="#enquire" className={cn(buttonVariants({ size: "lg", variant: "accent" }), "active:scale-[0.98]")}>
                {t.hero.cta} <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#packages"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white active:scale-[0.98]",
                )}
              >
                {t.hero.packages}
              </Link>
            </div>
            <p className="mt-6 text-sm text-indigo-100/60">
              {fmt(t.hero.from, { price: cad(lowest, lang) })}
            </p>
          </div>
          <TenderPageMock />
        </Container>
      </section>

      {/* ─────────────────────── SOURCES ─────────────────────── */}
      <section className="border-b border-border bg-secondary/40">
        <Container className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-10">
          <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            {t.sources.label}
          </p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {t.sources.names.map((s) => (
              <li key={s} className="font-heading text-base font-semibold tracking-tight text-indigo/60">
                {s}
              </li>
            ))}
            <li className="text-sm text-muted-foreground">{t.sources.more}</li>
          </ul>
        </Container>
      </section>

      {/* ─────────────────────── LIVE REACH ─────────────────────── */}
      {reach.length > 0 && (
        <section className="border-b border-border bg-background">
          <Container className="py-10">
            <div className={cn("grid grid-cols-2 gap-y-6 md:divide-x md:divide-border", reach.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4")}>
              {reach.map((s) => (
                <Link key={s.label} href={s.href} className="group pr-3 md:px-8 md:first:pl-0">
                  <div className="font-heading text-3xl font-extrabold tracking-tight text-indigo sm:text-4xl">{s.value}</div>
                  <div className="mt-1 flex items-start gap-1 text-sm text-muted-foreground group-hover:text-teal-700">
                    {s.label}
                    <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                </Link>
              ))}
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              {t.reach.note}
            </p>
          </Container>
        </section>
      )}

      {/* ─────────────────────── WHO IT'S FOR ─────────────────────── */}
      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow={t.audiences.eyebrow}
            title={t.audiences.title}
            description={t.audiences.description}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.audiences.items.map(({ title, body }, i) => {
              const Icon = AUDIENCE_ICONS[i];
              return (
              <div key={title} className="rounded-2xl border border-border bg-card p-6">
                <span className="flex size-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── HOW PLACEMENTS WORK ─────────────────────── */}
      <section className="bg-secondary/40">
        <Container className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow={t.principles.eyebrow}
              title={t.principles.title}
              description={t.principles.description}
            />
            <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {t.principles.items.map(({ title, body }, i) => {
                const Icon = PRINCIPLE_ICONS[i];
                return (
                <div key={title}>
                  <Icon className="size-5 text-teal-600" />
                  <h3 className="mt-3 text-base font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
                </div>
                );
              })}
            </div>
          </div>
          <EmailPlacementMock />
        </Container>
      </section>

      {/* ─────────────────────── WHERE YOU APPEAR ─────────────────────── */}
      <section className="bg-background">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow={t.placements.eyebrow}
            title={t.placements.title}
          />
          <div className={cn("mt-10 grid gap-6", busiest.length >= 4 && "lg:grid-cols-[1.35fr_1fr]")}>
            <ul className="divide-y divide-border rounded-2xl border border-border bg-card">
              {t.placements.items.map(({ name, where, packages }, i) => {
                const Icon = PLACEMENT_ICONS[i];
                return (
                <li key={name} className="flex gap-4 p-5 sm:p-6">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-indigo">
                    <Icon className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1 sm:flex sm:items-start sm:justify-between sm:gap-6">
                    <div>
                      <h3 className="text-base font-semibold">{name}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{where}</p>
                    </div>
                    <p className="mt-2 shrink-0 font-mono text-[11px] uppercase tracking-wide text-teal-700 sm:mt-1 sm:text-right">
                      {packages}
                    </p>
                  </div>
                </li>
                );
              })}
            </ul>
            {busiest.length >= 4 && (
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
                <p className="eyebrow text-muted-foreground">{t.placements.busiest}</p>
                <ul className="mt-3 divide-y divide-border">
                  {busiest.map((b) => (
                    <li key={b.slug}>
                      <Link href={`/trades/${b.slug}`} className="group flex items-center justify-between gap-4 py-3 text-sm">
                        <span className="font-medium text-foreground group-hover:text-teal-700">{tradeName(b.name, lang)}</span>
                        <span className="font-mono tabular-nums text-indigo">{formatNumber(b.open, lang)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  {t.placements.busiestNote}
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* ─────────────────────── PACKAGES ─────────────────────── */}
      <section id="packages" className="scroll-mt-24 border-t border-border bg-secondary/40">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow={t.packages.eyebrow}
            title={t.packages.title}
            description={t.packages.description}
          />
          <div className="mt-10 grid max-w-4xl items-stretch gap-6 md:grid-cols-2">
            {SPONSOR_PACKAGES.map((p) => (
              <PackageCard key={p.id} p={p} lang={lang} />
            ))}
          </div>
          <ul className="mt-8 grid gap-x-8 gap-y-2 text-sm text-foreground/90 sm:grid-cols-2">
            {t.packages.terms.map((line) => (
              <li key={line} className="flex gap-2">
                <Check className="mt-0.5 size-4 shrink-0 text-teal-600" />
                {line}
              </li>
            ))}
          </ul>
          {FOUNDING_PARTNERS.length > 0 && (
            <div className="mt-12 border-t border-border pt-8">
              <p className="eyebrow text-muted-foreground">{t.packages.founding}</p>
              <ul className="mt-4 flex flex-wrap items-center gap-x-10 gap-y-4">
                {FOUNDING_PARTNERS.map((f) => (
                  <li key={f.name}>
                    <a href={f.url} target="_blank" rel="sponsored noopener" className="flex items-center gap-3 text-sm font-semibold text-indigo hover:text-teal-700">
                      <Image src={f.logo} alt="" width={40} height={40} className="size-10 rounded-lg border border-border bg-white object-contain p-1" />
                      {f.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </section>

      {/* ─────────────────────── ENQUIRE ─────────────────────── */}
      <section id="enquire" className="scroll-mt-24 bg-background">
        <Container className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
          <div>
            <Eyebrow>{t.enquire.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{t.enquire.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {t.enquire.body}
            </p>
            <h3 className="mt-8 text-sm font-semibold">{t.enquire.needTitle}</h3>
            <ul className="mt-3 space-y-2 text-sm text-foreground/90">
              {t.enquire.need.map((line) => (
                <li key={line} className="flex gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-teal-600" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">{t.enquire.draft}</p>
            <p className="mt-8 text-sm text-muted-foreground">
              {t.enquire.email}{" "}
              <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(t.enquire.emailSubject)}`} className="font-medium text-teal-700 hover:underline">
                {SITE.email}
              </a>
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-xl shadow-indigo/5 sm:p-8">
            <Suspense fallback={<SponsorEnquiryForm />}>
              <SponsorEnquiryFromUrl />
            </Suspense>
          </div>
        </Container>
      </section>

      {/* ─────────────────────── FAQ ─────────────────────── */}
      <section className="border-t border-border bg-secondary/40">
        <Container size="narrow" className="py-16 sm:py-20">
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
          <div className="mt-8">
            <Accordion>
              {t.faq.items.map((item) => (
                <AccordionItem key={item.q} value={item.q}>
                  <AccordionTrigger className="text-base">{item.q}</AccordionTrigger>
                  <AccordionContent>
                    <p className="leading-relaxed text-muted-foreground">{item.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Container>
      </section>

      <CTASection
        title={t.cta.title}
        description={t.cta.description}
        primaryHref="#enquire"
        primaryLabel={t.cta.primary}
        secondaryHref="/rfps"
        secondaryLabel={t.cta.secondary}
      />
    </>
  );
}

function PackageCard({ p, lang }: { p: SponsorPackage; lang: Locale }) {
  const t = getT("partners").advertise.packages;
  const copy = packageCopy(p, getT("partnersClient"));
  const featured = p.id === "founding";
  return (
    <div
      className={cn(
        "relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 sm:p-8",
        featured ? "border-indigo bg-indigo text-white shadow-2xl shadow-indigo/25" : "border-border bg-card",
      )}
    >
      {featured && (
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-teal-300/20 blur-2xl" />
      )}
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-3">
          <h3 className={cn("text-lg font-semibold", featured && "text-white")}>{copy.name}</h3>
          {copy.note && (
            <span className="shrink-0 rounded-full bg-teal-300 px-2.5 py-0.5 text-xs font-semibold text-indigo">{copy.note}</span>
          )}
        </div>
        <p className={cn("mt-2 text-sm leading-relaxed", featured ? "text-indigo-100/75" : "text-muted-foreground")}>
          {copy.summary}
        </p>
        <div className="mt-6 flex items-baseline gap-1.5">
          <span className="font-heading text-4xl font-semibold tracking-tight">{cad(p.monthly, lang)}</span>
          <span className={cn("text-sm", featured ? "text-indigo-100/70" : "text-muted-foreground")}>{t.perMonth}</span>
        </div>
        <p className={cn("mt-1 text-xs font-medium", featured ? "text-teal-300" : "text-teal-700")}>
          {fmt(t.yearly, { price: cad(p.monthly * ANNUAL_MONTHS_BILLED, lang) })}
        </p>
        <ul className="mt-6 flex-1 space-y-3">
          {copy.features.map((f) => (
            <li key={f} className={cn("flex gap-2 text-sm", featured ? "text-indigo-100" : "text-foreground")}>
              <Check className={cn("mt-0.5 size-4 shrink-0", featured ? "text-teal-300" : "text-teal-600")} />
              {f}
            </li>
          ))}
        </ul>
        <Link
          href={`/advertise?package=${p.id}#enquire`}
          className={cn(buttonVariants({ size: "lg", variant: featured ? "accent" : "outline" }), "mt-8 w-full")}
        >
          {fmt(t.ask, { name: copy.name })}
        </Link>
      </div>
    </div>
  );
}
