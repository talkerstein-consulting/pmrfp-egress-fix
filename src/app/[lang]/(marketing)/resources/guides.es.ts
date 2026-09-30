/**
 * Spanish versions of the two static guides under /resources. The English text
 * stays in each page.tsx; the pages pick this version on /es. Links inside the
 * Markdown go through localizePath so they stay in Spanish.
 */
import { localizePath } from "@/i18n/config";
import type { StaticGuide } from "./guides.fr";

const L = (path: string) => localizePath(path, "es");

export const QUALITY_RFP_GUIDE_ES: StaticGuide & { steps: string[] } = {
  title: "Cómo publicar una RFP que reciba ofertas reales: 7 pasos",
  metaDescription:
    "Los siete pasos desde “necesitamos un contratista” hasta un contrato firmado — y exactamente qué poner en cada campo de su RFP para que contratistas canadienses calificados presenten ofertas, y ofertas comparables.",
  eyebrow: "Guía · Administradores de propiedades",
  lead: "Qué hacer antes, durante y después de publicar — y qué escribir en cada campo para que los buenos contratistas presenten ofertas, y todas sobre el mismo trabajo.",
  steps: [
    "Defina la necesidad y obtenga la aprobación antes de publicar",
    "Decida quién debe verla",
    "Redacte la solicitud — campo por campo",
    "Gestione de forma justa las preguntas y la visita al sitio",
    "Reciba las ofertas y verifique primero el cumplimiento",
    "Evalúe según criterios fijados de antemano",
    "Adjudique, firme y cierre el ciclo",
  ],
  faqs: [
    {
      q: "¿Cuánto tiempo debe permanecer abierta mi RFP?",
      a: "Tres semanas para obras de capital y contratos de servicio plurianuales. Una o dos semanas bastan para un trabajo pequeño y bien definido. Con menos tiempo que eso, solo recibirá noticias de quien casualmente esté libre — no de la mejor empresa.",
    },
    {
      q: "¿Debo mostrar mi presupuesto?",
      a: "Si la junta ya aprobó un monto, mostrar un rango suele traerle mejores ofertas: los contratistas que no pueden trabajar a ese nivel pasan por alto la solicitud, y los que presentan una oferta la ajustan a ese monto. Si de verdad no sabe cuánto cuesta el trabajo, mantenga el presupuesto privado y consulte una guía de costos para poder detectar valores atípicos cuando lleguen las ofertas.",
    },
    {
      q: "¿Tengo que aceptar la oferta más baja?",
      a: "No — a menos que sus estatutos o la política del propietario lo exijan. Indique a los oferentes en la RFP cómo evaluará (precio, experiencia, cronograma, cobertura del alcance), califique según esos criterios y escriba una página que explique por qué eligió al ganador. Eso es lo que una junta necesita ver.",
    },
    {
      q: "¿Puedo mantenerme en el anonimato mientras recibo muestras de interés?",
      a: "Sí. En PMRFP puede mantener ocultos sus datos de contacto hasta que apruebe el interés de un contratista, o hacer que el interés se canalice a través de PMRFP. Los detalles de su edificio y de su presupuesto siguen siendo suyos hasta que decida establecer contacto.",
    },
  ],
  article: `La mayoría de las solicitudes de propuestas (RFP) que no reciben ninguna oferta, o que reciben tres ofertas que nadie puede comparar, no eran malos proyectos. Eran malas solicitudes. El alcance decía “reparar el techo según sea necesario”. La fecha límite era en cuatro días. Nadie aclaró si la eliminación de residuos estaba incluida, si era posible una visita al sitio ni cómo se elegiría al ganador.

Los buenos contratistas leen eso y pasan a otra cosa. Tienen más trabajo que tiempo, y presentan ofertas en las solicitudes que les dicen exactamente qué están cotizando.

Este es todo el proceso en siete pasos — desde “necesitamos un contratista” hasta un contrato firmado —, con lo que debe poner en cada campo cuando publique en PMRFP.

## 1. Defina la necesidad y obtenga la aprobación antes de publicar

La forma más rápida de perder a un buen contratista es lanzar una RFP, reunir ofertas y luego descubrir que la junta no aprobará el gasto. Haga primero el trabajo interno.

- **¿Qué problema está resolviendo?** “El techo tiene goteras en tres lugares después de lluvias fuertes” es una necesidad. “Techo nuevo” es una suposición sobre la respuesta. Parta del problema — un buen oferente puede proponer una mejor solución.
- **¿Quién aprueba la adjudicación?** La junta, el propietario, el administrador de activos o usted. Conozca su límite de gasto y sepa si se requiere un proceso competitivo.
- **¿De dónde sale el dinero?** Del fondo de reserva, del presupuesto operativo o de un reclamo al seguro. Eso cambia el cronograma y el papeleo.
- **¿Cuándo tiene que hacerse el trabajo?** Los contratos de remoción de nieve deben adjudicarse antes de que empiece la temporada, la pavimentación y la pintura exterior necesitan clima cálido y seco, y el techado es más fácil antes del invierno.

Escriba las respuestas en un párrafo. Se convertirá en el inicio de su alcance.

## 2. Decida quién debe verla

Lo ideal son de tres a cinco ofertas serias. Con menos de tres, no hay presión sobre los precios. Con más de cinco, los contratistas dejan de presentar ofertas en sus proyectos, porque las probabilidades de ganar no justifican el tiempo de estimación.

En PMRFP, las **categorías**, la **región** y el **tipo de propiedad** que elija determinan qué contratistas ven su solicitud. Sea preciso:

- Elija el oficio que realmente hace el trabajo. El reemplazo de una caldera es trabajo de HVAC (climatización), no de contratista general.
- Elija la región donde está el edificio, no donde está su oficina.
- Agregue una segunda o tercera categoría solo si el trabajo realmente abarca varios oficios.

Si ya tiene un contratista de confianza, invítelo también a presentar una oferta. La RFP es la forma de verificar su precio, no un reemplazo de la relación.

## 3. Redacte la solicitud — campo por campo

Aquí es donde se gana o se pierde la calidad. Esto es para lo que sirve cada campo.

### Título de la RFP

Indique el trabajo, el tipo de propiedad y la ciudad. Un contratista que revisa una lista decide en dos segundos.

> **Débil:** Proyecto de techado
>
> **Sólido:** Reemplazo de techo plano — condominio de mediana altura de 18,000 pie², Mississauga

### Resumen breve

Dos oraciones: lo que necesita y el detalle que más influye en el precio.

> Retiro y reemplazo de un techo multicapa de 20 años en un edificio residencial ocupado de 9 pisos. El trabajo debe completarse entre junio y septiembre, sin interrumpir las unidades mecánicas de la azotea.

### Alcance completo

El alcance es el trabajo. Cada vacío en él se convierte en una suposición distinta en cada oferta — y en una orden de cambio más adelante. Cubra cinco cosas:

1. **El edificio.** Tipo, antigüedad, tamaño y todo lo que afecte el acceso: unidades ocupadas, uso del elevador, espacio para acopio de materiales, estacionamiento, acceso para grúa.
2. **El trabajo.** Qué se va a reemplazar, reparar o mantener, con las especificaciones actuales cuando las conozca (tipo de sistema, capacidad, superficie en pies cuadrados, número de unidades).
3. **Qué está incluido.** Materiales, eliminación de residuos, permisos, inspecciones, puesta en marcha, garantía.
4. **Qué está excluido.** Todo lo que un oferente podría suponer razonablemente que forma parte del alcance, pero no lo es.
5. **Alternativas adicionales.** Elementos que podría querer, cotizados por separado, para que decida después de ver los números.

Deje abierto el método cuando de verdad no le importe cómo se haga. “El oferente recomendará TPO, EPDM o asfalto modificado, con sus razones” le da acceso a conocimiento experto. Nombrar un solo producto le da la misma oferta tres veces.

Las fotos ayudan más que un párrafo. Agregue algunas del equipo, del área o del daño.

### Requisitos

Lo innegociable. Una oferta que no los cumpla no se evalúa.

- **Seguro.** Responsabilidad civil general comercial — comúnmente $5 millones para obras de capital y $2 millones para contratos de servicio de menor riesgo —, con el propietario o la corporación de condominio nombrados como asegurados adicionales.
- **Seguro de compensación laboral.** Un certificado de autorización de la WSIB en Ontario, o la cobertura equivalente de la WCB en otras provincias.
- **Licencias y certificaciones del oficio.** TSSA para gas y elevadores, ESA para electricidad en Ontario, certificación del fabricante para las garantías de techado.
- **Referencias.** Tres trabajos comparables de los últimos dos años, con contactos a los que realmente llamará.
- **Un líder de proyecto designado** para cualquier trabajo de más de una semana.

### Presupuesto

Si tiene un monto aprobado, indique un rango y considere mostrarlo. Los contratistas que no puedan trabajar a ese nivel pasarán por alto la solicitud, y los que presenten una oferta la ajustarán a ese monto. Si todavía no sabe cuánto cuesta el trabajo, mantenga el presupuesto privado y consulte primero una [guía de costos](${L("/cost-guides")}) para poder detectar una oferta demasiado buena para ser verdad.

### Fecha límite de presentación

Tres semanas para obras de capital y contratos plurianuales; una o dos semanas para trabajos pequeños y bien definidos. Con cuatro días obtiene a quien esté libre, no al mejor.

### Instrucciones de presentación

Diga a los oferentes exactamente qué enviar y cómo decidirá. Es el campo que la mayoría de los administradores deja en blanco, y es el que hace que las ofertas sean comparables.

> Presente un precio global para el alcance base, con cada alternativa adicional cotizada por separado. Incluya su certificado de seguro, el certificado de autorización de la WSIB, el cronograma propuesto y tres referencias. Visita al sitio opcional el 12 de mayo a las 10 a. m. — confirme por correo electrónico. Preguntas por escrito hasta el 15 de mayo; las respuestas se compartirán con todos los oferentes. Evaluación: precio 40%, experiencia pertinente y referencias 30%, cobertura del alcance 20%, cronograma 10%.

Esas ponderaciones son un ejemplo — fije las suyas. Lo importante es que los oferentes las conozcan antes de presentar su oferta.

### Visibilidad del contacto

Elija cómo lo contactan los contratistas. Puede mostrar sus datos de contacto a los miembros de pago, canalizar el interés a través de PMRFP o mantenerse en el anonimato hasta que apruebe el interés de un contratista.

## 4. Gestione de forma justa las preguntas y la visita al sitio

Todos los oferentes deben cotizar el mismo trabajo. Por eso:

- **Responda las preguntas por escrito y envíe cada respuesta a todos los oferentes interesados** — no solo a quien preguntó.
- **Organice una visita al sitio** para todo lo que no se pueda cotizar a partir de fotos: techos, estacionamientos, salas de máquinas. Ahí es donde los contratistas encuentran lo que de otro modo se convertiría en órdenes de cambio.
- **Fije una fecha límite para preguntas** unos días antes del cierre, para que las respuestas tardías no lleguen a algunos oferentes y a otros no.
- **No negocie en privado durante el período de ofertas.** Si el alcance cambia, cambia para todos.

## 5. Reciba las ofertas y verifique primero el cumplimiento

Cuando pase la fecha límite, revise cada oferta frente a sus requisitos antes de mirar el precio:

- Certificado de seguro con el asegurado designado correcto
- Certificado de la WSIB o de la WCB vigente y en regla
- Licencias y certificaciones requeridas
- Referencias incluidas
- Cada elemento del alcance cotizado, o claramente marcado como excluido

Toda oferta a la que le falte un requisito obligatorio queda fuera. No haga una excepción para mantener en juego un precio bajo — una caldera instalada por un contratista no certificado que no pasa la inspección de la TSSA cuesta mucho más que lo que se ahorró.

## 6. Evalúe según criterios fijados de antemano

Ahora compare las ofertas que cumplen, con las ponderaciones que publicó.

- **Normalice el alcance.** Arme una lista de verificación sencilla de todo lo que exigía el alcance y marque lo que cada oferente incluyó, excluyó o dejó vago. Una oferta de $19,500 que excluye la eliminación de residuos y la garantía deja de ser la más baja una vez que se suman esos elementos.
- **Considere por separado los precios de las alternativas adicionales.** El oferente con el precio base más alto puede ser mucho más barato en una alternativa que probablemente usted apruebe.
- **Llame al menos a dos referencias** de su primera opción. Pregunte: “¿Cómo manejaron la situación cuando algo salió mal?”.
- **Reduzca la lista a dos** si el trabajo es grande, y entreviste a ambos.

## 7. Adjudique, firme y cierre el ciclo

- **Póngalo por escrito.** Firme un contrato que incluya el alcance, el precio, el cronograma, las condiciones de pago, la garantía y un proceso escrito de órdenes de cambio. En los acuerdos de servicio plurianuales, incluya una cláusula de terminación por conveniencia. Haga que un abogado revise los contratos más grandes o plurianuales.
- **Reúna los certificados antes de la movilización.** Obtenga la documentación del seguro y de la WSIB antes de que haya alguien en la obra, no una promesa de que llegará.
- **Avise a los oferentes no seleccionados.** Basta con una línea: “Gracias — ya adjudicamos este proyecto”. Los contratistas recuerdan quién les avisó. Es la forma más barata de recibir buenas ofertas la próxima vez.
- **Marque la RFP como adjudicada en PMRFP** para que salga del tablero y su historial se mantenga exacto.
- **Archive un resumen de evaluación de una página.** Cuando un miembro de la junta pregunte por qué no eligió la oferta más barata, ya estará escrito.

## La lista de verificación antes de enviar

Antes de hacer clic en enviar, verifique:

- [ ] El título indica el trabajo, el tipo de propiedad y la ciudad
- [ ] El resumen dice lo que necesita en dos oraciones
- [ ] El alcance cubre el edificio, el trabajo, lo incluido, lo excluido y las alternativas adicionales
- [ ] Al menos una foto del área o del equipo
- [ ] Los requisitos incluyen seguro, WSIB/WCB, licencias y referencias
- [ ] Rango de presupuesto ingresado (visible o privado)
- [ ] La fecha límite da a los oferentes al menos de una a tres semanas
- [ ] Las instrucciones de presentación indican qué enviar, la fecha de la visita al sitio, la fecha límite para preguntas y cómo evaluará
- [ ] La aprobación para adjudicar ya está en regla

Si prefiere no empezar desde una página en blanco, cada [plantilla de RFP](${L("/rfp-templates")}) viene con el alcance, los requisitos y los criterios de evaluación ya completos — adáptela a su edificio y publíquela. Para la versión extensa sobre cómo redactar el alcance y evaluar ofertas, lea [cómo redactar una RFP de mantenimiento de propiedades comerciales](${L("/resources/how-to-write-a-commercial-property-maintenance-rfp")}).

## Preguntas frecuentes

**¿Cuánto tiempo debe permanecer abierta mi RFP?**

Tres semanas para obras de capital y contratos de servicio plurianuales. Una o dos semanas bastan para un trabajo pequeño y bien definido. Con menos tiempo que eso, solo recibirá noticias de quien casualmente esté libre — no de la mejor empresa.

**¿Debo mostrar mi presupuesto?**

Si la junta ya aprobó un monto, mostrar un rango suele traerle mejores ofertas: los contratistas que no pueden trabajar a ese nivel pasan por alto la solicitud, y los que presentan una oferta la ajustan a ese monto. Si de verdad no sabe cuánto cuesta el trabajo, mantenga el presupuesto privado y consulte una guía de costos para poder detectar valores atípicos cuando lleguen las ofertas.

**¿Tengo que aceptar la oferta más baja?**

No — a menos que sus estatutos o la política del propietario lo exijan. Indique a los oferentes en la RFP cómo evaluará, califique según esos criterios y escriba una página que explique por qué eligió al ganador. Eso es lo que una junta necesita ver.

**¿Puedo mantenerme en el anonimato mientras recibo muestras de interés?**

Sí. En PMRFP puede mantener ocultos sus datos de contacto hasta que apruebe el interés de un contratista, o hacer que el interés se canalice a través de PMRFP. Los detalles de su edificio y de su presupuesto siguen siendo suyos hasta que decida establecer contacto.`,
  cta: {
    title: "Publique su RFP — gratis",
    description:
      "Empiece con una plantilla o con un formulario en blanco. Revisamos cada publicación antes de que salga en línea, y usted se mantiene en el anonimato hasta que decida establecer contacto.",
    primaryLabel: "Publique una RFP — gratis",
    secondaryLabel: "Ver plantillas de RFP",
  },
};

export const MAINTENANCE_RFP_GUIDE_ES: StaticGuide = {
  title: "Cómo redactar una RFP de mantenimiento de propiedades comerciales",
  metaDescription:
    "La guía de un administrador de propiedades en ejercicio para redactar RFP de mantenimiento comercial que reciban ofertas reales y comparables — alcance, seguros, evaluación y los errores que debe evitar. Específica para Canadá.",
  eyebrow: "Guía",
  lead: "La guía de un administrador de propiedades en ejercicio para llevar un proceso competitivo que le dé ofertas reales y comparables — y una decisión que pueda defender ante su junta.",
  faqs: [
    {
      q: "¿Necesito que un abogado revise la RFP antes de publicarla?",
      a: "No para la RFP en sí — es una invitación a presentar ofertas, no un contrato. La revisión legal importa en el contrato que firme con el oferente ganador, sobre todo en cualquier trabajo de más de $50,000 o en cualquier acuerdo de servicio plurianual. Para obras de capital, un contrato estándar CCDC 2 o un contrato de formato abreviado justifica la revisión legal.",
    },
    {
      q: "¿A cuántos oferentes debo invitar?",
      a: "De tres a cinco es lo adecuado para la mayoría de los trabajos. Con menos de tres, no hay verdadera presión sobre los precios. Con más de cinco, les hace perder el tiempo a los contratistas cotizando trabajos que difícilmente ganarán, lo que significa que menos responderán a sus próximas RFP.",
    },
    {
      q: "¿Qué hago si nadie responde a mi RFP?",
      a: "Por lo general, el período de licitación fue demasiado corto, el alcance no era claro o la publicación no llegó al oficio correcto. Dé a los oferentes al menos tres semanas, mantenga un alcance específico y comuníquese directamente con uno o dos proveedores para preguntarles por qué. No reduzca sus requisitos para conseguir ofertas.",
    },
    {
      q: "Mi junta quiere que siempre elija el precio más bajo. ¿Qué hago?",
      a: "Es un problema de gobernanza más que de adquisiciones. La junta fija el límite; su trabajo es documentar la evaluación con suficiente claridad para que vea por qué la oferta adjudicada era la de mejor valor, y no solo la más barata. La mayoría de las juntas aceptan una recomendación razonada cuando se les presenta una evaluación clara.",
    },
  ],
  article: `En algún lugar de su correo, ahora mismo, hay una cotización de un proveedor. Quizás tres, para el mismo trabajo. Una es de $28,000. Otra es de $41,000. Otra es de $19,500, con un alcance vago que podría significar cualquier cosa. No tiene idea de qué está incluido, de si comparan los mismos materiales ni de si la más barata tiene cobertura de la WSIB. La junta pregunta cuándo tendrá una recomendación.

Esto es lo que pasa cuando junta cotizaciones en lugar de lanzar una solicitud de propuestas (RFP).

Una solicitud de propuestas bien hecha — aunque sea sencilla — da a cada contratista el mismo alcance, los mismos requisitos y las mismas preguntas por responder. Lo que recibe de vuelta es realmente comparable. Puede defender su decisión ante la junta. Tiene un registro documentado. Y ha creado presión sobre los precios, porque cada contratista sabe que hay otros presentando ofertas.

Esta guía explica cómo redactar una, desde cero, para cualquier trabajo de mantenimiento de propiedades comerciales.

## Por qué “llamar a tres contratistas para pedir cotizaciones” le sigue fallando

El proceso informal de cotizaciones funciona bien para reparaciones pequeñas — una ventana rota, una llamada puntual de plomería, el reemplazo de un solo accesorio. Por debajo de unos $5,000 a $10,000, el esfuerzo adicional de una RFP formal no vale la pena.

Para cualquier cosa más grande, el proceso informal crea cuatro problemas concretos:

**Sin un alcance comparable.** Cada contratista interpreta el trabajo de forma distinta. Uno incluye el retiro del techo existente y la eliminación de residuos; otro supone que usted se encargará de la eliminación; otro cotiza una capa nueva sobre el techo existente, no un reemplazo. Cuando las ofertas llegan con cifras muy diferentes, no puede saber si es porque los alcances difieren o porque alguien está inflando el precio.

**Sin registro documentado.** Cuando un miembro de la junta cuestiona su elección de proveedor, “llamé a tres empresas de techado” no es una respuesta defendible. Una RFP con respuestas de oferentes documentadas y una evaluación por escrito, sí lo es.

**Sin presión sobre los precios.** Un contratista que es el único oferente lo sabe, y fija su precio en consecuencia. Un contratista que sabe que compite con otras dos empresas calificadas cotiza con más cuidado.

**Sin el requisito de aprobación de la junta.** La mayoría de las corporaciones de condominio y de los arrendamientos comerciales tienen límites de gasto que exigen la aprobación de la junta o un proceso competitivo formal. Mantener las cosas en la informalidad para evitar el proceso suele empeorar la situación de gobernanza, no mejorarla.

El proceso de RFP no tiene por qué ser burocrático. Una RFP enfocada para el reemplazo de un techo plano o para un contrato de remoción de nieve se puede redactar en menos de una hora y publicar el mismo día.

## Qué cuenta como RFP frente a una simple solicitud de cotización

No todos los trabajos necesitan una RFP completa. Esta es una regla general para decidir.

**Use una simple solicitud de cotización cuando:**
- El trabajo cuesta menos de $5,000–$10,000 (el límite varía según los estatutos de su condominio, su contrato de administración o la política de gastos del propietario — verifique cuál aplica en su caso)
- El alcance no tiene ambigüedades (p. ej., “reemplazar una puerta exterior”)
- Ya tiene un proveedor aprobado y solo necesita precios
- Es una emergencia y no hay tiempo para un período de licitación

**Use una RFP cuando:**
- El trabajo supera su límite de gasto o requiere la aprobación de la junta
- Va a adjudicar un contrato plurianual: remoción de nieve, limpieza y conserjería, mantenimiento de HVAC (climatización) o servicio de elevadores
- El alcance requiere una visita al sitio para cotizar con precisión
- Está comparando enfoques realmente distintos (caldera: eficiencia media o condensación de alta eficiencia; techo plano: TPO, EPDM o asfalto modificado)
- Son obras de capital con cargo al fondo de reserva o incluidas como partida en un presupuesto anual
- Está buscando un nuevo proveedor en un oficio en el que no tiene una relación establecida

Para los proyectos de capital — reemplazo de caldera, reemplazo de techo, modernización de elevadores, reconstrucción de estacionamientos —, la RFP es casi siempre la herramienta adecuada, sin importar el monto. La documentación por sí sola la justifica.

## Redactar el alcance: la parte en la que todos se equivocan

La mayoría de las malas RFP fallan en el alcance. O son tan vagas que los contratistas tienen que adivinar, o son tan prescriptivas que usted ya tomó decisiones que deberían quedar en manos del oferente (como especificar un producto exacto cuando en realidad quiere su recomendación).

Un alcance sólido tiene cuatro partes.

### 1. Describa el edificio y el sitio

Los contratistas necesitan entender a qué se enfrentan antes de poder cotizar con precisión. Incluya:

- Tipo de propiedad (residencial multifamiliar, oficinas comerciales, uso mixto, industrial)
- Antigüedad y tamaño aproximado
- Historial relevante (antigüedad del sistema existente, problemas conocidos, trabajos anteriores)
- Restricciones del sitio: ¿estará ocupado durante el trabajo? ¿Se requiere elevador o estacionamiento? ¿Área de acopio limitada? ¿Acceso para grúa?

No necesita un ensayo. De cuatro a seis oraciones suelen bastar.

### 2. Describa el trabajo

Sea específico sobre lo que quiere que se haga, pero deje abierto el método cuando de verdad le dé igual. “Reemplazar la caldera” es demasiado vago. “Necesitamos el reemplazo equivalente o mejorado de nuestra caldera de agua caliente a gas natural de 2,000,000 BTU, incluidos todos los permisos e inspecciones que exige la TSSA, la integración de los controles con nuestro sistema de termostatos existente y un plan para minimizar el tiempo sin calefacción durante el cambio” es un alcance.

**Qué incluir:**

- Qué se va a reemplazar, reparar o mantener (con las especificaciones actuales, si se conocen)
- Qué está incluido explícitamente (materiales, eliminación de residuos, permisos, puesta en marcha, garantías)
- Qué está excluido explícitamente — todo lo que se podría suponer dentro del alcance, pero no lo está
- Alternativas adicionales: elementos que podría querer, pero que desea ver cotizados por separado para decidir después

Las alternativas adicionales se usan poco. Si va a reemplazar la caldera y quizás también quiera cambiar las bombas de circulación, no adivine si el oferente las incluyó. Inclúyalas como alternativa adicional. El oferente las cotiza por separado. Usted decide después de ver los números.

### 3. Ejemplo práctico: esqueleto del alcance para un techo plano

Así se lee la sección de alcance para el reemplazo de un techo plano en una propiedad residencial de mediana altura.

> **Alcance del trabajo:** Retiro y eliminación del sistema de techo de membrana existente (aprox. 18,000 pie²), incluidas todas las capas hasta la plataforma estructural (deck). Inspección e informe sobre el estado de la plataforma; monto provisional para la reparación de la plataforma cotizado como partida separada. Instalación de aislamiento nuevo con pendiente integrada según el valor R que exige el Código de Construcción de Ontario (Ontario Building Code) vigente. Instalación de una nueva membrana monocapa (el oferente especificará el sistema: TPO, EPDM o asfalto modificado) con instalación certificada por el fabricante. Se incluyen todos los tapajuntas, remates metálicos de borde, drenajes y penetraciones. Limpieza diaria del sitio; se entregará el manifiesto final de disposición de residuos. Inspección final del fabricante y emisión de una garantía NDL (No Dollar Limit, sin límite de monto).
>
> **Fuera del alcance, salvo que se coticen como alternativas adicionales:** Reemplazo de la plataforma estructural más allá del 10% del área total; mejora de la escalera de acceso al techo; desmontaje y reinstalación de unidades de HVAC o reemplazo de sus bases.

Eso le dice al contratista qué está cotizando, qué está incluido, qué no, y que tiene margen para recomendar el sistema que prefiera. Use la [plantilla de reemplazo de techo plano](${L("/rfp-templates/flat-roof-replacement")}) si quiere todo esto ya completado y listo para publicar.

Antes de redactar el alcance, revise cuánto suele costar el trabajo para saber si las ofertas que reciba están en el rango correcto. La [guía de costos de reemplazo de techos comerciales](${L("/cost-guides/commercial-roof-replacement-cost")}) cubre los sistemas TPO, EPDM, de asfalto modificado y multicapa, y explica los principales factores de costo.

## Qué exigir a cada oferente

Toda RFP, sin importar el oficio, debe incluir una sección estándar de requisitos. Son lo innegociable — un oferente que no pueda cumplirlos no entra en la lista corta.

**Seguro.** Responsabilidad civil general de al menos $5 millones para la mayoría de los trabajos comerciales y obras de capital; $2 millones es aceptable para contratos de servicio de menor riesgo (jardinería, pintura, limpieza y conserjería). El certificado debe nombrar al propietario del edificio (o a la corporación de condominio) como asegurado adicional. Obtenga el certificado antes de la movilización, no solo una promesa.

**WSIB (seguro de compensación laboral).** Un certificado de autorización de la WSIB vigente y en regla. Es innegociable en Ontario. Para contratistas de otras provincias, confirme su registro ante la WCB correspondiente.

**Certificaciones del oficio.** Aquí es donde la mayoría de los administradores son imprecisos, y es importante. Varían según el oficio:

- Gas y calderas: certificación de técnico de gas de la TSSA (Ontario). Consulte la [plantilla de reemplazo de caldera](${L("/rfp-templates/boiler-replacement")}) o la [plantilla de reemplazo de unidades de techo](${L("/rfp-templates/rooftop-unit-replacement")}) para ver la redacción específica de la TSSA.
- Electricidad: un contratista con licencia de la ESA (Electrical Safety Authority) en Ontario; los trabajos en tableros, acometidas y circuitos nuevos requieren permiso e inspección de la ESA. Consulte la [guía de costos de trabajos eléctricos comerciales](${L("/cost-guides/commercial-electrical-cost")}) para ver cuánto agrega eso.
- Elevadores: un mecánico de elevadores con licencia de la TSSA. La [plantilla de contrato de servicio de elevadores](${L("/rfp-templates/elevator-service-contract")}) detalla los requisitos.
- Seguridad contra incendios: certificación de la CFAA (Canadian Fire Alarm Association) para trabajos en sistemas de alarma. Consulte la [plantilla de inspección anual de seguridad contra incendios](${L("/rfp-templates/annual-fire-safety-inspection")}).
- Remediación de moho: certificación IICRC S520 — y nunca deje que la empresa de remediación haga sus propias pruebas de verificación final; exija un higienista industrial independiente.
- Techado: certificación del fabricante, no una licencia gubernamental — el programa de instaladores certificados del fabricante de la membrana es lo que asegura la garantía NDL.

**Referencias.** Tres proyectos comparables terminados en los últimos 24 meses, con datos de contacto a los que realmente llamará. “Comparable” significa similar en escala y tipo — una empresa de techado con experiencia en plazas comerciales de 3,000 pies cuadrados no es lo mismo que una con experiencia en edificios residenciales de mediana altura de 25,000 pies cuadrados.

**Asignación de un gerente de proyecto.** Para cualquier trabajo de más de una semana, exija que el contratista designe a su gerente de proyecto y a su contacto en el sitio antes de la movilización. Usted quiere una sola persona a la que pueda localizar.

## Cómo evaluar las ofertas de forma justa

Tiene tres propuestas. ¿Y ahora qué?

**1. Verifique primero los requisitos.** Antes de leer los precios, confirme que cada oferente cumple con los mínimos: un seguro que nombre a las partes correctas, el certificado de autorización de la WSIB, las certificaciones requeridas. Quien no pueda presentarlos queda descalificado. No haga excepciones para conseguir un precio más bajo.

**2. Compare la cobertura del alcance, no solo los totales.** Arme una lista de verificación de todo lo que exigía su alcance y marque lo que cada oferente incluyó, excluyó o dejó ambiguo. Si el oferente A incluyó la eliminación de residuos y el oferente B no, sus precios no son comparables hasta que haga el ajuste.

**3. Revise las alternativas adicionales por separado.** Compare los precios base y luego, de forma independiente, los precios de las alternativas adicionales. Un oferente más caro en la base puede ser mucho más barato en una alternativa que probablemente apruebe — lo que cambia el panorama general.

**4. Llame a las referencias.** Al menos a dos del oferente de su lista corta. ¿Terminaron a tiempo? ¿Las órdenes de cambio fueron razonables? ¿Los volvería a contratar? La pregunta que más revela: “¿Cómo manejaron los problemas cuando surgieron?” — porque en cualquier trabajo de envergadura, algo va a surgir.

**5. Documente su decisión.** Escriba un breve resumen de evaluación — aunque sea de una página — que explique por qué eligió al proveedor adjudicado: que verificó el seguro y las certificaciones, llamó a las referencias y seleccionó según los criterios que indicó en la RFP. Va al expediente de la propiedad. Cuando la junta le pregunte por qué eligió al oferente intermedio en lugar del más barato, tendrá una respuesta.

**Sobre el precio más bajo:** es información relevante, no la decisión. Una caldera instalada por un contratista no certificado que no pasa la inspección de la TSSA cuesta más que lo que se ahorró. Un contratista de remoción de nieve que no se presenta durante un episodio de lluvia helada genera más responsabilidad legal que una tarifa por temporada más barata. Usted adjudica la combinación de cobertura del alcance, credenciales, referencias y precio — en ese orden.

## Errores comunes que producen malas ofertas

**Un alcance vago que espera que los contratistas completen.** No lo harán. Cada uno lo completará de forma distinta y usted obtendrá cifras que no se pueden comparar.

**Cotizar sin una visita al sitio.** Para techado, estacionamientos y reemplazo de HVAC, lleve a los oferentes de la lista corta al sitio antes de que finalicen sus precios. La visita al sitio es donde encuentran lo que de otro modo se convierte en órdenes de cambio.

**Un período de licitación demasiado corto.** Tres semanas es el mínimo para la mayoría de las obras de capital. Con una semana obtiene a quien casualmente estaba libre, no al mejor oferente.

**Ignorar el calendario.** Adjudique los contratos de remoción de nieve a más tardar el 1 de octubre; la pavimentación se hace de mayo a octubre; la pintura exterior necesita clima cálido y seco. Las mejores ofertas vienen de contratistas que no están desesperados. Publique la RFP antes de la temporada, no después de que empiece.

**No leer las exclusiones.** La cotización de $19,500 para el techo que excluye la eliminación de residuos, la reparación de la plataforma y la garantía NDL no es la oferta más baja una vez que se suman esos elementos. Lea cada línea.

**Un contrato plurianual sin cláusula de terminación.** Los contratos de elevadores son los peores — algunos son acuerdos de cinco años con renovación automática de los que es casi imposible salir. Exija una cláusula de terminación por conveniencia con 90 días de aviso en cualquier contrato plurianual. Si el proveedor no la acepta, eso ya le dice algo.

**Sin registro por escrito de las órdenes de cambio.** La RFP fija el precio; todo lo que exceda ese alcance debe requerir aprobación por escrito antes de que el contratista continúe. Las aprobaciones verbales a mitad de obra son la forma en que un contrato de $28,000 se convierte en uno de $47,000.

## Plantillas por oficio

Si no quiere redactar un alcance desde cero, estas plantillas ya tienen completos el alcance, los requisitos, el cronograma y los criterios de evaluación. Personalícelas con los datos de su propiedad y publique.

**Techado**
- [Plantilla de reemplazo de techo plano](${L("/rfp-templates/flat-roof-replacement")}) — retiro del techo existente y nueva membrana monocapa. [Costos típicos.](${L("/cost-guides/commercial-roof-replacement-cost")})
- [Plantilla de inspección y mantenimiento anual de techos](${L("/rfp-templates/annual-roof-inspection-contract")}) — inspecciones dos veces al año y un monto para reparaciones menores.
- [Plantilla de reparación de emergencia de techo](${L("/rfp-templates/emergency-roof-repair")}) — respuesta rápida ante filtraciones activas.

**HVAC**
- [Plantilla de reemplazo de caldera](${L("/rfp-templates/boiler-replacement")}) — eficiencia media o alta, requisitos de la TSSA, plan para el tiempo sin calefacción.
- [Plantilla de reemplazo de unidades de techo](${L("/rfp-templates/rooftop-unit-replacement")}) — cambio de RTU con grúa, bases y controles. [Costos típicos.](${L("/cost-guides/commercial-hvac-replacement-cost")})
- [Plantilla de mantenimiento anual de HVAC](${L("/rfp-templates/annual-hvac-maintenance-contract")}) — visitas trimestrales, monto para reparaciones, condiciones de emergencia.

**Exteriores y áreas verdes**
- [Plantilla de contrato de temporada de remoción de nieve](${L("/rfp-templates/snow-removal-seasonal-contract")}) — por temporada o por evento, tiempos de respuesta, responsabilidad por resbalones y caídas. [Costos típicos.](${L("/cost-guides/commercial-snow-removal-cost")})
- [Plantilla de repavimentación de estacionamiento](${L("/rfp-templates/parking-lot-resurfacing")}) — fresado y nueva capa asfáltica o reconstrucción completa. [Costos típicos.](${L("/cost-guides/parking-lot-paving-cost")})
- [Plantilla de contrato anual de jardinería](${L("/rfp-templates/landscaping-annual-contract")}) — mantenimiento semanal, limpieza de temporada, riego.
- [Plantilla de pintura exterior](${L("/rfp-templates/exterior-painting")}) — repintado completo con preparación, garantía y alcance de plataformas elevadoras o andamios. [Costos típicos.](${L("/cost-guides/commercial-painting-cost")})

**Mecánica y electricidad**
- [Plantilla de contrato de servicio de elevadores](${L("/rfp-templates/elevator-service-contract")}) — mantenimiento integral o de solo lubricación (oil & grease), requisitos de la TSSA, cláusulas de salida.
- [Plantilla de actualización de tablero eléctrico](${L("/rfp-templates/electrical-panel-upgrade")}) — aumento de capacidad del servicio, coordinación con la ESA, planificación de cortes. [Costos típicos.](${L("/cost-guides/commercial-electrical-cost")})
- [Plantilla de conversión a iluminación LED](${L("/rfp-templates/led-lighting-retrofit")}) — coordinación de incentivos, auditoría de luminarias, análisis del período de recuperación de la inversión.

**Seguridad y cumplimiento**
- [Plantilla de inspección anual de seguridad contra incendios](${L("/rfp-templates/annual-fire-safety-inspection")}) — certificación CFAA, informe de deficiencias, declaración de conflictos de interés.
- [Plantilla de remediación de moho](${L("/rfp-templates/mold-remediation")}) — contención según IICRC con verificación independiente.

**Limpieza y restauración**
- [Plantilla de contrato anual de limpieza y conserjería](${L("/rfp-templates/janitorial-annual-contract")}) — alcance diario, referencias, condiciones de desempeño. [Costos típicos.](${L("/cost-guides/commercial-cleaning-cost")})
- [Plantilla de pintura de áreas comunes](${L("/rfp-templates/common-area-painting")}) — trabajo por fases en edificio ocupado, bajo contenido de COV, programación piso por piso.
- [Plantilla de restauración después de siniestros](${L("/rfp-templates/post-damage-restoration")}) — emergencias por agua, fuego o humo, facturación directa a la aseguradora.

## Preguntas frecuentes

**¿Necesito que un abogado revise la RFP antes de publicarla?**

No para la RFP en sí — es una invitación a presentar ofertas, no un contrato. La revisión legal importa en el contrato que firme con el oferente ganador, sobre todo en cualquier trabajo de más de $50,000 o en cualquier acuerdo de servicio plurianual. Para obras de capital, un contrato estándar CCDC 2 o un contrato de formato abreviado bien vale los pocos cientos de dólares de la revisión legal.

**¿A cuántos oferentes debo invitar?**

De tres a cinco para la mayoría de los trabajos. Con menos de tres, no hay verdadera presión sobre los precios. Con más de cinco, les hace perder el tiempo a los contratistas cotizando trabajos que difícilmente ganarán — lo que significa que menos responderán la próxima vez. Si le preocupa la calidad de los proveedores, invite a más en la etapa de manifestación de interés y reduzca la lista a tres para las ofertas completas.

**¿Qué hago si nadie responde a mi RFP?**

Por lo general, el período de licitación fue demasiado corto, el alcance no era claro o la publicación no llegó al oficio correcto. Dé a los oferentes al menos tres semanas. Si no recibe ningún interés, comuníquese directamente con uno o dos proveedores para preguntarles por qué — muchas veces la solución es sencilla. No reduzca sus requisitos para conseguir ofertas.

**Mi junta quiere que siempre elija el precio más bajo. ¿Qué hago?**

Es un problema de gobernanza más que de adquisiciones. La junta fija el límite (“un proceso competitivo para todo lo que supere $25,000”) y debe entender que el precio más bajo es un factor, no el único. Su trabajo es documentar la evaluación con suficiente claridad para que vea por qué la oferta adjudicada era la de mejor valor. La mayoría de las juntas, cuando ven una evaluación clara, aceptan una recomendación razonada.`,
  cta: {
    title: "Publique su proyecto — gratis",
    description:
      "Una vez redactado su alcance, publicar toma unos dos minutos. Los contratistas calificados responden, y usted se mantiene en el anonimato hasta que decida establecer contacto.",
    primaryLabel: "Publique un proyecto — gratis",
    secondaryLabel: "Ver plantillas de RFP",
  },
};
