"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./ui/Reveal";

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="sobre"
      className="relative bg-[#004D4C] py-28 md:py-40 px-6 md:px-12 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6">
          <Reveal>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              <span className="italic opacity-80 text-white">
                {t.aboutTitleLine1}
              </span>
              <br />
              <span className="text-white">{t.aboutTitleLine2}</span>
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-6 space-y-6 text-lg md:text-xl leading-relaxed text-white">
          <Reveal delay={0.1}>
            <p>{t.aboutParagraph1}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="opacity-85">{t.aboutParagraph2}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <button className="inline-flex bg-white text-[#004D4C] items-center gap-3 mt-6 border border-[color:var(--sand-soft)]/60 rounded-full px-7 py-3 text-sm tracking-[0.2em] uppercase hover:bg-[color:var(--sand-soft)] hover:text-[#004D4C] transition">
              <a
                href="http://wa.me/41996250984"
                className="inline-flex items-center gap-3"
              >
                {t.contact} <ArrowUpRight className="size-4" />
              </a>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
