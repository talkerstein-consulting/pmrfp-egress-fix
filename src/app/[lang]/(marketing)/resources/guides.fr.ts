/**
 * Quebec French versions of the two static guides under /resources. The
 * English text stays in each page.tsx; the pages pick this version on /fr.
 * Links inside the Markdown go through localizePath so they stay in French.
 */
import { localizePath } from "@/i18n/config";

export interface StaticGuide {
  title: string;
  metaDescription: string;
  eyebrow: string;
  lead: string;
  faqs: { q: string; a: string }[];
  article: string;
  cta: { title: string; description: string; primaryLabel: string; secondaryLabel: string };
}

const L = (path: string) => localizePath(path, "fr");

export const QUALITY_RFP_GUIDE_FR: StaticGuide & { steps: string[] } = {
  title: "Comment publier un appel d'offres qui attire de vraies soumissions : 7 étapes",
  metaDescription:
    "Les sept étapes entre « il nous faut un entrepreneur » et un contrat signé — et exactement quoi inscrire dans chaque champ de votre appel d'offres pour que des entrepreneurs canadiens qualifiés soumissionnent, sur une base comparable.",
  eyebrow: "Guide · Gestionnaires immobiliers",
  lead: "Ce qu'il faut faire avant, pendant et après la publication — et quoi écrire dans chaque champ pour que les bons entrepreneurs soumissionnent, et qu'ils chiffrent tous les mêmes travaux.",
  steps: [
    "Définir le besoin et obtenir l'approbation avant de publier",
    "Décider qui doit voir l'appel d'offres",
    "Rédiger la demande, champ par champ",
    "Tenir une période de questions et une visite des lieux équitables",
    "Recevoir les soumissions et vérifier d'abord leur conformité",
    "Évaluer selon des critères fixés d'avance",
    "Octroyer, signer et boucler la boucle",
  ],
  faqs: [
    {
      q: "Combien de temps mon appel d'offres doit-il rester ouvert?",
      a: "Trois semaines pour des travaux d'immobilisation et des contrats de service pluriannuels. Une à deux semaines suffisent pour de petits travaux bien définis. Moins que ça, et vous n'aurez de nouvelles que des entreprises qui se trouvent à être libres — pas des meilleures.",
    },
    {
      q: "Devrais-je afficher mon budget?",
      a: "Si le conseil d'administration a déjà approuvé un montant, afficher une fourchette vous donne habituellement de meilleures soumissions : les entrepreneurs qui ne peuvent pas travailler à ce niveau passent leur tour, et ceux qui soumissionnent conçoivent leur offre en conséquence. Si vous ne savez vraiment pas ce que coûtent les travaux, gardez le budget privé et consultez un guide des coûts pour repérer les écarts à la réception des soumissions.",
    },
    {
      q: "Suis-je obligé de retenir la soumission la plus basse?",
      a: "Non — à moins que vos règlements ou la politique du propriétaire ne l'exigent. Indiquez dans l'appel d'offres comment vous évaluerez les soumissions (prix, expérience, échéancier, couverture de la portée), évaluez-les selon ces critères et rédigez une page expliquant pourquoi vous avez choisi l'adjudicataire. C'est ce qu'un conseil d'administration a besoin de voir.",
    },
    {
      q: "Puis-je rester anonyme pendant que je recueille les manifestations d'intérêt?",
      a: "Oui. Sur PMRFP, vous pouvez garder vos coordonnées cachées jusqu'à ce que vous approuviez l'intérêt d'un entrepreneur, ou faire transiter les manifestations d'intérêt par PMRFP. Les détails de votre immeuble et de votre budget restent à vous jusqu'à ce que vous décidiez d'aller de l'avant.",
    },
  ],
  article: `La plupart des appels d'offres qui ne reçoivent aucune soumission — ou trois soumissions impossibles à comparer — ne portaient pas sur de mauvais projets. C'étaient de mauvaises demandes. La portée disait « réparer le toit au besoin ». La date de clôture était dans quatre jours. Personne n'avait précisé si l'élimination des rebuts était incluse, si une visite des lieux était possible ni comment l'adjudicataire serait choisi.

Les bons entrepreneurs lisent ça et passent à autre chose. Ils ont plus de travail que de temps, et ils soumissionnent sur les demandes qui leur disent exactement ce qu'ils chiffrent.

Voici tout le processus en sept étapes — de « il nous faut un entrepreneur » jusqu'au contrat signé — avec ce qu'il faut inscrire dans chaque champ quand vous publiez sur PMRFP.

## 1. Définir le besoin et obtenir l'approbation avant de publier

La façon la plus rapide de perdre un bon entrepreneur, c'est de lancer un appel d'offres, de recueillir des soumissions, puis de découvrir que le conseil d'administration n'approuvera pas la dépense. Faites d'abord le travail à l'interne.

- **Quel problème réglez-vous?** « Le toit coule à trois endroits après de fortes pluies » est un besoin. « Nouveau toit » est une hypothèse sur la solution. Partez du problème : un bon soumissionnaire pourrait proposer une meilleure solution.
- **Qui approuve l'octroi?** Le conseil d'administration, le propriétaire, le gestionnaire d'actifs ou vous. Connaissez votre seuil de dépenses et sachez si un processus concurrentiel est obligatoire.
- **D'où vient l'argent?** Du fonds de prévoyance, du budget d'exploitation ou d'une réclamation d'assurance. Cela change l'échéancier et la paperasse.
- **Quand les travaux doivent-ils avoir lieu?** Les contrats de déneigement doivent être octroyés avant le début de la saison, le pavage et la peinture extérieure exigent un temps chaud et sec, et les travaux de toiture se font plus facilement avant l'hiver.

Mettez les réponses par écrit dans un paragraphe. Il deviendra le début de votre portée des travaux.

## 2. Décider qui doit voir l'appel d'offres

Vous voulez de trois à cinq soumissions sérieuses. Moins de trois, et il n'y a aucune pression sur les prix. Plus de cinq, et les entrepreneurs cessent de soumissionner sur vos projets, parce que leurs chances ne valent pas le temps d'estimation.

Sur PMRFP, les **catégories**, la **région** et le **type d'immeuble** que vous choisissez déterminent quels entrepreneurs voient votre demande. Soyez précis :

- Choisissez le corps de métier qui fait réellement le travail. Un remplacement de chaudière relève du CVC, pas de l'entreprise générale.
- Choisissez la région où se trouve l'immeuble, pas celle de votre bureau.
- N'ajoutez une deuxième ou une troisième catégorie que si les travaux touchent vraiment plusieurs corps de métier.

Si vous avez déjà un entrepreneur de confiance, invitez-le aussi à soumissionner. L'appel d'offres vous permet de vérifier son prix; il ne remplace pas la relation.

## 3. Rédiger la demande, champ par champ

C'est ici que la qualité se gagne ou se perd. Voici à quoi sert chaque champ.

### Titre de l'appel d'offres

Indiquez les travaux, le type d'immeuble et la ville. Un entrepreneur qui parcourt une liste décide en deux secondes.

> **Faible :** Projet de toiture
>
> **Solide :** Remplacement de toit plat — copropriété de moyenne hauteur de 18 000 pi², Laval

### Court résumé

Deux phrases : ce dont vous avez besoin et le détail qui détermine le prix.

> Arrachage et remplacement d'une toiture multicouche de 20 ans sur un immeuble résidentiel occupé de 9 étages. Les travaux doivent être terminés entre juin et septembre, sans interruption des unités mécaniques sur le toit.

### Portée complète

La portée, c'est le contrat. Chaque lacune devient une hypothèse différente dans chaque soumission — et un avenant plus tard. Couvrez cinq éléments :

1. **L'immeuble.** Type, âge, taille et tout ce qui touche l'accès : logements occupés, utilisation de l'ascenseur, aire d'entreposage, stationnement, accès pour une grue.
2. **Les travaux.** Ce qui est remplacé, réparé ou entretenu, avec les spécifications actuelles quand vous les connaissez (type de système, capacité, superficie, nombre d'unités).
3. **Ce qui est inclus.** Matériaux, élimination des rebuts, permis, inspections, mise en service, garantie.
4. **Ce qui est exclu.** Tout ce qu'un soumissionnaire pourrait raisonnablement croire inclus, mais qui ne l'est pas.
5. **Les options à prix séparé.** Les éléments que vous pourriez vouloir, chiffrés séparément, pour décider après avoir vu les prix.

Laissez la méthode ouverte là où elle vous importe peu. « Le soumissionnaire recommande une membrane TPO, EPDM ou de bitume modifié, en justifiant son choix » vous donne accès à une expertise. Nommer un seul produit vous donne trois fois la même soumission.

Des photos valent mieux qu'un paragraphe. Ajoutez-en quelques-unes de l'équipement, du secteur visé ou des dommages.

### Exigences

Les conditions non négociables. Une soumission qui ne les respecte pas n'est pas évaluée.

- **Assurance.** Responsabilité civile générale — souvent 5 M$ pour des travaux d'immobilisation et 2 M$ pour des contrats de service à moindre risque — avec le propriétaire ou le syndicat de copropriété désigné comme assuré additionnel.
- **Accidents du travail.** Une attestation de conformité de la CNESST au Québec, un certificat de décharge de la WSIB en Ontario, ou la couverture équivalente de la WCB dans les autres provinces.
- **Licences et certifications du corps de métier.** Licence de la RBQ et certificats de compétence de la CCQ au Québec (TSSA pour le gaz et les ascenseurs et ESA pour l'électricité en Ontario), certification du fabricant pour les garanties de toiture.
- **Références.** Trois contrats comparables au cours des deux dernières années, avec des personnes-ressources que vous appellerez vraiment.
- **Un chargé de projet désigné** pour tout ce qui dure plus d'une semaine.

### Budget

Si vous avez un montant approuvé, indiquez une fourchette et envisagez de l'afficher. Les entrepreneurs qui ne peuvent pas travailler à ce niveau passeront leur tour, et ceux qui soumissionneront concevront leur offre en conséquence. Si vous ne savez pas encore ce que coûtent les travaux, gardez le budget privé et consultez d'abord un [guide des coûts](${L("/cost-guides")}) pour repérer une soumission trop belle pour être vraie.

### Date de clôture

Trois semaines pour des travaux d'immobilisation et des contrats pluriannuels; une à deux semaines pour de petits travaux bien définis. Avec quatre jours, vous obtenez l'entreprise qui est libre, pas la meilleure.

### Instructions de dépôt

Dites aux soumissionnaires exactement quoi envoyer et comment vous déciderez. C'est le champ que la plupart des gestionnaires immobiliers laissent vide, et c'est celui qui rend les soumissions comparables.

> Soumettez un prix forfaitaire pour la portée de base, avec chaque option à prix séparé. Joignez votre certificat d'assurance, votre attestation de la CNESST, l'échéancier proposé et trois références. Visite des lieux facultative le 12 mai à 10 h — confirmez votre présence par courriel. Questions par écrit au plus tard le 15 mai; les réponses seront transmises à tous les soumissionnaires. Évaluation : prix 40 %, expérience pertinente et références 30 %, couverture de la portée 20 %, échéancier 10 %.

Ces pondérations sont un exemple — fixez les vôtres. Ce qui compte, c'est que les soumissionnaires les connaissent avant de soumissionner.

### Visibilité des coordonnées

Choisissez comment les entrepreneurs vous joignent. Vous pouvez afficher vos coordonnées aux membres payants, faire transiter les manifestations d'intérêt par PMRFP ou rester anonyme jusqu'à ce que vous approuviez l'intérêt d'un entrepreneur.

## 4. Tenir une période de questions et une visite des lieux équitables

Chaque soumissionnaire devrait chiffrer les mêmes travaux. Donc :

- **Répondez aux questions par écrit, et envoyez chaque réponse à tous les soumissionnaires intéressés** — pas seulement à celui qui a posé la question.
- **Organisez une visite des lieux** pour tout ce qui ne peut pas être chiffré à partir de photos : toits, stationnements, salles mécaniques. C'est là que les entrepreneurs découvrent ce qui deviendrait autrement des avenants.
- **Fixez une date limite pour les questions** quelques jours avant la clôture, pour éviter que des réponses tardives parviennent à certains soumissionnaires et pas à d'autres.
- **Ne négociez pas en privé pendant la période d'appel d'offres.** Si la portée change, elle change pour tout le monde.

## 5. Recevoir les soumissions et vérifier d'abord leur conformité

Une fois la date de clôture passée, vérifiez chaque soumission par rapport à vos exigences avant de regarder le prix :

- Certificat d'assurance avec le bon assuré désigné
- Attestation de la CNESST (ou de la WSIB ou de la WCB) en règle
- Licences et certifications exigées
- Références incluses
- Chaque élément de la portée chiffré, ou clairement indiqué comme exclu

Toute soumission à laquelle il manque une exigence obligatoire est écartée. N'y renoncez pas pour garder un prix bas dans la course : une chaudière installée par un entrepreneur non certifié qui échoue à l'inspection coûte bien plus cher que l'économie réalisée.

## 6. Évaluer selon des critères fixés d'avance

Comparez maintenant les soumissions conformes, selon les pondérations que vous avez publiées.

- **Uniformisez la portée.** Dressez une liste simple de tout ce que la portée exigeait et notez ce que chaque soumissionnaire a inclus, exclu ou laissé vague. Une soumission de 19 500 $ qui exclut l'élimination des rebuts et la garantie n'est plus la plus basse une fois ces éléments rajoutés.
- **Chiffrez les options séparément.** Le soumissionnaire le plus cher pour la portée de base peut être beaucoup moins cher pour une option que vous approuverez probablement.
- **Appelez au moins deux références** pour votre premier choix. Demandez : « Comment a-t-il réagi quand quelque chose a mal tourné? »
- **Réduisez la liste à deux** si les travaux sont importants, et rencontrez les deux.

## 7. Octroyer, signer et boucler la boucle

- **Mettez-le par écrit.** Signez un contrat qui comprend la portée, le prix, l'échéancier, les modalités de paiement, la garantie et un processus écrit pour les avenants. Pour les contrats de service pluriannuels, ajoutez une clause de résiliation pour convenance. Faites réviser les contrats importants ou pluriannuels par un avocat.
- **Obtenez les certificats avant la mobilisation.** Exigez les documents d'assurance et d'accidents du travail (CNESST ou WSIB) avant que quiconque se présente sur le chantier, pas une promesse qu'ils s'en viennent.
- **Avisez les soumissionnaires non retenus.** Une ligne suffit : « Merci — nous avons octroyé ce contrat. » Les entrepreneurs se souviennent de ceux qui les ont avisés. C'est la façon la moins coûteuse d'obtenir de bonnes soumissions la prochaine fois.
- **Indiquez sur PMRFP que l'appel d'offres est octroyé**, pour qu'il soit retiré du tableau et que votre historique reste exact.
- **Classez un résumé d'évaluation d'une page.** Quand un membre du conseil demandera pourquoi vous n'avez pas retenu la soumission la plus basse, la réponse sera déjà écrite.

## La liste de vérification avant la publication

Avant de publier, vérifiez que :

- [ ] Le titre indique les travaux, le type d'immeuble et la ville
- [ ] Le résumé dit ce dont vous avez besoin en deux phrases
- [ ] La portée couvre l'immeuble, les travaux, les inclusions, les exclusions et les options à prix séparé
- [ ] Au moins une photo du secteur ou de l'équipement est jointe
- [ ] Les exigences mentionnent l'assurance, la CNESST (ou la WSIB / WCB), les licences et les références
- [ ] Une fourchette budgétaire est saisie (affichée ou privée)
- [ ] La date de clôture donne aux soumissionnaires d'une à trois semaines
- [ ] Les instructions de dépôt indiquent quoi envoyer, la date de la visite des lieux, la date limite des questions et votre grille d'évaluation
- [ ] L'approbation pour octroyer le contrat est déjà obtenue

Si vous préférez ne pas partir d'une page blanche, chaque [modèle d'appel d'offres](${L("/rfp-templates")}) comprend la portée, les exigences et les critères d'évaluation déjà remplis : adaptez-le à votre immeuble et publiez. Pour la version longue sur la rédaction de la portée et l'évaluation des soumissions, lisez [comment rédiger un appel d'offres pour l'entretien d'un immeuble commercial](${L("/resources/how-to-write-a-commercial-property-maintenance-rfp")}).

## Questions fréquentes

**Combien de temps mon appel d'offres doit-il rester ouvert?**

Trois semaines pour des travaux d'immobilisation et des contrats de service pluriannuels. Une à deux semaines suffisent pour de petits travaux bien définis. Moins que ça, et vous n'aurez de nouvelles que des entreprises qui se trouvent à être libres — pas des meilleures.

**Devrais-je afficher mon budget?**

Si le conseil d'administration a déjà approuvé un montant, afficher une fourchette vous donne habituellement de meilleures soumissions : les entrepreneurs qui ne peuvent pas travailler à ce niveau passent leur tour, et ceux qui soumissionnent conçoivent leur offre en conséquence. Si vous ne savez vraiment pas ce que coûtent les travaux, gardez le budget privé et consultez un guide des coûts pour repérer les écarts à la réception des soumissions.

**Suis-je obligé de retenir la soumission la plus basse?**

Non — à moins que vos règlements ou la politique du propriétaire ne l'exigent. Indiquez dans l'appel d'offres comment vous évaluerez les soumissions, évaluez-les selon ces critères et rédigez une page expliquant pourquoi vous avez choisi l'adjudicataire. C'est ce qu'un conseil d'administration a besoin de voir.

**Puis-je rester anonyme pendant que je recueille les manifestations d'intérêt?**

Oui. Sur PMRFP, vous pouvez garder vos coordonnées cachées jusqu'à ce que vous approuviez l'intérêt d'un entrepreneur, ou faire transiter les manifestations d'intérêt par PMRFP. Les détails de votre immeuble et de votre budget restent à vous jusqu'à ce que vous décidiez d'aller de l'avant.`,
  cta: {
    title: "Publiez votre appel d'offres — gratuitement",
    description:
      "Partez d'un modèle ou d'un formulaire vierge. Nous vérifions chaque appel d'offres avant sa mise en ligne, et vous restez anonyme jusqu'à ce que vous décidiez d'aller de l'avant.",
    primaryLabel: "Publier un appel d'offres — gratuit",
    secondaryLabel: "Parcourir les modèles d'appels d'offres",
  },
};

export const MAINTENANCE_RFP_GUIDE_FR: StaticGuide = {
  title: "Comment rédiger un appel d'offres pour l'entretien d'un immeuble commercial",
  metaDescription:
    "Le guide d'un gestionnaire immobilier en exercice pour rédiger des appels d'offres d'entretien commercial qui attirent des soumissions réelles et comparables — portée, assurance, évaluation et erreurs à éviter. Adapté au Canada.",
  eyebrow: "Guide",
  lead: "Le guide d'un gestionnaire immobilier en exercice pour mener un processus concurrentiel qui vous donne des soumissions réelles et comparables — et une décision que vous pouvez défendre devant votre conseil d'administration.",
  faqs: [
    {
      q: "Ai-je besoin d'un avocat pour réviser l'appel d'offres avant de le publier?",
      a: "Pas pour l'appel d'offres lui-même : c'est une invitation à soumissionner, pas un contrat. C'est le contrat que vous signez avec l'adjudicataire qui mérite une révision juridique, surtout pour tout contrat de plus de 50 000 $ ou toute entente de service pluriannuelle. Pour des travaux d'immobilisation, un contrat type CCDC 2 ou un contrat abrégé vaut la révision juridique.",
    },
    {
      q: "Combien de soumissionnaires devrais-je inviter?",
      a: "De trois à cinq pour la plupart des travaux. Moins de trois, et il n'y a pas de véritable pression sur les prix. Plus de cinq, et vous faites perdre leur temps à des entrepreneurs qui chiffrent des contrats qu'ils ont peu de chances de décrocher, ce qui fait que moins d'entre eux répondent à vos prochains appels d'offres.",
    },
    {
      q: "Que faire si personne ne répond à mon appel d'offres?",
      a: "Habituellement, la période d'appel d'offres était trop courte, la portée était floue ou la publication n'a pas rejoint le bon corps de métier. Donnez aux soumissionnaires au moins trois semaines, gardez une portée précise et communiquez directement avec un ou deux fournisseurs pour leur demander pourquoi. N'abaissez pas vos exigences pour obtenir des soumissions.",
    },
    {
      q: "Mon conseil d'administration veut que je retienne toujours le prix le plus bas. Que faire?",
      a: "C'est un problème de gouvernance plus qu'un problème d'approvisionnement. Le conseil fixe le seuil; votre rôle est de documenter l'évaluation assez clairement pour qu'il voie pourquoi la soumission retenue offrait le meilleur rapport qualité-prix, et pas seulement le prix le plus bas. La plupart des conseils acceptent une recommandation motivée lorsqu'on leur présente une évaluation claire.",
    },
  ],
  article: `Quelque part dans vos courriels en ce moment, il y a une soumission d'un fournisseur. Peut-être trois, pour les mêmes travaux. L'une est de 28 000 $. Une autre, de 41 000 $. La troisième, de 19 500 $, avec une portée vague qui pourrait vouloir dire n'importe quoi. Vous n'avez aucune idée de ce qui est inclus, de savoir si elles comparent les mêmes matériaux ni si la moins chère est en règle avec la CNESST (ou la WSIB). Le conseil d'administration vous demande quand vous aurez une recommandation.

Voilà ce qui arrive quand on recueille des prix au lieu de lancer un appel d'offres.

Un véritable appel d'offres — même simple — donne à chaque entrepreneur la même portée, les mêmes exigences et les mêmes questions auxquelles répondre. Ce que vous recevez est réellement comparable. Vous pouvez défendre votre décision devant le conseil. Vous avez une trace écrite. Et vous créez une pression sur les prix, parce que chaque entrepreneur sait que d'autres soumissionnent.

Ce guide explique comment en rédiger un, à partir de zéro, pour n'importe quels travaux d'entretien dans un immeuble commercial.

## Pourquoi « appeler trois entrepreneurs pour des prix » vous laisse toujours tomber

Le processus informel fonctionne bien pour les petites réparations — une fenêtre brisée, un appel ponctuel en plomberie, le remplacement d'un seul appareil. Sous environ 5 000 à 10 000 $, la lourdeur d'un appel d'offres formel n'en vaut pas la peine.

Pour tout ce qui est plus gros, le processus informel crée quatre problèmes précis :

**Aucune portée comparable.** Chaque entrepreneur interprète les travaux différemment. L'un inclut l'arrachage et l'élimination des rebuts; un autre suppose que vous vous occuperez de l'élimination; un troisième chiffre un recouvrement, pas un remplacement. Quand les soumissions arrivent avec des prix très différents, impossible de savoir si c'est parce que les portées diffèrent ou parce que quelqu'un gonfle son prix.

**Aucune trace écrite.** Quand un membre du conseil conteste votre choix de fournisseur, « j'ai appelé trois couvreurs » n'est pas une réponse défendable. Un appel d'offres avec des soumissions documentées et une évaluation écrite, oui.

**Aucune pression sur les prix.** Un entrepreneur qui est le seul soumissionnaire le sait, et fixe son prix en conséquence. Un entrepreneur qui sait qu'il est en concurrence avec deux autres entreprises qualifiées chiffre plus soigneusement.

**Aucun déclencheur d'approbation par le conseil.** La plupart des syndicats de copropriété et des baux commerciaux prévoient des seuils de dépenses qui exigent l'approbation du conseil ou un processus concurrentiel formel. Rester informel pour éviter le processus aggrave souvent la situation sur le plan de la gouvernance, au lieu de l'améliorer.

Le processus d'appel d'offres n'a pas à être bureaucratique. Un appel d'offres ciblé pour le remplacement d'un toit plat ou un contrat de déneigement peut être rédigé en moins d'une heure et publié le jour même.

## Appel d'offres ou simple demande de prix : comment choisir

Tous les travaux n'exigent pas un appel d'offres complet. Voici une règle approximative.

**Faites une simple demande de prix quand :**
- Les travaux coûtent moins de 5 000 à 10 000 $ (le seuil varie selon les règlements de votre copropriété, votre contrat de gestion ou la politique de dépenses du propriétaire — vérifiez les vôtres)
- La portée est sans ambiguïté (p. ex. « remplacer une porte extérieure »)
- Vous avez déjà un fournisseur approuvé et n'avez besoin que d'un prix
- C'est une urgence et vous n'avez pas le temps de tenir une période d'appel d'offres

**Lancez un appel d'offres quand :**
- Les travaux dépassent votre seuil de dépenses ou exigent l'approbation du conseil
- Vous octroyez un contrat pluriannuel (déneigement, entretien ménager, entretien CVC, entretien d'ascenseurs)
- La portée exige une visite des lieux pour être chiffrée avec précision
- Vous comparez des approches vraiment différentes (chaudière : efficacité moyenne ou condensation à haute efficacité; toit plat : TPO, EPDM ou bitume modifié)
- Ce sont des travaux d'immobilisation imputés au fonds de prévoyance ou inscrits comme poste dans un budget annuel
- Vous cherchez un nouveau fournisseur dans un corps de métier où vous n'avez aucune relation établie

Pour les projets d'immobilisation — remplacement de chaudière, réfection de toiture, modernisation d'ascenseur, reconstruction de stationnement —, l'appel d'offres est presque toujours le bon outil, peu importe le montant. La documentation à elle seule le justifie.

## Rédiger la portée : la partie que tout le monde rate

La plupart des mauvais appels d'offres échouent à cause de la portée. Soit elle est si vague que les entrepreneurs doivent deviner, soit elle est si directive que vous avez pris des décisions qui devraient revenir au soumissionnaire (comme exiger un produit précis alors que vous voulez en fait sa recommandation).

Une bonne portée comporte quatre parties.

### 1. Décrire l'immeuble et le site

Les entrepreneurs doivent comprendre dans quoi ils s'engagent avant de pouvoir chiffrer avec précision. Indiquez :

- Le type d'immeuble (résidentiel multilogement, bureaux commerciaux, usage mixte, industriel)
- L'âge et la taille approximative
- L'historique pertinent (âge du système existant, problèmes connus, travaux antérieurs)
- Les contraintes du site : immeuble occupé pendant les travaux? Ascenseur ou stationnement nécessaire? Aire d'entreposage limitée? Accès pour une grue?

Pas besoin d'une dissertation. Quatre à six phrases suffisent habituellement.

### 2. Décrire les travaux

Soyez précis sur ce que vous voulez faire faire, mais laissez la méthode ouverte là où elle vous est vraiment égale. « Remplacer la chaudière » est trop vague. « Nous avons besoin du remplacement équivalent ou amélioré de notre chaudière à eau chaude au gaz naturel de 2 000 000 BTU, incluant tous les permis et inspections exigés par la réglementation sur le gaz, l'intégration des contrôles à notre système de thermostats existant et un plan pour réduire au minimum l'arrêt du chauffage pendant le remplacement » : ça, c'est une portée.

**Ce qu'il faut inclure :**

- Ce qui est remplacé, réparé ou entretenu (avec les spécifications actuelles, si vous les connaissez)
- Ce qui est explicitement inclus (matériaux, élimination des rebuts, permis, mise en service, garanties)
- Ce qui est explicitement exclu — tout ce qu'on pourrait croire inclus, mais qui ne l'est pas
- Les options à prix séparé : les éléments que vous pourriez vouloir, mais que vous voulez voir chiffrés séparément pour décider plus tard

Les options à prix séparé sont sous-utilisées. Si vous remplacez la chaudière et que vous pourriez aussi vouloir remplacer les pompes de circulation, ne devinez pas si le soumissionnaire les a incluses. Ajoutez-les en option à prix séparé. Il les chiffre à part. Vous décidez après avoir vu les prix.

### 3. Exemple concret : l'ossature d'une portée pour un toit plat

Voici à quoi ressemble la section de la portée pour le remplacement d'un toit plat sur un immeuble résidentiel de moyenne hauteur.

> **Portée des travaux :** Arrachage et élimination du système de couverture à membrane existant (environ 18 000 pi²), toutes les couches jusqu'au pontage. Inspection du pontage et rapport sur son état; allocation pour la réparation du pontage soumise en poste distinct. Installation d'un nouvel isolant à pente intégrée conforme à la valeur R exigée par le code du bâtiment en vigueur. Installation d'une nouvelle membrane monocouche (le soumissionnaire précise le système : TPO, EPDM ou bitume modifié), posée par un installateur certifié par le fabricant. Tous les solins, bordures métalliques, drains et pénétrations sont inclus. Nettoyage quotidien du chantier; preuves d'élimination des rebuts remises à la fin des travaux. Inspection finale par le fabricant et émission d'une garantie NDL (sans limite monétaire).
>
> **Exclus, sauf si soumis en option à prix séparé :** Remplacement structural du pontage au-delà de 10 % de la surface totale; mise à niveau de l'échelle d'accès au toit; dépose et réinstallation des unités CVC ou remplacement de leurs bases.

Cette portée dit à l'entrepreneur ce qu'il chiffre, ce qui est inclus, ce qui ne l'est pas, et qu'il a la latitude de recommander le système qu'il préfère. Utilisez le [modèle pour le remplacement d'un toit plat](${L("/rfp-templates/flat-roof-replacement")}) si vous voulez tout ça prérempli et prêt à publier.

Avant de rédiger la portée, vérifiez à quoi ressemblent les coûts typiques pour savoir si les soumissions que vous recevrez sont dans la bonne fourchette. Le [guide des coûts de remplacement d'un toit commercial](${L("/cost-guides/commercial-roof-replacement-cost")}) couvre les systèmes TPO, EPDM, en bitume modifié et multicouches, et explique les principaux facteurs de coût.

## Ce qu'il faut exiger de chaque soumissionnaire

Chaque appel d'offres, peu importe le corps de métier, devrait comprendre une section d'exigences standard. Ce sont les conditions non négociables : un soumissionnaire qui ne peut pas les respecter ne se rend pas sur la liste restreinte.

**Assurance.** Responsabilité civile générale d'au moins 5 millions de dollars pour la plupart des travaux commerciaux et d'immobilisation; 2 millions de dollars sont acceptables pour les contrats de service à moindre risque (aménagement paysager, peinture, entretien ménager). Le certificat doit désigner le propriétaire de l'immeuble (ou le syndicat de copropriété) comme assuré additionnel. Obtenez le certificat avant la mobilisation, pas seulement une promesse.

**Accidents du travail.** Une attestation de conformité de la CNESST en vigueur au Québec, ou un certificat de décharge de la WSIB valide en Ontario. C'est non négociable. Pour les entrepreneurs d'autres provinces, confirmez leur inscription auprès de la commission des accidents du travail (WCB) applicable.

**Certifications du corps de métier.** C'est là que la plupart des gestionnaires immobiliers restent vagues, et ça compte. Elles varient selon le corps de métier :

- Gaz et chaudières : au Québec, un entrepreneur titulaire d'une licence de la RBQ et des travailleurs détenant un certificat de compétence de la CCQ; en Ontario, la certification de technicien en gaz de la TSSA. Consultez le [modèle pour le remplacement d'une chaudière](${L("/rfp-templates/boiler-replacement")}) ou le [modèle pour le remplacement d'unités de toit](${L("/rfp-templates/rooftop-unit-replacement")}) pour le libellé précis.
- Électricité : au Québec, un entrepreneur électricien membre de la CMEQ; en Ontario, un entrepreneur titulaire d'une licence de l'ESA (Electrical Safety Authority), les travaux sur les panneaux, l'entrée électrique et les nouveaux circuits exigeant un permis et une inspection de l'ESA. Consultez le [guide des coûts des travaux électriques commerciaux](${L("/cost-guides/commercial-electrical-cost")}) pour voir ce que ça ajoute.
- Ascenseurs : un mécanicien d'ascenseur qualifié (certificat de compétence de la CCQ au Québec, licence de la TSSA en Ontario). Le [modèle de contrat d'entretien d'ascenseurs](${L("/rfp-templates/elevator-service-contract")}) précise les exigences.
- Sécurité incendie : la certification de l'ACAI/CFAA (Association canadienne des alarmes incendie) pour les travaux sur les systèmes d'alarme. Consultez le [modèle d'inspection annuelle de sécurité incendie](${L("/rfp-templates/annual-fire-safety-inspection")}).
- Décontamination fongique : la certification IICRC S520 — et ne laissez jamais l'entreprise de décontamination faire ses propres tests de vérification; exigez un hygiéniste industriel indépendant.
- Toiture : une certification du fabricant — c'est le programme d'installateurs certifiés du fabricant de la membrane qui permet d'obtenir la garantie NDL (au Québec, l'entrepreneur doit aussi détenir une licence de la RBQ).

**Références.** Trois projets comparables réalisés au cours des 24 derniers mois, avec des coordonnées que vous appellerez vraiment. « Comparable » veut dire de taille et de type semblables : un couvreur habitué aux petits centres commerciaux de 3 000 pi² n'est pas l'équivalent d'un couvreur habitué aux immeubles résidentiels de moyenne hauteur de 25 000 pi².

**Chargé de projet désigné.** Pour tous les travaux de plus d'une semaine, exigez que l'entrepreneur nomme son chargé de projet et sa personne-ressource sur le chantier avant la mobilisation. Vous voulez une seule personne à joindre.

## Comment évaluer les soumissions équitablement

Vous avez trois soumissions. Et maintenant?

**1. Vérifiez d'abord les exigences.** Avant de lire les prix, confirmez que chaque soumissionnaire respecte les minimums : une assurance qui désigne les bonnes parties, l'attestation de la CNESST (ou de la WSIB), les certifications exigées. Quiconque ne peut pas les fournir est disqualifié. N'y renoncez pas pour obtenir un prix plus bas.

**2. Comparez la couverture de la portée, pas seulement les totaux.** Dressez une liste de tout ce que votre portée exigeait, et notez ce que chaque soumissionnaire a inclus, exclu ou laissé ambigu. Si le soumissionnaire A a inclus l'élimination des rebuts et que le soumissionnaire B ne l'a pas fait, leurs prix ne sont pas comparables tant que vous n'avez pas fait l'ajustement.

**3. Examinez les options à prix séparé à part.** Comparez les prix de base, puis les prix des options, séparément. Un soumissionnaire plus cher pour la base peut être bien moins cher pour une option que vous approuverez probablement — ce qui change le portrait d'ensemble.

**4. Appelez les références.** Au moins deux pour le soumissionnaire retenu sur votre liste restreinte. A-t-il terminé à temps? Les avenants étaient-ils raisonnables? Feriez-vous de nouveau appel à lui? La question qui en révèle le plus : « Comment a-t-il géré les problèmes quand il y en a eu? » — parce que sur un chantier d'envergure, il y en aura.

**5. Documentez votre décision.** Rédigez un bref résumé d'évaluation — même d'une page — expliquant pourquoi vous avez choisi le fournisseur retenu : vous avez vérifié l'assurance et les certifications, appelé les références et choisi selon les critères nommés dans l'appel d'offres. Il va dans le dossier de l'immeuble. Quand le conseil vous demandera pourquoi vous avez retenu le soumissionnaire du milieu plutôt que le plus bas, vous aurez une réponse.

**Sur le prix le plus bas :** c'est une information pertinente, pas la décision. Une chaudière installée par un entrepreneur non certifié qui échoue à l'inspection coûte plus cher que l'économie réalisée. Un entrepreneur en déneigement qui ne se présente pas lors d'un épisode de pluie verglaçante crée plus de risques de poursuite qu'un forfait saisonnier moins cher. Vous octroyez un ensemble : couverture de la portée, qualifications, références et prix — dans cet ordre.

## Les erreurs courantes qui donnent de mauvaises soumissions

**Une portée vague que vous comptez faire compléter par les entrepreneurs.** Ils ne le feront pas. Chacun la complétera à sa façon et vous obtiendrez des chiffres impossibles à comparer.

**Chiffrer sans visite des lieux.** Pour la toiture, les stationnements et le remplacement du CVC, faites venir les soumissionnaires retenus sur place avant qu'ils finalisent leur prix. C'est pendant la visite qu'ils découvrent ce qui deviendrait autrement des avenants.

**Une période d'appel d'offres trop courte.** Trois semaines, c'est le minimum pour la plupart des travaux d'immobilisation. Une semaine vous donne l'entreprise qui se trouvait libre, pas le meilleur soumissionnaire.

**Ignorer le calendrier.** Octroyez les contrats de déneigement au plus tard le 1er octobre; le pavage se fait de mai à octobre; la peinture extérieure exige un temps chaud et sec. Les meilleures soumissions viennent d'entrepreneurs qui ne sont pas aux abois. Lancez l'appel d'offres avant la saison, pas une fois qu'elle est commencée.

**Ne pas lire les exclusions.** La soumission de 19 500 $ pour le toit qui exclut l'élimination des rebuts, la réparation du pontage et la garantie NDL n'est plus la plus basse une fois ces éléments rajoutés. Lisez chaque ligne.

**Un contrat pluriannuel sans clause de résiliation.** Les contrats d'ascenseurs sont les pires : certains sont des ententes de cinq ans à renouvellement automatique dont il est presque impossible de sortir. Exigez une clause de résiliation pour convenance avec préavis de 90 jours dans tout contrat pluriannuel. Si le fournisseur refuse, c'est une information en soi.

**Aucune trace écrite des avenants.** L'appel d'offres fixe le prix; tout ce qui dépasse la portée devrait exiger une approbation écrite avant que l'entrepreneur aille de l'avant. C'est avec des approbations verbales en cours de chantier qu'un contrat de 28 000 $ devient un contrat de 47 000 $.

## Modèles par corps de métier

Si vous ne voulez pas rédiger une portée à partir de zéro, ces modèles contiennent déjà la portée, les exigences, l'échéancier et les critères d'évaluation. Ajoutez les détails de votre immeuble et publiez.

**Toiture**
- [Modèle pour le remplacement d'un toit plat](${L("/rfp-templates/flat-roof-replacement")}) — arrachage et nouvelle membrane monocouche. [Coûts typiques.](${L("/cost-guides/commercial-roof-replacement-cost")})
- [Modèle pour l'inspection et l'entretien annuels de toiture](${L("/rfp-templates/annual-roof-inspection-contract")}) — inspections deux fois par année et allocation pour réparations mineures.
- [Modèle pour une réparation d'urgence de toiture](${L("/rfp-templates/emergency-roof-repair")}) — intervention rapide en cas d'infiltration active.

**CVC**
- [Modèle pour le remplacement d'une chaudière](${L("/rfp-templates/boiler-replacement")}) — efficacité moyenne ou haute efficacité, exigences pour le gaz, plan pour l'arrêt du chauffage.
- [Modèle pour le remplacement d'unités de toit](${L("/rfp-templates/rooftop-unit-replacement")}) — remplacement de RTU avec grue, bases et contrôles. [Coûts typiques.](${L("/cost-guides/commercial-hvac-replacement-cost")})
- [Modèle pour l'entretien annuel CVC](${L("/rfp-templates/annual-hvac-maintenance-contract")}) — visites trimestrielles, allocation de réparation, conditions d'urgence.

**Extérieur et terrain**
- [Modèle de contrat saisonnier de déneigement](${L("/rfp-templates/snow-removal-seasonal-contract")}) — forfait saisonnier ou tarif à l'intervention, délais d'intervention, responsabilité en cas de chute. [Coûts typiques.](${L("/cost-guides/commercial-snow-removal-cost")})
- [Modèle pour le resurfaçage d'un stationnement](${L("/rfp-templates/parking-lot-resurfacing")}) — planage et resurfaçage ou reconstruction complète. [Coûts typiques.](${L("/cost-guides/parking-lot-paving-cost")})
- [Modèle de contrat annuel d'entretien paysager](${L("/rfp-templates/landscaping-annual-contract")}) — entretien hebdomadaire, nettoyages saisonniers, irrigation.
- [Modèle pour la peinture extérieure](${L("/rfp-templates/exterior-painting")}) — peinture complète avec préparation, garantie, nacelles ou échafaudages. [Coûts typiques.](${L("/cost-guides/commercial-painting-cost")})

**Mécanique et électricité**
- [Modèle de contrat d'entretien d'ascenseurs](${L("/rfp-templates/elevator-service-contract")}) — entretien complet ou « huile et graisse », exigences réglementaires, clauses de sortie.
- [Modèle pour la mise à niveau d'un panneau électrique](${L("/rfp-templates/electrical-panel-upgrade")}) — augmentation de l'entrée, coordination des inspections, planification des coupures. [Coûts typiques.](${L("/cost-guides/commercial-electrical-cost")})
- [Modèle pour la conversion de l'éclairage au DEL](${L("/rfp-templates/led-lighting-retrofit")}) — coordination des subventions, audit des luminaires, analyse de récupération.

**Sécurité et conformité**
- [Modèle d'inspection annuelle de sécurité incendie](${L("/rfp-templates/annual-fire-safety-inspection")}) — techniciens certifiés ACAI/CFAA, signalement des déficiences, déclaration des conflits d'intérêts.
- [Modèle pour la décontamination fongique](${L("/rfp-templates/mold-remediation")}) — confinement selon l'IICRC et vérification indépendante.

**Nettoyage et restauration**
- [Modèle de contrat annuel d'entretien ménager](${L("/rfp-templates/janitorial-annual-contract")}) — portée quotidienne, références, conditions de rendement. [Coûts typiques.](${L("/cost-guides/commercial-cleaning-cost")})
- [Modèle pour la peinture des aires communes](${L("/rfp-templates/common-area-painting")}) — phasage en immeuble occupé, faible teneur en COV, horaire étage par étage.
- [Modèle pour la restauration après sinistre](${L("/rfp-templates/post-damage-restoration")}) — urgence eau, feu ou fumée, facturation directe à l'assureur.

## Questions fréquentes

**Ai-je besoin d'un avocat pour réviser l'appel d'offres avant de le publier?**

Pas pour l'appel d'offres lui-même : c'est une invitation à soumissionner, pas un contrat. C'est le contrat que vous signez avec l'adjudicataire qui mérite une révision juridique, surtout pour tout contrat de plus de 50 000 $ ou toute entente de service pluriannuelle. Pour des travaux d'immobilisation, un contrat type CCDC 2 ou un contrat abrégé vaut bien les quelques centaines de dollars de révision juridique.

**Combien de soumissionnaires devrais-je inviter?**

De trois à cinq pour la plupart des travaux. Moins de trois, et il n'y a pas de véritable pression sur les prix. Plus de cinq, et vous faites perdre leur temps à des entrepreneurs qui chiffrent des contrats qu'ils ont peu de chances de décrocher — ce qui fait que moins d'entre eux répondent la fois suivante. Si la qualité des fournisseurs vous préoccupe, invitez-en davantage à l'étape de la manifestation d'intérêt et réduisez la liste à trois pour les soumissions complètes.

**Que faire si personne ne répond à mon appel d'offres?**

Habituellement, la période d'appel d'offres était trop courte, la portée était floue ou la publication n'a pas rejoint le bon corps de métier. Donnez aux soumissionnaires au moins trois semaines. Si vous ne suscitez aucun intérêt, communiquez directement avec un ou deux fournisseurs pour leur demander pourquoi — la solution est souvent simple. N'abaissez pas vos exigences pour obtenir des soumissions.

**Mon conseil d'administration veut que je retienne toujours le prix le plus bas. Que faire?**

C'est un problème de gouvernance plus qu'un problème d'approvisionnement. Le conseil fixe le seuil (« un processus concurrentiel pour tout ce qui dépasse 25 000 $ ») et devrait comprendre que le prix le plus bas est un facteur parmi d'autres, pas le seul. Votre rôle est de documenter l'évaluation assez clairement pour qu'il voie pourquoi la soumission retenue offrait le meilleur rapport qualité-prix. La plupart des conseils acceptent une recommandation motivée lorsqu'on leur présente une évaluation claire.`,
  cta: {
    title: "Publiez votre projet — gratuitement",
    description:
      "Une fois votre portée rédigée, la publication prend environ deux minutes. Des entrepreneurs qualifiés vous répondent, et vous restez anonyme jusqu'à ce que vous décidiez d'aller de l'avant.",
    primaryLabel: "Publier un projet — gratuit",
    secondaryLabel: "Parcourir les modèles d'appels d'offres",
  },
};
