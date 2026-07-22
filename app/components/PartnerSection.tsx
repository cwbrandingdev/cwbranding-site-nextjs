"use client";

import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./ui/Reveal";

const partnerImages = Array.from(
  { length: 24 },
  (_, i) => `/parceiros-cwbranding/${i + 1}.png`,
);

export function PartnersSection() {
  const { t } = useLanguage();

  return (
    <section className="py-28 md:py-40 px-6 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl">
            <span className="italic text-[#004A4A]">
              {t.partnersTitleLine1}
            </span>{" "}
            <span className="text-[var(--brand-ink)]">
              {t.partnersTitleLine2}
            </span>
          </h2>
          <p className="text-muted-foreground">{t.partnersParagraph1}</p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {partnerImages.map((url, i) => (
            <Reveal key={url} delay={i * 0.03}>
              <div className="group aspect-square bg-[var(--sand)] overflow-hidden relative p-4">
                <img
                  src={url}
                  alt={`${t.partnerLabel} ${i + 1}`}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
