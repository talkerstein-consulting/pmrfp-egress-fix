/**
 * French copy for the trade solutions (lib/partners/vertical-solutions),
 * keyed by trade slug. The linked page on talkerstein.com is in English, so
 * the anchor says so. A trade without French copy shows the English block.
 */
import type { Locale } from "@/i18n/config";
import type { VerticalSolution } from "@/lib/partners/vertical-solutions";
import { SOLUTIONS_ES } from "./solutions.es";

export type SolutionCopy = Pick<VerticalSolution, "headline" | "pitch" | "points" | "anchor">;

const FR: Record<string, SolutionCopy> = {
  "snow-removal": {
    headline: "Storm Log : prouvez chaque passage, à chaque propriété",
    pitch:
      "Quand une réclamation pour une chute arrive, la question est de savoir ce qui s'est passé à cette propriété, ce jour-là, à cette heure-là. Storm Log donne à chaque propriété un registre que votre gestionnaire immobilier peut consulter en tout temps.",
    points: [
      "Chaque passage horodaté par GPS, avec photos et le sel épandu",
      "Un lien privé par propriété pour le gestionnaire immobilier, sans application à installer",
      "Un rapport de saison par propriété à la fonte des neiges",
    ],
    anchor: "Découvrir Storm Log pour les entrepreneurs en déneigement (en anglais)",
  },
};

const COPY: Partial<Record<Locale, Record<string, SolutionCopy>>> = { fr: FR, es: SOLUTIONS_ES };

/** The solution with its copy in the page language (English when there's no translation; Spanish lives in ./solutions.es). */
export function solutionFor(solution: VerticalSolution, lang: Locale): VerticalSolution {
  const copy = COPY[lang]?.[solution.tradeSlug];
  return copy ? { ...solution, ...copy } : solution;
}
