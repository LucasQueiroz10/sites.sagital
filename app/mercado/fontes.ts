import { Barlow, Barlow_Condensed } from "next/font/google";

// Barlow Condensed nos títulos e preços, como as letras do encarte;
// Barlow no texto corrido.
export const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["800", "900"],
  style: "italic",
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});
