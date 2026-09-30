import type { Metadata } from "next";
import Link from "@/i18n/link";
import { Container, Eyebrow } from "@/components/container";
import { DynamicIcon } from "@/components/public/dynamic-icon";
import { CTASection } from "@/components/public/section";
import { getCategories } from "@/lib/data/taxonomy";
import { SITE } from "@/lib/site";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";
import { tradeName } from "@/i18n/terms";
import { frTradeOf } from "@/lib/seo/phrases.fr";
import { esTradeOf } from "@/lib/seo/phrases.es";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).seo.tradesIndex.meta;
  return {
    title: t.title,
    description: fmt(t.description, { site: SITE.name }),
    alternates: alternatesFor(l, "/trades"),
  };
}

export default async function TradesIndexPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("seo");
  const p = t.tradesIndex;
  const lang = getLang();
  const categories = await getCategories();
  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <Container className="py-12">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {p.title}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {fmt(p.lead, { site: SITE.name })}
          </p>
        </Container>
      </section>
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/trades/${c.slug}`}
              className="group flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-teal-400"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary text-teal-600 group-hover:bg-teal-100">
                <DynamicIcon name={c.icon} className="size-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground group-hover:text-teal-700">{tradeName(c.name, lang)}</span>
                <span className="block text-xs text-muted-foreground">
                  {fmt(p.card, { lower: c.name.toLowerCase(), of: lang === "es" ? esTradeOf(c.name) : frTradeOf(c.name) })}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
      <CTASection
        title={p.cta.title}
        description={p.cta.description}
        primaryHref="/sign-up"
        primaryLabel={t.joinTrade}
        secondaryHref="/regions"
        secondaryLabel={t.browseByRegion}
      />
    </>
  );
}
