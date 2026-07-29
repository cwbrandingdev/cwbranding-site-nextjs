"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { contact } from "../utils/contact";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#004d4c] text-[color:var(--sand-soft)]/70 py-16 px-6 md:px-12 text-sm">
      <div className="mx-auto max-w-[1400px] grid md:grid-cols-2 lg:grid-cols-4 gap-10">
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
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--sand-soft)]"
              >
                {t.contact}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="uppercase tracking-[0.2em] text-[color:var(--sand-soft)] mb-4">
            {t.footerContactTitle}
          </p>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#E8C39E]" />
              <div>
                <p className="whitespace-pre-line leading-relaxed">
                  {t.footerAddress}
                </p>
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-[#E8C39E] hover:text-[color:var(--sand-soft)] transition-colors"
                >
                  {t.footerViewMap}
                </a>
              </div>
            </li>

            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-[#E8C39E]" />
              <a
                href={`tel:${contact.phone}`}
                className="hover:text-[color:var(--sand-soft)] transition-colors"
              >
                {contact.phoneDisplay}
              </a>
            </li>

            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-[#E8C39E]" />
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-[color:var(--sand-soft)] transition-colors"
              >
                {contact.email}
              </a>
            </li>

            <li className="flex items-center gap-4 pt-1">
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#E8C39E] hover:text-[color:var(--sand-soft)] transition-colors"
              >
                <FaInstagram className="size-5" />
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#E8C39E] hover:text-[color:var(--sand-soft)] transition-colors"
              >
                <FaLinkedin className="size-5" />
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 lg:col-span-1">
          <div className="h-48 md:h-full min-h-[12rem] rounded-xl overflow-hidden border border-white/10">
            <iframe
              title="CWBranding location"
              src={contact.mapEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>

      <p className="mx-auto max-w-[1400px] mt-14 text-xs opacity-60">
        © {new Date().getFullYear()} CWBranding. {t.footerRights}
      </p>
    </footer>
  );
}
