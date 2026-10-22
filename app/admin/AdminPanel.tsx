"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { getRealtimeToken } from "./actions";
import { MAX_ROWS, toSubmission, type Submission } from "./submissions";
import {
  EmailLink,
  formatDate,
  InstagramOrSite,
  revenueLabel,
  trafficLabel,
  WhatsAppLink,
} from "./leadFields";

type LiveStatus = "connecting" | "live" | "offline";

// Janela com todas as informações do lead, aberta ao clicar na linha da tabela.
// <dialog> nativo: fecha com Esc, e aqui também ao clicar fora.
function LeadDialog({ lead, onClose }: { lead: Submission; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  const fields = [
    { label: "WhatsApp", value: <WhatsAppLink phone={lead.phone} /> },
    { label: "E-mail", value: <EmailLink email={lead.email} /> },
    { label: "Instagram / site", value: <InstagramOrSite value={lead.instagram} /> },
    { label: "Faturamento", value: revenueLabel(lead) },
    { label: "Tráfego pago", value: trafficLabel(lead) },
  ];

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      // O clique fora do conteúdo cai no próprio <dialog> (a área escura).
      onClick={(e) => e.target === e.currentTarget && ref.current?.close()}
      className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl border border-white/10 bg-[#0A3F3D] text-white shadow-2xl backdrop:bg-black/60"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl">{lead.name}</h2>
            <p className="mt-1 text-sm text-white/60">{formatDate(lead.createdAt)}</p>
          </div>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Fechar"
            className="rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.label}>
              <dt className="text-[10px] uppercase tracking-[0.2em] text-white/60">{f.label}</dt>
              <dd className="mt-1 wrap-break-word text-sm">{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">Objetivo</p>
          <p className="mt-2 max-h-[50vh] overflow-y-auto whitespace-pre-wrap wrap-break-word text-sm leading-relaxed text-white/85">
            {lead.objective}
          </p>
        </div>
      </div>
    </dialog>
  );
}

const STATUS_LABEL: Record<LiveStatus, string> = {
  connecting: "Conectando...",
  live: "Ao vivo",
  offline: "Tempo real indisponível — atualize a página",
};

const STATUS_DOT: Record<LiveStatus, string> = {
  connecting: "bg-yellow-400",
  live: "bg-emerald-400 animate-pulse",
  offline: "bg-red-400",
};

export function AdminPanel({ email, initial }: { email: string; initial: Submission[] }) {
  const [rows, setRows] = useState(initial);
  const [status, setStatus] = useState<LiveStatus>("connecting");
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Submission | null>(null);
  const knownIds = useRef(new Set(initial.map((s) => s.id)));

  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;

    (async () => {
      try {
        const token = await getRealtimeToken();
        if (!token) throw new Error("sem token");

        const [{ auth, db }, { signInWithCustomToken }, fs] = await Promise.all([
          import("@/lib/firebase"),
          import("firebase/auth"),
          import("firebase/firestore"),
        ]);
        await signInWithCustomToken(auth, token);
        if (cancelled) return;

        const q = fs.query(
          fs.collection(db, "contact_submissions"),
          fs.orderBy("createdAt", "desc"),
          fs.limit(MAX_ROWS),
        );

        unsubscribe = fs.onSnapshot(
          q,
          (snap) => {
            const next: Submission[] = snap.docs.map(toSubmission);

            const arrived = next.filter((s) => !knownIds.current.has(s.id)).map((s) => s.id);
            arrived.forEach((id) => knownIds.current.add(id));
            if (arrived.length) setNewIds((prev) => new Set([...prev, ...arrived]));

            setRows(next);
            setStatus("live");
          },
          (error) => {
            // No logout o Firebase desconecta antes do painel desmontar: não é erro.
            if (!auth.currentUser) return;
            console.error("[admin] tempo real:", error);
            setStatus("offline");
          },
        );
      } catch (error) {
        console.error("[admin] tempo real:", error);
        if (!cancelled) setStatus("offline");
      }
    })();

    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#032826] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="font-display text-3xl md:text-4xl">
              Contatos <span className="text-[#E8C39E]">recebidos</span>
            </h1>
            <p className="mt-1 text-sm text-white/60">
              {rows.length} {rows.length === 1 ? "envio" : "envios"}
              {rows.length === MAX_ROWS && ` (mostrando os ${MAX_ROWS} mais recentes)`}
              {" · "}
              {email}
            </p>
            <p
              role="status"
              data-live-status={status}
              className="mt-2 inline-flex items-center gap-2 text-xs text-white/70"
            >
              <span className={`size-2 rounded-full ${STATUS_DOT[status]}`} />
              {STATUS_LABEL[status]}
            </p>
          </div>
        </header>

        {rows.length === 0 ? (
          <p className="py-20 text-center text-white/60">Nenhum contato recebido ainda.</p>
        ) : (
          // Barra de rolagem fina, na cor areia, no lugar da barra branca do sistema.
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10 pb-1 [scrollbar-color:rgba(232,195,158,0.45)_transparent] scrollbar-thin">
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
                {rows.map((s) => {
                  const isNew = newIds.has(s.id);
                  return (
                    <tr
                      key={s.id}
                      tabIndex={0}
                      title="Clique para ver tudo"
                      // Clique em link (WhatsApp, e-mail...) abre o link, não a janela.
                      onClick={(e) => !(e.target as HTMLElement).closest("a") && setSelected(s)}
                      onKeyDown={(e) => e.key === "Enter" && setSelected(s)}
                      className={`cursor-pointer align-top transition-colors focus:outline-none focus-visible:bg-white/6 ${
                        isNew ? "bg-[#E8C39E]/10" : "hover:bg-white/6"
                      }`}
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-white/70">
                        {formatDate(s.createdAt)}
                        {isNew && (
                          <span className="ml-2 rounded-full bg-[#E8C39E] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#004D4C]">
                            Novo
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium">{s.name}</td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <WhatsAppLink phone={s.phone} />
                      </td>
                      <td className="px-4 py-3">
                        <EmailLink email={s.email} />
                      </td>
                      <td className="px-4 py-3">
                        <InstagramOrSite value={s.instagram} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">{revenueLabel(s)}</td>
                      <td className="whitespace-nowrap px-4 py-3">{trafficLabel(s)}</td>
                      {/* Só uma prévia; a mensagem inteira aparece na janela do lead. */}
                      <td className="px-4 py-3 text-white/85">
                        <p className="line-clamp-2 max-w-xs wrap-break-word">{s.objective}</p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <LeadDialog key={selected.id} lead={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
