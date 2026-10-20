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
            src="/cwbranding/cwbrandinglogo.webp"
            alt="CWBranding — agência de branding em Curitiba"
            width={200}
            height={200}
          />
        </Link>

        {/* min-w-6: no celular fica do tamanho do botão de menu, para o logo continuar no centro. */}
        <div className="flex min-w-6 items-center justify-end gap-6">
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
