import type { MetadataRoute } from "next";
import { URL_DO_SITE } from "@/lib/site";

// Só a página da Sagital é indexável. Os demos e o /gerar têm noindex na
// própria página; não são bloqueados aqui para os buscadores conseguirem
// ler esse noindex.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/serwist/" },
    sitemap: `${URL_DO_SITE}/sitemap.xml`,
  };
}
