"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export function Hero() {
  const { language, setLanguage, t } = useLanguage();

  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const brandScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const brandOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.35, 0.75]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay preventivo do navegador bloqueou:", error);
      });
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-[100vh] w-full overflow-hidden bg-[var(--brand-ink)]"
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videofundo.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-deep)]/70 via-[var(--brand-ink)]/50 to-black/80 z-10 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(1200px 600px at 30% 40%, oklch(0.55 0.08 180 / 0.6), transparent 60%), radial-gradient(900px 500px at 70% 60%, oklch(0.85 0.05 75 / 0.35), transparent 70%)",
          }}
        />
      </div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black z-10 pointer-events-none"
      />

      <motion.div
        style={{ scale: brandScale, opacity: brandOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 z-20"
      >
        <div className="flex flex-col items-start max-w-[90vw] md:max-w-[75vw]">
          <h1 className="font-display font-medium text-[color:var(--sand-soft)] leading-[0.9] text-[18vw] md:text-[15vw] tracking-[-0.03em]">
            cwbranding
          </h1>
          <p className="font-display font-medium text-[color:var(--sand-soft)]/60 text-base md:text-2xl tracking-[0.3em] mt-3 pl-1 md:pl-2">
            CWB / SP / TOR
          </p>
        </div>
      </motion.div>

      <div className="absolute bottom-12 left-6 md:left-12 z-20 text-[color:var(--sand-soft)] max-w-xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="font-display text-4xl md:text-6xl leading-[1.05]"
        >
          {t.heroTitleLine1}
          <br />
          {t.heroTitleLine2}
          <br />
          {t.heroTitleLine3}
        </motion.h2>
      </div>
    </section>
  );
}
