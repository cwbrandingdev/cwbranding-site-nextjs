"use client";

import { Reveal } from "./ui/Reveal";
import { ServiceCard } from "./ui/ServiceCard";

const services = [
  {
    title: "Social Media",
    desc: "Criação e gestão de conteúdo para redes sociais, incluindo estratégias de engajamento e crescimento de audiência.",
  },
  {
    title: "Identidade Visual",
    desc: "Conjunto de elementos gráficos que representam visualmente uma marca — logo, cores, tipografia e padrões visuais.",
  },
  {
    title: "Gestão de Tráfego",
    desc: "Planejamento e execução de campanhas de mídia paga para direcionar visitantes qualificados para a empresa.",
  },
  {
    title: "Landing Pages",
    desc: "Páginas web específicas criadas para converter visitantes em leads ou clientes através de uma ação desejada.",
  },
  {
    title: "Assessoria de Marketing",
    desc: "Consultoria estratégica para empresas desenvolverem e implementarem planos de marketing eficazes.",
  },
  {
    title: "Ensaios Fotográficos",
    desc: "Produção de fotografias profissionais para materiais de marketing, redes sociais e comunicação corporativa.",
  },
  {
    title: "Materiais Gráficos",
    desc: "Peças visuais impressas ou digitais — folders, banners, cartões, apresentações e demais materiais de apoio.",
  },
  {
    title: "Cobertura de Eventos",
    desc: "Planejamento e execução da cobertura de eventos institucionais ou promocionais da marca.",
  },
];

export function ServicesSection() {
  return (
    <section
      id="servicos"
      className="relative py-28 md:py-40 px-6 md:px-12 bg-green-200/60"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl">
            <span className="italic text-[#004D4C]">Nossos</span>{" "}
            <span className="text-green-700/60">Serviços</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-10 md:gap-20 max-w-5xl">
          <Reveal delay={0.1}>
            <p className="font-display text-2xl md:text-3xl leading-snug  text-[#004D4C]">
              Transformamos sua visão em resultados concretos por meio da união
              entre estratégia, design e presença digital.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg leading-relaxed  text-[#004D4C]">
              A CWBranding combina criatividade, dados e execução para entregar
              soluções completas de marketing e branding, ajudando marcas a se
              destacarem no seu setor com verdade e consistência.
            </p>
          </Reveal>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ServiceCard
              key={s.title}
              index={i}
              title={s.title}
              desc={s.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
