"use client";

import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./ui/Reveal";

interface ImageProps {
  url: string;
}

export function PartnersSection() {
  const images: ImageProps[] = [
    { url: "/parceiros-cwbranding/apmarine.avif" },
    { url: "/parceiros-cwbranding/petbras.avif" },
    { url: "/parceiros-cwbranding/swarovski.avif" },
    { url: "/parceiros-cwbranding/imuv.avif" },
    { url: "/parceiros-cwbranding/deconsultec.avif" },
    { url: "/parceiros-cwbranding/estriaszero.avif" },
    { url: "/parceiros-cwbranding/lotusflora.avif" },
    { url: "/parceiros-cwbranding/mimus-patisserie.avif" },
  ];

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
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <a href="#" className="group block">
                <div className="aspect-square bg-[var(--sand)] overflow-hidden relative">
                  {image.url ? (
                    <img
                      src={image.url}
                      alt={`Cliente ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-[var(--brand-deep)]/50 text-xs tracking-[0.3em] uppercase group-hover:scale-105 transition-transform duration-700">
                      [ Cliente {i + 1} ]
                    </div>
                  )}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
