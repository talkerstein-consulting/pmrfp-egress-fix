/**
 * Names that come from the database in English (trade categories, regions,
 * property types), translated for display. Slugs and stored values never
 * change; only what's shown. Missing entries fall back to the English name.
 * Safe in client and server components (small maps, no dictionaries).
 */
import type { Locale } from "./config";

type Names = Partial<Record<Exclude<Locale, "en">, Record<string, string>>>;

const TRADES: Names = {
  fr: {
    "Access Control": "Contrôle d'accès",
    "Appliance Repair": "Réparation d'électroménagers",
    "Building Automation": "Automatisation du bâtiment",
    "Cameras / Surveillance": "Caméras / Surveillance",
    Carpentry: "Menuiserie",
    "Cleaning / Janitorial": "Nettoyage / Entretien ménager",
    "Concierge & Porter Services": "Conciergerie et portiers",
    "Concrete and Asphalt": "Béton et asphalte",
    Demolition: "Démolition",
    Drywall: "Gypse et cloisons sèches",
    "Dumpster & Bin Rental": "Location de conteneurs",
    Electrical: "Électricité",
    "Elevator Services": "Ascenseurs",
    "Energy Efficiency": "Efficacité énergétique",
    "Environmental / Hazardous Materials": "Environnement / Matières dangereuses",
    "EV Charging": "Bornes de recharge (VÉ)",
    Fencing: "Clôtures",
    "Fire Safety": "Sécurité incendie",
    Flooring: "Revêtements de sol",
    "Garage Doors": "Portes de garage",
    "General Contracting": "Entrepreneur général",
    "Glass and Windows": "Vitrerie et fenêtres",
    "Handyman / Maintenance": "Homme à tout faire / Entretien",
    HVAC: "CVC",
    Landscaping: "Aménagement paysager",
    Lighting: "Éclairage",
    Locksmith: "Serrurerie",
    Masonry: "Maçonnerie",
    Millwork: "Ébénisterie",
    "Mold Remediation": "Décontamination des moisissures",
    Painting: "Peinture",
    "Parking & Valet Services": "Stationnement et voiturier",
    "Parking Lot Maintenance": "Entretien de stationnements",
    "Pest Control": "Extermination",
    Plumbing: "Plomberie",
    "Property Maintenance": "Entretien immobilier",
    Restoration: "Restauration après sinistre",
    Roofing: "Toiture",
    "Security Personnel": "Agents de sécurité",
    "Security Systems": "Systèmes de sécurité",
    Signage: "Enseignes",
    "Snow Removal": "Déneigement",
    "Temporary Workforce": "Main-d'œuvre temporaire",
    "Waste Removal": "Collecte des déchets",
    Waterproofing: "Imperméabilisation",
  },
};

const REGIONS: Names = {
  fr: {
    "United States": "États-Unis",
    "Greater Toronto Area": "Grand Toronto",
    "British Columbia": "Colombie-Britannique",
    "New Brunswick": "Nouveau-Brunswick",
    "Newfoundland and Labrador": "Terre-Neuve-et-Labrador",
    "Northwest Territories": "Territoires du Nord-Ouest",
    "Nova Scotia": "Nouvelle-Écosse",
    "Prince Edward Island": "Île-du-Prince-Édouard",
    Quebec: "Québec",
    Montreal: "Montréal",
    California: "Californie",
    "District of Columbia": "District de Columbia",
    Florida: "Floride",
    Georgia: "Géorgie",
    Hawaii: "Hawaï",
    Louisiana: "Louisiane",
    "New Mexico": "Nouveau-Mexique",
    "North Carolina": "Caroline du Nord",
    "North Dakota": "Dakota du Nord",
    Pennsylvania: "Pennsylvanie",
    "Puerto Rico": "Porto Rico",
    "South Carolina": "Caroline du Sud",
    "South Dakota": "Dakota du Sud",
    Virginia: "Virginie",
    "West Virginia": "Virginie-Occidentale",
  },
};

const PROPERTY_TYPES: Names = {
  fr: {
    Condominium: "Copropriété",
    "Apartment Building": "Immeuble d'appartements",
    "Rental Residential": "Résidentiel locatif",
    "Townhome Complex": "Complexe de maisons en rangée",
    "Student Housing": "Résidence étudiante",
    "Purpose-Built Rental": "Immeuble locatif",
    "Single-Family Rental Portfolio": "Portefeuille de maisons locatives",
    "Commercial Office": "Bureaux commerciaux",
    "Retail Plaza": "Centre commercial",
    "Industrial Building": "Bâtiment industriel",
    Warehouse: "Entrepôt",
    "Mixed-Use Property": "Immeuble à usage mixte",
    Institutional: "Institutionnel",
    School: "École",
    "Medical Building": "Immeuble médical",
    "Religious Facility": "Lieu de culte",
    Hotel: "Hôtel",
    "Senior Living": "Résidence pour aînés",
    "Parking Structure": "Stationnement étagé",
    "Land Development": "Aménagement de terrain",
    "Multi-Site Portfolio": "Portefeuille multisite",
  },
};

const pick = (names: Names, name: string, lang: Locale) => (lang === "en" ? name : names[lang]?.[name] ?? name);

/** "Roofing" -> "Toiture" in French. */
export const tradeName = (name: string, lang: Locale) => pick(TRADES, name, lang);
export const regionName = (name: string, lang: Locale) => pick(REGIONS, name, lang);
export const propertyTypeName = (name: string, lang: Locale) => pick(PROPERTY_TYPES, name, lang);
