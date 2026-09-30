import type { Metadata } from "next";
import Link from "@/i18n/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/container";
import { CTASection } from "@/components/public/section";
import { TrustDisclaimer } from "@/components/public/trust-disclaimer";
import { JsonLd, breadcrumbSchema, itemListSchema } from "@/lib/seo/jsonld";
import { costGuidesFor } from "@/lib/seo/cost-guides.fr";
import { SITE } from "@/lib/site";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localizePath } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).content.costIndex.meta;
  return {
    title: t.title,
    description: t.description,
    alternates: alternatesFor(l, "/cost-guides"),
  };
}

export default async function CostGuidesIndexPage({ params }: { params: Promise<object> }) {
  const lang = await setLangFrom(params);
  const c = getT("content");
  const t = c.costIndex;
  const guides = costGuidesFor(lang);
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: c.crumbs.home, path: localizePath("/", lang) },
          { name: c.crumbs.costGuides, path: localizePath("/cost-guides", lang) },
        ])}
      />
      <JsonLd
        data={itemListSchema(
          t.listName,
          guides.map((g) => ({ name: g.name, path: localizePath(`/cost-guides/${g.slug}`, lang) })),
        )}
      />

      <section className="border-b border-border bg-secondary/30">
        <Container className="py-12">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {t.lead}
          </p>
        </Container>
      </section>

      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/cost-guides/${g.slug}`}
              className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-teal-400 hover:shadow-sm"
            >
              <Eyebrow>{g.tradeName}</Eyebrow>
              <h2 className="mt-3 text-lg font-semibold leading-snug group-hover:text-teal-700">
                {g.name}
              </h2>
              <p className="mt-2 text-sm font-medium text-foreground/90">
                {t.typical} {g.typicalRange}{" "}
                <span className="font-normal text-muted-foreground">— {g.rangeUnit}</span>
              </p>
              <span className="mt-4 flex items-center gap-1 text-sm font-medium text-teal-700">
                {t.seeGuide}{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <TrustDisclaimer />
        </div>
      </Container>

      <CTASection
        title={t.cta.title}
        description={fmt(t.cta.description, { brand: SITE.name })}
        primaryHref="/sign-up"
        primaryLabel={t.cta.primary}
        secondaryHref="/directory"
        secondaryLabel={t.cta.secondary}
      />
    </>
  );
}
