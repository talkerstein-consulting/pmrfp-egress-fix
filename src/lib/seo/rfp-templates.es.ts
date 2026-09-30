/**
 * Spanish (neutral Latin-American, "usted") version of the RFP template library
 * (lib/seo/rfp-templates), for the /es/rfp-templates pages.
 *
 * Like the French file, the text the RFP Writer also uses (name, scope,
 * requirements, site access, bidder questions) is NOT repeated here: it comes
 * from lib/rfp-writer/templates-es.ts, so there is one Spanish copy of it. This
 * file only holds the parts shown on the template pages alone: pitch, when to
 * use, samples, timeline, evaluation criteria, FAQs and metadata.
 *
 * Pages call localizeRfpTemplate(t, lang) from rfp-templates.fr.ts, which hands
 * "es" to localizeRfpTemplateEs() below.
 */
import { tradeName } from "@/i18n/terms";
import { localizeEs } from "@/lib/rfp-writer/compose-es";
import { RFP_TEMPLATES_ES } from "@/lib/rfp-writer/templates-es";
import type { RfpTemplate, TimelinePhase } from "./rfp-templates";
import type { LocalizedRfpTemplate } from "./rfp-templates.fr";

interface RfpTemplatePageEs {
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

const OPEN = "RFP abierta";

const PAGES_ES: Record<string, RfpTemplatePageEs> = {
  // ---------- TECHADO ----------
  "flat-roof-replacement": {
    query: "plantilla de RFP para reemplazo de techo plano",
    pitch: "Retiro del techo existente y nueva membrana monocapa en un edificio comercial o multifamiliar.",
    whenToUse:
      "Su techo plano ya superó el 75% de su vida útil prevista, ha tenido filtraciones repetidas o su estudio del fondo de reserva indica que debe reemplazarse en los próximos 12 a 24 meses. Sirve para edificios comerciales, edificios residenciales de altura media y propiedades multifamiliares con techos de membrana de baja pendiente (TPO, EPDM, asfalto modificado o techo multicapa BUR).",
    titleSample: "Reemplazo de techo plano — [Nombre de la propiedad / dirección]",
    summarySample:
      "Retiro y reemplazo del techo de membrana de baja pendiente existente en nuestra propiedad comercial de [superficie] pie². Buscamos una garantía de 20 años o más y un instalador certificado.",
    timeline: [
      { label: OPEN, detail: "21 días para que los contratistas expresen interés y envíen sus precios." },
      { label: "Preselección y visitas al sitio", detail: "Se invita a los 3 mejores oferentes a recorrer el techo y finalizar su cotización." },
      { label: "Adjudicación y contrato", detail: "Decisión dentro de la semana siguiente a las visitas; contrato estándar abreviado CCDC." },
      { label: "Movilización", detail: "Dentro de las 4 semanas siguientes a la adjudicación (si el clima lo permite)." },
      { label: "Fin del proyecto", detail: "Por lo general, de 2 a 4 semanas una vez iniciado, según el tamaño del techo y el clima." },
    ],
    evaluationCriteria: [
      "Costo total (incluidas las alternativas adicionales declaradas).",
      "Calidad de la membrana y de la garantía.",
      "Referencias: proyectos de tamaño y alcance comparables terminados en los últimos 24 meses.",
      "Cronograma del proyecto y capacidad para cumplir con el plazo de terminación deseado.",
      "Calidad de la propuesta y claridad del alcance.",
    ],
    faqs: [
      { q: "¿Cuánto tarda el reemplazo de un techo plano?", a: "Para un techo comercial típico de 10,000 a 30,000 pies cuadrados, calcule de 2 a 4 semanas de trabajo en el sitio una vez que el contratista se moviliza, si el clima lo permite. Los techos más grandes o más complejos pueden tardar más." },
      { q: "¿Debo obtener primero un informe sobre el estado del techo?", a: "Si no está seguro de si necesita un reemplazo o solo una reparación, un informe pagado sobre el estado del techo, hecho por un consultor independiente (no por un oferente), suele costar de $1,500 a $4,000 y es dinero bien invertido." },
      { q: "¿Esta plantilla es legalmente vinculante?", a: "No. Es una plantilla para definir el alcance y obtener ofertas comparables. Su contrato final debe revisarlo su abogado y, de preferencia, basarse en un contrato estándar abreviado CCDC para mayor claridad." },
    ],
    metaTitle: "Plantilla de RFP para reemplazo de techo plano (Canadá, 2026)",
    metaDescription:
      "Plantilla de RFP gratuita y lista para usar para el reemplazo de techos planos comerciales en Canadá. Alcance, requisitos, cronograma y criterios de evaluación prellenados: publíquela en 60 segundos.",
  },
  "emergency-roof-repair": {
    query: "plantilla de RFP para reparación de emergencia de techo",
    pitch: "Filtración activa o daños por tormenta: necesita un techador en el sitio en 48 horas.",
    whenToUse:
      "Tiene una filtración activa, daños por tormenta o una falla repentina de la membrana que requiere atención en la misma semana (a menudo el mismo día). Esta plantilla prioriza el tiempo de respuesta y una cotización rápida por encima del ciclo de evaluación más largo de un reemplazo completo.",
    titleSample: "Reparación de emergencia de techo — Filtración activa — [Nombre de la propiedad]",
    summarySample:
      "Filtración activa en [unidad / área] de nuestra propiedad [tipo de propiedad]. Necesitamos un techador en el sitio en 48 horas para evaluar, detener la filtración y entregar una cotización por escrito de la reparación permanente.",
    timeline: [
      { label: OPEN, detail: "48 horas para que los contratistas confirmen su disponibilidad y su tarifa." },
      { label: "Adjudicación", detail: "El mismo día del cierre de la RFP; por lo general gana el oferente calificado que responde más rápido." },
      { label: "Movilización", detail: "Dentro de las 48 horas siguientes a la adjudicación." },
      { label: "Reparación temporal e informe", detail: "El mismo día de la movilización." },
      { label: "Reparación permanente", detail: "Dentro de 2 semanas, si el clima lo permite." },
    ],
    evaluationCriteria: [
      "Rapidez de respuesta (debe cumplir el plazo de 48 horas).",
      "Transparencia de las tarifas de emergencia.",
      "Compatibilidad con la membrana / protección de la garantía.",
      "Calidad de las referencias en trabajos de emergencia similares.",
    ],
    faqs: [
      { q: "¿Cuánto cuesta una reparación de emergencia de techo?", a: "La visita de emergencia y la reparación temporal suelen costar de $500 a $2,500 en Canadá. El precio de la reparación permanente depende del alcance que se descubra durante la evaluación." },
      { q: "¿Una reparación de emergencia anula la garantía de mi techo?", a: "Solo si la hace un instalador que no está certificado para su sistema de membrana. Confirme siempre que el oferente esté certificado antes de autorizar las reparaciones." },
    ],
    metaTitle: "Plantilla de RFP para reparación de emergencia de techo: respuesta en 48 horas",
    metaDescription:
      "Plantilla de RFP gratuita para la reparación de emergencia de techos comerciales en Canadá. Requisitos de tiempo de respuesta, alcance y criterios de evaluación prellenados. Publíquela y reciba cotizaciones hoy mismo.",
  },
  "annual-roof-inspection-contract": {
    query: "plantilla de RFP para contrato anual de inspección de techos",
    pitch: "Inspección dos veces al año y una asignación para reparaciones menores en las propiedades de una cartera.",
    whenToUse:
      "Administra una o más propiedades y quiere un contratista de techado bajo contrato para inspecciones preventivas, reparaciones menores y conservación de la garantía, en lugar de esperar a que aparezcan filtraciones. Es especialmente útil para carteras de 3 edificios o más.",
    titleSample: "Contrato anual de inspección y mantenimiento de techos — [N.º de propiedades]",
    summarySample:
      "Contrato de varios años de inspección y mantenimiento menor de techos para [#] propiedades, con un total aproximado de [X] pie² de techo. Inspecciones trimestrales o dos veces al año, con una asignación para mantenimiento.",
    timeline: [
      { label: OPEN, detail: "21 días." },
      { label: "Preselección y recorrido de la cartera", detail: "Se invita a los 3 mejores oferentes a recorrer 2 o 3 propiedades representativas." },
      { label: "Adjudicación del contrato", detail: "Plazo inicial de 1 año, renovable cada año." },
      { label: "Primer ciclo de inspección", detail: "Comienza dentro de los 30 días siguientes a la firma del contrato." },
    ],
    evaluationCriteria: [
      "Costo anual por propiedad (inspección + asignación para mantenimiento).",
      "Calidad de los informes y de las herramientas.",
      "Experiencia con carteras de propiedades y referencias.",
      "Zona de cobertura (debe atender todas nuestras propiedades).",
    ],
    faqs: [
      { q: "¿Para qué un contrato de mantenimiento?", a: "Por lo general, se exige una inspección y un mantenimiento documentados para mantener vigentes las garantías NDL del fabricante. Omitirlos puede anular una garantía de 20 años solo por no haber limpiado un desagüe." },
      { q: "¿Con qué frecuencia se deben inspeccionar los techos comerciales?", a: "La norma del sector es dos veces al año (primavera y otoño), además de después de cualquier evento climático importante. Con más frecuencia en edificios con mucho equipo en el techo o con problemas crónicos." },
    ],
    metaTitle: "Plantilla de RFP para contrato anual de inspección de techos (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para contratos anuales de inspección y mantenimiento de techos en Canadá. Inspecciones dos veces al año y asignación para mantenimiento: proteja su garantía.",
  },

  // ---------- HVAC ----------
  "rooftop-unit-replacement": {
    query: "plantilla de RFP para reemplazo de unidades de techo",
    pitch: "Reemplazo de unidades de techo (RTU) por equipos equivalentes o mejorados, con grúa y trabajos en las bases.",
    whenToUse:
      "Una unidad de HVAC de techo tiene 15 años o más, las reparaciones son cada vez más frecuentes o planea un reemplazo preventivo antes de que falle. Sirve para reemplazar una sola unidad o varias en toda una cartera de propiedades.",
    titleSample: "Reemplazo de unidades de HVAC de techo — [#] unidades en [propiedad]",
    summarySample:
      "Reemplazo de [#] unidades de techo existentes de [tonelaje] toneladas en nuestra propiedad [tipo de propiedad]. Buscamos opciones de reemplazo equivalente o mejorado (alta eficiencia), con grúa, bases e integración completa de los controles.",
    timeline: [
      { label: OPEN, detail: "21 días para que los contratistas expresen interés." },
      { label: "Preselección y visitas al sitio", detail: "Los 3 mejores oferentes visitan el sitio para confirmar el alcance." },
      { label: "Adjudicación", detail: "Dentro de la semana siguiente a las visitas." },
      { label: "Plazo de entrega del equipo", detail: "Por lo general, de 4 a 10 semanas, según la disponibilidad de las unidades." },
      { label: "Instalación", detail: "De 1 a 2 días por unidad (un solo día para un reemplazo equivalente)." },
    ],
    evaluationCriteria: [
      "Costo total instalado.",
      "Calidad, eficiencia y garantía del equipo.",
      "Plazo de entrega y capacidad para cumplir con nuestro periodo de instalación.",
      "Experiencia con nuestro tipo de edificio y con el sistema de automatización del edificio (BAS), si aplica.",
    ],
    faqs: [
      { q: "¿Debo reemplazar una sola unidad o todas a la vez?", a: "Agrupar los reemplazos suele bajar el precio por unidad y le permite estandarizar con un solo fabricante para las piezas. Incluya siempre en la RFP todas las unidades candidatas y pida un precio por el paquete completo." },
      { q: "¿Reemplazo equivalente o unidades de alta eficiencia?", a: "Pida ambas opciones. Las unidades de alta eficiencia cuestan más al principio, pero el ahorro de energía suele recuperar la diferencia en 3 a 7 años. Pida al oferente que muestre sus cálculos." },
    ],
    metaTitle: "Plantilla de RFP para reemplazo de unidades de HVAC de techo (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para el reemplazo de unidades comerciales de HVAC de techo en Canadá. Alcance, requisitos de grúa, condiciones de garantía y criterios de evaluación prellenados.",
  },
  "annual-hvac-maintenance-contract": {
    query: "plantilla de RFP para contrato de mantenimiento de HVAC",
    pitch: "Contrato de mantenimiento preventivo, trimestral o semestral, con cambio de filtros y asignación para reparaciones.",
    whenToUse:
      "Quiere costos de HVAC predecibles, menos llamadas de emergencia y la documentación adecuada para las garantías. Ideal para edificios con varias unidades de techo, edificios residenciales medianos y grandes, y cualquier propiedad donde el tiempo fuera de servicio salga caro.",
    titleSample: "Contrato anual de mantenimiento preventivo de HVAC — [Propiedad / cartera]",
    summarySample:
      "Buscamos un contrato de mantenimiento preventivo de 1 a 3 años para [#] unidades de HVAC en [#] propiedades. Incluye visitas trimestrales de mantenimiento, cambio de filtros y una asignación para reparaciones.",
    timeline: [
      { label: OPEN, detail: "21 días." },
      { label: "Preselección y recorrido de la cartera", detail: "Se invita a los 3 mejores oferentes a recorrer las propiedades y cotizar." },
      { label: "Inicio del contrato", detail: "Plazo de 1 a 3 años, renovable de mutuo acuerdo." },
    ],
    evaluationCriteria: [
      "Costo anual por unidad.",
      "Monto y transparencia de la asignación para reparaciones.",
      "Tiempos de respuesta garantizados.",
      "Calidad de los informes y acceso a un portal.",
      "Experiencia con carteras de propiedades.",
    ],
    faqs: [
      { q: "¿Qué retorno da el mantenimiento preventivo?", a: "Un equipo de HVAC bien mantenido dura de 30% a 50% más y funciona con una eficiencia de 10% a 25% mayor. El contrato suele pagarse solo con las llamadas de emergencia que se evitan y la vida útil adicional del equipo." },
      { q: "¿Contrato de 1 año o de 3 años?", a: "Un año es más seguro si la relación con el proveedor es nueva. Tres años suelen darle mejores precios y fijan las tarifas. Asegúrese de que el contrato tenga una cláusula de salida clara por incumplimiento." },
    ],
    metaTitle: "Plantilla de RFP para contrato de mantenimiento de HVAC (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para contratos de mantenimiento preventivo de HVAC comercial en Canadá. Visitas trimestrales, asignación para reparaciones y condiciones de respuesta a emergencias prellenadas.",
  },
  "boiler-replacement": {
    query: "plantilla de RFP para reemplazo de caldera comercial",
    pitch: "Reemplazo de la caldera de calefacción en edificios residenciales multifamiliares o comerciales.",
    whenToUse:
      "Su caldera de agua caliente o de vapor llegó al final de su vida útil, no pasa las inspecciones o quiere cambiarla por una caldera de condensación de alta eficiencia para ahorrar energía. Es común en edificios residenciales de altura media, escuelas y edificios comerciales antiguos.",
    titleSample: "Reemplazo de caldera — [Nombre de la propiedad]",
    summarySample:
      "Reemplazo de la caldera existente de [X] BTU [de agua caliente / de vapor] en nuestra propiedad [tipo de propiedad]. Buscamos opciones de alta eficiencia y el menor tiempo posible sin calefacción.",
    timeline: [
      { label: OPEN, detail: "21 días." },
      { label: "Preselección y visita al cuarto de máquinas", detail: "Visita de los 3 mejores oferentes." },
      { label: "Adjudicación", detail: "Dentro de la semana siguiente a las visitas." },
      { label: "Plazo de entrega del equipo", detail: "De 4 a 12 semanas para las unidades de mayor capacidad." },
      { label: "Instalación", detail: "De 3 a 7 días por lo general; puede requerirse una caldera temporal si el trabajo se hace en temporada de calefacción." },
    ],
    evaluationCriteria: [
      "Costo instalado (incluida la calefacción temporal, si se requiere).",
      "Eficiencia y ahorro de energía previsto.",
      "Garantía del fabricante y de la mano de obra.",
      "El menor tiempo posible sin servicio para los inquilinos.",
      "Referencias en proyectos comparables.",
    ],
    faqs: [
      { q: "¿Se puede reemplazar una caldera en invierno?", a: "Sí, pero probablemente necesitará una caldera temporal para mantener la calefacción de los inquilinos durante el cambio. Presupueste de $5,000 a $15,000 adicionales para el alquiler y la instalación." },
      { q: "¿Una caldera de condensación de alta eficiencia es siempre la mejor opción?", a: "Por lo general sí, en edificios cuya eficiencia actual es inferior al 90%, pero la mejora de la ventilación y el manejo del condensado pueden aumentar el costo. Pida al oferente que muestre el periodo de recuperación previsto." },
    ],
    metaTitle: "Plantilla de RFP para reemplazo de caldera (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para el reemplazo de calderas en edificios comerciales o residenciales multifamiliares en Canadá. Alcance, requisitos de la TSSA y condiciones de garantía prellenados.",
  },

  // ---------- CONCRETO Y ASFALTO ----------
  "parking-lot-resurfacing": {
    query: "plantilla de RFP para repavimentación de estacionamiento",
    pitch: "Fresado y nueva capa de asfalto, o reconstrucción completa, de un estacionamiento comercial.",
    whenToUse:
      "Su estacionamiento tiene grietas superficiales, baches o agrietamiento tipo piel de cocodrilo, señal de que la base está fallando. El sellado ya no basta y necesita una solución más a fondo.",
    titleSample: "Repavimentación de estacionamiento — [Nombre de la propiedad] — [X] pie²",
    summarySample:
      "Fresado y nueva capa de asfalto (o reconstrucción completa, según recomiende el oferente) de nuestro estacionamiento de asfalto de [X] pie². Incluye nuevo pintado de líneas y trabajos menores en los sumideros.",
    timeline: [
      { label: OPEN, detail: "21 días." },
      { label: "Visita al sitio", detail: "Los 3 mejores oferentes recorren el estacionamiento y confirman el alcance." },
      { label: "Adjudicación", detail: "Dentro de una semana." },
      { label: "Movilización", detail: "Depende del clima: la temporada de pavimentación va de mayo a octubre en la mayor parte de Canadá." },
      { label: "Terminación", detail: "La mayoría de los estacionamientos, de 1 a 2 semanas; un calendario por etapas mantiene el acceso de los inquilinos." },
    ],
    evaluationCriteria: [
      "Costo por pie cuadrado.",
      "Plan por etapas e impacto en los inquilinos.",
      "Calidad y garantía del asfalto.",
      "Cumplimiento de la AODA y de los requisitos de accesibilidad.",
      "Referencias en estacionamientos comerciales de tamaño similar.",
    ],
    faqs: [
      { q: "¿Fresado y nueva capa, o reconstrucción completa?", a: "El fresado con nueva capa funciona si la base está sana y el daño es superficial. Se necesita una reconstrucción completa si ve agrietamiento tipo piel de cocodrilo, hundimientos o falla de la base. Pida al oferente que inspeccione y haga una recomendación." },
      { q: "¿Por qué el asfalto cuesta mucho más que antes?", a: "El precio del cemento asfáltico líquido ha subido considerablemente desde 2020. Pida ofertas al inicio de la temporada de pavimentación para obtener los mejores precios." },
    ],
    metaTitle: "Plantilla de RFP para repavimentación de estacionamiento (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para la repavimentación de estacionamientos comerciales en Canadá. Fresado y nueva capa o reconstrucción completa, plan por etapas y cumplimiento de la AODA prellenados.",
  },

  // ---------- REMOCIÓN DE NIEVE ----------
  "snow-removal-seasonal-contract": {
    query: "plantilla de RFP para contrato de remoción de nieve",
    pitch: "Contrato de nieve y hielo por temporada o por evento para propiedades comerciales.",
    whenToUse:
      "Necesita asegurar un contratista de remoción de nieve antes de que empiece la temporada. Ya sea que prefiera un contrato de tarifa fija por temporada (predecible) o por evento (solo paga cuando nieva), esta plantilla cubre ambos casos.",
    titleSample: "Remoción de nieve y control de hielo — [Nombre de la propiedad] — [Temporada]",
    summarySample:
      "Contrato de temporada de remoción de nieve y aplicación de sal / arena para nuestra propiedad [tipo de propiedad] en [dirección]. [Tarifa fija por temporada / por evento]. Cobertura del 15 de noviembre al 15 de abril.",
    timeline: [
      { label: OPEN, detail: "Publíquela en agosto o septiembre para obtener los mejores precios." },
      { label: "Adjudicación", detail: "A más tardar el 1 de octubre." },
      { label: "Inspección antes de la temporada", detail: "Recorra el sitio con el contratista antes de la primera nevada." },
      { label: "Temporada", detail: "Del 15 de noviembre al 15 de abril (o según se defina)." },
    ],
    evaluationCriteria: [
      "Costo total de la temporada (compare los escenarios por temporada y por evento).",
      "Tiempos de respuesta garantizados.",
      "Cobertura de responsabilidad civil.",
      "Registro del servicio y rastreo GPS.",
      "Referencias locales y confiabilidad comprobada.",
    ],
    faqs: [
      { q: "¿Por temporada o por evento?", a: "Por temporada es predecible y suele ser la mejor opción para propiedades comerciales con mucho tránsito. Por evento puede salir más barato en un invierno suave, pero lo expone a sorpresas de costo en un invierno duro y al riesgo de resbalones y caídas si la respuesta se retrasa." },
      { q: "¿Por qué es tan importante la cobertura por resbalones y caídas?", a: "Si alguien presenta una demanda por un resbalón y caída en su propiedad, el seguro del contratista de remoción de nieve es la primera línea de defensa. Lo estándar para propiedades comerciales es un mínimo de $5 millones." },
    ],
    metaTitle: "Plantilla de RFP para contrato de remoción de nieve (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para contratos comerciales de remoción de nieve y control de hielo en Canadá. Precios por temporada o por evento, tiempos de respuesta y cobertura de responsabilidad civil.",
  },

  // ---------- JARDINERÍA ----------
  "landscaping-annual-contract": {
    query: "plantilla de RFP para contrato de jardinería comercial",
    pitch: "Cuidado de césped, jardineras y árboles de mayo a octubre en una propiedad comercial.",
    whenToUse:
      "Administra una propiedad con áreas verdes que necesitan mantenimiento semanal: corte de césped, deshierbe, jardineras, poda de árboles, fertilización y riego. Ideal para edificios comerciales, residenciales multifamiliares y propiedades donde la buena presencia exterior importa.",
    titleSample: "Jardinería y mantenimiento de áreas verdes — [Nombre de la propiedad] — [Temporada]",
    summarySample:
      "Contrato anual de jardinería para nuestra propiedad [tipo de propiedad] en [dirección]. Cubre el mantenimiento semanal de mayo a octubre, la limpieza de primavera y de otoño, y la puesta en marcha y el cierre del sistema de riego.",
    timeline: [
      { label: OPEN, detail: "Publíquela en febrero o marzo para obtener los mejores precios." },
      { label: "Adjudicación", detail: "A más tardar el 1 de abril." },
      { label: "Inicio de la temporada", detail: "Limpieza de primavera a principios de mayo." },
      { label: "Fin de la temporada", detail: "Limpieza de otoño en octubre." },
    ],
    evaluationCriteria: [
      "Costo total de la temporada.",
      "Calidad de las referencias y fotos de trabajos anteriores.",
      "Confiabilidad en el cumplimiento del calendario.",
      "Calidad del equipo y normas de ruido y emisiones (si corresponde).",
    ],
    faqs: [
      { q: "¿Vale la pena pagar más por equipo eléctrico o silencioso?", a: "Para propiedades de uso mixto o cercanas a viviendas, sí: genera menos quejas de los inquilinos y algunos municipios lo exigen cada vez más. El sobrecosto suele ser de 10% a 15%." },
      { q: "¿Semanal o cada dos semanas?", a: "El servicio semanal es lo normal en propiedades comerciales con césped visible. Cada dos semanas funciona en propiedades donde la presencia exterior importa menos." },
    ],
    metaTitle: "Plantilla de RFP para contrato de jardinería (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para contratos comerciales de jardinería y mantenimiento de áreas verdes en Canadá. Visitas semanales, limpiezas de temporada, riego y fertilización.",
  },

  // ---------- PINTURA ----------
  "exterior-painting": {
    query: "plantilla de RFP para pintura exterior comercial",
    pitch: "Pintura exterior completa o parcial de edificios comerciales o multifamiliares.",
    whenToUse:
      "La pintura de su edificio está descolorida, descascarada o no se ha tocado en 7 años o más. Es un alcance común en propiedades comerciales y residenciales con estuco, revestimiento de madera o revestimiento metálico.",
    titleSample: "Pintura exterior — [Nombre de la propiedad] — [X] pie²",
    summarySample:
      "Repintado exterior completo de nuestra propiedad [tipo de propiedad] en [dirección]. Aproximadamente [X] pie² de [tipo de superficie]. Incluye preparación, imprimación y 2 manos de acabado.",
    timeline: [
      { label: OPEN, detail: "21 días." },
      { label: "Visita al sitio", detail: "Los 3 mejores oferentes recorren el sitio." },
      { label: "Adjudicación", detail: "Dentro de una semana." },
      { label: "Movilización", detail: "Depende del clima: el mejor periodo es de mayo a septiembre." },
      { label: "Terminación", detail: "De 1 a 3 semanas, según el tamaño del edificio." },
    ],
    evaluationCriteria: [
      "Costo total.",
      "Calidad y garantía de la pintura.",
      "Experiencia y referencias del equipo de trabajo.",
      "Cronograma del proyecto.",
      "Plan de protección para los inquilinos y las áreas verdes.",
    ],
    faqs: [
      { q: "¿Cuánto debe durar una pintura exterior?", a: "En una superficie bien preparada y con un producto de primera calidad, de 7 a 10 años. Un producto barato o una preparación apresurada pueden reducir eso a la mitad." },
      { q: "¿Debo pagar más por una pintura de primera calidad?", a: "Sí. La diferencia de costo es pequeña comparada con la mano de obra, y un producto de primera calidad dura casi el doble. El oferente que usa pintura barata no le ahorra dinero en un horizonte de 10 años." },
    ],
    metaTitle: "Plantilla de RFP para pintura exterior (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para proyectos comerciales de pintura exterior en Canadá. Alcance, asignación para preparación, requisitos de calidad de la pintura y condiciones de garantía prellenados.",
  },
  "common-area-painting": {
    query: "plantilla de RFP para pintura de áreas comunes",
    pitch: "Pasillos, vestíbulos y escaleras: repintado interior con las mínimas molestias para los inquilinos.",
    whenToUse:
      "Renueve las áreas comunes interiores de un edificio residencial multifamiliar, de oficinas o de uso mixto. Ideal cuando el alcance está bien definido (pasillos, escaleras, vestíbulo) y quiere causar las mínimas molestias a los inquilinos.",
    titleSample: "Pintura de áreas comunes — Pasillos y escaleras — [Nombre de la propiedad]",
    summarySample:
      "Repintado de los pasillos de las áreas comunes ([X] pisos), las escaleras ([X]) y el vestíbulo principal de nuestra propiedad [tipo de propiedad]. Edificio ocupado: el trabajo debe programarse según el tránsito de los residentes.",
    timeline: [
      { label: OPEN, detail: "21 días." },
      { label: "Adjudicación", detail: "Dentro de las 2 semanas siguientes al cierre de la RFP." },
      { label: "Movilización", detail: "Fecha de inicio coordinada con la administración de la propiedad." },
      { label: "Terminación", detail: "Por lo general, de 2 a 6 semanas, según el tamaño del edificio y las etapas." },
    ],
    evaluationCriteria: [
      "Costo total.",
      "Enfoque considerado con los inquilinos (pintura baja en COV, plan por etapas, manejo de quejas).",
      "Referencias en trabajos en edificios ocupados.",
      "Calidad de la pintura.",
    ],
    faqs: [
      { q: "Pintura sin COV o baja en COV: ¿de verdad vale la pena?", a: "Con inquilinos en el edificio, sí. La pintura sin compuestos orgánicos volátiles (COV) elimina las quejas por olores y por sensibilidad a los químicos. El sobrecosto es pequeño ($5 a $10 por galón)." },
      { q: "¿Cuánto tarda la pintura de áreas comunes?", a: "Un edificio típico de altura media (10 pisos) tarda de 3 a 4 semanas, a razón de un piso por semana. Las escaleras y el vestíbulo agregan de 1 a 2 semanas." },
    ],
    metaTitle: "Plantilla de RFP para pintura de áreas comunes (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para la pintura interior de áreas comunes en edificios ocupados. Pintura sin COV, etapas pensadas para los inquilinos y alcance completo prellenado.",
  },

  // ---------- PISOS ----------
  "corridor-flooring-replacement": {
    query: "plantilla de RFP para reemplazo de pisos de pasillos",
    pitch: "Reemplazo de alfombra, LVT o tablones de vinil en los pasillos de edificios multifamiliares.",
    whenToUse:
      "La alfombra o el piso de los pasillos está gastado, manchado o pasado de moda. Es común en edificios residenciales de altura media y de oficinas. Conviene definir el alcance por nivel completo o por pasillo completo para lograr un aspecto uniforme.",
    titleSample: "Reemplazo de pisos de pasillos — [Nombre de la propiedad] — [X] niveles",
    summarySample:
      "Reemplazo del piso de los pasillos en [X] niveles de nuestra propiedad [tipo de propiedad]. Los oferentes deben proponer dos opciones: losetas de alfombra de grado comercial y tablones de vinil de lujo (LVT).",
    timeline: [
      { label: OPEN, detail: "21 días." },
      { label: "Entrega de muestras", detail: "Todos los oferentes entregan muestras físicas de ambas opciones." },
      { label: "Adjudicación", detail: "Dentro de las 2 semanas siguientes al cierre de la RFP." },
      { label: "Fin del proyecto", detail: "Por lo general, 1 día por pasillo en cada nivel; de 2 a 6 semanas en total." },
    ],
    evaluationCriteria: [
      "Costo total instalado de cada opción.",
      "Calidad del producto, capa de desgaste y garantía.",
      "Certificaciones del instalador.",
      "Referencias en pasillos de edificios multifamiliares ocupados.",
      "Plan por etapas e impacto en los inquilinos.",
    ],
    faqs: [
      { q: "¿Losetas de alfombra o LVT?", a: "Las losetas de alfombra son más cálidas al pisar y más silenciosas, pero cuesta más limpiarlas. El LVT es más durable, más fácil de limpiar y mejor en zonas con humedad (pasillos de lavandería). La mayoría de las propiedades termina eligiendo LVT en construcciones nuevas y losetas de alfombra en pasillos residenciales." },
      { q: "¿Cuánto dura el piso de un pasillo?", a: "Losetas de alfombra de primera calidad: de 10 a 15 años. LVT con una capa de desgaste de 20 milésimas de pulgada: de 15 a 20 años. Los productos más baratos duran la mitad." },
    ],
    metaTitle: "Plantilla de RFP para reemplazo de pisos de pasillos (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para reemplazar los pisos de los pasillos en edificios multifamiliares ocupados. Losetas de alfombra o LVT, etapas y alcance completo prellenado.",
  },

  // ---------- ELEVADORES ----------
  "elevator-service-contract": {
    query: "plantilla de RFP para contrato de servicio de elevadores",
    pitch: "Contrato de mantenimiento mensual y atención de emergencias para uno o más elevadores.",
    whenToUse:
      "Su contrato actual de servicio de elevadores está por renovarse o ya se cansó del servicio del proveedor actual. En esta categoría dominan los contratos de varios años; cambiar de proveedor es poco común, así que vale la pena hacerlo bien.",
    titleSample: "Contrato de servicio de elevadores — [Nombre de la propiedad] — [#] elevadores",
    summarySample:
      "Contrato de servicio de [#] años para [#] elevadores en nuestra propiedad [tipo de propiedad]. Mantenimiento preventivo mensual, atención de emergencias e inspecciones anuales exigidas por la TSSA.",
    timeline: [
      { label: OPEN, detail: "30 días (más tiempo, por tratarse de un contrato de varios años)." },
      { label: "Preselección y visita al sitio", detail: "Los 3 mejores oferentes recorren el sitio, inspeccionan el equipo y proponen un plan de mantenimiento." },
      { label: "Adjudicación", detail: "Dentro de las 2 semanas siguientes a las visitas." },
      { label: "Duración del contrato", detail: "Por lo general, de 1 a 3 años, con opciones de renovación. Se prefiere una cláusula de terminación con 90 días de aviso." },
      { label: "Fecha de inicio", detail: "Alineada con la fecha de vencimiento del contrato actual." },
    ],
    evaluationCriteria: [
      "Costo mensual por elevador.",
      "Alcance de la cobertura (mantenimiento integral o parcial).",
      "Tiempos de respuesta garantizados y rendición de cuentas.",
      "Cantidad de mecánicos disponibles en la zona.",
      "Calidad del portal para clientes.",
      "Flexibilidad para terminar el contrato.",
    ],
    faqs: [
      { q: "¿Por qué parece imposible salir de un contrato de elevadores?", a: "Porque la mayoría son contratos de solo lubricación (oil & grease) de 5 años, con renovación automática y aumentos de precio. Exija un plazo inicial de 1 a 3 años con una cláusula de terminación sin causa con 90 días de aviso." },
      { q: "¿Mantenimiento integral o solo lubricación?", a: "El mantenimiento integral cuesta más al mes, pero limita su exposición a las reparaciones grandes. El de solo lubricación es barato al mes, pero le factura aparte los cables, los controladores, etc., lo que puede traer sorpresas muy costosas. La mayoría de los propietarios que necesitan un presupuesto predecible eligen el mantenimiento integral." },
    ],
    metaTitle: "Plantilla de RFP para contrato de servicio de elevadores (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para contratos comerciales de servicio y mantenimiento de elevadores en Canadá. Alcance de mantenimiento integral, tiempos de respuesta garantizados y cláusulas de terminación justas.",
  },

  // ---------- ELECTRICIDAD ----------
  "electrical-panel-upgrade": {
    query: "plantilla de RFP para actualización del tablero eléctrico",
    pitch: "Aumento de capacidad del servicio eléctrico o reemplazo del tablero principal en edificios comerciales o multifamiliares.",
    whenToUse:
      "Su servicio eléctrico actual es insuficiente o antiguo, o se necesita más capacidad para una ampliación del edificio, la carga de vehículos eléctricos o un nuevo inquilino. Es común en edificios comerciales y residenciales multifamiliares antiguos.",
    titleSample: "Actualización del tablero / servicio eléctrico — [Nombre de la propiedad]",
    summarySample:
      "Aumento del servicio eléctrico principal existente de [X] A a [X] A en nuestra propiedad [tipo de propiedad]. Incluye un nuevo tablero principal, la coordinación con la compañía eléctrica y cualquier trabajo necesario en los subtableros.",
    timeline: [
      { label: OPEN, detail: "30 días." },
      { label: "Visita al sitio", detail: "Los 3 mejores oferentes recorren el sitio con el ingeniero." },
      { label: "Adjudicación", detail: "Dentro de las 2 semanas siguientes a las visitas." },
      { label: "Permisos y plazo de la compañía eléctrica", detail: "Por lo general, de 4 a 12 semanas para aprobar el aumento de capacidad." },
      { label: "Instalación", detail: "El cambio de servicio suele hacerse en 1 noche o un fin de semana; el proyecto completo tarda de 4 a 6 semanas." },
    ],
    evaluationCriteria: [
      "Costo total instalado.",
      "Calidad de la coordinación con la ingeniería y la compañía eléctrica.",
      "Plan para limitar los cortes de servicio a los inquilinos.",
      "Referencias en aumentos de capacidad similares.",
      "Experiencia del maestro electricista y de su equipo.",
    ],
    faqs: [
      { q: "¿Cuánto tarda un aumento de capacidad del servicio eléctrico?", a: "Desde la adjudicación de la RFP hasta el cambio de servicio, por lo general de 8 a 16 semanas, y la mayor parte es el plazo de la compañía eléctrica y de los permisos, no la instalación en sí." },
      { q: "¿Necesito un ingeniero consultor?", a: "Para aumentos de capacidad de más de 600 A o cualquier trabajo que requiera un permiso de construcción, por lo general sí. El oferente puede recomendar uno o incluirlo." },
    ],
    metaTitle: "Plantilla de RFP para actualización del tablero eléctrico (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para aumentos de capacidad del servicio eléctrico y actualización de tableros en edificios comerciales en Canadá. Coordinación con la ESA, plan de cortes para los inquilinos y alcance completo prellenado.",
  },

  // ---------- ILUMINACIÓN ----------
  "led-lighting-retrofit": {
    query: "plantilla de RFP para conversión a iluminación LED",
    pitch: "Reemplazo de la iluminación fluorescente o HID antigua por LED para ahorrar energía.",
    whenToUse:
      "Su edificio todavía tiene iluminación fluorescente T8/T12, halógena o HID. El ahorro de energía, el menor mantenimiento y los incentivos de la compañía eléctrica suelen recuperar la inversión en 2 a 5 años. Es común en estacionamientos techados, áreas comunes e iluminación exterior del edificio.",
    titleSample: "Conversión a iluminación LED — [Nombre de la propiedad] — [N.º de luminarias]",
    summarySample:
      "Conversión a LED de [n.º de luminarias] en [estacionamiento techado / áreas comunes / exterior] de nuestra propiedad [tipo de propiedad]. Incluye la coordinación de los incentivos de la compañía eléctrica y la eliminación de las luminarias existentes.",
    timeline: [
      { label: OPEN, detail: "21 días." },
      { label: "Visita al sitio y auditoría", detail: "Los 3 mejores oferentes hacen una auditoría de las luminarias y recomiendan un enfoque." },
      { label: "Adjudicación", detail: "Dentro de las 2 semanas siguientes a las auditorías." },
      { label: "Solicitud de incentivos", detail: "Se presenta antes de la movilización." },
      { label: "Instalación", detail: "Por lo general, de 1 a 3 semanas, según la cantidad de luminarias y el acceso." },
    ],
    evaluationCriteria: [
      "Costo neto (costo instalado menos el incentivo de la compañía eléctrica).",
      "Ahorro de energía y periodo de recuperación previstos.",
      "Calidad y garantía de las luminarias.",
      "Historial de incentivos aprobados.",
      "Desempeño fotométrico.",
    ],
    faqs: [
      { q: "¿Cuál es el periodo de recuperación típico de una conversión a LED?", a: "De 2 a 5 años en la mayoría de los edificios comerciales, y a menudo menos con los incentivos de la compañía eléctrica. Los estacionamientos techados con iluminación las 24 horas suelen recuperar la inversión más rápido." },
      { q: "¿Reemplazo completo de la luminaria o kit de conversión?", a: "El reemplazo completo da una vida útil más larga y controles modernos, pero cuesta más. Los kits de conversión son más baratos y rápidos, pero heredan la vida útil de la luminaria existente. El oferente debe recomendar una opción para cada ubicación." },
    ],
    metaTitle: "Plantilla de RFP para conversión a iluminación LED (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para conversiones a iluminación LED en edificios comerciales en Canadá. Coordinación de incentivos de la compañía eléctrica, análisis de recuperación y alcance completo prellenado.",
  },

  // ---------- SEGURIDAD CONTRA INCENDIOS ----------
  "annual-fire-safety-inspection": {
    query: "plantilla de RFP para contrato de inspección de seguridad contra incendios",
    pitch: "Inspección anual exigida por el código de alarmas, rociadores, extintores e iluminación de salida.",
    whenToUse:
      "Necesita una inspección certificada según el Código de Incendios de Ontario (o su equivalente provincial) de los sistemas de alarma contra incendios, rociadores, extintores e iluminación de emergencia. Es obligatoria cada año en edificios comerciales y en la mayoría de los residenciales multifamiliares.",
    titleSample: "Inspección y mantenimiento anual de seguridad contra incendios — [Nombre de la propiedad]",
    summarySample:
      "Inspección y mantenimiento anual de la alarma contra incendios, los rociadores, los extintores, la iluminación de salida y otros sistemas de seguridad humana en nuestra propiedad [tipo de propiedad], según [el código de incendios provincial].",
    timeline: [
      { label: OPEN, detail: "21 días." },
      { label: "Adjudicación", detail: "Dentro de 2 semanas." },
      { label: "Primera inspección", detail: "Programada dentro de los 30 días siguientes a la adjudicación." },
      { label: "Duración del contrato", detail: "1 o 3 años." },
    ],
    evaluationCriteria: [
      "Costo anual total.",
      "Transparencia de los costos (desglosados).",
      "Reputación de informar las deficiencias con honestidad (esto importa mucho).",
      "Calidad del portal.",
      "Certificaciones de los técnicos.",
    ],
    faqs: [
      { q: "¿Por qué varía tanto el costo de una inspección contra incendios?", a: "Las inspecciones baratas suelen venir con cotizaciones infladas para corregir las deficiencias: así es como ganan dinero. Pida una inspección desglosada y al menos 2 segundas opiniones sobre cualquier deficiencia importante antes de autorizar la reparación." },
      { q: "¿Puedo usar un proveedor para la inspección y otro para las reparaciones?", a: "Sí, y probablemente debería. Algunos administradores de propiedades usan una empresa para la inspección (así no tiene ningún incentivo para inflar las deficiencias) y otra distinta para las reparaciones (con precios competitivos)." },
    ],
    metaTitle: "Plantilla de RFP para contrato de inspección de seguridad contra incendios (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para contratos anuales de inspección de seguridad contra incendios en Canadá. Certificación CFAA, precios transparentes y normas para informar las deficiencias.",
  },

  // ---------- MOHO ----------
  "mold-remediation": {
    query: "plantilla de RFP para remediación de moho",
    pitch: "Contención, remoción y verificación final del moho en propiedades comerciales o residenciales.",
    whenToUse:
      "Ha tenido una fuga, una inundación o un problema crónico de humedad y hay moho visible o se sospecha que lo hay. Es especialmente urgente en edificios residenciales multifamiliares ocupados, donde los inquilinos pueden tener problemas de salud o amenazar con acciones legales.",
    titleSample: "Remediación de moho — [Nombre de la propiedad] — [Área afectada]",
    summarySample:
      "Remediación de moho en [área] de nuestra propiedad [tipo de propiedad], con aproximadamente [X] pie² de área afectada. Origen de la humedad: [identificado / por investigar]. Requiere contención, remoción y una verificación final después de la remediación.",
    timeline: [
      { label: OPEN, detail: "10 días (por lo general, más rápido que un trabajo no urgente)." },
      { label: "Evaluación por un higienista industrial", detail: "Independiente; por lo general, antes de la movilización del oferente." },
      { label: "Adjudicación", detail: "Dentro de la semana siguiente al cierre de la RFP." },
      { label: "Movilización", detail: "Dentro de la semana siguiente a la adjudicación." },
      { label: "Remediación", detail: "Por lo general, de 1 a 3 semanas." },
      { label: "Verificación final y reconstrucción", detail: "Verificación final dentro de la semana siguiente al fin de la remediación; la reconstrucción va aparte." },
    ],
    evaluationCriteria: [
      "Costo total de la remediación.",
      "Uso de un higienista industrial independiente (condición indispensable).",
      "Calidad de la contención y cumplimiento de las normas del IICRC.",
      "Forma de comunicarse con los inquilinos.",
      "Referencias en trabajos similares.",
    ],
    faqs: [
      { q: "¿Por qué insistir en un higienista industrial independiente?", a: "Porque si la misma empresa hace la remoción y las pruebas de verificación, hay un conflicto de interés evidente. Un higienista industrial independiente lo protege en lo legal y en su reputación." },
      { q: "¿Los inquilinos tendrán que mudarse temporalmente?", a: "Depende del alcance. Una contención pequeña en una sola habitación puede no requerirlo. La remediación de una unidad completa por lo general sí. Presupueste los costos de hotel a corto plazo." },
    ],
    metaTitle: "Plantilla de RFP para remediación de moho (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para la remediación de moho en propiedades comerciales o residenciales en Canadá. Contención según el IICRC, verificación final por un higienista industrial independiente y plan de comunicación con los inquilinos.",
  },

  // ---------- CONTROL DE PLAGAS ----------
  "pest-control-contract": {
    query: "plantilla de RFP para contrato de control de plagas comercial",
    pitch: "Contrato de plagas con visitas preventivas trimestrales y servicio a pedido, con enfoque de manejo integrado de plagas (MIP).",
    whenToUse:
      "Administra una o más propiedades y quiere un contratista de control de plagas bajo contrato para la prevención y la atención de llamadas. Hoy se prefiere el manejo integrado de plagas (MIP): menos químicos y más inspección y exclusión.",
    titleSample: "Contrato de servicio de control de plagas — [Propiedad / cartera]",
    summarySample:
      "Contrato anual de control de plagas para nuestra propiedad [tipo de propiedad]. Enfoque de MIP con visitas preventivas trimestrales y servicio a pedido. Cobertura de [plagas comunes: roedores, cucarachas, chinches de cama, etc.].",
    timeline: [
      { label: OPEN, detail: "21 días." },
      { label: "Adjudicación", detail: "Dentro de 2 semanas." },
      { label: "Duración del contrato", detail: "1 o 2 años." },
    ],
    evaluationCriteria: [
      "Costo anual por propiedad.",
      "Enfoque que prioriza el MIP (en lugar de los pesticidas).",
      "Tiempos de respuesta garantizados.",
      "Calidad del portal.",
      "Referencias locales.",
    ],
    faqs: [
      { q: "¿Por qué MIP en lugar de fumigar con regularidad?", a: "La fumigación regular con pesticidas está cada vez más restringida por las normas provinciales y no gusta a los inquilinos. El MIP (inspección, exclusión y tratamiento focalizado) es más eficaz a largo plazo y genera menos quejas de los inquilinos." },
      { q: "¿Suele incluirse el tratamiento contra chinches de cama?", a: "Rara vez: la mayoría de los contratos cotizan el tratamiento contra chinches como un adicional por unidad, porque requiere mucha mano de obra. Pida la tarifa por unidad desde el principio." },
    ],
    metaTitle: "Plantilla de RFP para contrato de control de plagas (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para contratos comerciales de control de plagas en Canadá. Enfoque de manejo integrado de plagas, visitas trimestrales, servicio a pedido y precios transparentes.",
  },

  // ---------- LIMPIEZA Y CONSERJERÍA ----------
  "janitorial-annual-contract": {
    query: "plantilla de RFP para contrato de limpieza y conserjería",
    pitch: "Contrato de limpieza diaria o nocturna para áreas comunes de edificios comerciales o residenciales multifamiliares.",
    whenToUse:
      "Está volviendo a licitar su contrato de limpieza y conserjería (se recomienda cada 2 a 3 años para mantener precios justos) o empieza desde cero en una propiedad nueva. Ideal para oficinas comerciales, locales comerciales y edificios residenciales de altura media.",
    titleSample: "Contrato de limpieza y conserjería — [Nombre de la propiedad]",
    summarySample:
      "Contrato de limpieza diaria o nocturna para nuestra propiedad [tipo de propiedad] en [dirección]. Aproximadamente [X] pie² de superficie a limpiar, incluidas las áreas comunes, los baños y los elevadores.",
    timeline: [
      { label: OPEN, detail: "21 días." },
      { label: "Visitas al sitio", detail: "Se invita a los 3 mejores oferentes a recorrer el sitio y confirmar el alcance." },
      { label: "Adjudicación", detail: "Dentro de 2 semanas." },
      { label: "Transición", detail: "30 días entre la adjudicación y la primera noche de servicio." },
      { label: "Duración del contrato", detail: "Por lo general, 2 años, con revisión anual." },
    ],
    evaluationCriteria: [
      "Costo mensual por pie cuadrado.",
      "Modelo de personal (empleados directos o subcontratados).",
      "Cobertura de supervisión.",
      "Insumos incluidos o con cargo adicional.",
      "Calidad del portal y de la comunicación.",
      "Referencias en propiedades de tipo similar.",
    ],
    faqs: [
      { q: "¿Debo licitar la limpieza cada año?", a: "Cada 2 a 3 años es lo ideal. Las licitaciones anuales generan rotación de proveedores; después de más de 3 años, los precios se desvían y el servicio decae." },
      { q: "Empleados directos o subcontratados: ¿importa?", a: "Sí. Los contratistas con empleados directos retienen mejor a su personal, rinden más cuentas y mantienen una calidad más constante. Los modelos subcontratados tienen más rotación y un servicio irregular." },
    ],
    metaTitle: "Plantilla de RFP para contrato de limpieza y conserjería (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para contratos comerciales de limpieza y conserjería en Canadá. Alcance diario, semanal y mensual, requisito de empleados directos y precios transparentes.",
  },

  // ---------- RESTAURACIÓN ----------
  "post-damage-restoration": {
    query: "plantilla de RFP para restauración por daños de agua o incendio",
    pitch: "Restauración por daños de agua, fuego o humo: proyecto de respuesta a emergencias.",
    whenToUse:
      "Tuvo una inundación, un incendio, un evento de humo o un reflujo de aguas residuales y necesita una empresa de restauración en el sitio rápidamente. Por lo general hay una aseguradora de por medio: asegúrese de que su proveedor de restauración trabaje con su aseguradora y use precios de Xactimate.",
    titleSample: "Restauración por daños de [agua / fuego / humo] — [Nombre de la propiedad]",
    summarySample:
      "Restauración de emergencia de [X] pie² con daños de [agua / fuego / humo] en nuestra propiedad [tipo de propiedad]. N.º de reclamo al seguro: [si aplica]. Se requiere respuesta en 24 horas para la evaluación.",
    timeline: [
      { label: OPEN, detail: "48 horas (plazo de emergencia muy ajustado)." },
      { label: "Adjudicación", detail: "El mismo día si es posible, para poner en marcha la respuesta." },
      { label: "Movilización", detail: "Dentro de las 24 horas siguientes a la adjudicación." },
      { label: "Secado y mitigación", detail: "Por lo general, de 3 a 7 días." },
      { label: "Reconstrucción", detail: "Según el alcance; por lo general, de 2 a 8 semanas." },
    ],
    evaluationCriteria: [
      "Tiempo de respuesta (la movilización en 24 horas es una condición indispensable).",
      "Relación de facturación con las aseguradoras.",
      "Certificaciones del IICRC.",
      "Referencias en proyectos similares.",
      "Rigor de la documentación.",
    ],
    faqs: [
      { q: "¿El seguro cubrirá el costo total?", a: "Depende de la póliza y de la causa del siniestro. Las empresas de restauración que facturan directamente a la aseguradora saben cómo aprovechar al máximo la cobertura. Documente todo desde el primer minuto: tome fotos antes de que empiece cualquier trabajo." },
      { q: "¿Qué es Xactimate?", a: "Xactimate es el software de estimación estándar que usan los ajustadores de seguros. Las empresas de restauración que lo usan hablan el mismo idioma que su aseguradora, lo que significa menos disputas por la facturación." },
    ],
    metaTitle: "Plantilla de RFP para restauración después de siniestros (Canadá)",
    metaDescription:
      "Plantilla de RFP gratuita para la restauración de emergencia por daños de agua, fuego y humo en Canadá. Respuesta en 24 horas, Xactimate y facturación directa a la aseguradora prellenados.",
  },
};

/** "Reemplazo de techo plano" -> "reemplazo de techo plano"; "HVAC..." stays. */
function lowerFirst(s: string): string {
  return /^[A-ZÀ-Ý][a-zà-ÿ]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s;
}

/**
 * The Spanish template: the page-only text above merged with the RFP Writer's
 * Spanish name, scope, requirements, site access and questions. The writer's
 * tokens ({WCB}, {OWNER}, {ca:…|us:…}) are resolved with no province, which
 * gives the generic workers' comp line and the Canadian wording, like the
 * English page. Slugs, trade slug and cost-guide link stay the same.
 *
 * Fallbacks: a slug without page text returns the English template; a slug
 * missing from templates-es.ts keeps the English name, scope, requirements,
 * site access and questions next to the Spanish page text.
 */
export function localizeRfpTemplateEs(t: RfpTemplate): LocalizedRfpTemplate {
  const shortName = t.name.replace(/ RFP Template$/, "");
  const p = PAGES_ES[t.slug];
  if (!p) return { ...t, shortName };
  const w = RFP_TEMPLATES_ES[t.slug];
  const page = { ...t, ...p, tradeName: tradeName(t.tradeName, "es") };
  // FALLBACK TO ENGLISH: no Spanish writer text for this slug.
  if (!w) return { ...page, shortName };
  const loc = (text: string) => localizeEs(text, { province: undefined });
  return {
    ...page,
    name: `Plantilla de RFP: ${lowerFirst(w.name)}`,
    shortName: w.name,
    scope: loc(w.scope),
    requirements: loc(w.requirements),
    siteAccess: loc(w.siteAccess),
    questions: w.questions.map(loc),
  };
}
