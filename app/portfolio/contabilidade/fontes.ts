import { Schibsted_Grotesk } from "next/font/google";

// Uma grotesca de jornal de economia: firme nos números e nos títulos,
// clara no texto. Uma família só, o peso faz a hierarquia.
export const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});
