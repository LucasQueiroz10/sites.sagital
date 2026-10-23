import { SerwistProvider } from "@serwist/turbopack/react";
import type { Metadata, Viewport } from "next";
import { URL_DO_SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(URL_DO_SITE),
  applicationName: "Sagital",
  title: {
    default: "Sagital — Sites para o seu negócio",
    template: "%s | Sagital",
  },
  description: "Sites sob medida para elevar o nível do seu negócio.",
  appleWebApp: {
    capable: true,
    title: "Sagital",
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
  openGraph: { type: "website", locale: "pt_BR", siteName: "Sagital" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
