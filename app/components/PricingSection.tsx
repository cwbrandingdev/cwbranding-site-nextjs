"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function PricingSection() {
  const { t, language } = useLanguage();

  const plans = t.plans || [];
  const plansSdr = t.plansSdr || [];

  return (
    <section className="bg-[#EBF5F5] py-16 px-6 md:px-12">
      {/* SECTION 1: Standard Plans */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display tracking-tight text-[#004d4c]">
            <span className="italic">{t.pricingTitleLine1}</span>{" "}
            {t.pricingTitleLine2}
          </h2>

          <p className="mt-4 text-sm uppercase tracking-widest opacity-80 max-w-md mx-auto">
            {t.pricingSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative bg-[#D5E8E8] p-8 md:p-10 transition-all duration-300 shadow-lg shadow-[var(--brand-ink)]/5 ring-2 ring-[#E8C39E] border border-[#E8C39E] flex flex-col justify-between"
            >
              {plan.popular && (
                <span className="absolute -top-3 right-8 bg-[#E8C39E] text-[#004d4c] text-[10px] uppercase tracking-widest px-3 py-1 font-semibold rounded-full shadow-sm">
                  {t.pricingPopularTag}
                </span>
              )}

              <div>
                <span className="text-xs uppercase tracking-widest text-[#004d4c] font-medium">
                  {plan.tagline}
                </span>

                <h3 className="text-3xl font-display mt-1 mb-4 text-[#004d4c]">
                  {plan.title}
                </h3>

                <p className="text-sm leading-relaxed opacity-90 mb-8 font-light text-[var(--brand-ink)]">
                  {plan.description}
                </p>

                <hr className="border-[var(--brand-ink)]/10 my-6" />

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-xs uppercase tracking-wider text-[var(--brand-ink)]"
                    >
                      <span className="inline-block w-1.5 h-1.5 bg-[#E8C39E] rotate-45 mr-3 mt-1.5 flex-shrink-0" />
                      <span className="opacity-80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider opacity-60 text-[var(--brand-ink)]">
                    {t.pricingInvestment}
                  </span>

                  <div className="flex items-baseline mt-1">
                    <span className="text-lg font-light font-display text-[var(--brand-ink)]">
                      {language === "PT" ? "R$ " : "$ "}
                    </span>

                    <span className="text-4xl md:text-5xl font-display tracking-tight text-[#004d4c]">
                      {plan.price}
                    </span>

                    <span className="text-xs opacity-60 ml-2 text-[var(--brand-ink)]">
                      {t.pricingPeriod}
                    </span>
                  </div>
                </div>

                <a
                  href="http://wa.me/41996250984"
                  className={`w-full py-4 text-center block text-xs uppercase tracking-widest transition-all duration-300 border ${
                    plan.popular
                      ? "bg-[#E8C39E] text-[#004d4c] font-semibold border-[#E8C39E] hover:bg-[#004d4c] hover:text-white hover:border-[#004d4c]"
                      : "border-[var(--brand-ink)] text-[var(--brand-ink)] border-[#E8C39E] border-1x' hover:bg-[var(--brand-ink)] hover:text-[var(--sand-soft)]"
                  }`}
                >
                  {t.pricingButton}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: SDR Plans */}
      <div className="pt-16 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display tracking-tight text-[#004d4c]">
            <span className="italic">{t.pricingSdrTitleLine1}</span>{" "}
            {t.pricingSdrTitleLine2}
          </h2>

          <p className="mt-4 text-sm uppercase tracking-widest opacity-80 max-w-md mx-auto">
            {t.pricingSdrSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {plansSdr.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-[#D5E8E8] border border-[#E8C39E] ring-2 ring-[#E8C39E] p-8 md:p-10 transition-all duration-300 flex flex-col justify-between ${
                plan.popular ? "shadow-lg shadow-[var(--brand-ink)]/5" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 right-8 bg-[#E8C39E] text-[#004d4c] text-[10px] uppercase tracking-widest px-3 py-1 font-semibold rounded-full shadow-sm">
                  {t.pricingSdrPopularTag}
                </span>
              )}

              <div>
                <span className="text-xs uppercase tracking-widest text-[#004d4c] font-medium">
                  {plan.tagline}
                </span>

                <h3 className="text-3xl font-display mt-1 mb-4 text-[#004d4c]">
                  {plan.title}
                </h3>

                <p className="text-sm leading-relaxed opacity-90 mb-8 font-light text-[var(--brand-ink)]">
                  {plan.description}
                </p>

                <hr className="border-[var(--brand-ink)]/10 my-6" />

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start text-xs uppercase tracking-wider text-[var(--brand-ink)]"
                    >
                      <span className="inline-block w-1.5 h-1.5 bg-[#E8C39E] rotate-45 mr-3 mt-1.5 flex-shrink-0" />
                      <span className="opacity-80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="mb-6">
                  <span className="text-xs uppercase tracking-wider opacity-60 text-[var(--brand-ink)]">
                    {t.pricingSdrInvestment}
                  </span>

                  <div className="flex items-baseline mt-1">
                    <span className="text-lg font-light font-display text-[var(--brand-ink)]">
                      {language === "PT" ? "R$ " : "$ "}
                    </span>

                    <span className="text-4xl md:text-5xl font-display tracking-tight text-[#004d4c]">
                      {plan.price}
                    </span>

                    <span className="text-xs opacity-60 ml-2 text-[var(--brand-ink)]">
                      {t.pricingSdrPeriod}
                    </span>
                  </div>
                </div>

                <a
                  href="http://wa.me/41996250984"
                  className={`w-full py-4 text-center block text-xs uppercase tracking-widest transition-all duration-300 border ${
                    plan.popular
                      ? "bg-[#E8C39E] text-[#004d4c] font-semibold border-[#E8C39E] hover:bg-[#004d4c] hover:text-white hover:border-[#004d4c]"
                      : "border-[var(--brand-ink)] text-[var(--brand-ink)] hover:bg-[var(--brand-ink)] hover:text-[var(--sand-soft)]"
                  }`}
                >
                  {t.pricingSdrButton}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
