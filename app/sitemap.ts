import type { MetadataRoute } from "next";
import { URL_DO_SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: URL_DO_SITE, changeFrequency: "monthly", priority: 1 }];
}
