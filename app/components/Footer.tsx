"use client";

import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#004d4c] text-[color:var(--sand-soft)]/70 py-16 px-6 md:px-12 text-sm">
      <div className="mx-auto max-w-[1400px] grid md:grid-cols-3 gap-10">
        <div>
          <p className="font-display text-2xl tracking-[0.3em] text-[color:var(--sand-soft)]">
            CWBRANDING<sup className="text-[10px]">®</sup>
          </p>
          <p className="mt-4 max-w-sm leading-relaxed">{t.footerDescription}</p>
        </div>
        <div>
          <p className="uppercase tracking-[0.2em] text-[color:var(--sand-soft)] mb-3">
            {t.footerNavTitle}
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href="#servicos"
                className="hover:text-[color:var(--sand-soft)]"
              >
                {t.services}
              </a>
            </li>
            <li>
              <a href="#sobre" className="hover:text-[color:var(--sand-soft)]">
                {t.about}
              </a>
            </li>
            <li>
              <a
                href="http://wa.me/41996250984"
                className="hover:text-[color:var(--sand-soft)]"
              >
                {t.contact}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="uppercase tracking-[0.2em] text-[color:var(--sand-soft)] mb-3">
            {t.footerContactTitle}
          </p>
          <p>WhatsApp: (41) 99625-0984</p>
          <p className="mt-2">Curitiba — Paraná, Brasil</p>
        </div>
      </div>
      <p className="mt-14 text-xs opacity-60">
        © {new Date().getFullYear()} CWBranding. {t.footerRights}
      </p>
    </footer>
  );
}
