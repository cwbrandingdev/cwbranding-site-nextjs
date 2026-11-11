import { contact } from "./contact";

export const site = {
  name: "CWBranding",
  legalName: "CWBranding Ltda",
  // Outros nomes pelos quais a empresa é procurada (Instagram @agenciacwbranding, LinkedIn).
  alternateNames: ["Agência CWBranding", "CW Branding"],
  url: "https://www.cwbranding.com.br",
  locale: "pt_BR",
  lang: "pt-BR",
  foundingDate: "2022-05-06",
  foundingYear: "2022",
  cnpj: "46.292.260/0001-89",
  tagline: "A estratégia por trás da sua empresa",
  description:
    "Agência de branding e marketing digital em Curitiba que atende todo o Brasil: social media, identidade visual, tráfego pago, criação de sites e landing pages.",
  title: "Agência CWBranding | Marketing Digital, Branding e Sites em Curitiba",
  keywords: [
    "agência de branding Curitiba",
    "agência de marketing digital Curitiba",
    "identidade visual Curitiba",
    "social media Curitiba",
    "gestão de tráfego pago",
    "criação de sites Curitiba",
    "desenvolvimento de sites",
    "desenvolvimento web",
    "landing page Curitiba",
    "página de vendas",
    "materiais gráficos Curitiba",
    "design gráfico Curitiba",
    "criação de logo",
    "gestor de tráfego",
    "Agência CWBranding",
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
  countryServed: "Brasil", // atendimento online para todo o país
  priceRange: "R$ 3.599 – R$ 9.999",
  contact,
  sameAs: [contact.instagram, contact.linkedin],
  // Imagem da prévia ao compartilhar o link (WhatsApp, LinkedIn...), 1200x630.
  ogImage: "/compartilhamento/og-image.jpg",
  logo: "/cwbranding/cwbrandinglogo.png",
} as const;

export type SiteConfig = typeof site;
