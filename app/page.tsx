"use client";

import { AboutSection } from "./components/AboutSection";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { PartnersSection } from "./components/PartnerSection";
import PricingSection from "./components/PricingSection";
import { ServicesSection } from "./components/ServiceSection";
import { SpaceSection } from "./components/SpaceSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />
      <ServicesSection />
      <AboutSection />
      <Marquee />
      <SpaceSection />
      <PartnersSection />
      <PricingSection />
    </div>
  );
}
