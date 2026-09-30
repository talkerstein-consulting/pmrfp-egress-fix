/**
 * French alt text for the shared photos (@/lib/photos), used by the SEO pages
 * (trade hubs, /for pages). Keyed like PHOTOS, so a new photo is a type error
 * here until it has French alt text.
 */
import type { Locale } from "@/i18n/config";
import { PHOTOS, type Photo } from "@/lib/photos";
import { ALT_ES } from "./photos.es";

const ALT_FR: Record<keyof typeof PHOTOS, string> = {
  hvac: "Technicien marchant entre des unités de CVC sur le toit d'un immeuble commercial",
  roof: "Toit plat commercial avec des unités sur le toit et des plaques de neige",
  electrical: "Électricien vérifiant les disjoncteurs d'un panneau de distribution avec un testeur de tension",
  plumbing: "Tuyaux, vannes et manomètres dans la salle mécanique d'un immeuble",
  snow: "Camion de déneigement dégageant une route pendant une tempête hivernale",
  scaffolding: "Équipe casquée, en vêtements haute visibilité, grimpant dans l'échafaudage d'un immeuble",
  landscaping: "Équipe d'entretien paysager tondant et taillant la pelouse d'une propriété",
  paving: "Épandeuse posant de l'asphalte neuf, avec un ouvrier à côté",
  parkingLot: "Vue aérienne d'un grand stationnement commercial aux cases peintes",
  sprinkler: "Tuyauterie rouge de gicleurs le long du plafond de béton d'un stationnement intérieur",
  loadingDocks: "Portes de quais de chargement d'un entrepôt industriel",
  condo: "Immeuble de copropriétés de hauteur moyenne avec balcons",
  lobby: "Hall d'un immeuble de bureaux avec un comptoir d'accueil en pierre",
  lobbyGates: "Hall de bureaux avec tourniquets de sécurité et ascenseurs",
  elevatorLobby: "Batterie d'ascenseurs dans le hall d'un immeuble commercial",
  windowCleaners: "Laveurs de vitres sur cordes nettoyant la façade vitrée d'une tour de bureaux",
  cameras: "Deux caméras de surveillance fixées au mur d'un immeuble",
  evCharging: "Voiture électrique branchée à une borne de recharge dans un stationnement",
  framing: "Menuisier travaillant sur une charpente de bois sous un ciel bleu",
  demolition: "Équipe et mini-excavatrice démolissant une partie d'un bâtiment",
  masonry: "Maçon posant des blocs de béton à la truelle",
  drywall: "Aménagement intérieur commercial avec montants d'acier et panneaux de gypse",
  solar: "Panneaux solaires couvrant le toit plat d'un immeuble commercial",
  floorCrew: "Équipe finissant le plancher de béton poli d'un nouvel entrepôt",
  ceilingLift: "Technicien sur une nacelle installant de l'équipement au plafond d'un stationnement",
  dumpster: "Conteneur rempli de débris de construction",
  pest: "Technicien en extermination tenant un pulvérisateur sous pression",
  fence: "Clôture à mailles losangées en bordure d'une propriété",
  rollUpDoor: "Porte roulante en acier sur un bâtiment commercial",
  waterDamage: "Plafond endommagé par l'eau, au plâtre arraché",
  keys: "Main tenant un trousseau de clés devant une porte ouverte",
  woodshop: "Ébéniste à son établi dans un atelier d'ébénisterie",
  retailAerial: "Vue aérienne d'un mégacentre commercial de banlieue et de ses stationnements",
  floorCoating: "Équipe appliquant au rouleau un revêtement sur le plancher de béton d'un grand entrepôt",
  officeTower: "Façade de verre incurvée d'un immeuble de bureaux moderne",
  torontoFlatiron: "L'édifice Gooderham (Flatiron) de Toronto, avec les tours du centre-ville derrière",
  siteCrew: "Équipe de construction casquée, en vêtements haute visibilité, travaillant sur une dalle de béton",
};

const bySrc = (alts: Record<keyof typeof PHOTOS, string>) =>
  new Map((Object.keys(PHOTOS) as (keyof typeof PHOTOS)[]).map((k) => [PHOTOS[k].src, alts[k]]));

const BY_SRC: Partial<Record<Locale, Map<string, string>>> = { fr: bySrc(ALT_FR), es: bySrc(ALT_ES) };

/** The photo's alt text in the page language (English is the photo's own; Spanish lives in ./photos.es). */
export function photoAlt(photo: Photo, lang: Locale): string {
  return BY_SRC[lang]?.get(photo.src) ?? photo.alt;
}
