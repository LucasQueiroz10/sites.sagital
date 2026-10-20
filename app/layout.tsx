import { SerwistProvider } from "@serwist/turbopack/react";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  applicationName: "Sagital",
  title: {
    default: "Sagital — Sites para negócios locais",
    template: "%s | Sagital",
  },
  description:
    "Sites sob medida para academias, mercados, restaurantes e tabacarias.",
  appleWebApp: {
    capable: true,
    title: "Sagital",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#3b2bd9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        {/* reloadOnOnline desligado: a volta do sinal não recarrega a página no meio da apresentação. */}
        <SerwistProvider swUrl="/serwist/sw.js" reloadOnOnline={false}>
          {children}
        </SerwistProvider>
      </body>
    </html>
  );
}
