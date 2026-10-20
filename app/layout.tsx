import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sagital — Sites para negócios locais",
    template: "%s | Sagital",
  },
  description:
    "Sites sob medida para academias, mercados, restaurantes e tabacarias.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
