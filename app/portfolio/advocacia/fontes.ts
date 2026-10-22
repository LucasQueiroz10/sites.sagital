import { Geist, Libre_Caslon_Display } from "next/font/google";

// Caslon de título, como nos papéis timbrados de escritório tradicional;
// uma grotesca neutra e atual no texto, para não soar antiquado.
export const caslon = Libre_Caslon_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caslon",
  display: "swap",
});

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});
