/**
 * Per-template Open Graph image. Templates get shared a lot — PMs pinging
 * peers, trade associations linking to scope examples, etc. Strong preview
 * card = more clicks.
 */
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/template";
import { getRfpTemplate } from "@/lib/seo/rfp-templates";
import { localizeRfpTemplate } from "@/lib/seo/rfp-templates.fr";
import { getDictionary } from "@/i18n/dictionaries";
import { hasLocale, type Locale } from "@/i18n/config";
import { fmt } from "@/i18n/format";

export const runtime = "nodejs";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;

export default async function OG({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang: Locale = hasLocale(raw) ? raw : "en";
  const o = getDictionary(lang).content.templateOg;
  const base = getRfpTemplate(slug);

  if (!base) {
    return renderOgImage({
      eyebrow: o.eyebrowFallback,
      title: o.notFound,
      caption: "pmrfp.com",
    });
  }

  const t = localizeRfpTemplate(base, lang);
  return renderOgImage({
    eyebrow: fmt(o.eyebrow, { trade: t.tradeName }),
    title: t.shortName,
    subline: t.pitch,
    caption: o.caption,
  });
}
