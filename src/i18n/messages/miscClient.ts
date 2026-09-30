/**
 * Client strings for the contact form and the two referral forms
 * (components/public/contact-form.tsx, components/forms/refer-*-form.tsx).
 * `fr` is typed against `en`, so every key must exist in both.
 */
const en = {
  contactForm: {
    sent: "Message sent — we'll be in touch.",
    failed: "Something went wrong. Please try again.",
    doneTitle: "Thanks — your message has been sent.",
    doneBody: "We'll get back to you shortly.",
    name: "Name",
    email: "Email",
    phone: "Phone (optional)",
    organization: "Organization (optional)",
    reachingAs: "I'm reaching out as",
    types: {
      general_contact: "General inquiry",
      property_manager_help: "Property manager — need sourcing help",
      vendor_question: "Trade / vendor question",
    },
    message: "Message",
    sending: "Sending…",
    send: "Send message",
  },
  referForm: {
    received: "Referral received.",
    another: "Want to refer another? Refresh the page.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    city: "City",
    cityPlaceholder: "Toronto",
    province: "Province",
    youTitle: "You",
    yourName: "Your name",
    yourEmail: "Your email",
    affiliation: "Affiliation (optional)",
    contactSub: "Optional — if you don't have their permission to share, leave blank and we'll work with you to introduce.",
    submitting: "Submitting…",
    submit: "Submit referral",
    trade: {
      companyTitle: "The trade company",
      companySub: "Tell us about the contractor or service company you're recommending.",
      companyName: "Company name",
      companyNamePlaceholder: "e.g. Northline Electrical Ltd.",
      category: "Trade category",
      categoryPlaceholder: "e.g. Electrical, HVAC, Roofing",
      website: "Website",
      why: "Why this trade? (optional)",
      whyPlaceholder: "A line or two about why they'd be a fit for PMRFP — commercial focus, reputation, capacity, etc.",
      contactTitle: "Trade contact",
      youSub: "So we can pay your finder's fee (if the trade subscribes) + send you monthly updates.",
      affiliationPlaceholder: "e.g. PM at FirstService Residential, REA at Royal LePage",
      permission: "I confirm I have the trade contact's permission to share their information, OR I'm introducing them to PMRFP myself.",
      fine: "Finder's fee: ${fee} {currency} for an annual Trade Pro plan (paid ~30 days after their payment clears), or ${feeMonthly} for a monthly plan (after their third payment clears) — once settled, no refund or dispute, by e-transfer.",
    },
    project: {
      projectTitle: "The project",
      projectSub: "Tell us what needs doing. The more specific, the faster we can structure the RFP.",
      what: "What's the project?",
      whatPlaceholder: "e.g. Pre-listing repairs at a 25-unit condo in midtown Toronto — roof patch, lobby paint, two failed HVAC units.",
      category: "Trade category (if known)",
      categoryPlaceholder: "e.g. Roofing, HVAC, General Contracting",
      propertyType: "Property type (if known)",
      propertyTypePlaceholder: "e.g. Condo, Office, Retail, Multi-unit residential",
      contactTitle: "The property contact",
      youSub: "So we can pay your finder's fee + send you monthly updates.",
      affiliationPlaceholder: "e.g. Realtor at Royal LePage, Mortgage broker at TD",
      permission: "I confirm I have the property contact's permission to share their information, OR I'm introducing them to PMRFP myself.",
      fine: "What you get: public credit on the live RFP + a spot on the Top Connectors leaderboard. Know a trade instead? Refer them to Trade Pro for up to ${fee} cash.",
    },
    /**
     * Messages the referral server actions (lib/refer/actions.ts) and their
     * zod schemas (lib/validations.ts) return, word for word. The forms look
     * the English message up here and show the same key in the visitor's
     * language. Keep these identical to the server strings.
     */
    server: {
      rateLimit: "Too many submissions. Please wait a minute and try again.",
      incomplete: "Please complete the required fields.",
      honeypot: "Thanks — we received your referral and will be in touch.",
      projectSuccess:
        "Thanks for the referral. We'll review within one business day and reach out to you or the property contact next. When the RFP goes live, you'll get public credit on the listing + a spot on the Top Connectors leaderboard.",
      tradeSuccess:
        "Thanks for the referral. We'll review within one business day and reach out to you or the trade contact next. The $75 finder's fee is paid about 30 days after their Trade Pro payment clears (so we're protected from chargebacks), by e-transfer.",
      describeMore: "Tell us a bit more (30+ characters)",
      cityRequired: "City is required",
      provinceRequired: "Province is required",
      nameRequired: "Your name is required",
      validEmail: "Enter a valid email",
      companyRequired: "Trade company name is required",
      projectPermission:
        "Please confirm you have the property contact's permission, or that you're introducing them to PMRFP yourself.",
      tradePermission:
        "Please confirm you have the trade contact's permission, or that you're introducing them to PMRFP yourself.",
    },
    /** Shown (outside English) when the server returns a message not listed above. */
    serverFallback: "Please check the form and try again.",
  },
};

const fr: typeof en = {
  contactForm: {
    sent: "Message envoyé — nous vous répondrons sous peu.",
    failed: "Une erreur s'est produite. Veuillez réessayer.",
    doneTitle: "Merci — votre message a été envoyé.",
    doneBody: "Nous vous répondrons sous peu.",
    name: "Nom",
    email: "Courriel",
    phone: "Téléphone (facultatif)",
    organization: "Organisation (facultatif)",
    reachingAs: "Je vous écris en tant que",
    types: {
      general_contact: "Demande générale",
      property_manager_help: "Gestionnaire immobilier — besoin d'aide pour trouver des fournisseurs",
      vendor_question: "Question d'entrepreneur ou de fournisseur",
    },
    message: "Message",
    sending: "Envoi…",
    send: "Envoyer le message",
  },
  referForm: {
    received: "Recommandation reçue.",
    another: "Vous voulez en recommander un autre? Actualisez la page.",
    name: "Nom",
    email: "Courriel",
    phone: "Téléphone",
    city: "Ville",
    cityPlaceholder: "Montréal",
    province: "Province",
    youTitle: "Vous",
    yourName: "Votre nom",
    yourEmail: "Votre courriel",
    affiliation: "Affiliation (facultatif)",
    contactSub:
      "Facultatif — si vous n'avez pas sa permission de transmettre ses coordonnées, laissez ces champs vides et nous ferons la présentation avec vous.",
    submitting: "Envoi…",
    submit: "Envoyer la recommandation",
    trade: {
      companyTitle: "L'entreprise",
      companySub: "Parlez-nous de l'entrepreneur ou de l'entreprise de services que vous recommandez.",
      companyName: "Nom de l'entreprise",
      companyNamePlaceholder: "ex. Électricité Nordique inc.",
      category: "Corps de métier",
      categoryPlaceholder: "ex. Électricité, CVC, Toiture",
      website: "Site Web",
      why: "Pourquoi cet entrepreneur? (facultatif)",
      whyPlaceholder:
        "Une ligne ou deux sur ce qui en fait un bon candidat pour PMRFP — travaux commerciaux, réputation, capacité, etc.",
      contactTitle: "Personne-ressource de l'entreprise",
      youSub: "Pour vous verser votre prime d'apporteur (si l'entrepreneur s'abonne) et vous envoyer des nouvelles chaque mois.",
      affiliationPlaceholder: "ex. gestionnaire chez FirstService Residential, courtier chez Royal LePage",
      permission:
        "Je confirme avoir la permission de la personne-ressource de l'entreprise pour transmettre ses coordonnées, OU je la présente moi-même à PMRFP.",
      fine: "Prime d'apporteur : {fee} $ {currency} pour un forfait Trade Pro annuel (versée environ 30 jours après l'encaissement de son paiement) ou {feeMonthly} $ pour un forfait mensuel (après l'encaissement de son troisième paiement) — une fois le paiement réglé, sans remboursement ni contestation, par virement Interac.",
    },
    project: {
      projectTitle: "Le projet",
      projectSub: "Dites-nous ce qui doit être fait. Plus c'est précis, plus vite nous pourrons structurer l'appel d'offres.",
      what: "Quel est le projet?",
      whatPlaceholder:
        "ex. Réparations avant mise en vente dans une copropriété de 25 unités à Montréal — réparation de toiture, peinture du hall, deux unités CVC en panne.",
      category: "Corps de métier (si connu)",
      categoryPlaceholder: "ex. Toiture, CVC, Entrepreneur général",
      propertyType: "Type d'immeuble (si connu)",
      propertyTypePlaceholder: "ex. Copropriété, bureaux, commerce de détail, résidentiel multilogement",
      contactTitle: "La personne-ressource de l'immeuble",
      youSub: "Pour vous verser votre prime d'apporteur et vous envoyer des nouvelles chaque mois.",
      affiliationPlaceholder: "ex. courtier immobilier chez Royal LePage, courtier hypothécaire chez TD",
      permission:
        "Je confirme avoir la permission de la personne-ressource de l'immeuble pour transmettre ses coordonnées, OU je la présente moi-même à PMRFP.",
      fine: "Ce que vous obtenez : une mention publique sur l'appel d'offres publié et une place au palmarès des meilleurs apporteurs. Vous connaissez plutôt un entrepreneur? Recommandez-le à Trade Pro pour recevoir jusqu'à {fee} $ en argent.",
    },
    server: {
      rateLimit: "Trop d'envois. Attendez une minute, puis réessayez.",
      incomplete: "Veuillez remplir les champs obligatoires.",
      honeypot: "Merci — nous avons bien reçu votre recommandation et nous communiquerons avec vous.",
      projectSuccess:
        "Merci pour la recommandation. Nous l'examinerons dans un délai d'un jour ouvrable, puis nous communiquerons avec vous ou avec la personne-ressource de l'immeuble. Quand l'appel d'offres sera publié, vous obtiendrez une mention publique sur l'annonce et une place au palmarès des meilleurs apporteurs.",
      tradeSuccess:
        "Merci pour la recommandation. Nous l'examinerons dans un délai d'un jour ouvrable, puis nous communiquerons avec vous ou avec la personne-ressource de l'entreprise. La prime d'apporteur de 75 $ est versée par virement Interac environ 30 jours après l'encaissement de son paiement Trade Pro (pour nous protéger contre les rétrofacturations).",
      describeMore: "Donnez-nous un peu plus de détails (30 caractères ou plus).",
      cityRequired: "La ville est obligatoire.",
      provinceRequired: "La province est obligatoire.",
      nameRequired: "Votre nom est obligatoire.",
      validEmail: "Entrez une adresse courriel valide.",
      companyRequired: "Le nom de l'entreprise est obligatoire.",
      projectPermission:
        "Veuillez confirmer que vous avez la permission de la personne-ressource de l'immeuble, ou que vous la présentez vous-même à PMRFP.",
      tradePermission:
        "Veuillez confirmer que vous avez la permission de la personne-ressource de l'entreprise, ou que vous la présentez vous-même à PMRFP.",
    },
    serverFallback: "Vérifiez les champs du formulaire, puis réessayez.",
  },
};

const es: typeof en = {
  contactForm: {
    sent: "Mensaje enviado. Nos pondremos en contacto con usted.",
    failed: "Algo salió mal. Inténtelo de nuevo.",
    doneTitle: "Gracias. Su mensaje fue enviado.",
    doneBody: "Le responderemos en breve.",
    name: "Nombre",
    email: "Correo electrónico",
    phone: "Teléfono (opcional)",
    organization: "Organización (opcional)",
    reachingAs: "Le escribo como",
    types: {
      general_contact: "Consulta general",
      property_manager_help: "Administrador de propiedades: necesito ayuda para encontrar proveedores",
      vendor_question: "Pregunta de contratista o proveedor",
    },
    message: "Mensaje",
    sending: "Enviando…",
    send: "Enviar mensaje",
  },
  referForm: {
    received: "Recomendación recibida.",
    another: "¿Quiere recomendar a alguien más? Actualice la página.",
    name: "Nombre",
    email: "Correo electrónico",
    phone: "Teléfono",
    city: "Ciudad",
    cityPlaceholder: "Toronto",
    province: "Provincia",
    youTitle: "Usted",
    yourName: "Su nombre",
    yourEmail: "Su correo electrónico",
    affiliation: "Afiliación (opcional)",
    contactSub:
      "Opcional: si no tiene su permiso para compartir sus datos, deje estos campos en blanco y trabajaremos con usted para hacer la presentación.",
    submitting: "Enviando…",
    submit: "Enviar recomendación",
    trade: {
      companyTitle: "La empresa contratista",
      companySub: "Cuéntenos sobre el contratista o la empresa de servicios que recomienda.",
      companyName: "Nombre de la empresa",
      companyNamePlaceholder: "p. ej., Northline Electrical Ltd.",
      category: "Oficio",
      categoryPlaceholder: "p. ej., Electricidad, HVAC, Techado",
      website: "Sitio web",
      why: "¿Por qué este contratista? (opcional)",
      whyPlaceholder:
        "Una o dos líneas sobre por qué encajaría en PMRFP: enfoque comercial, reputación, capacidad, etc.",
      contactTitle: "Contacto de la empresa",
      youSub: "Para poder pagarle su comisión por referido (si el contratista se suscribe) y enviarle novedades cada mes.",
      affiliationPlaceholder: "p. ej., administrador en FirstService Residential, agente inmobiliario en Royal LePage",
      permission:
        "Confirmo que tengo el permiso del contacto de la empresa para compartir su información, O que yo mismo lo presento a PMRFP.",
      fine: "Comisión por referido: ${fee} {currency} por un plan anual de Trade Pro (se paga unos 30 días después de que se acredite su pago) o ${feeMonthly} por un plan mensual (después de que se acredite su tercer pago); una vez liquidada, sin reembolso ni disputa, por transferencia electrónica Interac.",
    },
    project: {
      projectTitle: "El proyecto",
      projectSub: "Cuéntenos qué hay que hacer. Cuanto más específico, más rápido podremos estructurar la solicitud de propuestas.",
      what: "¿Cuál es el proyecto?",
      whatPlaceholder:
        "p. ej., Reparaciones antes de la venta en un condominio de 25 unidades en el centro de Toronto: parche en el techo, pintura del vestíbulo, dos unidades de HVAC averiadas.",
      category: "Oficio (si lo sabe)",
      categoryPlaceholder: "p. ej., Techado, HVAC, Contratista general",
      propertyType: "Tipo de propiedad (si lo sabe)",
      propertyTypePlaceholder: "p. ej., Condominio, Oficinas, Comercio minorista, Residencial multifamiliar",
      contactTitle: "El contacto de la propiedad",
      youSub: "Para poder pagarle su comisión por referido y enviarle novedades cada mes.",
      affiliationPlaceholder: "p. ej., agente inmobiliario en Royal LePage, corredor hipotecario en TD",
      permission:
        "Confirmo que tengo el permiso del contacto de la propiedad para compartir su información, O que yo mismo lo presento a PMRFP.",
      fine: "Lo que obtiene: reconocimiento público en la solicitud de propuestas publicada y un lugar en la clasificación Top Connectors. ¿Conoce más bien a un contratista? Recomiéndelo a Trade Pro y gane hasta ${fee} en efectivo.",
    },
    server: {
      rateLimit: "Demasiados envíos. Espere un minuto e inténtelo de nuevo.",
      incomplete: "Complete los campos obligatorios.",
      honeypot: "Gracias. Recibimos su recomendación y nos pondremos en contacto con usted.",
      projectSuccess:
        "Gracias por la recomendación. La revisaremos en un plazo de un día hábil y luego nos comunicaremos con usted o con el contacto de la propiedad. Cuando la solicitud de propuestas se publique, obtendrá reconocimiento público en el anuncio y un lugar en la clasificación Top Connectors.",
      tradeSuccess:
        "Gracias por la recomendación. La revisaremos en un plazo de un día hábil y luego nos comunicaremos con usted o con el contacto de la empresa. La comisión por referido de $75 se paga por transferencia electrónica Interac unos 30 días después de que se acredite su pago de Trade Pro (así nos protegemos de los contracargos).",
      describeMore: "Cuéntenos un poco más (30 caracteres o más)",
      cityRequired: "La ciudad es obligatoria",
      provinceRequired: "La provincia es obligatoria",
      nameRequired: "Su nombre es obligatorio",
      validEmail: "Ingrese un correo electrónico válido",
      companyRequired: "El nombre de la empresa es obligatorio",
      projectPermission:
        "Confirme que tiene el permiso del contacto de la propiedad, o que usted mismo lo presenta a PMRFP.",
      tradePermission:
        "Confirme que tiene el permiso del contacto de la empresa, o que usted mismo lo presenta a PMRFP.",
    },
    serverFallback: "Revise el formulario e inténtelo de nuevo.",
  },
};

type ServerKey = keyof typeof en.referForm.server;

/**
 * The key of an English message returned by the referral actions, so the
 * form can show it in the visitor's language. Undefined for anything unlisted.
 */
export function referServerMessageKey(message: string): ServerKey | undefined {
  return (Object.keys(en.referForm.server) as ServerKey[]).find((k) => en.referForm.server[k] === message);
}

export default { en, fr, es };
