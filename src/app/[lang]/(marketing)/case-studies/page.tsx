import type { Metadata } from "next";
import Link from "@/i18n/link";
import Image from "next/image";
import { Container, Eyebrow } from "@/components/container";
import { CTASection } from "@/components/public/section";
import { EmptyState } from "@/components/public/empty-state";
import { JsonLd, breadcrumbSchema, itemListSchema } from "@/lib/seo/jsonld";
import { listCaseStudies } from "@/lib/data/case-studies";
import { heroUrlsBySlug } from "@/lib/data/projects";
import { SITE } from "@/lib/site";
import { getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, localizePath } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";
import { regionName, tradeName } from "@/i18n/terms";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).content.caseStudiesIndex.meta;
  return {
    title: t.title,
    description: fmt(t.description, { brand: SITE.name }),
    alternates: alternatesFor(l, "/case-studies"),
  };
}

export default async function CaseStudiesIndexPage({ params }: { params: Promise<object> }) {
  const lang = await setLangFrom(params);
  const c = getT("content");
  const t = c.caseStudiesIndex;
  // Case study text is database content (written by member trades); only the
  // page around it and the trade / province names are translated.
  const studies = await listCaseStudies();
  const heroes = await heroUrlsBySlug(studies.map((s) => s.slug));

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: c.crumbs.home, path: localizePath("/", lang) },
        { name: c.crumbs.caseStudies, path: localizePath("/case-studies", lang) },
      ])} />
      <JsonLd data={itemListSchema(
        t.listName,
        studies.map((s) => ({ name: s.title, path: `/case-studies/${s.slug}` })),
      )} />

      <section className="border-b border-border bg-secondary/30">
        <Container className="py-12">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {fmt(t.lead, { brand: SITE.name })}
          </p>
        </Container>
      </section>

      <Container className="py-12">
        {studies.length === 0 ? (
          <EmptyState
            title={t.emptyTitle}
            description={t.emptyDescription}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {studies.map((s) => (
              <Link
                key={s.slug}
                href={`/case-studies/${s.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-teal-400 hover:shadow-sm"
              >
                {heroes.get(s.slug) && (
                  <div className="relative aspect-[16/10] bg-secondary">
                    <Image
                      src={heroes.get(s.slug)!}
                      alt={s.title}
                      fill
                      sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-teal-ink">
                    {[
                      s.categoryName ? tradeName(s.categoryName, lang) : s.categoryName,
                      [s.city, s.province ? regionName(s.province, lang) : s.province].filter(Boolean).join(", "),
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <h2 className="mt-2 text-base font-semibold leading-snug group-hover:text-teal-ink">
                    {s.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {s.challenge}
                  </p>
                  <span className="mt-auto pt-4 text-sm font-medium text-teal-ink">
                    {fmt(t.by, { org: s.orgName })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>

      <CTASection
        title={t.cta.title}
        description={fmt(t.cta.description, { brand: SITE.name })}
        primaryHref="/dashboard/projects"
        primaryLabel={t.cta.primary}
        secondaryHref="/for-trades"
        secondaryLabel={t.cta.secondary}
      />
    </>
  );
}
