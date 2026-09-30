/**
 * Spanish copy for the trade solutions (lib/partners/vertical-solutions),
 * keyed by trade slug, picked by solutionFor() in ./solutions.fr. The linked
 * page on talkerstein.com is in English, so the anchor says so. A trade
 * without Spanish copy shows the English block.
 */
import type { SolutionCopy } from "./solutions.fr";

export const SOLUTIONS_ES: Record<string, SolutionCopy> = {
  "snow-removal": {
    headline: "Storm Log: demuestre cada visita, en cada propiedad",
    pitch:
      "Cuando llega un reclamo por un resbalón y caída, la pregunta es qué pasó en esa propiedad, ese día, a esa hora. Storm Log le da a cada propiedad un registro que su administrador de propiedades puede consultar en cualquier momento.",
    points: [
      "Cada visita registrada con hora y GPS, con fotos y la sal aplicada",
      "Un enlace privado por propiedad para el administrador de propiedades, sin aplicación que instalar",
      "Un informe de temporada por propiedad cuando se derrite la nieve",
    ],
    anchor: "Ver Storm Log para contratistas de remoción de nieve (en inglés)",
  },
};
