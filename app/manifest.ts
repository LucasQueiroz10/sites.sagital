import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Sagital — Sites para o seu negócio",
    short_name: "Sagital",
    description:
      "Demos de sites para qualquer negócio, com link e QR code personalizados.",
    lang: "pt-BR",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Gerar link e QR code", url: "/gerar" },
      { name: "Demo de academia", url: "/academia" },
      { name: "Demo de varejo", url: "/varejo" },
      { name: "Demo de restaurante", url: "/restaurante" },
    ],
  };
}
