"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { contact } from "../utils/contact";

export function Header() {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { href: "/#servicos", label: t.services },
    { href: "/#sobre", label: t.about },
    { href: "/#planos", label: t.navPlans },
    { href: "/blog", label: t.navBlog },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-[#006867] to-[#004A4A] text-[color:var(--sand-soft)]">
      {/* 3 colunas: as laterais têm a mesma largura (1fr), então o logo fica sempre no centro.
          grid-rows-1: a linha fica com a altura da barra (h-16), sem crescer com o logo. */}
      <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] grid-rows-1 items-center px-6 md:px-10 text-[13px] tracking-[0.18em] uppercase">
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
          className="justify-self-start lg:hidden hover:opacity-70 transition-opacity"
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
            src="/cwbranding/cwbrandinglogo.webp"
            alt="CWBranding — agência de branding em Curitiba"
            width={200}
            height={200}
          />
        </Link>

        <div className="flex items-center justify-end gap-6">
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline hover:opacity-70 transition-opacity"
          >
            {t.contact}
          </a>
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
