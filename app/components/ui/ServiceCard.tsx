"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link"; // Imported Next.js Link

interface ServiceCardProps {
  id: string | number; // Added id to the props
  title: string;
  desc: string;
  index: number;
}

const MotionLink = motion.create(Link);

export function ServiceCard({ id, title, desc, index }: ServiceCardProps) {
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
      className="group relative bg-white border border-[#D5E8E8] rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-[#004A4A]/5 hover:-translate-y-1 decoration-transparent"
    >
      =
      <div>
        <h3 className="font-display text-2xl font-semibold text-[#004A4A]">
          {title}
        </h3>
        <p className="mt-4 text-sm md:text-base leading-relaxed text-[#004A4A]/80">
          {desc}
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-[#D5E8E8]/50 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#004A4A] group-hover:text-emerald-600 transition-colors">
          Saiba mais
        </span>
        <div className="size-8 rounded-full bg-[#EBF5F5] group-hover:bg-[#004A4A] flex items-center justify-center transition-all duration-300 group-hover:rotate-45">
          <ArrowUpRight className="size-4 text-[#E8C39E] group-hover:text-white transition-colors" />
        </div>
      </div>
    </MotionLink>
  );
}
