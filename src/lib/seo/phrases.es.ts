/**
 * Spanish phrasing for the programmatic SEO pages (/trades, /regions).
 *
 * Trade and place names come from the database in English. tradeName() and
 * regionName() (@/i18n/terms) give the Spanish noun; these give the phrase a
 * Spanish sentence needs around it:
 *   "Roofing RFPs in Toronto" -> "Licitaciones de techado en Toronto"
 *   "Snow Removal contractors in Quebec" -> "Contratistas de remoción de nieve en Quebec"
 * Spanish uses "en" for every place; only a few names also take an article
 * ("en el Área Metropolitana de Toronto"). Keys are the English database
 * names. Anything missing falls back to a phrasing that is always grammatical.
 */
import { regionName, tradeName } from "@/i18n/terms";

/**
 * Trade complement, written to read after "licitaciones", "contratistas",
 * "empresas", "contratos", "trabajos" or "proyecto".
 */
const TRADE_OF: Record<string, string> = {
  "Access Control": "de control de acceso",
  "Appliance Repair": "de reparación de electrodomésticos",
  "Building Automation": "de automatización de edificios",
  "Cameras / Surveillance": "de cámaras y videovigilancia",
  Carpentry: "de carpintería",
  "Cleaning / Janitorial": "de limpieza y conserjería",
  "Concierge & Porter Services": "de concierge y portería",
  "Concrete and Asphalt": "de concreto y asfalto",
  Demolition: "de demolición",
  Drywall: "de paneles de yeso",
  "Dumpster & Bin Rental": "de alquiler de contenedores",
  Electrical: "de servicios eléctricos",
  "Elevator Services": "de elevadores",
  "Energy Efficiency": "de eficiencia energética",
  "Environmental / Hazardous Materials": "de medio ambiente y materiales peligrosos",
  "EV Charging": "de carga de vehículos eléctricos",
  Fencing: "de cercas",
  "Fire Safety": "de seguridad contra incendios",
  Flooring: "de pisos",
  "Garage Doors": "de puertas de garaje",
  "General Contracting": "de construcción general",
  "Glass and Windows": "de vidrios y ventanas",
  "Handyman / Maintenance": "de reparaciones generales y mantenimiento",
  HVAC: "de HVAC",
  Landscaping: "de jardinería y paisajismo",
  Lighting: "de iluminación",
  Locksmith: "de cerrajería",
  Masonry: "de albañilería",
  Millwork: "de carpintería arquitectónica",
  "Mold Remediation": "de remediación de moho",
  Painting: "de pintura",
  "Parking & Valet Services": "de estacionamiento y valet",
  "Parking Lot Maintenance": "de mantenimiento de estacionamientos",
  "Pest Control": "de control de plagas",
  Plumbing: "de plomería",
  "Property Maintenance": "de mantenimiento de propiedades",
  Restoration: "de restauración de daños",
  Roofing: "de techado",
  "Security Personnel": "de guardias de seguridad",
  "Security Systems": "de sistemas de seguridad",
  Signage: "de letreros y señalización",
  "Snow Removal": "de remoción de nieve",
  "Temporary Workforce": "de personal temporal",
  "Waste Removal": "de recolección de residuos",
  Waterproofing: "de impermeabilización",
};

/** "Roofing" -> "de techado", "Snow Removal" -> "de remoción de nieve". */
export function esTradeOf(name: string): string {
  return TRADE_OF[name] ?? `de la categoría ${tradeName(name, "es")}`;
}

/** Places that read with an article, or whose bare name would be ambiguous. */
const PLACE_IN: Record<string, string> = {
  USA: "en Estados Unidos",
  "Greater Toronto Area": "en el Área Metropolitana de Toronto",
  "Northwest Territories": "en los Territorios del Noroeste",
  "District of Columbia": "en el Distrito de Columbia",
  "New York": "en el estado de Nueva York",
  Washington: "en el estado de Washington",
};

/** "Toronto" -> "en Toronto", "Canada" -> "en Canadá", "Greater Toronto Area" -> "en el Área Metropolitana de Toronto". */
export function esIn(name: string): string {
  return PLACE_IN[name] ?? `en ${regionName(name, "es")}`;
}

/** Region names, plus the "USA" group heading the regions table uses for states. */
export function esPlace(name: string): string {
  return name === "USA" ? "Estados Unidos" : regionName(name, "es");
}

/** Public tender portals (lib/tenders/sources `portal`), as they read inside a Spanish sentence. */
const PORTALS: Record<string, string> = {
  CanadaBuys: "CanadaBuys",
  SEAO: "el SEAO de Quebec",
  "SAM.gov": "SAM.gov",
  "The City Record / PASSPort": "The City Record / PASSPort",
  "Yukon's bids&tenders portal": "el portal bids&tenders de Yukon",
  "the City of Toronto bid portal": "el portal de licitaciones de la Ciudad de Toronto",
  "the Nova Scotia procurement portal": "el portal de compras públicas de Nueva Escocia",
};

export function esPortal(portal: string): string {
  return PORTALS[portal] ?? portal;
}
