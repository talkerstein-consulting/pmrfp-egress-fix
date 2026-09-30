/**
 * Languages. English lives at the existing URLs (/rfps); other languages get a
 * prefix (/fr/rfps, /es/rfps). The proxy rewrites unprefixed requests to
 * /en/... internally, so every page sits under app/[lang] without English URLs
 * ever changing.
 */
export const LOCALES = ["en", "fr", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/**
 * Languages open to visitors. A locale that isn't listed here redirects to
 * English and stays out of the switcher, hreflang and the sitemap, so a
 * half-translated language never ships.
 */
export const ENABLED_LOCALES: readonly Locale[] = ["en", "fr"];

/** Remembers the visitor's choice so unprefixed links and redirects keep their language. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function hasLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as readonly string[]).includes(v);
}
export function isEnabledLocale(v: unknown): v is Locale {
  return typeof v === "string" && (ENABLED_LOCALES as readonly string[]).includes(v);
}

/** BCP 47 tags: <html lang>, Intl formatting and Open Graph. */
export const LOCALE_TAG: Record<Locale, string> = { en: "en-CA", fr: "fr-CA", es: "es" };
export const OG_LOCALE: Record<Locale, string> = { en: "en_CA", fr: "fr_CA", es: "es_US" };
export const LOCALE_NAME: Record<Locale, string> = { en: "English", fr: "Français", es: "Español" };

/** Routes that live outside app/[lang] and must never get a language prefix. */
const UNLOCALIZED = /^\/(api|embed|auth\/callback|go|app)(\/|$|\?|#)/;
const HAS_EXTENSION = /\/[^/?#]+\.[a-z0-9]{2,5}([?#].*)?$/i;

/** "/rfps?x=1" -> "/fr/rfps?x=1" for French; unchanged for English, external links and files. */
export function localizePath(path: string, lang: Locale): string {
  if (lang === DEFAULT_LOCALE) return path;
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (UNLOCALIZED.test(path) || HAS_EXTENSION.test(path)) return path;
  const first = path.split(/[/?#]/)[1];
  if (hasLocale(first)) return path; // already prefixed
  if (path === "/" || path.startsWith("/?") || path.startsWith("/#")) return `/${lang}${path.slice(1)}`;
  return `/${lang}${path}`;
}

/** "/fr/rfps" -> { lang: "fr", path: "/rfps" }. Unprefixed paths are English. */
export function splitLocale(pathname: string): { lang: Locale; path: string } {
  const first = pathname.split("/")[1];
  if (hasLocale(first)) {
    const rest = pathname.slice(first.length + 1);
    return { lang: first, path: rest === "" ? "/" : rest };
  }
  return { lang: DEFAULT_LOCALE, path: pathname };
}
