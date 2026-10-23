import {
  Barlow,
  Barlow_Condensed,
  Kaushan_Script,
  Kristi,
} from "next/font/google";
import localFont from "next/font/local";

// Três vozes, como numa identidade de comida natural: uma serifa condensada
// de cartaz para os títulos, uma letra à mão para a palavra que importa e uma
// grotesca condensada para os selos e as faixas. Barlow no texto corrido.

// Libre Caslon Condensed (OFL), servida do próprio site: esta versão do
// next/font/google ainda não a lista.
export const caslon = localFont({
  src: [
    {
      path: "./fontes-locais/libre-caslon-condensed.woff2",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "./fontes-locais/libre-caslon-condensed-italico.woff2",
      weight: "400 700",
      style: "italic",
    },
  ],
  variable: "--font-caslon",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

// O nome da casa, em pincel encorpado e inclinado como a logo das
// referências; legível com qualquer nome e com acentos.
export const kaushan = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kaushan",
  display: "swap",
});

// As palavras escritas à mão, em caneta de traço solto.
export const kristi = Kristi({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kristi",
  display: "swap",
});

export const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

export const barlowCondensada = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensada",
  display: "swap",
});
