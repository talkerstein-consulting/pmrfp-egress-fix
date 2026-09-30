import type { Metadata } from "next";
import Link from "@/i18n/link";
import { notFound } from "next/navigation";
import { ArrowRight, Search } from "lucide-react";
import { Container, Eyebrow } from "@/components/container";
import { CTASection } from "@/components/public/section";
import { TrustDisclaimer } from "@/components/public/trust-disclaimer";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/seo/jsonld";
import { COST_GUIDES } from "@/lib/seo/cost-guides";
import { getCostGuideFor } from "@/lib/seo/cost-guides.fr";
import { getTemplateForCostGuide } from "@/lib/seo/rfp-templates";
import { localizeRfpTemplate } from "@/lib/seo/rfp-templates.fr";
import { SITE } from "@/lib/site";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localizePath } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";

export const revalidate = 86400;

export async function generateStaticParams() {
  return COST_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const g = getCostGuideFor(slug, l);
  if (!g) return { title: getDictionary(l).content.costGuide.notFound };
  return {
    title: g.metaTitle,
    description: g.metaDescription,
    alternates: alternatesFor(l, `/cost-guides/${g.slug}`),
  };
}

/** "Toiture" -> "toiture" mid-sentence; acronyms like "CVC" stay. */
function lowerFirst(s: string): string {
  return /^[A-ZÀ-Ý][a-zà-ÿ]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s;
}

export default async function CostGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const lang = await setLangFrom(params);
  const c = getT("content");
  const t = c.costGuide;
  const { slug } = await params;
  const g = getCostGuideFor(slug, lang);
  if (!g) notFound();
  const baseTemplate = getTemplateForCostGuide(g.slug);
  const template = baseTemplate ? localizeRfpTemplate(baseTemplate, lang) : undefined;
  const vars = {
    brand: SITE.name,
    trade: g.tradeName,
    tradeLower: lang === "en" ? g.tradeName.toLowerCase() : lowerFirst(g.tradeName),
    name: g.name,
    nameLower: lang === "en" ? g.name.toLowerCase() : lowerFirst(g.name),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: c.crumbs.home, path: localizePath("/", lang) },
          { name: c.crumbs.costGuides, path: localizePath("/cost-guides", lang) },
          { name: g.name, path: localizePath(`/cost-guides/${g.slug}`, lang) },
        ])}
      />
      <JsonLd data={faqSchema(g.faqs)} />

      <section className="border-b border-border bg-background">
        <Container className="py-14 sm:py-16">
          <Eyebrow>{fmt(t.eyebrow, vars)}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
            {g.headline}
          </h1>
          <div className="mt-6 inline-flex flex-col rounded-xl border border-border bg-secondary/40 px-5 py-4">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {t.rangeLabel}
            </span>
            <span className="mt-1 text-2xl font-bold text-indigo">{g.typicalRange}</span>
            <span className="text-sm text-muted-foreground">{g.rangeUnit}</span>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">{g.intro}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/sign-up" className={buttonVariants({ size: "lg" })}>
              {t.getQuotes}
            </Link>
            <Link
              href={`/trades/${g.tradeSlug}`}
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              {fmt(t.browseCompanies, vars)}
            </Link>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <h2 className="text-2xl font-semibold tracking-tight">{t.breakdownTitle}</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {t.breakdownLead}
        </p>
        <div className="mt-6 overflow-hidden rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-secondary/50">
              <tr>
                <th className="px-4 py-3 font-semibold">{t.thItem}</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">{t.thRange}</th>
              </tr>
            </thead>
            <tbody>
              {g.rows.map((r) => (
                <tr key={r.item} className="border-t border-border align-top">
                  <td className="px-4 py-3">
                    <span className="font-medium text-foreground">{r.item}</span>
                    {r.note && (
                      <span className="mt-0.5 block text-xs text-muted-foreground">{r.note}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold text-indigo whitespace-nowrap">{r.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>

      <section className="bg-secondary/30">
        <Container className="py-12">
          <h2 className="text-2xl font-semibold tracking-tight">{t.factorsTitle}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {g.factors.map((f) => (
              <div key={f.title} className="rounded-lg border border-border bg-card p-6">
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <Search className="size-6 text-teal-600" />
          <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
            {t.accurateTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {fmt(t.accurateBody, vars)}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/sign-up" className={buttonVariants()}>
              {t.postRfp} <ArrowRight className="size-4" />
            </Link>
            <Link href="/for-property-managers" className={buttonVariants({ variant: "outline" })}>
              {t.howWorks}
            </Link>
          </div>
        </div>

        {template && (
          <div className="mt-6 rounded-2xl border border-teal-300 bg-teal-100/40 p-6 sm:p-8">
            <Eyebrow>{t.templateEyebrow}</Eyebrow>
            <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
              {fmt(t.templateTitle, { name: template.shortName })}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t.templateBody}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href={`/rfp-templates/${template.slug}`} className={buttonVariants()}>
                {t.seeTemplate} <ArrowRight className="size-4" />
              </Link>
              <Link
                href={`/pm-dashboard/rfps/new?template=${template.slug}`}
                className={buttonVariants({ variant: "outline" })}
              >
                {t.useTemplate}
              </Link>
            </div>
          </div>
        )}
      </Container>

      <section className="border-t border-border">
        <Container size="narrow" className="py-12">
          <h2 className="text-2xl font-semibold tracking-tight">{t.faqTitle}</h2>
          <Accordion className="mt-4">
            {g.faqs.map((f, i) => (
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
        title={fmt(t.cta.title, vars)}
        description={fmt(t.cta.description, vars)}
        primaryHref="/sign-up"
        primaryLabel={t.cta.primary}
        secondaryHref={`/trades/${g.tradeSlug}`}
        secondaryLabel={fmt(t.cta.secondary, vars)}
      />
    </>
  );
}
