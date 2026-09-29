import { contact } from "./contact";

export const site = {
  name: "CWBranding",
  legalName: "CWBranding Ltda",
  url: "https://cwbranding.com.br",
  locale: "pt_BR",
  lang: "pt-BR",
  foundingDate: "2022-05-06",
  foundingYear: "2022",
  cnpj: "46.292.260/0001-89",
  tagline: "A estratégia por trás da sua empresa",
  description:
    "Agência de branding e marketing digital em Curitiba. Social media, identidade visual, tráfego pago e posicionamento de marca. Sede no Centro, em frente ao Palácio Avenida.",
  title:
    "CWBranding | Agência de Branding e Marketing Digital em Curitiba",
  keywords: [
    "agência de branding Curitiba",
    "agência de marketing digital Curitiba",
    "identidade visual Curitiba",
    "social media Curitiba",
    "gestão de tráfego pago",
    "branding",
  ],
  address: {
    streetAddress: "Rua Ébano Pereira, 11, Conj. 1401",
    addressLocality: "Curitiba",
    addressRegion: "PR",
    postalCode: "80410-240",
    addressCountry: "BR",
    landmark: "em frente ao Palácio Avenida",
  },
  geo: {
    latitude: -25.4335,
    longitude: -49.2768,
  },
  areasServed: ["Curitiba", "São Paulo", "Toronto"],
  priceRange: "R$ 5.699 – R$ 9.999",
  contact,
  sameAs: [contact.instagram, contact.linkedin],
  ogImage: "/og-image.jpg",
  logo: "/cwbranding/cwbrandinglogo.png",
} as const;

export type SiteConfig = typeof site;
