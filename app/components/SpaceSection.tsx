"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Reveal } from "./ui/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const carouselImages = [
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
];

export function SpaceSection() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 max-h-auto bg-[#004A4A] text-white">
      <section className="flex items-center justify-center py-12 lg:py-0 px-6">
        <Carousel className="w-full max-w-[500px]">
          <CarouselContent>
            {carouselImages.map((img, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[320px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-[#004A4A]/70 text-white border-white/20 hover:bg-[#004A4A] hover:text-white" />
          <CarouselNext className="right-4 bg-[#004A4A]/70 text-white border-white/20 hover:bg-[#004A4A] hover:text-white" />
        </Carousel>
      </section>

      <section className="flex flex-col justify-center py-16 md:py-24 px-6 md:px-16 lg:px-24 border-t lg:border-t-0 lg:border-l border-white/10">
        <div className="max-w-[600px] mx-auto w-full">
          <Reveal>
            <Image
              src="/cwbranding/cwbnossolocal.png"
              alt="Foto de perfil da CWBranding"
              width={100}
              height={100}
              className="rounded-full"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="font-display text-3xl md:text-5xl text-white font-semibold leading-tight text-center lg:text-left">
              {t.spaceTitle}
            </h3>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-zinc-200 text-center lg:text-left">
              {t.spaceDescription}
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex justify-center lg:justify-start">
              <a
                href="http://wa.me/41996250984"
                className="inline-flex items-center gap-3 border border-emerald-400 rounded-full px-7 py-3 text-sm tracking-[0.2em] uppercase text-emerald-300 hover:bg-emerald-400 hover:text-[#004A4A] transition font-medium"
              >
                {t.discover} <ArrowUpRight className="size-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
