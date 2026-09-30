import { Poppins, Lato, IBM_Plex_Mono } from "next/font/google";

// Display / headings
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Body / UI
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Mono / eyebrows / data
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

/** Shared by the two root layouts (app/[lang] and app/embed). */
export const fontVariables = `${poppins.variable} ${lato.variable} ${plexMono.variable}`;
