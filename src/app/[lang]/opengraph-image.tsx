/**
 * Default Open Graph image for any PMRFP page that doesn't override one
 * (home, /pricing, /for-trades, etc.). Brand intro card, per language.
 */
import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og/template";

export const runtime = "edge";
export const contentType = OG_CONTENT_TYPE;
export const size = OG_SIZE;
export const alt = "PMRFP — commercial property RFPs and public tenders across Canada and the U.S.";

const COPY = {
  en: {
    eyebrow: "Canada & U.S. · Updated daily",
    title: "Property RFPs & public tenders on one board.",
    subline: "Snow, HVAC, roofing, cleaning, electrical and more. Trades get listed free. Property managers post free.",
    caption: "RFP board + trade directory",
  },
  fr: {
    eyebrow: "Canada et États-Unis · Mis à jour chaque jour",
    title: "Appels d'offres immobiliers et marchés publics, au même endroit.",
    subline: "Déneigement, CVC, toiture, entretien ménager, électricité et plus. Inscription gratuite pour les entrepreneurs et les gestionnaires.",
    caption: "Appels d'offres + répertoire d'entrepreneurs",
  },
} as const;

export default async function OG({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return renderOgImage(COPY[lang === "fr" ? "fr" : "en"]);
}
