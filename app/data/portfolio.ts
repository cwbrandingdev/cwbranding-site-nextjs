// Sites que a CWBranding já desenvolveu. Aparecem nas páginas de
// Sites Institucionais e Landing Pages, cada uma com o seu tipo.
//
// Para adicionar um projeto: coloque os prints em public/portfolio/
// (computador 1200x750 e celular 400px de largura, em .webp) e adicione um item aqui.

export type PortfolioType = "site" | "landing-page";

export type PortfolioProject = {
  name: string;
  url: string;
  type: PortfolioType;
  desktopImage: string; // print da versão para computador
  mobileImage: string; // print da versão para celular
};

export const portfolio: PortfolioProject[] = [
  {
    name: "Márcio Simioni",
    url: "https://marciosimioni.com.br/empresas",
    type: "site",
    desktopImage: "/portfolio/marcio-simioni-desktop.webp",
    mobileImage: "/portfolio/marcio-simioni-mobile.webp",
  },
  {
    name: "Sensora Home",
    url: "https://www.sensorahome.com.br/",
    type: "site",
    desktopImage: "/portfolio/sensora-home-desktop.webp",
    mobileImage: "/portfolio/sensora-home-mobile.webp",
  },
  {
    name: "NanoSkinBio",
    url: "https://www.nanoskinbiobrasil.com.br/",
    type: "site",
    desktopImage: "/portfolio/nanoskinbio-desktop.webp",
    mobileImage: "/portfolio/nanoskinbio-mobile.webp",
  },
  {
    name: "Monica Gobbeti",
    url: "https://www.monicagobbeti.com.br/",
    type: "landing-page",
    desktopImage: "/portfolio/monica-gobbeti-desktop.webp",
    mobileImage: "/portfolio/monica-gobbeti-mobile.webp",
  },
];

// Qual tipo de projeto aparece em cada página de serviço.
const TYPE_BY_SERVICE: Record<string, PortfolioType> = {
  "sites-institucionais": "site",
  "landing-pages": "landing-page",
};

// Projetos para mostrar na página de um serviço (lista vazia = a seção não aparece).
export function getPortfolioForService(serviceSlug: string): PortfolioProject[] {
  const type = TYPE_BY_SERVICE[serviceSlug];
  return portfolio.filter((project) => project.type === type);
}
