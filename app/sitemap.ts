import type { MetadataRoute } from "next";
import { site } from "@/app/utils/site";

export const dynamic = "force-static";

// As páginas /servicos ficam fora do sitemap (estão com noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
