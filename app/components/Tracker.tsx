"use client";

// Rastreio de visitas (estilo RD Station) + aviso de cookies.
// Só rastreia depois que o visitante clica em "Aceitar" (LGPD).
// Cada página aberta e o tempo que ela ficou visível vão para /api/track.
import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "../context/LanguageContext";
import { VISITOR_COOKIE, type TrackEvent } from "../utils/tracking";

const CONSENT_KEY = "cw_consent";
const SESSION_KEY = "cw_sid";

type Consent = "yes" | "no" | null; // null = ainda não respondeu

// ─── Consentimento (guardado no localStorage) ───────────────────────────

const listeners = new Set<() => void>();
let memoryConsent: Consent = null; // reserva para navegadores que bloqueiam o localStorage

function readConsent(): Consent {
  try {
    return (localStorage.getItem(CONSENT_KEY) as Consent) ?? memoryConsent;
  } catch {
    return memoryConsent;
  }
}

function saveConsent(value: "yes" | "no") {
  memoryConsent = value;
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {}
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// ─── Identificadores ────────────────────────────────────────────────────

// Visitante: cookie de 1 ano (o formulário de contato também lê esse cookie).
function getVisitorId() {
  const saved = document.cookie.match(new RegExp(`${VISITOR_COOKIE}=([^;]+)`))?.[1];
  const id = saved ?? crypto.randomUUID();
  document.cookie = `${VISITOR_COOKIE}=${id}; Max-Age=31536000; Path=/; SameSite=Lax`;
  return id;
}

// Sessão: dura enquanto a aba estiver aberta.
function getSession() {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) return { sessionId: saved, isNew: false };
    const id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
    return { sessionId: id, isNew: true };
  } catch {
    return { sessionId: crypto.randomUUID(), isNew: true };
  }
}

// De onde a pessoa veio: site anterior e parâmetros utm_ do link.
function readSource() {
  const params = new URLSearchParams(window.location.search);
  // Navegação dentro do próprio site não conta como origem.
  const referrer = document.referrer.startsWith(window.location.origin) ? "" : document.referrer;
  return {
    referrer,
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
  };
}

// sendBeacon continua enviando mesmo quando a pessoa fecha a aba.
function send(event: TrackEvent) {
  // No "npm run dev" não grava: o Firestore é o mesmo do site publicado.
  if (process.env.NODE_ENV !== "production") return;
  const body = JSON.stringify(event);
  if (navigator.sendBeacon?.("/api/track", new Blob([body], { type: "application/json" }))) return;
  fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(
    () => {},
  );
}

// ─── Componente ─────────────────────────────────────────────────────────

export function Tracker() {
  const { t } = useLanguage();
  const pathname = usePathname();
  // No servidor ainda não dá para saber a resposta: "no" esconde o aviso até carregar.
  const consent = useSyncExternalStore(subscribe, readConsent, () => "no" as Consent);

  // A cada página: registra a visita e, ao sair, quanto tempo ela ficou visível.
  useEffect(() => {
    if (consent !== "yes") return;

    const visitorId = getVisitorId();
    const { sessionId, isNew } = getSession();
    const pageViewId = crypto.randomUUID();
    send({
      type: "view",
      visitorId,
      sessionId,
      pageViewId,
      path: pathname,
      device: window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop",
      source: isNew ? readSource() : undefined,
    });

    // Conta só o tempo com a aba visível (aba em segundo plano não é leitura).
    let visibleSince: number | null = document.visibilityState === "visible" ? Date.now() : null;

    function flush() {
      if (visibleSince === null) return;
      const seconds = Math.round((Date.now() - visibleSince) / 1000);
      visibleSince = null;
      if (seconds > 0) send({ type: "time", visitorId, pageViewId, seconds });
    }

    function handleVisibility() {
      if (document.visibilityState === "hidden") flush();
      else visibleSince = Date.now();
    }

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("pagehide", flush);
    return () => {
      flush(); // trocou de página dentro do site
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("pagehide", flush);
    };
  }, [pathname, consent]);

  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label={t.cookieTitle}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-xl flex-col gap-4 rounded-2xl bg-[#004D4C] p-5 text-white shadow-2xl sm:w-fit sm:max-w-3xl sm:flex-row sm:items-center sm:gap-8 sm:py-3 sm:pl-6 sm:pr-3"
    >
      <p className="text-sm leading-relaxed text-white/85">{t.cookieText}</p>
      <div className="flex shrink-0 justify-end gap-2">
        <button
          type="button"
          onClick={() => saveConsent("no")}
          className="rounded-full px-5 py-2 text-sm text-white/70 transition-colors hover:text-white"
        >
          {t.cookieDecline}
        </button>
        <button
          type="button"
          onClick={() => saveConsent("yes")}
          className="rounded-full bg-[#E8C39E] px-5 py-2 text-sm font-semibold text-[#004D4C] transition-colors hover:bg-white"
        >
          {t.cookieAccept}
        </button>
      </div>
    </div>
  );
}
