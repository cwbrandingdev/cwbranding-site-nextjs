// Campos de um lead (data, WhatsApp, e-mail...) usados na tabela e na janela do painel.
import { translations } from "../utils/translations";
import { formatPhone } from "../utils/contactForm";
import type { Submission } from "./submissions";

const t = translations.PT;

const dateParts = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/Sao_Paulo",
});

// Montado à mão para servidor e navegador gerarem exatamente o mesmo texto.
export function formatDate(iso: string | null) {
  if (!iso) return "—";
  const p = Object.fromEntries(
    dateParts.formatToParts(new Date(iso)).map((part) => [part.type, part.value]),
  );
  return `${p.day}/${p.month}/${p.year} ${p.hour}:${p.minute}`;
}

export const Empty = () => <span className="text-white/30">—</span>;

export function InstagramOrSite({ value }: { value: string }) {
  if (!value) return <Empty />;
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

export const revenueLabel = (s: Submission) =>
  t.contactRevenueOptions[s.revenue as keyof typeof t.contactRevenueOptions] ?? <Empty />;

export const trafficLabel = (s: Submission) =>
  t.contactTrafficOptions[s.traffic as keyof typeof t.contactTrafficOptions] ?? <Empty />;

export function WhatsAppLink({ phone }: { phone: string }) {
  return (
    <a
      href={`https://wa.me/55${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#E8C39E] hover:underline"
    >
      {formatPhone(phone)}
    </a>
  );
}

export function EmailLink({ email }: { email: string }) {
  if (!email) return <Empty />;
  return (
    <a href={`mailto:${email}`} className="hover:underline">
      {email}
    </a>
  );
}
