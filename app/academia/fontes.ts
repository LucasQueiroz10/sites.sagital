import { Archivo } from "next/font/google";

// Archivo variável com o eixo de largura: o mesmo desenho serve para os
// títulos expandidos e para o texto corrido.
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
