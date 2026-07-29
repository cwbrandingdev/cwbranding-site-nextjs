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
      className="relative overflow-hidden bg-[#004A4A] py-28 md:py-40 pl-6 md:pl-12 pr-4 md:pr-5"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-14 xl:gap-16">
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

          <div className="flex h-[300px] w-full items-center justify-center md:h-[450px] lg:h-[620px] xl:mr-64 xl:h-[700px] lg:justify-end lg:w-full mb-36">
            <img
              src={t.serviceMainImage}
              alt="Processo Criativo CWBranding"
              className="h-full w-full object-contain lg:object-right"
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
