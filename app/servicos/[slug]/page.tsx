import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  Briefcase,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { getServiceImageUrl } from "@/app/utils/serviceImages";
import {
  getServiceBySlug,
  getServicePath,
  services,
} from "@/app/data/services";
import { contact } from "@/app/utils/contact";
import { site } from "@/app/utils/site";
import { JsonLd } from "@/app/components/JsonLd";
import { serviceJsonLd } from "@/app/utils/jsonld";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: "Serviço não encontrado" };
  }

  const url = `${site.url}${getServicePath(service)}`;

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: {
      canonical: getServicePath(service),
    },
    openGraph: {
      title: `${service.title} | CWBranding`,
      description: service.seoDescription,
      url,
      type: "website",
      images: [
        {
          url: getServiceImageUrl(service.id),
          alt: `${service.title} — CWBranding Curitiba`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | CWBranding`,
      description: service.seoDescription,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const servico = getServiceBySlug(slug);

  if (!servico) {
    notFound();
  }

  const related = services
    .filter((item) => item.slug !== servico.slug)
    .slice(0, 3);

  return (
    <div className="relative min-h-screen bg-[#004D4C] text-white overflow-hidden selection:bg-[#E8C39E] selection:text-[#004D4C]">
      <JsonLd data={serviceJsonLd(servico)} />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e8c39e08_1px,transparent_1px),linear-gradient(to_bottom,#e8c39e08_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E8C39E]/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-32">
        <Link
          href="/servicos"
          className="group flex items-center gap-2 text-white/70 hover:text-[#E8C39E] transition-colors mb-12 md:mb-16 w-fit font-mono text-xs uppercase tracking-widest"
        >
          <ChevronLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Todos os serviços
        </Link>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-start">
          <div className="space-y-10">
            <header className="space-y-4">
              <div className="flex items-center gap-3 text-[#E8C39E] font-mono text-sm tracking-widest uppercase">
                <Briefcase size={16} />
                <span>Serviço em Curitiba</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight">
                {servico.title}
                <span className="text-[#E8C39E]">.</span>
              </h1>
            </header>

            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
              <Image
                src={getServiceImageUrl(servico.id)}
                alt={`${servico.title} — agência CWBranding em Curitiba`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover opacity-85 hover:opacity-100 transition-opacity duration-500"
              />
            </div>

            <div className="space-y-6 text-white/90 leading-relaxed font-light text-base md:text-lg">
              <p className="font-semibold text-xl text-[#E8C39E]">
                {servico.shortDesc}
              </p>

              {servico.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}

              <div className="pt-4 space-y-3">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-[#E8C39E]" /> O que
                  entregamos
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-white/80">
                  {servico.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2">
                      <CheckCircle2
                        size={16}
                        className="text-[#E8C39E] shrink-0"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {related.length > 0 && (
                <nav aria-label="Outros serviços" className="pt-8">
                  <h2 className="text-lg font-semibold text-white mb-4">
                    Outros serviços
                  </h2>
                  <ul className="flex flex-wrap gap-3">
                    {related.map((item) => (
                      <li key={item.slug}>
                        <Link
                          href={getServicePath(item)}
                          className="inline-flex border border-white/15 px-4 py-2 rounded-full text-sm text-white/80 hover:border-[#E8C39E] hover:text-[#E8C39E] transition-colors"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </div>

          <aside className="sticky top-32 space-y-8">
            <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl space-y-8">
              <div className="space-y-2">
                <p className="text-[#E8C39E]/80 font-mono text-xs uppercase tracking-widest">
                  Disponibilidade
                </p>
                <div className="flex items-center gap-3 text-white/90">
                  <Calendar size={18} className="text-[#E8C39E]" />
                  <span className="text-sm font-medium">
                    Imediata / Sob agendamento
                  </span>
                </div>
              </div>

              <div className="h-[1px] w-full bg-white/10" />

              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#E8C39E] text-[#004D4C] hover:bg-white transition-all duration-300 font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
              >
                Solicitar orçamento
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
