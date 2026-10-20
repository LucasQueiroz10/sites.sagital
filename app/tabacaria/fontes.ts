import { Jost, Marcellus } from "next/font/google";

// Marcellus nos títulos, com o desenho de letras gravadas em placa de latão;
// Jost, geométrica de inspiração art déco, no texto.
export const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

export const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});
