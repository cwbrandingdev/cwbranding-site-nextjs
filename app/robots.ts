import type { MetadataRoute } from "next";
<<<<<<< HEAD
import { site } from "@/app/utils/site";
=======
>>>>>>> 33fddbf0f9ce31781651742d11fc2491170381c0

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
<<<<<<< HEAD
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
=======
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://cwbranding.com.br/sitemap.xml",
>>>>>>> 33fddbf0f9ce31781651742d11fc2491170381c0
  };
}
