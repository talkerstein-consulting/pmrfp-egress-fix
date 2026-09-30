import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/i18n/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, X } from "lucide-react";
import { Container, Eyebrow } from "@/components/container";
import { CTASection } from "@/components/public/section";
import { TrustDisclaimer } from "@/components/public/trust-disclaimer";
import { RfpCard } from "@/components/public/rfp-card";
import { DirectoryCard } from "@/components/public/directory-card";
import { buttonVariants } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/seo/jsonld";
import { VERTICALS } from "@/lib/seo/verticals";
import { getVerticalFor } from "@/lib/seo/verticals.fr";
import { listAllRfpsCached } from "@/lib/data/trade-city";
import { listVendors } from "@/lib/data/directory";
import { getCategories, getRegions } from "@/lib/data/taxonomy";
import { boardStats, daysUntil, isPastContract } from "@/lib/data/fomo";
import { PHOTOS, type Photo } from "@/lib/photos";
import { cn } from "@/lib/utils";
import { getDictionary } from "@/i18n/dictionaries";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { hasLocale, localizePath } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt, formatNumber } from "@/i18n/format";
import { photoAlt } from "@/lib/seo/photos.fr";

export const revalidate = 3600;

export async function generateStaticParams() {
  return VERTICALS.map((v) => ({ vertical: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; vertical: string }> }): Promise<Metadata> {
  const { lang, vertical } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const v = getVerticalFor(vertical, l);
  if (!v) return { title: getDictionary(l).seo.notFound };
  return { title: v.metaTitle, description: v.metaDescription, alternates: alternatesFor(l, `/for/${v.slug}`) };
}

/** Buyers post work and hire; sellers find work and get found. The page's proof and steps follow that. */
const BUYERS = new Set(["builders", "general-contractors", "real-estate", "condo-boards", "investors"]);

const HERO_PHOTO: Record<string, Photo> = {
  builders: PHOTOS.siteCrew,
  "general-contractors": PHOTOS.scaffolding,
  tradesmen: PHOTOS.electrical,
  "sales-teams": PHOTOS.officeTower,
  investors: PHOTOS.retailAerial,
  "real-estate": PHOTOS.keys,
  "condo-boards": PHOTOS.condo,
  suppliers: PHOTOS.loadingDocks,
};

export default async function VerticalPage({ params }: { params: Promise<{ vertical: string }> }) {
  await setLangFrom(params);
  const seo = getT("seo");
  const t = seo.vertical;
  const lang = getLang();
  const { vertical } = await params;
  const v = getVerticalFor(vertical, lang);
  if (!v) notFound();
  const buyer = BUYERS.has(v.slug);
  const photo = HERO_PHOTO[v.slug] ?? PHOTOS.officeTower;

  const [rfps, categories, regions, vendors] = await Promise.all([
    listAllRfpsCached(),
    getCategories(),
    getRegions(),
    buyer ? listVendors({ sort: "featured" }) : Promise.resolve([]),
  ]);
  const stats = boardStats(rfps);
  const openSoon = rfps
    .filter((r) => r.status === "open" && !isPastContract(r) && (daysUntil(r.deadline) ?? 99) >= 3)
    .slice(0, 3);
  const showcase = vendors.filter((x) => x.logoUrl).slice(0, 3);

  const num = (n: number) => (lang === "en" ? String(n) : formatNumber(n, lang));
  const numbers: [string, string][] = [
    [lang === "en" ? stats.open.toLocaleString("en-CA") : formatNumber(stats.open, lang), t.numbers.open],
    [num(stats.closingThisWeek), t.numbers.closing],
    [num(categories.length), t.numbers.trades],
    [num(regions.length), t.numbers.regions],
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: seo.crumbs.home, path: localizePath("/", lang) },
          { name: seo.crumbs.solutions, path: localizePath("/for", lang) },
          { name: v.name, path: localizePath(`/for/${v.slug}`, lang) },
        ])}
      />
      <JsonLd data={faqSchema(v.faqs)} />

      {/* Hero: the promise on the left, a real photo on the right. */}
      <section className="border-b border-border bg-card">
        <Container className="grid items-center gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <Eyebrow>{fmt(t.eyebrow, { who: v.who })}</Eyebrow>
            <h1 className="mt-4 text-balance text-4xl font-bold leading-[1.06] tracking-tight sm:text-5xl">{v.headline}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{v.positioning}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={v.cta.href} className={cn(buttonVariants({ size: "lg" }), "active:scale-[0.98]")}>
                {v.cta.label} <ArrowRight className="size-4" />
              </Link>
              <Link href={v.secondaryCta.href} className={buttonVariants({ size: "lg", variant: "outline" })}>
                {v.secondaryCta.label}
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
              {v.features.map((f) => (
                <li key={f} className="flex items-center gap-1.5">
                  <Check className="size-4 text-teal-700" /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
              <Image src={photo.src} alt={photoAlt(photo, lang)} fill priority sizes="(min-width: 1024px) 520px, 100vw" className="object-cover" />
            </div>
            {stats.open >= 10 && (
              <div className="absolute -bottom-5 left-5 rounded-xl border border-border bg-card px-5 py-3 shadow-lg shadow-indigo/10">
                <div className="font-heading text-2xl font-bold tabular-nums text-indigo">{num(stats.open)}</div>
                <div className="text-xs text-muted-foreground">{t.badge}</div>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Live numbers from the board, never made up. */}
      <section className="border-b border-border bg-background">
        <Container className="grid grid-cols-2 gap-y-6 py-10 md:grid-cols-4 md:divide-x md:divide-border">
          {numbers.map(([n, label]) => (
            <div key={label} className="px-2 md:px-8 first:md:pl-0">
              <div className="font-heading text-3xl font-bold tracking-tight text-indigo">{n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </Container>
      </section>

      {/* Before and after, side by side. */}
      <section className="bg-background">
        <Container className="py-16 md:py-20">
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight">{t.changesTitle}</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{t.today}</p>
              <ul className="mt-5 space-y-4">
                {v.pains.map((p) => (
                  <li key={p} className="flex gap-3 text-[15px] text-foreground/85">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary">
                      <X className="size-3 text-muted-foreground" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-indigo p-6 text-white sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-teal-300">{t.withUs}</p>
              <ul className="mt-5 space-y-5">
                {v.valueProps.map((vp) => (
                  <li key={vp.title} className="flex gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-300">
                      <Check className="size-3 text-indigo" />
                    </span>
                    <span>
                      <span className="block font-semibold text-white">{vp.title}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-indigo-100/75">{vp.desc}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* How it works. */}
      <section className="border-y border-border bg-card">
        <Container className="py-16 md:py-20">
          <h2 className="text-3xl font-bold tracking-tight">{t.howTitle}</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {t.steps[buyer ? "buyer" : "seller"].map(({ title, desc }, i) => (
              <li key={title} className="border-t-2 border-indigo pt-5">
                <span className="font-mono text-xs text-teal-700">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Real proof: live listings for sellers, real companies for buyers. */}
      {(buyer ? showcase.length === 3 : openSoon.length === 3) && (
        <section className="bg-background">
          <Container className="py-16 md:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-bold tracking-tight">
                {buyer ? t.proofBuyer : t.proofSeller}
              </h2>
              <Link href={buyer ? "/directory" : "/rfps"} className="text-sm font-semibold text-teal-700 hover:underline">
                {buyer ? seo.browseDirectory : fmt(t.seeAllOpen, { n: num(stats.open) })} →
              </Link>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {buyer
                ? showcase.map((x) => <DirectoryCard key={x.slug} vendor={x} />)
                : openSoon.map((r) => <RfpCard key={r.slug} rfp={r} locked />)}
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-border bg-card">
        <Container size="narrow" className="py-16">
          <h2 className="text-3xl font-bold tracking-tight">{t.questions}</h2>
          <Accordion className="mt-6">
            {v.faqs.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8">
            <TrustDisclaimer />
          </div>
        </Container>
      </section>

      <CTASection
        title={v.headline}
        description={v.positioning}
        primaryHref={v.cta.href}
        primaryLabel={v.cta.label}
        secondaryHref={v.secondaryCta.href}
        secondaryLabel={v.secondaryCta.label}
      />
    </>
  );
}
