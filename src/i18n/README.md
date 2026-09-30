# Translations (English, French, Spanish)

English stays at the existing URLs (`/rfps`). French is `/fr/rfps`, Spanish `/es/rfps`.
`src/proxy.ts` rewrites unprefixed requests to `/en/...` internally, so every page lives under `src/app/[lang]`.
Which languages are live: `ENABLED_LOCALES` in `config.ts`.

## Where strings live
One file per area in `messages/<namespace>.ts`:

```ts
const en = {
  hero: { title: "Commercial property RFPs", cta: "Browse RFPs" },
  count: { one: "{n} open contract", other: "{n} open contracts" },
};
const fr: typeof en = {
  hero: { title: "Appels d'offres immobiliers commerciaux", cta: "Parcourir les appels d'offres" },
  count: { one: "{n} contrat ouvert", other: "{n} contrats ouverts" },
};
export default { en, fr };
```

`fr` is typed `typeof en`: a missing key is a type error. Namespaces are registered in `dictionaries.ts`;
the ones in `CLIENT_NAMESPACES` also reach the browser.

## Using them
| Where | How |
|---|---|
| Server page/layout | Already calls `await setLangFrom(params)`. Then `const t = getT("board"); const lang = getLang();` (`@/i18n/server`) |
| Server component | `getT("shared")`, `getLang()`. No props needed. |
| Client component (`"use client"`) | `const t = useT("boardClient"); const lang = useLang();` (`@/i18n/provider`). Only client namespaces. |
| `generateMetadata` | `const { lang } = await params; const t = getDictionary(hasLocale(lang) ? lang : "en").board;` and `alternates: alternatesFor(lang, "/rfps")` (`@/i18n/metadata`). A static `export const metadata` must become `generateMetadata` to be translated. |
| Placeholders | `fmt(t.closesOn, { date })`; plurals `plural(n, t.count)` (`@/i18n/format`) |
| Dates / numbers | `formatDate(d, lang)`, `formatNumber(n, lang)` (`@/i18n/format`) instead of `toLocaleDateString("en-CA")` |
| DB names | `tradeName(name, lang)`, `regionName(name, lang)`, `propertyTypeName(name, lang)` (`@/i18n/terms`) |
| Links | `import Link from "@/i18n/link"` (already swapped everywhere) prefixes `/fr`. For `router.push`/`redirect` with a path, use `localizePath(path, lang)` (`@/i18n/config`). |
| Active nav | `useLocalePath()` instead of `usePathname()` when comparing to hrefs. |

Mixed JSX (a link or bold inside a sentence): split the sentence into keys (`before`, `link`, `after`)
rather than putting HTML in strings.

## Rules
- Translate everything a visitor reads: JSX text, `alt`, `aria-label`, `placeholder`, `title`, button labels, toasts, form errors, empty states, metadata title/description.
- Do not translate: data from the database (listing titles, company names), brand/product names (PMRFP, Trade Pro, PermitClub), URLs, slugs, analytics event names, CSS classes, code identifiers, admin-only screens.
- English strings must stay exactly as they are today. The English site must not change.
- French is Quebec French, `vous`, natural and plain (not word-for-word):
  RFP / tender → appel d'offres · bid → soumission (to bid → soumissionner) · contractor / trade company → entrepreneur ·
  tradespeople → gens de métier · trade (category) → corps de métier · property manager → gestionnaire immobilier ·
  condo board → syndicat de copropriété · realtor → courtier immobilier · closing date → date de clôture ("Closes Oct 26" → "Clôture le 26 oct.") ·
  awarded → octroyé · contract winner → adjudicataire · HVAC → CVC · snow removal → déneigement · janitorial → entretien ménager ·
  directory → répertoire · sign in → se connecter · sign up / join → s'inscrire · Featured → En vedette.
- Money in French: `249 $/an`, `29 $/mois`, `75 $` (number, space, `$`). Keep "CAD" where English has it.
- Legal text (disclaimers, terms) is translated faithfully, never shortened.
- Keep Tailwind classes, layout and behaviour identical. Only strings move.

## Spanish (`es`)
Add `const es: typeof en = { ... }` next to `fr` in each namespace file and export `{ en, fr, es }`.
Until a namespace has `es`, Spanish falls back to English. `/es` stays closed (redirects to English) until
`"es"` is added to `ENABLED_LOCALES`, so partial Spanish never ships.

Spanish is neutral Latin-American Spanish for U.S. (and Canadian) readers, `usted`, plain and natural:
RFP → solicitud de propuestas (RFP) · tender / public tender → licitación / licitación pública · bid (noun) → oferta · to bid → presentar una oferta ·
quote → cotización · contractor / trade company → contratista · tradespeople → trabajadores de oficios · trade (category) → oficio ·
property manager → administrador de propiedades · condo board → junta de condominio · realtor → agente inmobiliario ·
closing date → fecha de cierre ("Closes Oct 26" → "Cierra el 26 oct") · awarded → adjudicado · contract winner → adjudicatario ·
HVAC → HVAC (climatización) · snow removal → remoción de nieve · janitorial → limpieza y conserjería · roofing → techado ·
directory → directorio · sign in → iniciar sesión · sign up / join → registrarse · Featured → Destacado · SEO Listing → Ficha SEO ·
workers' comp → seguro de compensación laboral (WSIB/WCB in Canada) · general contractor → contratista general.
Money in Spanish: `$249 al año`, `$29 al mes`, `$75` (dollar sign first, as in U.S. Spanish); keep "CAD"/"USD" where English has them.
Legal pages get the line « Esta traducción se ofrece a título informativo. En caso de discrepancia, prevalece la versión en inglés. »
