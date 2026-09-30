/**
 * Spanish (neutral Latin-American, "usted") versions of the expert RFP
 * templates (lib/seo/rfp-templates), keyed by template slug. Only the parts the
 * RFP Writer puts into a generated RFP: name, scope, requirements, site access
 * and bidder questions. Most Spanish RFPs are for U.S. properties, so anything
 * that depends on the jurisdiction is written for both countries.
 *
 * Tokens compose-es.ts fills in:
 * - "{WCB}": workers' compensation wording for the property's state or province
 *   (state law in the U.S., WSIB in Ontario, CNESST in Quebec, WCB elsewhere).
 * - "{OWNER}": who is named as additional insured (condominium association in
 *   the U.S., condominium corporation in Canada).
 * - "{ca:texto|us:texto}": Canadian wording vs U.S. wording (licences, codes,
 *   units). Neither side may contain "{", "}" or "|".
 * - "Seguro de responsabilidad civil general de $5 millones" / "de $2 millones":
 *   set to the insurance level the property manager picked.
 * - "[X] pies²": replaced with the area when the property manager gave one.
 *   Other areas are written "[X] pies cuadrados" so they are never overwritten.
 */
export interface RfpTemplateEs {
  /** Short name without "RFP Template", e.g. "Reemplazo de techo plano". */
  name: string;
  scope: string;
  requirements: string;
  siteAccess: string;
  questions: string[];
}

/** Same gas-licence and electrical-licence lines in several templates. */
const GAS = "{ca:Certificación para equipos a gas: TSSA en Ontario, RBQ/CCQ en Quebec o el equivalente provincial.|us:Licencia para equipos a gas exigida por el estado o la localidad.}";
const ELECTRICAL = "{ca:Contratista eléctrico con licencia de la ESA (Ontario), maestro electricista miembro de la CMEQ (Quebec) o el equivalente provincial.|us:Contratista eléctrico con la licencia exigida por el estado.}";

export const RFP_TEMPLATES_ES: Record<string, RfpTemplateEs> = {
  "flat-roof-replacement": {
    name: "Reemplazo de techo plano",
    scope: `Alcance del trabajo:
- Retiro y eliminación del sistema de techado existente hasta la plataforma o deck (aprox. [X] pies²).
- Inspección de la plataforma e informe sobre su estado; cotizar una asignación para la reparación de la plataforma como partida separada.
- Instalación de aislamiento nuevo con pendiente integrada, con el valor R que exige el código vigente y drenaje positivo.
- Instalación de un sistema nuevo de membrana monocapa (el oferente debe especificar: TPO, EPDM o asfalto modificado), con instalación certificada por el fabricante.
- Se incluyen todos los tapajuntas, remates metálicos de borde, drenajes y penetraciones.
- Limpieza diaria del sitio; comprobante final de disposición de residuos.
- Inspección final del fabricante y emisión de la garantía NDL.

Fuera del alcance, salvo que se cotice como alternativa adicional:
- Reemplazo estructural de la plataforma en más del [X]% del área total.
- Modificaciones a los accesos al techo (escaleras, escotillas).
- Desmontaje y reinstalación de unidades de HVAC / nuevas bases (curbs).`,
    requirements: `- Seguro de responsabilidad civil general de $5 millones; {OWNER} debe figurar como asegurado adicional (se exige el certificado antes de la movilización).
- {WCB}.
- Instalador certificado por el fabricante del sistema de membrana cotizado.
- Tres referencias de proyectos similares (superficie y tipo de membrana) realizados en los últimos 24 meses.
- El contratista de techado debe contar con una certificación vigente del fabricante de la membrana cotizada.
- Gerente de proyecto asignado a la obra, con datos de contacto en el sitio.`,
    siteAccess: `Acceso al techo por la escalera interior y la escotilla del techo. Área de montaje de la grúa disponible en el estacionamiento norte (espacio limitado; debe coordinarse). Horario de trabajo: de 7 a. m. a 6 p. m. entre semana; el trabajo en fin de semana requiere aprobación previa.`,
    questions: [
      "¿Qué sistema de membrana propone y por qué (frente a las alternativas)?",
      "¿Qué duración y qué cobertura tiene la garantía NDL del fabricante que ofrece?",
      "¿Cómo protegerá el interior del edificio contra filtraciones durante el retiro del techo?",
      "¿Cuál es su protocolo si descubre aislamiento mojado o una plataforma podrida a mitad de la obra?",
      "¿Cuál es su tarifa por pie² para reparaciones adicionales de la plataforma (asignación por tiempo y materiales)?",
      "¿Cuál es el cronograma previsto desde la movilización hasta la inspección final?",
    ],
  },
  "emergency-roof-repair": {
    name: "Reparación de emergencia de techo",
    scope: `Atención inmediata (dentro de 48 horas):
- Evaluación en el sitio del origen de la filtración y del alcance de los daños.
- Parche temporal / lona para detener la entrada de agua hasta la reparación permanente.
- Informe escrito con fotos y el alcance recomendado para la reparación permanente.

Alcance de la reparación permanente (a cotizar dentro de los 5 días hábiles posteriores a la evaluación):
- Detalle de la membrana, los tapajuntas, los drenajes o las penetraciones que se van a reparar.
- Materiales y método (deben respetar, en la medida de lo posible, las condiciones de garantía del sistema de techado existente).
- Garantía sobre la reparación (mínimo 2 años).

Fuera del alcance: el reemplazo completo del techo (RFP separada), salvo que la evaluación determine que la reparación no es viable; en ese caso, recomiende a otro contratista o presente una cotización separada.`,
    requirements: `- Seguro de responsabilidad civil general de $5 millones; {OWNER} debe figurar como asegurado adicional.
- {WCB}.
- Capacidad de respuesta de emergencia (en el sitio dentro de las 48 horas posteriores a la adjudicación).
- Conocimiento del tipo de membrana existente, para no anular ninguna garantía vigente.
- Disponibilidad para trabajar en horario laboral; tarifa fuera de horario informada por adelantado.`,
    siteAccess: `Acceso al techo por [escalera / escotilla / escalera de mano]. El contacto de la propiedad lo recibirá en el sitio. Acceso fuera de horario disponible con aviso previo.`,
    questions: [
      "¿Puede estar en el sitio dentro de las 48 horas posteriores a la adjudicación?",
      "¿Cuál es su tarifa por llamada de emergencia (incluso fuera de horario)?",
      "¿Conoce [nuestro tipo de membrana] y puede repararla sin anular nuestra garantía?",
      "¿Qué incluye su informe de evaluación escrito?",
      "¿Qué garantía ofrece sobre la reparación permanente?",
    ],
  },
  "annual-roof-inspection-contract": {
    name: "Contrato anual de inspección y mantenimiento de techos",
    scope: `Alcance de las inspecciones:
- Dos inspecciones programadas al año (primavera y otoño) por propiedad.
- Inspección visual de la membrana, los tapajuntas, los drenajes, las penetraciones y los parapetos.
- Informe escrito por inspección, con fotos y hallazgos priorizados (inmediato / 12 meses / 24 meses).

Alcance del mantenimiento (incluido hasta el monto de la asignación):
- Limpieza de drenajes, resellado menor de tapajuntas, retiro de escombros, parches menores en la membrana.
- Asignación de mantenimiento de $[X] al año por propiedad; los trabajos que excedan la asignación se cotizan por separado para aprobación del propietario.

Documentación:
- Informe resumen anual de la cartera (todas las propiedades consolidadas).
- Bitácora de mantenimiento actualizada por propiedad.
- Preservación de garantías: todo el mantenimiento se documenta para cumplir las condiciones de garantía del fabricante.`,
    requirements: `- Seguro de responsabilidad civil general de $5 millones; {OWNER} debe figurar como asegurado adicional (en todas las propiedades).
- {WCB}.
- Instalador certificado para los sistemas de membrana de nuestra cartera (lista disponible para los interesados).
- Flexibilidad de horario: disposición para coordinar las inspecciones en función de las operaciones de los inquilinos.
- Se prefiere un portal de informes en línea o informes en PDF.`,
    siteAccess: `Los administradores de propiedades proporcionarán las llaves o tarjetas de acceso al techo y un contacto principal por propiedad. Las inspecciones deben programarse con al menos 7 días de anticipación.`,
    questions: [
      "¿Cuál es su tarifa por inspección por propiedad (y por pie² si el precio es por cartera)?",
      "¿Cómo estructura la asignación de mantenimiento: tarifa fija o tiempo y materiales hasta un tope?",
      "¿Tiene una herramienta de informes en línea a la que los clientes puedan acceder?",
      "¿Cómo maneja la documentación de garantía de los techos certificados por el fabricante?",
      "¿Cuál es su tiempo de respuesta habitual para los problemas detectados en una inspección?",
    ],
  },
  "rooftop-unit-replacement": {
    name: "Reemplazo de unidades de techo (RTU)",
    scope: `Alcance del trabajo:
- Desconexión, puesta fuera de servicio y eliminación de [#] unidades de techo existentes ([tonelaje] toneladas cada una).
- Suministro e instalación de unidades de techo nuevas de capacidad y eficiencia equivalentes o superiores (según recomiende el oferente).
- Adaptadores de base (curb) según se requiera para acoplar las unidades nuevas a las bases existentes.
- Izaje con grúa y maniobras.
- Reconexión eléctrica, reconexión de gas (cuando corresponda) y manejo del condensado.
- Integración de los controles con los termostatos existentes o con el sistema de automatización del edificio (BAS) (especificar cuál tenemos).
- Puesta en marcha, arranque y garantía de 1 año sobre la mano de obra.
- Todos los permisos e inspecciones.

Alternativas adicionales (con precio por separado):
- Unidades de alta eficiencia (especifique las metas de SEER/IEER).
- Integración al BAS si actualmente no están conectadas.
- Economizador / sensores de CO2.`,
    requirements: `- Seguro de responsabilidad civil general de $5 millones; {OWNER} debe figurar como asegurado adicional.
- {WCB}.
- ${GAS}
- Operador de grúa certificado y asegurado.
- {ca:Certificación para el manejo de refrigerantes (tarjeta ODP en Ontario, certificación de halocarbonos en Quebec).|us:Certificación EPA Sección 608 para el manejo de refrigerantes.}
- Instalador autorizado por el fabricante (indique las marcas que distribuye).
- Tres referencias de proyectos de reemplazo de RTU realizados en los últimos 18 meses.`,
    siteAccess: `Acceso al techo por la escalera y la escotilla. El montaje de la grúa requiere coordinación con el estacionamiento (y posiblemente un permiso municipal para ocupar la vía pública). Horario de trabajo: de 7 a. m. a 6 p. m. entre semana.`,
    questions: [
      "¿Qué fabricante(s) propone y por qué?",
      "Reemplazo equivalente o unidades de alta eficiencia: ¿cuál es la diferencia de costo y el retorno estimado de la inversión?",
      "¿Cuál es el plazo de entrega del equipo una vez adjudicado el contrato?",
      "¿La base existente es compatible o necesitamos adaptadores?",
      "¿Qué incluyen la puesta en marcha y el arranque?",
      "¿Cuáles son las condiciones de garantía sobre la mano de obra y las piezas?",
    ],
  },
  "annual-hvac-maintenance-contract": {
    name: "Contrato anual de mantenimiento de HVAC",
    scope: `Mantenimiento programado (4 veces al año por unidad, salvo que se indique otra cosa):
- Limpieza de serpentines (condensador y evaporador).
- Reemplazo de filtros (filtros MERV [#] estándar incluidos; filtros de MERV más alto como alternativa adicional).
- Inspección y reemplazo de correas y rodamientos.
- Verificación de la presión del refrigerante y recarga (compatible con R-410A / R-454B).
- Inspección y ajuste de las conexiones eléctricas.
- Limpieza de la bandeja de drenaje y de la línea de condensado.
- Calibración de termostatos y controles.
- Informe escrito por visita, con hallazgos y recomendaciones.

Anual:
- Análisis de combustión (equipos a gas).
- Informe integral de eficiencia.
- Datos para el estudio del fondo de reserva: antigüedad del equipo y vida útil restante de cada unidad.

Asignación para reparaciones:
- $[X] al año cubren las reparaciones menores y las piezas de menos de $[Y] por evento.
- Las reparaciones mayores se cotizan por separado para su aprobación antes de iniciar el trabajo.

Respuesta a emergencias:
- Tarifa por llamada de emergencia fuera de horario informada por adelantado.
- Tiempo de respuesta objetivo: [X] horas.`,
    requirements: `- Seguro de responsabilidad civil general de $5 millones.
- {WCB}.
- ${GAS}
- {ca:Certificación para el manejo de refrigerantes.|us:Certificación EPA Sección 608 para el manejo de refrigerantes.}
- {ca:Técnicos certificados (mecánico de refrigeración y aire acondicionado con Sello Rojo / Red Seal, o el equivalente provincial).|us:Técnicos con la licencia de HVAC exigida por el estado o la localidad (de preferencia con certificación NATE).}
- Se prefiere un portal de clientes / informes en línea.`,
    siteAccess: `El administrador de propiedades facilita el acceso al techo y al cuarto de máquinas. Las visitas deben programarse con al menos 5 días hábiles de anticipación. El trabajo fuera de horario se coordina según sea necesario.`,
    questions: [
      "¿Cuál es la tarifa anual por unidad (y hay algún descuento por cartera)?",
      "¿Qué incluye la asignación para reparaciones? ¿Cuál es el tope por visita y por año?",
      "¿Cuál es su tiempo de respuesta a emergencias y su tarifa fuera de horario?",
      "¿Tiene un portal de clientes con el historial de servicio?",
      "¿Cómo documenta los trabajos en garantía para mantener vigentes las garantías del fabricante?",
    ],
  },
  "boiler-replacement": {
    name: "Reemplazo de caldera",
    scope: `Alcance del trabajo:
- Puesta fuera de servicio, drenaje y retiro de la caldera existente ([modelo / antigüedad]).
- Suministro e instalación de una caldera nueva de capacidad equivalente o superior ([potencia de entrada en BTU]).
- Nuevo sistema de ventilación / revestimiento de chimenea, según se requiera para una caldera de condensación de alta eficiencia.
- Modificaciones a la línea de gas, si es necesario.
- Integración de controles (controles modulantes, compensación por temperatura exterior, integración al BAS si corresponde).
- Bombas de circulación y válvulas de zona nuevas si las existentes están al final de su vida útil (cotizar por separado).
- Puesta en marcha, arranque y restablecimiento de la calefacción de los inquilinos dentro de [X] días.
- {ca:Inspección y certificado de la TSSA (Ontario) o de la autoridad provincial.|us:Inspección de la caldera y certificado de operación exigidos por el estado o la localidad.}
- Todos los permisos.

Alternativas adicionales:
- Reemplazo del tanque de agua caliente doméstica (si comparte el sistema de la caldera).
- Mejora del aislamiento de tuberías.
- Mejora del intercambiador de calor.`,
    requirements: `- Seguro de responsabilidad civil general de $5 millones.
- {ca:Certificado de gas correspondiente: TSSA Gas Technician 2 como mínimo en Ontario (Gas Technician 1 para equipos más grandes), certificado CCQ en Quebec o el equivalente provincial.|us:Licencia de gasista y de instalación de calderas exigida por el estado o la localidad.}
- {WCB}.
- Instalador autorizado por el fabricante.
- Tres referencias de reemplazos de calderas similares realizados en los últimos 24 meses.
- Plan para mantener la calefacción durante el cambio (especialmente crítico en invierno; caldera temporal si es necesario).`,
    siteAccess: `Acceso al cuarto de máquinas por [ubicación]. El cambio de caldera suele requerir un corte parcial de la calefacción; coordine con los inquilinos con al menos 2 semanas de anticipación.`,
    questions: [
      "Caldera de condensación de alta eficiencia o de eficiencia media: ¿cuál es la diferencia de costo y el ahorro de energía previsto?",
      "¿Cuál es el plazo de entrega del equipo?",
      "¿Se necesita una caldera temporal durante el cambio (y cuánto cuesta)?",
      "¿Cuánto tiempo prevé que los inquilinos estarán sin calefacción?",
      "¿Qué garantía del fabricante aplica?",
    ],
  },
  "parking-lot-resurfacing": {
    name: "Repavimentación de estacionamiento",
    scope: `Alcance del trabajo:
- Levantamiento del estado previo a la obra, con recomendación: fresado y recarpeteo o reconstrucción completa.
- Fresado del asfalto existente a [profundidad] (o retiro completo en caso de reconstrucción).
- Reparación o reemplazo de la capa base dañada, según se requiera.
- Nueva carpeta asfáltica {ca:(mezcla HL3 en Ontario, EB-10S en Quebec, o equivalente)|us:(mezcla de superficie según la especificación del departamento de transporte del estado, o equivalente)} de [espesor] sobre base compactada.
- Restablecimiento del drenaje positivo hacia los sumideros existentes; ajuste de los marcos de los sumideros según sea necesario.
- Nueva demarcación de líneas igual a la distribución existente (o según la nueva distribución del plano adjunto).
- Pintura y señalización de los espacios de estacionamiento accesibles según {ca:la AODA / el código provincial|us:la ADA y el código local}.
- Reductores de velocidad, líneas de alto y flechas direccionales como los existentes.

Alternativas adicionales:
- Reemplazo de sumideros (precio por unidad).
- Reparación o reemplazo de bordillos (precio por pie lineal).
- Reparación de aceras de concreto (precio por pie²).
- Sellado de grietas en las áreas adyacentes en buen estado.`,
    requirements: `- Seguro de responsabilidad civil general de $5 millones.
- {WCB}.
- Tres referencias de estacionamientos comerciales de tamaño similar realizados en los últimos 24 meses.
- Cumplimiento de {ca:las normas provinciales de seguridad para obras viales|us:las normas de seguridad de OSHA y del estado para obras viales}.
- Plan de trabajo por fases que mantenga un acceso parcial al sitio para los inquilinos durante todo el proyecto.`,
    siteAccess: `La propiedad permanece ocupada durante el trabajo. El oferente debe proponer un cronograma por fases que mantenga disponible al menos el [X]% de los espacios en todo momento. Es posible colocar el asfalto de noche o en fin de semana; indique el recargo.`,
    questions: [
      "Fresado y recarpeteo o reconstrucción completa: ¿qué recomienda y por qué?",
      "¿Qué mezcla asfáltica propone y cuál es la garantía?",
      "¿Cómo organizará las fases del trabajo para que el estacionamiento siga funcionando?",
      "¿Quién es su subcontratista de demarcación y cómo cumplirá con {ca:la AODA y las normas provinciales de accesibilidad|us:la ADA}?",
      "¿Cuál es el costo por unidad del ajuste o reemplazo de sumideros?",
    ],
  },
  "snow-removal-seasonal-contract": {
    name: "Contrato de temporada para remoción de nieve",
    scope: `Alcance del trabajo:
- Remoción de nieve con quitanieves en todas las áreas de estacionamiento, entradas vehiculares y muelles de carga a partir de una acumulación de {ca:[X] cm|us:[X] pulgadas}.
- Limpieza de aceras (nieve y hielo) hasta las entradas de la propiedad dentro de las [X] horas posteriores al fin de la nevada.
- Aplicación de sal / arena en todas las superficies peatonales y en las áreas vehiculares de alto riesgo.
- Monitoreo 24/7 durante las nevadas.
- Nuevas aplicaciones de sal a mitad de temporada, según sea necesario.
- Limpieza de fin de temporada (retiro de arena de los bordes del césped).

Opciones de precio (el oferente debe cotizar ambas):
1. Tarifa fija por temporada: cubre eventos ilimitados dentro del alcance contratado.
2. Por evento: tarifa por pasada de quitanieves + tarifa por aplicación de sal.

Estándares de servicio:
- Todas las áreas vehiculares despejadas dentro de las [X] horas posteriores al fin de la nevada.
- Aceras despejadas dentro de las [X] horas.
- Aplicación de sal en cada evento y cuando las temperaturas generen riesgo de recongelamiento.
- Bitácora de servicio por evento (hora de inicio, hora de fin, materiales utilizados).`,
    requirements: `- Seguro de responsabilidad civil general de $5 millones con cobertura por resbalones y caídas.
- {WCB}.
- Bitácora de servicio documentada por evento (fecha, hora, acción, materiales).
- Rastreo GPS del equipo (de preferencia).
- Equipo y personal de respaldo documentados (no se aceptarán excusas como "se descompusieron los camiones").
- Mapa de cobertura del área de servicio.
- Tres referencias de propiedades comerciales de tamaño similar en las últimas 2 temporadas.`,
    siteAccess: `Se requiere acceso completo a la propiedad. La propiedad tiene [X] espacios de estacionamiento, [X] pies lineales de acera y [X] entradas. Se proporcionará el plano del sitio a los interesados.`,
    questions: [
      "Tarifa fija por temporada o precio por evento: ¿qué recomienda y por qué?",
      "¿A partir de qué acumulación interviene y qué tiempo de respuesta garantiza?",
      "¿Su equipo cuenta con rastreo GPS?",
      "¿Cuál es su plan de respaldo si un camión principal se descompone en plena tormenta?",
      "¿Qué cobertura de responsabilidad civil tiene por resbalones y caídas?",
      "¿Qué está incluido y qué tiene costo adicional (p. ej., limpieza de fin de temporada, sal a mitad de temporada)?",
    ],
  },
  "landscaping-annual-contract": {
    name: "Contrato anual de jardinería y paisajismo",
    scope: `Semanal o cada dos semanas (de mayo a octubre):
- Corte de césped, perfilado de bordes y recorte.
- Deshierbe y mantenimiento de jardineras.
- Limpieza de recortes de césped en los senderos peatonales y los bordes del estacionamiento.
- Inspección visual de árboles y arbustos; informe de problemas.

De temporada:
- Limpieza de primavera (principios de mayo): retiro de escombros, preparación de jardineras, renovación del mantillo (mulch), poda.
- Limpieza de otoño (octubre): retiro de hojas, preparación de las jardineras para el invierno, corte de las plantas perennes.
- Arranque del sistema de riego (mayo) y cierre con purga de aire (octubre).

Anual:
- Fertilización (una o dos aplicaciones, según recomiende el oferente).
- Control de malezas ({ca:según el reglamento provincial sobre pesticidas de uso cosmético|us:según las regulaciones estatales y locales sobre pesticidas}).
- Aireación y resiembra (otoño).

Alternativas adicionales (con precio por separado):
- Poda de árboles (más allá de la inspección visual).
- Retiro o reemplazo de árboles / arbustos.
- Diseño e instalación de nuevas plantaciones.
- Mantillo adicional (aplicaciones extra).`,
    requirements: `- Seguro de responsabilidad civil general de $2 millones.
- {WCB}.
- {ca:Licencia provincial de aplicador de pesticidas|us:Licencia estatal de aplicador de pesticidas} para cualquier aplicación de productos químicos.
- Tres referencias de propiedades de tamaño similar en las últimas 2 temporadas.
- Horario: visitas el mismo día o los mismos días de la semana.`,
    siteAccess: `La propiedad tiene [X] pies cuadrados de césped, [X] pies lineales de jardineras y [X] árboles maduros. Se proporcionará el plano del sitio a los interesados.`,
    questions: [
      "Visitas semanales o cada dos semanas: ¿qué recomienda para nuestro tipo de propiedad?",
      "¿Qué incluye la limpieza de primavera y qué incluye la de otoño?",
      "¿Cómo atendería una preferencia por mantenimiento orgánico / sin pesticidas si lo solicitamos?",
      "¿Qué equipo utiliza (cortadoras de césped, sopladoras: a gasolina o eléctricas)?",
      "¿Cuál es el costo por visita frente a una tarifa fija por temporada?",
    ],
  },
  "exterior-painting": {
    name: "Pintura exterior",
    scope: `Alcance del trabajo:
- Lavado a presión de todas las superficies exteriores que se van a pintar.
- Raspado, lijado y preparación de las áreas con pintura deteriorada.
- Sellado menor y reparación de grietas (asignación; las reparaciones mayores se cotizan por separado).
- Imprimación donde el sustrato quede expuesto o cambie el tipo de superficie.
- 2 manos de látex / acrílico exterior de primera calidad (el oferente recomienda el producto).
- Molduras, puertas, plafones exteriores (sofitos) y fascias según la tabla de colores adjunta.
- Limpieza diaria del sitio; recorrido final y retoques.
- Garantía del fabricante y del aplicador.

Fuera del alcance, salvo que se cotice como alternativa adicional:
- Reparación de estuco / reaplicación de estuco.
- Reemplazo de madera.
- Masillado de ventanas.`,
    requirements: `- Seguro de responsabilidad civil general de $2 millones.
- {WCB}.
- {ca:Certificación de trabajo en altura para todo el personal.|us:Capacitación en protección contra caídas (OSHA) para todo el personal.}
- Tres referencias de proyectos comerciales exteriores similares realizados en los últimos 24 meses.
- Costo de la plataforma elevadora / andamios incluido en la oferta.
- Cumplimiento de la normativa sobre COV (se prefieren productos con bajo contenido de COV).`,
    siteAccess: `El edificio permanece ocupado. Coordine la ubicación de la plataforma elevadora con el estacionamiento. Horario de trabajo: de 7 a. m. a 6 p. m. entre semana. Avise a los inquilinos 48 horas antes de pintar su fachada.`,
    questions: [
      "¿Qué línea de pintura propone y cuál es la garantía del fabricante?",
      "¿Cuál es su asignación para preparación y reparación de superficies deterioradas, y qué genera un costo adicional?",
      "Plataforma elevadora o andamios: ¿qué incluye su oferta?",
      "¿Cuál es el tamaño de la cuadrilla y el cronograma previsto?",
      "¿Cómo protegerá el jardín, las ventanas y los vehículos estacionados?",
    ],
  },
  "common-area-painting": {
    name: "Pintura de áreas comunes",
    scope: `Alcance del trabajo:
- Preparación ligera: resanado de agujeros de clavos, reparaciones menores de paneles de yeso, sellado.
- Imprimación sobre las áreas resanadas y sobre los marcos de puertas donde cambie el color.
- 2 manos de látex interior de primera calidad en todas las paredes.
- Puertas, marcos, zócalos, cielorrasos (especificar cuáles; normalmente solo paredes y marcos de puertas).
- Protección diaria de pisos y mobiliario.
- Limpieza diaria del sitio; ningún acceso de los inquilinos queda bloqueado durante la noche.

Trabajo por fases:
- Un piso a la vez, solo entre semana.
- Avisar a los residentes 48 horas antes de trabajar en cada piso.
- Escaleras pintadas fuera de horario (noches / fines de semana) si la seguridad de las personas lo permite.

Alternativas adicionales:
- Reparación de paneles de yeso más allá de la asignación ([X] pies cuadrados).
- Pintura de cielorrasos.
- Repintado completo de puertas y marcos.`,
    requirements: `- Seguro de responsabilidad civil general de $2 millones.
- {WCB}.
- Pintura con bajo contenido de COV (de preferencia sin COV, ya que el edificio está habitado).
- Todo el personal preparado para trabajar en edificios ocupados (no fumar, presentación profesional, permisos de trabajo según se requiera).
- Tres referencias de proyectos residenciales multifamiliares o comerciales en edificios ocupados.`,
    siteAccess: `Edificio ocupado. Trabajo entre semana de 8 a. m. a 5 p. m. en los pasillos y de 8 a. m. a 8 p. m. en las escaleras (sujeto a quejas de los inquilinos). Estacione en [área designada]. Use el elevador de servicio para los materiales.`,
    questions: [
      "¿Usará pintura sin COV? ¿Qué producto?",
      "¿Cómo organizará las fases del trabajo para minimizar las molestias a los inquilinos?",
      "¿Cuál es el tamaño de la cuadrilla y el cronograma previsto?",
      "¿Cómo maneja las quejas de los inquilinos durante el trabajo en un edificio ocupado?",
      "¿Qué está incluido y qué es alternativa adicional? Confirme puertas, marcos y cielorrasos.",
    ],
  },
  "corridor-flooring-replacement": {
    name: "Reemplazo de pisos de pasillos",
    scope: `Alcance del trabajo:
- Retiro y eliminación del piso existente (alfombra y bajoalfombra, vinilo, etc.) en [X] niveles.
- Inspección del estado del contrapiso; informe sobre cualquier reparación necesaria (asignación por tiempo y materiales).
- Preparación del piso: compuesto nivelador donde sea necesario, aspirado e imprimación según las especificaciones del fabricante.
- Suministro e instalación del piso nuevo según la opción elegida:
  - OPCIÓN A: losetas de alfombra de grado comercial (especificar la clase del producto).
  - OPCIÓN B: vinilo de lujo en tablones (LVT, capa de desgaste de 5 mm o más).
- Perfiles de transición y zócalo de vinilo nuevos.
- Protección diaria de las puertas de las unidades y de los acabados adyacentes.
- Limpieza final y recorrido de inspección.

Trabajo por fases:
- Un nivel a la vez, en horario laboral entre semana.
- Avisar a los residentes 7 días antes de trabajar en su nivel.
- Se requiere coordinar el uso del elevador de servicio.

Alternativas adicionales:
- Reparación del contrapiso más allá de la asignación.
- Recorte inferior de puertas para dejar el espacio libre necesario.
- Pisos del vestíbulo y de las áreas de amenidades.`,
    requirements: `- Seguro de responsabilidad civil general de $2 millones.
- {WCB}.
- Instalador capacitado por el fabricante del producto elegido.
- Tres referencias de pisos en pasillos de edificios multifamiliares ocupados en los últimos 24 meses.
- Plan para proteger los marcos de las puertas de las unidades y los muebles de los inquilinos en el pasillo.`,
    siteAccess: `Edificio ocupado. Trabajo entre semana de 8 a. m. a 5 p. m. Elevador de servicio disponible para los materiales. Cada nivel quedará parcialmente intransitable durante 1 día de la instalación; planifique la comunicación con los inquilinos en consecuencia.`,
    questions: [
      "¿Cuál es el costo instalado por pie² de cada opción (losetas de alfombra y LVT)?",
      "¿Qué garantía ofrece sobre la capa de desgaste?",
      "¿Cómo maneja las fallas del contrapiso que se descubran a mitad del proyecto?",
      "¿Cuál es el tamaño de la cuadrilla y el cronograma previsto por nivel?",
      "¿Puede proporcionar muestras físicas de los productos recomendados?",
    ],
  },
  "elevator-service-contract": {
    name: "Contrato de servicio de elevadores",
    scope: `Alcance del trabajo:
- Mantenimiento preventivo mensual según {ca:ASME A17.1 / CSA B44|us:ASME A17.1}.
- Reemplazo de todas las piezas de desgaste (cables, pastillas de freno, rodillos, controladores según el calendario del fabricante original).
- Servicio de emergencia 24/7, con tiempo de respuesta garantizado de [X] horas.
- Coordinación de la inspección anual {ca:de la TSSA (o de la autoridad provincial)|us:estatal o municipal} y obtención del certificado.
- Recomendaciones de modernización y datos para el fondo de reserva.
- Portal de clientes en línea con bitácora de servicio e historial de llamadas.

Inclusiones (contrato de mantenimiento integral):
- Todas las piezas y la mano de obra incluidas (a diferencia de los contratos de "solo lubricación", u "oil & grease", sin piezas).
- Reemplazo de componentes mayores hasta $[X] por elevador al año.
- La modernización mayor se cotiza por separado.

Fuera del alcance:
- Modernización / mejoras.
- Acabados interiores de la cabina.
- Reparación de daños por vandalismo.

Estándares de servicio:
- Tiempo de respuesta: [X] horas sin emergencia / [X] minutos en emergencia (personas atrapadas).
- Meta de disponibilidad: [X]% por elevador al mes.
- Cláusula de penalización / crédito si no se cumple la meta de disponibilidad.`,
    requirements: `- {ca:Mecánico de elevadores con licencia de la TSSA (Ontario) o el certificado provincial equivalente (CCQ en Quebec).|us:Mecánico de elevadores con la licencia exigida por el estado.}
- Seguro de responsabilidad civil general de $5 millones.
- {WCB}.
- Despacho 24/7 con mecánicos locales (no solo un centro de llamadas).
- Portal de clientes en línea.
- Tres referencias de edificios de tipo similar en los últimos 2 años.
- Proceso de escalamiento claro si nuestras inquietudes no se atienden.`,
    siteAccess: `Acceso al cuarto de máquinas por [ubicación]. Acceso al foso por la planta baja. Coordine el mantenimiento fuera de las horas pico siempre que sea posible.`,
    questions: [
      "Contrato de mantenimiento integral o de solo lubricación (oil & grease): ¿qué recomienda y por qué?",
      "¿Cuál es la tarifa mensual por elevador?",
      "¿Qué tiempo de respuesta a emergencias garantiza y qué pasa si no lo cumple?",
      "¿Cuántos elevadores atiende cada uno de sus mecánicos locales?",
      "En el reemplazo de componentes mayores, ¿qué está incluido y qué tiene costo adicional?",
      "¿Ofrece un portal de clientes en línea? ¿Podemos ver una demostración?",
      "¿Cuál es la cláusula de terminación del contrato?",
    ],
  },
  "electrical-panel-upgrade": {
    name: "Actualización del tablero eléctrico",
    scope: `Alcance del trabajo:
- Ingeniería / diseño (o coordinación con nuestro ingeniero consultor).
- Coordinación con {ca:la empresa distribuidora local (LDC)|us:la compañía eléctrica local} para el aumento de la acometida (conexión / medición).
- Puesta fuera de servicio del tablero principal existente.
- Suministro e instalación de un tablero principal nuevo de [X] A con la configuración de interruptores adecuada.
- Suministro e instalación de [#] subtableros nuevos (si se requieren).
- Conductores de acometida nuevos desde la conexión de la compañía eléctrica hasta el tablero.
- Toda la puesta a tierra y la unión equipotencial según {ca:el Código Eléctrico Canadiense|us:el National Electrical Code (NEC)}.
- Coordinación de la inspección {ca:de la ESA (Ontario) o de la autoridad provincial|us:eléctrica municipal o estatal} y obtención del certificado.
- Permisos.
- Tiempo sin electricidad para los inquilinos: limitado a menos de [X] horas; trabajo fuera de horario si es necesario (indique el recargo).

Alternativas adicionales:
- Subtableros nuevos por piso / por área.
- Tablero para carga de vehículos eléctricos y asignación para circuitos.
- Interruptor de transferencia para generador.
- Protección contra sobretensiones.`,
    requirements: `- Maestro electricista en la plantilla.
- ${ELECTRICAL}
- Seguro de responsabilidad civil general de $5 millones.
- {WCB}.
- Tres referencias de aumentos de acometida similares en los últimos 24 meses.
- Plan para manejar el corte de electricidad de los inquilinos durante la conmutación.
- Coordinación con la compañía eléctrica local y el inspector de construcción.`,
    siteAccess: `Acceso al cuarto eléctrico principal por [ubicación]. La conmutación debe programarse fuera de horario para minimizar el impacto en los inquilinos.`,
    questions: [
      "¿Cuál es el costo de ingeniería y permisos, y está incluido?",
      "¿Cuál es el plazo desde la adjudicación hasta la conmutación con la compañía eléctrica?",
      "¿Cómo manejará el corte de electricidad para los inquilinos?",
      "¿Cuál es el costo por unidad de los subtableros adicionales (alternativas adicionales)?",
      "¿Qué costos de inspección eléctrica{ca: (ESA en Ontario o la autoridad provincial)|us:} están incluidos?",
    ],
  },
  "led-lighting-retrofit": {
    name: "Conversión a iluminación LED",
    scope: `Alcance del trabajo:
- Auditoría de las luminarias existentes y recomendación por ubicación: reemplazo completo de la luminaria o kit de conversión LED.
- Suministro e instalación de [número de luminarias] luminarias LED / kits de conversión (listados por la DLC para calificar a los incentivos de la compañía eléctrica).
- Eliminación de las luminarias y lámparas existentes según {ca:la reglamentación provincial|us:las regulaciones federales, estatales y locales} (en especial las lámparas HID que contienen mercurio).
- Controles nuevos si se requieren: sensores de ocupación, aprovechamiento de luz natural, atenuación.
- Trámites de incentivos de la compañía eléctrica ({ca:Save on Energy, Hydro-Québec, etc.|us:programas de la compañía eléctrica local}); el oferente coordina la solicitud.
- Informe fotométrico que verifique que los niveles de iluminación cumplen los estándares mínimos.
- Garantía del fabricante (mínimo 5 años en piezas).

Alternativas adicionales:
- Controles en red (BAS / administrados en la nube).
- Integración de baterías de respaldo para la iluminación de emergencia.
- Iluminación exterior del sitio (postes de luz del estacionamiento).`,
    requirements: `- ${ELECTRICAL}
- Seguro de responsabilidad civil general de $5 millones.
- {WCB}.
- Conocimiento de los programas de incentivos de las compañías eléctricas en {ca:nuestra provincia|us:nuestro estado}.
- Tres referencias de conversiones similares en los últimos 18 meses.
- Historial comprobado de incentivos aprobados (solicitaremos datos sobre la tasa de aprobación de sus trámites).`,
    siteAccess: `Estacionamiento cubierto / áreas comunes / exterior; coordine el trabajo con las operaciones de los inquilinos. Se requiere plataforma elevadora para techos altos.`,
    questions: [
      "¿Cuál es el costo instalado por luminaria (desglosado por tipo de luminaria)?",
      "¿Cuál es el ahorro de energía previsto ($/año) y el período de recuperación de la inversión, incluido el incentivo?",
      "¿A qué incentivo de la compañía eléctrica calificamos y usted se encarga del trámite?",
      "¿Cuáles son las condiciones de garantía del fabricante y de la mano de obra?",
      "¿Recomienda el reemplazo completo de luminarias o kits de conversión, y por qué?",
    ],
  },
  "annual-fire-safety-inspection": {
    name: "Contrato anual de inspección de seguridad contra incendios",
    scope: `Alcance anual según {ca:CAN/ULC-S536 y el código de incendios provincial|us:NFPA 72 y el código de incendios estatal y local}:
- Panel de alarma contra incendios y todos los dispositivos (detectores de calor / humo, estaciones manuales, bocinas, luces estroboscópicas).
- Sistema de rociadores (húmedo / seco / de preacción): inspección anual según NFPA 25.
- Inspección de tomas de agua para bomberos (standpipes) y mangueras.
- Extintores portátiles (servicio anual y, cuando corresponda, mantenimiento interno de 6 años / prueba hidrostática de 12 años).
- Iluminación de emergencia y letreros de salida (revisión visual mensual; prueba anual de descarga de 90 minutos).
- Sistemas de extinción de cocinas (semestral, si aplica).
- Sistemas de control de humo / presurización (si aplica).
- Prueba de calidad del combustible del generador (si aplica).
- Certificado de inspección por dispositivo, archivado en la carpeta de seguridad contra incendios.

Informes:
- Informe escrito con todas las deficiencias clasificadas: incumplimiento del código (corrección obligatoria), recomendada o diferida.
- Cotización para la reparación de las deficiencias (se requiere la aprobación del propietario antes de iniciar el trabajo).
- Portal en línea con el historial de inspecciones y los certificados.

Alternativas adicionales:
- Prueba de flujo total de rociadores cada 5 años (cuando corresponda).
- Prueba de los retenedores magnéticos de puertas.
- Prueba anual de la bomba contra incendios.
- Asignación para reemplazo de baterías.`,
    requirements: `- {ca:Técnico de alarmas contra incendios certificado por la CFAA (Canadian Fire Alarm Association).|us:Técnico de alarmas contra incendios con certificación NICET.}
- Empresa de rociadores con la licencia exigida por {ca:la provincia (licencia RBQ en Quebec)|us:el estado}.
- Seguro de responsabilidad civil general de $5 millones.
- {WCB}.
- Tres referencias de propiedades de tipo similar en los últimos 12 meses.
- Portal en línea con historial de inspecciones que se pueda consultar.
- Declaración clara de conflictos de interés (algunos oferentes cotizan la inspección barata y luego inflan las cotizaciones de reparación; vamos a comparar).`,
    siteAccess: `El contacto de la propiedad coordinará el acceso a los cuartos de máquinas, a los cuartos de válvulas de rociadores y a todos los pisos. Se requiere aviso a los inquilinos para las pruebas de detectores de humo dentro de las unidades.`,
    questions: [
      "¿Cuál es el costo anual por propiedad?",
      "¿El costo está desglosado (alarma, rociadores, extintores) para que podamos comparar en igualdad de condiciones?",
      "¿Cómo maneja las cotizaciones de reparación de deficiencias? ¿Es independiente o tiene un incentivo para vender trabajos adicionales?",
      "¿Tiene un portal de clientes? ¿Podemos ver una demostración?",
      "¿Cuál es su política sobre conflictos de interés?",
    ],
  },
  "mold-remediation": {
    name: "Remediación de moho",
    scope: `Alcance del trabajo:
- Evaluación previa a la remediación con nuestro higienista industrial (IH) independiente; el oferente coordina.
- Contención según IICRC S520: barrera completa con filtración HEPA a presión negativa.
- EPP para todos los trabajadores según {ca:las normas provinciales|us:las normas de OSHA}.
- Retiro y eliminación de todos los materiales porosos afectados (paneles de yeso, aislamiento, alfombra, etc.) según {ca:la reglamentación provincial|us:las regulaciones estatales y locales}.
- Aspirado HEPA y tratamiento antimicrobiano de todas las superficies no porosas.
- Limpieza final del área de contención.
- Plan de comunicación con los inquilinos (especialmente importante en propiedades residenciales).

Reparación de la causa (alcance separado, pero coordinado):
- La fuga o fuente de humedad debe repararse antes de terminar la remediación.
- Si no se conoce el alcance de la reparación, el oferente debe incluir una asignación.

Después de la remediación:
- Pruebas de liberación posteriores a la remediación, a cargo de un higienista industrial independiente (no la empresa de remediación; es indispensable para la credibilidad).
- Certificado de liberación.
- La reconstrucción se cotiza por separado (o la realiza otro contratista).`,
    requirements: `- Técnico en remediación de moho certificado por el IICRC {ca:(o el equivalente provincial)|us:(y con la licencia estatal, donde se exija)}.
- Seguro de responsabilidad civil general de $5 millones con cobertura específica para moho.
- {WCB}.
- Cumplimiento de {ca:las guías del Ministerio de Trabajo provincial (o de la CNESST en Quebec) sobre trabajos con moho|us:las guías de OSHA y de la EPA sobre remediación de moho}.
- Tres referencias de proyectos de tamaño similar en los últimos 18 meses.
- Disposición a trabajar con un higienista industrial independiente (condición indispensable: nunca se aceptará al higienista interno de una empresa de remediación para la liberación).`,
    siteAccess: `Unidad o área afectada. Puede ser necesario reubicar a los inquilinos (coordinar con el administrador de propiedades). La contención bloqueará el acceso normal durante la remediación.`,
    questions: [
      "¿Trabajará con nuestro higienista industrial independiente tanto en la evaluación previa como en la liberación?",
      "¿Cuál es su protocolo de contención (según IICRC S520)?",
      "¿Cuál es el costo por pie² de la remediación? ¿Qué se cotiza por separado (reconstrucción, higienista, reubicación de inquilinos)?",
      "Comunicación con los inquilinos: ¿se encarga usted o nos corresponde a nosotros?",
      "¿Cuál es su cronograma desde la movilización hasta la liberación?",
    ],
  },
  "pest-control-contract": {
    name: "Contrato de control de plagas",
    scope: `Servicio programado (4 veces al año):
- Inspección interior y del perímetro exterior.
- Inspección de las estaciones para roedores y renovación del cebo.
- Tratamiento exterior de grietas y hendiduras.
- Inspección de áreas comunes (vestíbulo, cuarto de basura, cuartos de máquinas).
- Informe escrito por visita.

Servicio a solicitud (incluido o con tarifa por llamada):
- Problemas de plagas reportados por los inquilinos: respuesta dentro de [X] horas.
- Tratamiento según el tipo de plaga (cucarachas, chinches de cama, hormigas, etc.).
- Visitas de seguimiento según sea necesario.

Principios de manejo integrado de plagas (MIP/IPM):
- Enfoque basado primero en la inspección.
- Exclusión (sellado de puntos de entrada) antes del tratamiento químico.
- Productos dirigidos y de la menor toxicidad posible.
- Uso reducido de pesticidas en las áreas de los inquilinos.

Alternativas adicionales:
- Tratamiento específico contra chinches de cama (por unidad).
- Retiro de fauna silvestre (mapaches, ardillas, etc.).
- Tratamiento preventivo de áreas comunes antes / después de mudanzas de inquilinos.`,
    requirements: `- Licencia {ca:provincial|us:estatal} de control de plagas vigente.
- Seguro de responsabilidad civil general de $2 millones.
- {WCB}.
- Técnicos capacitados en manejo integrado de plagas (MIP).
- Cumplimiento de {ca:la reglamentación provincial sobre pesticidas de uso cosmético|us:las regulaciones estatales y locales sobre pesticidas}.
- Portal de clientes en línea con historial de servicio.
- Tres referencias de propiedades de tipo similar en los últimos 12 meses.`,
    siteAccess: `Áreas comunes y acceso a unidades a solicitud, a través del administrador de propiedades. Se requiere avisar a los inquilinos 24 horas antes de trabajar dentro de una unidad.`,
    questions: [
      "¿Cuál es el costo anual por propiedad? ¿Qué está incluido y qué tiene costo adicional (chinches de cama, fauna silvestre)?",
      "¿Qué tiempo de respuesta garantiza para los servicios a solicitud?",
      "¿Cuál es su enfoque de manejo integrado de plagas? Dé ejemplos concretos.",
      "¿Qué productos utiliza? ¿Son de baja toxicidad y seguros para los inquilinos?",
      "¿Tiene un portal de clientes? ¿Podemos ver una demostración?",
    ],
  },
  "janitorial-annual-contract": {
    name: "Contrato anual de limpieza y conserjería",
    scope: `Diario / nocturno:
- Aspirado de todas las áreas alfombradas.
- Barrido y trapeado de pisos de superficie dura.
- Limpieza de todas las superficies de las áreas comunes (mostradores, puertas, manijas, interruptores).
- Vaciado de todos los contenedores de basura y de reciclaje.
- Limpieza y reabastecimiento de los baños (papel, jabón, inodoros, lavabos, pisos, espejos).
- Limpieza del interior de los elevadores.
- Limpieza de los vidrios del vestíbulo y de las entradas.

Semanal:
- Limpieza de manchas en alfombras.
- Limpieza profunda de los baños.
- Pulido del acero inoxidable.
- Limpieza detallada de los rieles de los elevadores.
- Desinfección de superficies de alto contacto.

Mensual:
- Decapado y encerado de pisos duros (o según el calendario).
- Extracción puntual de manchas en alfombras.
- Limpieza de paredes y de polvo en zonas altas.
- Limpieza de los cuartos de máquinas.

Trimestral:
- Limpieza de alfombras por extracción con agua caliente.
- Limpieza de ventanas (interior).
- Limpieza profunda de los cuartos de máquinas y eléctricos.

Anual:
- Limpieza de ventanas exteriores (coordinada por separado o como alternativa adicional).
- Decapado y renovación del acabado de pisos duros.

Suministros:
- Todos los consumibles (papel, jabón, bolsas de basura) incluidos en el contrato.
- Suministros de marca opcionales (especificar si se requieren).

Comunicación:
- Bitácora diaria en el cuarto de servicio.
- Portal en línea para solicitudes de los inquilinos y reporte de incidentes.
- Recorrido mensual con el administrador de propiedades.`,
    requirements: `- Seguro de responsabilidad civil general de $5 millones.
- {WCB}.
- Todo el personal debe ser empleado directo de la empresa (sin subcontratación) y contar con verificación de antecedentes penales.
- Supervisor presente o de guardia en cada turno.
- Portal en línea para el seguimiento de incidentes y las solicitudes de los inquilinos.
- Tres referencias de propiedades de tipo similar en los últimos 2 años.
- Cumplimiento de {ca:las normas provinciales de etiquetado de productos de limpieza y del WHMIS|us:la norma de comunicación de peligros de OSHA (HazCom) para los productos de limpieza}.`,
    siteAccess: `Entrada de servicio y cuarto de suministros. Horario de trabajo: normalmente nocturno, de 10 p. m. a 6 a. m., en propiedades comerciales; flexible en residenciales. Elevador de servicio disponible.`,
    questions: [
      "¿Cuál es el costo mensual total por pie²?",
      "¿El personal es empleado directo o subcontratado? ¿Verifica sus antecedentes?",
      "Modelo de supervisión: ¿hay un supervisor en cada turno?",
      "¿Los consumibles (papel, jabón) están incluidos en el precio?",
      "Portal en línea para solicitudes de los inquilinos: ¿podemos ver una demostración?",
      "¿Con qué frecuencia propone reuniones de seguimiento (mensuales u otra)?",
    ],
  },
  "post-damage-restoration": {
    name: "Restauración después de siniestros",
    scope: `Fase de emergencia (dentro de 24 horas):
- Evaluación en el sitio con documentación (fotos, lecturas de humedad, inventario de daños).
- Extracción de agua (si aplica).
- Contención e instalación del secado (filtración HEPA, ventiladores de secado, deshumidificadores).
- Alcance inicial del trabajo y costo estimado en Xactimate (estándar de la industria, aceptado por las aseguradoras).
- Coordinación con el ajustador de la aseguradora.

Fase de secado y limpieza:
- Monitoreo y registro diario de la humedad.
- Retiro de los materiales que no se puedan recuperar.
- Tratamiento antimicrobiano.
- Limpieza de humo y hollín (por daños de incendio o humo).
- Limpieza y almacenamiento de contenidos (si aplica).

Fase de reconstrucción:
- Alcance de la reconstrucción: paneles de yeso, aislamiento, pisos y pintura, hasta dejar todo como estaba antes del siniestro.
- Coordinación con subcontratistas (electricidad, plomería).
- Inspección final y coordinación del regreso de los inquilinos.

Documentación durante todo el proyecto:
- Informes diarios de avance con fotos.
- Documentación conforme a los requisitos de las aseguradoras (Xactimate, registros de tiempo y materiales).
- Facturación directa a la aseguradora cuando sea posible.`,
    requirements: `- Certificación IICRC en daños por agua, incendio y humo (según el alcance).
- Estimadores con dominio de Xactimate.
- Se prefieren acuerdos de facturación directa con las principales aseguradoras{ca: canadienses|us:}.
- Seguro de responsabilidad civil general de $5 millones con cobertura de contaminación / ambiental.
- {WCB}.
- Respuesta de emergencia 24/7.
- Tres referencias de proyectos similares en los últimos 12 meses.
- Plan de comunicación con los inquilinos (en edificios ocupados).`,
    siteAccess: `Área afectada y áreas adyacentes. Puede ser necesario reubicar a los inquilinos (coordinar con el administrador de propiedades y la aseguradora). Cortes de electricidad / agua según sea necesario.`,
    questions: [
      "¿Puede estar en el sitio dentro de 24 horas?",
      "¿Factura directamente a la aseguradora?",
      "¿Domina Xactimate y cuenta con certificación IICRC?",
      "¿Cuál es su tarifa de mitigación por pie²? ¿Y la de reconstrucción (o precio por alcance)?",
      "¿Cómo documenta el trabajo para los reclamos de seguro?",
      "Coordinación de la reubicación de inquilinos: ¿está incluida o tiene costo adicional?",
    ],
  },
};
