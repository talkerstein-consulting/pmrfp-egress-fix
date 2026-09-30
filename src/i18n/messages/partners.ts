/**
 * Partner and data pages (server): /advertise, /widgets, /badge, /trusted/[handle],
 * /gc-packages/new, /contract-winners and /reports/public-building-contracts.
 * Sponsor package names live in partnersClient (the enquiry form needs them too).
 * `fr` and `es` are typed against `en`, so every key must exist in each.
 */
const en = {
  crumbs: {
    home: "Home",
    advertise: "Advertise",
    winners: "Contract winners",
    report: "Report",
  },

  // ---------- /advertise ----------
  advertise: {
    meta: {
      title: "Advertise to Commercial Trades",
      description:
        "Sponsor PMRFP and reach the trades bidding on commercial property work in Canada and the U.S. Matched to trade, clearly labelled, clicks reported monthly.",
    },
    hero: {
      eyebrow: "Sponsor {site}",
      title: "Reach the trades bidding on commercial property work.",
      body: "Electricians, HVAC contractors, roofers, cleaners and other trades use {site} to find public tenders and property-manager RFPs in their trade and region. Put your brand beside the work they're pricing.",
      cta: "Ask about a spot",
      packages: "See packages",
      from: "From {price} a month. One sponsor per trade.",
    },
    sources: {
      label: "Tenders pulled every morning from",
      names: ["CanadaBuys", "SAM.gov", "City of Toronto", "Québec SEAO", "Nova Scotia", "Yukon"],
      more: "+ property managers",
    },
    reach: {
      open: "open tenders and RFPs right now",
      categories: "trade categories, each with its own pages",
      regionsUs: "regions across Canada and the U.S.",
      regionsCa: "regions across Canada",
      awarded: "in past public contracts on the board",
      posted: "tenders and RFPs posted in the last 30 days",
      trades: "trade companies listed",
      sources: "public tender sources, checked every morning",
      note: "Live from the board, refreshed hourly. We don't quote traffic estimates. Sponsors get a monthly report of real clicks.",
    },
    audiences: {
      eyebrow: "Who it's for",
      title: "Built for companies that sell to trades",
      description:
        "If electricians, HVAC techs, roofers, plumbers or cleaning crews buy from you, this is where they look for their next job.",
      items: [
        {
          title: "Suppliers and distributors",
          body: "Electrical, HVAC, plumbing, roofing and janitorial supply. Reach trades while they price the materials for a job.",
        },
        {
          title: "Equipment dealers and rental",
          body: "Lifts, plows, compressors and site equipment, in front of crews gearing up for the work they bid on.",
        },
        {
          title: "Insurance, bonding and surety",
          body: "Public tenders often ask for bid bonds and proof of insurance. Be there when a trade reads those requirements.",
        },
        {
          title: "Lenders and payments",
          body: "Equipment finance, working capital and card processing for trades taking on bigger contracts.",
        },
        {
          title: "Software for trades",
          body: "Estimating, scheduling, field service and invoicing tools, shown to the trades they were built for.",
        },
        {
          title: "Staffing",
          body: "Skilled labour and crew staffing for trades that win more work than they can crew.",
        },
      ],
    },
    principles: {
      eyebrow: "How placements work",
      title: "Relevant, labelled, one at a time",
      description: "Sponsors sit inside the pages and emails trades already use to find work, matched to what they do.",
      items: [
        {
          title: "Relevant only",
          body: "An electrical supplier shows on electrical pages and in electricians' emails. If a page has nothing to do with what you sell, you're not on it.",
        },
        {
          title: "One sponsor per slot",
          body: "One card per page, one row per email. No banner grids, no row of logos fighting for attention.",
        },
        {
          title: "Clearly labelled",
          body: "Every placement carries a “Sponsored” label. Trades trust the board because ads never pose as listings.",
        },
        {
          title: "Clicks tracked, reported monthly",
          body: "Each click runs through a tracked link and lands on your site with UTM tags, so you see the visits in your own analytics too.",
        },
      ],
    },
    placements: {
      eyebrow: "Where you appear",
      title: "On the pages and emails trades use to find work",
      items: [
        { name: "Trade pages", where: "The page for each trade, and for each trade in each city.", packages: "All packages" },
        { name: "Tender and RFP pages", where: "The sidebar beside the scope, on every matching tender.", packages: "All packages" },
        { name: "Trade dashboard", where: "What members in that trade see when they sign in.", packages: "Trade Spotlight, Founding Partner" },
        { name: "Daily match email", where: "Sent to Trade Pro members the morning a matching tender posts.", packages: "All packages" },
        { name: "Weekly tender digest", where: "A weekly roundup of new tenders in each member's trade.", packages: "Founding Partner" },
      ],
      busiest: "Open right now, by trade",
      busiestNote: "Open tenders and RFPs on the board. A Trade Spotlight appears on the tender pages in its trade.",
    },
    packages: {
      eyebrow: "Packages",
      title: "Pick your spot",
      description: "Billed monthly in Canadian dollars. Pay for a year up front and get two months free.",
      perMonth: "CAD / month",
      yearly: "or {price} a year, two months free",
      ask: "Ask about {name}",
      terms: [
        "One sponsor per trade, first come first served.",
        "Live within one business day of getting your logo and copy.",
        "Monthly plans cancel any time.",
        "Prices in CAD, plus applicable taxes.",
      ],
      founding: "Founding partners",
    },
    enquire: {
      eyebrow: "Enquire",
      title: "Ask about a spot",
      body: "Tell us what you sell and who you want to reach. We'll reply with the trades still open, and a mock-up of your placement.",
      needTitle: "What we need to go live",
      need: ["Your logo", "A headline and one or two sentences", "Button text and the page clicks should land on"],
      draft: "Not sure what to say? We can draft the copy with you.",
      email: "Rather email?",
      emailSubject: "Sponsorship",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Sponsorship questions",
      items: [
        {
          q: "Who sees my brand?",
          a: "Trades and service companies using PMRFP to find commercial property work: people reading trade and tender pages, members on their dashboard, and trades opening their match and digest emails. You only appear to the trades in your package.",
        },
        {
          q: "How does relevance work?",
          a: "Each sponsor is matched to trades. An electrical supplier appears on electrical pages and closely related ones such as lighting and EV charging, and in those trades' emails. If nothing on a page fits a sponsor, no sponsor is shown.",
        },
        {
          q: "What reporting do I get?",
          a: "A monthly report of clicks by placement (trade pages, tender pages, dashboard, emails) and by trade. Every link carries UTM tags (utm_source=pmrfp), so the visits also show up in your own analytics. We report clicks we can count. We don't sell impressions or estimates.",
        },
        {
          q: "Can I pick my trade?",
          a: "Yes. Tell us the trade you want. There is one Spotlight sponsor per trade, first come first served. If yours is taken, we'll tell you what's open.",
        },
        {
          q: "How do Founding Partners and Spotlights share space?",
          a: "A Trade Spotlight sponsor always holds its own trade. Founding Partners appear across every other trade, and in the weekly tender digest, which Spotlights don't include.",
        },
        {
          q: "What does the “Sponsored” label look like?",
          a: "Like the samples on this page: one card or one email row, with a small “Sponsored” label above your logo and message. Links are marked as sponsored for search engines. Sponsors never appear on a company's own profile, or on sign-up, pricing or billing pages.",
        },
        {
          q: "Can I cancel?",
          a: "Yes. Monthly plans cancel any time, and your spot runs to the end of the month you've paid for. Paying for a year up front costs 10 months instead of 12. Founding Partner pricing is locked for 12 months.",
        },
      ],
    },
    cta: {
      title: "Own your trade on PMRFP.",
      description: "One sponsor per trade, first come first served. Tell us what you sell and we'll show you what's open.",
      primary: "Ask about a spot",
      secondary: "See the board",
    },
    /** Sample placements (components/advertise/sponsor-mock). */
    mock: {
      headline: "Pricing the materials on this job?",
      body: "Lighting, breakers and wiring devices, shipped to the job site. Contractor pricing on account.",
      cta: "Get a supply quote",
      monogram: "YB",
      cardAria: 'Sample sponsor card labelled Sponsored, from "Your brand": {headline}',
      sponsored: "Sponsored",
      sample: "Sample",
      tenderTag: "Electrical · Public tender",
      tenderCaption: "Sample: a Trade Spotlight in the sidebar of an electrical tender.",
      emailSubject: "New Electrical matches on PMRFP today",
      emailMeta: "Daily match email · sample",
      emailCaption: "Sample: one labelled row under the matches, never above them.",
    },
  },

  // ---------- /widgets ----------
  widgets: {
    meta: {
      title: "Free Website Widgets for Trades, Property Managers & Realtors",
      description:
        "Put live PMRFP content on your own website: a tender feed for your trade and region, your open bids, your jobs, your company card or your trusted trades. Copy, paste, done. Free.",
    },
    eyebrow: "Free website widgets",
    title: "Put {site} on your own website",
    body: "Live tenders, your open bids, your jobs, your company card or your trusted trades, updated automatically. Pick one, copy two lines of code, paste. Works on WordPress, Wix, Squarespace, Webflow and hand-built sites.",
    points: [
      "Always current. Nothing to update by hand.",
      "Loads after your page, so it never slows your site.",
      "Read-only. No cookies, no tracking of your visitors.",
      "Resizes itself to fit. Light and dark styles.",
    ],
    whereTitle: "Where to paste it",
    where: [
      { title: "WordPress", desc: "Edit the page, add a Custom HTML block where you want the widget, paste the code, update." },
      { title: "Wix", desc: "Add → Embed Code → Embed HTML, choose Code, paste. Drag the box to size it." },
      { title: "Squarespace", desc: "Edit the page, add a Code block, paste the code, save." },
      { title: "Webflow & others", desc: "Add an Embed (or HTML) element and paste. Any site that accepts HTML works." },
    ],
    footBefore: "Someone else runs your website? Send them this page. Want the simple version?",
    footLink: "Get the {site} badge",
    footAfter: ".",
  },

  // ---------- /badge ----------
  badge: {
    meta: {
      title: "Free Website Badge for Commercial Trades",
      description:
        "Add the free PMRFP badge to your website and email signature. Property managers who click it see your company profile — trades, regions, insurance — which links back to your site.",
    },
    eyebrow: "Free for listed companies",
    title: "Put your {site} badge on your website",
    body: "Free for every listed company. Add it to your website footer, your quotes and your email signature. A property manager who clicks it lands on your {site} profile — your trades, regions, insurance and projects — and your profile links straight back to your website.",
    bullets: [
      "Shows buyers you're set up for commercial work before they call.",
      "Updates itself — the badge always reflects your current {site} status.",
      "Takes two minutes: copy the code below and paste it into your site.",
    ],
    linked: {
      before: "This is the badge for ",
      mid: ". Copy the code below — it links to ",
      profile: "your {site} profile",
      edit: ". Want to edit that profile? ",
      create: "Create your free account",
      end: ".",
    },
    sample: {
      incomplete: "Complete your company profile to generate your own badge. ",
      viewing: "You're viewing a sample badge. ",
      join: "Join {site}",
      after: " to get yours.",
    },
    more: {
      title: "Want more than a badge?",
      body: "The company card widget shows your trades, service area and a Request a quote button, right on your site.",
      cta: "Get the card",
    },
    whereTitle: "Where to paste it",
    where: [
      {
        title: "WordPress",
        desc: "Appearance → Widgets (or the Site Editor) → add a Custom HTML block to your footer → paste the website code.",
      },
      { title: "Wix", desc: "Add → Embed Code → Embed HTML → paste the website code, then drag it into your footer." },
      { title: "Squarespace", desc: "Edit your footer → add a Code block → paste the website code." },
      {
        title: "Email & quotes",
        desc: "Paste the email-signature line into Gmail or Outlook signature settings, and at the bottom of your quote template.",
      },
    ],
    whereNote: "Someone else runs your website? Send them this page — the code works on any site.",
    tiersTitle: "Badge tiers",
    tiersNote: "Your badge gets stronger as you complete your profile.",
    tiers: [
      { title: "Listed Vendor", desc: "You have an approved profile in the PMRFP directory." },
      {
        title: "Verified Vendor",
        desc: "Company details reviewed by the PMRFP team. Buyers should still confirm licensing and insurance directly.",
      },
      {
        title: "+ Insured",
        desc: "Insurance details listed on your profile (self-reported). Not shown on the badge image — buyers confirm coverage with you.",
      },
    ],
    update: "Update my profile",
    get: "Get my badge",
    browse: "Browse the directory",
    view: "View profile",
    disclaimer:
      "The badge reflects your current {site} status and does not guarantee work or constitute an endorsement of any specific project outcome.",
  },

  // ---------- /trusted/[handle] ----------
  trusted: {
    meta: {
      notFound: "Page not found",
      title: "{name}'s trusted trades",
      description: "The trades {who} trusts with clients' homes and buildings.",
    },
    eyebrow: "Trusted trades",
    headline: "The trades {first} trusts with clients' homes and buildings.",
    call: "Call {first}",
    email: "Email {first}",
    empty: "{first} hasn't added any trades yet.",
    disclaimer:
      "{name} chose these companies. Each one is listed on PMRFP, where property managers and realtors find trades. Always confirm licensing, insurance and pricing for your own project.",
    realtor: {
      title: "Realtor? Make your own page.",
      body: "Save the trades you trust, add a note on each, and send clients one link. Free for up to 5 trades.",
      cta: "Create your trusted-trades page",
    },
    trade: {
      title: "Run a trade company?",
      body: "Get listed free so realtors and property managers can add you to their pages.",
      cta: "List your company",
    },
  },

  // ---------- /gc-packages/new ----------
  gcStart: {
    metaTitle: "Post a sub-trade package",
    title: "Sub-trade packages are posted from a contractor account",
    body: "You're signed in with a {kind} account. To post packages for a job you're running, create a separate general contractor account with another email, or email us at ",
    kindTrade: "trade",
    kindOther: "non-contractor",
    after: " and we'll post it for you.",
    back: "← Back to {site}",
  },

  // ---------- /contract-winners ----------
  winners: {
    meta: {
      title: "Who Wins Public Property Contracts in Canada",
      description:
        "The companies winning public building, maintenance and service contracts across Canada — how many, for how much, and from which buyers. Compiled from official award notices.",
    },
    eyebrow: "Public award notices · Canada",
    title: "Who wins public property contracts in Canada.",
    body: "The companies that keep winning building, maintenance and service contracts — how often, for how much, and from which buyers. Every figure comes from an official award notice.",
    reportLink: "Read the data report: how concentrated is public building work?",
    stats: { repeat: "Repeat winners", contracts: "Contracts", awarded: "Awarded" },
    cols: { company: "Company", contracts: "Contracts", total: "Total value", recent: "Most recent" },
    contractsSuffix: " contracts",
    ctaTitle: "These companies heard about the work first.",
    ctaBody: "Trade Pro emails you the day a tender in your trade posts — full scope, buyer contact, closing date.",
    ctaButton: "Start Trade Pro — ${price}/mo",
    footnote:
      "Only companies with two or more public awards on record are listed. Compiled from award notices published under the Open Government Licences of Canada, Toronto and Nova Scotia, and SEAO (Données Québec, CC BY 4.0). Listing implies no affiliation with PMRFP.",
  },

  // ---------- /contract-winners/[slug] ----------
  winner: {
    meta: {
      notFound: "Contract winner not found",
      title: "{name} — {n} public contracts won{value}",
      description: "{name} won {n} public contracts{worth} from {issuers}{trades}. See every award, value and date.",
      worth: " worth {amount}",
      and: " and ",
    },
    back: "← All contract winners",
    eyebrow: "Public contract winner",
    stats: {
      won: "Contracts won",
      total: "Total value",
      notDisclosed: "Not disclosed",
      average: "Average contract",
      recent: "Most recent",
    },
    listEyebrow: "Every award on record",
    listTitle: "Contracts won by {name}",
    valueNotDisclosed: "Value not disclosed",
    footnote:
      "Compiled from public award notices published by {issuers}. {attributions} These contracts were awarded directly by the public buyer — not through {site}. Listing here is not an endorsement and implies no affiliation with {site}.",
    open: {
      title: { one: "{n} tender like these is open right now", other: "{n} tenders like these are open right now" },
      none: "Bid on the next one",
      body: "Trade Pro emails you the day a new tender in your trade and region is posted — with the full scope and the buyer's contact — so you're bidding, not reading about who won.",
      cta: "Start Trade Pro — ${price}/mo",
      closes: "Closes {date}",
    },
    gcTitle: "Won one of these contracts?",
    claim: {
      title: "Is this your company?",
      body: "Get a free {site} profile so property managers can find you, and a badge for your website.",
      cta: "Claim a free profile",
    },
  },

  // ---------- /reports/public-building-contracts ----------
  report: {
    meta: {
      title: "Who Wins Public Building Contracts in Canada: Data Report",
      description:
        "A year of public building and property contracts in Canada: how many, for how much, and how concentrated. Compiled from official award notices (CanadaBuys, Quebec SEAO, City of Toronto, Nova Scotia). Updated daily, free to cite.",
    },
    dataset: {
      name: "Public building and property contracts in Canada",
      description:
        "Award notices for public building, maintenance and property-service contracts in Canada (federal CanadaBuys, Quebec SEAO, City of Toronto, Nova Scotia): contract, winning company, published value, date and trade. Compiled and updated daily by PMRFP from official open data.",
    },
    eyebrow: "Data report · updated daily",
    title: "Who wins public building contracts in Canada.",
    lead: "{contracts} awarded contracts for building, maintenance and property services, {value} in published value, {winners} different winners. {period}.",
    period: "{from} to {to}",
    download: "Download the data (CSV)",
    cite: "Cite this report",
    findingsTitle: "Key findings",
    findings: {
      top5: "of the dollars went to the top 5% of winners ({n} companies).",
      top10: "went to just ten companies.",
      single: "companies won exactly one contract. The door is wider than it looks.",
      multi: "companies won in more than one jurisdiction.",
    },
    everywhere: {
      one: "Only one company",
      other: "Only {n} companies",
      after: " won contracts in every jurisdiction: ",
      item: " ({contracts} contracts, {value})",
      end: ".",
    },
    byJurisdiction: "By jurisdiction",
    jurisdictionLine: "{value} · {contracts} contracts · {winners} winners",
    byTrade: "By trade",
    cols: { trade: "Trade", contracts: "Contracts", value: "Value" },
    tradeNote: "A contract can count toward more than one trade.",
    topByValue: "Largest winners by value",
    topByCount: "Most contracts won",
    contractCount: { one: "{n} contract", other: "{n} contracts" },
    methodTitle: "Methodology",
    method: {
      sources:
        "Sources: award notices published as open data by the Government of Canada (CanadaBuys), Quebec's SEAO, the City of Toronto and the Province of Nova Scotia, collected daily by {site}. Only contracts for building, maintenance and property services are included (construction and renovation, roofing, HVAC, electrical, plumbing, snow and grounds, janitorial, waste and similar trades), so this is the building-and-property slice of public procurement, not all of it.",
      values:
        'Dollar figures use each notice\'s published award value; {withValue} of {contracts} notices publish one. Winners are grouped across spelling and legal-suffix variants ("Co. Ltd.", "Company Limited"). Individuals are counted in the totals but never named. The median published award is {median}.',
      licences:
        "Licences: Open Government Licence – Canada, Open Government Licence – Toronto, Open Government Licence – Nova Scotia, and SEAO data under CC BY 4.0 (Secrétariat du Conseil du trésor du Québec, Données Québec).",
    },
    citeTitle: "Cite this report",
    citeNote: "Free to use with attribution. Please link to this page.",
    citation: 'PMRFP, "Who wins public building contracts in Canada" ({url}), compiled from official award notices, accessed {date}.',
    linkText: "Public building contracts in Canada (PMRFP data)",
    press: "Press questions or a custom cut of the data: ",
    ctaTitle: "Want to be on the winning side?",
    ctaBody: "Every open tender behind these numbers is on the {site} board. Trade Pro emails you the morning a matching one posts.",
    ctaStart: "Start Trade Pro",
    ctaAll: "All contract winners",
    /** Jurisdiction labels from lib/data/contracts-report (JURISDICTION), by English label. Empty in English. */
    jurisdictions: {} as Record<string, string>,
  },
};

const fr: typeof en = {
  crumbs: {
    home: "Accueil",
    advertise: "Annoncer",
    winners: "Adjudicataires",
    report: "Rapport",
  },

  advertise: {
    meta: {
      title: "Annoncez auprès des entrepreneurs commerciaux",
      description:
        "Commanditez PMRFP et joignez les entrepreneurs qui soumissionnent sur des travaux en immobilier commercial au Canada et aux États-Unis. Jumelé au corps de métier, clairement identifié, clics rapportés chaque mois.",
    },
    hero: {
      eyebrow: "Commanditer {site}",
      title: "Joignez les entrepreneurs qui soumissionnent sur des travaux en immobilier commercial.",
      body: "Électriciens, entrepreneurs en CVC, couvreurs, entreprises d'entretien ménager et autres gens de métier utilisent {site} pour trouver des appels d'offres publics et ceux des gestionnaires immobiliers dans leur corps de métier et leur région. Placez votre marque à côté des travaux qu'ils sont en train de chiffrer.",
      cta: "Demander une place",
      packages: "Voir les forfaits",
      from: "À partir de {price} par mois. Un seul commanditaire par corps de métier.",
    },
    sources: {
      label: "Appels d'offres recueillis chaque matin auprès de",
      names: ["AchatsCanada", "SAM.gov", "Ville de Toronto", "SEAO du Québec", "Nouvelle-Écosse", "Yukon"],
      more: "+ gestionnaires immobiliers",
    },
    reach: {
      open: "appels d'offres ouverts en ce moment",
      categories: "corps de métier, chacun avec ses propres pages",
      regionsUs: "régions au Canada et aux États-Unis",
      regionsCa: "régions au Canada",
      awarded: "en contrats publics octroyés sur le tableau",
      posted: "appels d'offres publiés au cours des 30 derniers jours",
      trades: "entreprises inscrites au répertoire",
      sources: "sources d'appels d'offres publics, vérifiées chaque matin",
      note: "En direct du tableau, mis à jour toutes les heures. Nous ne citons aucune estimation d'achalandage. Les commanditaires reçoivent un rapport mensuel des clics réels.",
    },
    audiences: {
      eyebrow: "Pour qui",
      title: "Conçu pour les entreprises qui vendent aux gens de métier",
      description:
        "Si des électriciens, des techniciens en CVC, des couvreurs, des plombiers ou des équipes d'entretien ménager achètent chez vous, c'est ici qu'ils cherchent leur prochain contrat.",
      items: [
        {
          title: "Fournisseurs et distributeurs",
          body: "Matériel électrique, CVC, plomberie, toiture et produits d'entretien. Joignez les entrepreneurs pendant qu'ils chiffrent les matériaux d'un chantier.",
        },
        {
          title: "Concessionnaires et location d'équipement",
          body: "Nacelles, chasse-neige, compresseurs et équipement de chantier, devant les équipes qui se préparent pour les travaux qu'elles soumissionnent.",
        },
        {
          title: "Assurance, cautionnement et garanties",
          body: "Les appels d'offres publics exigent souvent un cautionnement de soumission et une preuve d'assurance. Soyez là quand un entrepreneur lit ces exigences.",
        },
        {
          title: "Financement et paiements",
          body: "Financement d'équipement, fonds de roulement et traitement des cartes pour les entrepreneurs qui décrochent de plus gros contrats.",
        },
        {
          title: "Logiciels pour gens de métier",
          body: "Outils d'estimation, de planification, de service sur le terrain et de facturation, présentés aux corps de métier pour lesquels ils ont été conçus.",
        },
        {
          title: "Placement de personnel",
          body: "Main-d'œuvre qualifiée et équipes pour les entrepreneurs qui décrochent plus de travail qu'ils ne peuvent en réaliser.",
        },
      ],
    },
    principles: {
      eyebrow: "Comment fonctionnent les placements",
      title: "Pertinents, identifiés, un à la fois",
      description:
        "Les commanditaires apparaissent dans les pages et les courriels que les entrepreneurs utilisent déjà pour trouver du travail, selon ce qu'ils font.",
      items: [
        {
          title: "Pertinents seulement",
          body: "Un fournisseur de matériel électrique apparaît sur les pages en électricité et dans les courriels des électriciens. Si une page n'a rien à voir avec ce que vous vendez, vous n'y êtes pas.",
        },
        {
          title: "Un commanditaire par emplacement",
          body: "Une carte par page, une ligne par courriel. Pas de grille de bannières, pas de rangée de logos qui se disputent l'attention.",
        },
        {
          title: "Clairement identifiés",
          body: "Chaque placement porte la mention « Commandité ». Les entrepreneurs font confiance au tableau parce que les annonces ne se font jamais passer pour des appels d'offres.",
        },
        {
          title: "Clics suivis, rapportés chaque mois",
          body: "Chaque clic passe par un lien suivi et arrive sur votre site avec des balises UTM, pour que vous voyiez aussi les visites dans vos propres statistiques.",
        },
      ],
    },
    placements: {
      eyebrow: "Où vous apparaissez",
      title: "Dans les pages et les courriels que les entrepreneurs utilisent pour trouver du travail",
      items: [
        {
          name: "Pages de corps de métier",
          where: "La page de chaque corps de métier, et de chaque corps de métier dans chaque ville.",
          packages: "Tous les forfaits",
        },
        {
          name: "Pages d'appels d'offres",
          where: "La colonne à côté de la portée des travaux, sur chaque appel d'offres correspondant.",
          packages: "Tous les forfaits",
        },
        {
          name: "Tableau de bord des entrepreneurs",
          where: "Ce que voient les membres de ce corps de métier lorsqu'ils se connectent.",
          packages: "Vitrine métier, Partenaire fondateur",
        },
        {
          name: "Courriel quotidien de jumelage",
          where: "Envoyé aux membres Trade Pro le matin où un appel d'offres correspondant est publié.",
          packages: "Tous les forfaits",
        },
        {
          name: "Sommaire hebdomadaire des appels d'offres",
          where: "Un résumé hebdomadaire des nouveaux appels d'offres dans le corps de métier de chaque membre.",
          packages: "Partenaire fondateur",
        },
      ],
      busiest: "Ouverts en ce moment, par corps de métier",
      busiestNote:
        "Appels d'offres ouverts sur le tableau. Une Vitrine métier apparaît sur les pages d'appels d'offres de son corps de métier.",
    },
    packages: {
      eyebrow: "Forfaits",
      title: "Choisissez votre place",
      description: "Facturé chaque mois en dollars canadiens. Payez un an d'avance et obtenez deux mois gratuits.",
      perMonth: "CAD / mois",
      yearly: "ou {price} par année, deux mois gratuits",
      ask: "Demander le forfait {name}",
      terms: [
        "Un seul commanditaire par corps de métier, premier arrivé, premier servi.",
        "En ligne dans un délai d'un jour ouvrable après la réception de votre logo et de votre texte.",
        "Les forfaits mensuels sont annulables en tout temps.",
        "Prix en CAD, taxes applicables en sus.",
      ],
      founding: "Partenaires fondateurs",
    },
    enquire: {
      eyebrow: "Demande d'information",
      title: "Demander une place",
      body: "Dites-nous ce que vous vendez et qui vous voulez joindre. Nous vous répondrons avec les corps de métier encore disponibles et une maquette de votre placement.",
      needTitle: "Ce qu'il nous faut pour vous mettre en ligne",
      need: [
        "Votre logo",
        "Un titre et une ou deux phrases",
        "Le texte du bouton et la page où les clics doivent mener",
      ],
      draft: "Vous ne savez pas quoi dire? Nous pouvons rédiger le texte avec vous.",
      email: "Vous préférez écrire?",
      emailSubject: "Commandite",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Questions sur la commandite",
      items: [
        {
          q: "Qui voit ma marque?",
          a: "Les entrepreneurs et entreprises de services qui utilisent PMRFP pour trouver des travaux en immobilier commercial : les personnes qui consultent les pages de corps de métier et d'appels d'offres, les membres dans leur tableau de bord, et les entrepreneurs qui ouvrent leurs courriels de jumelage et leur sommaire hebdomadaire. Vous n'apparaissez qu'aux corps de métier compris dans votre forfait.",
        },
        {
          q: "Comment fonctionne la pertinence?",
          a: "Chaque commanditaire est jumelé à des corps de métier. Un fournisseur de matériel électrique apparaît sur les pages en électricité et sur celles qui y sont étroitement liées, comme l'éclairage et les bornes de recharge, ainsi que dans les courriels de ces corps de métier. Si rien sur une page ne correspond à un commanditaire, aucun commanditaire n'est affiché.",
        },
        {
          q: "Quels rapports vais-je recevoir?",
          a: "Un rapport mensuel des clics par emplacement (pages de corps de métier, pages d'appels d'offres, tableau de bord, courriels) et par corps de métier. Chaque lien porte des balises UTM (utm_source=pmrfp), pour que les visites apparaissent aussi dans vos propres statistiques. Nous rapportons les clics que nous pouvons compter. Nous ne vendons ni impressions ni estimations.",
        },
        {
          q: "Puis-je choisir mon corps de métier?",
          a: "Oui. Dites-nous le corps de métier que vous voulez. Il y a un seul commanditaire Vitrine métier par corps de métier, premier arrivé, premier servi. Si le vôtre est déjà pris, nous vous dirons ce qui est disponible.",
        },
        {
          q: "Comment les Partenaires fondateurs et les Vitrines métier se partagent-ils l'espace?",
          a: "Un commanditaire Vitrine métier conserve toujours son propre corps de métier. Les Partenaires fondateurs apparaissent dans tous les autres corps de métier, ainsi que dans le sommaire hebdomadaire des appels d'offres, que les Vitrines métier n'incluent pas.",
        },
        {
          q: "À quoi ressemble la mention « Commandité »?",
          a: "Aux exemples de cette page : une carte ou une ligne de courriel, avec une petite mention « Commandité » au-dessus de votre logo et de votre message. Les liens sont marqués comme commandités pour les moteurs de recherche. Les commanditaires n'apparaissent jamais sur le profil d'une entreprise, ni sur les pages d'inscription, de tarifs ou de facturation.",
        },
        {
          q: "Puis-je annuler?",
          a: "Oui. Les forfaits mensuels sont annulables en tout temps, et votre place reste active jusqu'à la fin du mois payé. Payer un an d'avance coûte 10 mois au lieu de 12. Le prix Partenaire fondateur est garanti pendant 12 mois.",
        },
      ],
    },
    cta: {
      title: "Faites de votre corps de métier le vôtre sur PMRFP.",
      description:
        "Un seul commanditaire par corps de métier, premier arrivé, premier servi. Dites-nous ce que vous vendez et nous vous montrerons ce qui est disponible.",
      primary: "Demander une place",
      secondary: "Voir le tableau",
    },
    mock: {
      headline: "Vous chiffrez les matériaux de ce chantier?",
      body: "Éclairage, disjoncteurs et dispositifs de câblage, livrés au chantier. Prix entrepreneur sur compte.",
      cta: "Obtenir une soumission",
      monogram: "VM",
      cardAria: "Exemple de carte commanditée portant la mention Commandité, de « Votre marque » : {headline}",
      sponsored: "Commandité",
      sample: "Exemple",
      tenderTag: "Électricité · Appel d'offres public",
      tenderCaption: "Exemple : une Vitrine métier dans la colonne d'un appel d'offres en électricité.",
      emailSubject: "Nouveaux appels d'offres en électricité sur PMRFP aujourd'hui",
      emailMeta: "Courriel quotidien de jumelage · exemple",
      emailCaption: "Exemple : une seule ligne identifiée sous les appels d'offres, jamais au-dessus.",
    },
  },

  widgets: {
    meta: {
      title: "Widgets gratuits pour le site Web des entrepreneurs, gestionnaires immobiliers et courtiers",
      description:
        "Affichez du contenu PMRFP en direct sur votre propre site Web : un fil d'appels d'offres pour votre corps de métier et votre région, vos appels d'offres ouverts, vos offres d'emploi, votre carte d'entreprise ou vos entrepreneurs de confiance. Copiez, collez, c'est fait. Gratuit.",
    },
    eyebrow: "Widgets gratuits pour votre site",
    title: "Affichez {site} sur votre propre site Web",
    body: "Appels d'offres en direct, vos appels d'offres ouverts, vos offres d'emploi, votre carte d'entreprise ou vos entrepreneurs de confiance, mis à jour automatiquement. Choisissez-en un, copiez deux lignes de code, collez. Fonctionne sur WordPress, Wix, Squarespace, Webflow et les sites faits à la main.",
    points: [
      "Toujours à jour. Rien à modifier à la main.",
      "Se charge après votre page, sans jamais ralentir votre site.",
      "Lecture seule. Aucun témoin, aucun suivi de vos visiteurs.",
      "S'ajuste automatiquement à l'espace. Styles clair et foncé.",
    ],
    whereTitle: "Où le coller",
    where: [
      {
        title: "WordPress",
        desc: "Modifiez la page, ajoutez un bloc HTML personnalisé là où vous voulez le widget, collez le code, mettez à jour.",
      },
      { title: "Wix", desc: "Ajouter → Intégrer du code → Intégrer du HTML, choisissez Code, collez. Faites glisser la boîte pour l'ajuster." },
      { title: "Squarespace", desc: "Modifiez la page, ajoutez un bloc Code, collez le code, enregistrez." },
      { title: "Webflow et autres", desc: "Ajoutez un élément Embed (ou HTML) et collez. Tout site qui accepte le HTML fonctionne." },
    ],
    footBefore: "Quelqu'un d'autre gère votre site? Envoyez-lui cette page. Vous voulez la version simple?",
    footLink: "Obtenez le badge {site}",
    footAfter: ".",
  },

  badge: {
    meta: {
      title: "Badge gratuit pour le site Web des entrepreneurs commerciaux",
      description:
        "Ajoutez le badge PMRFP gratuit à votre site Web et à votre signature de courriel. Les gestionnaires immobiliers qui cliquent dessus voient le profil de votre entreprise — corps de métier, régions, assurances — qui renvoie vers votre site.",
    },
    eyebrow: "Gratuit pour les entreprises inscrites",
    title: "Affichez votre badge {site} sur votre site Web",
    body: "Gratuit pour chaque entreprise inscrite. Ajoutez-le au pied de page de votre site, à vos soumissions et à votre signature de courriel. Un gestionnaire immobilier qui clique dessus arrive sur votre profil {site} — vos corps de métier, régions, assurances et projets — et votre profil renvoie directement vers votre site Web.",
    bullets: [
      "Montre aux donneurs d'ouvrage que vous êtes prêt pour les travaux commerciaux avant même qu'ils appellent.",
      "Se met à jour tout seul — le badge reflète toujours votre statut actuel sur {site}.",
      "Deux minutes suffisent : copiez le code ci-dessous et collez-le dans votre site.",
    ],
    linked: {
      before: "Voici le badge de ",
      mid: ". Copiez le code ci-dessous — il renvoie vers ",
      profile: "votre profil {site}",
      edit: ". Vous voulez modifier ce profil? ",
      create: "Créez votre compte gratuit",
      end: ".",
    },
    sample: {
      incomplete: "Complétez le profil de votre entreprise pour générer votre propre badge. ",
      viewing: "Vous voyez un exemple de badge. ",
      join: "Inscrivez-vous à {site}",
      after: " pour obtenir le vôtre.",
    },
    more: {
      title: "Vous voulez plus qu'un badge?",
      body: "Le widget de carte d'entreprise affiche vos corps de métier, votre territoire et un bouton Demander une soumission, directement sur votre site.",
      cta: "Obtenir la carte",
    },
    whereTitle: "Où le coller",
    where: [
      {
        title: "WordPress",
        desc: "Apparence → Widgets (ou l'éditeur de site) → ajoutez un bloc HTML personnalisé à votre pied de page → collez le code du site Web.",
      },
      { title: "Wix", desc: "Ajouter → Intégrer du code → Intégrer du HTML → collez le code du site Web, puis faites-le glisser dans votre pied de page." },
      { title: "Squarespace", desc: "Modifiez votre pied de page → ajoutez un bloc Code → collez le code du site Web." },
      {
        title: "Courriels et soumissions",
        desc: "Collez la ligne de signature dans les paramètres de signature de Gmail ou d'Outlook, et au bas de votre modèle de soumission.",
      },
    ],
    whereNote: "Quelqu'un d'autre gère votre site? Envoyez-lui cette page — le code fonctionne sur n'importe quel site.",
    tiersTitle: "Niveaux de badge",
    tiersNote: "Votre badge gagne en force à mesure que vous complétez votre profil.",
    tiers: [
      { title: "Listed Vendor (fournisseur inscrit)", desc: "Vous avez un profil approuvé dans le répertoire PMRFP." },
      {
        title: "Verified Vendor (fournisseur vérifié)",
        desc: "Coordonnées de l'entreprise vérifiées par l'équipe PMRFP. Les donneurs d'ouvrage doivent tout de même confirmer les licences et les assurances directement.",
      },
      {
        title: "+ Insured (assuré)",
        desc: "Renseignements d'assurance indiqués sur votre profil (déclarés par vous). Non affichés sur l'image du badge — les donneurs d'ouvrage confirment la couverture avec vous.",
      },
    ],
    update: "Mettre à jour mon profil",
    get: "Obtenir mon badge",
    browse: "Parcourir le répertoire",
    view: "Voir le profil",
    disclaimer:
      "Le badge reflète votre statut actuel sur {site} et ne garantit aucun travail ni ne constitue une recommandation quant au résultat d'un projet en particulier.",
  },

  trusted: {
    meta: {
      notFound: "Page introuvable",
      title: "Les entrepreneurs de confiance de {name}",
      description: "Les entrepreneurs à qui {who} confie les maisons et les immeubles de ses clients.",
    },
    eyebrow: "Entrepreneurs de confiance",
    headline: "Les entrepreneurs à qui {first} confie les maisons et les immeubles de ses clients.",
    call: "Appeler {first}",
    email: "Écrire à {first}",
    empty: "{first} n'a pas encore ajouté d'entrepreneurs.",
    disclaimer:
      "{name} a choisi ces entreprises. Chacune est inscrite sur PMRFP, où les gestionnaires immobiliers et les courtiers immobiliers trouvent des entrepreneurs. Confirmez toujours les licences, les assurances et les prix pour votre propre projet.",
    realtor: {
      title: "Courtier immobilier? Créez votre propre page.",
      body: "Enregistrez les entrepreneurs en qui vous avez confiance, ajoutez une note pour chacun et envoyez un seul lien à vos clients. Gratuit jusqu'à 5 entrepreneurs.",
      cta: "Créer votre page d'entrepreneurs de confiance",
    },
    trade: {
      title: "Vous dirigez une entreprise de métier?",
      body: "Inscrivez-vous gratuitement pour que les courtiers immobiliers et les gestionnaires immobiliers puissent vous ajouter à leurs pages.",
      cta: "Inscrire votre entreprise",
    },
  },

  gcStart: {
    metaTitle: "Publier un lot de sous-traitance",
    title: "Les lots de sous-traitance se publient à partir d'un compte d'entrepreneur général",
    body: "Vous êtes connecté avec un compte {kind}. Pour publier des lots pour un chantier que vous dirigez, créez un compte d'entrepreneur général distinct avec une autre adresse courriel, ou écrivez-nous à ",
    kindTrade: "d'entrepreneur spécialisé",
    kindOther: "qui n'est pas un compte d'entrepreneur général",
    after: " et nous le publierons pour vous.",
    back: "← Retour à {site}",
  },

  winners: {
    meta: {
      title: "Qui remporte les contrats publics immobiliers au Canada",
      description:
        "Les entreprises qui remportent des contrats publics de bâtiment, d'entretien et de services partout au Canada — combien, pour quel montant et auprès de quels acheteurs. Compilé à partir d'avis d'adjudication officiels.",
    },
    eyebrow: "Avis d'adjudication publics · Canada",
    title: "Qui remporte les contrats publics immobiliers au Canada.",
    body: "Les entreprises qui remportent sans cesse des contrats de bâtiment, d'entretien et de services — à quelle fréquence, pour quel montant et auprès de quels acheteurs. Chaque chiffre provient d'un avis d'adjudication officiel.",
    reportLink: "Lire le rapport de données : à quel point les travaux publics de bâtiment sont-ils concentrés?",
    stats: { repeat: "Adjudicataires récurrents", contracts: "Contrats", awarded: "Octroyés" },
    cols: { company: "Entreprise", contracts: "Contrats", total: "Valeur totale", recent: "Le plus récent" },
    contractsSuffix: " contrats",
    ctaTitle: "Ces entreprises ont entendu parler des travaux en premier.",
    ctaBody:
      "Trade Pro vous envoie un courriel le jour même où un appel d'offres est publié dans votre corps de métier — portée complète, contact de l'acheteur, date de clôture.",
    ctaButton: "Démarrer Trade Pro — {price} $/mois",
    footnote:
      "Seules les entreprises ayant au moins deux contrats publics octroyés au dossier sont présentées. Compilé à partir d'avis d'adjudication publiés sous les licences du gouvernement ouvert du Canada, de Toronto et de la Nouvelle-Écosse, et du SEAO (Données Québec, CC BY 4.0). Leur présence ici n'implique aucune affiliation avec PMRFP.",
  },

  winner: {
    meta: {
      notFound: "Adjudicataire introuvable",
      title: "{name} — {n} contrats publics remportés{value}",
      description: "{name} a remporté {n} contrats publics{worth} octroyés par {issuers}{trades}. Voyez chaque contrat, sa valeur et sa date.",
      worth: " d'une valeur de {amount}",
      and: " et ",
    },
    back: "← Tous les adjudicataires",
    eyebrow: "Adjudicataire de contrats publics",
    stats: {
      won: "Contrats remportés",
      total: "Valeur totale",
      notDisclosed: "Non divulguée",
      average: "Contrat moyen",
      recent: "Le plus récent",
    },
    listEyebrow: "Tous les contrats au dossier",
    listTitle: "Contrats remportés par {name}",
    valueNotDisclosed: "Valeur non divulguée",
    footnote:
      "Compilé à partir d'avis d'adjudication publics publiés par {issuers}. {attributions} Ces contrats ont été octroyés directement par l'acheteur public — et non par l'entremise de {site}. Leur présence ici ne constitue pas une recommandation et n'implique aucune affiliation avec {site}.",
    open: {
      title: {
        one: "{n} appel d'offres semblable est ouvert en ce moment",
        other: "{n} appels d'offres semblables sont ouverts en ce moment",
      },
      none: "Soumissionnez sur le prochain",
      body: "Trade Pro vous envoie un courriel le jour même où un nouvel appel d'offres est publié dans votre corps de métier et votre région — avec la portée complète et le contact de l'acheteur — pour que vous soumissionniez au lieu de lire qui a gagné.",
      cta: "Démarrer Trade Pro — {price} $/mois",
      closes: "Clôture le {date}",
    },
    gcTitle: "Vous avez remporté un de ces contrats?",
    claim: {
      title: "C'est votre entreprise?",
      body: "Obtenez un profil {site} gratuit pour que les gestionnaires immobiliers vous trouvent, et un badge pour votre site Web.",
      cta: "Réclamer un profil gratuit",
    },
  },

  report: {
    meta: {
      title: "Qui remporte les contrats publics de bâtiment au Canada : rapport de données",
      description:
        "Un an de contrats publics de bâtiment et d'immobilier au Canada : combien, pour quel montant et à quel point ils sont concentrés. Compilé à partir d'avis d'adjudication officiels (AchatsCanada, SEAO du Québec, Ville de Toronto, Nouvelle-Écosse). Mis à jour chaque jour, libre de citation.",
    },
    dataset: {
      name: "Contrats publics de bâtiment et d'immobilier au Canada",
      description:
        "Avis d'adjudication de contrats publics de bâtiment, d'entretien et de services immobiliers au Canada (AchatsCanada au fédéral, SEAO du Québec, Ville de Toronto, Nouvelle-Écosse) : contrat, entreprise adjudicataire, valeur publiée, date et corps de métier. Compilé et mis à jour chaque jour par PMRFP à partir de données ouvertes officielles.",
    },
    eyebrow: "Rapport de données · mis à jour chaque jour",
    title: "Qui remporte les contrats publics de bâtiment au Canada.",
    lead: "{contracts} contrats octroyés pour des travaux de bâtiment, d'entretien et de services immobiliers, {value} en valeur publiée, {winners} adjudicataires différents. {period}.",
    period: "De {from} à {to}",
    download: "Télécharger les données (CSV)",
    cite: "Citer ce rapport",
    findingsTitle: "Faits saillants",
    findings: {
      top5: "des dollars sont allés aux 5 % des adjudicataires les plus importants ({n} entreprises).",
      top10: "sont allés à seulement dix entreprises.",
      single: "entreprises ont remporté exactement un contrat. La porte est plus grande qu'il n'y paraît.",
      multi: "entreprises ont remporté des contrats dans plus d'une administration.",
    },
    everywhere: {
      one: "Une seule entreprise",
      other: "Seulement {n} entreprises",
      after: " ont remporté des contrats dans chaque administration : ",
      item: " ({contracts} contrats, {value})",
      end: ".",
    },
    byJurisdiction: "Par administration",
    jurisdictionLine: "{value} · {contracts} contrats · {winners} adjudicataires",
    byTrade: "Par corps de métier",
    cols: { trade: "Corps de métier", contracts: "Contrats", value: "Valeur" },
    tradeNote: "Un contrat peut compter pour plus d'un corps de métier.",
    topByValue: "Plus grands adjudicataires en valeur",
    topByCount: "Le plus de contrats remportés",
    contractCount: { one: "{n} contrat", other: "{n} contrats" },
    methodTitle: "Méthodologie",
    method: {
      sources:
        "Sources : avis d'adjudication publiés en données ouvertes par le gouvernement du Canada (AchatsCanada), le SEAO du Québec, la Ville de Toronto et la province de la Nouvelle-Écosse, recueillis chaque jour par {site}. Seuls les contrats de bâtiment, d'entretien et de services immobiliers sont inclus (construction et rénovation, toiture, CVC, électricité, plomberie, déneigement et terrains, entretien ménager, gestion des déchets et corps de métier semblables); il s'agit donc de la part bâtiment et immobilier des marchés publics, et non de l'ensemble.",
      values:
        "Les montants correspondent à la valeur d'adjudication publiée dans chaque avis; {withValue} des {contracts} avis en publient une. Les adjudicataires sont regroupés malgré les variantes d'orthographe et de forme juridique (« Co. Ltd. », « Company Limited »). Les particuliers sont comptés dans les totaux, mais jamais nommés. Le contrat médian publié est de {median}.",
      licences:
        "Licences : Licence du gouvernement ouvert – Canada, Licence du gouvernement ouvert – Toronto, Licence du gouvernement ouvert – Nouvelle-Écosse, et données du SEAO sous licence CC BY 4.0 (Secrétariat du Conseil du trésor du Québec, Données Québec).",
    },
    citeTitle: "Citer ce rapport",
    citeNote: "Libre d'utilisation avec attribution. Veuillez inclure un lien vers cette page.",
    citation:
      "PMRFP, « Qui remporte les contrats publics de bâtiment au Canada » ({url}), compilé à partir d'avis d'adjudication officiels, consulté le {date}.",
    linkText: "Contrats publics de bâtiment au Canada (données PMRFP)",
    press: "Questions des médias ou extraction personnalisée des données : ",
    ctaTitle: "Vous voulez être du côté des gagnants?",
    ctaBody:
      "Chaque appel d'offres ouvert derrière ces chiffres est sur le tableau {site}. Trade Pro vous envoie un courriel le matin même où un appel d'offres correspondant est publié.",
    ctaStart: "Démarrer Trade Pro",
    ctaAll: "Tous les adjudicataires",
    jurisdictions: {
      "Federal (CanadaBuys)": "Fédéral (AchatsCanada)",
      "Quebec (SEAO)": "Québec (SEAO)",
      "City of Toronto": "Ville de Toronto",
      "Nova Scotia": "Nouvelle-Écosse",
    },
  },
};

const es: typeof en = {
  crumbs: {
    home: "Inicio",
    advertise: "Anunciarse",
    winners: "Adjudicatarios",
    report: "Informe",
  },

  advertise: {
    meta: {
      title: "Publicidad dirigida a contratistas comerciales",
      description:
        "Patrocine PMRFP y llegue a los contratistas que presentan ofertas en obras de propiedades comerciales en Canadá y EE. UU. Asignado por oficio, claramente identificado y con un informe mensual de clics.",
    },
    hero: {
      eyebrow: "Patrocine {site}",
      title: "Llegue a los contratistas que presentan ofertas en obras de propiedades comerciales.",
      body: "Electricistas, contratistas de HVAC, techadores, empresas de limpieza y otros oficios usan {site} para encontrar licitaciones públicas y RFP de administradores de propiedades en su oficio y su región. Ponga su marca junto al trabajo que están cotizando.",
      cta: "Consultar por un espacio",
      packages: "Ver paquetes",
      from: "Desde {price} al mes. Un solo patrocinador por oficio.",
    },
    sources: {
      label: "Licitaciones recopiladas cada mañana de",
      names: ["CanadaBuys", "SAM.gov", "Ciudad de Toronto", "SEAO de Quebec", "Nueva Escocia", "Yukon"],
      more: "+ administradores de propiedades",
    },
    reach: {
      open: "licitaciones y RFP abiertas en este momento",
      categories: "categorías de oficios, cada una con sus propias páginas",
      regionsUs: "regiones en Canadá y EE. UU.",
      regionsCa: "regiones en Canadá",
      awarded: "en contratos públicos anteriores en el tablero",
      posted: "licitaciones y RFP publicadas en los últimos 30 días",
      trades: "empresas de oficios en el directorio",
      sources: "fuentes de licitaciones públicas, revisadas cada mañana",
      note: "En vivo desde el tablero, actualizado cada hora. No damos estimaciones de tráfico. Los patrocinadores reciben un informe mensual de clics reales.",
    },
    audiences: {
      eyebrow: "Para quién es",
      title: "Pensado para empresas que les venden a contratistas",
      description:
        "Si electricistas, técnicos de HVAC, techadores, plomeros o equipos de limpieza le compran a usted, aquí es donde buscan su próximo trabajo.",
      items: [
        {
          title: "Proveedores y distribuidores",
          body: "Suministros eléctricos, de HVAC, plomería, techado y limpieza. Llegue a los contratistas mientras cotizan los materiales de un trabajo.",
        },
        {
          title: "Venta y alquiler de equipos",
          body: "Elevadores, quitanieves, compresores y equipo de obra, frente a las cuadrillas que se preparan para los trabajos en los que ofertan.",
        },
        {
          title: "Seguros, fianzas y garantías",
          body: "Las licitaciones públicas suelen pedir fianzas de oferta y comprobante de seguro. Esté presente cuando un contratista lee esos requisitos.",
        },
        {
          title: "Financiamiento y pagos",
          body: "Financiamiento de equipos, capital de trabajo y procesamiento de tarjetas para contratistas que asumen contratos más grandes.",
        },
        {
          title: "Software para oficios",
          body: "Herramientas de estimación, programación, servicio en campo y facturación, mostradas a los oficios para los que fueron creadas.",
        },
        {
          title: "Contratación de personal",
          body: "Mano de obra calificada y cuadrillas para contratistas que ganan más trabajo del que pueden cubrir con su propia gente.",
        },
      ],
    },
    principles: {
      eyebrow: "Cómo funcionan los espacios",
      title: "Relevantes, identificados, uno a la vez",
      description:
        "Los patrocinadores aparecen en las páginas y los correos que los contratistas ya usan para encontrar trabajo, según lo que hace cada uno.",
      items: [
        {
          title: "Solo si es relevante",
          body: "Un proveedor eléctrico aparece en las páginas de electricidad y en los correos de los electricistas. Si una página no tiene nada que ver con lo que usted vende, usted no aparece en ella.",
        },
        {
          title: "Un patrocinador por espacio",
          body: "Una tarjeta por página, una fila por correo. Sin cuadrículas de banners ni filas de logotipos compitiendo por la atención.",
        },
        {
          title: "Claramente identificados",
          body: "Cada espacio lleva la etiqueta “Patrocinado”. Los contratistas confían en el tablero porque los anuncios nunca se hacen pasar por publicaciones.",
        },
        {
          title: "Clics medidos, informe mensual",
          body: "Cada clic pasa por un enlace con seguimiento y llega a su sitio con etiquetas UTM, así que también ve las visitas en su propia analítica.",
        },
      ],
    },
    placements: {
      eyebrow: "Dónde aparece",
      title: "En las páginas y los correos que los contratistas usan para encontrar trabajo",
      items: [
        { name: "Páginas de oficios", where: "La página de cada oficio, y de cada oficio en cada ciudad.", packages: "Todos los paquetes" },
        {
          name: "Páginas de licitaciones y RFP",
          where: "La barra lateral junto al alcance, en cada licitación que coincida.",
          packages: "Todos los paquetes",
        },
        {
          name: "Panel del contratista",
          where: "Lo que ven los miembros de ese oficio al iniciar sesión.",
          packages: "Vitrina de oficio, Socio fundador",
        },
        {
          name: "Correo diario de coincidencias",
          where: "Se envía a los miembros de Trade Pro la mañana en que se publica una licitación que les corresponde.",
          packages: "Todos los paquetes",
        },
        {
          name: "Resumen semanal de licitaciones",
          where: "Un resumen semanal de las nuevas licitaciones en el oficio de cada miembro.",
          packages: "Socio fundador",
        },
      ],
      busiest: "Abiertas ahora, por oficio",
      busiestNote:
        "Licitaciones y RFP abiertas en el tablero. Una Vitrina de oficio aparece en las páginas de licitaciones de su oficio.",
    },
    packages: {
      eyebrow: "Paquetes",
      title: "Elija su espacio",
      description: "Facturación mensual en dólares canadienses. Pague un año por adelantado y obtenga dos meses gratis.",
      perMonth: "CAD / mes",
      yearly: "o {price} al año, dos meses gratis",
      ask: "Consultar por {name}",
      terms: [
        "Un solo patrocinador por oficio, por orden de llegada.",
        "En línea en un día hábil después de recibir su logotipo y su texto.",
        "Los planes mensuales se cancelan cuando quiera.",
        "Precios en CAD, más los impuestos aplicables.",
      ],
      founding: "Socios fundadores",
    },
    enquire: {
      eyebrow: "Consulta",
      title: "Consultar por un espacio",
      body: "Cuéntenos qué vende y a quién quiere llegar. Le responderemos con los oficios que siguen disponibles y una maqueta de su espacio.",
      needTitle: "Lo que necesitamos para publicarlo",
      need: ["Su logotipo", "Un titular y una o dos oraciones", "El texto del botón y la página a la que deben llevar los clics"],
      draft: "¿No sabe qué decir? Podemos redactar el texto con usted.",
      email: "¿Prefiere escribirnos?",
      emailSubject: "Patrocinio",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Preguntas sobre patrocinios",
      items: [
        {
          q: "¿Quién ve mi marca?",
          a: "Los contratistas y empresas de servicios que usan PMRFP para encontrar trabajo en propiedades comerciales: quienes leen las páginas de oficios y de licitaciones, los miembros en su panel y los contratistas que abren sus correos de coincidencias y de resumen. Usted solo aparece ante los oficios incluidos en su paquete.",
        },
        {
          q: "¿Cómo funciona la relevancia?",
          a: "Cada patrocinador se asigna a oficios. Un proveedor eléctrico aparece en las páginas de electricidad y en otras muy relacionadas, como iluminación y carga de vehículos eléctricos, y en los correos de esos oficios. Si nada en una página corresponde a un patrocinador, no se muestra ningún patrocinador.",
        },
        {
          q: "¿Qué informes recibo?",
          a: "Un informe mensual de clics por espacio (páginas de oficios, páginas de licitaciones, panel, correos) y por oficio. Cada enlace lleva etiquetas UTM (utm_source=pmrfp), así que las visitas también aparecen en su propia analítica. Informamos los clics que podemos contar. No vendemos impresiones ni estimaciones.",
        },
        {
          q: "¿Puedo elegir mi oficio?",
          a: "Sí. Díganos qué oficio quiere. Hay un solo patrocinador de Vitrina por oficio, por orden de llegada. Si el suyo ya está tomado, le diremos qué hay disponible.",
        },
        {
          q: "¿Cómo comparten el espacio los Socios fundadores y las Vitrinas?",
          a: "Un patrocinador de Vitrina de oficio siempre conserva su propio oficio. Los Socios fundadores aparecen en todos los demás oficios y en el resumen semanal de licitaciones, que las Vitrinas no incluyen.",
        },
        {
          q: "¿Cómo se ve la etiqueta “Patrocinado”?",
          a: "Como los ejemplos de esta página: una tarjeta o una fila de correo, con una pequeña etiqueta “Patrocinado” sobre su logotipo y su mensaje. Los enlaces están marcados como patrocinados para los buscadores. Los patrocinadores nunca aparecen en el perfil de una empresa ni en las páginas de registro, precios o facturación.",
        },
        {
          q: "¿Puedo cancelar?",
          a: "Sí. Los planes mensuales se cancelan cuando quiera, y su espacio sigue activo hasta el final del mes que pagó. Pagar un año por adelantado cuesta 10 meses en lugar de 12. El precio de Socio fundador queda fijo durante 12 meses.",
        },
      ],
    },
    cta: {
      title: "Hágase dueño de su oficio en PMRFP.",
      description: "Un solo patrocinador por oficio, por orden de llegada. Díganos qué vende y le mostraremos qué hay disponible.",
      primary: "Consultar por un espacio",
      secondary: "Ver el tablero",
    },
    mock: {
      headline: "¿Cotizando los materiales de este trabajo?",
      body: "Iluminación, interruptores automáticos y dispositivos de cableado, enviados a la obra. Precios para contratistas con cuenta.",
      cta: "Pedir una cotización de suministros",
      monogram: "SM",
      cardAria: 'Ejemplo de tarjeta de patrocinador con la etiqueta Patrocinado, de "Su marca": {headline}',
      sponsored: "Patrocinado",
      sample: "Ejemplo",
      tenderTag: "Electricidad · Licitación pública",
      tenderCaption: "Ejemplo: una Vitrina de oficio en la barra lateral de una licitación de electricidad.",
      emailSubject: "Nuevas coincidencias de electricidad en PMRFP hoy",
      emailMeta: "Correo diario de coincidencias · ejemplo",
      emailCaption: "Ejemplo: una sola fila identificada debajo de las coincidencias, nunca encima.",
    },
  },

  widgets: {
    meta: {
      title: "Widgets gratuitos para sitios web de contratistas, administradores de propiedades y agentes inmobiliarios",
      description:
        "Muestre contenido de PMRFP en vivo en su propio sitio web: un listado de licitaciones de su oficio y su región, sus RFP abiertas, sus empleos, la tarjeta de su empresa o sus contratistas de confianza. Copie, pegue y listo. Gratis.",
    },
    eyebrow: "Widgets gratuitos para su sitio web",
    title: "Ponga {site} en su propio sitio web",
    body: "Licitaciones en vivo, sus RFP abiertas, sus empleos, la tarjeta de su empresa o sus contratistas de confianza, actualizados automáticamente. Elija uno, copie dos líneas de código y péguelas. Funciona en WordPress, Wix, Squarespace, Webflow y sitios hechos a mano.",
    points: [
      "Siempre al día. Nada que actualizar a mano.",
      "Se carga después de su página, así que nunca la hace más lenta.",
      "Solo lectura. Sin cookies y sin rastrear a sus visitantes.",
      "Se ajusta solo al espacio. Estilos claro y oscuro.",
    ],
    whereTitle: "Dónde pegarlo",
    where: [
      {
        title: "WordPress",
        desc: "Edite la página, agregue un bloque HTML personalizado donde quiera el widget, pegue el código y actualice.",
      },
      { title: "Wix", desc: "Agregar → Insertar código → Insertar HTML, elija Código y pegue. Arrastre el recuadro para ajustar el tamaño." },
      { title: "Squarespace", desc: "Edite la página, agregue un bloque de Código, pegue el código y guarde." },
      { title: "Webflow y otros", desc: "Agregue un elemento Embed (o HTML) y pegue. Funciona en cualquier sitio que acepte HTML." },
    ],
    footBefore: "¿Otra persona administra su sitio web? Envíele esta página. ¿Quiere la versión sencilla?",
    footLink: "Obtenga la insignia de {site}",
    footAfter: ".",
  },

  badge: {
    meta: {
      title: "Insignia gratuita para sitios web de contratistas comerciales",
      description:
        "Agregue la insignia gratuita de PMRFP a su sitio web y a su firma de correo electrónico. Los administradores de propiedades que hacen clic en ella ven el perfil de su empresa (oficios, regiones, seguros), que enlaza de vuelta a su sitio.",
    },
    eyebrow: "Gratis para las empresas del directorio",
    title: "Ponga su insignia de {site} en su sitio web",
    body: "Gratis para todas las empresas del directorio. Agréguela al pie de página de su sitio, a sus cotizaciones y a su firma de correo electrónico. Un administrador de propiedades que hace clic en ella llega a su perfil de {site} (sus oficios, regiones, seguros y proyectos), y su perfil enlaza directamente a su sitio web.",
    bullets: [
      "Muestra a los compradores que usted está preparado para trabajos comerciales antes de que llamen.",
      "Se actualiza sola: la insignia siempre refleja su estado actual en {site}.",
      "Toma dos minutos: copie el código de abajo y péguelo en su sitio.",
    ],
    linked: {
      before: "Esta es la insignia de ",
      mid: ". Copie el código de abajo: enlaza a ",
      profile: "su perfil de {site}",
      edit: ". ¿Quiere editar ese perfil? ",
      create: "Cree su cuenta gratuita",
      end: ".",
    },
    sample: {
      incomplete: "Complete el perfil de su empresa para generar su propia insignia. ",
      viewing: "Está viendo una insignia de ejemplo. ",
      join: "Regístrese en {site}",
      after: " para obtener la suya.",
    },
    more: {
      title: "¿Quiere algo más que una insignia?",
      body: "El widget de tarjeta de empresa muestra sus oficios, su zona de servicio y un botón Solicitar una cotización, directamente en su sitio.",
      cta: "Obtener la tarjeta",
    },
    whereTitle: "Dónde pegarlo",
    where: [
      {
        title: "WordPress",
        desc: "Apariencia → Widgets (o el Editor del sitio) → agregue un bloque HTML personalizado a su pie de página → pegue el código para sitio web.",
      },
      { title: "Wix", desc: "Agregar → Insertar código → Insertar HTML → pegue el código para sitio web y luego arrástrelo a su pie de página." },
      { title: "Squarespace", desc: "Edite su pie de página → agregue un bloque de Código → pegue el código para sitio web." },
      {
        title: "Correo y cotizaciones",
        desc: "Pegue la línea de firma de correo en la configuración de firma de Gmail u Outlook, y al final de su plantilla de cotización.",
      },
    ],
    whereNote: "¿Otra persona administra su sitio web? Envíele esta página: el código funciona en cualquier sitio.",
    tiersTitle: "Niveles de la insignia",
    tiersNote: "Su insignia gana fuerza a medida que completa su perfil.",
    tiers: [
      { title: "Listed Vendor (proveedor registrado)", desc: "Tiene un perfil aprobado en el directorio de PMRFP." },
      {
        title: "Verified Vendor (proveedor verificado)",
        desc: "Datos de la empresa revisados por el equipo de PMRFP. Aun así, los compradores deben confirmar las licencias y los seguros directamente.",
      },
      {
        title: "+ Insured (asegurado)",
        desc: "Datos del seguro indicados en su perfil (declarados por usted). No se muestran en la imagen de la insignia: los compradores confirman la cobertura con usted.",
      },
    ],
    update: "Actualizar mi perfil",
    get: "Obtener mi insignia",
    browse: "Explorar el directorio",
    view: "Ver el perfil",
    disclaimer:
      "La insignia refleja su estado actual en {site} y no garantiza trabajo ni constituye un respaldo del resultado de ningún proyecto en particular.",
  },

  trusted: {
    meta: {
      notFound: "Página no encontrada",
      title: "Los contratistas de confianza de {name}",
      description: "Los contratistas a los que {who} les confía las casas y los edificios de sus clientes.",
    },
    eyebrow: "Contratistas de confianza",
    headline: "Los contratistas a los que {first} les confía las casas y los edificios de sus clientes.",
    call: "Llamar a {first}",
    email: "Escribir a {first}",
    empty: "{first} todavía no ha agregado contratistas.",
    disclaimer:
      "{name} eligió estas empresas. Cada una está en PMRFP, donde los administradores de propiedades y los agentes inmobiliarios encuentran contratistas. Confirme siempre las licencias, los seguros y los precios para su propio proyecto.",
    realtor: {
      title: "¿Es agente inmobiliario? Cree su propia página.",
      body: "Guarde a los contratistas en los que confía, agregue una nota sobre cada uno y envíe a sus clientes un solo enlace. Gratis hasta 5 contratistas.",
      cta: "Crear su página de contratistas de confianza",
    },
    trade: {
      title: "¿Dirige una empresa de oficios?",
      body: "Regístrese gratis para que los agentes inmobiliarios y los administradores de propiedades puedan agregarlo a sus páginas.",
      cta: "Registrar su empresa",
    },
  },

  gcStart: {
    metaTitle: "Publicar un paquete de subcontratación",
    title: "Los paquetes de subcontratación se publican desde una cuenta de contratista general",
    body: "Inició sesión con una cuenta {kind}. Para publicar paquetes de una obra que usted dirige, cree una cuenta de contratista general aparte con otro correo electrónico, o escríbanos a ",
    kindTrade: "de contratista de oficio",
    kindOther: "que no es de contratista",
    after: " y lo publicaremos por usted.",
    back: "← Volver a {site}",
  },

  winners: {
    meta: {
      title: "Quién gana los contratos públicos de propiedades en Canadá",
      description:
        "Las empresas que ganan contratos públicos de construcción, mantenimiento y servicios en todo Canadá: cuántos, por cuánto y de qué compradores. Compilado a partir de avisos oficiales de adjudicación.",
    },
    eyebrow: "Avisos públicos de adjudicación · Canadá",
    title: "Quién gana los contratos públicos de propiedades en Canadá.",
    body: "Las empresas que siguen ganando contratos de construcción, mantenimiento y servicios: con qué frecuencia, por cuánto y de qué compradores. Cada cifra proviene de un aviso oficial de adjudicación.",
    reportLink: "Lea el informe de datos: ¿qué tan concentrado está el trabajo público en edificios?",
    stats: { repeat: "Adjudicatarios recurrentes", contracts: "Contratos", awarded: "Adjudicado" },
    cols: { company: "Empresa", contracts: "Contratos", total: "Valor total", recent: "Más reciente" },
    contractsSuffix: " contratos",
    ctaTitle: "Estas empresas se enteraron primero del trabajo.",
    ctaBody:
      "Trade Pro le envía un correo el día en que se publica una licitación de su oficio: alcance completo, contacto del comprador y fecha de cierre.",
    ctaButton: "Empezar con Trade Pro — ${price} al mes",
    footnote:
      "Solo se incluyen empresas con dos o más adjudicaciones públicas registradas. Compilado a partir de avisos de adjudicación publicados bajo las licencias de gobierno abierto de Canadá, Toronto y Nueva Escocia, y del SEAO (Données Québec, CC BY 4.0). Figurar aquí no implica ninguna afiliación con PMRFP.",
  },

  winner: {
    meta: {
      notFound: "Adjudicatario no encontrado",
      title: "{name} — {n} contratos públicos ganados{value}",
      description: "{name} ganó {n} contratos públicos{worth} de {issuers}{trades}. Vea cada adjudicación, su valor y su fecha.",
      worth: " por un valor de {amount}",
      and: " y ",
    },
    back: "← Todos los adjudicatarios",
    eyebrow: "Adjudicatario de contratos públicos",
    stats: {
      won: "Contratos ganados",
      total: "Valor total",
      notDisclosed: "No divulgado",
      average: "Contrato promedio",
      recent: "Más reciente",
    },
    listEyebrow: "Todas las adjudicaciones registradas",
    listTitle: "Contratos ganados por {name}",
    valueNotDisclosed: "Valor no divulgado",
    footnote:
      "Compilado a partir de avisos públicos de adjudicación publicados por {issuers}. {attributions} Estos contratos fueron adjudicados directamente por el comprador público, no a través de {site}. Figurar aquí no constituye un respaldo ni implica ninguna afiliación con {site}.",
    open: {
      title: {
        one: "{n} licitación como estas está abierta ahora",
        other: "{n} licitaciones como estas están abiertas ahora",
      },
      none: "Presente una oferta en la próxima",
      body: "Trade Pro le envía un correo el día en que se publica una nueva licitación de su oficio y su región, con el alcance completo y el contacto del comprador, para que usted esté ofertando en lugar de leer quién ganó.",
      cta: "Empezar con Trade Pro — ${price} al mes",
      closes: "Cierra el {date}",
    },
    gcTitle: "¿Ganó uno de estos contratos?",
    claim: {
      title: "¿Es su empresa?",
      body: "Obtenga un perfil gratuito en {site} para que los administradores de propiedades lo encuentren, y una insignia para su sitio web.",
      cta: "Reclamar un perfil gratuito",
    },
  },

  report: {
    meta: {
      title: "Quién gana los contratos públicos de edificios en Canadá: informe de datos",
      description:
        "Un año de contratos públicos de edificios y propiedades en Canadá: cuántos, por cuánto y qué tan concentrados están. Compilado a partir de avisos oficiales de adjudicación (CanadaBuys, SEAO de Quebec, Ciudad de Toronto, Nueva Escocia). Actualizado a diario, de libre citación.",
    },
    dataset: {
      name: "Contratos públicos de edificios y propiedades en Canadá",
      description:
        "Avisos de adjudicación de contratos públicos de construcción, mantenimiento y servicios para propiedades en Canadá (CanadaBuys a nivel federal, SEAO de Quebec, Ciudad de Toronto, Nueva Escocia): contrato, empresa adjudicataria, valor publicado, fecha y oficio. Compilado y actualizado a diario por PMRFP a partir de datos abiertos oficiales.",
    },
    eyebrow: "Informe de datos · actualizado a diario",
    title: "Quién gana los contratos públicos de edificios en Canadá.",
    lead: "{contracts} contratos adjudicados de construcción, mantenimiento y servicios para propiedades, {value} en valor publicado, {winners} adjudicatarios distintos. {period}.",
    period: "De {from} a {to}",
    download: "Descargar los datos (CSV)",
    cite: "Citar este informe",
    findingsTitle: "Hallazgos principales",
    findings: {
      top5: "de los dólares fue para el 5% de los adjudicatarios más grandes ({n} empresas).",
      top10: "fue para solo diez empresas.",
      single: "empresas ganaron exactamente un contrato. La puerta está más abierta de lo que parece.",
      multi: "empresas ganaron contratos en más de una jurisdicción.",
    },
    // The verb sits in one/other so a single company reads "ganó", several "ganaron".
    everywhere: {
      one: "Solo una empresa ganó",
      other: "Solo {n} empresas ganaron",
      after: " contratos en todas las jurisdicciones: ",
      item: " ({contracts} contratos, {value})",
      end: ".",
    },
    byJurisdiction: "Por jurisdicción",
    jurisdictionLine: "{value} · {contracts} contratos · {winners} adjudicatarios",
    byTrade: "Por oficio",
    cols: { trade: "Oficio", contracts: "Contratos", value: "Valor" },
    tradeNote: "Un contrato puede contar para más de un oficio.",
    topByValue: "Mayores adjudicatarios por valor",
    topByCount: "Más contratos ganados",
    contractCount: { one: "{n} contrato", other: "{n} contratos" },
    methodTitle: "Metodología",
    method: {
      sources:
        "Fuentes: avisos de adjudicación publicados como datos abiertos por el Gobierno de Canadá (CanadaBuys), el SEAO de Quebec, la Ciudad de Toronto y la Provincia de Nueva Escocia, recopilados a diario por {site}. Solo se incluyen contratos de construcción, mantenimiento y servicios para propiedades (construcción y renovación, techado, HVAC, electricidad, plomería, remoción de nieve y áreas verdes, limpieza y conserjería, residuos y oficios similares), así que esta es la parte de edificios y propiedades de las compras públicas, no el total.",
      values:
        'Las cifras en dólares usan el valor de adjudicación publicado en cada aviso; {withValue} de {contracts} avisos publican uno. Los adjudicatarios se agrupan pese a las variantes de escritura y de sufijo legal ("Co. Ltd.", "Company Limited"). Las personas físicas se cuentan en los totales, pero nunca se nombran. La adjudicación publicada mediana es de {median}.',
      licences:
        "Licencias: Open Government Licence – Canada, Open Government Licence – Toronto, Open Government Licence – Nova Scotia, y datos del SEAO bajo CC BY 4.0 (Secrétariat du Conseil du trésor du Québec, Données Québec).",
    },
    citeTitle: "Citar este informe",
    citeNote: "De uso libre con atribución. Incluya un enlace a esta página.",
    citation:
      'PMRFP, "Quién gana los contratos públicos de edificios en Canadá" ({url}), compilado a partir de avisos oficiales de adjudicación, consultado el {date}.',
    linkText: "Contratos públicos de edificios en Canadá (datos de PMRFP)",
    press: "Consultas de prensa o un corte personalizado de los datos: ",
    ctaTitle: "¿Quiere estar del lado ganador?",
    ctaBody:
      "Cada licitación abierta detrás de estas cifras está en el tablero de {site}. Trade Pro le envía un correo la mañana en que se publica una que le corresponde.",
    ctaStart: "Empezar con Trade Pro",
    ctaAll: "Todos los adjudicatarios",
    jurisdictions: {
      "Federal (CanadaBuys)": "Federal (CanadaBuys)",
      "Quebec (SEAO)": "Quebec (SEAO)",
      "City of Toronto": "Ciudad de Toronto",
      "Nova Scotia": "Nueva Escocia",
    },
  },
};

export default { en, fr, es };
