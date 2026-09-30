/**
 * Quebec French cost guides for /fr/cost-guides, same shape as
 * lib/seo/cost-guides.ts (slug, trade slug and trade name come from the English
 * entry; the trade name is translated with tradeName()). English pages keep
 * reading COST_GUIDES directly; use costGuidesFor(lang) / getCostGuideFor().
 *
 * Money follows French conventions: "de 8 à 22 $/pi²", "de 9 000 à 30 000 $".
 */
import type { Locale } from "@/i18n/config";
import { tradeName } from "@/i18n/terms";
import { COST_GUIDES, type CostGuide } from "./cost-guides";
import { COST_GUIDES_ES } from "./cost-guides.es";

type CostGuideText = Omit<CostGuide, "slug" | "tradeSlug" | "tradeName">;

const NOT_GUARANTEED = "Ces prix sont-ils garantis?";
const PLANNING = "Non. Ce sont des fourchettes de planification générales pour le Canada, pas des soumissions.";

const COST_GUIDES_FR: Record<string, CostGuideText> = {
  "commercial-roof-replacement-cost": {
    name: "Remplacement de toit commercial",
    query: "coût de remplacement d'un toit commercial",
    headline: "Combien coûte le remplacement d'un toit commercial au Canada?",
    intro:
      "Le remplacement d'un toit commercial se calcule habituellement au pied carré de toiture installée, puis s'ajuste selon l'arrachage, la réparation du pontage, l'isolation, l'accès et le type de membrane. Les toitures plates à faible pente (TPO, EPDM, bitume modifié) dominent dans les immeubles commerciaux canadiens, et la membrane choisie est le principal facteur de coût.",
    typicalRange: "de 8 à 22 $/pi²",
    rangeUnit: "installé, arrachage compris",
    rows: [
      { item: "Membrane EPDM (caoutchouc)", range: "de 8 à 14 $/pi²", note: "La membrane monocouche la plus économique; bonne durée de vie en climat froid." },
      { item: "Membrane TPO", range: "de 9 à 16 $/pi²", note: "Surface blanche réfléchissante écoénergétique; populaire pour les rénovations." },
      { item: "Bitume modifié (2 plis)", range: "de 10 à 17 $/pi²", note: "Durable, posé au chalumeau ou autocollant." },
      { item: "Toiture multicouche (asphalte et gravier)", range: "de 11 à 19 $/pi²" },
      { item: "Arrachage et élimination de l'ancienne toiture", range: "de 1,50 à 4 $/pi²", note: "Plus élevé s'il y a plusieurs couches existantes ou de l'amiante." },
      { item: "Isolant à pente intégrée", range: "de 2 à 6 $/pi²", note: "Souvent exigé pour respecter le code actuel et assurer le drainage." },
    ],
    factors: [
      { title: "Superficie et sections du toit", desc: "Les grands toits continus coûtent moins cher au pied carré; de nombreuses petites sections et pénétrations font grimper le taux." },
      { title: "Arrachage ou recouvrement", desc: "Retirer les anciennes couches (et les éliminer) ajoute des coûts; un recouvrement sur un pontage sain coûte moins cher, mais n'est pas toujours conforme au code." },
      { title: "Réparations du pontage et de la structure", desc: "Un pontage pourri et des travaux aux drains et aux parapets découverts en cours de chantier sont des sources fréquentes d'avenants." },
      { title: "Accès et occupation", desc: "La mise en place d'une grue, les immeubles occupés et le travail de nuit ou de fin de semaine pour éviter les dérangements augmentent le coût de la main-d'œuvre." },
      { title: "Niveau de garantie", desc: "Les garanties NDL des fabricants (15 à 30 ans) exigent des installateurs certifiés et des assemblages précis, ce qui fait augmenter la soumission." },
    ],
    faqs: [
      { q: "Combien de temps dure un toit commercial?", a: "La plupart des toitures commerciales monocouches et en bitume modifié durent de 20 à 30 ans avec un bon entretien. Obtenir deux ou trois soumissions concurrentes par appel d'offres vous permet de comparer les conditions de garantie, pas seulement le prix." },
      { q: "Réparer ou remplacer?", a: "Si la membrane a dépassé 75 % de sa durée de vie prévue et que les infiltrations se répètent, le remplacement est généralement plus économique que les rapiéçages à répétition. Un appel d'offres bien défini vous permet d'obtenir un prix pour les deux options." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Le prix réel dépend de votre immeuble, de votre région et de la portée des travaux : publiez un appel d'offres pour obtenir de vrais prix de couvreurs intéressés.` },
    ],
    metaTitle: "Coût de remplacement d'un toit commercial au Canada (guide 2026)",
    metaDescription:
      "Ce que coûte le remplacement d'un toit commercial au pied carré au Canada selon le type de membrane (TPO, EPDM, bitume modifié), et les facteurs qui font varier le prix. Obtenez de vrais prix en publiant un appel d'offres.",
  },
  "commercial-hvac-replacement-cost": {
    name: "Remplacement CVC commercial",
    query: "coût de remplacement CVC commercial",
    headline: "Combien coûte le remplacement d'un système CVC commercial au Canada?",
    intro:
      "Le CVC commercial se calcule habituellement par unité de toit (RTU) ou par tonne de capacité de refroidissement, plus l'adaptation de la base, le levage par grue, l'électricité, les contrôles et le gaz. Les unités monoblocs de toit sont la norme dans les immeubles commerciaux canadiens; les refroidisseurs et les systèmes assemblés sur place coûtent bien plus que cette fourchette.",
    typicalRange: "de 9 000 à 30 000 $",
    rangeUnit: "par unité de toit, installée",
    rows: [
      { item: "Unité de toit, 3 à 5 tonnes", range: "de 9 000 à 16 000 $", note: "Petit commerce ou bureau; grue et adaptateur de base compris." },
      { item: "Unité de toit, 7,5 à 10 tonnes", range: "de 16 000 à 30 000 $" },
      { item: "Par tonne de refroidissement (règle générale)", range: "de 2 000 à 4 000 $/tonne" },
      { item: "Adaptateur de base et gréage", range: "de 1 200 à 4 000 $/unité", note: "Passer à une autre marque ou à un autre modèle exige habituellement un adaptateur." },
      { item: "Intégration des contrôles / SGB", range: "de 800 à plus de 5 000 $", note: "Plus élevé lorsqu'il faut raccorder l'unité au système de gestion du bâtiment." },
      { item: "Contrat d'entretien préventif", range: "de 300 à 900 $/unité/an" },
    ],
    factors: [
      { title: "Tonnage et efficacité", desc: "Les unités de plus grande capacité et à haute efficacité (SEER/IEER élevés) coûtent plus cher à l'achat, mais réduisent les coûts d'exploitation." },
      { title: "Grue et accès au toit", desc: "Les sites exigus, les immeubles hauts et les levages au centre-ville ajoutent des coûts de gréage et de permis." },
      { title: "Remplacement équivalent ou amélioré", desc: "Réutiliser la base et le raccordement électrique existants coûte le moins cher; changer de combustible, de tension ou de capacité ajoute des travaux." },
      { title: "Contrôles et zonage", desc: "L'intégration à un système de gestion du bâtiment ou l'ajout d'économiseurs et de sondes de CO2 fait augmenter la soumission." },
      { title: "Nombre d'unités", desc: "Remplacer plusieurs unités de toit à la fois permet habituellement d'obtenir un meilleur prix par unité qu'un remplacement à la pièce." },
    ],
    faqs: [
      { q: "Quelle est la durée de vie d'une unité de toit commerciale?", a: "Habituellement de 15 à 20 ans. Après 15 ans, la hausse de la fréquence des réparations et l'élimination progressive de certains frigorigènes (p. ex. la transition du R-410A) justifient souvent le remplacement." },
      { q: "Devrais-je remplacer toutes les unités à la fois?", a: "Regrouper les remplacements réduit habituellement le prix par unité et vous permet d'uniformiser vos pièces avec un seul fabricant. Publiez un seul appel d'offres qui énumère toutes les unités pour obtenir un prix groupé." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Votre prix réel dépend du tonnage, de l'accès et des contrôles. Publiez un appel d'offres pour obtenir des soumissions concurrentes d'entrepreneurs en CVC.` },
    ],
    metaTitle: "Coût de remplacement CVC commercial au Canada (guide 2026)",
    metaDescription:
      "Coûts de remplacement du CVC commercial et des unités de toit au Canada — par unité et par tonne — et les facteurs qui font varier le prix. Obtenez de vrais prix en publiant un appel d'offres.",
  },
  "office-renovation-cost": {
    name: "Rénovation et aménagement de bureaux",
    query: "coût de rénovation de bureaux au pied carré",
    headline: "Combien coûte la rénovation de bureaux au pied carré au Canada?",
    intro:
      "Les rénovations de bureaux et les aménagements locatifs se calculent au pied carré de surface utile, et l'écart est large : les finis, la portée des travaux mécaniques et électriques et les interventions sur l'immeuble de base font tous varier le prix. Une réfection complète peut coûter de 4 à 5 fois plus qu'un simple rafraîchissement esthétique.",
    typicalRange: "de 50 à 250 $/pi²",
    rangeUnit: "selon la portée et le niveau de finition",
    rows: [
      { item: "Rafraîchissement esthétique (peinture, revêtements de sol, éclairage)", range: "de 30 à 70 $/pi²" },
      { item: "Aménagement standard (nouvel aménagement, mécanique et électricité de base)", range: "de 80 à 150 $/pi²" },
      { item: "Aménagement haut de gamme / complet", range: "de 150 à plus de 250 $/pi²", note: "Ébénisterie sur mesure, finis haut de gamme, mécanique et électricité complètes." },
      { item: "Démolition / dégarnissage", range: "de 6 à 15 $/pi²" },
      { item: "Reconfiguration du CVC et de l'électricité", range: "de 20 à 60 $/pi²" },
      { item: "Honoraires d'architecture, de permis et de conception", range: "de 8 à 15 % du projet", note: "En plus du coût de construction." },
    ],
    factors: [
      { title: "Niveau de finition", desc: "Les finis courants ou de designer, les murs de verre et l'ébénisterie sur mesure sont le principal facteur de variation." },
      { title: "Portée mécanique et électrique", desc: "Déplacer le CVC, les gicleurs et l'électricité pour un nouvel aménagement coûte bien plus qu'un rafraîchissement esthétique." },
      { title: "État de l'immeuble de base", desc: "Les immeubles plus anciens peuvent exiger des mises aux normes (accessibilité, incendie, électricité) déclenchées par le permis." },
      { title: "Échéancier et travail hors des heures normales", desc: "Travailler sur un étage occupé et en dehors des heures d'ouverture pour que l'entreprise reste en activité entraîne une main-d'œuvre à tarif majoré." },
      { title: "Permis et approbations", desc: "Les délais de permis, les approbations du propriétaire et les honoraires de conception ajoutent des coûts et du temps au-delà de la construction." },
    ],
    faqs: [
      { q: "Que comprend un « aménagement »?", a: "Habituellement la démolition, les cloisons, les plafonds, les revêtements de sol, l'éclairage, la reconfiguration du CVC et de l'électricité, l'ébénisterie et les finis — réalisés selon l'aménagement du locataire. Définissez clairement la portée dans votre appel d'offres pour que les soumissions soient comparables." },
      { q: "Comment obtenir des soumissions comparables?", a: "Donnez à chaque entrepreneur la même portée, les mêmes plans et le même tableau des finis. Un appel d'offres qui décrit la portée une fois pour toutes vous donne des propositions comparables plutôt que des approximations." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Le prix réel dépend beaucoup du niveau de finition et de la portée mécanique et électrique. Publiez un appel d'offres pour obtenir des soumissions concurrentes d'entrepreneurs généraux.` },
    ],
    metaTitle: "Coût de rénovation de bureaux au pied carré au Canada (2026)",
    metaDescription:
      "Coûts de rénovation de bureaux et d'aménagement locatif au pied carré au Canada — du rafraîchissement esthétique à l'aménagement complet — et les facteurs qui font varier le prix. Obtenez de vrais prix en publiant un appel d'offres.",
  },
  "commercial-electrical-cost": {
    name: "Travaux électriques commerciaux",
    query: "coût d'un électricien commercial",
    headline: "Combien coûtent les travaux électriques commerciaux au Canada?",
    intro:
      "Les travaux électriques commerciaux se calculent au contrat, au nombre d'appareils ou selon la capacité de l'augmentation de l'entrée électrique (en ampères). La plupart des travaux courants dans un immeuble — mises à niveau de panneaux, conversions de l'éclairage, appels de service et alimentation des locataires — se situent dans des fourchettes prévisibles, mais tout ce qui touche l'entrée principale ou exige une inspection de l'ESA (en Ontario) ajoute des coûts d'ingénierie et de permis.",
    typicalRange: "de 95 à 165 $/h",
    rangeUnit: "main-d'œuvre d'un électricien titulaire d'une licence",
    rows: [
      { item: "Appel de service / diagnostic", range: "de 150 à 400 $", note: "Déplacement et première heure; tarifs d'urgence plus élevés." },
      { item: "Mise à niveau du panneau / de l'entrée (200 A)", range: "de 2 500 à 6 000 $" },
      { item: "Augmentation de l'entrée (400 à 600 A)", range: "de 6 000 à plus de 20 000 $", note: "Peut exiger une coordination avec le distributeur d'électricité et l'ESA." },
      { item: "Conversion de l'éclairage au DEL", range: "de 80 à 250 $/luminaire", note: "Les subventions peuvent en couvrir une part importante." },
      { item: "Borne de recharge (niveau 2, commerciale)", range: "de 2 000 à 7 000 $/point de recharge", note: "Excluant les augmentations majeures de l'entrée électrique." },
      { item: "Alimentation des locataires / nouveaux circuits", range: "de 300 à 1 200 $/circuit" },
    ],
    factors: [
      { title: "Capacité de l'entrée", desc: "L'augmentation de l'entrée principale (ampérage) est le travail électrique le plus coûteux et peut exiger l'intervention du distributeur d'électricité et une inspection de l'ESA." },
      { title: "Nombre d'appareils et de luminaires", desc: "Les conversions de l'éclairage et les travaux sur les prises et les circuits varient selon la quantité — le volume permet habituellement d'obtenir un meilleur taux." },
      { title: "Accès et plafonds", desc: "Les plafonds fermés, les locaux occupés et les parcours en hauteur ou exigus augmentent les heures de main-d'œuvre." },
      { title: "Permis et inspection", desc: "Les permis et inspections de l'ESA (en Ontario) et des autorités provinciales équivalentes ajoutent des coûts et des délais." },
      { title: "Travail hors des heures normales", desc: "Dans les immeubles occupés, les coupures de courant doivent souvent avoir lieu la nuit ou la fin de semaine, à tarif majoré." },
    ],
    faqs: [
      { q: "Ai-je besoin d'un permis de l'ESA?", a: "En Ontario, la plupart des travaux électriques commerciaux exigent un permis et une inspection de l'ESA; les autres provinces ont des autorités équivalentes (au Québec, les travaux doivent être confiés à un entrepreneur électricien membre de la CMEQ). Un entrepreneur titulaire d'une licence s'en occupe — confirmez que c'est prévu dans sa proposition." },
      { q: "Les conversions de l'éclairage peuvent-elles s'autofinancer?", a: "Souvent, grâce aux économies d'énergie et aux subventions des distributeurs d'électricité. Demandez aux soumissionnaires d'inclure la période de récupération, subventions déduites, dans leur réponse à l'appel d'offres." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Publiez un appel d'offres pour obtenir de vraies soumissions, adaptées à vos travaux, d'électriciens commerciaux titulaires d'une licence.` },
    ],
    metaTitle: "Coût d'un électricien commercial au Canada (guide 2026)",
    metaDescription:
      "Coûts des travaux électriques commerciaux au Canada — augmentations d'entrée, panneaux, conversions de l'éclairage, bornes de recharge et taux horaires — et ce qui fait varier le prix. Obtenez de vrais prix en publiant un appel d'offres.",
  },
  "commercial-painting-cost": {
    name: "Peinture commerciale",
    query: "coût de la peinture commerciale",
    headline: "Combien coûte la peinture commerciale au Canada?",
    intro:
      "La peinture commerciale se calcule au pied carré de surface murale (ou de plancher); la préparation, la hauteur, les revêtements et l'accès expliquent l'écart. La peinture intérieure se situe au bas de la fourchette; les travaux extérieurs, en hauteur et les revêtements spécialisés (planchers d'époxy, ignifugation intumescente) coûtent bien plus cher.",
    typicalRange: "de 1,50 à 4,50 $/pi²",
    rangeUnit: "surface murale intérieure, 2 couches",
    rows: [
      { item: "Murs intérieurs (2 couches)", range: "de 1,50 à 3,50 $/pi²" },
      { item: "Intérieur avec préparation et réparations importantes", range: "de 3 à 5 $/pi²" },
      { item: "Extérieur (au pi² de surface)", range: "de 2,50 à 6 $/pi²", note: "Plus élevé avec nacelles ou échafaudages." },
      { item: "Revêtement de plancher en époxy", range: "de 4 à 12 $/pi²" },
      { item: "Plafonds hauts / travail en nacelle", range: "+15 à 40 %", note: "Majoration par rapport aux tarifs pour une hauteur standard." },
      { item: "Lignage de stationnement", range: "de 4 à 9 $/case" },
    ],
    factors: [
      { title: "Préparation des surfaces", desc: "Sur des surfaces négligées, les réparations, le ponçage, l'apprêt et le traitement des moisissures ou des taches peuvent coûter plus que la peinture elle-même." },
      { title: "Hauteur et accès", desc: "Les nacelles, les échafaudages et les plateformes suspendues pour les travaux en hauteur ou extérieurs ajoutent des coûts d'équipement et de main-d'œuvre." },
      { title: "Type de revêtement", desc: "Le latex standard coûte le moins cher; l'époxy, l'anti-graffiti, l'intumescent et les revêtements industriels coûtent plus au pied carré." },
      { title: "Occupation et horaire", desc: "Peindre autour d'une entreprise en activité, souvent en dehors des heures d'ouverture, augmente le coût de la main-d'œuvre." },
      { title: "Superficie et travaux récurrents", desc: "Les grandes surfaces continues et les contrats récurrents pour plusieurs immeubles obtiennent de meilleurs taux." },
    ],
    faqs: [
      { q: "Comment les travaux de peinture commerciale sont-ils soumissionnés?", a: "Habituellement au pied carré de surface, avec des postes distincts pour la préparation, les revêtements et l'accès. Indiquez la superficie et l'état des surfaces dans votre appel d'offres pour obtenir des soumissions précises." },
      { q: "Puis-je obtenir un seul prix pour plusieurs immeubles?", a: "Oui. Les propriétaires de portefeuilles regroupent souvent leurs cycles de peinture dans un seul contrat pour obtenir un meilleur taux. Publiez un seul appel d'offres qui couvre tous les emplacements." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Publiez un appel d'offres pour obtenir de vraies soumissions de peintres commerciaux.` },
    ],
    metaTitle: "Coût de la peinture commerciale au Canada (guide 2026)",
    metaDescription:
      "Coûts de la peinture commerciale au Canada au pied carré — intérieur, extérieur, planchers d'époxy et travaux en hauteur — et ce qui fait varier le prix. Obtenez de vrais prix en publiant un appel d'offres.",
  },
  "parking-lot-paving-cost": {
    name: "Pavage et asphaltage de stationnement",
    query: "coût du pavage d'un stationnement",
    headline: "Combien coûte le pavage d'un stationnement au Canada?",
    intro:
      "L'asphaltage d'un stationnement se calcule au pied carré pour le pavage et au contrat pour l'entretien, comme le scellement et le colmatage des fissures. Le choix entre un resurfaçage (nouvelle couche) et une reconstruction complète est le principal facteur de coût : une reconstruction peut coûter de 2 à 3 fois plus qu'un resurfaçage.",
    typicalRange: "de 3 à 9 $/pi²",
    rangeUnit: "nouvel asphalte, posé",
    rows: [
      { item: "Resurfaçage (nouvelle couche d'asphalte)", range: "de 2,50 à 5 $/pi²", note: "Sur une fondation saine." },
      { item: "Reconstruction complète", range: "de 6 à 12 $/pi²", note: "Excavation, nouvelle fondation et asphalte." },
      { item: "Scellement", range: "de 0,20 à 0,45 $/pi²", note: "Aux 2 ou 3 ans; protège la surface." },
      { item: "Colmatage des fissures", range: "de 1 à 3 $/pi linéaire" },
      { item: "Lignage et marquage", range: "de 5 à 12 $/case" },
      { item: "Réparation de puisard / drainage", range: "de 1 500 à 5 000 $/puisard" },
    ],
    factors: [
      { title: "Resurfaçage ou reconstruction", desc: "Une fondation saine n'exige qu'une nouvelle couche; une fondation défaillante exige l'excavation et la reconstruction, pour un coût plusieurs fois plus élevé." },
      { title: "État de la fondation et du drainage", desc: "Un mauvais drainage et une fondation granulaire faible causent une détérioration prématurée — les corriger dès le départ protège l'investissement." },
      { title: "Superficie et mobilisation", desc: "Les grands stationnements réduisent le taux au pied carré; les petits portent des frais de mobilisation fixes." },
      { title: "Phasage selon la circulation", desc: "Garder une partie du stationnement ouverte pendant les travaux, ou paver la nuit, ajoute des coûts." },
      { title: "Accessibilité et marquage", desc: "Les cases accessibles conformes au code, la signalisation et un nouveau lignage font habituellement partie de la portée." },
    ],
    faqs: [
      { q: "À quelle fréquence faut-il sceller un stationnement?", a: "Aux 2 ou 3 ans, pour protéger l'asphalte et prolonger sa durée de vie. Bien des propriétaires regroupent le scellement et le lignage dans un contrat d'entretien récurrent grâce à un seul appel d'offres." },
      { q: "Resurfaçage ou reconstruction complète?", a: "Si la fondation est saine et que les fissures sont en surface, un resurfaçage suffit. Un faïençage généralisé et des nids-de-poule signalent habituellement une défaillance de la fondation. Un appel d'offres bien défini vous permet d'obtenir un prix pour les deux options." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Publiez un appel d'offres pour obtenir de vraies soumissions d'entrepreneurs en pavage.` },
    ],
    metaTitle: "Coût du pavage d'un stationnement au Canada (guide 2026)",
    metaDescription:
      "Coûts du pavage et de l'asphaltage d'un stationnement commercial au Canada — resurfaçage, reconstruction, scellement et lignage — et ce qui fait varier le prix. Obtenez de vrais prix en publiant un appel d'offres.",
  },
  "commercial-snow-removal-cost": {
    name: "Déneigement commercial",
    query: "coût du déneigement commercial",
    headline: "Combien coûte le déneigement commercial au Canada?",
    intro:
      "Les contrats de déneigement commerciaux se calculent au déblaiement, à la saison (forfait saisonnier) ou à l'heure, plus l'épandage de sel et le déglaçage. Avec le forfait saisonnier, vous gagnez en prévisibilité et l'entrepreneur assume le risque météo; le tarif au déblaiement coûte moins cher lors d'un hiver doux et plus cher lors d'un hiver rigoureux. La superficie du stationnement et le seuil de déclenchement déterminent le taux.",
    typicalRange: "de 3 500 à 25 000 $",
    rangeUnit: "par contrat saisonnier (selon le stationnement)",
    rows: [
      { item: "Déblaiement à l'intervention (petit stationnement)", range: "de 75 à 250 $/visite" },
      { item: "Déblaiement à l'intervention (grand stationnement)", range: "de 250 à 900 $/visite" },
      { item: "Contrat saisonnier (petit stationnement)", range: "de 3 500 à 8 000 $/saison" },
      { item: "Contrat saisonnier (grand stationnement)", range: "de 10 000 à plus de 25 000 $/saison" },
      { item: "Épandage de sel / déglaçage", range: "de 100 à 500 $/épandage" },
      { item: "Déneigement des trottoirs", range: "de 50 à 200 $/visite" },
    ],
    factors: [
      { title: "Superficie et configuration du stationnement", desc: "La superficie, le nombre d'entrées, les îlots et l'espace pour entreposer la neige influent tous sur le temps passé sur place." },
      { title: "Structure du contrat", desc: "Le forfait saisonnier transfère le risque météo à l'entrepreneur; le tarif à l'intervention vous le transfère. Chacun convient à une tolérance au risque différente." },
      { title: "Seuil de déclenchement et niveau de service", desc: "Un seuil de 2 cm avec déblaiement prioritaire coûte plus cher qu'un seuil de 5 cm avec un délai standard." },
      { title: "Épandage et responsabilité", desc: "Le risque de poursuite en cas de chute rend le déglaçage et un registre de service documenté précieux — et c'est un poste de coût." },
      { title: "Trottoirs et accessibilité", desc: "Le déneigement manuel des allées, des entrées et des parcours accessibles ajoute de la main-d'œuvre au-delà du déblaiement." },
    ],
    faqs: [
      { q: "Forfait saisonnier ou tarif à l'intervention : lequel coûte le moins cher?", a: "Sur plusieurs hivers, ils s'équivalent à peu près. Le forfait saisonnier vous donne un budget fixe et transfère le risque météo à l'entrepreneur; le tarif à l'intervention peut l'emporter lors des hivers doux. Demandez les deux dans votre appel d'offres." },
      { q: "L'épandage de sel est-il inclus?", a: "Pas toujours : confirmez si le déglaçage, les trottoirs et un registre de service font partie de la portée. Précisez le niveau de service dans votre appel d'offres pour que les soumissions soient comparables." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Publiez un appel d'offres pour obtenir de vraies soumissions d'entrepreneurs en déneigement pour votre site.` },
    ],
    metaTitle: "Coût du déneigement commercial au Canada (guide 2026)",
    metaDescription:
      "Coûts du déneigement commercial au Canada — à l'intervention, à forfait saisonnier, épandage de sel et trottoirs — et les facteurs qui font varier le prix. Obtenez de vrais prix en publiant un appel d'offres.",
  },
  "commercial-cleaning-cost": {
    name: "Nettoyage commercial et entretien ménager",
    query: "coût du nettoyage commercial",
    headline: "Combien coûte le nettoyage commercial au Canada?",
    intro:
      "Les contrats d'entretien ménager se calculent au pied carré par mois, à l'heure ou à la visite, selon la fréquence et le type de locaux. La fréquence (quotidienne ou hebdomadaire), le nombre de salles de toilettes et les travaux spécialisés comme l'entretien des planchers et le nettoyage après construction sont les principaux facteurs de coût.",
    typicalRange: "de 0,08 à 0,30 $/pi²",
    rangeUnit: "par mois, entretien ménager récurrent",
    rows: [
      { item: "Nettoyage de bureaux (mensuel, au pi²)", range: "de 0,08 à 0,20 $/pi²/mois" },
      { item: "Nettoyage médical / de laboratoire", range: "de 0,15 à 0,35 $/pi²/mois", note: "Exigences de conformité et de désinfection plus élevées." },
      { item: "Taux horaire d'entretien ménager", range: "de 28 à 50 $/h" },
      { item: "Décapage et cirage des planchers", range: "de 0,30 à 0,75 $/pi²" },
      { item: "Nettoyage des tapis", range: "de 0,15 à 0,40 $/pi²" },
      { item: "Nettoyage après construction", range: "de 0,30 à 0,80 $/pi²" },
    ],
    factors: [
      { title: "Fréquence", desc: "Un service quotidien coûte plus cher par mois qu'un service hebdomadaire, mais réduit le tarif par visite. Adaptez la fréquence à l'achalandage réel." },
      { title: "Type de locaux", desc: "Les locaux médicaux, les laboratoires, l'alimentation et les espaces industriels exigent des protocoles et des fournitures plus rigoureux que des bureaux standards." },
      { title: "Salles de toilettes et surfaces très touchées", desc: "Le nombre de salles de toilettes et la désinfection des surfaces fréquemment touchées font augmenter la main-d'œuvre et les consommables." },
      { title: "Entretien spécialisé des planchers", desc: "Le décapage et le cirage, le polissage et l'extraction des tapis sont habituellement soumissionnés séparément du nettoyage courant." },
      { title: "Fournitures et consommables", desc: "Selon que le papier, le savon et les sacs sont fournis par l'entrepreneur ou par le propriétaire, le montant mensuel change." },
    ],
    faqs: [
      { q: "Comment l'entretien ménager est-il habituellement tarifé?", a: "La plupart des contrats commerciaux prévoient un tarif mensuel fixe établi selon la superficie et la fréquence, avec l'entretien des planchers et les consommables en postes distincts. Indiquez la superficie et la fréquence dans votre appel d'offres pour obtenir des soumissions précises." },
      { q: "Puis-je couvrir plusieurs sites dans un seul contrat?", a: "Oui. Les propriétaires de portefeuilles regroupent souvent leurs immeubles pour obtenir un meilleur taux et un seul interlocuteur. Publiez un seul appel d'offres qui énumère tous les sites." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Publiez un appel d'offres pour obtenir de vraies soumissions d'entreprises d'entretien ménager.` },
    ],
    metaTitle: "Coût du nettoyage commercial au Canada (guide 2026)",
    metaDescription:
      "Coûts du nettoyage commercial et de l'entretien ménager au Canada — au pied carré, à l'heure et pour l'entretien des planchers — et ce qui fait varier le prix. Obtenez de vrais prix en publiant un appel d'offres.",
  },
  "mold-remediation-cost": {
    name: "Décontamination fongique commerciale",
    query: "coût de la décontamination des moisissures",
    headline: "Combien coûte la décontamination fongique commerciale au Canada?",
    intro:
      "La décontamination des moisissures se calcule selon la surface touchée et le niveau de confinement requis. Les petits travaux confinés sont prévisibles; une contamination étendue ou cachée derrière les murs, dans le CVC, ou liée à une infiltration d'eau persistante fait rapidement grimper la facture, car il faut aussi corriger la source.",
    typicalRange: "de 15 à 40 $/pi²",
    rangeUnit: "surface touchée, confinement compris",
    rows: [
      { item: "Petite surface confinée (moins de 30 pi²)", range: "de 750 à 2 500 $" },
      { item: "Surface moyenne (30 à 100 pi²)", range: "de 2 500 à 7 000 $" },
      { item: "Grande surface / plusieurs pièces", range: "de 7 000 à plus de 30 000 $" },
      { item: "Tests d'air et de vérification par un tiers", range: "de 400 à 1 200 $/test", note: "Avant et après la décontamination." },
      { item: "Décontamination du système CVC", range: "de 2 000 à plus de 8 000 $" },
      { item: "Correction de la source (fuite, imperméabilisation)", range: "variable", note: "Soumissionnée séparément — la cause doit être corrigée." },
    ],
    factors: [
      { title: "Surface touchée et emplacement", desc: "Des moisissures en surface sur le gypse coûtent moins cher à traiter qu'une contamination à l'intérieur des murs, des plafonds ou des conduits." },
      { title: "Niveau de confinement", desc: "Les grandes surfaces contaminées exigent un confinement à pression négative, une filtration HEPA et des protocoles d'ÉPI qui font augmenter le coût." },
      { title: "Source d'eau sous-jacente", desc: "La décontamination échoue si la source d'humidité (fuite, solin, nivellement du terrain) n'est pas corrigée — habituellement une portée distincte." },
      { title: "Tests et vérification", desc: "Des tests indépendants avant et après les travaux, pour la documentation et pour rassurer les locataires, ajoutent des coûts, mais vous protègent sur le plan juridique." },
      { title: "Occupation et dérangement", desc: "Travailler dans un immeuble occupé, avec avis aux locataires et travail hors des heures normales, augmente la main-d'œuvre." },
    ],
    faqs: [
      { q: "Pourquoi une fourchette de prix aussi large?", a: "Des moisissures cachées et une source d'eau non corrigée peuvent transformer un petit chantier en gros chantier. Un appel d'offres bien défini — idéalement après une inspection — vous donne des soumissions réalistes et comparables." },
      { q: "Ai-je besoin de tests indépendants?", a: "Pour les travaux importants, des tests de vérification par un tiers vous protègent et rassurent les locataires sur la salubrité des lieux. Demandez aux soumissionnaires d'inclure les tests dans leur réponse à l'appel d'offres." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Publiez un appel d'offres pour obtenir de vraies soumissions d'entrepreneurs en décontamination qualifiés.` },
    ],
    metaTitle: "Coût de la décontamination fongique commerciale au Canada (guide 2026)",
    metaDescription:
      "Coûts de la décontamination des moisissures dans les immeubles commerciaux au Canada selon la surface touchée et le niveau de confinement, plus les tests et la correction de la source. Obtenez de vrais prix en publiant un appel d'offres.",
  },
  "commercial-window-replacement-cost": {
    name: "Remplacement de fenêtres commerciales",
    query: "coût de remplacement de fenêtres commerciales",
    headline: "Combien coûte le remplacement de fenêtres commerciales au Canada?",
    intro:
      "Le vitrage commercial se calcule à la fenêtre ou au pied carré de vitrage; les vitrines, les murs-rideaux et les travaux en hauteur se situent au haut de la fourchette. Le système de cadre, la spécification du verre (double ou triple, à faible émissivité, trempé) et l'accès (nacelles, plateformes suspendues) expliquent l'essentiel de l'écart.",
    typicalRange: "de 700 à 2 500 $",
    rangeUnit: "par fenêtre commerciale standard, installée",
    rows: [
      { item: "Fenêtre commerciale standard (à l'unité)", range: "de 700 à 1 800 $" },
      { item: "Vitrine (au pi²)", range: "de 45 à 90 $/pi²" },
      { item: "Mur-rideau (au pi²)", range: "de 70 à 150 $/pi²" },
      { item: "Verre trempé / de sécurité", range: "+20 à 50 %", note: "Exigé par le code à de nombreux endroits." },
      { item: "Accès en hauteur / nacelle", range: "+25 à 60 %", note: "Plateforme suspendue ou nacelle." },
      { item: "Remplacement du verre seulement (unité scellée)", range: "de 300 à 900 $/unité", note: "Scellés défaillants / verre embué." },
    ],
    factors: [
      { title: "Système de cadre", desc: "Remplacer des fenêtres individuelles coûte moins cher que les systèmes de vitrines ou de murs-rideaux, qui sont des assemblages conçus par des ingénieurs." },
      { title: "Spécification du verre", desc: "Le triple vitrage et le verre à faible émissivité, trempé ou feuilleté de sécurité ajoutent chacun des coûts par rapport au double vitrage standard." },
      { title: "Accès et hauteur", desc: "Les travaux aux étages supérieurs et en hauteur exigent des nacelles ou des plateformes suspendues, ainsi que des permis et une signalisation routière." },
      { title: "Quantité", desc: "Le remplacement de toutes les fenêtres d'un immeuble permet d'obtenir un meilleur prix unitaire que des remplacements à la pièce." },
      { title: "Mises aux normes énergétiques et de sécurité", desc: "Respecter le code actuel en matière d'énergie et de sécurité peut exiger un verre de spécification supérieure à celui qui est remplacé." },
    ],
    faqs: [
      { q: "Remplacer le verre ou la fenêtre complète?", a: "Un verre embué à cause d'un scellé défaillant n'exige souvent que le remplacement de l'unité scellée — beaucoup moins cher que la fenêtre complète. Un appel d'offres bien défini vous permet d'obtenir un prix pour les deux options." },
      { q: "Comment le vitrage est-il soumissionné?", a: "À la fenêtre pour les unités individuelles, ou au pied carré pour les vitrines et les murs-rideaux. Indiquez le nombre, les dimensions et les conditions d'accès dans votre appel d'offres pour obtenir des soumissions précises." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Publiez un appel d'offres pour obtenir de vraies soumissions de vitriers commerciaux.` },
    ],
    metaTitle: "Coût de remplacement de fenêtres commerciales au Canada (guide 2026)",
    metaDescription:
      "Coûts de remplacement des fenêtres et du vitrage commerciaux au Canada — à la fenêtre, vitrines et murs-rideaux — et ce qui fait varier le prix. Obtenez de vrais prix en publiant un appel d'offres.",
  },
};

/** Guide text per non-English language; a guide missing here stays English. */
const BY_LANG: Partial<Record<Locale, Record<string, CostGuideText>>> = {
  fr: COST_GUIDES_FR,
  es: COST_GUIDES_ES,
};

function localize(g: CostGuide, lang: Locale): CostGuide {
  if (lang === "en") return g;
  const text = BY_LANG[lang]?.[g.slug];
  return text ? { ...g, ...text, tradeName: tradeName(g.tradeName, lang) } : g;
}

/** Every cost guide in the page language (English data untouched for "en"; Spanish in cost-guides.es.ts). */
export function costGuidesFor(lang: Locale): CostGuide[] {
  return COST_GUIDES.map((g) => localize(g, lang));
}

export function getCostGuideFor(slug: string, lang: Locale): CostGuide | null {
  const g = COST_GUIDES.find((c) => c.slug === slug);
  return g ? localize(g, lang) : null;
}
