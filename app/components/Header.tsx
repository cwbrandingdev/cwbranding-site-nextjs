"use client";

import { useState } from "react";
import { Menu, Search, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLanguageChange = (lang: "PT" | "EN") => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-[#006867] to-[#004A4A] text-[color:var(--sand-soft)]">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:px-10 text-[13px] tracking-[0.18em] uppercase">
        <nav className="hidden md:flex items-center gap-10">
          <a href="#servicos" className="hover:opacity-70 transition-opacity">
            {t.services}
          </a>
          <a href="#sobre" className="hover:opacity-70 transition-opacity">
            {t.about}
          </a>
        </nav>

        <button className="md:hidden" aria-label="Menu">
          <Menu />
        </button>

        <a
          href="#"
          className="font-display text-2xl tracking-[0.35em] font-medium"
        >
          CWBRANDING<sup className="text-[10px] tracking-normal">®</sup>
        </a>

        <div className="flex items-center gap-6">
          <a
            href="https://wa.me/41996250984"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline hover:opacity-70 transition-opacity"
          >
            {t.contact}
          </a>

          <button aria-label="Buscar" className="hover:opacity-70">
            <Search className="size-4" />
          </button>

          {/* Seletor de Idioma Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-2 text-[11px] hover:opacity-70 transition-opacity focus:outline-none"
            >
              <span>{language === "PT" ? "🇧🇷 BRASIL" : "🇨🇦 CANADA"}</span>
              <ChevronDown
                className={`size-3 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg bg-[#004A4A] border border-white/10 shadow-xl overflow-hidden py-1">
                <button
                  onClick={() => handleLanguageChange("PT")}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 text-[11px]"
                >
                  <span className="text-base">🇧🇷</span> Português
                </button>
                <button
                  onClick={() => handleLanguageChange("EN")}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 text-[11px]"
                >
                  <span className="text-base">🇨🇦</span> English
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
