import { Hanken_Grotesk } from "next/font/google";

// Grotesca de desenho geométrico, a mais próxima da letra das grandes redes
// de básicos: uma família só, com o peso fazendo a hierarquia.
export const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});
