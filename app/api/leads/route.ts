import { Timestamp } from "firebase-admin/firestore";
import { toSubmission } from "@/app/admin/submissions";
import { isAuthorized } from "@/lib/crm-auth";
import { adminDb } from "@/lib/firebase-admin";

const DEFAULT_LIMIT = 100;
const MAX_LIMIT = 500;

function corsResponse(body: any, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Access-Control-Allow-Origin", "https://azuz.cwbranding.com.br");
  headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Authorization, Content-Type");

  return Response.json(body, { ...init, headers });
}

export async function OPTIONS() {
  return corsResponse(null, { status: 204 });
}

export async function GET(request: Request) {
  if (!isAuthorized(request))
    return corsResponse({ error: "Não autorizado" }, { status: 401 });

  const params = new URL(request.url).searchParams;
  const desde = params.get("desde");
  const since = desde ? new Date(desde) : null;
  if (since && isNaN(since.getTime())) {
    return corsResponse(
      { error: "Use ?desde= com uma data ISO, ex.: 2026-10-28T13:00:00.000Z" },
      { status: 400 },
    );
  }
  const limit = Math.min(
    Number(params.get("limit")) || DEFAULT_LIMIT,
    MAX_LIMIT,
  );

  try {
    let query = adminDb()
      .collection("contact_submissions")
      .orderBy("createdAt", "asc");
    if (since) query = query.where("createdAt", ">", Timestamp.fromDate(since));
    const snap = await query.limit(limit).get();

    const leads = snap.docs.map(toSubmission);
    return corsResponse({
      leads,
      next: leads.at(-1)?.createdAt ?? desde,
      hasMore: leads.length === limit,
    });
  } catch (error) {
    console.error("[leads] falha ao buscar leads:", error);
    return corsResponse({ error: "Erro ao buscar os leads" }, { status: 500 });
  }
}
