import type { Metadata } from "next";
import { AboutSection } from "./components/AboutSection";
import { FaqSection } from "./components/FaqSection";
import { Hero } from "./components/Hero";
import { JsonLd } from "./components/JsonLd";
import { Marquee } from "./components/Marquee";
import { PartnersSection } from "./components/PartnerSection";
import PricingSection from "./components/PricingSection";
import { ServicesSection } from "./components/ServiceSection";
import { SpaceSection } from "./components/SpaceSection";
import { faqJsonLd, homeFaqItems } from "./utils/jsonld";
import { site } from "./utils/site";

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: site.url,
    title: site.title,
    description: site.description,
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={faqJsonLd(homeFaqItems)} />
      <Hero />
      <ServicesSection />
      <AboutSection />
      <Marquee />
      <SpaceSection />
      <PartnersSection />
      <PricingSection />
      <FaqSection />
    </div>
  );
}
