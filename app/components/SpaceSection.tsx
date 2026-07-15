"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./ui/Reveal";

export function SpaceSection() {
  return (
    <>
      <section className="grid md:grid-cols-3 gap-1">
        {[1, 2, 3].map((n) => (
          <Reveal key={n} delay={n * 0.1}>
            <div className="aspect-[3/4] bg-gradient-to-br from-[var(--sand)] to-[var(--brand)]/40 flex items-center justify-center text-[var(--brand-deep)]/60 text-xs tracking-[0.3em] uppercase">
              [ Imagem {n} ]
            </div>
          </Reveal>
        ))}
      </section>

      <section className="relative py-28 md:py-40 px-6 md:px-12 bg-[var(--sand)]">
        <div className="mx-auto max-w-[1200px] text-center">
          <Reveal>
            <div className="mx-auto size-24 rounded-full border-2 border-[var(--brand-deep)] flex items-center justify-center mb-10">
              <span className="font-display text-3xl italic text-[var(--brand-deep)]">
                cw
              </span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="font-display text-3xl md:text-5xl text-[var(--brand-deep)] max-w-3xl mx-auto leading-tight">
              Nosso Espaço
            </h3>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-[var(--brand-ink)]/80">
              Confiança se constrói com solidez e transparência. Nossa sede, em
              frente ao Palácio Avenida, no coração de Curitiba, é a prova de
              que somos uma empresa real e consolidada — um espaço onde
              estratégias ganham vida e parcerias duradouras se fortalecem.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a
              href="#"
              className="mt-10 inline-flex items-center gap-3 border border-[var(--brand-deep)] rounded-full px-7 py-3 text-sm tracking-[0.2em] uppercase text-[var(--brand-deep)] hover:bg-[var(--brand-deep)] hover:text-[color:var(--sand-soft)] transition"
            >
              Descubra <ArrowUpRight className="size-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
