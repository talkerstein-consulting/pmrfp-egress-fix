/**
 * Per-cost-guide Open Graph image. Cost-guide pages target high-intent search
 * traffic ("commercial roof replacement cost") — strong preview card drives
 * social shares from researchers + procurement folks.
 */
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/template";
import { getCostGuideFor } from "@/lib/seo/cost-guides.fr";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, type Locale } from "@/i18n/config";
import { fmt } from "@/i18n/format";

export const runtime = "nodejs";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default async function OG({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const o = getDictionary(lang).content.costOg;
  const g = getCostGuideFor(slug, lang);

  if (!g) {
    return renderOgImage({
      eyebrow: o.eyebrowFallback,
      title: o.notFound,
      caption: "pmrfp.com",
    });
  }

  return renderOgImage({
    eyebrow: fmt(o.eyebrow, { trade: g.tradeName }),
    title: g.name,
    subline: fmt(o.subline, { range: g.typicalRange }),
    caption: g.rangeUnit,
  });
}
