import { Figtree, Young_Serif } from "next/font/google";

// Young Serif nos títulos: serifa encorpada e calorosa, de placa pintada à mão.
// Figtree no texto e no cardápio.
export const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-young-serif",
  display: "swap",
});

export const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});
