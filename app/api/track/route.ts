// Recebe as visitas enviadas pelo navegador (app/components/Tracker.tsx).
import { parseTrackEvent, recordEvent } from "@/lib/tracking";

export async function POST(request: Request) {
  const event = parseTrackEvent(await request.json().catch(() => null));
  if (!event) return new Response(null, { status: 400 });

  try {
    await recordEvent(event);
  } catch (error) {
    console.error("[tracking] falha ao gravar evento:", error);
    return new Response(null, { status: 500 });
  }
  return new Response(null, { status: 204 });
}
