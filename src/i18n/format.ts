import { LOCALE_TAG, type Locale } from "./config";

/** Fills {placeholders}: fmt("{n} open", { n: 3 }) -> "3 open". */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

/** Picks the singular or plural form, then fills {n}. */
export function plural(n: number, forms: { one: string; other: string }, vars: Record<string, string | number> = {}): string {
  return fmt(n === 1 ? forms.one : forms.other, { n, ...vars });
}

/** Dates pinned to UTC so server and client render the same day. */
export function formatDate(d: string | Date, lang: Locale, opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }): string {
  return new Date(d).toLocaleDateString(LOCALE_TAG[lang], { timeZone: "UTC", ...opts });
}

export function formatNumber(n: number, lang: Locale, opts?: Intl.NumberFormatOptions): string {
  return n.toLocaleString(LOCALE_TAG[lang], opts);
}
