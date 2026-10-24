import { Readex_Pro } from "next/font/google";

// A fonte do modelo: Readex Pro, variável de 160 a 700, uma só para o site
// inteiro. Os títulos usam o 500 bem apertado; o texto corrido, o 300 e o 400.
export const readex = Readex_Pro({
  subsets: ["latin"],
  variable: "--font-readex",
  display: "swap",
});
