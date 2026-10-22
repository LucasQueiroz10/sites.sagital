import { Archivo } from "next/font/google";

// Uma grotesca de largura variável: estreita e alta nos títulos, como a
// letra das pranchas e placas de obra; normal no texto corrido.
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
