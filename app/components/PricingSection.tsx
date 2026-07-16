"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function PricingSection() {
  const { t, language } = useLanguage();

  // Obtém a lista de planos traduzida do contexto
  const plans = t.plans || [];

  return (
    <section className="bg-[#EBF5F5] text-[var(--brand-ink)] py-10 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display tracking-tight">
            <span className="text-[#004d4c] italic">{t.pricingTitleLine1}</span>{" "}
            {t.pricingTitleLine2}
          </h2>
          <p className="mt-4 text-sm uppercase tracking-widest opacity-80 max-w-md mx-auto">
            {t.pricingSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-[#D5E8E8] border border-[var(--brand-ink)]/10 p-8 md:p-10 transition-all duration-300 hover:border-[var(--brand)]/30 flex flex-col justify-between ${
                plan.popular ? "shadow-lg shadow-[var(--brand-ink)]/5" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-8 bg-[#004d4c] text-[var(--sand-soft)] text-[10px] uppercase tracking-widest px-3 py-1 font-semibold rounded-full">
                  {t.pricingPopularTag}
                </span>
              )}

              <div>
                <span className="text-xs uppercase tracking-widest text-[#004d4c] font-medium">
                  {plan.tagline}
                </span>
                <h3 className="text-3xl font-display mt-1 mb-4">
                  {plan.title}
                </h3>

                <p className="text-sm leading-relaxed opacity-90 mb-8 font-light">
                  {plan.description}
                </p>

                <hr className="border-[var(--brand-ink)]/10 my-6" />

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-xs uppercase tracking-wider"
                    >
                      <span className="inline-block w-1.5 h-1.5 bg-[#004d4c] rotate-45 mr-3 mt-1 flex-shrink-0" />
                      <span className="opacity-80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider opacity-60">
                    {t.pricingInvestment}
                  </span>
                  <div className="flex items-baseline mt-1">
                    <span className="text-lg font-light font-display">
                      {language === "PT" ? "R$ " : "$ "}
                    </span>
                    <span className="text-4xl md:text-5xl font-display tracking-tight text-[#004d4c]">
                      {plan.price}
                    </span>
                    <span className="text-xs opacity-60 ml-2">
                      {t.pricingPeriod}
                    </span>
                  </div>
                </div>

                <a
                  href="http://wa.me/41996250984"
                  className={`w-full py-4 text-center block text-xs uppercase tracking-widest transition-all duration-300 border ${
                    plan.popular
                      ? "bg-[#004d4c] text-[var(--sand-soft)] hover:bg-white hover:text-[#004d4c]"
                      : "border-[var(--brand-ink)] text-[var(--brand-ink)] hover:bg-[var(--brand-ink)] hover:text-[var(--sand-soft)]"
                  }`}
                >
                  {t.pricingButton}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
