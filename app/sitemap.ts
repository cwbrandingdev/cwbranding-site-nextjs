import type { MetadataRoute } from "next";
import { translations } from "@/app/utils/translations";

const BASE_URL = "https://cwbranding.com.br";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceUrls: MetadataRoute.Sitemap = translations.PT.servicesList.map(
    (service) => ({
      url: `${BASE_URL}/servicos/${service.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...serviceUrls,
  ];
}
