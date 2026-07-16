"use client";

import { Reveal } from "./ui/Reveal";

export function PartnersSection() {
  return (
    <section className="py-28 md:py-40 px-6 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl">
            <span className="italic text-[#004A4A]">Nossos</span>{" "}
            <span className="text-[var(--brand-ink)]">Parceiros</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <a href="#" className="group block">
                <div className="aspect-square bg-[var(--sand)] overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-[var(--brand-deep)]/50 text-xs tracking-[0.3em] uppercase group-hover:scale-105 transition-transform duration-700">
                    [ Cliente {i + 1} ]
                  </div>
                </div>
                <p className="mt-3 text-sm tracking-widest uppercase text-[#004A4A]">
                  Parceiro {i + 1}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
