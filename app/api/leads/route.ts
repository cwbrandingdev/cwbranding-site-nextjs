// Leads do formulário de contato para o CRM.
// GET /api/leads                          -> os 100 leads mais antigos
// GET /api/leads?desde=<createdAt>        -> só os que chegaram depois dessa data (ISO)
// Cabeçalho obrigatório: Authorization: Bearer <CRM_API_KEY>
//
// Para buscar só os novos, o CRM guarda o "next" da resposta e manda como ?desde= na próxima vez.
// O mesmo lead pode vir duas vezes nessa troca: use o "id" para não duplicar.
import { createHash, timingSafeEqual } from "node:crypto";
import { Timestamp } from "firebase-admin/firestore";
import { toSubmission } from "@/app/admin/submissions";
import { adminDb } from "@/lib/firebase-admin";

const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 500;

// Compara os hashes para não vazar a chave pelo tempo de resposta.
function isAuthorized(request: Request) {
  const key = process.env.CRM_API_KEY;
  const sent = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!key || !sent) return false;
  const hash = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(hash(key), hash(sent));
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) return Response.json({ error: "Não autorizado" }, { status: 401 });

  const params = new URL(request.url).searchParams;
  const desde = params.get("desde");
  const since = desde ? new Date(desde) : null;
  if (since && isNaN(since.getTime())) {
    return Response.json({ error: "Use ?desde= com uma data ISO, ex.: 2026-10-28T13:00:00.000Z" }, { status: 400 });
  }
  const limit = Math.min(Number(params.get("limit")) || DEFAULT_LIMIT, MAX_LIMIT);

  try {
    let query = adminDb().collection("contact_submissions").orderBy("createdAt", "asc");
    if (since) query = query.where("createdAt", ">", Timestamp.fromDate(since));
    const snap = await query.limit(limit).get();

    const leads = snap.docs.map(toSubmission);
    return Response.json({
      leads,
      // Data do último lead desta página: mande como ?desde= para buscar os seguintes.
      next: leads.at(-1)?.createdAt ?? desde,
      // true = pode haver mais leads depois desta página.
      hasMore: leads.length === limit,
    });
  } catch (error) {
    console.error("[leads] falha ao buscar leads:", error);
    return Response.json({ error: "Erro ao buscar os leads" }, { status: 500 });
  }
}
