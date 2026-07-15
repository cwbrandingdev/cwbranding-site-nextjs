"use client";

import { Menu, Search } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-gradient-to-b from-[#006867] to-[#004A4A] text-[color:var(--sand-soft)]">
      {" "}
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:px-10 text-[13px] tracking-[0.18em] uppercase">
        <nav className="hidden md:flex items-center gap-10">
          <a href="#servicos" className="hover:opacity-70 transition-opacity">
            Serviços
          </a>
          <a href="#sobre" className="hover:opacity-70 transition-opacity">
            Sobre Nós
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
            href="http://wa.me/41996250984"
            className="hidden md:inline hover:opacity-70 transition-opacity"
          >
            Fale com a gente
          </a>
          <button aria-label="Buscar" className="hover:opacity-70">
            <Search className="size-4" />
          </button>
          <span className="hidden md:inline text-[11px]">BRASIL ▾</span>
        </div>
      </div>
    </header>
  );
}
