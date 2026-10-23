import {
  Archivo,
  Monsieur_La_Doulaise,
  Noto_Serif_Display,
} from "next/font/google";

// As três vozes do cardápio das referências, com as fontes livres mais
// próximas: a serifa de alto contraste bem estreita dos nomes (Noto Serif
// Display no eixo de largura 62,5), a caligrafia de pena das palavras
// "Les", "The", "Signature" (Monsieur La Doulaise) e a grotesca dos selos e
// das descrições em caixa-alta (Archivo, que também estreita).

export const serifa = Noto_Serif_Display({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-serifa",
  display: "swap",
});

export const caligrafia = Monsieur_La_Doulaise({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caligrafia",
  display: "swap",
});

export const grotesca = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-grotesca",
  display: "swap",
});
