// Rastreio de visitas (estilo RD Station) — SOMENTE servidor.
// Cada página aberta vira um documento em "pageviews" com o visitante, a sessão,
// o horário, o tempo na página e (na 1ª página da sessão) a origem.
// O formulário de contato guarda o visitorId do lead, e assim as visitas se ligam a ele.
import "server-only";
import { FieldValue, type Timestamp } from "firebase-admin/firestore";
import { ID_PATTERN, type TrackEvent, type TrafficSource } from "@/app/utils/tracking";
import { adminDb } from "./firebase-admin";

const PAGEVIEWS = "pageviews";
const SUBMISSIONS = "contact_submissions";

// Máximo de páginas lidas no resumo, para a consulta não ficar cara demais.
const SUMMARY_LIMIT = 20000;

// ─── Validação do que chega do navegador ────────────────────────────────

const text = (value: unknown, max: number) => (typeof value === "string" ? value.slice(0, max) : "");
const isId = (value: unknown): value is string => typeof value === "string" && ID_PATTERN.test(value);

// Confere o evento recebido em /api/track. Devolve null se algo estiver errado.
export function parseTrackEvent(body: unknown): TrackEvent | null {
  const e = (body ?? {}) as Record<string, unknown>;
  if (!isId(e.visitorId) || !isId(e.pageViewId)) return null;

  if (e.type === "view") {
    const path = text(e.path, 300);
    if (!isId(e.sessionId) || !path.startsWith("/")) return null;
    const s = e.source as Record<string, unknown> | undefined;
    return {
      type: "view",
      visitorId: e.visitorId,
      sessionId: e.sessionId,
      pageViewId: e.pageViewId,
      path,
      device: e.device === "mobile" ? "mobile" : "desktop",
      source: s && {
        referrer: text(s.referrer, 300),
        utmSource: text(s.utmSource, 100),
        utmMedium: text(s.utmMedium, 100),
        utmCampaign: text(s.utmCampaign, 100),
      },
    };
  }

  if (e.type === "time") {
    const seconds = Math.round(Number(e.seconds));
    // Mais de 1 hora seguida numa página é aba esquecida aberta: ignora.
    if (!(seconds > 0 && seconds <= 3600)) return null;
    return { type: "time", visitorId: e.visitorId, pageViewId: e.pageViewId, seconds };
  }

  return null;
}

// ─── Gravação ───────────────────────────────────────────────────────────

export async function recordEvent(event: TrackEvent) {
  const ref = adminDb().collection(PAGEVIEWS).doc(event.pageViewId);

  if (event.type === "view") {
    // create: se o mesmo evento chegar duas vezes, o segundo falha e é ignorado.
    await ref.create({
      visitorId: event.visitorId,
      sessionId: event.sessionId,
      path: event.path,
      device: event.device,
      source: event.source ?? null,
      startedAt: FieldValue.serverTimestamp(),
      seconds: 0,
    });
    return;
  }

  // Tempo na página: só soma se a página for mesmo desse visitante.
  const pageView = await ref.get();
  if (pageView.get("visitorId") !== event.visitorId) return;
  await ref.update({ seconds: FieldValue.increment(event.seconds) });
}

// ─── Consultas (usadas pelos endpoints do CRM) ──────────────────────────

const toIso = (value: unknown) => (value as Timestamp | null | undefined)?.toDate().toISOString() ?? null;

// "instagram", "google / cpc", "facebook.com", "direto"...
function sourceLabel(source: TrafficSource | null) {
  if (!source) return "direto";
  if (source.utmSource) return [source.utmSource, source.utmMedium].filter(Boolean).join(" / ");
  if (!source.referrer) return "direto";
  try {
    return new URL(source.referrer).hostname.replace(/^www\./, "");
  } catch {
    return "direto";
  }
}

type PageView = {
  visitorId: string;
  sessionId: string;
  path: string;
  device: string;
  source: TrafficSource | null;
  startedAt: string | null;
  seconds: number;
};

function toPageView(data: FirebaseFirestore.DocumentData): PageView {
  return {
    visitorId: data.visitorId,
    sessionId: data.sessionId,
    path: data.path,
    device: data.device,
    source: data.source ?? null,
    startedAt: toIso(data.startedAt),
    seconds: data.seconds ?? 0,
  };
}

const sumSeconds = (views: PageView[]) => views.reduce((sum, view) => sum + view.seconds, 0);
const average = (total: number, count: number) => (count ? Math.round(total / count) : 0);

// Jornada de um lead: todas as páginas que ele visitou, agrupadas por sessão.
// Junta os aparelhos de todos os envios com o mesmo telefone (ex.: celular e computador).
// Devolve null se o lead não existir.
export async function getLeadJourney(leadId: string) {
  const db = adminDb();
  const lead = await db.collection(SUBMISSIONS).doc(leadId).get();
  if (!lead.exists) return null;

  const sameLead = await db.collection(SUBMISSIONS).where("phone", "==", lead.get("phone")).get();
  const visitorIds = [
    ...new Set(sameLead.docs.map((doc) => doc.get("visitorId")).filter((id) => isId(id))),
  ] as string[];

  const pageViews: PageView[] = [];
  for (let i = 0; i < visitorIds.length; i += 30) {
    const snap = await db.collection(PAGEVIEWS).where("visitorId", "in", visitorIds.slice(i, i + 30)).get();
    pageViews.push(...snap.docs.map((doc) => toPageView(doc.data())));
  }
  pageViews.sort((a, b) => (a.startedAt ?? "").localeCompare(b.startedAt ?? ""));

  // Agrupa as páginas por sessão (cada vez que a pessoa entrou no site).
  const sessions = new Map<string, PageView[]>();
  for (const view of pageViews) {
    sessions.set(view.sessionId, [...(sessions.get(view.sessionId) ?? []), view]);
  }

  const first = pageViews[0];
  return {
    leadId,
    // false = a pessoa recusou os cookies (ou mandou o formulário antes do rastreio existir).
    tracked: pageViews.length > 0,
    firstVisitAt: first?.startedAt ?? null,
    lastVisitAt: pageViews.at(-1)?.startedAt ?? null,
    firstSource: first ? sourceLabel(first.source) : null,
    landingPage: first?.path ?? null,
    devices: [...new Set(pageViews.map((view) => view.device))],
    totals: {
      sessions: sessions.size,
      pageViews: pageViews.length,
      seconds: sumSeconds(pageViews),
    },
    sessions: [...sessions.values()].map((views) => ({
      startedAt: views[0].startedAt,
      source: sourceLabel(views[0].source),
      device: views[0].device,
      seconds: sumSeconds(views),
      pages: views.map(({ path, startedAt, seconds }) => ({ path, startedAt, seconds })),
    })),
  };
}

// Resumo de todos os visitantes (leads e anônimos) num período.
export async function getSummary(from: Date, to: Date) {
  const db = adminDb();
  const [snap, leads] = await Promise.all([
    db
      .collection(PAGEVIEWS)
      .where("startedAt", ">=", from)
      .where("startedAt", "<", to)
      .limit(SUMMARY_LIMIT)
      .get(),
    db.collection(SUBMISSIONS).where("createdAt", ">=", from).where("createdAt", "<", to).count().get(),
  ]);
  const pageViews = snap.docs.map((doc) => toPageView(doc.data()));

  const visitors = new Set(pageViews.map((view) => view.visitorId)).size;
  const sessions = new Set(pageViews.map((view) => view.sessionId)).size;
  const seconds = sumSeconds(pageViews);
  const leadCount = leads.data().count;

  const pages = new Map<string, { views: number; seconds: number }>();
  const sources = new Map<string, number>();
  for (const view of pageViews) {
    const page = pages.get(view.path) ?? { views: 0, seconds: 0 };
    pages.set(view.path, { views: page.views + 1, seconds: page.seconds + view.seconds });
    // A origem vem só na primeira página de cada sessão.
    if (view.source) {
      const label = sourceLabel(view.source);
      sources.set(label, (sources.get(label) ?? 0) + 1);
    }
  }

  return {
    from: from.toISOString(),
    to: to.toISOString(),
    // true = o período tem mais páginas que o limite e os números são parciais.
    truncated: pageViews.length === SUMMARY_LIMIT,
    visitors,
    sessions,
    pageViews: pageViews.length,
    leads: leadCount,
    conversionRate: visitors ? Number((leadCount / visitors).toFixed(4)) : 0,
    avgSecondsPerSession: average(seconds, sessions),
    avgSecondsPerPage: average(seconds, pageViews.length),
    topPages: [...pages.entries()]
      .map(([path, page]) => ({ path, views: page.views, avgSeconds: average(page.seconds, page.views) }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 20),
    sources: [...sources.entries()]
      .map(([source, count]) => ({ source, sessions: count }))
      .sort((a, b) => b.sessions - a.sessions),
  };
}
