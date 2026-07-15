"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  desc: string;
  index: number;
}

export function ServiceCard({ title, desc, index }: ServiceCardProps) {
  return (
    <motion.a
      href="#"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: (index % 4) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative bg-card border border-border rounded-sm overflow-hidden flex flex-col"
    >
      <div className="aspect-[4/5] bg-green-200/60 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-[var(--brand-deep)]/50 text-[10px] tracking-[0.3em] uppercase">
          [ Imagem ]
        </div>
        <div className="absolute inset-0 bg-[var(--brand-deep)]/0 group-hover:bg-[var(--brand-deep)]/20 transition-colors duration-500" />
      </div>
      <div className="p-6 flex-1 flex flex-col bg-green-200/60">
        <h3 className="font-display text-2xl text-[var(--brand-ink)]">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground line-clamp-4">
          {desc}
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#004D4C] group-hover:gap-3 transition-all">
          Saiba mais <ArrowUpRight className="size-3.5 text-[#004D4C]" />
        </span>
      </div>
    </motion.a>
  );
}
