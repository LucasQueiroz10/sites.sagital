import { Sofia_Sans, Sofia_Sans_Condensed } from "next/font/google";

// Uma família só, em duas larguras: a condensada nos títulos em caixa alta,
// como em material de academia e loja de esporte; a normal no texto corrido.
export const sofiaCondensada = Sofia_Sans_Condensed({
  subsets: ["latin"],
  variable: "--font-sofia-condensada",
  display: "swap",
});

export const sofia = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-sofia",
  display: "swap",
});
