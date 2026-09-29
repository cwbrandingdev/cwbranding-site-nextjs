import type { MetadataRoute } from "next";
<<<<<<< HEAD
import { services } from "@/app/data/services";
import { site } from "@/app/utils/site";
=======
import { translations } from "@/app/utils/translations";

const BASE_URL = "https://cwbranding.com.br";
>>>>>>> 33fddbf0f9ce31781651742d11fc2491170381c0

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
<<<<<<< HEAD
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/servicos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...services.map((service) => ({
      url: `${site.url}/servicos/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
=======
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
>>>>>>> 33fddbf0f9ce31781651742d11fc2491170381c0
  ];
}
