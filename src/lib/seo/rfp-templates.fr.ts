/**
 * Quebec French version of the RFP template library (lib/seo/rfp-templates),
 * for the /fr/rfp-templates pages.
 *
 * The text the RFP Writer also uses (name, scope, requirements, site access,
 * bidder questions) is NOT repeated here: it comes from
 * lib/rfp-writer/templates-fr.ts, so there is one French copy of it. This file
 * only holds the parts shown on the template pages alone: pitch, when to use,
 * samples, timeline, evaluation criteria, FAQs and metadata.
 *
 * English pages keep reading lib/seo/rfp-templates.ts directly; use
 * localizeRfpTemplate(t, lang) to get the version for a language.
 */
import type { Locale } from "@/i18n/config";
import { tradeName } from "@/i18n/terms";
import { localizeFr } from "@/lib/rfp-writer/compose-fr";
import { RFP_TEMPLATES_FR } from "@/lib/rfp-writer/templates-fr";
import type { RfpTemplate, TimelinePhase } from "./rfp-templates";
import { localizeRfpTemplateEs } from "./rfp-templates.es";

interface RfpTemplatePageFr {
  query: string;
  pitch: string;
  whenToUse: string;
  titleSample: string;
  summarySample: string;
  timeline: TimelinePhase[];
  evaluationCriteria: string[];
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
}

const OPEN = "Appel d'offres ouvert";

const PAGES_FR: Record<string, RfpTemplatePageFr> = {
  // ---------- TOITURE ----------
  "flat-roof-replacement": {
    query: "modèle d'appel d'offres pour le remplacement d'un toit plat",
    pitch: "Arrachage et nouvelle membrane monocouche sur un immeuble commercial ou multilogement.",
    whenToUse:
      "Votre toit plat a dépassé 75 % de sa durée de vie prévue, vous avez eu des infiltrations à répétition, ou votre étude du fonds de prévoyance prévoit son remplacement d'ici 12 à 24 mois. Convient aux immeubles commerciaux, aux immeubles résidentiels de moyenne hauteur et aux immeubles multilogements dotés d'une toiture à faible pente à membrane (TPO, EPDM, bitume modifié, multicouche).",
    titleSample: "Remplacement de toit plat — [nom de l'immeuble / adresse]",
    summarySample:
      "Arrachage et remplacement de la membrane de toiture à faible pente existante de notre immeuble commercial de [superficie] pi². Nous recherchons une garantie de 20 ans ou plus et un installateur certifié.",
    timeline: [
      { label: OPEN, detail: "21 jours pour permettre aux entrepreneurs de manifester leur intérêt et de soumettre leur prix." },
      { label: "Présélection et visites des lieux", detail: "Les 3 meilleurs soumissionnaires sont invités à visiter le toit et à finaliser leur prix." },
      { label: "Octroi et contrat", detail: "Décision dans la semaine suivant les visites; contrat type abrégé du CCDC." },
      { label: "Mobilisation", detail: "Dans les 4 semaines suivant l'octroi (si la météo le permet)." },
      { label: "Fin des travaux", detail: "Habituellement de 2 à 4 semaines une fois les travaux commencés, selon la superficie du toit et la météo." },
    ],
    evaluationCriteria: [
      "Coût total (y compris les options à prix séparé déclarées).",
      "Qualité de la membrane et de la garantie.",
      "Références : projets de taille et de portée comparables réalisés au cours des 24 derniers mois.",
      "Échéancier et capacité à respecter la période d'achèvement souhaitée.",
      "Qualité de la soumission et clarté de la portée.",
    ],
    faqs: [
      { q: "Combien de temps dure le remplacement d'un toit plat?", a: "Pour un toit commercial typique de 10 000 à 30 000 pi², prévoyez de 2 à 4 semaines de travaux sur place une fois l'entrepreneur mobilisé, si la météo le permet. Les toits plus grands ou plus complexes peuvent prendre plus de temps." },
      { q: "Devrais-je d'abord obtenir un rapport sur l'état du toit?", a: "Si vous ne savez pas si vous avez besoin d'un remplacement ou d'une simple réparation, un rapport payant sur l'état de la toiture, préparé par un consultant indépendant (pas un soumissionnaire), représente généralement de 1 500 à 4 000 $ bien investis." },
      { q: "Ce modèle est-il juridiquement contraignant?", a: "Non. C'est un modèle qui sert à définir la portée des travaux pour obtenir des soumissions comparables. Votre contrat final devrait être révisé par votre avocat et, idéalement, reposer sur un contrat type abrégé du CCDC, pour plus de clarté." },
    ],
    metaTitle: "Modèle d'appel d'offres : remplacement de toit plat (Canada, 2026)",
    metaDescription:
      "Modèle d'appel d'offres gratuit et prêt à l'emploi pour le remplacement d'un toit plat commercial au Canada. Portée, exigences, échéancier et critères d'évaluation préremplis — publiez en 60 secondes.",
  },
  "emergency-roof-repair": {
    query: "modèle d'appel d'offres pour une réparation d'urgence de toiture",
    pitch: "Infiltration active ou dommages causés par une tempête : un couvreur sur place dans les 48 heures.",
    whenToUse:
      "Vous avez une infiltration active, des dommages causés par une tempête ou une défaillance soudaine de la membrane qui exigent une intervention la même semaine (souvent le jour même). Ce modèle privilégie le délai d'intervention et un prix rapide plutôt que le long cycle d'évaluation d'un remplacement complet.",
    titleSample: "Réparation d'urgence de toiture — infiltration active — [nom de l'immeuble]",
    summarySample:
      "Infiltration active dans [logement / secteur] de notre [type d'immeuble]. Nous avons besoin d'un couvreur sur place dans les 48 heures pour évaluer la situation, arrêter l'infiltration et fournir un prix écrit pour la réparation permanente.",
    timeline: [
      { label: OPEN, detail: "48 heures pour permettre aux entrepreneurs de confirmer leur disponibilité et leur tarif." },
      { label: "Octroi", detail: "Le jour même de la clôture — le premier soumissionnaire qualifié à répondre l'emporte habituellement." },
      { label: "Mobilisation", detail: "Dans les 48 heures suivant l'octroi." },
      { label: "Réparation temporaire et rapport", detail: "Le jour même de la mobilisation." },
      { label: "Réparation permanente", detail: "Dans les 2 semaines, si la météo le permet." },
    ],
    evaluationCriteria: [
      "Rapidité d'intervention (doit respecter le délai de 48 heures).",
      "Transparence des tarifs d'urgence.",
      "Compatibilité avec la membrane / protection de la garantie.",
      "Qualité des références pour des interventions d'urgence semblables.",
    ],
    faqs: [
      { q: "Combien coûte une réparation d'urgence de toiture?", a: "Le déplacement d'urgence et la réparation temporaire coûtent habituellement de 500 à 2 500 $ au Canada. Le prix de la réparation permanente dépend de la portée constatée lors de l'évaluation." },
      { q: "Une réparation d'urgence annulera-t-elle la garantie de mon toit?", a: "Seulement si elle est faite par un installateur qui n'est pas certifié pour votre système de membrane. Confirmez toujours que le soumissionnaire est certifié avant d'autoriser les réparations." },
    ],
    metaTitle: "Modèle d'appel d'offres : réparation d'urgence de toiture — intervention en 48 h",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour la réparation d'urgence d'un toit commercial au Canada. Délai d'intervention, portée et critères d'évaluation préremplis. Publiez et recevez des prix dès aujourd'hui.",
  },
  "annual-roof-inspection-contract": {
    query: "modèle d'appel d'offres pour un contrat annuel d'inspection de toiture",
    pitch: "Inspection deux fois par année et allocation pour réparations mineures, pour un portefeuille d'immeubles.",
    whenToUse:
      "Vous gérez un ou plusieurs immeubles et voulez un couvreur sous contrat pour l'inspection préventive, les réparations mineures et le maintien des garanties, plutôt que d'attendre les infiltrations. Particulièrement utile pour les portefeuilles de 3 immeubles ou plus.",
    titleSample: "Contrat annuel d'inspection et d'entretien de toiture — [nombre] immeubles",
    summarySample:
      "Contrat pluriannuel d'inspection et d'entretien mineur de toiture pour [nombre] immeubles totalisant environ [X] pi² de toiture. Inspections trimestrielles ou deux fois par année, avec une allocation d'entretien.",
    timeline: [
      { label: OPEN, detail: "21 jours." },
      { label: "Présélection et visite du portefeuille", detail: "Les 3 meilleurs soumissionnaires sont invités à visiter 2 ou 3 immeubles représentatifs." },
      { label: "Octroi du contrat", detail: "Durée initiale de 1 an, renouvelable chaque année." },
      { label: "Premier cycle d'inspection", detail: "Commence dans les 30 jours suivant la signature du contrat." },
    ],
    evaluationCriteria: [
      "Coût annuel par immeuble (inspection + allocation d'entretien).",
      "Qualité des rapports et des outils.",
      "Expérience avec des portefeuilles et références.",
      "Territoire desservi (doit couvrir tous nos immeubles).",
    ],
    faqs: [
      { q: "Pourquoi un contrat d'entretien?", a: "Des inspections et un entretien documentés sont généralement exigés pour maintenir la validité des garanties NDL des fabricants. S'en passer peut annuler une garantie de 20 ans pour un simple drain qu'on a oublié de nettoyer." },
      { q: "À quelle fréquence faut-il inspecter un toit commercial?", a: "La norme de l'industrie est de deux fois par année (printemps et automne), plus après chaque événement météo important. Plus souvent pour les immeubles qui ont beaucoup d'équipement sur le toit ou des problèmes chroniques." },
    ],
    metaTitle: "Modèle d'appel d'offres : contrat annuel d'inspection de toiture (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour un contrat annuel d'inspection et d'entretien de toiture au Canada. Inspections deux fois par année et allocation d'entretien — protégez votre garantie.",
  },

  // ---------- CVC ----------
  "rooftop-unit-replacement": {
    query: "modèle d'appel d'offres pour le remplacement d'unités de toit",
    pitch: "Remplacement équivalent ou amélioré d'unités de toit (RTU), incluant la grue et l'adaptation des bases.",
    whenToUse:
      "Une unité CVC de toit a 15 ans ou plus, les réparations se multiplient, ou vous planifiez un remplacement préventif avant la panne. Convient au remplacement d'une seule unité ou au remplacement groupé dans un portefeuille.",
    titleSample: "Remplacement d'unités CVC de toit — [nombre] unités à [immeuble]",
    summarySample:
      "Remplacement de [nombre] unités de toit existantes de [tonnage] tonnes à notre [type d'immeuble]. Nous recherchons des options de remplacement équivalent ou amélioré (haute efficacité), incluant la grue, l'adaptation des bases et l'intégration des contrôles.",
    timeline: [
      { label: OPEN, detail: "21 jours pour permettre aux entrepreneurs de manifester leur intérêt." },
      { label: "Présélection et visites des lieux", detail: "Les 3 meilleurs soumissionnaires visitent les lieux pour confirmer la portée." },
      { label: "Octroi", detail: "Dans la semaine suivant les visites." },
      { label: "Délai de livraison de l'équipement", detail: "Habituellement de 4 à 10 semaines, selon la disponibilité des unités." },
      { label: "Installation", detail: "1 à 2 jours par unité (une seule journée pour un remplacement équivalent)." },
    ],
    evaluationCriteria: [
      "Coût total installé.",
      "Qualité, efficacité et garantie de l'équipement.",
      "Délai de livraison et capacité à respecter notre période d'installation.",
      "Expérience avec notre type d'immeuble et notre système de gestion du bâtiment (s'il y a lieu).",
    ],
    faqs: [
      { q: "Devrais-je remplacer une seule unité ou toutes à la fois?", a: "Regrouper les remplacements réduit habituellement le prix par unité et vous permet d'uniformiser vos pièces avec un seul fabricant. Énumérez toujours toutes les unités visées dans l'appel d'offres et demandez un prix groupé." },
      { q: "Remplacement équivalent ou unités à haute efficacité?", a: "Demandez les deux. Les unités à haute efficacité coûtent plus cher à l'achat, mais les économies d'énergie les rentabilisent souvent en 3 à 7 ans. Demandez au soumissionnaire de présenter ses calculs." },
    ],
    metaTitle: "Modèle d'appel d'offres : remplacement d'unités CVC de toit (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour le remplacement d'unités CVC de toit commerciales au Canada. Portée, exigences de levage, conditions de garantie et critères d'évaluation préremplis.",
  },
  "annual-hvac-maintenance-contract": {
    query: "modèle d'appel d'offres pour un contrat d'entretien CVC",
    pitch: "Contrat d'entretien préventif trimestriel ou semestriel, avec filtres et allocation de réparation.",
    whenToUse:
      "Vous voulez des coûts CVC prévisibles, moins d'appels d'urgence et une documentation adéquate pour les garanties. Idéal pour les immeubles qui comptent plusieurs unités de toit, les immeubles résidentiels de moyenne et grande taille, et tout immeuble où un arrêt coûte cher.",
    titleSample: "Contrat annuel d'entretien préventif CVC — [immeuble / portefeuille]",
    summarySample:
      "Nous recherchons un contrat d'entretien préventif de 1 à 3 ans pour [nombre] unités CVC réparties dans [nombre] immeubles. Comprend des visites d'entretien trimestrielles, le remplacement des filtres et une allocation de réparation.",
    timeline: [
      { label: OPEN, detail: "21 jours." },
      { label: "Présélection et visite du portefeuille", detail: "Les 3 meilleurs soumissionnaires sont invités à visiter les immeubles et à soumettre leur prix." },
      { label: "Début du contrat", detail: "Durée de 1 à 3 ans, renouvelable d'un commun accord." },
    ],
    evaluationCriteria: [
      "Coût annuel par unité.",
      "Générosité et transparence de l'allocation de réparation.",
      "Délais d'intervention garantis.",
      "Qualité des rapports et accès au portail.",
      "Expérience avec des portefeuilles.",
    ],
    faqs: [
      { q: "Quel est le rendement d'un entretien préventif?", a: "Un équipement CVC bien entretenu dure de 30 à 50 % plus longtemps et fonctionne de 10 à 25 % plus efficacement. Le contrat se rentabilise généralement par les appels d'urgence évités et la durée de vie prolongée de l'équipement." },
      { q: "Contrat de 1 an ou de 3 ans?", a: "Un contrat de 1 an est plus prudent avec un nouveau fournisseur. Un contrat de 3 ans permet habituellement d'obtenir de meilleurs prix et de fixer les tarifs. Assurez-vous que le contrat comporte une clause de résiliation claire en cas d'inexécution." },
    ],
    metaTitle: "Modèle d'appel d'offres : contrat d'entretien CVC (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour un contrat d'entretien préventif CVC commercial au Canada. Visites trimestrielles, allocation de réparation et conditions d'intervention d'urgence préremplies.",
  },
  "boiler-replacement": {
    query: "modèle d'appel d'offres pour le remplacement d'une chaudière commerciale",
    pitch: "Remplacement de la chaudière de chauffage d'un immeuble multilogement ou commercial.",
    whenToUse:
      "Votre chaudière à eau chaude ou à vapeur arrive en fin de vie, échoue aux inspections, ou vous voulez passer à une chaudière à condensation à haute efficacité pour économiser de l'énergie. Courant dans les immeubles résidentiels de moyenne hauteur, les écoles et les immeubles commerciaux plus anciens.",
    titleSample: "Remplacement de chaudière — [nom de l'immeuble]",
    summarySample:
      "Remplacement de la chaudière [à eau chaude / à vapeur] existante de [X] BTU à notre [type d'immeuble]. Nous recherchons des options à haute efficacité et un arrêt du chauffage le plus court possible.",
    timeline: [
      { label: OPEN, detail: "21 jours." },
      { label: "Présélection et visite de la salle mécanique", detail: "Les 3 meilleurs soumissionnaires visitent les lieux." },
      { label: "Octroi", detail: "Dans la semaine suivant les visites." },
      { label: "Délai de livraison de l'équipement", detail: "De 4 à 12 semaines pour les appareils de plus grande capacité." },
      { label: "Installation", detail: "Habituellement de 3 à 7 jours; une chaudière temporaire peut être nécessaire si les travaux ont lieu pendant la saison de chauffage." },
    ],
    evaluationCriteria: [
      "Coût installé (y compris le chauffage temporaire, au besoin).",
      "Efficacité et économies d'énergie prévues.",
      "Garantie du fabricant et de la main-d'œuvre.",
      "Réduction au minimum des interruptions pour les occupants.",
      "Références pour des projets comparables.",
    ],
    faqs: [
      { q: "Peut-on remplacer une chaudière en hiver?", a: "Oui, mais il vous faudra probablement une chaudière temporaire pour garder les occupants au chaud pendant le remplacement. Prévoyez de 5 000 à 15 000 $ de plus pour la location et l'installation." },
      { q: "Une chaudière à condensation à haute efficacité est-elle toujours le bon choix?", a: "Généralement oui pour les immeubles dont l'efficacité actuelle est inférieure à 90 %, mais la modification de l'évacuation et la gestion des condensats peuvent ajouter des coûts. Demandez au soumissionnaire de montrer la période de récupération prévue." },
    ],
    metaTitle: "Modèle d'appel d'offres : remplacement de chaudière (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour le remplacement d'une chaudière dans un immeuble commercial ou multilogement au Canada. Portée, exigences pour les appareils au gaz (RBQ, TSSA) et conditions de garantie préremplies.",
  },

  // ---------- EXTÉRIEUR / TERRAIN ----------
  "parking-lot-resurfacing": {
    query: "modèle d'appel d'offres pour le resurfaçage d'un stationnement",
    pitch: "Planage et resurfaçage ou reconstruction complète d'un stationnement commercial.",
    whenToUse:
      "Votre stationnement présente des fissures en surface, des nids-de-poule ou du faïençage (fissures en peau de crocodile) qui indiquent une défaillance de la fondation. Le scellement ne suffit plus et une intervention plus importante s'impose.",
    titleSample: "Resurfaçage de stationnement — [nom de l'immeuble] — [X] pi²",
    summarySample:
      "Planage et resurfaçage (ou reconstruction complète — selon la recommandation du soumissionnaire) de notre stationnement en asphalte de [X] pi². Comprend le nouveau marquage et des travaux mineurs aux puisards.",
    timeline: [
      { label: OPEN, detail: "21 jours." },
      { label: "Visite des lieux", detail: "Les 3 meilleurs soumissionnaires visitent le stationnement et confirment la portée." },
      { label: "Octroi", detail: "Dans la semaine qui suit." },
      { label: "Mobilisation", detail: "Selon la météo — la saison de pavage s'étend de mai à octobre dans la majeure partie du Canada." },
      { label: "Fin des travaux", detail: "De 1 à 2 semaines pour la plupart des stationnements; un calendrier par phases préserve l'accès des locataires." },
    ],
    evaluationCriteria: [
      "Coût au pi².",
      "Plan de phasage et incidence sur les locataires.",
      "Qualité de l'asphalte et garantie.",
      "Conformité aux exigences d'accessibilité (normes provinciales, AODA en Ontario).",
      "Références pour des stationnements commerciaux de taille semblable.",
    ],
    faqs: [
      { q: "Planage et resurfaçage ou reconstruction complète?", a: "Le planage et le resurfaçage conviennent si la fondation est saine et que les dommages sont en surface. Une reconstruction complète s'impose si vous voyez du faïençage, des affaissements ou une défaillance de la fondation. Demandez au soumissionnaire d'inspecter et de faire une recommandation." },
      { q: "Pourquoi l'asphalte coûte-t-il tellement plus cher qu'avant?", a: "Le prix du bitume a considérablement augmenté depuis 2020. Lancez votre appel d'offres tôt dans la saison de pavage pour obtenir les meilleurs prix." },
    ],
    metaTitle: "Modèle d'appel d'offres : resurfaçage de stationnement (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour le resurfaçage d'un stationnement commercial au Canada. Planage et resurfaçage ou reconstruction complète, plan de phasage et conformité aux normes d'accessibilité préremplis.",
  },
  "snow-removal-seasonal-contract": {
    query: "modèle d'appel d'offres pour un contrat de déneigement",
    pitch: "Contrat de déneigement et de déglaçage à forfait saisonnier ou à l'intervention pour immeubles commerciaux.",
    whenToUse:
      "Vous devez retenir un entrepreneur en déneigement avant le début de la saison. Que vous préfériez un forfait saisonnier (prévisible) ou un tarif à l'intervention (vous ne payez que lorsqu'il neige), ce modèle couvre les deux.",
    titleSample: "Déneigement et déglaçage — [nom de l'immeuble] — [saison]",
    summarySample:
      "Contrat saisonnier de déneigement et d'épandage de sel / d'abrasifs pour notre [type d'immeuble] situé au [adresse]. [Forfait saisonnier / à l'intervention]. Couverture du 15 novembre au 15 avril.",
    timeline: [
      { label: OPEN, detail: "Publiez en août ou en septembre pour obtenir les meilleurs prix." },
      { label: "Octroi", detail: "Au plus tard le 1er octobre." },
      { label: "Inspection avant la saison", detail: "Visitez les lieux avec l'entrepreneur avant la première neige." },
      { label: "Saison", detail: "Du 15 novembre au 15 avril (ou selon la période définie)." },
    ],
    evaluationCriteria: [
      "Coût saisonnier total (comparez les scénarios au forfait et à l'intervention).",
      "Délais d'intervention garantis.",
      "Couverture d'assurance responsabilité.",
      "Documentation du service et suivi GPS.",
      "Références locales et fiabilité démontrée.",
    ],
    faqs: [
      { q: "Forfait saisonnier ou tarif à l'intervention?", a: "Le forfait saisonnier est prévisible et c'est habituellement le bon choix pour les immeubles commerciaux très achalandés. Le tarif à l'intervention peut coûter moins cher lors d'un hiver doux, mais vous expose à de mauvaises surprises lors d'un hiver rigoureux et au risque de chutes et de glissades si l'intervention tarde." },
      { q: "Pourquoi l'assurance contre les chutes et glissades est-elle si importante?", a: "Si une poursuite pour une chute survient sur votre propriété, l'assurance de l'entrepreneur en déneigement est la première ligne de défense. Un minimum de 5 M$ est la norme pour les immeubles commerciaux." },
    ],
    metaTitle: "Modèle d'appel d'offres : contrat de déneigement (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour un contrat de déneigement et de déglaçage commercial au Canada. Forfait saisonnier ou tarif à l'intervention, délais d'intervention, assurance responsabilité.",
  },
  "landscaping-annual-contract": {
    query: "modèle d'appel d'offres pour un contrat d'entretien paysager commercial",
    pitch: "Entretien du gazon, des plates-bandes et des arbres, de mai à octobre, sur une propriété commerciale.",
    whenToUse:
      "Vous gérez une propriété dont le terrain exige un entretien hebdomadaire : tonte, désherbage, plates-bandes, taille des arbres, fertilisation, irrigation. Idéal pour les immeubles commerciaux, les immeubles multilogements et les propriétés où l'apparence extérieure compte.",
    titleSample: "Aménagement paysager et entretien du terrain — [nom de l'immeuble] — [saison]",
    summarySample:
      "Contrat annuel d'entretien paysager pour notre [type d'immeuble] situé au [adresse]. Comprend l'entretien hebdomadaire de mai à octobre, le nettoyage du printemps et de l'automne, ainsi que la mise en service et la fermeture de l'irrigation.",
    timeline: [
      { label: OPEN, detail: "Publiez en février ou en mars pour obtenir les meilleurs prix." },
      { label: "Octroi", detail: "Au plus tard le 1er avril." },
      { label: "Début de la saison", detail: "Nettoyage printanier au début de mai." },
      { label: "Fin de la saison", detail: "Nettoyage automnal en octobre." },
    ],
    evaluationCriteria: [
      "Coût saisonnier total.",
      "Qualité des références et photos des travaux.",
      "Fiabilité de l'horaire.",
      "Qualité de l'équipement et normes de bruit / d'émissions (s'il y a lieu).",
    ],
    faqs: [
      { q: "L'équipement électrique et silencieux vaut-il le supplément?", a: "Pour les immeubles à usage mixte ou voisins de résidences, oui : moins de plaintes des locataires, et certaines municipalités l'exigent de plus en plus. Le supplément est habituellement de 10 à 15 %." },
      { q: "Chaque semaine ou aux deux semaines?", a: "L'entretien hebdomadaire est la norme pour les immeubles commerciaux dont la pelouse est visible. Aux deux semaines convient aux propriétés où l'apparence extérieure est moins importante." },
    ],
    metaTitle: "Modèle d'appel d'offres : contrat d'entretien paysager (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour un contrat d'aménagement paysager et d'entretien de terrain commercial au Canada. Visites hebdomadaires, nettoyages saisonniers, irrigation, fertilisation.",
  },
  "exterior-painting": {
    query: "modèle d'appel d'offres pour la peinture extérieure commerciale",
    pitch: "Peinture extérieure complète ou partielle d'un immeuble commercial ou multilogement.",
    whenToUse:
      "La peinture de votre immeuble est délavée, s'écaille ou n'a pas été refaite depuis 7 ans ou plus. Portée courante pour les immeubles commerciaux et résidentiels recouverts de stuc, de bois ou de revêtement métallique.",
    titleSample: "Peinture extérieure — [nom de l'immeuble] — [X] pi²",
    summarySample:
      "Peinture extérieure complète de notre [type d'immeuble] situé au [adresse]. Environ [X] pi² de [type de surface]. Comprend la préparation, l'apprêt et 2 couches de finition.",
    timeline: [
      { label: OPEN, detail: "21 jours." },
      { label: "Visite des lieux", detail: "Les 3 meilleurs soumissionnaires visitent les lieux." },
      { label: "Octroi", detail: "Dans la semaine qui suit." },
      { label: "Mobilisation", detail: "Selon la météo — la meilleure période va de mai à septembre." },
      { label: "Fin des travaux", detail: "De 1 à 3 semaines selon la taille de l'immeuble." },
    ],
    evaluationCriteria: [
      "Coût total.",
      "Qualité de la peinture et garantie.",
      "Expérience de l'équipe et références.",
      "Échéancier du projet.",
      "Plan de protection pour les locataires et l'aménagement paysager.",
    ],
    faqs: [
      { q: "Combien de temps dure une peinture extérieure?", a: "Sur une surface bien préparée, avec un produit haut de gamme, de 7 à 10 ans. Un produit bon marché ou une préparation bâclée peut réduire cette durée de moitié." },
      { q: "Devrais-je payer plus pour une peinture haut de gamme?", a: "Oui : l'écart de prix est minime comparé à la main-d'œuvre, et un produit haut de gamme dure presque deux fois plus longtemps. Le soumissionnaire qui utilise une peinture d'entrée de gamme ne vous fait pas économiser sur 10 ans." },
    ],
    metaTitle: "Modèle d'appel d'offres : peinture extérieure (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour des travaux de peinture extérieure commerciale au Canada. Portée, allocation de préparation, exigences de qualité de la peinture et conditions de garantie préremplies.",
  },

  // ---------- INTÉRIEUR ----------
  "common-area-painting": {
    query: "modèle d'appel d'offres pour la peinture des aires communes",
    pitch: "Corridors, halls d'entrée, cages d'escalier : peinture intérieure avec un minimum de dérangement pour les locataires.",
    whenToUse:
      "Rafraîchissez les aires communes intérieures d'un immeuble multilogement, de bureaux ou à usage mixte. Idéal lorsque la portée est bien définie (corridors, cages d'escalier, hall d'entrée) et que vous voulez déranger le moins possible les locataires.",
    titleSample: "Peinture des aires communes — corridors et cages d'escalier — [nom de l'immeuble]",
    summarySample:
      "Peinture des corridors des aires communes ([X] étages), des cages d'escalier ([X]) et du hall d'entrée principal de notre [type d'immeuble]. Immeuble occupé : les travaux doivent être planifiés en fonction de la circulation des résidents.",
    timeline: [
      { label: OPEN, detail: "21 jours." },
      { label: "Octroi", detail: "Dans les 2 semaines suivant la clôture de l'appel d'offres." },
      { label: "Mobilisation", detail: "Date de début à coordonner avec la gestion immobilière." },
      { label: "Fin des travaux", detail: "Habituellement de 2 à 6 semaines selon la taille de l'immeuble et le phasage." },
    ],
    evaluationCriteria: [
      "Coût total.",
      "Approche respectueuse des locataires (faible teneur en COV, plan de phasage, gestion des plaintes).",
      "Références pour des travaux en immeuble occupé.",
      "Qualité de la peinture.",
    ],
    faqs: [
      { q: "Peinture sans COV ou à faible teneur en COV : est-ce que ça vaut vraiment la peine?", a: "Pour un immeuble occupé, oui. Une peinture sans COV élimine les plaintes liées aux odeurs et aux sensibilités chimiques. Le supplément est minime (de 5 à 10 $ le gallon)." },
      { q: "Combien de temps faut-il pour peindre les aires communes?", a: "Un immeuble typique de moyenne hauteur (10 étages) prend de 3 à 4 semaines, à raison d'un étage par semaine. Les cages d'escalier et le hall d'entrée ajoutent 1 à 2 semaines." },
    ],
    metaTitle: "Modèle d'appel d'offres : peinture des aires communes (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour la peinture intérieure des aires communes d'un immeuble occupé. Peinture sans COV, phasage adapté aux locataires, portée complète préremplie.",
  },
  "corridor-flooring-replacement": {
    query: "modèle d'appel d'offres pour le remplacement du revêtement de sol des corridors",
    pitch: "Remplacement de tapis, de LVT ou de planches de vinyle dans les corridors d'un immeuble multilogement.",
    whenToUse:
      "Le tapis ou le revêtement de sol des corridors est usé, taché ou démodé. Courant dans les immeubles résidentiels de moyenne hauteur et les immeubles de bureaux. Idéalement, définissez la portée par étage complet ou par corridor complet pour un résultat uniforme.",
    titleSample: "Remplacement du revêtement de sol des corridors — [nom de l'immeuble] — [X] étages",
    summarySample:
      "Remplacement du revêtement de sol des corridors sur [X] étages de notre [type d'immeuble]. Les soumissionnaires proposent deux options : des carreaux de tapis de qualité commerciale et des planches de vinyle de luxe (LVT).",
    timeline: [
      { label: OPEN, detail: "21 jours." },
      { label: "Remise d'échantillons", detail: "Tous les soumissionnaires remettent des échantillons physiques des deux options." },
      { label: "Octroi", detail: "Dans les 2 semaines suivant la clôture de l'appel d'offres." },
      { label: "Fin des travaux", detail: "Habituellement 1 jour par corridor par étage; de 2 à 6 semaines au total." },
    ],
    evaluationCriteria: [
      "Coût total installé pour chaque option.",
      "Qualité du produit, couche d'usure et garantie.",
      "Certifications de l'installateur.",
      "Références pour des corridors d'immeubles multilogements occupés.",
      "Plan de phasage et incidence sur les locataires.",
    ],
    faqs: [
      { q: "Carreaux de tapis ou LVT?", a: "Les carreaux de tapis sont plus chauds sous le pied et plus silencieux, mais plus difficiles à nettoyer. Les LVT sont plus durables, plus faciles à nettoyer et mieux adaptées aux zones humides (corridors des buanderies). La plupart des immeubles choisissent les LVT pour les nouvelles constructions et les carreaux de tapis pour les corridors résidentiels." },
      { q: "Combien de temps dure un revêtement de sol de corridor?", a: "Carreaux de tapis haut de gamme : de 10 à 15 ans. LVT avec une couche d'usure de 20 mils : de 15 à 20 ans. Les produits moins chers durent deux fois moins longtemps." },
    ],
    metaTitle: "Modèle d'appel d'offres : remplacement du revêtement de sol des corridors (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour remplacer le revêtement de sol des corridors d'un immeuble multilogement occupé. Carreaux de tapis ou LVT, phasage, portée complète préremplie.",
  },

  // ---------- MÉCANIQUE / ÉLECTRICITÉ ----------
  "elevator-service-contract": {
    query: "modèle d'appel d'offres pour un contrat d'entretien d'ascenseurs",
    pitch: "Contrat d'entretien mensuel et de service d'urgence pour un ou plusieurs ascenseurs.",
    whenToUse:
      "Votre contrat d'entretien d'ascenseurs arrive à échéance, ou vous êtes insatisfait du service de votre fournisseur actuel. Les contrats pluriannuels dominent cette catégorie; comme on change rarement de fournisseur, ça vaut la peine de bien faire les choses.",
    titleSample: "Contrat d'entretien d'ascenseurs — [nom de l'immeuble] — [nombre] ascenseurs",
    summarySample:
      "Contrat d'entretien de [nombre] ans pour [nombre] ascenseurs à notre [type d'immeuble]. Entretien préventif mensuel, service d'urgence et inspections annuelles obligatoires (RBQ au Québec, TSSA en Ontario).",
    timeline: [
      { label: OPEN, detail: "30 jours (plus long en raison de la nature pluriannuelle du contrat)." },
      { label: "Présélection et visite des lieux", detail: "Les 3 meilleurs soumissionnaires visitent les lieux, inspectent l'équipement et proposent un plan d'entretien." },
      { label: "Octroi", detail: "Dans les 2 semaines suivant les visites." },
      { label: "Durée du contrat", detail: "Habituellement de 1 à 3 ans avec options de renouvellement. Une clause de résiliation avec préavis de 90 jours est souhaitée." },
      { label: "Date de début", detail: "Alignée sur la date de fin du contrat actuel." },
    ],
    evaluationCriteria: [
      "Coût mensuel par ascenseur.",
      "Étendue de la couverture (entretien complet ou partiel).",
      "Délais d'intervention garantis et imputabilité.",
      "Effectif de mécaniciens locaux.",
      "Qualité du portail client.",
      "Souplesse de résiliation.",
    ],
    faqs: [
      { q: "Pourquoi est-il si difficile de sortir d'un contrat d'ascenseurs?", a: "Parce que la plupart sont des contrats « huile et graisse » de 5 ans à renouvellement automatique, dont le prix augmente. Exigez une durée initiale de 1 à 3 ans et une clause de résiliation sans motif avec préavis de 90 jours." },
      { q: "Entretien complet ou « huile et graisse »?", a: "L'entretien complet coûte plus cher chaque mois, mais plafonne votre exposition aux grosses dépenses. Le contrat « huile et graisse » est bon marché chaque mois, mais vous facture séparément les câbles, les contrôleurs, etc., ce qui peut réserver de coûteuses surprises. La plupart des propriétaires qui ont besoin d'un budget prévisible choisissent l'entretien complet." },
    ],
    metaTitle: "Modèle d'appel d'offres : contrat d'entretien d'ascenseurs (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour un contrat d'entretien d'ascenseurs commerciaux au Canada. Portée d'entretien complet, délais d'intervention garantis, clauses de résiliation équitables.",
  },
  "electrical-panel-upgrade": {
    query: "modèle d'appel d'offres pour la mise à niveau d'un panneau électrique",
    pitch: "Augmentation de l'entrée électrique ou remplacement du panneau principal d'un immeuble commercial ou multilogement.",
    whenToUse:
      "Votre entrée électrique est sous-dimensionnée, vieillissante, ou doit être augmentée pour un agrandissement, des bornes de recharge ou un nouveau locataire. Courant dans les immeubles commerciaux et multilogements plus anciens.",
    titleSample: "Mise à niveau du panneau / de l'entrée électrique — [nom de l'immeuble]",
    summarySample:
      "Augmentation de l'entrée électrique principale existante de [X] A à [X] A à notre [type d'immeuble]. Comprend un nouveau panneau principal, la coordination avec le distributeur d'électricité et les travaux requis aux panneaux secondaires.",
    timeline: [
      { label: OPEN, detail: "30 jours." },
      { label: "Visite des lieux", detail: "Les 3 meilleurs soumissionnaires visitent les lieux avec l'ingénieur." },
      { label: "Octroi", detail: "Dans les 2 semaines suivant les visites." },
      { label: "Délais du permis et du distributeur", detail: "Habituellement de 4 à 12 semaines pour l'approbation de l'augmentation de l'entrée électrique." },
      { label: "Installation", detail: "Le basculement se fait habituellement en une soirée ou une fin de semaine; de 4 à 6 semaines pour l'ensemble du projet." },
    ],
    evaluationCriteria: [
      "Coût total installé.",
      "Qualité de l'ingénierie et de la coordination avec le distributeur.",
      "Plan de gestion des interruptions pour les locataires.",
      "Références pour des augmentations d'entrée électrique semblables.",
      "Expérience du maître électricien et de l'équipe.",
    ],
    faqs: [
      { q: "Combien de temps prend une augmentation de l'entrée électrique?", a: "De l'octroi du contrat au basculement, habituellement de 8 à 16 semaines — surtout en raison des délais du distributeur et des permis, pas de l'installation elle-même." },
      { q: "Ai-je besoin d'un ingénieur-conseil?", a: "Pour une augmentation de l'entrée électrique de plus de 600 A ou tout ce qui exige un permis de construction, généralement oui. Le soumissionnaire peut en recommander un ou l'inclure." },
    ],
    metaTitle: "Modèle d'appel d'offres : mise à niveau du panneau électrique (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour la mise à niveau de l'entrée et du panneau électriques d'un immeuble commercial au Canada. Coordination des inspections, planification des interruptions, portée complète préremplie.",
  },
  "led-lighting-retrofit": {
    query: "modèle d'appel d'offres pour la conversion de l'éclairage au DEL",
    pitch: "Remplacer l'éclairage fluorescent ou DHI désuet par du DEL pour économiser l'énergie.",
    whenToUse:
      "Votre immeuble a encore des fluorescents T8/T12, des halogènes ou de l'éclairage DHI. Les économies d'énergie, la réduction de l'entretien et les subventions des distributeurs d'électricité rentabilisent souvent la conversion en 2 à 5 ans. Courant dans les garages de stationnement, les aires communes et l'éclairage extérieur des immeubles.",
    titleSample: "Conversion de l'éclairage au DEL — [nom de l'immeuble] — [nombre] luminaires",
    summarySample:
      "Conversion au DEL de [nombre] luminaires dans [le garage de stationnement / les aires communes / l'extérieur] de notre [type d'immeuble]. Comprend la coordination des subventions du distributeur d'électricité et l'élimination des luminaires existants.",
    timeline: [
      { label: OPEN, detail: "21 jours." },
      { label: "Visite des lieux et audit", detail: "Les 3 meilleurs soumissionnaires font l'audit des luminaires et recommandent une approche." },
      { label: "Octroi", detail: "Dans les 2 semaines suivant les audits." },
      { label: "Demande de subvention", detail: "Soumise avant la mobilisation." },
      { label: "Installation", detail: "Habituellement de 1 à 3 semaines selon le nombre de luminaires et l'accès." },
    ],
    evaluationCriteria: [
      "Coût net (coût installé moins la subvention du distributeur).",
      "Économies d'énergie prévues et période de récupération.",
      "Qualité des luminaires et garantie.",
      "Historique d'approbation des subventions.",
      "Performance photométrique.",
    ],
    faqs: [
      { q: "Quelle est la période de récupération typique d'une conversion au DEL?", a: "De 2 à 5 ans pour la plupart des immeubles commerciaux, souvent moins avec les subventions. Les garages de stationnement éclairés 24 heures sur 24 ont généralement la récupération la plus rapide." },
      { q: "Remplacement complet du luminaire ou trousse de conversion?", a: "Le remplacement complet offre une plus longue durée de vie et des commandes modernes, mais coûte plus cher. Les trousses de conversion sont moins chères et plus rapides à installer, mais héritent de la durée de vie du luminaire existant. Le soumissionnaire devrait faire une recommandation pour chaque emplacement." },
    ],
    metaTitle: "Modèle d'appel d'offres : conversion de l'éclairage au DEL (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour la conversion de l'éclairage commercial au DEL au Canada. Coordination des subventions, analyse de récupération, portée complète préremplie.",
  },

  // ---------- SÉCURITÉ / CONFORMITÉ ----------
  "annual-fire-safety-inspection": {
    query: "modèle d'appel d'offres pour un contrat d'inspection de sécurité incendie",
    pitch: "Inspection annuelle obligatoire des alarmes, des gicleurs, des extincteurs et de l'éclairage de sortie.",
    whenToUse:
      "Vous avez besoin d'une inspection certifiée conforme au Code de sécurité du Québec (ou au Code de prévention des incendies de l'Ontario, ou à l'équivalent provincial) pour le système d'alarme incendie, les gicleurs, les extincteurs et l'éclairage d'urgence. Obligatoire chaque année pour les immeubles commerciaux et la plupart des immeubles résidentiels multilogements.",
    titleSample: "Inspection et entretien annuels de sécurité incendie — [nom de l'immeuble]",
    summarySample:
      "Inspection et entretien annuels du système d'alarme incendie, des gicleurs, des extincteurs, de l'éclairage de sortie et des autres systèmes de sécurité à notre [type d'immeuble], conformément au [code de prévention des incendies provincial].",
    timeline: [
      { label: OPEN, detail: "21 jours." },
      { label: "Octroi", detail: "Dans les 2 semaines." },
      { label: "Première inspection", detail: "Planifiée dans les 30 jours suivant l'octroi." },
      { label: "Durée du contrat", detail: "1 an ou 3 ans." },
    ],
    evaluationCriteria: [
      "Coût annuel total.",
      "Transparence des coûts (ventilés).",
      "Réputation d'honnêteté dans le signalement des déficiences (c'est très important).",
      "Qualité du portail.",
      "Certifications des techniciens.",
    ],
    faqs: [
      { q: "Pourquoi le coût des inspections incendie varie-t-il autant?", a: "Les inspections bon marché s'accompagnent souvent de prix gonflés pour la correction des déficiences — c'est là que ces entreprises font leur argent. Exigez une inspection au prix ventilé et au moins 2 autres avis sur toute déficience importante avant d'autoriser les réparations." },
      { q: "Puis-je confier l'inspection et les réparations à des fournisseurs différents?", a: "Oui, et vous devriez probablement le faire. Certains gestionnaires immobiliers confient l'inspection à une entreprise (qui n'a donc aucun intérêt à gonfler les déficiences) et les réparations à une autre (mise en concurrence sur le prix)." },
    ],
    metaTitle: "Modèle d'appel d'offres : contrat d'inspection de sécurité incendie (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour un contrat annuel d'inspection de sécurité incendie au Canada. Techniciens certifiés ACAI/CFAA, prix transparents, normes de signalement des déficiences.",
  },
  "mold-remediation": {
    query: "modèle d'appel d'offres pour la décontamination fongique",
    pitch: "Confinement, retrait et vérification finale des moisissures dans un immeuble commercial ou résidentiel.",
    whenToUse:
      "Vous avez eu une fuite, une inondation ou un problème d'humidité chronique, et vous avez des moisissures visibles ou soupçonnées. Particulièrement urgent dans un immeuble résidentiel multilogement occupé, où les locataires peuvent avoir des inquiétudes pour leur santé ou menacer d'intenter une poursuite.",
    titleSample: "Décontamination fongique — [nom de l'immeuble] — [secteur touché]",
    summarySample:
      "Décontamination des moisissures dans [secteur] de notre [type d'immeuble], environ [X] pi² de surface touchée. Source d'humidité : [déterminée / à investiguer]. Exige un confinement, le retrait des matériaux et des tests de vérification après la décontamination.",
    timeline: [
      { label: OPEN, detail: "10 jours (généralement plus court que pour des travaux non urgents)." },
      { label: "Évaluation par l'hygiéniste industriel", detail: "Indépendante — habituellement avant la mobilisation du soumissionnaire." },
      { label: "Octroi", detail: "Dans la semaine suivant la clôture de l'appel d'offres." },
      { label: "Mobilisation", detail: "Dans la semaine suivant l'octroi." },
      { label: "Décontamination", detail: "Habituellement de 1 à 3 semaines." },
      { label: "Vérification et reconstruction", detail: "Vérification dans la semaine suivant la fin de la décontamination; reconstruction distincte." },
    ],
    evaluationCriteria: [
      "Coût total de la décontamination.",
      "Recours à un hygiéniste industriel indépendant (condition essentielle).",
      "Qualité du confinement et conformité à la norme IICRC.",
      "Approche de communication avec les locataires.",
      "Références pour des travaux semblables.",
    ],
    faqs: [
      { q: "Pourquoi exiger un hygiéniste industriel indépendant?", a: "Parce que si la même entreprise fait à la fois le retrait et les tests de vérification, il y a un conflit d'intérêts évident. Un hygiéniste indépendant vous protège sur le plan juridique et sur celui de la réputation." },
      { q: "Les locataires devront-ils être relogés?", a: "Ça dépend de la portée. Un petit confinement dans une seule pièce peut ne pas exiger de relogement. La décontamination d'un logement complet l'exige habituellement. Prévoyez un budget pour l'hébergement temporaire à l'hôtel." },
    ],
    metaTitle: "Modèle d'appel d'offres : décontamination fongique (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour la décontamination des moisissures dans un immeuble commercial ou résidentiel au Canada. Confinement conforme à l'IICRC, vérification par un hygiéniste indépendant, plan de communication avec les locataires.",
  },
  "pest-control-contract": {
    query: "modèle d'appel d'offres pour un contrat d'extermination commercial",
    pitch: "Contrat préventif trimestriel et service sur appel — approche de gestion intégrée des ravageurs (GIR).",
    whenToUse:
      "Vous gérez un ou plusieurs immeubles et voulez un exterminateur sous contrat pour la prévention et les interventions sur appel. La gestion intégrée des ravageurs (GIR) est maintenant l'approche privilégiée : moins de produits chimiques, plus d'inspection et d'exclusion.",
    titleSample: "Contrat de service d'extermination — [immeuble / portefeuille]",
    summarySample:
      "Contrat annuel d'extermination pour notre [type d'immeuble]. Approche GIR avec visites préventives trimestrielles et intervention sur appel. Couverture pour [ravageurs courants : rongeurs, coquerelles, punaises de lit, etc.].",
    timeline: [
      { label: OPEN, detail: "21 jours." },
      { label: "Octroi", detail: "Dans les 2 semaines." },
      { label: "Durée du contrat", detail: "1 an ou 2 ans." },
    ],
    evaluationCriteria: [
      "Coût annuel par immeuble.",
      "Approche axée sur la GIR (plutôt que sur les pesticides).",
      "Délais d'intervention garantis.",
      "Qualité du portail.",
      "Références locales.",
    ],
    faqs: [
      { q: "Pourquoi la GIR plutôt que la pulvérisation régulière?", a: "La pulvérisation régulière de pesticides est de plus en plus restreinte par la réglementation provinciale et impopulaire auprès des locataires. La GIR (inspection, exclusion et traitement ciblé) est plus efficace à long terme et génère moins de plaintes." },
      { q: "Le traitement des punaises de lit est-il habituellement inclus?", a: "Rarement : la plupart des contrats facturent le traitement des punaises de lit en supplément, par logement, parce qu'il exige beaucoup de main-d'œuvre. Demandez le tarif par logement dès le départ." },
    ],
    metaTitle: "Modèle d'appel d'offres : contrat d'extermination (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour un contrat d'extermination commercial au Canada. Approche de gestion intégrée des ravageurs, visites trimestrielles, service sur appel, prix transparents.",
  },

  // ---------- NETTOYAGE / RESTAURATION ----------
  "janitorial-annual-contract": {
    query: "modèle d'appel d'offres pour un contrat d'entretien ménager",
    pitch: "Contrat d'entretien ménager de jour ou de nuit pour les aires communes d'un immeuble commercial ou multilogement.",
    whenToUse:
      "Vous relancez l'appel d'offres pour votre contrat d'entretien ménager (recommandé tous les 2 à 3 ans pour garder des prix justes), ou vous partez de zéro pour un nouvel immeuble. Idéal pour les bureaux commerciaux, les commerces de détail et les immeubles résidentiels de moyenne hauteur.",
    titleSample: "Contrat d'entretien ménager — [nom de l'immeuble]",
    summarySample:
      "Contrat d'entretien ménager quotidien ou de nuit pour notre [type d'immeuble] situé au [adresse]. Environ [X] pi² de surface à nettoyer, incluant les aires communes, les salles de toilettes et les ascenseurs.",
    timeline: [
      { label: OPEN, detail: "21 jours." },
      { label: "Visites des lieux", detail: "Les 3 meilleurs soumissionnaires sont invités à visiter les lieux et à confirmer la portée." },
      { label: "Octroi", detail: "Dans les 2 semaines." },
      { label: "Transition", detail: "30 jours entre l'octroi et le premier soir de service." },
      { label: "Durée du contrat", detail: "Habituellement 2 ans, avec révision annuelle." },
    ],
    evaluationCriteria: [
      "Coût mensuel au pi².",
      "Modèle de personnel (employés directs ou sous-traitants).",
      "Supervision de chaque quart de travail.",
      "Fournitures incluses ou en supplément.",
      "Qualité du portail et des communications.",
      "Références pour des immeubles de type semblable.",
    ],
    faqs: [
      { q: "Devrais-je relancer l'appel d'offres chaque année?", a: "Tous les 2 à 3 ans, c'est l'idéal. Des appels d'offres annuels entraînent un roulement de fournisseurs; au-delà de 3 ans, les prix dérivent et le service se relâche." },
      { q: "Employés directs ou sous-traitants : est-ce que ça change quelque chose?", a: "Oui. Les entreprises dont le personnel est composé d'employés directs retiennent mieux leur personnel et offrent plus d'imputabilité et une qualité plus constante. Les modèles en sous-traitance ont un roulement plus élevé et un service inégal." },
    ],
    metaTitle: "Modèle d'appel d'offres : contrat d'entretien ménager (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour un contrat d'entretien ménager commercial au Canada. Portée quotidienne, hebdomadaire et mensuelle, exigence d'employés directs, prix transparents.",
  },
  "post-damage-restoration": {
    query: "modèle d'appel d'offres pour la restauration après un dégât d'eau ou un incendie",
    pitch: "Restauration après des dommages causés par l'eau, le feu ou la fumée — projet d'intervention d'urgence.",
    whenToUse:
      "Vous avez subi une inondation, un incendie, un épisode de fumée ou un refoulement d'égout et avez besoin d'une entreprise de restauration sur place rapidement. Un assureur est habituellement en cause : assurez-vous que votre fournisseur travaille avec votre assureur et établit ses prix avec Xactimate.",
    titleSample: "Restauration après dommages [d'eau / d'incendie / de fumée] — [nom de l'immeuble]",
    summarySample:
      "Restauration d'urgence de [X] pi² de dommages [d'eau / d'incendie / de fumée] à notre [type d'immeuble]. Numéro de réclamation d'assurance : [s'il y a lieu]. Intervention requise dans les 24 heures pour l'évaluation.",
    timeline: [
      { label: OPEN, detail: "48 heures (délai d'urgence serré)." },
      { label: "Octroi", detail: "Le jour même si possible — pour lancer l'intervention." },
      { label: "Mobilisation", detail: "Dans les 24 heures suivant l'octroi." },
      { label: "Asséchement et atténuation", detail: "Habituellement de 3 à 7 jours." },
      { label: "Reconstruction", detail: "Selon la portée — habituellement de 2 à 8 semaines." },
    ],
    evaluationCriteria: [
      "Délai d'intervention (la mobilisation en 24 heures est une condition essentielle).",
      "Relations de facturation avec les assureurs.",
      "Certifications IICRC.",
      "Références pour des projets semblables.",
      "Rigueur de la documentation.",
    ],
    faqs: [
      { q: "L'assurance couvrira-t-elle la totalité des coûts?", a: "Ça dépend de la police et de la cause du sinistre. Les entreprises de restauration qui facturent directement l'assureur savent comment maximiser la couverture. Documentez tout dès la première minute — des photos avant le début de tout travail." },
      { q: "Qu'est-ce que Xactimate?", a: "Xactimate est le logiciel d'estimation standard utilisé par les experts en sinistres. Les entreprises de restauration qui l'utilisent parlent le même langage que votre assureur — moins de litiges de facturation." },
    ],
    metaTitle: "Modèle d'appel d'offres : restauration après sinistre (Canada)",
    metaDescription:
      "Modèle d'appel d'offres gratuit pour la restauration d'urgence après des dommages d'eau, d'incendie ou de fumée au Canada. Intervention en 24 heures, Xactimate et facturation directe à l'assureur préremplis.",
  },
};

/** "Remplacement de toit plat" -> "remplacement de toit plat"; "CVC..." stays. */
function lowerFirst(s: string): string {
  return /^[A-ZÀ-Ý][a-zà-ÿ]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s;
}

export type LocalizedRfpTemplate = RfpTemplate & {
  /** Name without "RFP Template" / "Modèle d'appel d'offres", for cards and CTAs. */
  shortName: string;
};

/**
 * The template in the page language. English returns the English data
 * untouched; Spanish comes from rfp-templates.es.ts. French merges the RFP Writer's French text (scope, requirements,
 * site access, questions) with the page-only French text above; slugs, trade
 * slug and cost-guide link stay the same.
 */
export function localizeRfpTemplate(t: RfpTemplate, lang: Locale): LocalizedRfpTemplate {
  if (lang === "es") return localizeRfpTemplateEs(t);
  const shortName = t.name.replace(/ RFP Template$/, "");
  if (lang !== "fr") return { ...t, shortName };
  const w = RFP_TEMPLATES_FR[t.slug];
  const p = PAGES_FR[t.slug];
  if (!w || !p) return { ...t, shortName };
  return {
    ...t,
    ...p,
    name: `Modèle d'appel d'offres : ${lowerFirst(w.name)}`,
    shortName: w.name,
    tradeName: tradeName(t.tradeName, "fr"),
    scope: w.scope,
    // {WCB} -> generic CNESST / WSIB wording (no province picked on this page).
    requirements: localizeFr(w.requirements, { province: undefined }),
    siteAccess: w.siteAccess,
    questions: w.questions,
  };
}
