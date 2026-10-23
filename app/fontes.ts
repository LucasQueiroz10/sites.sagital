import {
  Instrument_Serif,
  Inter_Tight,
  Plus_Jakarta_Sans,
} from "next/font/google";

// Plus Jakarta Sans, a fonte única do Sagital Design System: o peso e o
// tamanho fazem a hierarquia. Variável de 200 a 800, servida pelo próprio site.
export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

// A vitrine dos demos (pedido do dono em 2026-10-23, a partir de uma
// referência de portfólio): nomes numa grotesca pesada e apertada, com uma
// palavra em serifa itálica ao lado. Só nessa seção.
export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-inter-tight",
  display: "swap",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif",
  display: "swap",
});
