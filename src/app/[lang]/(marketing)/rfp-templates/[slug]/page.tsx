import type { Metadata } from "next";
import Link from "@/i18n/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Calendar,
  CheckSquare,
  ClipboardList,
  Download,
  FileText,
  HelpCircle,
  KeySquare,
  Scale,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
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
import { RFP_TEMPLATES, getRfpTemplate } from "@/lib/seo/rfp-templates";
import { localizeRfpTemplate } from "@/lib/seo/rfp-templates.fr";
import { getCostGuideFor } from "@/lib/seo/cost-guides.fr";
import { cn } from "@/lib/utils";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localizePath } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";

export const revalidate = 86400;

export async function generateStaticParams() {
  return RFP_TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const base = getRfpTemplate(slug);
  if (!base) return { title: getDictionary(l).content.template.notFound };
  const t = localizeRfpTemplate(base, l);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: alternatesFor(l, `/rfp-templates/${t.slug}`),
  };
}

/** "Toiture" -> "toiture" mid-sentence; acronyms like "CVC" stay. */
function lowerFirst(s: string): string {
  return /^[A-ZÀ-Ý][a-zà-ÿ]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s;
}

export default async function RfpTemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const lang = await setLangFrom(params);
  const c = getT("content");
  const tt = c.template;
  const { slug } = await params;
  const base = getRfpTemplate(slug);
  if (!base) notFound();
  const t = localizeRfpTemplate(base, lang);
  const tradeLower = lang === "en" ? t.tradeName.toLowerCase() : lowerFirst(t.tradeName);

  const costGuide = t.costGuideSlug ? getCostGuideFor(t.costGuideSlug, lang) : undefined;

  const related = RFP_TEMPLATES.filter(
    (other) => other.slug !== t.slug && other.tradeSlug === t.tradeSlug,
  )
    .slice(0, 3)
    .map((other) => localizeRfpTemplate(other, lang));

  // Single CTA that does the right thing regardless of auth state.
  // /use-template/[slug] is a tiny server route that branches on session.
  const useTemplateHref = `/use-template/${t.slug}`;
  const signUpHref = `/sign-up?role=property_manager&next=${encodeURIComponent(
    localizePath(`/pm-dashboard/rfps/new?template=${t.slug}`, lang),
  )}`;
  const pdfHref = `/rfp-templates/${t.slug}/print`;

  // HowTo-style article schema (use Article — broadly understood) + FAQ + Breadcrumb.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t.query,
    description: t.metaDescription,
    step: t.timeline.map((phase, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: phase.label,
      text: phase.detail,
    })),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: c.crumbs.home, path: localizePath("/", lang) },
          { name: c.crumbs.templates, path: localizePath("/rfp-templates", lang) },
          { name: t.name, path: localizePath(`/rfp-templates/${t.slug}`, lang) },
        ])}
      />
      <JsonLd data={faqSchema(t.faqs)} />
      <JsonLd data={articleSchema} />

      {/* HERO */}
      <section className="border-b border-border bg-background">
        <Container className="py-14 sm:py-16">
          <Eyebrow>{fmt(tt.eyebrow, { trade: t.tradeName })}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
            {t.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.pitch}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={useTemplateHref}
              className={buttonVariants({ size: "lg" })}
            >
              {tt.useTemplate} <ArrowRight className="size-4" />
            </Link>
            <Link
              href={pdfHref}
              className={buttonVariants({ size: "lg", variant: "outline" })}
            >
              <Download className="size-4" /> {tt.downloadPdf}
            </Link>
            <Link
              href={signUpHref}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {tt.noAccount}
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <FactPill icon={<Sparkles className="size-4" />} label={tt.factPrefilled} />
            <FactPill
              icon={<FileText className="size-4" />}
              label={fmt(tt.factTagged, { slug: t.tradeSlug, trade: t.tradeName })}
            />
            <FactPill icon={<Calendar className="size-4" />} label={fmt(tt.factPhases, { n: t.timeline.length })} />
          </div>
        </Container>
      </section>

      {/* WHEN TO USE */}
      <Container className="py-12">
        <div className="rounded-2xl border border-border bg-secondary/30 p-6 sm:p-8">
          <Eyebrow>{tt.whenToUse}</Eyebrow>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-foreground/90">
            {t.whenToUse}
          </p>
        </div>
      </Container>

      {/* SAMPLE TITLE + SUMMARY */}
      <Container className="py-6">
        <h2 className="text-2xl font-semibold tracking-tight">{tt.sampleTitle}</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {tt.sampleLead}
        </p>
        <div className="mt-5 overflow-hidden rounded-xl border border-border">
          <div className="border-b border-border bg-secondary/40 px-5 py-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {tt.titleLabel}
            </span>
            <p className="mt-1 text-base font-semibold text-foreground">{t.titleSample}</p>
          </div>
          <div className="bg-card px-5 py-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {tt.summaryLabel}
            </span>
            <p className="mt-1 text-sm leading-relaxed text-foreground/90">{t.summarySample}</p>
          </div>
        </div>
      </Container>

      {/* SCOPE */}
      <section className="border-t border-border bg-secondary/20">
        <Container className="py-12">
          <SectionHeading icon={<ClipboardList className="size-5" />} title={tt.scope} />
          <div className="mt-5 rounded-xl border border-border bg-card p-6 sm:p-8">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
              {t.scope}
            </pre>
          </div>
        </Container>
      </section>

      {/* REQUIREMENTS */}
      <Container className="py-12">
        <SectionHeading icon={<ShieldCheck className="size-5" />} title={tt.requirements} />
        <div className="mt-5 rounded-xl border border-border bg-card p-6 sm:p-8">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
            {t.requirements}
          </pre>
        </div>
      </Container>

      {/* TIMELINE */}
      <section className="border-t border-border bg-secondary/20">
        <Container className="py-12">
          <SectionHeading icon={<Calendar className="size-5" />} title={tt.timeline} />
          <ol className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.timeline.map((phase, i) => (
              <li
                key={phase.label}
                className="flex gap-4 rounded-lg border border-border bg-card p-5"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-bold text-teal-ink">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{phase.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {phase.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* SITE ACCESS */}
      <Container className="py-12">
        <SectionHeading icon={<KeySquare className="size-5" />} title={tt.siteAccess} />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/90">{t.siteAccess}</p>
      </Container>

      {/* QUESTIONS TO ASK BIDDERS */}
      <section className="border-t border-border bg-secondary/20">
        <Container className="py-12">
          <SectionHeading
            icon={<HelpCircle className="size-5" />}
            title={tt.questionsTitle}
          />
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
            {tt.questionsLead}
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.questions.map((q, i) => (
              <li
                key={i}
                className="flex gap-3 rounded-lg border border-border bg-card p-5 text-sm"
              >
                <CheckSquare className="size-4 shrink-0 text-teal-ink" />
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* EVALUATION CRITERIA */}
      <Container className="py-12">
        <SectionHeading icon={<Scale className="size-5" />} title={tt.evaluationTitle} />
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground">
          {tt.evaluationLead}
        </p>
        <ol className="mt-6 grid gap-2 sm:grid-cols-2">
          {t.evaluationCriteria.map((crit, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-lg border border-border bg-card p-4 text-sm"
            >
              <span className="text-sm font-semibold text-teal-ink">{i + 1}.</span>
              <span>{crit}</span>
            </li>
          ))}
        </ol>
      </Container>

      {/* COST GUIDE CROSS-LINK */}
      {costGuide && (
        <section className="border-t border-border bg-indigo text-white">
          <Container className="py-10">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Eyebrow className="text-teal">{tt.costEyebrow}</Eyebrow>
                <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
                  {costGuide.headline.replace(/\?$/, "")}
                </h2>
                <p className="mt-1 text-sm text-indigo-100/80">
                  {fmt(tt.costLead, {
                    tradeLower: lang === "en" ? costGuide.tradeName.toLowerCase() : lowerFirst(costGuide.tradeName),
                  })}
                </p>
              </div>
              <Link
                href={`/cost-guides/${costGuide.slug}`}
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white",
                )}
              >
                {tt.costCta} <ArrowRight className="size-4" />
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* MATCHING TRADES */}
      <Container className="py-12">
        <SectionHeading icon={<Wrench className="size-5" />} title={tt.matchingTitle} />
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          {tt.matchingLead}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/trades/${t.tradeSlug}`}
            className={buttonVariants({ variant: "outline" })}
          >
            {fmt(tt.browseCompanies, { trade: t.tradeName, tradeLower })} <ArrowRight className="size-4" />
          </Link>
          <Link href="/directory" className={buttonVariants({ variant: "outline" })}>
            {tt.fullDirectory}
          </Link>
        </div>
      </Container>

      {/* FAQS */}
      <section className="border-t border-border bg-secondary/20">
        <Container size="narrow" className="py-12">
          <h2 className="text-2xl font-semibold tracking-tight">{tt.faqTitle}</h2>
          <Accordion className="mt-5">
            {t.faqs.map((f, i) => (
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

      {/* RELATED TEMPLATES */}
      {related.length > 0 && (
        <Container className="py-12">
          <h2 className="text-2xl font-semibold tracking-tight">
            {fmt(tt.moreTemplates, { trade: t.tradeName, tradeLower })}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/rfp-templates/${r.slug}`}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-all hover:border-teal-400 hover:shadow-sm"
              >
                <Eyebrow>{r.tradeName}</Eyebrow>
                <h3 className="mt-3 text-base font-semibold leading-snug group-hover:text-teal-ink">
                  {r.shortName}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.pitch}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-ink">
                  {tt.seeTemplate}{" "}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      )}

      <CTASection
        title={fmt(tt.cta.title, { trade: t.tradeName, tradeLower })}
        description={fmt(tt.cta.description, { name: t.shortName })}
        primaryHref={useTemplateHref}
        primaryLabel={tt.cta.primary}
        secondaryHref="/rfp-templates"
        secondaryLabel={tt.cta.secondary}
      />
    </>
  );
}

function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 items-center justify-center rounded-lg bg-teal-100 text-teal-ink">
        {icon}
      </span>
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

function FactPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm">
      <span className="text-teal-ink">{icon}</span>
      <span className="text-foreground/90">{label}</span>
    </div>
  );
}
