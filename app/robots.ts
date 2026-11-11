import type { MetadataRoute } from "next";
import { site } from "@/app/utils/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Endpoints internos (rastreio e integração com o CRM): não são páginas.
        // O painel admin não entra aqui de propósito: listar o endereço secreto o revelaria.
        disallow: "/api/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
