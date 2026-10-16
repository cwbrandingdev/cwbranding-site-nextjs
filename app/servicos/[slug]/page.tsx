import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, getServicePath, services } from "@/app/data/services";
import { getServiceImageUrl } from "@/app/utils/serviceImages";
import { site } from "@/app/utils/site";
import { JsonLd } from "@/app/components/JsonLd";
import { faqJsonLd, serviceJsonLd } from "@/app/utils/jsonld";
import { ServiceDetail } from "./ServiceDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

// Título e descrição para o Google e para compartilhamento (versão em português).
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Serviço não encontrado" };

  const path = getServicePath(service);

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${service.seoTitle} | CWBranding`,
      description: service.seoDescription,
      url: `${site.url}${path}`,
      type: "website",
      images: [{ url: getServiceImageUrl(service.id), alt: `${service.pt.title} — CWBranding` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.seoTitle} | CWBranding`,
      description: service.seoDescription,
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd data={[...serviceJsonLd(service), faqJsonLd(service.pt.faq)]} />
      <ServiceDetail service={service} />
    </>
  );
}
