// Rastreio de visitas: o que o navegador manda para /api/track.
// Usado no navegador (Tracker.tsx) e no servidor (lib/tracking.ts).

// Cookie com o identificador anônimo do visitante. O formulário de contato
// lê esse cookie para ligar o lead às páginas que ele visitou.
export const VISITOR_COOKIE = "cw_vid";

// Formato dos identificadores criados com crypto.randomUUID().
export const ID_PATTERN = /^[a-f0-9-]{36}$/;

// De onde o visitante veio no início de uma sessão.
export type TrafficSource = {
  referrer: string; // site anterior (ex.: https://www.instagram.com/)
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

export type TrackEvent =
  // Abriu uma página. "source" só vem na primeira página de cada sessão.
  | {
      type: "view";
      visitorId: string;
      sessionId: string;
      pageViewId: string;
      path: string;
      device: "mobile" | "desktop";
      source?: TrafficSource;
    }
  // Tempo (em segundos) que a página ficou visível desde o último envio.
  | { type: "time"; visitorId: string; pageViewId: string; seconds: number };
