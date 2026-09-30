/**
 * Spanish (neutral Latin-American, for U.S. and Canadian readers) cost guides
 * for /es/cost-guides, same shape as lib/seo/cost-guides.ts. Selected by
 * costGuidesFor(lang) / getCostGuideFor() in cost-guides.fr.ts.
 *
 * Money follows U.S. Spanish conventions: "$8 a $22 por pie²", "$9,000 a $30,000".
 */
import type { CostGuide } from "./cost-guides";

type CostGuideText = Omit<CostGuide, "slug" | "tradeSlug" | "tradeName">;

const NOT_GUARANTEED = "¿Estos precios están garantizados?";
const PLANNING = "No. Son rangos generales de planificación para Canadá, no cotizaciones.";

export const COST_GUIDES_ES: Record<string, CostGuideText> = {
  "commercial-roof-replacement-cost": {
    name: "Reemplazo de techo comercial",
    query: "costo de reemplazo de techo comercial",
    headline: "¿Cuánto cuesta reemplazar un techo comercial en Canadá?",
    intro:
      "El reemplazo de un techo comercial suele calcularse por pie cuadrado de techo instalado y luego se ajusta según el retiro del techo existente, la reparación de la plataforma, el aislamiento, el acceso y el tipo de membrana. Los sistemas planos de baja pendiente (TPO, EPDM, asfalto modificado) predominan en los edificios comerciales canadienses, y la membrana que elija es el factor que más influye en el costo.",
    typicalRange: "$8 a $22 por pie²",
    rangeUnit: "instalado, incluye el retiro del techo existente",
    rows: [
      { item: "Membrana EPDM (caucho)", range: "$8 a $14 por pie²", note: "La membrana monocapa más económica; buena vida útil en climas fríos." },
      { item: "Membrana TPO", range: "$9 a $16 por pie²", note: "Superficie blanca reflectante y eficiente en energía; popular en renovaciones." },
      { item: "Asfalto modificado (2 capas)", range: "$10 a $17 por pie²", note: "Duradero, aplicado con soplete o autoadherible." },
      { item: "Techo multicapa (BUR / asfalto y grava)", range: "$11 a $19 por pie²" },
      { item: "Retiro y desecho del techo anterior", range: "$1.50 a $4 por pie²", note: "Más alto si hay varias capas existentes o asbesto." },
      { item: "Mejora con aislamiento de pendiente integrada", range: "$2 a $6 por pie²", note: "A menudo se requiere para cumplir con el código y el drenaje vigentes." },
    ],
    factors: [
      { title: "Tamaño y secciones del techo", desc: "Los techos grandes y continuos cuestan menos por pie cuadrado; muchas secciones pequeñas y penetraciones elevan la tarifa." },
      { title: "Retiro o recubrimiento", desc: "Retirar las capas anteriores (y desecharlas) aumenta el costo; recubrir sobre una plataforma en buen estado es más barato, pero no siempre cumple con el código." },
      { title: "Reparación de la plataforma y la estructura", desc: "La plataforma podrida y los trabajos en desagües y parapetos que se descubren a mitad de obra son causas comunes de órdenes de cambio." },
      { title: "Acceso y ocupación", desc: "El montaje de grúas, los edificios ocupados y el trabajo de noche o en fin de semana para evitar molestias elevan el costo de la mano de obra." },
      { title: "Nivel de garantía", desc: "Las garantías NDL del fabricante (15 a 30 años) exigen instaladores certificados y ensamblajes específicos, lo que encarece la oferta." },
    ],
    faqs: [
      { q: "¿Cuánto dura un techo comercial?", a: "La mayoría de los techos comerciales monocapa y de asfalto modificado duran de 20 a 30 años con mantenimiento. Recibir dos o tres respuestas competitivas a una solicitud de propuestas (RFP) le permite comparar las condiciones de garantía, no solo el precio." },
      { q: "¿Reparar o reemplazar?", a: "Si la membrana ya superó el 75% de su vida útil prevista y las filtraciones se repiten, reemplazarla suele ser más económico que seguir poniendo parches. Una RFP con un alcance bien definido le da precios para ambas opciones." },
      { q: NOT_GUARANTEED, a: `${PLANNING} El precio real depende de su edificio, su región y el alcance: publique una RFP para obtener cifras reales de contratistas de techado interesados.` },
    ],
    metaTitle: "Costo de reemplazo de techo comercial en Canadá (guía 2026)",
    metaDescription:
      "Cuánto cuesta reemplazar un techo comercial por pie cuadrado en Canadá según el tipo de membrana (TPO, EPDM, asfalto modificado), y los factores que mueven el precio. Obtenga cotizaciones reales publicando una RFP.",
  },
  "commercial-hvac-replacement-cost": {
    name: "Reemplazo de HVAC comercial",
    query: "costo de reemplazo de HVAC comercial",
    headline: "¿Cuánto cuesta reemplazar un sistema HVAC comercial en Canadá?",
    intro:
      "El HVAC (climatización) comercial suele calcularse por unidad de techo (RTU) o por tonelada de capacidad de enfriamiento, más la adaptación de la base, el izaje con grúa, la electricidad, los controles y el gas. Las unidades compactas de techo son la opción principal en los edificios comerciales canadienses; los enfriadores (chillers) y los sistemas armados en sitio quedan muy por encima de este rango.",
    typicalRange: "$9,000 a $30,000",
    rangeUnit: "por unidad de techo, instalada",
    rows: [
      { item: "Unidad de techo, 3 a 5 toneladas", range: "$9,000 a $16,000", note: "Comercio u oficina pequeña; incluye grúa y adaptador de base." },
      { item: "Unidad de techo, 7.5 a 10 toneladas", range: "$16,000 a $30,000" },
      { item: "Por tonelada de enfriamiento (regla general)", range: "$2,000 a $4,000 por tonelada" },
      { item: "Adaptador de base e izaje", range: "$1,200 a $4,000 por unidad", note: "Cambiar a otra marca o modelo suele requerir un adaptador." },
      { item: "Integración de controles / sistema de automatización (BAS)", range: "$800 a más de $5,000", note: "Más alto cuando se conecta al sistema de automatización del edificio." },
      { item: "Contrato de mantenimiento preventivo", range: "$300 a $900 por unidad al año" },
    ],
    factors: [
      { title: "Tonelaje y eficiencia", desc: "Las unidades de mayor capacidad y alta eficiencia (SEER/IEER altos) cuestan más al inicio, pero reducen el costo de operación." },
      { title: "Grúa y acceso al techo", desc: "Los sitios estrechos, los edificios altos y los izajes en el centro de la ciudad añaden costos de maniobras y permisos." },
      { title: "Reemplazo equivalente o mejora", desc: "Conservar la base y la instalación eléctrica existentes es lo más barato; cambiar de combustible, voltaje o capacidad agrega trabajo." },
      { title: "Controles y zonificación", desc: "Integrar un sistema de automatización del edificio o agregar economizadores y sensores de CO2 encarece la oferta." },
      { title: "Número de unidades", desc: "Reemplazar un grupo de RTU a la vez suele conseguir una mejor tarifa por unidad que hacerlo una por una." },
    ],
    faqs: [
      { q: "¿Cuál es la vida útil de una RTU comercial?", a: "Normalmente de 15 a 20 años. Después de 15 años, la creciente frecuencia de reparaciones y la eliminación gradual de refrigerantes (por ejemplo, la transición del R-410A) suelen justificar el reemplazo." },
      { q: "¿Debo reemplazar todas las unidades a la vez?", a: "Agrupar los reemplazos suele bajar el precio por unidad y le permite estandarizar con un solo fabricante para las piezas. Publique una sola solicitud de propuestas (RFP) con todas las unidades para obtener precios agrupados." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Su precio real depende del tonelaje, el acceso y los controles. Publique una RFP para obtener ofertas competitivas de contratistas de HVAC.` },
    ],
    metaTitle: "Costo de reemplazo de HVAC comercial en Canadá (guía 2026)",
    metaDescription:
      "Costos de reemplazo de HVAC (climatización) comercial y unidades de techo en Canadá, por unidad y por tonelada, y los factores que determinan el precio. Obtenga cotizaciones reales publicando una RFP.",
  },
  "office-renovation-cost": {
    name: "Renovación y acondicionamiento de oficinas",
    query: "costo de renovación de oficinas por pie cuadrado",
    headline: "¿Cuánto cuesta renovar una oficina por pie cuadrado en Canadá?",
    intro:
      "Las renovaciones de oficinas y los acondicionamientos para inquilinos se calculan por pie cuadrado de área útil, y la diferencia es amplia porque los acabados, el alcance mecánico y eléctrico, y si se interviene o no el edificio base hacen variar la cifra. Una renovación estética y una demolición total con reconstrucción pueden diferir de 4 a 5 veces.",
    typicalRange: "$50 a $250 por pie²",
    rangeUnit: "según el alcance y el nivel de acabados",
    rows: [
      { item: "Renovación estética (pintura, pisos, iluminación)", range: "$30 a $70 por pie²" },
      { item: "Acondicionamiento estándar (nueva distribución, instalaciones MEP básicas)", range: "$80 a $150 por pie²" },
      { item: "Acondicionamiento de alta gama / completo", range: "$150 a más de $250 por pie²", note: "Carpintería a medida, acabados de primera, instalaciones MEP completas." },
      { item: "Demolición / desmantelamiento", range: "$6 a $15 por pie²" },
      { item: "Reconfiguración de HVAC y electricidad", range: "$20 a $60 por pie²" },
      { item: "Honorarios de arquitectura, permisos y diseño", range: "8% a 15% del proyecto", note: "Además del costo de construcción." },
    ],
    factors: [
      { title: "Nivel de acabados", desc: "Los acabados estándar frente a los de diseñador, los muros de vidrio y la carpintería a medida son el factor que más hace variar el precio." },
      { title: "Alcance mecánico y eléctrico", desc: "Mover el HVAC, los rociadores y la electricidad para adaptarlos a una nueva distribución cuesta mucho más que una renovación estética." },
      { title: "Estado del edificio base", desc: "Los edificios más antiguos pueden necesitar actualizaciones al código (accesibilidad, incendios, electricidad) que exige el permiso." },
      { title: "Calendario y trabajo fuera de horario", desc: "Trabajar en pisos ocupados y fuera del horario laboral para que el negocio siga operando implica mano de obra con tarifa premium." },
      { title: "Permisos y aprobaciones", desc: "Los plazos de los permisos, las aprobaciones del arrendador y los honorarios de diseño suman costo y tiempo además de la construcción." },
    ],
    faqs: [
      { q: "¿Qué incluye un «acondicionamiento»?", a: "Normalmente la demolición, los tabiques, los cielos rasos, los pisos, la iluminación, la reconfiguración de HVAC y electricidad, la carpintería y los acabados, todo construido según la distribución del inquilino. Defina claramente el alcance en su solicitud de propuestas (RFP) para que las ofertas sean comparables." },
      { q: "¿Cómo logro que las ofertas sean comparables?", a: "Entregue a cada contratista el mismo alcance, los mismos planos y la misma tabla de acabados. Una RFP que detalla el alcance una sola vez le da propuestas comparables en igualdad de condiciones, en lugar de suposiciones." },
      { q: NOT_GUARANTEED, a: `${PLANNING} El precio real depende mucho del nivel de acabados y del alcance MEP. Publique una RFP para obtener ofertas competitivas de contratistas generales.` },
    ],
    metaTitle: "Costo de renovación de oficinas por pie cuadrado en Canadá (2026)",
    metaDescription:
      "Costos por pie cuadrado de renovación y acondicionamiento de oficinas en Canadá, desde una renovación estética hasta un acondicionamiento completo, y los factores que mueven el precio. Obtenga cotizaciones reales publicando una RFP.",
  },
  "commercial-electrical-cost": {
    name: "Trabajos eléctricos comerciales",
    query: "costo de electricista comercial",
    headline: "¿Cuánto cuestan los trabajos eléctricos comerciales en Canadá?",
    intro:
      "Los trabajos eléctricos comerciales se calculan por trabajo, por cantidad de dispositivos o según la capacidad de la ampliación del servicio (amperios). La mayoría de los trabajos a nivel de propiedad (actualizaciones de tableros, modernización de la iluminación, llamadas de servicio y alimentación para inquilinos) caen en rangos predecibles, pero cualquier trabajo que afecte el servicio eléctrico principal o requiera una inspección de la ESA agrega costos de ingeniería y permisos.",
    typicalRange: "$95 a $165 por hora",
    rangeUnit: "mano de obra de electricista con licencia",
    rows: [
      { item: "Llamada de servicio / diagnóstico", range: "$150 a $400", note: "Traslado y primera hora; las tarifas de emergencia son más altas." },
      { item: "Actualización de tablero / servicio (200 A)", range: "$2,500 a $6,000" },
      { item: "Ampliación del servicio (400 a 600 A)", range: "$6,000 a más de $20,000", note: "Puede requerir coordinación con la compañía eléctrica y la ESA." },
      { item: "Conversión a iluminación LED", range: "$80 a $250 por luminaria", note: "Los incentivos pueden cubrir una parte importante." },
      { item: "Instalación de cargador para vehículos eléctricos (nivel 2 comercial)", range: "$2,000 a $7,000 por punto de carga", note: "No incluye ampliaciones importantes del servicio." },
      { item: "Alimentación para inquilinos / nuevos circuitos", range: "$300 a $1,200 por circuito" },
    ],
    factors: [
      { title: "Capacidad del servicio", desc: "Ampliar el servicio principal (amperios) es el trabajo eléctrico más costoso y puede requerir la participación de la compañía eléctrica y una inspección de la ESA." },
      { title: "Cantidad de dispositivos y luminarias", desc: "La modernización de la iluminación y el trabajo en tomacorrientes y circuitos aumentan con la cantidad; el volumen suele conseguir una mejor tarifa." },
      { title: "Acceso y cielos rasos", desc: "Los cielos rasos fijos, los espacios ocupados y los tendidos altos o estrechos aumentan las horas de mano de obra." },
      { title: "Permisos e inspección", desc: "Los permisos e inspecciones de la ESA (en Ontario) y de las autoridades provinciales equivalentes suman costo y tiempo." },
      { title: "Trabajo fuera de horario", desc: "En edificios ocupados, los cortes de energía a menudo deben hacerse de noche o en fin de semana, con tarifas premium." },
    ],
    faqs: [
      { q: "¿Necesito un permiso de la ESA?", a: "En Ontario, la mayoría de los trabajos eléctricos comerciales requieren un permiso y una inspección de la ESA; otras provincias tienen autoridades equivalentes. Un contratista con licencia se encarga de esto: confirme que esté incluido en su propuesta." },
      { q: "¿La modernización de la iluminación puede pagarse sola?", a: "A menudo sí, gracias al ahorro de energía y a los incentivos de las compañías eléctricas. Pida a los oferentes que incluyan el período de recuperación, ya descontados los incentivos, en su respuesta a la solicitud de propuestas (RFP)." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Publique una RFP para obtener ofertas reales, ajustadas a su alcance, de electricistas comerciales con licencia.` },
    ],
    metaTitle: "Costo de electricista comercial en Canadá (guía 2026)",
    metaDescription:
      "Costos de trabajos eléctricos comerciales en Canadá (ampliaciones del servicio, tableros, modernización de la iluminación, cargadores para vehículos eléctricos y tarifas por hora) y lo que determina el precio. Obtenga cotizaciones reales publicando una RFP.",
  },
  "commercial-painting-cost": {
    name: "Pintura comercial",
    query: "costo de pintura comercial",
    headline: "¿Cuánto cuesta la pintura comercial en Canadá?",
    intro:
      "La pintura comercial se calcula por pie cuadrado de superficie de muro (o de piso), y la preparación, la altura, los recubrimientos y el acceso explican la diferencia de precios. Repintar interiores está en el extremo bajo; los trabajos exteriores, de techos altos y con recubrimientos especiales (pisos epóxicos, protección intumescente contra incendios) cuestan bastante más.",
    typicalRange: "$1.50 a $4.50 por pie²",
    rangeUnit: "superficie de muro interior, 2 manos",
    rows: [
      { item: "Muros interiores (2 manos)", range: "$1.50 a $3.50 por pie²" },
      { item: "Interiores con mucha preparación y resanes", range: "$3 a $5 por pie²" },
      { item: "Exteriores (por pie² de superficie)", range: "$2.50 a $6 por pie²", note: "Más alto con plataformas elevadoras o andamios." },
      { item: "Recubrimiento epóxico para pisos", range: "$4 a $12 por pie²" },
      { item: "Techos altos / trabajo con plataforma elevadora", range: "+15% a 40%", note: "Recargo sobre las tarifas para altura estándar." },
      { item: "Pintura de líneas (estacionamientos)", range: "$4 a $9 por espacio" },
    ],
    factors: [
      { title: "Preparación de superficies", desc: "En superficies descuidadas, resanar, lijar, aplicar imprimación y tratar moho o manchas puede costar más que la pintura misma." },
      { title: "Altura y acceso", desc: "Las plataformas elevadoras, los andamios fijos y los andamios colgantes para trabajos en altura o exteriores agregan costos de equipo y mano de obra." },
      { title: "Tipo de recubrimiento", desc: "El látex estándar es lo más barato; los recubrimientos epóxicos, antigrafiti, intumescentes e industriales cuestan más por pie cuadrado." },
      { title: "Ocupación y horarios", desc: "Pintar alrededor de un negocio en operación, a menudo fuera del horario laboral, eleva el costo de la mano de obra." },
      { title: "Superficie y trabajo recurrente", desc: "Las áreas grandes y continuas y los contratos recurrentes para varias propiedades consiguen mejores tarifas." },
    ],
    faqs: [
      { q: "¿Cómo se cotiza la pintura comercial?", a: "Normalmente por pie cuadrado de superficie, con partidas separadas para la preparación, los recubrimientos y el acceso. Indique los pies cuadrados y el estado de las superficies en su solicitud de propuestas (RFP) para recibir ofertas precisas." },
      { q: "¿Puedo obtener un solo precio para varios edificios?", a: "Sí. Los propietarios de carteras de propiedades suelen agrupar sus ciclos de repintado en un solo contrato para obtener una mejor tarifa. Publique una sola RFP que cubra todas las ubicaciones." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Publique una RFP para obtener ofertas reales de contratistas de pintura comercial.` },
    ],
    metaTitle: "Costo de pintura comercial en Canadá (guía 2026)",
    metaDescription:
      "Costos de pintura comercial en Canadá por pie cuadrado (interiores, exteriores, pisos epóxicos y trabajos en altura) y lo que determina el precio. Obtenga cotizaciones reales publicando una RFP.",
  },
  "parking-lot-paving-cost": {
    name: "Pavimentación y asfalto de estacionamientos",
    query: "costo de pavimentar un estacionamiento",
    headline: "¿Cuánto cuesta pavimentar un estacionamiento en Canadá?",
    intro:
      "El asfalto de estacionamientos se calcula por pie cuadrado para la pavimentación y por trabajo para el mantenimiento, como el sellado y el relleno de grietas. Elegir entre una repavimentación (sobrecapa) o una reconstrucción de profundidad total es el factor que más influye en el costo: la reconstrucción puede costar de 2 a 3 veces más que una sobrecapa.",
    typicalRange: "$3 a $9 por pie²",
    rangeUnit: "asfalto nuevo, instalado",
    rows: [
      { item: "Sobrecapa de asfalto (repavimentación)", range: "$2.50 a $5 por pie²", note: "Sobre una base en buen estado." },
      { item: "Reconstrucción de profundidad total", range: "$6 a $12 por pie²", note: "Excavación, base nueva y asfalto." },
      { item: "Sellado", range: "$0.20 a $0.45 por pie²", note: "Cada 2 a 3 años; protege la superficie." },
      { item: "Relleno de grietas", range: "$1 a $3 por pie lineal" },
      { item: "Pintura de líneas y señalización", range: "$5 a $12 por espacio" },
      { item: "Reparación de sumideros / drenaje", range: "$1,500 a $5,000 por sumidero" },
    ],
    factors: [
      { title: "Sobrecapa o reconstrucción", desc: "Una base en buen estado solo necesita una sobrecapa; una base dañada requiere excavar y reconstruir, a un costo varias veces mayor." },
      { title: "Estado de la base y del drenaje", desc: "Un drenaje deficiente y una base granular débil causan un deterioro prematuro; repararlos desde el inicio protege la inversión." },
      { title: "Tamaño del estacionamiento y movilización", desc: "Los estacionamientos grandes bajan la tarifa por pie cuadrado; los pequeños cargan con un costo fijo de movilización." },
      { title: "Trabajo por etapas según el tráfico", desc: "Mantener parte del estacionamiento abierta durante la obra, o pavimentar de noche, aumenta el costo." },
      { title: "Accesibilidad y señalización", desc: "Los espacios accesibles conforme al código, los letreros y la pintura de líneas nueva suelen formar parte del alcance." },
    ],
    faqs: [
      { q: "¿Cada cuánto se debe sellar un estacionamiento?", a: "Cada 2 a 3 años, para proteger el asfalto y prolongar su vida útil. Muchos propietarios agrupan el sellado y la pintura de líneas en un contrato de mantenimiento recurrente mediante una sola solicitud de propuestas (RFP)." },
      { q: "¿Sobrecapa o reconstrucción total?", a: "Si la base está en buen estado y las grietas son superficiales, una sobrecapa funciona. Las grietas tipo piel de cocodrilo generalizadas y los baches suelen indicar una falla de la base. Una RFP con un alcance bien definido le da precios para ambas opciones." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Publique una RFP para obtener ofertas reales de contratistas de pavimentación.` },
    ],
    metaTitle: "Costo de pavimentar un estacionamiento en Canadá (guía 2026)",
    metaDescription:
      "Costos de pavimentación y asfalto de estacionamientos comerciales en Canadá (sobrecapa, reconstrucción, sellado y pintura de líneas) y lo que determina el precio. Obtenga cotizaciones reales publicando una RFP.",
  },
  "commercial-snow-removal-cost": {
    name: "Remoción de nieve comercial",
    query: "costo de remoción de nieve comercial",
    headline: "¿Cuánto cuesta la remoción de nieve comercial en Canadá?",
    intro:
      "Los contratos comerciales de remoción de nieve se calculan por pasada, por temporada (tarifa fija de temporada) o por hora, más la aplicación de sal y el deshielo. Los contratos de temporada ofrecen previsibilidad a cambio de que el contratista asuma el riesgo del clima; el pago por pasada es más barato en un invierno suave y más caro en uno fuerte. El tamaño del estacionamiento y el umbral de nieve que activa el servicio fijan la tarifa.",
    typicalRange: "$3,500 a $25,000",
    rangeUnit: "por contrato de temporada (según el estacionamiento)",
    rows: [
      { item: "Limpieza con quitanieves por pasada (estacionamiento pequeño)", range: "$75 a $250 por visita" },
      { item: "Limpieza con quitanieves por pasada (estacionamiento grande)", range: "$250 a $900 por visita" },
      { item: "Contrato de temporada (estacionamiento pequeño)", range: "$3,500 a $8,000 por temporada" },
      { item: "Contrato de temporada (estacionamiento grande)", range: "$10,000 a más de $25,000 por temporada" },
      { item: "Aplicación de sal / deshielo", range: "$100 a $500 por aplicación" },
      { item: "Limpieza de aceras", range: "$50 a $200 por visita" },
    ],
    factors: [
      { title: "Tamaño y distribución del estacionamiento", desc: "Los pies cuadrados, el número de entradas, las islas y el espacio para acumular la nieve influyen en el tiempo en el sitio." },
      { title: "Estructura del contrato", desc: "La tarifa fija de temporada traslada el riesgo del clima al contratista; el pago por pasada se lo traslada a usted. Cada uno se adapta a una tolerancia al riesgo distinta." },
      { title: "Umbral de activación y nivel de servicio", desc: "Un umbral de 2 cm con limpieza prioritaria cuesta más que un umbral de 5 cm con tiempos estándar." },
      { title: "Sal y responsabilidad civil", desc: "El riesgo de demandas por resbalones y caídas hace que el deshielo y un registro documentado del servicio sean valiosos, y también una partida de costo." },
      { title: "Aceras y accesibilidad", desc: "Limpiar a mano los pasillos, las entradas y las rutas accesibles agrega mano de obra además del paso del quitanieves." },
    ],
    faqs: [
      { q: "Contrato de temporada o pago por pasada: ¿cuál es más barato?", a: "A lo largo de varios inviernos, suelen equilibrarse. La tarifa de temporada le da un presupuesto fijo y traslada el riesgo del clima al contratista; el pago por pasada puede salir ganando en los años templados. Pida ambas opciones en su solicitud de propuestas (RFP)." },
      { q: "¿Está incluida la aplicación de sal?", a: "No siempre. Confirme si el deshielo, las aceras y un registro de servicio forman parte del alcance. Especifique el nivel de servicio en su RFP para que las ofertas sean comparables." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Publique una RFP para obtener ofertas reales de contratistas de remoción de nieve para su sitio específico.` },
    ],
    metaTitle: "Costo de remoción de nieve comercial en Canadá (guía 2026)",
    metaDescription:
      "Costos de remoción de nieve comercial en Canadá (por pasada, por temporada, aplicación de sal y aceras) y los factores que determinan el precio. Obtenga cotizaciones reales publicando una RFP.",
  },
  "commercial-cleaning-cost": {
    name: "Limpieza comercial y conserjería",
    query: "costo de limpieza comercial",
    headline: "¿Cuánto cuesta la limpieza comercial en Canadá?",
    intro:
      "Los contratos de limpieza y conserjería se calculan por pie cuadrado al mes, por hora o por visita, según la frecuencia y el tipo de espacio. La frecuencia (diaria o semanal), la cantidad de baños y los trabajos especializados, como el cuidado de pisos y la limpieza posterior a la construcción, son los principales factores de costo.",
    typicalRange: "$0.08 a $0.30 por pie²",
    rangeUnit: "al mes, servicio recurrente de limpieza y conserjería",
    rows: [
      { item: "Limpieza de oficinas (mensual, por pie²)", range: "$0.08 a $0.20 por pie² al mes" },
      { item: "Limpieza médica / de laboratorio", range: "$0.15 a $0.35 por pie² al mes", note: "Mayores exigencias de cumplimiento y desinfección." },
      { item: "Tarifa por hora de conserjería", range: "$28 a $50 por hora" },
      { item: "Decapado y encerado de pisos", range: "$0.30 a $0.75 por pie²" },
      { item: "Limpieza de alfombras", range: "$0.15 a $0.40 por pie²" },
      { item: "Limpieza posterior a la construcción", range: "$0.30 a $0.80 por pie²" },
    ],
    factors: [
      { title: "Frecuencia", desc: "El servicio diario cuesta más al mes que el semanal, pero baja la tarifa por visita. Ajuste la frecuencia al tránsito real de personas." },
      { title: "Tipo de espacio", desc: "Los espacios médicos, de laboratorio, de alimentos e industriales requieren protocolos e insumos más rigurosos que una oficina estándar." },
      { title: "Baños y áreas de alto contacto", desc: "La cantidad de baños y la desinfección de superficies de alto contacto aumentan el costo de mano de obra y de consumibles." },
      { title: "Cuidado especializado de pisos", desc: "El decapado y encerado, el pulido y la extracción de alfombras suelen cotizarse por separado de la limpieza de rutina." },
      { title: "Insumos y consumibles", desc: "El monto mensual cambia según si el papel, el jabón y las bolsas los suministra el contratista o el propietario." },
    ],
    faqs: [
      { q: "¿Cómo se suele cobrar la limpieza y conserjería?", a: "La mayoría de los contratos comerciales son una tarifa mensual fija basada en los pies cuadrados y la frecuencia, con el cuidado de pisos y los consumibles como partidas separadas. Indique los pies cuadrados y la frecuencia en su solicitud de propuestas (RFP) para recibir ofertas precisas." },
      { q: "¿Puedo cubrir varios sitios en un solo contrato?", a: "Sí. Los propietarios de carteras de propiedades suelen agrupar ubicaciones para obtener una mejor tarifa y un solo punto de contacto. Publique una sola RFP con todos los sitios." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Publique una RFP para obtener ofertas reales de empresas de limpieza y conserjería.` },
    ],
    metaTitle: "Costo de limpieza comercial en Canadá (guía 2026)",
    metaDescription:
      "Costos de limpieza comercial y conserjería en Canadá (por pie cuadrado, por hora y cuidado de pisos) y lo que determina el precio. Obtenga cotizaciones reales publicando una RFP.",
  },
  "mold-remediation-cost": {
    name: "Remediación de moho comercial",
    query: "costo de remediación de moho",
    headline: "¿Cuánto cuesta la remediación de moho comercial en Canadá?",
    intro:
      "La remediación de moho se calcula según el área afectada y el nivel de contención necesario. Los trabajos pequeños y contenidos son predecibles; la contaminación extensa u oculta detrás de los muros, en el HVAC o ligada a una filtración de agua continua se encarece rápidamente porque también hay que corregir el origen.",
    typicalRange: "$15 a $40 por pie²",
    rangeUnit: "área afectada, con contención",
    rows: [
      { item: "Área pequeña contenida (menos de 30 pie²)", range: "$750 a $2,500" },
      { item: "Área moderada (30 a 100 pie²)", range: "$2,500 a $7,000" },
      { item: "Área grande / varias habitaciones", range: "$7,000 a más de $30,000" },
      { item: "Pruebas de aire y de verificación final por un tercero", range: "$400 a $1,200 por prueba", note: "Antes y después de la remediación." },
      { item: "Remediación del sistema HVAC", range: "$2,000 a más de $8,000" },
      { item: "Reparación del origen (fuga / impermeabilización)", range: "variable", note: "Se cotiza por separado; hay que corregir la causa." },
    ],
    factors: [
      { title: "Área afectada y ubicación", desc: "El moho superficial en paneles de yeso es más barato de tratar que la contaminación dentro de muros, cielos rasos o ductos." },
      { title: "Nivel de contención", desc: "Las áreas contaminadas más grandes requieren contención con presión negativa, filtración HEPA y protocolos de equipo de protección personal (EPP) que elevan el costo." },
      { title: "Fuente de agua subyacente", desc: "La remediación fracasa si no se repara la fuente de humedad (fuga, tapajuntas, pendiente del terreno); por lo general es un alcance aparte." },
      { title: "Pruebas y verificación final", desc: "Las pruebas independientes antes y después, para documentación y tranquilidad de los inquilinos, suman costo, pero lo protegen legalmente." },
      { title: "Ocupación y molestias", desc: "Trabajar en un edificio ocupado, con aviso a los inquilinos y fuera del horario laboral, aumenta la mano de obra." },
    ],
    faqs: [
      { q: "¿Por qué el rango de precios es tan amplio?", a: "El moho oculto y una fuente de agua sin resolver pueden convertir un trabajo pequeño en uno grande. Una solicitud de propuestas (RFP) con un alcance bien definido, idealmente después de una inspección, le da ofertas realistas y comparables." },
      { q: "¿Necesito pruebas independientes?", a: "En los trabajos grandes, las pruebas de verificación final por un tercero lo protegen a usted y les confirman a los inquilinos que el área es segura. Pida a los oferentes que incluyan las pruebas en su respuesta a la RFP." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Publique una RFP para obtener ofertas reales de contratistas de remediación calificados.` },
    ],
    metaTitle: "Costo de remediación de moho comercial en Canadá (guía 2026)",
    metaDescription:
      "Costos de remediación de moho comercial en Canadá según el área afectada y el nivel de contención, además de las pruebas y la reparación del origen. Obtenga cotizaciones reales publicando una RFP.",
  },
  "commercial-window-replacement-cost": {
    name: "Reemplazo de ventanas comerciales",
    query: "costo de reemplazo de ventanas comerciales",
    headline: "¿Cuánto cuesta reemplazar ventanas comerciales en Canadá?",
    intro:
      "El acristalamiento comercial se calcula por ventana o por pie cuadrado de vidrio, y los escaparates, los muros cortina y los trabajos en edificios altos están en el extremo superior. El sistema de marcos, la especificación del vidrio (doble o triple, de baja emisividad, templado) y el acceso (plataformas elevadoras, andamios colgantes) explican la mayor parte de la diferencia.",
    typicalRange: "$700 a $2,500",
    rangeUnit: "por ventana comercial estándar, instalada",
    rows: [
      { item: "Ventana comercial estándar (por unidad)", range: "$700 a $1,800" },
      { item: "Acristalamiento de escaparates (por pie²)", range: "$45 a $90 por pie²" },
      { item: "Muro cortina (por pie²)", range: "$70 a $150 por pie²" },
      { item: "Mejora a vidrio templado / de seguridad", range: "+20% a 50%", note: "Exigido por el código en muchos lugares." },
      { item: "Edificios altos / acceso con plataforma elevadora", range: "+25% a 60%", note: "Andamio colgante o plataforma de brazo articulado." },
      { item: "Reemplazo solo del vidrio (unidad de vidrio aislante, IGU)", range: "$300 a $900 por unidad", note: "Sellos dañados / vidrio empañado." },
    ],
    factors: [
      { title: "Sistema de marcos", desc: "Reemplazar ventanas individuales es más barato que los sistemas de escaparates o muros cortina, que son ensamblajes diseñados por ingenieros." },
      { title: "Especificación del vidrio", desc: "El vidrio triple, de baja emisividad, templado y laminado de seguridad agrega costo, en cada caso, frente al vidrio doble estándar." },
      { title: "Acceso y altura", desc: "Los trabajos en pisos superiores y en edificios altos requieren plataformas elevadoras o andamios colgantes, además de permisos y control del tránsito." },
      { title: "Cantidad", desc: "Los reemplazos en todo el edificio consiguen mejores precios por unidad que los cambios aislados." },
      { title: "Mejoras energéticas y de código", desc: "Cumplir con el código vigente de energía y seguridad puede exigir un vidrio de especificación más alta que el que se reemplaza." },
    ],
    faqs: [
      { q: "¿Reemplazar el vidrio o toda la ventana?", a: "El vidrio empañado por un sello dañado a menudo solo requiere reemplazar la unidad de vidrio aislante, lo que es mucho más barato que la ventana completa. Una solicitud de propuestas (RFP) con un alcance bien definido le da precios para ambas opciones." },
      { q: "¿Cómo se cotiza el acristalamiento?", a: "Por ventana para unidades individuales, o por pie cuadrado para escaparates y muros cortina. Indique cantidades, medidas y detalles de acceso en su RFP para recibir ofertas precisas." },
      { q: NOT_GUARANTEED, a: `${PLANNING} Publique una RFP para obtener ofertas reales de vidrieros comerciales.` },
    ],
    metaTitle: "Costo de reemplazo de ventanas comerciales en Canadá (guía 2026)",
    metaDescription:
      "Costos de reemplazo de ventanas y acristalamiento comercial en Canadá (por ventana, escaparates y muros cortina) y lo que determina el precio. Obtenga cotizaciones reales publicando una RFP.",
  },
};
