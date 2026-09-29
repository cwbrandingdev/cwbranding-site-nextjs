export type ServiceContent = {
  id: number;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  shortDesc: string;
  paragraphs: string[];
  benefits: string[];
};

export const services: ServiceContent[] = [
  {
    id: 1,
    slug: "social-media",
    title: "Social Media",
    seoTitle: "Social Media em Curitiba",
    seoDescription:
      "Gestão de social media em Curitiba: planejamento, conteúdo e crescimento de audiência para marcas que querem presença digital consistente.",
    shortDesc:
      "Criação e gestão de conteúdo para redes sociais, incluindo estratégias de engajamento e crescimento de audiência.",
    paragraphs: [
      "Cuidamos do posicionamento da sua marca nas redes sociais com planejamento mensal, pauta editorial e produção de conteúdo alinhada ao tom de voz do negócio. O objetivo não é só publicar: é construir reconhecimento e demanda.",
      "A operação inclui direção criativa, legendas, artes, stories e acompanhamento de desempenho. Ajustamos formato e frequência com base no que realmente gera alcance, conversa e conversão para o seu público em Curitiba e no restante do Brasil.",
    ],
    benefits: [
      "Planejamento editorial mensal",
      "Conteúdo alinhado à estratégia de marca",
      "Calendário e publicação consistentes",
      "Acompanhamento de alcance e engajamento",
    ],
  },
  {
    id: 2,
    slug: "identidade-visual",
    title: "Identidade Visual",
    seoTitle: "Identidade Visual em Curitiba",
    seoDescription:
      "Identidade visual para empresas em Curitiba: logo, cores, tipografia e sistema gráfico para a marca ser reconhecida em qualquer ponto de contato.",
    shortDesc:
      "Conjunto de elementos gráficos que representam visualmente uma marca — logo, cores, tipografia e padrões visuais.",
    paragraphs: [
      "Desenvolvemos a identidade visual como um sistema, não como um logo isolado. Cores, tipografia, grafismos e aplicações são pensados para funcionar em redes sociais, papéis, apresentações e ambiente físico.",
      "O processo parte do posicionamento da marca: quem você é, para quem fala e como quer ser percebido. Entregamos um conjunto visual coeso para a empresa se apresentar com clareza em Curitiba e em qualquer outro mercado.",
    ],
    benefits: [
      "Logo e sistema de marca",
      "Paleta, tipografia e grafismos",
      "Aplicações digitais e impressas",
      "Direção para uso consistente no dia a dia",
    ],
  },
  {
    id: 3,
    slug: "gestao-de-trafego",
    title: "Gestão de Tráfego",
    seoTitle: "Gestão de Tráfego Pago em Curitiba",
    seoDescription:
      "Gestão de tráfego pago em Curitiba: campanhas de mídia para gerar visitantes qualificados, leads e crescimento previsível para a sua empresa.",
    shortDesc:
      "Planejamento e execução de campanhas de mídia paga para direcionar visitantes qualificados para a empresa.",
    paragraphs: [
      "Estruturamos campanhas de mídia paga para levar a mensagem certa até as pessoas com maior chance de virar cliente. Isso inclui recorte de audiência, criativos, orçamento e leitura contínua de resultado.",
      "Tráfego sem estratégia só gasta verba. Integramos anúncios ao posicionamento, à oferta e à landing page para o investimento gerar conversas comerciais, não só cliques.",
    ],
    benefits: [
      "Campanhas em Meta e Google",
      "Segmentação e qualificação de audiência",
      "Otimização contínua de verba",
      "Relatórios de alcance e conversão",
    ],
  },
  {
    id: 4,
    slug: "landing-pages",
    title: "Landing Pages",
    seoTitle: "Landing Pages em Curitiba",
    seoDescription:
      "Criação de landing pages em Curitiba para converter tráfego em leads e clientes, com oferta clara, design e chamada para ação alinhados à marca.",
    shortDesc:
      "Páginas web específicas criadas para converter visitantes em leads ou clientes através de uma ação desejada.",
    paragraphs: [
      "Uma landing page existe para uma ação: agendar, pedir orçamento, baixar material ou comprar. Desenhamos páginas com hierarquia clara, prova da oferta e formulário ou WhatsApp no ponto certo.",
      "Alinhamos copy, visual e campanha de tráfego para o visitante entender rápido o que você entrega e por que falar com a sua empresa agora — especialmente em mercados competitivos como Curitiba.",
    ],
    benefits: [
      "Página focada em uma conversão",
      "Texto e design alinhados à oferta",
      "Integração com campanhas pagas",
      "Base para mensurar leads gerados",
    ],
  },
  {
    id: 5,
    slug: "assessoria-de-marketing",
    title: "Assessoria de Marketing",
    seoTitle: "Assessoria de Marketing em Curitiba",
    seoDescription:
      "Assessoria de marketing em Curitiba: diagnóstico, planejamento e acompanhamento para empresas que precisam de direção estratégica, não só de peças.",
    shortDesc:
      "Consultoria estratégica para empresas desenvolverem e implementarem planos de marketing eficazes.",
    paragraphs: [
      "A assessoria existe para tirar o marketing do improviso. Fazemos diagnóstico de marca, prioridades comerciais e um plano que a equipe (ou a agência) consiga executar mês a mês.",
      "Atuamos como braço estratégico: o que comunicar, para quem, em quais canais e com qual oferta. Indicado para empresas que já operam e precisam de clareza antes de escalar mídia ou conteúdo.",
    ],
    benefits: [
      "Diagnóstico de marca e mercado",
      "Plano de marketing acionável",
      "Alinhamento entre comunicação e vendas",
      "Encontros de acompanhamento",
    ],
  },
  {
    id: 6,
    slug: "ensaios-fotograficos",
    title: "Ensaios Fotográficos",
    seoTitle: "Ensaios Fotográficos para Marcas em Curitiba",
    seoDescription:
      "Ensaios fotográficos profissionais em Curitiba para marcas: fotos de produto, equipe e ambiente para redes sociais, site e materiais comerciais.",
    shortDesc:
      "Produção de fotografias profissionais para materiais de marketing, redes sociais e comunicação corporativa.",
    paragraphs: [
      "Produzimos ensaios pensados para a comunicação da marca, não para o álbum. Direção de cena, look and feel e seleção de imagens seguem o mesmo sistema visual usado nas redes e nos materiais.",
      "O banco de fotos alimenta feed, anúncios, site e apresentações com consistência. Empresas em Curitiba ganham um acervo próprio em vez de depender só de banco de imagem genérico.",
    ],
    benefits: [
      "Direção alinhada à identidade da marca",
      "Fotos para digital e impresso",
      "Seleção e tratamento das imagens",
      "Acervo reutilizável nas campanhas",
    ],
  },
  {
    id: 7,
    slug: "materiais-graficos",
    title: "Materiais Gráficos",
    seoTitle: "Materiais Gráficos e Design em Curitiba",
    seoDescription:
      "Materiais gráficos em Curitiba: folders, banners, cartões, apresentações e peças digitais com a identidade da sua marca aplicada com consistência.",
    shortDesc:
      "Peças visuais impressas ou digitais — folders, banners, cartões, apresentações e demais materiais de apoio.",
    paragraphs: [
      "Do cartão de visita à apresentação comercial, cada peça reforça ou dilui a marca. Desenhamos materiais gráficos a partir da identidade visual para o conjunto parecer uma empresa só.",
      "Atendemos demandas pontuais e kits completos: institucional, ponto de venda, digital e impresso. O critério é sempre clareza da mensagem e coerência com o posicionamento.",
    ],
    benefits: [
      "Peças impressas e digitais",
      "Aplicação fiel da identidade",
      "Kits para vendas e eventos",
      "Padrão visual em todos os formatos",
    ],
  },
  {
    id: 8,
    slug: "cobertura-de-eventos",
    title: "Cobertura de Eventos",
    seoTitle: "Cobertura de Eventos em Curitiba",
    seoDescription:
      "Cobertura de eventos institucionais e promocionais em Curitiba: planejamento, registro e conteúdo para a marca aparecer com consistência durante e depois do evento.",
    shortDesc:
      "Planejamento e execução da cobertura de eventos institucionais ou promocionais da marca.",
    paragraphs: [
      "Cobrimos eventos com olhar de marca: o que registrar, como enquadrar e o que publicar no mesmo dia. A cobertura vira conteúdo para redes, imprensa interna e memória da empresa.",
      "Planejamos antes, executamos no local e organizamos o material depois — fotos, recortes para stories e peças de follow-up. Útil para lançamentos, encontros e ativações em Curitiba.",
    ],
    benefits: [
      "Planejamento da cobertura",
      "Registro fotográfico no evento",
      "Conteúdo para redes no mesmo ciclo",
      "Material para pós-evento e arquivo",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getServiceById(id: string | number) {
  return services.find((service) => String(service.id) === String(id));
}

export function getServicePath(service: Pick<ServiceContent, "slug">) {
  return `/servicos/${service.slug}`;
}
