"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  id: string | number;
  title: string;
  desc: string;
  index: number;
  isImageCard?: boolean;
}

const MotionLink = motion.create(Link);

export function ServiceCard({
  id,
  title,
  desc,
  index,
  isImageCard = false,
}: ServiceCardProps) {

  // Imagem de placeholder baseada no ID do serviço para não repetir sempre a mesma foto
  const imageUrl = `https://picsum.photos/id/${Number(id) * 10 + 10}/600/450`;

  if (isImageCard) {
    return (
      <MotionLink
        href={`/servicos/${id}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{
          duration: 0.7,
          delay: (index % 2) * 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        // "group overflow-hidden" é essencial aqui para conter a imagem e aplicar os efeitos de hover
        className="group relative h-96 border border-white/10 rounded-2xl flex flex-col justify-end overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#004D4C]/20 hover:-translate-y-1 decoration-transparent"
      >
        {/* Imagem de Fundo */}
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradiente de overlay inicial (sutil para o título continuar legível sobre a imagem) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 group-hover:from-[#004D4C]/95 group-hover:via-[#004D4C]/90" />

        {/* Conteúdo do Card */}
        <div className="relative z-10 p-6 md:p-8 w-full">
          {/* Título - Sempre visível */}
          <h3 className="font-display text-2xl font-semibold text-white group-hover:text-[#E8C39E] transition-colors duration-300">
            {title}
          </h3>

          {/* Container com altura colapsada que expande no hover do grupo */}
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
            <div className="overflow-hidden">
              <p className="mt-4 text-sm md:text-base leading-relaxed text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {desc}
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-white hover:text-[#E8C39E] transition-colors">
                  Saiba mais
                </span>
                <div className="size-8 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="size-4 text-[#E8C39E]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionLink>
    );
  }

  // CARD PADRÃO (Apenas texto com fundo sólido)
  return (
    <MotionLink
      href={`/servicos/${id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: (index % 2) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative h-96 bg-[#004D4C] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-[#004D4C]/20 hover:-translate-y-1 decoration-transparent"
    >
      <div>
        <h3 className="font-display text-2xl font-semibold text-[#E8C39E] group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-4 text-sm md:text-base leading-relaxed text-white/80">
          {desc}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#E8C39E] group-hover:text-white transition-colors">
          Saiba mais
        </span>
        <div className="size-8 rounded-full bg-white/5 group-hover:bg-[#E8C39E] flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
          <ArrowUpRight className="size-4 text-[#E8C39E] group-hover:text-[#004D4C] transition-colors" />
        </div>
      </div>
    </MotionLink>
  );
}
