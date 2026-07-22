"use client";

import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./ui/Reveal";
import { ServiceCard } from "./ui/ServiceCard";

export function ServicesSection() {
  const { t } = useLanguage();

  const services = t.servicesList || [];

  return (
    <section
      id="servicos"
      className="relative py-28 md:py-40 px-6 md:px-12 bg-[#004A4A]"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Reveal>
              <h2 className="font-display text-5xl md:text-7xl lg:text-8xl">
                <span className="italic text-[#E8C39E]">
                  {t.servicesTitleLine1}
                </span>{" "}
                <span className="text-white">{t.servicesTitleLine2}</span>
              </h2>
            </Reveal>

            <div className="mt-10 space-y-6 max-w-xl">
              <Reveal delay={0.1}>
                <p className="font-display text-2xl md:text-3xl leading-snug text-white font-medium">
                  {t.servicesHeadline}
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base md:text-lg leading-relaxed text-zinc-300">
                  {t.servicesDescription}
                </p>
              </Reveal>
            </div>
          </div>

          <div className="w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-white/80">
            <img
              src="/cwbranding/cwbranding.avif"
              alt="Processo Criativo CWBranding"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <ServiceCard
              key={s.title}
              index={i}
              title={s.title}
              desc={s.desc}
              id={s.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
