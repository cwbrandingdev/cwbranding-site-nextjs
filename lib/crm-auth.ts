// Chave de acesso do CRM aos endpoints /api/leads — SOMENTE servidor.
import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";

// Confere o cabeçalho "Authorization: Bearer <CRM_API_KEY>".
// Compara os hashes para não vazar a chave pelo tempo de resposta.
export function isAuthorized(request: Request) {
  const key = process.env.CRM_API_KEY;
  const sent = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!key || !sent) return false;
  const hash = (value: string) => createHash("sha256").update(value).digest();
  return timingSafeEqual(hash(key), hash(sent));
}
