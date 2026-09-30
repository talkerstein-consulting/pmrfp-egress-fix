import type { Metadata } from "next";
import Link from "@/i18n/link";
import { MapPin } from "lucide-react";
import { Container, Eyebrow } from "@/components/container";
import { CTASection } from "@/components/public/section";
import { getRegions } from "@/lib/data/taxonomy";
import { SITE } from "@/lib/site";
import { getLang, getT, setLangFrom } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale } from "@/i18n/config";
import { alternatesFor } from "@/i18n/metadata";
import { fmt } from "@/i18n/format";
import { regionName } from "@/i18n/terms";
import { frPlace } from "@/lib/seo/phrases.fr";
import { esPlace } from "@/lib/seo/phrases.es";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const l = hasLocale(lang) ? lang : "en";
  const t = getDictionary(l).seo.regionsIndex.meta;
  return {
    title: t.title,
    description: fmt(t.description, { site: SITE.name }),
    alternates: alternatesFor(l, "/regions"),
  };
}

export default async function RegionsIndexPage({ params }: { params: Promise<object> }) {
  await setLangFrom(params);
  const t = getT("seo");
  const p = t.regionsIndex;
  const lang = getLang();
  const regions = await getRegions();
  const byProvince = new Map<string, typeof regions>();
  for (const r of regions) {
    const key = r.province ?? r.country;
    if (!byProvince.has(key)) byProvince.set(key, []);
    byProvince.get(key)!.push(r);
  }

  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <Container className="py-12">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {p.title}
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            {p.lead}
          </p>
        </Container>
      </section>
      <Container className="py-12">
        <div className="space-y-8">
          {[...byProvince.entries()].map(([province, regs]) => (
            <div key={province}>
              <h2 className="eyebrow text-muted-foreground">
                {lang === "fr" ? frPlace(province) : lang === "es" ? esPlace(province) : regionName(province, lang)}
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {regs.map((r) => (
                  <Link key={r.slug} href={`/regions/${r.slug}`} className="flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-sm hover:border-teal-400">
                    <MapPin className="size-3.5 text-teal-600" /> {regionName(r.name, lang)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
      <CTASection
        title={p.cta.title}
        description={p.cta.description}
        primaryHref="/sign-up"
        primaryLabel={t.joinTrade}
        secondaryHref="/trades"
        secondaryLabel={t.browseByTrade}
      />
    </>
  );
}
