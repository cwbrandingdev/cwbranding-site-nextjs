"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { FieldValue, Timestamp } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import {
  CONTACT_FIELDS,
  HONEYPOT_FIELD,
  onlyDigits,
  validateContact,
  type ContactFormState,
  type ContactValues,
} from "../utils/contactForm";

const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

async function getClientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "unknown";
}

// Máx. RATE_LIMIT_MAX envios por IP na janela. Guarda só o hash do IP (LGPD).
async function isRateLimited(ip: string) {
  const db = adminDb();
  const ref = db
    .collection("rate_limits")
    .doc(createHash("sha256").update(ip).digest("hex"));

  return db.runTransaction(async (tx) => {
    const now = Date.now();
    const snap = await tx.get(ref);
    const hits = ((snap.get("hits") as Timestamp[] | undefined) ?? []).filter(
      (t) => now - t.toMillis() < RATE_LIMIT_WINDOW_MS,
    );
    if (hits.length >= RATE_LIMIT_MAX) return true;
    tx.set(ref, { hits: [...hits, Timestamp.fromMillis(now)] });
    return false;
  });
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Bot preencheu o campo invisível: finge sucesso e descarta.
  if (formData.get(HONEYPOT_FIELD)) return { status: "success" };

  const values = Object.fromEntries(
    CONTACT_FIELDS.map((field) => [field, String(formData.get(field) ?? "").trim()]),
  ) as ContactValues;

  const fieldErrors = validateContact(values);
  if (Object.keys(fieldErrors).length) {
    return { status: "error", reason: "validation", fieldErrors };
  }

  try {
    if (await isRateLimited(await getClientIp())) {
      return { status: "error", reason: "rateLimit" };
    }

    await adminDb()
      .collection("contact_submissions")
      .add({
        ...values,
        phone: onlyDigits(values.phone),
        email: values.email.toLowerCase(),
        language: formData.get("language") === "EN" ? "EN" : "PT",
        status: "new",
        createdAt: FieldValue.serverTimestamp(),
      });

    return { status: "success" };
  } catch (error) {
    console.error("[contact] falha ao salvar envio:", error);
    return { status: "error", reason: "server" };
  }
}
