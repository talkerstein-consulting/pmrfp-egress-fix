/** Strings for this area. `fr` is typed against `en`, so every key must exist in both. */
const en = {
  intro: {
    name: "Your name",
    email: "Your email",
    message: "Tell {name} a bit about your project (optional)",
    submit: "Request introduction",
    sending: "Sending…",
    sentTitle: "Request sent",
    sentBody: "We'll pass your request along to {name}.",
    error: "Something went wrong. Please try again.",
    done: "Thanks — your introduction request has been sent.",
  },
  founding: {
    eyebrow: "Founding region",
    earlyEyebrow: "Early access",
    requestTitle: "We don't cover {region} yet",
    requestBody:
      "Add yourself and we'll prioritize building trade coverage in {region} — you'll be the first to know when it opens.",
    directoryTitle: "We're building our trade network in {region}",
    directoryBody:
      "{region} is a founding region — we're recruiting commercial trades here now. Join the list and we'll alert you the moment there's coverage.",
    rfpTitle: "{region} is just getting started",
    rfpBody:
      "Your RFP is live, but we're still recruiting trades in {region}. We'll notify you the moment matching trades join — and your listing is ready for them.",
    earlyTitle: "Be first in {region}",
    earlyBody: "Join the list and we'll email you as PMRFP activity grows in {region}.",
    referBefore: "Know a great commercial trade in {region}?",
    referLink: "Refer them to Trade Pro and earn up to $75",
    referAfter: "when they subscribe — it's how founding regions get built.",
  },
  waitlist: {
    emailLabel: "Email address",
    placeholder: "you@company.com",
    join: "Join the list",
    adding: "Adding…",
    success: "You're on the list — we'll email you the moment trades are active in your area.",
    errors: {
      rateLimit: "Too many submissions. Please wait a minute and try again.",
      invalidEmail: "Enter a valid email",
      failed: "Something went wrong saving your spot. Please try again.",
    },
  },
};

const fr: typeof en = {
  intro: {
    name: "Votre nom",
    email: "Votre courriel",
    message: "Parlez un peu de votre projet à {name} (facultatif)",
    submit: "Demander une mise en relation",
    sending: "Envoi…",
    sentTitle: "Demande envoyée",
    sentBody: "Nous transmettrons votre demande à {name}.",
    error: "Une erreur est survenue. Veuillez réessayer.",
    done: "Merci! Votre demande de mise en relation a été envoyée.",
  },
  founding: {
    eyebrow: "Région fondatrice",
    earlyEyebrow: "Accès anticipé",
    requestTitle: "{region} : pas encore de couverture",
    requestBody:
      "Inscrivez-vous et nous accorderons la priorité au recrutement d'entrepreneurs dans cette région. Vous serez parmi les premiers avisés dès l'ouverture.",
    directoryTitle: "{region} : notre réseau d'entrepreneurs prend forme",
    directoryBody:
      "C'est une région fondatrice : nous y recrutons en ce moment des entrepreneurs commerciaux. Inscrivez-vous et nous vous aviserons dès qu'il y aura de la couverture.",
    rfpTitle: "{region} : ça ne fait que commencer",
    rfpBody:
      "Votre appel d'offres est en ligne, mais nous recrutons encore des entrepreneurs dans cette région. Nous vous aviserons dès que des entrepreneurs correspondants s'inscriront, et votre annonce les attend déjà.",
    earlyTitle: "{region} : soyez parmi les premiers",
    earlyBody: "Inscrivez-vous et nous vous écrirons à mesure que PMRFP prend de l'ampleur dans cette région.",
    referBefore: "Vous connaissez un excellent entrepreneur commercial dans cette région?",
    referLink: "Recommandez-lui Trade Pro et gagnez jusqu'à 75 $",
    referAfter: "lorsqu'il s'abonne : c'est ainsi que se bâtissent les régions fondatrices.",
  },
  waitlist: {
    emailLabel: "Adresse courriel",
    placeholder: "vous@entreprise.com",
    join: "M'inscrire à la liste",
    adding: "Inscription…",
    success: "Vous êtes sur la liste. Nous vous écrirons dès que des entrepreneurs seront actifs dans votre secteur.",
    errors: {
      rateLimit: "Trop de demandes. Veuillez patienter une minute et réessayer.",
      invalidEmail: "Entrez une adresse courriel valide.",
      failed: "Une erreur est survenue lors de votre inscription. Veuillez réessayer.",
    },
  },
};

const es: typeof en = {
  intro: {
    name: "Su nombre",
    email: "Su correo electrónico",
    message: "Cuéntele a {name} un poco sobre su proyecto (opcional)",
    submit: "Solicitar presentación",
    sending: "Enviando…",
    sentTitle: "Solicitud enviada",
    sentBody: "Le haremos llegar su solicitud a {name}.",
    error: "Algo salió mal. Inténtelo de nuevo.",
    done: "Gracias. Su solicitud de presentación fue enviada.",
  },
  founding: {
    eyebrow: "Región fundadora",
    earlyEyebrow: "Acceso anticipado",
    requestTitle: "Todavía no tenemos cobertura en {region}",
    requestBody:
      "Anótese y daremos prioridad a reclutar contratistas en {region}. Usted será de los primeros en saber cuando abra.",
    directoryTitle: "Estamos formando nuestra red de contratistas en {region}",
    directoryBody:
      "{region} es una región fundadora: ahora mismo estamos reclutando contratistas comerciales aquí. Anótese en la lista y le avisaremos en cuanto haya cobertura.",
    rfpTitle: "{region} apenas está comenzando",
    rfpBody:
      "Su solicitud de propuestas ya está publicada, pero todavía estamos reclutando contratistas en {region}. Le avisaremos en cuanto se registren contratistas que coincidan, y su publicación ya los estará esperando.",
    earlyTitle: "Sea de los primeros en {region}",
    earlyBody: "Anótese en la lista y le escribiremos a medida que crezca la actividad de PMRFP en {region}.",
    referBefore: "¿Conoce a un excelente contratista comercial en {region}?",
    referLink: "Recomiéndele Trade Pro y gane hasta $75",
    referAfter: "cuando se suscriba: así se construyen las regiones fundadoras.",
  },
  waitlist: {
    emailLabel: "Correo electrónico",
    placeholder: "usted@empresa.com",
    join: "Anotarme en la lista",
    adding: "Agregando…",
    success: "Ya está en la lista. Le escribiremos en cuanto haya contratistas activos en su zona.",
    errors: {
      rateLimit: "Demasiados envíos. Espere un minuto e inténtelo de nuevo.",
      invalidEmail: "Ingrese un correo electrónico válido",
      failed: "Algo salió mal al guardar su lugar. Inténtelo de nuevo.",
    },
  },
};

export default { en, fr, es };
