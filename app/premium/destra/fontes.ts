import { Inter } from "next/font/google";

// A fonte do modelo: Inter nos pesos 300 a 600, uma só para o site inteiro.
// Os títulos usam o 300 apertado; o texto corrido, o 400; botões, o 500.
export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});
