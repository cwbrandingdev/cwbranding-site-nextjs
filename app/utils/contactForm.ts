// Regras do formulário "Fale conosco" — compartilhadas entre cliente e Server Action.
// Os selects salvam códigos estáveis; os rótulos (PT/EN) ficam em translations.ts.

export const REVENUE_OPTIONS = [
  "ate-10k",
  "10k-50k",
  "50k-100k",
  "100k-500k",
  "acima-500k",
] as const;

export const TRAFFIC_OPTIONS = ["sim-atualmente", "sim-parou", "nunca"] as const;

export type Revenue = (typeof REVENUE_OPTIONS)[number];
export type Traffic = (typeof TRAFFIC_OPTIONS)[number];

export const CONTACT_FIELDS = [
  "name",
  "phone",
  "email",
  "instagram",
  "revenue",
  "traffic",
  "objective",
] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];
export type ContactValues = Record<ContactField, string>;

// Campo invisível: pessoas não preenchem, bots sim.
export const HONEYPOT_FIELD = "company_fax";

export type ContactErrorCode = "required" | "invalid" | "tooLong";

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      reason: "validation" | "rateLimit" | "server";
      fieldErrors?: Partial<Record<ContactField, ContactErrorCode>>;
    };

const MAX_LENGTH: Record<ContactField, number> = {
  name: 120,
  phone: 20,
  email: 200,
  instagram: 200,
  revenue: 20,
  traffic: 20,
  objective: 2000,
};

export const REQUIRED_FIELDS: readonly ContactField[] = ["name", "phone", "objective"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const onlyDigits = (value: string) => value.replace(/\D/g, "");

// (41) 99625-0984 — aceita fixo (10 dígitos) e celular (11).
export function formatPhone(value: string) {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function validateContact(values: ContactValues) {
  const errors: Partial<Record<ContactField, ContactErrorCode>> = {};

  for (const field of CONTACT_FIELDS) {
    const value = values[field];
    if (REQUIRED_FIELDS.includes(field) && !value) errors[field] = "required";
    else if (value.length > MAX_LENGTH[field]) errors[field] = "tooLong";
  }

  // Opcionais: só validam o formato quando preenchidos.
  const phoneDigits = onlyDigits(values.phone).length;
  if (!errors.phone && (phoneDigits < 10 || phoneDigits > 11)) errors.phone = "invalid";
  if (!errors.email && values.email && !EMAIL_RE.test(values.email)) errors.email = "invalid";
  if (!errors.revenue && values.revenue && !REVENUE_OPTIONS.includes(values.revenue as Revenue))
    errors.revenue = "invalid";
  if (!errors.traffic && values.traffic && !TRAFFIC_OPTIONS.includes(values.traffic as Traffic))
    errors.traffic = "invalid";

  return errors;
}
