// Jornada de um lead no site: páginas visitadas, tempo em cada uma, sessões e origem.
// GET /api/leads/<id>/jornada   (o "id" vem da lista de /api/leads)
// Cabeçalho obrigatório: Authorization: Bearer <CRM_API_KEY>
import { isAuthorized } from "@/lib/crm-auth";
import { getLeadJourney } from "@/lib/tracking";

export async function GET(request: Request, ctx: RouteContext<"/api/leads/[id]/jornada">) {
  if (!isAuthorized(request)) return Response.json({ error: "Não autorizado" }, { status: 401 });

  const { id } = await ctx.params;
  try {
    const journey = await getLeadJourney(id);
    if (!journey) return Response.json({ error: "Lead não encontrado" }, { status: 404 });
    return Response.json(journey);
  } catch (error) {
    console.error("[tracking] falha ao buscar jornada:", error);
    return Response.json({ error: "Erro ao buscar a jornada" }, { status: 500 });
  }
}
