import type { Metadata } from "next";
import Link from "@/i18n/link";
import { notFound } from "next/navigation";
import { Check, X } from "lucide-react";
import { Container, Eyebrow } from "@/components/container";
import { CTASection } from "@/components/public/section";
import { RfpCard } from "@/components/public/rfp-card";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/seo/jsonld";
import { COMPETITORS } from "@/lib/seo/competitors";
import { competitorNameOf, getCompetitorFor } from "@/lib/seo/competitors.fr";
import { PRICING, SITE } from "@/lib/site";
import { listRfps } from "@/lib/data/rfps";
import { publicTenderSource } from "@/lib/tenders/sources";
import { signUpHrefForPlan } from "@/lib/billing/plan-intent";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localizePath, type Locale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt, formatNumber, plural } from "@/i18n/format";

/** Sentence case for French and Spanish ("le statu quo vs PMRFP" -> "Le statu quo...", "el statu quo" -> "El statu quo"); English is left as written. */
function cap(s: string, lang: Locale): string {
  return lang === "en" ? s : s.charAt(0).toUpperCase() + s.slice(1);
}

export const revalidate = 86400;

export async function generateStaticParams() {
  return COMPETITORS.map((c) => ({ competitor: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; competitor: string }>;
}): Promise<Metadata> {
  const { lang, competitor } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).seo.vs;
  const c = getCompetitorFor(competitor, l);
  if (!c) return { title: t.notFound };
  // Lead with the competitor's name, not ours. Search Console shows these pages
  // earn their impressions on "<competitor>", "<competitor> pricing" and
  // "<competitor> alternative" queries — searchers who have never heard of us.
  // Putting our brand first buried the term they actually typed, and the layout
  // already appends "— PMRFP", so the old title spent its budget saying our name
  // twice. "Pricing" is in the title because it's the top comparison query.
  const vars = { site: SITE.name, name: c.name, annual: PRICING.proAnnual };
  const title = c.seoTitle ?? cap(fmt(t.meta.title, vars), l);
  return {
    title,
    description: c.seoDescription ?? fmt(t.meta.description, vars),
    alternates: alternatesFor(l, `/vs/${c.slug}`),
  };
}

export default async function VersusPage({
  params,
}: {
  params: Promise<{ competitor: string }>;
}) {
  await setLangFrom(params);
  const seo = getT("seo");
  const t = seo.vs;
  const lang = getLang();
  const { competitor } = await params;
  const c = getCompetitorFor(competitor, lang);
  if (!c) notFound();
  const vars = {
    site: SITE.name,
    name: c.name,
    nameOf: competitorNameOf(c, lang),
    annual: PRICING.proAnnual,
    monthly: PRICING.proMonthly,
  };
  const num = (n: number) => (lang === "en" ? String(n) : formatNumber(n, lang));

  // Competitors that sell tender access get live proof: what's open on PMRFP
  // right now from public sources, soonest-closing first.
  const openTenders = c.publicTenderProof
    ? (await listRfps().catch(() => [])).filter(
        // Canadian sources only — the copy below names them, and these
        // competitors sell Canadian tender access.
        (r) => r.status === "open" && r.sourceType === "public_source" && !publicTenderSource(r.slug).past && publicTenderSource(r.slug).key !== "sam",
      )
    : [];
  const sample = [...openTenders]
    .sort((a, b) => (a.deadline ?? "9999").localeCompare(b.deadline ?? "9999"))
    .slice(0, 3);
  const proHref = signUpHrefForPlan("pro", "annual");

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: seo.crumbs.home, path: localizePath("/", lang) },
        { name: seo.crumbs.compare, path: localizePath("/vs", lang) },
        { name: fmt(t.crumb, vars), path: localizePath(`/vs/${c.slug}`, lang) },
      ])} />
      <JsonLd data={faqSchema(c.faqs)} />

      <section className="border-b border-border bg-secondary/30">
        <Container className="py-14">
          <nav className="mb-3 text-xs text-muted-foreground">
            <Link href="/vs" className="hover:text-foreground">{seo.crumbs.compare}</Link> / {fmt(t.trail, vars)}
          </nav>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {cap(fmt(t.title, vars), lang)}{c.publicTenderProof ? t.titleTenders : ""}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">{c.angle}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={proHref} className={buttonVariants()}>{fmt(t.startPro, vars)}</Link>
            <Link href={openTenders.length ? "/rfps" : "/pricing"} className={buttonVariants({ variant: "outline" })}>
              {openTenders.length ? fmt(t.seeOpen, { n: num(openTenders.length) }) : seo.seePricing}
            </Link>
          </div>
        </Container>
      </section>

      {c.priceTable && c.priceSource && (
        <Container className="pt-12">
          <h2 className="text-2xl font-semibold tracking-tight">{fmt(t.costsTitle, vars)}</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {t.source.before}
            <a href={c.priceSource.url} rel="nofollow noopener" target="_blank" className="text-teal-700 hover:underline">
              {fmt(t.source.link, vars)}
            </a>
            {fmt(t.source.after, { date: c.priceSource.checked })}
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/40 text-left">
                  <th className="p-3 font-medium">{t.priceHead.plan}</th>
                  <th className="p-3 font-medium">{t.priceHead.covers}</th>
                  <th className="p-3 font-medium">{t.priceHead.price}</th>
                  <th className="p-3 font-medium">{t.priceHead.perYear}</th>
                </tr>
              </thead>
              <tbody>
                {c.priceTable.map((p) => (
                  <tr key={p.plan} className="border-b border-border">
                    <td className="p-3 font-medium">{c.name} {p.plan}</td>
                    <td className="p-3 text-muted-foreground">{p.covers}</td>
                    <td className="p-3">{p.price}</td>
                    <td className="p-3">{p.perYear}</td>
                  </tr>
                ))}
                <tr className="bg-teal-100/40">
                  <td className="p-3 font-semibold">{fmt(t.proRow.plan, vars)}</td>
                  <td className="p-3 text-muted-foreground">{t.proRow.covers}</td>
                  <td className="p-3">{fmt(t.proRow.price, vars)}</td>
                  <td className="p-3 font-semibold">{fmt(t.proRow.perYear, vars)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {c.priceSource.note && <p className="mt-2 text-xs text-muted-foreground">{c.priceSource.note}</p>}
        </Container>
      )}

      <Container className="py-12">
        <h2 className="text-2xl font-semibold tracking-tight">{t.glanceTitle}</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/40 text-left">
                <th className="p-3 font-medium">{t.feature}</th>
                <th className="p-3 font-semibold text-foreground">{SITE.name}</th>
                <th className="p-3 font-medium text-muted-foreground">{c.name}</th>
              </tr>
            </thead>
            <tbody>
              {c.rows.map((r) => (
                <tr key={r.feature} className="border-b border-border last:border-0">
                  <td className="p-3 font-medium">{r.feature}</td>
                  <td className="p-3 text-foreground">{r.pmrfp}</td>
                  <td className="p-3 text-muted-foreground">{r.them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>

      {sample.length > 0 && (
        <Container className="pb-12">
          <h2 className="text-2xl font-semibold tracking-tight">
            {plural(openTenders.length, t.tendersTitle, { ...vars, n: num(openTenders.length) })}
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {t.tendersLead}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {sample.map((r) => (
              <RfpCard key={r.slug} rfp={r} locked />
            ))}
          </div>
        </Container>
      )}

      <section className="bg-secondary/30">
        <Container className="py-12">
          <h2 className="text-2xl font-semibold tracking-tight">{fmt(t.whatTitle, vars)}</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-foreground/90">{c.whatItIs}</p>
          <p className="mt-2 text-sm text-muted-foreground"><strong>{t.bestFor}</strong> {c.whoFor} · <strong>{t.pricing}</strong> {c.pricing}</p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-base font-semibold">{cap(fmt(t.strengthsTitle, vars), lang)}</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {c.strengths.map((s) => (
                  <li key={s} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" />{s}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <h3 className="text-base font-semibold">{fmt(t.winsTitle, vars)}</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {c.weaknesses.map((w) => (
                  <li key={w} className="flex gap-2"><X className="mt-0.5 size-4 shrink-0 text-teal-600" />{w}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <Container size="narrow" className="py-12">
        <h2 className="text-2xl font-semibold tracking-tight">{t.faqTitle}</h2>
        <Accordion className="mt-4">
          {c.faqs.map((f, i) => (
            <AccordionItem key={i} value={`q${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-6 text-xs text-muted-foreground">
          {fmt(t.disclaimer, vars)}
        </p>
      </Container>

      <CTASection
        title={t.cta.title}
        description={fmt(t.cta.description, vars)}
        primaryHref={proHref}
        primaryLabel={seo.startPro}
        secondaryHref="/vs"
        secondaryLabel={t.cta.secondary}
      />
    </>
  );
}
