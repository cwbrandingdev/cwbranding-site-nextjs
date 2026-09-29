"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { contact } from "../utils/contact";

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

  const navItems = [
    { href: "/#servicos", label: t.services },
    { href: "/#sobre", label: t.about },
    { href: "/#planos", label: t.navPlans },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-[#006867] to-[#004A4A] text-[color:var(--sand-soft)]">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:px-10 text-[13px] tracking-[0.18em] uppercase">
        <nav
          className="hidden lg:flex items-center gap-8"
          aria-label="Principal"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:opacity-70 transition-opacity"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="lg:hidden hover:opacity-70 transition-opacity"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

        <Link
          href="/"
          className="font-display text-2xl tracking-[0.35em] font-medium"
        >
          <Image
            src="/cwbranding/cwbrandinglogo.png"
            alt="CWBranding — agência de branding em Curitiba"
            width={200}
            height={200}
          />
        </Link>

        <div className="flex items-center gap-6">
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline hover:opacity-70 transition-opacity"
          >
            {t.contact}
          </a>

          <div className="relative">
            <button
              type="button"
              onClick={toggleDropdown}
              className="flex items-center gap-2 text-[11px] hover:opacity-70 transition-opacity focus:outline-none"
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <span>{language === "PT" ? "🇧🇷 BRASIL" : "🇨🇦 CANADA"}</span>
              <ChevronDown
                className={`size-3 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg bg-[#004A4A] border border-white/10 shadow-xl overflow-hidden py-1">
                <button
                  type="button"
                  onClick={() => handleLanguageChange("PT")}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center gap-3 text-[11px]"
                >
                  <span className="text-base">🇧🇷</span> Português
                </button>
                <button
                  type="button"
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
        <div className="fixed inset-0 top-16 z-40 bg-[#004A4A] lg:hidden transition-all duration-300 ease-in-out border-t border-white/5">
          <nav
            className="flex flex-col p-6 gap-6 text-[14px] tracking-[0.18em] uppercase"
            aria-label="Mobile"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={toggleMenu}
                className="py-2 border-b border-white/5 hover:opacity-70 transition-opacity"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={contact.whatsapp}
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
    </header>
  );
}
