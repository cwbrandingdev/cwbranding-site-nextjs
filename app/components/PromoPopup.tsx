"use client";

// Black November (plano Escala com 40% OFF): tudo da promoção fica neste arquivo.
// - PromoPopup: pop-up na home.
// - PromoBar: faixa abaixo do menu, em todas as páginas.
// - PromoPricingBanner: banner de borda a borda abaixo dos cards de preço.
//
// O pop-up abre 1,2s depois de a página carregar, uma vez por visita (fecha e não volta até
// a pessoa abrir o site de novo em outra aba/sessão). Arte larga no computador e
// vertical (1080x1350) no celular.
//
// Para encerrar a promoção:
// 1. Apague <PromoPopup /> em app/page.tsx, <PromoBar /> em app/layout.tsx,
//    <PromoPricingBanner /> em components/PricingSection.tsx, este arquivo
//    e a pasta public/promocoes/black-november/ (artes do banner).
// 2. No plano Escala (translations.ts), volte price para "7.999" e apague oldPrice e promo.
// 3. Tire a menção à Black November do FAQ "Quanto custa..." e do public/llms.txt.
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { contact } from "../utils/contact";

const WHATSAPP_MESSAGE =
  "Olá! Quero o Plano Escala da Black November com 40% OFF.";
export const PROMO_WHATSAPP = `${contact.whatsapp}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// Guarda que o pop-up já apareceu nesta visita.
const SEEN_KEY = "cw_promo_seen";

// Mesma curva de movimento das outras animações do site (ver ui/Reveal.tsx).
const EASE = [0.22, 1, 0.36, 1] as const;

// Arte da promoção: larga no computador, vertical no celular (o navegador baixa só uma).
function BannerPicture() {
  return (
    <picture>
      <source
        media="(min-width: 768px)"
        srcSet="/promocoes/black-november/banner-desktop.webp"
        width={1920}
        height={400}
      />
      <img
        src="/promocoes/black-november/banner-mobile.webp"
        alt="Black November: Plano Escala com 40% OFF, de R$ 7.999 por R$ 4.799 por mês"
        width={1080}
        height={1350}
        className="block h-auto w-full"
      />
    </picture>
  );
}

function alreadySeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {}
}

export function PromoPopup() {
  const [open, setOpen] = useState(false);

  // Abre 1,2s depois de carregar, só se ainda não apareceu nesta visita.
  useEffect(() => {
    if (alreadySeen()) return;
    const timer = setTimeout(() => {
      setOpen(true);
      markSeen();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Esc fecha.
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) =>
      event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        // Fundo escurecido: clicar fora do banner fecha.
        <motion.div
          key="promo-popup"
          role="dialog"
          aria-modal="true"
          aria-label="Promoção Black November"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            onClick={(event) => event.stopPropagation()}
            // Celular: largura limitada também pela altura, para a arte vertical caber com os botões.
            className="relative w-full max-w-[min(24rem,52vh)] md:max-w-6xl"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <a
              href={PROMO_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-2xl shadow-2xl ring-1 ring-[#E8C39E]/40"
            >
              <BannerPicture />
            </a>

            <div className="mt-5 flex items-center justify-center gap-3">
              <a
                href={PROMO_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#E8C39E] px-7 py-3 text-sm font-semibold text-[#004D4C] transition-colors hover:bg-white"
              >
                Quero aproveitar <ArrowRight className="size-4" />
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full px-5 py-3 text-sm text-white/80 transition-colors hover:text-white"
              >
                Agora não
              </button>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="absolute -right-3 -top-3 flex size-9 items-center justify-center rounded-full bg-white text-[#004D4C] shadow-lg transition-transform hover:scale-110"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Faixa fina logo abaixo do menu fixo (h-16), com a oferta e o link para o WhatsApp.
// Funciona também no celular, com um texto mais curto.
export function PromoBar() {
  const [closed, setClosed] = useState(false);
  if (closed) return null;

  return (
    <>
      {/* Reserva a altura da faixa (h-11) para ela não cobrir o começo das páginas. */}
      <div aria-hidden className="h-11" />
      <motion.div
        className="fixed inset-x-0 top-16 z-40 overflow-hidden border-b border-[#E8C39E]/30 bg-[#032826] text-white shadow-lg"
        initial={{ y: -48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
      >
        <div className="mx-auto flex h-11 min-w-0 max-w-[1600px] items-center justify-center gap-2 px-8 text-xs sm:gap-3 md:gap-5 md:px-10 md:text-sm">
          <span className="shrink-0 rounded-full bg-[#E8C39E] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#004D4C] md:text-[11px]">
            Black November
          </span>
          <span className="min-w-0 truncate">
            <span className="hidden md:inline">Plano Escala com </span>
            <strong className="text-[#E8C39E]">40% OFF</strong>
            <span className="hidden sm:inline">
              {" "}
              · de <span className="line-through opacity-60">
                R$ 7.999
              </span> por <strong>R$ 4.799/mês</strong>
            </span>
          </span>
          <a
            href={PROMO_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 font-semibold text-[#E8C39E] underline-offset-4 hover:underline"
          >
            <span className="sm:hidden">Aproveitar</span>
            <span className="hidden sm:inline">Quero aproveitar</span>
            <ArrowRight className="size-3.5" />
          </a>
        </div>
        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="Fechar"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="size-4" />
        </button>
      </motion.div>
    </>
  );
}

// Banner de borda a borda, encostado na seção de contato.
export function PromoPricingBanner() {
  return (
    <div className="overflow-x-clip">
      <motion.a
        href={PROMO_WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto block max-w-sm overflow-hidden md:max-w-none"
        // Ao entrar na tela: aparece aos poucos...
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: EASE }}
      >
        {/* ...e a arte "assenta" com um leve zoom. */}
        <motion.div
          initial={{ scale: 1.06 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <BannerPicture />
        </motion.div>
      </motion.a>
    </div>
  );
}
