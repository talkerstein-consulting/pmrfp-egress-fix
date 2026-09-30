/**
 * Request-scoped language for server components.
 *
 * Every page and layout under app/[lang] calls setLang(lang) first thing;
 * any server component rendered below can then call getLang() / getT(ns)
 * without threading `lang` through props (same idea as next-intl's
 * setRequestLocale). React's cache() scopes the value to one request.
 */
import { cache } from "react";
import { DEFAULT_LOCALE, hasLocale, type Locale } from "./config";
import { getDictionary, type Messages } from "./dictionaries";

const current = cache(() => ({ lang: DEFAULT_LOCALE as Locale }));

/** Call at the top of every page/layout: `const lang = setLang((await params).lang);` */
export function setLang(lang: string): Locale {
  const l = hasLocale(lang) ? lang : DEFAULT_LOCALE;
  current().lang = l;
  return l;
}

export function getLang(): Locale {
  return current().lang;
}

/** Server-side strings for one namespace: const t = getT("board"); */
export function getT<N extends keyof Messages>(ns: N): Messages[N] {
  return getDictionary(getLang())[ns];
}

/** Same as setLang, straight from a page's params promise (any params shape). */
export async function setLangFrom(params: Promise<object> | undefined): Promise<Locale> {
  const p = ((await params) ?? {}) as { lang?: string };
  return setLang(p.lang ?? DEFAULT_LOCALE);
}
