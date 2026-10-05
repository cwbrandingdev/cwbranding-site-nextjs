// Rota interna. O acesso público é só pelo endereço secreto (ADMIN_PATH),
// reescrito para cá pelo proxy.ts; /admin direto responde 404.
import type { Metadata } from "next";
import { verifyAdminSession } from "@/lib/admin-session";
import { adminDb } from "@/lib/firebase-admin";
import { translations } from "../utils/translations";
import { formatPhone } from "../utils/contactForm";
import { LoginForm } from "./LoginForm";
import { LogoutButton } from "./LogoutButton";

export const metadata: Metadata = {
  title: "Painel",
  robots: { index: false, follow: false, nocache: true },
};

const MAX_ROWS = 500;

type Submission = {
  id: string;
  createdAt: string | null;
  name: string;
  phone: string;
  email: string;
  instagram: string;
  revenue: string;
  traffic: string;
  objective: string;
};

async function getSubmissions(): Promise<Submission[]> {
  const snap = await adminDb()
    .collection("contact_submissions")
    .orderBy("createdAt", "desc")
    .limit(MAX_ROWS)
    .get();

  return snap.docs.map((doc) => {
    const d = doc.data();
    return {
      id: doc.id,
      createdAt: d.createdAt?.toDate().toISOString() ?? null,
      name: d.name ?? "",
      phone: d.phone ?? "",
      email: d.email ?? "",
      instagram: d.instagram ?? "",
      revenue: d.revenue ?? "",
      traffic: d.traffic ?? "",
      objective: d.objective ?? "",
    };
  });
}

const t = translations.PT;
const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});

function InstagramOrSite({ value }: { value: string }) {
  if (!value) return <span className="text-white/30">—</span>;
  const href = value.startsWith("@")
    ? `https://instagram.com/${value.slice(1)}`
    : /^https?:\/\//i.test(value)
      ? value
      : null;
  if (!href) return <>{value}</>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="text-[#E8C39E] hover:underline"
    >
      {value}
    </a>
  );
}

export default async function AdminPage() {
  const session = await verifyAdminSession();
  if (!session) return <LoginForm />;

  const submissions = await getSubmissions();

  return (
    <div className="min-h-screen bg-[#032826] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="font-display text-3xl md:text-4xl">
              Contatos <span className="text-[#E8C39E]">recebidos</span>
            </h1>
            <p className="mt-1 text-sm text-white/60">
              {submissions.length} {submissions.length === 1 ? "envio" : "envios"}
              {submissions.length === MAX_ROWS && ` (mostrando os ${MAX_ROWS} mais recentes)`}
              {" · "}
              {session.email}
            </p>
          </div>
          <LogoutButton />
        </header>

        {submissions.length === 0 ? (
          <p className="py-20 text-center text-white/60">Nenhum contato recebido ainda.</p>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[1100px] text-left text-sm">
              <thead className="bg-white/5 text-[10px] uppercase tracking-[0.2em] text-white/70">
                <tr>
                  {[
                    "Data",
                    "Nome",
                    "WhatsApp",
                    "E-mail",
                    "Instagram / site",
                    "Faturamento",
                    "Tráfego pago",
                    "Objetivo",
                  ].map((h) => (
                    <th key={h} className="px-4 py-3 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {submissions.map((s) => (
                  <tr key={s.id} className="align-top hover:bg-white/[0.03]">
                    <td className="whitespace-nowrap px-4 py-3 text-white/70">
                      {s.createdAt ? dateFormat.format(new Date(s.createdAt)) : "—"}
                    </td>
                    <td className="px-4 py-3 font-medium">{s.name}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <a
                        href={`https://wa.me/55${s.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#E8C39E] hover:underline"
                      >
                        {formatPhone(s.phone)}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      {s.email ? (
                        <a href={`mailto:${s.email}`} className="hover:underline">
                          {s.email}
                        </a>
                      ) : (
                        <span className="text-white/30">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <InstagramOrSite value={s.instagram} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {t.contactRevenueOptions[s.revenue as keyof typeof t.contactRevenueOptions] ?? (
                        <span className="text-white/30">—</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      {t.contactTrafficOptions[s.traffic as keyof typeof t.contactTrafficOptions] ?? (
                        <span className="text-white/30">—</span>
                      )}
                    </td>
                    <td className="max-w-md whitespace-pre-wrap break-words px-4 py-3 text-white/85">
                      {s.objective}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
