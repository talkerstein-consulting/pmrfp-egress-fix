/**
 * Jobs and Talent pages (server): /jobs, /jobs/[slug], /jobs/post,
 * /jobs/manage, /talent, /talent/[handle], /talent/edit, and the job and
 * talent cards. Labels shared with the forms (employment types,
 * availability, pay, years) live in jobsClient.
 */
const en = {
  photoAlt: {
    siteCrew: "Construction crew in hard hats and hi-vis working on a concrete deck",
  },
  /** Shared by the board, manage and post pages. */
  common: {
    postJob: "Post a job",
    postJobFree: "Post a job free",
    makeFreeProfile: "Make a free profile",
    lookingForWork: "Looking for work?",
    hiring: "Hiring?",
    trade: "Trade",
    region: "Region",
    allTrades: "All trades",
    anywhere: "Anywhere",
    clear: "Clear",
    switchingOnDescription: "Check back in a few minutes.",
    openJobs: { one: "{n} open job", other: "{n} open jobs" },
  },

  /** /jobs */
  board: {
    meta: {
      title: "Construction & Trade Jobs in Canada and the U.S.",
      description:
        "Jobs with general contractors, trade companies and property managers: electricians, plumbers, HVAC techs, labourers, apprentices and more. Apply in a minute, no account needed.",
    },
    eyebrow: "PMRFP Jobs",
    title: "Trade and construction jobs with companies that are winning work.",
    lead: "General contractors, trade companies and property managers hiring electricians, plumbers, HVAC techs, labourers, apprentices and more. Apply in a minute, no account needed.",
    seeOpen: "See open jobs",
    hiringCta: "Hiring? Post a job free",
    type: "Type",
    anyType: "Any type",
    show: "Show jobs",
    switchingOn: "Jobs are switching on",
    emptyFilteredTitle: "No open jobs match that yet",
    emptyTitle: "No open jobs yet",
    emptyFilteredDescription: "Try another trade or region, or clear the filters. New jobs are posted every week.",
    emptyDescription: "Companies on PMRFP are starting to post jobs. Hiring? Yours can be the first one people see.",
    lookingBody: "Make a free profile with your trade, tickets and availability. Companies hiring near you can find you.",
    hiringBody:
      "Post a job free and applications come straight to your inbox. Up to {n} open jobs at a time; Trade Pro members post unlimited jobs, shown first.",
    browsePeople: "Or browse people looking for work",
    gcTitle: "General contractor?",
    gcBody: "Hiring a subcontractor for a job you won, not an employee? Post a sub-trade package and local trades send you quotes.",
    gcCta: "Post a sub-trade package",
  },

  /** components/jobs/job-card */
  card: {
    postedToday: "Posted today",
    postedYesterday: "Posted yesterday",
    postedDaysAgo: "Posted {n} days ago",
  },

  /** /jobs/[slug] */
  detail: {
    meta: {
      notFound: "Job not found",
      description: "{type} job with {company} in {where}. {excerpt}",
      /** {trade}: the trade name, lower-case in English. */
      descriptionTrade: "{type} {trade} job with {company} in {where}. {excerpt}",
    },
    allJobs: "← All jobs",
    proEmployer: "Pro employer",
    posted: "Posted {date}",
    closed: "This job is no longer taking applications.",
    /** {trade}: lower-case trade name. */
    seeOpenTrade: "See open {trade} jobs",
    seeOpenAll: "See open jobs",
    about: "About the job",
    requirements: "Requirements",
    disclaimer: "Posted by {company} on PMRFP. PMRFP doesn't employ or vet applicants and isn't party to any hiring decision.",
    applyTo: "Apply to {company}",
    applyNote: "Takes a minute. They reply to you directly.",
    profileLink: "Make a free profile",
    profileAfter: "so companies hiring in your trade can find you.",
    seeCompany: "See their profile and past work",
    hiringOnPmrfp: "Hiring on PMRFP",
  },

  /** /jobs/post */
  post: {
    metaTitle: "Post a job",
    back: "← Your jobs",
    intro: "Hiring for {org}. Your job is public for {days} days, and each application is emailed to you. Free accounts can have {limit} open jobs at a time;",
    introPro: "as a Trade Pro member you can post unlimited jobs, shown first.",
    introFree: "Trade Pro members post unlimited jobs, shown first.",
    subTitle: "Hiring a subcontractor, not an employee?",
    subBody: "Post a sub-trade package instead, and local trades send you quotes.",
    subLink: "Post a package",
    pending: "Your company profile is waiting for approval. Once it's approved you can post jobs here.",
    contact: "Contact us",
    pendingAfter: "if it's taking a while.",
  },

  /** /jobs/manage */
  manage: {
    title: "Hiring",
    summary: "{org}: {count}{free}",
    ofFree: " of {n} free",
    careers: "Add to your careers page",
    findPeople: "Find people",
    live: "Your job is live.",
    seeIt: "See it",
    switchingOn: "Jobs are switching on",
    emptyTitle: "No jobs yet",
    emptyDescription: "Post your first job and applications come straight to your inbox.",
    openUntil: "open until {date}",
    closed: "closed",
    expired: "expired {date}",
    applicants: { one: "{n} applicant", other: "{n} applicants" },
    experience: "{n} yrs experience",
    tickets: "Tickets: {list}",
  },

  /** /talent */
  talent: {
    meta: {
      title: "Skilled Tradespeople Looking for Work",
      description:
        "Electricians, plumbers, HVAC techs, carpenters, labourers and apprentices with their trade, tickets, experience and availability. Employers message them through PMRFP.",
    },
    eyebrow: "PMRFP Talent",
    title: "Skilled tradespeople, with their tickets and availability.",
    lead: "Find electricians, plumbers, HVAC techs, carpenters, labourers and apprentices near your jobs. Message them through PMRFP. They reply to you directly.",
    seePeople: "See people",
    lookingCta: "Looking for work? Make a free profile",
    availability: "Availability",
    any: "Any",
    show: "Show people",
    switchingOn: "Talent profiles are switching on",
    emptyFilteredTitle: "No one matches that yet",
    emptyTitle: "No profiles yet",
    emptyFilteredDescription: "Try another trade or region, or clear the filters. New people join every week.",
    emptyDescription: "Tradespeople are starting to make profiles. Looking for work? Yours can be the first one employers see.",
    count: { one: "{n} person", other: "{n} people" },
    lookingBody:
      "Make a free profile with your trade, tickets and availability. Companies hiring near you can find you and message you. Your email stays private unless you choose to show it.",
    hiringBody:
      "Approved companies can message {n} people a month free. Trade Pro members message as many as they need. Or post a job and let people apply.",
  },

  /** components/talent/talent-card */
  talentCard: {
    tradesperson: "Tradesperson",
    more: "+{n} more",
  },

  /** /talent/edit */
  edit: {
    metaTitle: "Your talent profile",
    editTitle: "Edit your profile",
    makeTitle: "Make your profile",
    intro: "Companies hiring in your trade find you by trade, region and tickets. Your email stays private: they message you through PMRFP and you reply if you want to.",
    seeProfile: "See your profile",
    applyNow: "Want to apply now?",
    seeJobs: "See open jobs",
  },

  /** /talent/[handle] */
  profile: {
    meta: {
      notFound: "Profile not found",
      in: " in {where}",
      withYears: " with {years} of experience",
    },
    allPeople: "← All people",
    saved: "Profile saved. ",
    isPublic: "This is your public profile.",
    isHidden: "Your profile is hidden. Only you can see this page.",
    editProfile: "Edit profile",
    inTrade: "{years} in the trade",
    certifications: "Tickets and certifications",
    certificationsNote: "As listed by {name}. Ask to see the cards before hiring.",
    about: "About {name}",
    lookingFor: "Looking for",
    alsoWorksIn: "Also works in",
    endorsements: "Endorsements",
    noEndorsements: "No endorsements yet. Companies on PMRFP that have worked with {name} can add one.",
    verifiedCompany: ", verified company on PMRFP",
    disclaimer: "Profile written by {name}. PMRFP doesn't employ or vet workers and isn't party to any hiring decision.",
    messageVia: "Message {name} through PMRFP. They reply to your email.",
    approvalNeeded: "You can contact {name} once your company profile is approved.",
    companiesCan: "Companies on PMRFP can message {name}. Free to join.",
    setUpCompany: "Set up your company",
    signInToContact: "Sign in to contact",
    newHere: "New here?",
    joinEmployer: "Join as an employer",
    lookingToo: "Looking for work too?",
    lookingTooBody: "Make a free profile so companies hiring in your trade can find you.",
    makeYourProfile: "Make your profile",
  },
};

const fr: typeof en = {
  photoAlt: {
    siteCrew: "Équipe de construction en casques et vestes haute visibilité travaillant sur une dalle de béton",
  },
  common: {
    postJob: "Publier une offre",
    postJobFree: "Publier une offre gratuitement",
    makeFreeProfile: "Créer un profil gratuit",
    lookingForWork: "Vous cherchez du travail?",
    hiring: "Vous embauchez?",
    trade: "Corps de métier",
    region: "Région",
    allTrades: "Tous les corps de métier",
    anywhere: "Partout",
    clear: "Effacer",
    switchingOnDescription: "Revenez dans quelques minutes.",
    openJobs: { one: "{n} offre ouverte", other: "{n} offres ouvertes" },
  },

  board: {
    meta: {
      title: "Emplois en construction et dans les métiers au Canada et aux États-Unis",
      description:
        "Des emplois chez des entrepreneurs généraux, des entreprises spécialisées et des gestionnaires immobiliers : électriciens, plombiers, techniciens en CVC, manœuvres, apprentis et plus. Postulez en une minute, sans compte.",
    },
    eyebrow: "Emplois PMRFP",
    title: "Des emplois en construction et dans les métiers, chez des entreprises qui décrochent des contrats.",
    lead: "Des entrepreneurs généraux, des entreprises spécialisées et des gestionnaires immobiliers embauchent des électriciens, des plombiers, des techniciens en CVC, des manœuvres, des apprentis et plus. Postulez en une minute, sans compte.",
    seeOpen: "Voir les offres d'emploi",
    hiringCta: "Vous embauchez? Publiez une offre gratuitement",
    type: "Type",
    anyType: "Tous les types",
    show: "Voir les offres",
    switchingOn: "Les offres d'emploi sont en cours d'activation",
    emptyFilteredTitle: "Aucune offre ne correspond pour l'instant",
    emptyTitle: "Aucune offre d'emploi pour l'instant",
    emptyFilteredDescription:
      "Essayez un autre corps de métier ou une autre région, ou effacez les filtres. De nouvelles offres sont publiées chaque semaine.",
    emptyDescription:
      "Les entreprises sur PMRFP commencent à publier des offres. Vous embauchez? La vôtre peut être la première que les gens verront.",
    lookingBody:
      "Créez un profil gratuit avec votre métier, vos certifications et vos disponibilités. Les entreprises qui embauchent près de chez vous pourront vous trouver.",
    hiringBody:
      "Publiez une offre gratuitement et les candidatures arrivent directement dans votre boîte de réception. Jusqu'à {n} offres ouvertes à la fois; les membres Trade Pro publient des offres en illimité, affichées en premier.",
    browsePeople: "Ou parcourez les gens de métier qui cherchent du travail",
    gcTitle: "Entrepreneur général?",
    gcBody:
      "Vous cherchez un sous-traitant pour un contrat que vous avez décroché, et non un employé? Publiez un lot de sous-traitance et les entrepreneurs de votre région vous envoient des prix.",
    gcCta: "Publier un lot de sous-traitance",
  },

  card: {
    postedToday: "Publiée aujourd'hui",
    postedYesterday: "Publiée hier",
    postedDaysAgo: "Publiée il y a {n} jours",
  },

  detail: {
    meta: {
      notFound: "Offre introuvable",
      description: "Offre d'emploi ({type}) chez {company} à {where}. {excerpt}",
      descriptionTrade: "Offre d'emploi ({type}, {trade}) chez {company} à {where}. {excerpt}",
    },
    allJobs: "← Toutes les offres",
    proEmployer: "Employeur Pro",
    posted: "Publiée le {date}",
    closed: "Cette offre n'accepte plus de candidatures.",
    seeOpenTrade: "Voir les offres ouvertes dans ce métier",
    seeOpenAll: "Voir les offres ouvertes",
    about: "À propos de l'emploi",
    requirements: "Exigences",
    disclaimer:
      "Publiée par {company} sur PMRFP. PMRFP n'emploie ni ne vérifie les candidats et n'est partie à aucune décision d'embauche.",
    applyTo: "Postuler chez {company}",
    applyNote: "Ça prend une minute. L'entreprise vous répond directement.",
    profileLink: "Créez un profil gratuit",
    profileAfter: "pour que les entreprises qui embauchent dans votre métier puissent vous trouver.",
    seeCompany: "Voir son profil et ses réalisations",
    hiringOnPmrfp: "Embauche sur PMRFP",
  },

  post: {
    metaTitle: "Publier une offre",
    back: "← Vos offres",
    intro:
      "Vous embauchez pour {org}. Votre offre reste publique pendant {days} jours, et chaque candidature vous est envoyée par courriel. Les comptes gratuits peuvent avoir {limit} offres ouvertes à la fois;",
    introPro: "en tant que membre Trade Pro, vous pouvez publier des offres en illimité, affichées en premier.",
    introFree: "les membres Trade Pro publient des offres en illimité, affichées en premier.",
    subTitle: "Vous cherchez un sous-traitant, pas un employé?",
    subBody: "Publiez plutôt un lot de sous-traitance, et les entrepreneurs de votre région vous envoient des prix.",
    subLink: "Publier un lot",
    pending: "Le profil de votre entreprise est en attente d'approbation. Une fois qu'il sera approuvé, vous pourrez publier des offres ici.",
    contact: "Écrivez-nous",
    pendingAfter: "si l'attente se prolonge.",
  },

  manage: {
    title: "Embauche",
    summary: "{org} : {count}{free}",
    ofFree: " sur {n} gratuites",
    careers: "Ajouter à votre page Carrières",
    findPeople: "Trouver des gens de métier",
    live: "Votre offre est en ligne.",
    seeIt: "La voir",
    switchingOn: "Les offres d'emploi sont en cours d'activation",
    emptyTitle: "Aucune offre pour l'instant",
    emptyDescription: "Publiez votre première offre et les candidatures arrivent directement dans votre boîte de réception.",
    openUntil: "ouverte jusqu'au {date}",
    closed: "fermée",
    expired: "expirée le {date}",
    applicants: { one: "{n} candidat", other: "{n} candidats" },
    experience: "{n} ans d'expérience",
    tickets: "Certifications : {list}",
  },

  talent: {
    meta: {
      title: "Gens de métier qualifiés à la recherche d'un emploi",
      description:
        "Électriciens, plombiers, techniciens en CVC, charpentiers-menuisiers, manœuvres et apprentis, avec leur métier, leurs certifications, leur expérience et leurs disponibilités. Les employeurs leur écrivent par PMRFP.",
    },
    eyebrow: "Talents PMRFP",
    title: "Des gens de métier qualifiés, avec leurs certifications et leurs disponibilités.",
    lead: "Trouvez des électriciens, des plombiers, des techniciens en CVC, des charpentiers-menuisiers, des manœuvres et des apprentis près de vos chantiers. Écrivez-leur par PMRFP. Ils vous répondent directement.",
    seePeople: "Voir les profils",
    lookingCta: "Vous cherchez du travail? Créez un profil gratuit",
    availability: "Disponibilité",
    any: "Toutes",
    show: "Voir les profils",
    switchingOn: "Les profils de talents sont en cours d'activation",
    emptyFilteredTitle: "Personne ne correspond pour l'instant",
    emptyTitle: "Aucun profil pour l'instant",
    emptyFilteredDescription:
      "Essayez un autre corps de métier ou une autre région, ou effacez les filtres. De nouvelles personnes s'inscrivent chaque semaine.",
    emptyDescription:
      "Les gens de métier commencent à créer leur profil. Vous cherchez du travail? Le vôtre peut être le premier que les employeurs verront.",
    count: { one: "{n} personne", other: "{n} personnes" },
    lookingBody:
      "Créez un profil gratuit avec votre métier, vos certifications et vos disponibilités. Les entreprises qui embauchent près de chez vous peuvent vous trouver et vous écrire. Votre courriel reste privé, sauf si vous choisissez de l'afficher.",
    hiringBody:
      "Les entreprises approuvées peuvent écrire gratuitement à {n} personnes par mois. Les membres Trade Pro écrivent à autant de gens qu'ils le veulent. Ou publiez une offre et laissez les gens postuler.",
  },

  talentCard: {
    tradesperson: "Personne de métier",
    more: "+{n} autres",
  },

  edit: {
    metaTitle: "Votre profil de talent",
    editTitle: "Modifier votre profil",
    makeTitle: "Créer votre profil",
    intro:
      "Les entreprises qui embauchent dans votre métier vous trouvent par corps de métier, région et certifications. Votre courriel reste privé : elles vous écrivent par PMRFP et vous répondez si vous le voulez.",
    seeProfile: "Voir votre profil",
    applyNow: "Vous voulez postuler maintenant?",
    seeJobs: "Voir les offres d'emploi",
  },

  profile: {
    meta: {
      notFound: "Profil introuvable",
      in: " à {where}",
      withYears: " avec {years} d'expérience",
    },
    allPeople: "← Tous les profils",
    saved: "Profil enregistré. ",
    isPublic: "Voici votre profil public.",
    isHidden: "Votre profil est masqué. Vous seul pouvez voir cette page.",
    editProfile: "Modifier le profil",
    inTrade: "{years} dans le métier",
    certifications: "Cartes de compétence et certifications",
    certificationsNote: "Selon {name}. Demandez à voir les cartes avant d'embaucher.",
    about: "À propos de {name}",
    lookingFor: "Recherche",
    alsoWorksIn: "Travaille aussi en",
    endorsements: "Recommandations",
    noEndorsements:
      "Aucune recommandation pour l'instant. Les entreprises sur PMRFP qui ont travaillé avec {name} peuvent en ajouter une.",
    verifiedCompany: ", entreprise vérifiée sur PMRFP",
    disclaimer:
      "Profil rédigé par {name}. PMRFP n'emploie ni ne vérifie les travailleurs et n'est partie à aucune décision d'embauche.",
    messageVia: "Écrivez à {name} par PMRFP. La réponse arrivera dans votre courriel.",
    approvalNeeded: "Vous pourrez écrire à {name} une fois le profil de votre entreprise approuvé.",
    companiesCan: "Les entreprises sur PMRFP peuvent écrire à {name}. Inscription gratuite.",
    setUpCompany: "Configurer votre entreprise",
    signInToContact: "Se connecter pour écrire",
    newHere: "Nouveau sur PMRFP?",
    joinEmployer: "S'inscrire comme employeur",
    lookingToo: "Vous cherchez aussi du travail?",
    lookingTooBody: "Créez un profil gratuit pour que les entreprises qui embauchent dans votre métier puissent vous trouver.",
    makeYourProfile: "Créer votre profil",
  },
};

const es: typeof en = {
  photoAlt: {
    siteCrew: "Cuadrilla de construcción con cascos y chalecos de alta visibilidad trabajando sobre una losa de concreto",
  },
  common: {
    postJob: "Publicar un empleo",
    postJobFree: "Publicar un empleo gratis",
    makeFreeProfile: "Crear un perfil gratis",
    lookingForWork: "¿Busca trabajo?",
    hiring: "¿Está contratando?",
    trade: "Oficio",
    region: "Región",
    allTrades: "Todos los oficios",
    anywhere: "En cualquier lugar",
    clear: "Borrar",
    switchingOnDescription: "Vuelva a intentarlo en unos minutos.",
    openJobs: { one: "{n} empleo abierto", other: "{n} empleos abiertos" },
  },

  board: {
    meta: {
      title: "Empleos en construcción y oficios en Canadá y Estados Unidos",
      description:
        "Empleos con contratistas generales, empresas de oficios y administradores de propiedades: electricistas, plomeros, técnicos de HVAC, obreros, aprendices y más. Postúlese en un minuto, sin crear una cuenta.",
    },
    eyebrow: "Empleos PMRFP",
    title: "Empleos en oficios y construcción con empresas que están ganando contratos.",
    lead: "Contratistas generales, empresas de oficios y administradores de propiedades que contratan electricistas, plomeros, técnicos de HVAC, obreros, aprendices y más. Postúlese en un minuto, sin crear una cuenta.",
    seeOpen: "Ver empleos abiertos",
    hiringCta: "¿Está contratando? Publique un empleo gratis",
    type: "Tipo",
    anyType: "Cualquier tipo",
    show: "Ver empleos",
    switchingOn: "Los empleos se están activando",
    emptyFilteredTitle: "Todavía no hay empleos abiertos que coincidan",
    emptyTitle: "Todavía no hay empleos abiertos",
    emptyFilteredDescription: "Pruebe otro oficio u otra región, o borre los filtros. Cada semana se publican nuevos empleos.",
    emptyDescription:
      "Las empresas en PMRFP están empezando a publicar empleos. ¿Está contratando? El suyo puede ser el primero que vea la gente.",
    lookingBody:
      "Cree un perfil gratis con su oficio, sus certificaciones y su disponibilidad. Las empresas que contratan cerca de usted podrán encontrarlo.",
    hiringBody:
      "Publique un empleo gratis y las solicitudes le llegarán directamente a su bandeja de entrada. Hasta {n} empleos abiertos a la vez; los miembros de Trade Pro publican empleos ilimitados, que aparecen primero.",
    browsePeople: "O vea a las personas que buscan trabajo",
    gcTitle: "¿Es contratista general?",
    gcBody:
      "¿Necesita un subcontratista para un trabajo que ganó, y no un empleado? Publique un paquete de subcontratación y los contratistas de su zona le enviarán cotizaciones.",
    gcCta: "Publicar un paquete de subcontratación",
  },

  card: {
    postedToday: "Publicado hoy",
    postedYesterday: "Publicado ayer",
    postedDaysAgo: "Publicado hace {n} días",
  },

  detail: {
    meta: {
      notFound: "Empleo no encontrado",
      description: "Empleo ({type}) con {company} en {where}. {excerpt}",
      descriptionTrade: "Empleo ({type}, {trade}) con {company} en {where}. {excerpt}",
    },
    allJobs: "← Todos los empleos",
    proEmployer: "Empleador Pro",
    posted: "Publicado el {date}",
    closed: "Este empleo ya no recibe solicitudes.",
    seeOpenTrade: "Ver empleos abiertos en este oficio",
    seeOpenAll: "Ver empleos abiertos",
    about: "Acerca del empleo",
    requirements: "Requisitos",
    disclaimer:
      "Publicado por {company} en PMRFP. PMRFP no emplea ni evalúa a los candidatos y no participa en ninguna decisión de contratación.",
    applyTo: "Postúlese en {company}",
    applyNote: "Toma un minuto. La empresa le responde directamente.",
    profileLink: "Cree un perfil gratis",
    profileAfter: "para que las empresas que contratan en su oficio puedan encontrarlo.",
    seeCompany: "Ver su perfil y trabajos anteriores",
    hiringOnPmrfp: "Contratando en PMRFP",
  },

  post: {
    metaTitle: "Publicar un empleo",
    back: "← Sus empleos",
    intro:
      "Contratando para {org}. Su empleo estará publicado durante {days} días, y cada solicitud le llegará por correo electrónico. Las cuentas gratuitas pueden tener {limit} empleos abiertos a la vez;",
    introPro: "como miembro de Trade Pro, puede publicar empleos ilimitados, que aparecen primero.",
    introFree: "los miembros de Trade Pro publican empleos ilimitados, que aparecen primero.",
    subTitle: "¿Necesita un subcontratista, no un empleado?",
    subBody: "Mejor publique un paquete de subcontratación, y los contratistas de su zona le enviarán cotizaciones.",
    subLink: "Publicar un paquete",
    pending: "El perfil de su empresa está en espera de aprobación. Cuando se apruebe, podrá publicar empleos aquí.",
    contact: "Contáctenos",
    pendingAfter: "si la espera se alarga.",
  },

  manage: {
    title: "Contratación",
    summary: "{org}: {count}{free}",
    ofFree: " de {n} gratis",
    careers: "Agregar a su página de empleos",
    findPeople: "Encontrar personal",
    live: "Su empleo está publicado.",
    seeIt: "Verlo",
    switchingOn: "Los empleos se están activando",
    emptyTitle: "Todavía no hay empleos",
    emptyDescription: "Publique su primer empleo y las solicitudes le llegarán directamente a su bandeja de entrada.",
    openUntil: "abierto hasta el {date}",
    closed: "cerrado",
    expired: "venció el {date}",
    applicants: { one: "{n} candidato", other: "{n} candidatos" },
    experience: "{n} años de experiencia",
    tickets: "Certificaciones: {list}",
  },

  talent: {
    meta: {
      title: "Trabajadores de oficios calificados que buscan empleo",
      description:
        "Electricistas, plomeros, técnicos de HVAC, carpinteros, obreros y aprendices, con su oficio, certificaciones, experiencia y disponibilidad. Los empleadores les escriben a través de PMRFP.",
    },
    eyebrow: "Talento PMRFP",
    title: "Trabajadores de oficios calificados, con sus certificaciones y su disponibilidad.",
    lead: "Encuentre electricistas, plomeros, técnicos de HVAC, carpinteros, obreros y aprendices cerca de sus obras. Escríbales a través de PMRFP. Ellos le responden directamente.",
    seePeople: "Ver perfiles",
    lookingCta: "¿Busca trabajo? Cree un perfil gratis",
    availability: "Disponibilidad",
    any: "Cualquiera",
    show: "Ver perfiles",
    switchingOn: "Los perfiles de talento se están activando",
    emptyFilteredTitle: "Todavía nadie coincide con esa búsqueda",
    emptyTitle: "Todavía no hay perfiles",
    emptyFilteredDescription: "Pruebe otro oficio u otra región, o borre los filtros. Cada semana se registran nuevas personas.",
    emptyDescription:
      "Los trabajadores de oficios están empezando a crear sus perfiles. ¿Busca trabajo? El suyo puede ser el primero que vean los empleadores.",
    count: { one: "{n} persona", other: "{n} personas" },
    lookingBody:
      "Cree un perfil gratis con su oficio, sus certificaciones y su disponibilidad. Las empresas que contratan cerca de usted pueden encontrarlo y escribirle. Su correo electrónico se mantiene privado, a menos que usted decida mostrarlo.",
    hiringBody:
      "Las empresas aprobadas pueden escribir gratis a {n} personas al mes. Los miembros de Trade Pro escriben a todas las que necesiten. O publique un empleo y deje que la gente se postule.",
  },

  talentCard: {
    tradesperson: "Trabajador de oficios",
    more: "+{n} más",
  },

  edit: {
    metaTitle: "Su perfil de talento",
    editTitle: "Editar su perfil",
    makeTitle: "Crear su perfil",
    intro:
      "Las empresas que contratan en su oficio lo encuentran por oficio, región y certificaciones. Su correo electrónico se mantiene privado: le escriben a través de PMRFP y usted responde si lo desea.",
    seeProfile: "Ver su perfil",
    applyNow: "¿Quiere postularse ahora?",
    seeJobs: "Ver empleos abiertos",
  },

  profile: {
    meta: {
      notFound: "Perfil no encontrado",
      in: " en {where}",
      withYears: " con {years} de experiencia",
    },
    allPeople: "← Todos los perfiles",
    saved: "Perfil guardado. ",
    isPublic: "Este es su perfil público.",
    isHidden: "Su perfil está oculto. Solo usted puede ver esta página.",
    editProfile: "Editar perfil",
    inTrade: "{years} en el oficio",
    certifications: "Certificaciones y licencias",
    certificationsNote: "Según lo indicado por {name}. Pida ver las tarjetas antes de contratar.",
    about: "Acerca de {name}",
    lookingFor: "Busca",
    alsoWorksIn: "También trabaja en",
    endorsements: "Recomendaciones",
    noEndorsements:
      "Todavía no hay recomendaciones. Las empresas en PMRFP que han trabajado con {name} pueden agregar una.",
    verifiedCompany: ", empresa verificada en PMRFP",
    disclaimer:
      "Perfil escrito por {name}. PMRFP no emplea ni evalúa a los trabajadores y no participa en ninguna decisión de contratación.",
    messageVia: "Escríbale a {name} a través de PMRFP. La respuesta le llegará a su correo electrónico.",
    approvalNeeded: "Podrá contactar a {name} cuando se apruebe el perfil de su empresa.",
    companiesCan: "Las empresas en PMRFP pueden escribirle a {name}. Registrarse es gratis.",
    setUpCompany: "Configure su empresa",
    signInToContact: "Inicie sesión para contactar",
    newHere: "¿Es nuevo aquí?",
    joinEmployer: "Registrarse como empleador",
    lookingToo: "¿Usted también busca trabajo?",
    lookingTooBody: "Cree un perfil gratis para que las empresas que contratan en su oficio puedan encontrarlo.",
    makeYourProfile: "Crear su perfil",
  },
};

export default { en, fr, es };
