import type { Metadata } from "next";
import Link from "next/link";
import { services, getServicePath } from "@/app/data/services";
import { site } from "@/app/utils/site";
import { JsonLd } from "@/app/components/JsonLd";

export const metadata: Metadata = {
  title: "Serviços de branding e marketing digital em Curitiba",
  description:
    "Conheça os serviços da CWBranding em Curitiba: social media, identidade visual, tráfego pago, landing pages, assessoria, ensaios, materiais gráficos e eventos.",
  alternates: {
    canonical: "/servicos",
  },
  // Página mantida para links diretos, mas fora do Google.
  robots: { index: false, follow: true },
  openGraph: {
    url: `${site.url}/servicos`,
    title: "Serviços | CWBranding",
    description:
      "Social media, identidade visual, tráfego pago e mais serviços de branding em Curitiba.",
  },
};

const listJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Serviços CWBranding",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.title,
    url: `${site.url}${getServicePath(service)}`,
  })),
};

export default function ServicesIndexPage() {
  return (
    <main className="relative min-h-screen bg-[#004D4C] text-white">
      <JsonLd data={listJsonLd} />
      <div className="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <p className="font-mono text-xs uppercase tracking-widest text-[#E8C39E] mb-4">
          CWBranding · Curitiba
        </p>
        <h1 className="font-display text-4xl md:text-6xl leading-tight mb-6">
          Serviços de branding e marketing digital
        </h1>
        <p className="max-w-2xl text-white/80 text-lg leading-relaxed mb-16">
          Estratégia, design e presença digital para empresas que precisam ser
          reconhecidas e gerar demanda. Sede no Centro de Curitiba, em frente ao
          Palácio Avenida.
        </p>
        <ul className="grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={getServicePath(service)}
                className="block rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:border-[#E8C39E]/50 hover:bg-white/[0.06] transition-colors"
              >
                <h2 className="font-display text-2xl text-[#E8C39E] mb-2">
                  {service.title}
                </h2>
                <p className="text-sm text-white/75 leading-relaxed">
                  {service.shortDesc}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
