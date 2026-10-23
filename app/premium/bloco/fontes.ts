import { Geist, Saira } from "next/font/google";

// As duas vozes das referências BRIX, com as fontes livres mais próximas: a
// grotesca quadrada e estreita dos títulos em caixa-alta (Hudson NY Pro na
// referência; Saira no eixo de largura, por volta de 72%) e a grotesca neutra
// das frases longas (Helvetica Neue na referência; Geist).

export const quadrada = Saira({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-quadrada",
  display: "swap",
});

export const neutra = Geist({
  subsets: ["latin"],
  variable: "--font-neutra",
  display: "swap",
});
