import type { Metadata } from "next";
import { DEFAULT_LOCALE, ENABLED_LOCALES, localizePath, type Locale } from "./config";

/**
 * canonical + hreflang for a translated page. `path` is the English path
 * ("/rfps"); each language points at its own URL and x-default at English.
 *
 *   alternates: alternatesFor(lang, "/rfps")
 *
 * Pages that are NOT translated yet keep `alternates: { canonical: "/path" }`
 * (English), so their /fr copies canonicalize to English instead of competing.
 */
export function alternatesFor(lang: Locale, path: string): NonNullable<Metadata["alternates"]> {
  const hreflang: Record<string, string> = {};
  for (const l of ENABLED_LOCALES) hreflang[l] = localizePath(path, l);
  hreflang["x-default"] = localizePath(path, DEFAULT_LOCALE);
  return { canonical: localizePath(path, lang), languages: hreflang };
}
