/**
 * Quebec French versions of the expert RFP templates (lib/seo/rfp-templates),
 * keyed by template slug. Only the parts the RFP Writer puts into a generated
 * RFP: name, scope, requirements, site access and bidder questions.
 *
 * Tokens compose-fr.ts fills in:
 * - "{WCB}": workers' compensation wording for the property's province
 *   (CNESST in Quebec, WSIB in Ontario, WCB elsewhere, state law in the U.S.).
 * - "Assurance responsabilité civile générale de 5 M$" / "de 2 M$": set to the
 *   insurance level the property manager picked.
 * - "[X] pi²": replaced with the area when the property manager gave one.
 */
export interface RfpTemplateFr {
  /** Short name without "RFP Template", e.g. "Remplacement de toit plat". */
  name: string;
  scope: string;
  requirements: string;
  siteAccess: string;
  questions: string[];
}

export const RFP_TEMPLATES_FR: Record<string, RfpTemplateFr> = {
  "flat-roof-replacement": {
    name: "Remplacement de toit plat",
    scope: `Portée des travaux :
- Arrachage et élimination du système de couverture existant jusqu'au pontage (environ [X] pi²).
- Inspection du pontage et rapport sur son état; prévoir une allocation pour la réparation du pontage, en poste distinct dans la soumission.
- Installation d'un nouvel isolant à pente intégrée, conforme à la valeur R exigée par le code en vigueur et assurant un drainage positif.
- Installation d'un nouveau système de membrane monocouche (le soumissionnaire précise : TPO, EPDM ou bitume modifié), posé par un installateur certifié par le fabricant.
- Tous les solins, bordures métalliques, drains et pénétrations sont inclus.
- Nettoyage quotidien du chantier; preuves d'élimination des rebuts remises à la fin des travaux.
- Inspection finale par le fabricant et émission de la garantie NDL.

Exclus, sauf si soumis en option à prix séparé :
- Remplacement structural du pontage au-delà de [X] % de la surface totale.
- Modifications aux accès au toit (échelles, trappes).
- Dépose et réinstallation des unités CVC / remplacement des bases (curbs).`,
    requirements: `- Assurance responsabilité civile générale de 5 M$ avec le propriétaire de l'immeuble / le syndicat de copropriété désigné comme assuré additionnel (certificat exigé avant la mobilisation).
- {WCB}.
- Installateur certifié par le fabricant du système de membrane proposé.
- Trois références pour des projets semblables (superficie et type de membrane) réalisés au cours des 24 derniers mois.
- Le couvreur doit détenir une certification valide auprès du fabricant de la membrane proposée.
- Chargé de projet attitré au chantier, avec ses coordonnées.`,
    siteAccess: `Accès au toit par la cage d'escalier intérieure et la trappe de toit. Aire de mise en place de la grue disponible dans le stationnement nord (espace limité, à coordonner). Heures de travail : de 7 h à 18 h en semaine; tout travail la fin de semaine doit être approuvé à l'avance.`,
    questions: [
      "Quel système de membrane proposez-vous et pourquoi (par rapport aux autres options)?",
      "Quelle durée et quelle couverture offrez-vous pour la garantie NDL du fabricant?",
      "Comment protégerez-vous l'intérieur de l'immeuble contre les infiltrations d'eau pendant l'arrachage?",
      "Quelle est votre marche à suivre si vous découvrez de l'isolant mouillé ou un pontage pourri en cours de travaux?",
      "Quel est votre taux au pi² pour les réparations additionnelles du pontage, en régie (temps et matériel)?",
      "Quel est l'échéancier prévu, de la mobilisation jusqu'à l'inspection finale?",
    ],
  },
  "emergency-roof-repair": {
    name: "Réparation d'urgence de toiture",
    scope: `Intervention immédiate (dans les 48 heures) :
- Évaluation sur place de la source de l'infiltration et de l'étendue des dommages.
- Réparation temporaire / bâche pour arrêter l'infiltration d'eau d'ici la réparation permanente.
- Rapport écrit avec photos et portée recommandée pour la réparation permanente.

Portée de la réparation permanente (prix à soumettre dans les 5 jours ouvrables suivant l'évaluation) :
- Détail des éléments à réparer : membrane / solin / drain / pénétration.
- Matériaux et méthode (doivent respecter, dans la mesure du possible, les conditions de garantie du système de couverture existant).
- Garantie sur la réparation (minimum 2 ans).

Exclus : le remplacement complet de la toiture (appel d'offres distinct), sauf si l'évaluation démontre que la réparation n'est pas viable; dans ce cas, recommander un autre entrepreneur ou fournir une soumission distincte.`,
    requirements: `- Assurance responsabilité civile générale de 5 M$ avec le propriétaire de l'immeuble / le syndicat de copropriété désigné comme assuré additionnel.
- {WCB}.
- Capacité d'intervention d'urgence (sur place dans les 48 heures suivant l'octroi du contrat).
- Bonne connaissance du type de membrane existant, afin de ne pas annuler une garantie en vigueur.
- Disponibilité pour effectuer les travaux pendant les heures normales; tarif hors heures indiqué d'avance.`,
    siteAccess: `Accès au toit par [cage d'escalier / trappe / échelle]. La personne-ressource de l'immeuble vous accueillera sur place. Accès hors heures possible sur préavis.`,
    questions: [
      "Pouvez-vous être sur place dans les 48 heures suivant l'octroi du contrat?",
      "Quel est votre tarif de déplacement d'urgence (y compris hors heures)?",
      "Connaissez-vous [notre type de membrane] et pouvez-vous la réparer sans annuler notre garantie?",
      "Que contient votre rapport d'évaluation écrit?",
      "Quelle garantie offrez-vous sur la réparation permanente?",
    ],
  },
  "annual-roof-inspection-contract": {
    name: "Contrat annuel d'inspection et d'entretien de toiture",
    scope: `Portée des inspections :
- Deux inspections planifiées par année (printemps et automne) pour chaque immeuble.
- Inspection visuelle de la membrane, des solins, des drains, des pénétrations et des parapets.
- Rapport écrit après chaque inspection, avec photos et constats classés par priorité (immédiat / 12 mois / 24 mois).

Portée de l'entretien (inclus jusqu'à concurrence de l'allocation) :
- Dégagement des drains, rescellement mineur des solins, enlèvement des débris, rapiéçage mineur de la membrane.
- Allocation d'entretien de [X] $ par année par immeuble; les travaux qui dépassent l'allocation sont soumis séparément pour approbation par le propriétaire.

Documentation :
- Rapport sommaire annuel pour l'ensemble du portefeuille (tous les immeubles regroupés).
- Registre d'entretien tenu à jour pour chaque immeuble.
- Maintien des garanties : tout l'entretien est documenté de façon à respecter les conditions de garantie du fabricant.`,
    requirements: `- Assurance responsabilité civile générale de 5 M$ avec le propriétaire de l'immeuble / le syndicat de copropriété désigné comme assuré additionnel (pour tous les immeubles).
- {WCB}.
- Installateur certifié pour les systèmes de membrane de notre portefeuille (liste fournie sur manifestation d'intérêt).
- Souplesse dans l'horaire : disposé à planifier les inspections en fonction des activités des locataires.
- Rapports accessibles en ligne (portail) ou en format PDF, de préférence.`,
    siteAccess: `Les gestionnaires immobiliers fourniront les clés / puces d'accès au toit ainsi qu'une personne-ressource principale pour chaque immeuble. Les inspections doivent être planifiées au moins 7 jours à l'avance.`,
    questions: [
      "Quel est votre tarif par inspection, par immeuble (et au pi² si le prix est établi pour l'ensemble du portefeuille)?",
      "Comment structurez-vous l'allocation d'entretien : forfait ou en régie (temps et matériel) jusqu'à concurrence d'un plafond?",
      "Avez-vous un outil de rapports en ligne auquel vos clients peuvent se connecter?",
      "Comment gérez-vous la documentation exigée pour les garanties des toitures certifiées par le fabricant?",
      "Quel est votre délai d'intervention habituel pour les problèmes relevés lors d'une inspection?",
    ],
  },
  "rooftop-unit-replacement": {
    name: "Remplacement d'unités de toit (RTU)",
    scope: `Portée des travaux :
- Débranchement, mise hors service et élimination de [#] unités de toit existantes ([tonnage] tonnes chacune).
- Fourniture et installation de nouvelles unités de toit de capacité et d'efficacité équivalentes ou supérieures (selon la recommandation du soumissionnaire).
- Adaptateurs de base (curb) au besoin pour raccorder les nouvelles unités aux bases existantes.
- Levage par grue et gréage.
- Rebranchement électrique, rebranchement au gaz (s'il y a lieu), gestion des condensats.
- Intégration des contrôles aux thermostats existants ou au système de gestion du bâtiment (SGB), selon notre installation actuelle (à préciser).
- Mise en service, démarrage et garantie de 1 an sur la main-d'œuvre.
- Tous les permis et inspections.

Options à prix séparé :
- Unités à haute efficacité (préciser les cibles SEER/IEER).
- Intégration au SGB si les unités n'y sont pas raccordées actuellement.
- Ajout d'un économiseur / de sondes de CO2.`,
    requirements: `- Assurance responsabilité civile générale de 5 M$ avec le propriétaire de l'immeuble / le syndicat de copropriété désigné comme assuré additionnel.
- {WCB}.
- Certification pour les appareils au gaz : RBQ/CCQ au Québec, TSSA en Ontario ou l'équivalent provincial.
- Grutier certifié et assuré.
- Certification pour la manipulation des frigorigènes (attestation halocarbures au Québec, carte ODP en Ontario).
- Installateur autorisé par le fabricant (préciser les marques que vous distribuez).
- Trois références pour des projets de remplacement d'unités de toit réalisés au cours des 18 derniers mois.`,
    siteAccess: `Accès au toit par la cage d'escalier et la trappe. La mise en place de la grue doit être coordonnée avec le stationnement (un permis d'occupation du domaine public de la Ville pourrait être requis). Heures de travail : de 7 h à 18 h en semaine.`,
    questions: [
      "Quel(s) fabricant(s) proposez-vous et pourquoi?",
      "Remplacement équivalent ou unités à haute efficacité : quel est l'écart de coût et le retour sur investissement estimé?",
      "Quel est le délai de livraison de l'équipement une fois le contrat octroyé?",
      "La base existante est-elle compatible ou faut-il des adaptateurs?",
      "Qu'est-ce qui est inclus dans la mise en service et le démarrage?",
      "Quelles sont les conditions de garantie sur la main-d'œuvre et les pièces?",
    ],
  },
  "annual-hvac-maintenance-contract": {
    name: "Contrat annuel d'entretien CVC",
    scope: `Entretien planifié (4 fois par année par unité, sauf indication contraire) :
- Nettoyage des serpentins (condenseur et évaporateur).
- Remplacement des filtres (filtres MERV [#] standard inclus; filtres à cote MERV supérieure en option à prix séparé).
- Inspection / remplacement des courroies et des roulements.
- Vérification de la pression du frigorigène et appoint (compatible R-410A / R-454B).
- Inspection et resserrage des connexions électriques.
- Nettoyage du bac de récupération et de la conduite de condensat.
- Étalonnage des thermostats et des contrôles.
- Rapport écrit après chaque visite, avec constats et recommandations.

Annuel :
- Analyse de combustion (appareils au gaz).
- Rapport complet sur l'efficacité énergétique.
- Données pour l'étude du fonds de prévoyance : âge de l'équipement et durée de vie utile restante de chaque unité.

Allocation pour réparations :
- Une allocation de [X] $ par année couvre les réparations mineures et les pièces de moins de [Y] $ par intervention.
- Les réparations plus importantes sont soumises séparément pour approbation avant le début des travaux.

Intervention d'urgence :
- Tarif de déplacement d'urgence hors heures indiqué d'avance.
- Délai d'intervention visé : [X] heures.`,
    requirements: `- Assurance responsabilité civile générale de 5 M$.
- {WCB}.
- Certification pour les appareils au gaz : RBQ/CCQ au Québec, TSSA en Ontario ou l'équivalent provincial.
- Certification pour la manipulation des frigorigènes.
- Certifications des techniciens (frigoriste CCQ au Québec, Sceau rouge en réfrigération et climatisation ailleurs).
- Rapports en ligne / portail client, de préférence.`,
    siteAccess: `Le gestionnaire immobilier donne accès au toit et à la salle mécanique. Les visites doivent être planifiées au moins 5 jours ouvrables à l'avance. Les travaux hors heures sont coordonnés au besoin.`,
    questions: [
      "Quel est votre tarif annuel par unité (et offrez-vous un rabais pour l'ensemble du portefeuille)?",
      "Qu'est-ce qui est inclus dans l'allocation pour réparations? Quel est le plafond par visite et par année?",
      "Quels sont votre délai d'intervention d'urgence et votre tarif hors heures?",
      "Avez-vous un portail client pour consulter l'historique des interventions?",
      "Comment documentez-vous les travaux afin de préserver les garanties du fabricant?",
    ],
  },
  "boiler-replacement": {
    name: "Remplacement de chaudière",
    scope: `Portée des travaux :
- Mise hors service, vidange et enlèvement de la chaudière existante ([modèle / âge]).
- Fourniture et installation d'une nouvelle chaudière de capacité équivalente ou supérieure ([puissance en BTU]).
- Nouvelle évacuation / nouveau chemisage de cheminée, au besoin, pour une chaudière à condensation à haute efficacité.
- Modifications à la conduite de gaz, au besoin.
- Intégration des contrôles (contrôles modulants, compensation selon la température extérieure, intégration au système de gestion du bâtiment s'il y a lieu).
- Nouvelles pompes de circulation et vannes de zone si les équipements existants sont en fin de vie (prix séparé).
- Mise en service, démarrage et rétablissement du chauffage des locataires dans un délai de [X] jours.
- Inspection et certificat (RBQ au Québec, TSSA en Ontario).
- Tous les permis.

Options à prix séparé :
- Remplacement du réservoir d'eau chaude domestique (s'il est raccordé au système de chaudière).
- Amélioration de l'isolation de la tuyauterie.
- Mise à niveau de l'échangeur de chaleur.`,
    requirements: `- Assurance responsabilité civile générale de 5 M$.
- Certificat de compétence en gaz approprié (CCQ au Québec; TSSA Gas Technician 2 minimum en Ontario, Gas Technician 1 pour les plus gros appareils).
- {WCB}.
- Installateur autorisé par le fabricant.
- Trois références pour des remplacements de chaudière semblables réalisés au cours des 24 derniers mois.
- Plan pour maintenir le chauffage pendant le remplacement (essentiel en hiver — chaudière temporaire au besoin).`,
    siteAccess: `Accès à la salle mécanique par [emplacement]. Le remplacement de la chaudière exige habituellement un arrêt partiel du chauffage — à coordonner avec les locataires au moins 2 semaines à l'avance.`,
    questions: [
      "Chaudière à condensation à haute efficacité ou à efficacité moyenne : quel est l'écart de coût et quelles économies d'énergie prévoyez-vous?",
      "Quel est le délai de livraison de l'équipement?",
      "Faut-il une chaudière temporaire pendant le remplacement (et à quel coût)?",
      "Pendant combien de temps les locataires seront-ils privés de chauffage, selon vos prévisions?",
      "Quelle garantie du fabricant s'applique?",
    ],
  },
  "parking-lot-resurfacing": {
    name: "Resurfaçage de stationnement",
    scope: `Portée des travaux :
- Relevé de l'état des lieux avant les travaux, avec recommandation : planage et resurfaçage ou reconstruction complète.
- Planage de l'enrobé existant sur [profondeur] (ou enlèvement complet en cas de reconstruction).
- Réparation ou remplacement de la fondation granulaire défaillante, au besoin.
- Nouvel enrobé bitumineux de surface (EB-10S au Québec, HL3 en Ontario, ou l'équivalent) sur [profondeur], posé sur une fondation compactée.
- Rétablissement du drainage positif vers les puisards existants; ajustement des cadres de puisards au besoin.
- Nouveau marquage des lignes selon l'aménagement existant (ou selon le nouvel aménagement du plan ci-joint).
- Marquage et signalisation des cases de stationnement accessibles (sans obstacles), selon les normes d'accessibilité provinciales (AODA en Ontario).
- Dos d'âne, lignes d'arrêt et flèches directionnelles, comme l'existant.

Options à prix séparé :
- Remplacement de puisard (prix unitaire).
- Réparation ou remplacement de bordures (prix au pi linéaire).
- Réparation de trottoir en béton (prix au pi²).
- Scellement des fissures dans les zones adjacentes en bon état.`,
    requirements: `- Assurance responsabilité civile générale de 5 M$.
- {WCB}.
- Trois références pour des stationnements commerciaux de taille semblable réalisés au cours des 24 derniers mois.
- Respect des normes provinciales de sécurité applicables aux chantiers routiers.
- Plan de travaux par phases permettant de maintenir un accès partiel au site pour les locataires pendant toute la durée du projet.`,
    siteAccess: `L'immeuble demeure occupé pendant les travaux. Le soumissionnaire doit proposer un échéancier par phases qui laisse au moins [X] % des cases disponibles en tout temps. Pose d'enrobé de nuit ou la fin de semaine possible — indiquer le supplément.`,
    questions: [
      "Planage et resurfaçage ou reconstruction complète : que recommandez-vous et pourquoi?",
      "Quel type d'enrobé proposez-vous et quelle est la garantie?",
      "Comment planifierez-vous les phases des travaux pour que le stationnement reste utilisable?",
      "Qui est votre sous-traitant pour le marquage et comment assurerez-vous la conformité aux normes d'accessibilité provinciales (AODA en Ontario)?",
      "Quel est votre prix unitaire pour l'ajustement / le remplacement d'un puisard?",
    ],
  },
  "snow-removal-seasonal-contract": {
    name: "Contrat saisonnier de déneigement",
    scope: `Portée des travaux :
- Déblaiement de tous les stationnements, allées et quais de chargement dès une accumulation de [X] cm.
- Déneigement et déglaçage des trottoirs jusqu'aux entrées de l'immeuble dans les [X] heures suivant la fin des précipitations.
- Épandage de sel / d'abrasifs sur toutes les surfaces piétonnières et les zones de circulation véhiculaire à risque élevé.
- Surveillance 24 h sur 24, 7 jours sur 7, pendant les chutes de neige.
- Épandages de sel supplémentaires en cours de saison, au besoin.
- Nettoyage de fin de saison (balayage du sable et des abrasifs en bordure des pelouses).

Modes de tarification (le soumissionnaire doit soumettre les deux) :
1. Forfait saisonnier : couvre un nombre illimité d'interventions selon la portée prévue au contrat.
2. À l'intervention : tarif par déblaiement + tarif par épandage.

Normes de service :
- Toutes les aires de circulation véhiculaire dégagées dans les [X] heures suivant la fin des précipitations.
- Trottoirs dégagés dans les [X] heures.
- Épandage à chaque intervention et chaque fois que la température crée un risque de regel.
- Registre de service remis pour chaque intervention (heure de début, heure de fin, matériaux utilisés).`,
    requirements: `- Assurance responsabilité civile générale de 5 M$ couvrant les chutes et glissades.
- {WCB}.
- Registre de service documenté pour chaque intervention (date, heure, travaux effectués, matériaux).
- Suivi GPS de l'équipement (souhaité).
- Équipement et équipe de relève documentés (l'excuse « nos camions sont brisés » ne sera pas acceptée).
- Carte du territoire desservi.
- Trois références pour des immeubles commerciaux de taille semblable au cours des 2 dernières saisons.`,
    siteAccess: `Accès complet à la propriété requis. L'immeuble compte [X] cases de stationnement, [X] pi linéaires de trottoir et [X] entrées. Plan du site fourni sur manifestation d'intérêt.`,
    questions: [
      "Forfait saisonnier ou tarif à l'intervention : que recommandez-vous et pourquoi?",
      "À partir de quelle accumulation intervenez-vous et quel délai d'intervention garantissez-vous?",
      "Votre équipement est-il muni d'un suivi GPS?",
      "Quel est votre plan de relève si un camion principal tombe en panne en pleine tempête?",
      "Quelle est votre couverture d'assurance responsabilité pour les chutes et glissades?",
      "Qu'est-ce qui est inclus et qu'est-ce qui est en supplément (p. ex. nettoyage de fin de saison, épandages de sel en cours de saison)?",
    ],
  },
  "landscaping-annual-contract": {
    name: "Contrat annuel d'entretien paysager",
    scope: `Hebdomadaire / aux deux semaines (de mai à octobre) :
- Tonte du gazon, dressage des bordures et finition au coupe-bordure.
- Désherbage et entretien des plates-bandes.
- Nettoyage des résidus de tonte sur les allées piétonnes et en bordure du stationnement.
- Inspection visuelle des arbres et des arbustes; signalement des problèmes.

Saisonnier :
- Nettoyage printanier (début mai) : enlèvement des débris, préparation des plates-bandes, rafraîchissement du paillis, taille.
- Nettoyage automnal (octobre) : ramassage des feuilles, préparation des plates-bandes pour l'hiver, rabattage des vivaces.
- Mise en service du système d'irrigation (mai), puis fermeture et purge à l'air (octobre).

Annuel :
- Fertilisation (une ou deux applications — selon la recommandation du soumissionnaire).
- Contrôle des mauvaises herbes, conformément à la réglementation provinciale sur les pesticides (Code de gestion des pesticides au Québec).
- Aération et sursemis (automne).

Options à prix séparé :
- Élagage des arbres (au-delà de la simple inspection visuelle).
- Enlèvement ou remplacement d'arbres / d'arbustes.
- Conception et réalisation de nouvelles plantations.
- Ajout de paillis (applications supplémentaires).`,
    requirements: `- Assurance responsabilité civile générale de 2 M$.
- {WCB}.
- Permis ou certificat provincial d'applicateur de pesticides pour toute application de produits chimiques.
- Trois références pour des immeubles de taille semblable au cours des 2 dernières saisons.
- Horaire : visites le ou les mêmes jours de la semaine.`,
    siteAccess: `La propriété compte [X] pi² de pelouse, [X] pi linéaires de plates-bandes et [X] arbres matures. Plan du site fourni sur manifestation d'intérêt.`,
    questions: [
      "Visites hebdomadaires ou aux deux semaines : que recommandez-vous pour notre type d'immeuble?",
      "Qu'est-ce qui est inclus dans le nettoyage printanier et dans le nettoyage automnal?",
      "Pouvez-vous offrir un entretien biologique / sans pesticides si nous le demandons, et comment?",
      "Quel équipement utilisez-vous (tondeuses, souffleurs à feuilles — à essence ou électriques)?",
      "Quel est votre prix par visite et votre prix forfaitaire pour la saison?",
    ],
  },
  "exterior-painting": {
    name: "Peinture extérieure",
    scope: `Portée des travaux :
- Lavage à pression de toutes les surfaces extérieures à peindre.
- Grattage, ponçage et préparation des zones où la peinture est défaillante.
- Calfeutrage mineur et réparation de fissures (allocation — les réparations majeures sont soumises séparément).
- Apprêt là où le support est à nu ou lorsque le type de surface change.
- 2 couches de latex / acrylique extérieur haut de gamme (le soumissionnaire recommande le produit).
- Moulures, portes, soffites et fascias selon le tableau des couleurs ci-joint.
- Nettoyage quotidien du chantier; inspection finale conjointe et retouches.
- Garantie du fabricant et de l'applicateur.

Exclus, sauf si soumis en option à prix séparé :
- Réparation de stuc / réfection complète du stuc.
- Remplacement de bois.
- Remasticage des fenêtres.`,
    requirements: `- Assurance responsabilité civile générale de 2 M$.
- {WCB}.
- Attestation de formation sur le travail en hauteur pour tous les membres de l'équipe.
- Trois références pour des projets semblables de peinture extérieure commerciale réalisés au cours des 24 derniers mois.
- Coût de la nacelle / de l'échafaudage inclus dans la soumission.
- Respect de la réglementation sur les COV (produits à faible teneur en COV de préférence).`,
    siteAccess: `L'immeuble demeure occupé. Coordonner l'emplacement de la nacelle avec le stationnement. Heures de travail : de 7 h à 18 h en semaine. Aviser les locataires 48 heures avant de peindre leur façade.`,
    questions: [
      "Quelle gamme de peinture proposez-vous et quelle est la garantie du fabricant?",
      "Quelle allocation prévoyez-vous pour la préparation et la réparation des surfaces défaillantes, et à partir de quand des frais supplémentaires s'appliquent-ils?",
      "Nacelle ou échafaudage : qu'est-ce qui est inclus dans votre soumission?",
      "Quelle sera la taille de l'équipe et quel est l'échéancier prévu?",
      "Comment protégerez-vous l'aménagement paysager, les fenêtres et les véhicules stationnés?",
    ],
  },
  "common-area-painting": {
    name: "Peinture des aires communes",
    scope: `Portée des travaux :
- Préparation légère : rebouchage des trous de clous, petites réparations de gypse, calfeutrage.
- Apprêt sur les zones réparées et sur les cadres de porte lorsque la couleur change.
- 2 couches de latex d'intérieur de qualité supérieure sur tous les murs.
- Portes, cadres, plinthes, plafonds (préciser lesquels — habituellement les murs et les cadres de porte seulement).
- Protection quotidienne des planchers et du mobilier.
- Nettoyage quotidien du chantier; aucun accès des locataires ne doit rester bloqué la nuit.

Phasage des travaux :
- Un étage à la fois, en semaine seulement.
- Aviser les résidents 48 heures avant les travaux à chaque étage.
- Peinture des cages d'escalier en dehors des heures normales (soirs / fins de semaine) si les exigences de sécurité incendie le permettent.

Options à prix séparé :
- Réparations de gypse au-delà de l'allocation ([X] pi²).
- Peinture des plafonds.
- Peinture complète des portes et des cadres de porte.`,
    requirements: `- Assurance responsabilité civile générale de 2 M$.
- {WCB}.
- Peinture à faible teneur en COV (sans COV de préférence — immeuble habité).
- Personnel qualifié et encadré pour le travail en immeuble occupé (interdiction de fumer, tenue professionnelle, permis de travail au besoin).
- Trois références pour des projets résidentiels multilogements ou commerciaux réalisés en immeuble occupé.`,
    siteAccess: `Immeuble occupé. Travaux en semaine de 8 h à 17 h dans les corridors et de 8 h à 20 h dans les cages d'escalier (sous réserve des plaintes des locataires). Stationnement : [zone désignée]. Utiliser l'ascenseur de service pour le matériel.`,
    questions: [
      "Utilisez-vous une peinture sans COV? Quel produit?",
      "Comment prévoyez-vous échelonner les travaux pour limiter les inconvénients pour les locataires?",
      "Taille de l'équipe et échéancier prévu?",
      "Comment gérez-vous les plaintes des locataires pendant les travaux en immeuble occupé?",
      "Qu'est-ce qui est inclus et qu'est-ce qui est en option à prix séparé? Veuillez préciser pour les portes, les cadres et les plafonds.",
    ],
  },
  "corridor-flooring-replacement": {
    name: "Remplacement du revêtement de sol des corridors",
    scope: `Portée des travaux :
- Enlèvement et élimination du revêtement de sol existant (tapis et sous-tapis, vinyle, etc.) sur [X] étages.
- Inspection de l'état du sous-plancher; rapport sur toute réparation requise (allocation en régie — temps et matériel).
- Préparation du plancher : composé de nivellement au besoin, passage de l'aspirateur, apprêt selon les spécifications du fabricant.
- Fourniture et installation du nouveau revêtement de sol selon l'option retenue :
  - OPTION A : tuiles de tapis de qualité commerciale (préciser la classe du produit).
  - OPTION B : planches de vinyle de luxe (LVT, couche d'usure de 5 mm et plus).
- Nouvelles moulures de transition, plinthes de vinyle.
- Protection quotidienne des portes des logements et des finis adjacents.
- Nettoyage final et visite d'inspection finale.

Phasage des travaux :
- Un étage à la fois, pendant les heures normales de travail en semaine.
- Aviser les résidents 7 jours avant les travaux à leur étage.
- Coordination requise pour l'utilisation de l'ascenseur de service.

Options à prix séparé :
- Réparation du sous-plancher au-delà de l'allocation.
- Coupe du bas des portes pour assurer le dégagement nécessaire.
- Revêtement de sol du hall d'entrée et des salles communes.`,
    requirements: `- Assurance responsabilité civile générale de 2 M$.
- {WCB}.
- Installateur formé par le fabricant du produit retenu.
- Trois références pour des travaux de revêtement de sol dans des corridors d'immeubles multilogements occupés au cours des 24 derniers mois.
- Plan de protection des cadres de porte des logements et du mobilier des locataires dans les corridors.`,
    siteAccess: `Immeuble occupé. Travaux en semaine de 8 h à 17 h. Ascenseur de service disponible pour le matériel. Chaque étage sera partiellement inaccessible pendant 1 jour durant l'installation; prévoir les communications aux locataires en conséquence.`,
    questions: [
      "Coût installé au pi² pour chaque option (tuiles de tapis et LVT)?",
      "Quelle est votre garantie sur la couche d'usure?",
      "Comment gérez-vous les défaillances du sous-plancher découvertes en cours de projet?",
      "Taille de l'équipe et échéancier prévu par étage?",
      "Pouvez-vous fournir des échantillons physiques des produits recommandés?",
    ],
  },
  "elevator-service-contract": {
    name: "Contrat d'entretien d'ascenseurs",
    scope: `Portée des travaux :
- Entretien préventif mensuel selon ASME A17.1 / CSA B44.
- Remplacement de toutes les pièces d'usure (câbles, garnitures de frein, galets, contrôleurs selon le calendrier du fabricant).
- Service d'urgence 24 h/24, 7 j/7, avec délai d'intervention garanti de [X] heures.
- Coordination de l'inspection annuelle (RBQ au Québec, TSSA en Ontario) et certificat.
- Recommandations de modernisation et données pour l'étude du fonds de prévoyance.
- Portail client en ligne avec registre d'entretien et historique des appels de service.

Inclusions (contrat d'entretien complet) :
- Toutes les pièces et la main-d'œuvre incluses (par opposition aux contrats « huile et graisse » sans pièces).
- Remplacement de composants majeurs jusqu'à [X] $ par ascenseur par année.
- Modernisation majeure faisant l'objet d'une soumission distincte.

Exclusions :
- Modernisation / mises à niveau.
- Finis intérieurs de la cabine.
- Réparations liées au vandalisme.

Normes de service :
- Délai d'intervention : [X] heures hors urgence / [X] minutes en urgence (personne coincée).
- Taux de disponibilité visé : [X] % par ascenseur par mois.
- Clause de pénalité ou de crédit si le taux de disponibilité visé n'est pas atteint.`,
    requirements: `- Mécanicien d'ascenseur qualifié (certificat de compétence CCQ au Québec, licence TSSA en Ontario).
- Assurance responsabilité civile générale de 5 M$.
- {WCB}.
- Répartition 24 h/24, 7 j/7 avec des mécaniciens locaux (pas seulement un centre d'appels).
- Portail client en ligne.
- Trois références pour des immeubles de type semblable au cours des 2 dernières années.
- Processus d'escalade clair si nos préoccupations ne sont pas réglées.`,
    siteAccess: `Accès à la salle des machines par [emplacement]. Accès à la fosse par le rez-de-chaussée. Planifier l'entretien en dehors des heures de pointe dans la mesure du possible.`,
    questions: [
      "Contrat d'entretien complet ou contrat « huile et graisse » : que recommandez-vous et pourquoi?",
      "Tarif mensuel par ascenseur?",
      "Quel délai d'intervention garantissez-vous en cas d'urgence, et qu'arrive-t-il si vous ne le respectez pas?",
      "Combien d'ascenseurs chacun de vos mécaniciens locaux a-t-il à sa charge?",
      "Pour le remplacement de composants majeurs, qu'est-ce qui est inclus et qu'est-ce qui est facturé en supplément?",
      "Offrez-vous un portail client en ligne? Pouvons-nous en voir une démonstration?",
      "Quelle est la clause de résiliation du contrat?",
    ],
  },
  "electrical-panel-upgrade": {
    name: "Mise à niveau du panneau électrique",
    scope: `Portée des travaux :
- Ingénierie / conception (ou coordination avec notre ingénieur-conseil).
- Coordination avec le distributeur d'électricité (Hydro-Québec ou distributeur local) pour l'augmentation de l'entrée électrique (raccordement / mesurage).
- Mise hors service du panneau principal existant.
- Fourniture et installation d'un nouveau panneau principal de [X] A avec la configuration de disjoncteurs appropriée.
- Fourniture et installation de [#] nouveaux panneaux secondaires (au besoin).
- Nouveaux conducteurs d'entrée, du point de raccordement du distributeur jusqu'au panneau.
- Mise à la terre et liaison équipotentielle complètes selon le Code canadien de l'électricité.
- Coordination de l'inspection électrique (ESA en Ontario ou autorité provinciale) et certificat.
- Permis.
- Interruption de courant pour les locataires : limitée à moins de [X] heures; travaux en dehors des heures normales au besoin (indiquer le supplément).

Options à prix séparé :
- Nouveaux panneaux secondaires par étage / par secteur.
- Panneau pour la recharge de véhicules électriques et allocation pour circuits.
- Commutateur de transfert pour génératrice.
- Protection contre les surtensions.`,
    requirements: `- Maître électricien à l'emploi de l'entreprise.
- Maître électricien membre de la CMEQ au Québec, entrepreneur autorisé ESA en Ontario ou l'équivalent provincial.
- Assurance responsabilité civile générale de 5 M$.
- {WCB}.
- Trois références pour des augmentations d'entrée électrique semblables au cours des 24 derniers mois.
- Plan de gestion de la coupure de courant pour les locataires pendant le basculement.
- Coordination avec le distributeur d'électricité local et l'inspecteur municipal.`,
    siteAccess: `Accès à la salle électrique principale par [emplacement]. Le basculement doit être planifié en dehors des heures normales afin de limiter l'impact sur les locataires.`,
    questions: [
      "Quel est le coût de l'ingénierie et des permis, et est-il inclus?",
      "Quel est le délai entre l'octroi du contrat et le basculement par le distributeur d'électricité?",
      "Comment allez-vous gérer la coupure de courant pour les locataires?",
      "Coût unitaire des panneaux secondaires additionnels (options à prix séparé)?",
      "Quels frais d'inspection électrique (ESA en Ontario ou autorité provinciale) sont inclus?",
    ],
  },
  "led-lighting-retrofit": {
    name: "Conversion à l'éclairage DEL",
    scope: `Portée des travaux :
- Audit des luminaires existants et recommandation pour chaque emplacement : remplacement complet du luminaire ou trousse de conversion DEL.
- Fourniture et installation de [nombre de luminaires] luminaires DEL / trousses de conversion (homologués DLC pour l'admissibilité aux subventions du distributeur d'électricité).
- Élimination des luminaires et des lampes existants selon la réglementation provinciale (en particulier les lampes à décharge à haute intensité [DHI] contenant du mercure).
- Nouvelles commandes au besoin : détecteurs de présence, modulation selon la lumière naturelle, gradation.
- Démarches de subvention auprès du distributeur d'électricité (Hydro-Québec, Save on Energy, etc.) — le soumissionnaire coordonne la demande.
- Rapport photométrique confirmant que les niveaux d'éclairement respectent les normes minimales.
- Garantie du fabricant (minimum 5 ans sur les pièces).

Options à prix séparé :
- Commandes en réseau (système de gestion du bâtiment / gestion infonuagique).
- Intégration de batteries de secours pour l'éclairage d'urgence.
- Éclairage extérieur du site (lampadaires du stationnement).`,
    requirements: `- Maître électricien membre de la CMEQ au Québec, entrepreneur autorisé ESA en Ontario ou l'équivalent provincial.
- Assurance responsabilité civile générale de 5 M$.
- {WCB}.
- Bonne connaissance des programmes de subventions des distributeurs d'électricité de notre province.
- Trois références pour des conversions semblables au cours des 18 derniers mois.
- Capacité démontrée à faire approuver les subventions (fournir des données sur le taux d'approbation de vos demandes).`,
    siteAccess: `Stationnement intérieur / aires communes / extérieur — coordonner les travaux avec les activités des locataires. Nacelle élévatrice requise pour les plafonds élevés.`,
    questions: [
      "Coût installé par luminaire (ventilé par type de luminaire)?",
      "Économies d'énergie prévues ($/an) et période de récupération, subvention incluse?",
      "À quelle subvention du distributeur d'électricité sommes-nous admissibles, et vous occupez-vous des démarches?",
      "Conditions de garantie du fabricant et de la main-d'œuvre?",
      "Recommandez-vous le remplacement complet des luminaires ou des trousses de conversion, et pourquoi?",
    ],
  },
  "annual-fire-safety-inspection": {
    name: "Contrat d'inspection annuelle de sécurité incendie",
    scope: `Portée annuelle selon CAN/ULC-S536 et le code de prévention des incendies de la province :
- Panneau d'alarme incendie et tous les dispositifs (détecteurs de chaleur / de fumée, déclencheurs manuels, avertisseurs sonores / visuels).
- Système de gicleurs (sous eau / sous air / à préaction) — inspection annuelle selon NFPA 25.
- Inspection des colonnes montantes et des boyaux d'incendie.
- Extincteurs portatifs (entretien annuel et, lorsque requis, entretien de 6 ans / essai hydrostatique de 12 ans).
- Éclairage d'urgence et enseignes de sortie (vérification visuelle mensuelle, essai annuel de décharge de 90 minutes).
- Systèmes d'extinction pour hottes de cuisine (semestriel, s'il y a lieu).
- Systèmes de contrôle de la fumée / de pressurisation (s'il y a lieu).
- Analyse de la qualité du carburant de la génératrice (s'il y a lieu).
- Certificat d'inspection pour chaque appareil, conservé dans le registre de sécurité incendie.

Rapports :
- Rapport écrit classant toutes les déficiences : non-conformité au code (correction obligatoire), correction recommandée, correction reportée.
- Soumission pour la correction des déficiences (approbation du propriétaire requise avant les travaux).
- Portail en ligne avec historique des inspections et certificats.

Options à prix séparé :
- Essai à plein débit des gicleurs aux 5 ans (lorsque requis).
- Essai des dispositifs magnétiques de retenue de porte.
- Essai annuel de la pompe incendie.
- Allocation pour le remplacement des batteries.`,
    requirements: `- Technicien en alarme incendie certifié ACAI/CFAA (Association canadienne des alarmes incendie).
- Entreprise de gicleurs titulaire de la licence exigée par la province (licence RBQ au Québec).
- Assurance responsabilité civile générale de 5 M$.
- {WCB}.
- Trois références pour des propriétés de type semblable au cours des 12 derniers mois.
- Portail en ligne avec historique des inspections consultable.
- Déclaration claire de tout conflit d'intérêts (certains soumissionnaires offrent l'inspection à bas prix et gonflent ensuite leurs soumissions de réparation — nous comparerons).`,
    siteAccess: `Le responsable de l'immeuble coordonnera l'accès aux salles mécaniques, aux salles des vannes de gicleurs et à tous les étages. Un avis aux locataires est requis pour les essais des détecteurs de fumée dans les logements et locaux.`,
    questions: [
      "Coût annuel par immeuble?",
      "Le coût est-il ventilé (alarme, gicleurs, extincteurs) afin que nous puissions comparer sur une base équivalente?",
      "Comment traitez-vous les soumissions pour la correction des déficiences — êtes-vous indépendant ou incité à vendre des travaux supplémentaires?",
      "Avez-vous un portail client? Pouvons-nous en voir une démonstration?",
      "Quelle est votre politique en matière de conflits d'intérêts?",
    ],
  },
  "mold-remediation": {
    name: "Décontamination fongique",
    scope: `Portée des travaux :
- Évaluation préalable avec notre hygiéniste industriel indépendant — coordination par le soumissionnaire.
- Confinement selon IICRC S520 : enceinte complète avec filtration HEPA sous pression négative.
- ÉPI pour tous les travailleurs selon les normes provinciales.
- Enlèvement et élimination de tous les matériaux poreux touchés (gypse, isolant, tapis, etc.) selon la réglementation provinciale.
- Aspiration HEPA et traitement antimicrobien de toutes les surfaces non poreuses.
- Nettoyage final de la zone de confinement.
- Plan de communication avec les locataires (particulièrement important en résidentiel).

Réparation de la source (portée distincte, mais à coordonner) :
- La fuite ou la source d'humidité doit être réparée avant la fin de la décontamination.
- Si l'étendue de la réparation est inconnue, le soumissionnaire prévoit une allocation.

Après la décontamination :
- Échantillonnage de validation par un hygiéniste industriel indépendant (et non par l'entreprise de décontamination — essentiel pour la crédibilité).
- Attestation de validation.
- Travaux de reconstruction soumis séparément (ou confiés à un autre entrepreneur).`,
    requirements: `- Technicien en décontamination fongique certifié IICRC (ou l'équivalent provincial).
- Assurance responsabilité civile générale de 5 M$ incluant une couverture spécifique aux moisissures.
- {WCB}.
- Respect des lignes directrices de la CNESST (Québec) ou du ministère du Travail provincial sur les travaux en présence de moisissures.
- Trois références pour des projets de taille semblable au cours des 18 derniers mois.
- Volonté de travailler avec un hygiéniste industriel indépendant (condition éliminatoire — l'hygiéniste interne d'une entreprise de décontamination ne sera jamais accepté pour la validation).`,
    siteAccess: `Logement ou zone touchés. Un relogement temporaire des locataires pourrait être nécessaire (à coordonner avec le gestionnaire immobilier). Le confinement bloquera l'accès normal pendant la décontamination.`,
    questions: [
      "Acceptez-vous de travailler avec notre hygiéniste industriel indépendant pour l'évaluation préalable et pour la validation?",
      "Quel est votre protocole de confinement (selon IICRC S520)?",
      "Coût au pi² pour la décontamination? Qu'est-ce qui est soumis séparément (reconstruction, hygiéniste, relogement des locataires)?",
      "Communication avec les locataires : vous en occupez-vous ou est-ce à nous de le faire?",
      "Quel est votre échéancier entre la mobilisation et la validation finale?",
    ],
  },
  "pest-control-contract": {
    name: "Contrat d'extermination",
    scope: `Service planifié (4 fois par année) :
- Inspection intérieure et du périmètre extérieur.
- Inspection des stations à rongeurs et renouvellement des appâts.
- Traitement extérieur des fissures et interstices.
- Inspection des aires communes (hall d'entrée, local à déchets, salles mécaniques).
- Rapport écrit à chaque visite.

Service sur appel (inclus ou au tarif par appel) :
- Problèmes de parasites signalés par les locataires — intervention dans un délai de [X] heures.
- Traitement selon le type de parasite (coquerelles, punaises de lit, fourmis, etc.).
- Visites de suivi au besoin.

Principes de lutte intégrée (IPM) :
- Approche axée d'abord sur l'inspection.
- Exclusion (colmatage des points d'entrée) avant tout traitement chimique.
- Produits ciblés, les moins toxiques possible.
- Usage réduit de pesticides dans les espaces occupés par les locataires.

Options à prix séparé :
- Traitement spécifique contre les punaises de lit (par logement).
- Capture et retrait d'animaux sauvages (ratons laveurs, écureuils, etc.).
- Traitement préventif des aires communes avant / après le départ de locataires.`,
    requirements: `- Permis provincial d'extermination en règle.
- Assurance responsabilité civile générale de 2 M$.
- {WCB}.
- Techniciens formés en lutte intégrée (IPM).
- Respect de la réglementation provinciale sur les pesticides, y compris les restrictions sur l'usage esthétique (Code de gestion des pesticides au Québec).
- Portail client en ligne avec historique des interventions.
- Trois références pour des propriétés de type semblable au cours des 12 derniers mois.`,
    siteAccess: `Aires communes, et accès aux logements sur appel par l'entremise du gestionnaire immobilier. Avis aux locataires requis 24 heures avant toute intervention dans un logement.`,
    questions: [
      "Coût annuel par immeuble? Qu'est-ce qui est inclus et qu'est-ce qui est en supplément (punaises de lit, animaux sauvages)?",
      "Délai d'intervention garanti pour les appels de service?",
      "Quelle est votre approche de lutte intégrée (IPM)? Donnez des exemples précis.",
      "Quels produits utilisez-vous? Sont-ils peu toxiques et sécuritaires pour les locataires?",
      "Avez-vous un portail client? Pouvons-nous en voir une démonstration?",
    ],
  },
  "janitorial-annual-contract": {
    name: "Contrat annuel d'entretien ménager",
    scope: `Tous les jours (ou toutes les nuits) :
- Passage de l'aspirateur sur toutes les surfaces recouvertes de tapis.
- Balayage et lavage des planchers à surface dure.
- Essuyage de toutes les surfaces des aires communes (comptoirs, portes, poignées, interrupteurs).
- Vidange de toutes les poubelles et de tous les bacs de recyclage.
- Nettoyage et réapprovisionnement des salles de toilettes (papier, savon, cuvettes, lavabos, planchers, miroirs).
- Essuyage de l'intérieur des cabines d'ascenseur.
- Nettoyage des vitres du hall et des entrées.

Chaque semaine :
- Détachage ponctuel des tapis.
- Nettoyage en profondeur des salles de toilettes.
- Polissage de l'acier inoxydable.
- Nettoyage minutieux des rainures de seuil des portes d'ascenseur.
- Désinfection des surfaces fréquemment touchées.

Chaque mois :
- Décapage et cirage des planchers durs (ou selon le calendrier établi).
- Extraction localisée des taches sur les tapis.
- Nettoyage des murs et dépoussiérage en hauteur.
- Nettoyage des salles mécaniques.

Chaque trimestre :
- Nettoyage des tapis par extraction à l'eau chaude.
- Lavage des vitres (intérieur).
- Nettoyage en profondeur des salles mécaniques et électriques.

Chaque année :
- Lavage des vitres extérieures (coordonné séparément ou en option à prix séparé).
- Décapage et remise à neuf du fini des planchers durs.

Fournitures :
- Tous les produits consommables (papier, savon, sacs à ordures) inclus au contrat.
- Fournitures de marque en option (préciser si requis).

Communication :
- Registre quotidien dans le local d'entretien.
- Portail en ligne pour les demandes des locataires et le signalement d'incidents.
- Visite mensuelle des lieux avec le gestionnaire immobilier.`,
    requirements: `- Assurance responsabilité civile générale de 5 M$.
- {WCB}.
- Tout le personnel est employé directement par l'entreprise (aucune sous-traitance) et a fait l'objet d'une vérification des antécédents judiciaires.
- Superviseur sur place ou disponible sur appel pour chaque quart de travail.
- Portail en ligne pour le suivi des incidents et les demandes des locataires.
- Trois références pour des propriétés de type semblable au cours des 2 dernières années.
- Respect des normes provinciales d'étiquetage des produits de nettoyage et du SIMDUT.`,
    siteAccess: `Entrée de service et local d'entretien. Heures de travail : habituellement de nuit, de 22 h à 6 h, en commercial; horaire flexible en résidentiel. Ascenseur de service disponible.`,
    questions: [
      "Coût mensuel tout compris au pi²?",
      "Votre personnel est-il employé directement ou en sous-traitance? Faites-vous des vérifications d'antécédents?",
      "Encadrement : y a-t-il un superviseur à chaque quart de travail?",
      "Les produits consommables (papier, savon) sont-ils inclus dans le prix?",
      "Portail en ligne pour les demandes des locataires : pouvons-nous en voir une démonstration?",
      "À quelle fréquence proposez-vous des rencontres de suivi (mensuelles ou autre)?",
    ],
  },
  "post-damage-restoration": {
    name: "Restauration après sinistre",
    scope: `Phase d'urgence (dans les 24 heures) :
- Évaluation sur place avec documentation (photos, relevés d'humidité, inventaire des dommages).
- Extraction de l'eau (s'il y a lieu).
- Confinement et mise en place du séchage (filtration HEPA, ventilateurs de séchage, déshumidificateurs).
- Portée des travaux initiale et estimation des coûts dans Xactimate (norme de l'industrie, reconnue par les assureurs).
- Coordination avec l'expert en sinistre de l'assureur.

Phase de séchage et de nettoyage :
- Suivi quotidien de l'humidité et consignation des relevés.
- Enlèvement des matériaux irrécupérables.
- Traitement antimicrobien.
- Nettoyage de la fumée et de la suie (dommages causés par le feu ou la fumée).
- Nettoyage et entreposage des biens (s'il y a lieu).

Phase de reconstruction :
- Travaux de reconstruction : gypse, isolant, revêtements de sol, peinture, pour remettre les lieux dans leur état d'avant le sinistre.
- Coordination avec les sous-traitants (électricité, plomberie).
- Inspection finale et coordination du retour des locataires.

Documentation tout au long du projet :
- Rapports d'avancement quotidiens avec photos.
- Documentation conforme aux exigences des assureurs (Xactimate, registres des travaux en régie).
- Facturation directe à l'assureur lorsque possible.`,
    requirements: `- Certification IICRC pour les dommages causés par l'eau, le feu et la fumée (selon la portée).
- Estimateurs maîtrisant Xactimate.
- Ententes de facturation directe avec les principaux assureurs canadiens (un atout).
- Assurance responsabilité civile générale de 5 M$ incluant une couverture pollution / environnement.
- {WCB}.
- Service d'urgence 24 h/24, 7 j/7.
- Trois références pour des projets semblables au cours des 12 derniers mois.
- Plan de communication avec les locataires (pour les immeubles occupés).`,
    siteAccess: `Zone touchée et zones adjacentes. Un relogement des locataires pourrait être nécessaire (à coordonner avec le gestionnaire immobilier et l'assureur). Coupures d'électricité et d'eau au besoin.`,
    questions: [
      "Pouvez-vous être sur place dans les 24 heures?",
      "Facturez-vous directement l'assureur?",
      "Maîtrisez-vous Xactimate et êtes-vous certifié IICRC?",
      "Tarif au pi² pour les travaux d'atténuation des dommages? Tarif de reconstruction (ou prix selon la portée)?",
      "Comment documentez-vous les travaux pour les réclamations d'assurance?",
      "Coordination du relogement des locataires : incluse ou en supplément?",
    ],
  },
};
