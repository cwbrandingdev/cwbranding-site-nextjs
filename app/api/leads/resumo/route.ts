// Resumo de todos os visitantes do site (leads e anônimos) num período.
// GET /api/leads/resumo?desde=2026-10-01&ate=2026-10-31   (padrão: últimos 30 dias)
// Cabeçalho obrigatório: Authorization: Bearer <CRM_API_KEY>
import { isAuthorized } from "@/lib/crm-auth";
import { getSummary } from "@/lib/tracking";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 24 * 60 * 60 * 1000;

// "2026-10-01" -> meia-noite desse dia no horário de Brasília.
const startOfDay = (date: string) => new Date(`${date}T00:00:00-03:00`);

export async function GET(request: Request) {
  if (!isAuthorized(request)) return Response.json({ error: "Não autorizado" }, { status: 401 });

  const params = new URL(request.url).searchParams;
  const desde = params.get("desde") ?? "";
  const ate = params.get("ate") ?? "";
  if ((desde && !DATE_PATTERN.test(desde)) || (ate && !DATE_PATTERN.test(ate))) {
    return Response.json({ error: "Use datas no formato AAAA-MM-DD" }, { status: 400 });
  }

  // "ate" inclui o dia inteiro: vai até a meia-noite do dia seguinte.
  const to = ate ? new Date(startOfDay(ate).getTime() + DAY_MS) : new Date();
  const from = desde ? startOfDay(desde) : new Date(to.getTime() - 30 * DAY_MS);

  try {
    return Response.json(await getSummary(from, to));
  } catch (error) {
    console.error("[tracking] falha ao montar resumo:", error);
    return Response.json({ error: "Erro ao buscar o resumo" }, { status: 500 });
  }
}
