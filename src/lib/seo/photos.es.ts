/**
 * Spanish alt text for the shared photos (@/lib/photos), used by the SEO pages
 * (trade hubs, /for pages) through photoAlt() in ./photos.fr. Keyed like
 * PHOTOS, so a new photo is a type error here until it has Spanish alt text.
 */
import type { PHOTOS } from "@/lib/photos";

export const ALT_ES: Record<keyof typeof PHOTOS, string> = {
  hvac: "Técnico caminando entre unidades de HVAC en la azotea de un edificio comercial",
  roof: "Techo plano comercial con unidades en la azotea y parches de nieve",
  electrical: "Electricista probando los interruptores de un tablero de distribución con un probador de voltaje",
  plumbing: "Tuberías, válvulas y manómetros en el cuarto de máquinas de un edificio",
  snow: "Camión quitanieves despejando una calle durante una tormenta de invierno",
  scaffolding: "Equipo con cascos y ropa de alta visibilidad subiendo por el andamio de un edificio",
  landscaping: "Equipo de mantenimiento de áreas verdes cortando y recortando el césped de una propiedad",
  paving: "Pavimentadora colocando asfalto nuevo, con un trabajador al lado",
  parkingLot: "Vista aérea de un gran estacionamiento comercial con los espacios pintados",
  sprinkler: "Tubería roja de rociadores contra incendios a lo largo del techo de concreto de un estacionamiento cubierto",
  loadingDocks: "Puertas de los muelles de carga de un almacén industrial",
  condo: "Edificio de condominios de altura media con balcones",
  lobby: "Vestíbulo de un edificio de oficinas con un mostrador de recepción de piedra",
  lobbyGates: "Vestíbulo de oficinas con torniquetes de seguridad y elevadores",
  elevatorLobby: "Batería de elevadores en el vestíbulo de un edificio comercial",
  windowCleaners: "Limpiadores de ventanas colgados de cuerdas lavando la fachada de vidrio de una torre de oficinas",
  cameras: "Dos cámaras de vigilancia montadas en la pared de un edificio",
  evCharging: "Auto eléctrico conectado a un cargador en un estacionamiento",
  framing: "Carpintero trabajando en una estructura de madera bajo un cielo azul",
  demolition: "Equipo y una miniexcavadora demoliendo parte de un edificio",
  masonry: "Albañil colocando bloques de concreto con una llana",
  drywall: "Adecuación de un interior comercial con montantes de acero y placas de yeso",
  solar: "Paneles solares cubriendo el techo plano de un edificio comercial",
  floorCrew: "Equipo terminando el piso de concreto pulido de un almacén nuevo",
  ceilingLift: "Técnico en una plataforma elevadora instalando equipos en el techo de un estacionamiento cubierto",
  dumpster: "Contenedor de escombros lleno de desechos de construcción",
  pest: "Técnico de control de plagas sosteniendo un rociador a presión",
  fence: "Cerca de malla ciclónica a lo largo del borde de una propiedad",
  rollUpDoor: "Puerta enrollable de acero en un edificio comercial",
  waterDamage: "Techo interior dañado por agua, con el yeso desprendido",
  keys: "Mano sosteniendo un juego de llaves frente a una puerta abierta",
  woodshop: "Carpintero en su banco de trabajo en un taller de carpintería arquitectónica",
  retailAerial: "Vista aérea de un gran centro comercial suburbano y sus estacionamientos",
  floorCoating: "Equipo aplicando con rodillo un recubrimiento sobre el piso de concreto de un gran almacén",
  officeTower: "Fachada de vidrio curva de un edificio de oficinas moderno",
  torontoFlatiron: "El edificio Gooderham (Flatiron) de Toronto, con las torres del centro detrás",
  siteCrew: "Equipo de construcción con cascos y ropa de alta visibilidad trabajando sobre una losa de concreto",
};
