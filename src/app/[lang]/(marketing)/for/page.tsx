import type { Metadata } from "next";
import Link from "@/i18n/link";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/container";
import { CTASection } from "@/components/public/section";
import { verticalsFor } from "@/lib/seo/verticals.fr";
import { SITE } from "@/lib/site";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).seo.forIndex.meta;
  return {
    title: t.title,
    description: fmt(t.description, { site: SITE.name }),
    alternates: alternatesFor(l, "/for"),
  };
}

export default async function SolutionsIndexPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("seo").forIndex;
  const verticals = verticalsFor(getLang());
  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <Container className="py-12">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {fmt(t.lead, { site: SITE.name })}
          </p>
        </Container>
      </section>
      <Container className="py-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {verticals.map((v) => (
            <Link
              key={v.slug}
              href={`/for/${v.slug}`}
              className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-teal-400 hover:shadow-sm"
            >
              <Eyebrow>{fmt(t.cardEyebrow, { who: v.who })}</Eyebrow>
              <h2 className="mt-3 text-xl font-semibold group-hover:text-teal-700">{v.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{v.positioning}</p>
              <span className="mt-4 flex items-center gap-1 text-sm font-medium text-teal-700">
                {t.learnMore} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
      <CTASection
        title={t.cta.title}
        description={t.cta.description}
        primaryHref="/sign-up"
        primaryLabel={fmt(t.cta.primary, { site: SITE.name })}
        secondaryHref="/vs"
        secondaryLabel={t.cta.secondary}
      />
    </>
  );
}
