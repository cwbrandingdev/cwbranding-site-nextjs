"use client";

import { useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLanguageChange = (lang: "PT" | "EN") => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-[#006867] to-[#004A4A] text-[color:var(--sand-soft)]">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:px-10 text-[13px] tracking-[0.18em] uppercase">
        <nav className="hidden md:flex items-center gap-10">
          <a href="#servicos" className="hover:opacity-70 transition-opacity">
            {t.services}
          </a>
          <a href="#sobre" className="hover:opacity-70 transition-opacity">
            {t.about}
          </a>
        </nav>

        <button
          className="md:hidden hover:opacity-70 transition-opacity"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        <a
          href="#"
          className="font-display text-2xl tracking-[0.35em] font-medium"
        >
          <Image
            src="/cwbrandinglogo.png"
            alt="Logo da CWBRanding"
            width={200}
            height={200}
          />{" "}
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

      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-[#004A4A] md:hidden transition-all duration-300 ease-in-out border-t border-white/5">
          <nav className="flex flex-col p-6 gap-6 text-[14px] tracking-[0.18em] uppercase">
            <a
              href="#servicos"
              onClick={toggleMenu}
              className="py-2 border-b border-white/5 hover:opacity-70 transition-opacity"
            >
              {t.services}
            </a>
            <a
              href="#sobre"
              onClick={toggleMenu}
              className="py-2 border-b border-white/5 hover:opacity-70 transition-opacity"
            >
              {t.about}
            </a>
            <a
              href="https://wa.me/41996250984"
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMenu}
              className="py-2 border-b border-white/5 hover:opacity-70 transition-opacity"
            >
              {t.contact}
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
