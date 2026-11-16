import { services } from "@/app/data/services";
import { translations } from "@/app/utils/translations";
import { site } from "@/app/utils/site";
import { postDescription, type Post } from "@/app/blog/types";

const address = {
  "@type": "PostalAddress",
  streetAddress: site.address.streetAddress,
  addressLocality: site.address.addressLocality,
  addressRegion: site.address.addressRegion,
  postalCode: site.address.postalCode,
  addressCountry: site.address.addressCountry,
};

// Onde a CWBranding atende: as cidades e o Brasil inteiro (online).
const areaServed = [
  ...site.areasServed.map((name) => ({ "@type": "City", name })),
  { "@type": "Country", name: site.countryServed },
];

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness", "Organization"],
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: site.alternateNames,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}${site.logo}`,
  image: `${site.url}${site.ogImage}`,
  description: site.description,
  foundingDate: site.foundingDate,
  taxID: site.cnpj,
  telephone: site.contact.phone,
  email: site.contact.email,
  priceRange: site.priceRange,
  address,
  geo: {
    "@type": "GeoCoordinates",
    latitude: site.geo.latitude,
    longitude: site.geo.longitude,
  },
  areaServed,
  sameAs: site.sameAs,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.contact.phone,
    contactType: "sales",
    areaServed: "BR",
    availableLanguage: ["Portuguese"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Planos CWBranding",
    itemListElement: translations.PT.plans.map((plan) => ({
      "@type": "Offer",
      name: plan.title,
      description: plan.description,
      price: plan.price.replace(".", ""),
      priceCurrency: "BRL",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.price.replace(".", ""),
        priceCurrency: "BRL",
        unitText: "MONTH",
      },
    })),
  },
  makesOffer: services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.pt.title,
      description: service.pt.shortDesc,
    },
  })),
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  alternateName: site.alternateNames,
  description: site.description,
  inLanguage: "pt-BR",
  publisher: { "@id": `${site.url}/#organization` },
};

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function serviceJsonLd(service: (typeof services)[number]) {
  const url = `${site.url}/servicos/${service.slug}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.pt.title,
      description: service.seoDescription,
      url,
      provider: { "@id": `${site.url}/#organization` },
      areaServed,
      serviceType: service.pt.title,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Início",
          item: site.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Serviços",
          item: `${site.url}/servicos`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.pt.title,
          item: url,
        },
      ],
    },
  ];
}

// Dados de um post do blog: título, datas, imagem e quem publicou.
export function blogPostingJsonLd(post: Post) {
  const url = `${site.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.pt.title.trim(),
    description: postDescription(post.pt),
    url,
    mainEntityOfPage: url,
    image: post.coverUrl || `${site.url}${site.ogImage}`,
    datePublished: post.createdAt ?? undefined,
    dateModified: post.updatedAt ?? post.createdAt ?? undefined,
    inLanguage: "pt-BR",
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export const homeFaqItems = translations.PT.faqItems;
