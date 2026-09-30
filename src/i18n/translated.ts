import { ENABLED_LOCALES, type Locale } from "./config";

/**
 * Which English paths have their page copy translated, per language. The
 * sitemap pairs these with their /fr (etc.) versions via hreflang; everything
 * else is listed in English only (its /fr copy canonicalizes to English).
 * Add a pattern here when a page's translation ships.
 */
const TRANSLATED: Partial<Record<Locale, RegExp[]>> = {
  fr: [
    /^\/$/,
    /^\/rfps(\/[^/]+)?$/,
    /^\/directory(\/[^/]+)?$/,
    /^\/suppliers$/,
    /^\/pricing$/,
    /^\/for-trades$/,
    /^\/for-property-managers$/,
    /^\/rfp-writer$/,
  ],
};

/** Languages (besides English) this path is translated into. */
export function translationsOf(path: string): Locale[] {
  return ENABLED_LOCALES.filter((l) => l !== "en" && (TRANSLATED[l] ?? []).some((re) => re.test(path)));
}
