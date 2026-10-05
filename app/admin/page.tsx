// Rota interna. O acesso público é só pelo endereço secreto (ADMIN_PATH),
// reescrito para cá pelo proxy.ts; /admin direto responde 404.
import type { Metadata } from "next";
import { verifyAdminSession } from "@/lib/admin-session";
import { adminDb } from "@/lib/firebase-admin";
import { AdminPanel } from "./AdminPanel";
import { LoginForm } from "./LoginForm";
import { MAX_ROWS, toSubmission, type Submission } from "./submissions";

export const metadata: Metadata = {
  title: "Painel",
  robots: { index: false, follow: false, nocache: true },
};

// Lista inicial renderizada no servidor; o AdminPanel assume em tempo real.
async function getSubmissions(): Promise<Submission[]> {
  const snap = await adminDb()
    .collection("contact_submissions")
    .orderBy("createdAt", "desc")
    .limit(MAX_ROWS)
    .get();

  return snap.docs.map(toSubmission);
}

export default async function AdminPage() {
  const session = await verifyAdminSession();
  if (!session) return <LoginForm />;

  return <AdminPanel email={session.email} initial={await getSubmissions()} />;
}
