/**
 * French phrasing for the programmatic SEO pages (/trades, /regions).
 *
 * Trade and place names come from the database in English. tradeName() and
 * regionName() (@/i18n/terms) give the French noun; these give the phrase a
 * French sentence needs around it:
 *   "Roofing RFPs in Toronto" -> "Appels d'offres en toiture à Toronto"
 *   "Snow Removal contractors in Quebec" -> "Entrepreneurs de déneigement au Québec"
 * Keys are the English database names. Anything missing falls back to a
 * phrasing that is always grammatical.
 */
import { regionName, tradeName } from "@/i18n/terms";

/**
 * Trade complement, written to read after "appels d'offres", "entrepreneurs",
 * "entreprises", "contrats", "travaux" or "projet".
 */
const TRADE_OF: Record<string, string> = {
  "Access Control": "en contrôle d'accès",
  "Appliance Repair": "en réparation d'électroménagers",
  "Building Automation": "en automatisation du bâtiment",
  "Cameras / Surveillance": "en vidéosurveillance",
  Carpentry: "en menuiserie",
  "Cleaning / Janitorial": "d'entretien ménager",
  "Concierge & Porter Services": "de conciergerie",
  "Concrete and Asphalt": "en béton et asphalte",
  Demolition: "en démolition",
  Drywall: "en gypse",
  "Dumpster & Bin Rental": "de location de conteneurs",
  Electrical: "en électricité",
  "Elevator Services": "en ascenseurs",
  "Energy Efficiency": "en efficacité énergétique",
  "Environmental / Hazardous Materials": "en environnement et matières dangereuses",
  "EV Charging": "en bornes de recharge",
  Fencing: "en clôtures",
  "Fire Safety": "en sécurité incendie",
  Flooring: "en revêtements de sol",
  "Garage Doors": "en portes de garage",
  "General Contracting": "en construction générale",
  "Glass and Windows": "en vitrerie et fenêtres",
  "Handyman / Maintenance": "en entretien et réparations",
  HVAC: "en CVC",
  Landscaping: "en aménagement paysager",
  Lighting: "en éclairage",
  Locksmith: "en serrurerie",
  Masonry: "en maçonnerie",
  Millwork: "en ébénisterie",
  "Mold Remediation": "en décontamination de moisissures",
  Painting: "en peinture",
  "Parking & Valet Services": "de stationnement et voiturier",
  "Parking Lot Maintenance": "d'entretien de stationnements",
  "Pest Control": "d'extermination",
  Plumbing: "en plomberie",
  "Property Maintenance": "d'entretien immobilier",
  Restoration: "en restauration après sinistre",
  Roofing: "en toiture",
  "Security Personnel": "de gardiennage",
  "Security Systems": "en systèmes de sécurité",
  Signage: "en enseignes",
  "Snow Removal": "de déneigement",
  "Temporary Workforce": "de main-d'œuvre temporaire",
  "Waste Removal": "de collecte des déchets",
  Waterproofing: "en imperméabilisation",
};

/** "Roofing" -> "en toiture", "Snow Removal" -> "de déneigement". */
export function frTradeOf(name: string): string {
  return TRADE_OF[name] ?? `dans la catégorie ${tradeName(name, "fr")}`;
}

/** Places that don't take "à": provinces, territories, states, countries, the GTA. */
const PLACE_IN: Record<string, string> = {
  Canada: "au Canada",
  "United States": "aux États-Unis",
  USA: "aux États-Unis",
  Quebec: "au Québec",
  Ontario: "en Ontario",
  "Greater Toronto Area": "dans le Grand Toronto",
  "British Columbia": "en Colombie-Britannique",
  Alberta: "en Alberta",
  Saskatchewan: "en Saskatchewan",
  Manitoba: "au Manitoba",
  "Nova Scotia": "en Nouvelle-Écosse",
  "New Brunswick": "au Nouveau-Brunswick",
  "Newfoundland and Labrador": "à Terre-Neuve-et-Labrador",
  "Prince Edward Island": "à l'Île-du-Prince-Édouard",
  Yukon: "au Yukon",
  "Northwest Territories": "dans les Territoires du Nord-Ouest",
  Nunavut: "au Nunavut",
  Alabama: "en Alabama",
  Alaska: "en Alaska",
  Arizona: "en Arizona",
  Arkansas: "en Arkansas",
  California: "en Californie",
  Colorado: "au Colorado",
  Connecticut: "au Connecticut",
  Delaware: "au Delaware",
  "District of Columbia": "dans le district de Columbia",
  Florida: "en Floride",
  Georgia: "en Géorgie",
  Hawaii: "à Hawaï",
  Idaho: "en Idaho",
  Illinois: "en Illinois",
  Indiana: "en Indiana",
  Iowa: "en Iowa",
  Kansas: "au Kansas",
  Kentucky: "au Kentucky",
  Louisiana: "en Louisiane",
  Maine: "au Maine",
  Maryland: "au Maryland",
  Massachusetts: "au Massachusetts",
  Michigan: "au Michigan",
  Minnesota: "au Minnesota",
  Mississippi: "au Mississippi",
  Missouri: "au Missouri",
  Montana: "au Montana",
  Nebraska: "au Nebraska",
  Nevada: "au Nevada",
  "New Hampshire": "au New Hampshire",
  "New Jersey": "au New Jersey",
  "New Mexico": "au Nouveau-Mexique",
  "New York": "dans l'État de New York",
  "North Carolina": "en Caroline du Nord",
  "North Dakota": "au Dakota du Nord",
  Ohio: "en Ohio",
  Oklahoma: "en Oklahoma",
  Oregon: "en Oregon",
  Pennsylvania: "en Pennsylvanie",
  "Puerto Rico": "à Porto Rico",
  "Rhode Island": "au Rhode Island",
  "South Carolina": "en Caroline du Sud",
  "South Dakota": "au Dakota du Sud",
  Tennessee: "au Tennessee",
  Texas: "au Texas",
  Utah: "en Utah",
  Vermont: "au Vermont",
  Virginia: "en Virginie",
  Washington: "dans l'État de Washington",
  "West Virginia": "en Virginie-Occidentale",
  Wisconsin: "au Wisconsin",
  Wyoming: "au Wyoming",
};

/** "Toronto" -> "à Toronto", "Ontario" -> "en Ontario", "Quebec" -> "au Québec". Cities fall back to "à". */
export function frIn(name: string): string {
  return PLACE_IN[name] ?? `à ${regionName(name, "fr")}`;
}

/** Region names, plus the "USA" group heading the regions table uses for states. */
export function frPlace(name: string): string {
  return name === "USA" ? "États-Unis" : regionName(name, "fr");
}

/** Public tender portals (lib/tenders/sources `portal`), as they read inside a French sentence. */
const PORTALS: Record<string, string> = {
  CanadaBuys: "AchatsCanada",
  SEAO: "le SEAO",
  "SAM.gov": "SAM.gov",
  "The City Record / PASSPort": "The City Record / PASSPort",
  "Yukon's bids&tenders portal": "le portail bids&tenders du Yukon",
  "the City of Toronto bid portal": "le portail d'appels d'offres de la Ville de Toronto",
  "the Nova Scotia procurement portal": "le portail d'approvisionnement de la Nouvelle-Écosse",
};

export function frPortal(portal: string): string {
  return PORTALS[portal] ?? portal;
}
