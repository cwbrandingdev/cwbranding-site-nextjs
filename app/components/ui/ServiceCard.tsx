"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  id: string | number;
  title: string;
  desc: string;
  index: number;
}

const MotionLink = motion.create(Link);

export function ServiceCard({ id, title, desc, index }: ServiceCardProps) {
  const imageUrl = `https://picsum.photos/id/${Number(id) * 10 + 10}/600/450`;

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
      className="group relative h-96 border border-white/10 rounded-2xl flex flex-col justify-end overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#004D4C]/20 hover:-translate-y-1 decoration-transparent"
    >
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 group-hover:from-[#004D4C]/95 group-hover:via-[#004D4C]/90" />

      <div className="relative z-10 p-6 md:p-8 w-full">
        <h3 className="font-display text-2xl font-semibold text-white group-hover:text-[#E8C39E] transition-colors duration-300">
          {title}
        </h3>

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
