// Formato de um post do blog. Usado no servidor (Firestore) e no navegador.
import type { Language } from "../utils/translations";

// Texto do post em um idioma.
export type PostText = {
  title: string;
  excerpt: string; // resumo curto, aparece nos cards
  content: string; // texto completo, em Markdown
};

export type Post = {
  slug: string; // endereço do post: /blog/<slug>
  coverUrl: string; // imagem de capa (ImageKit) = primeira foto de images
  images: string[]; // fotos da capa, na ordem do carrossel (1 foto = capa simples)
  published: boolean; // false = rascunho, não aparece no site
  archived: boolean; // true = arquivado: sai do site e da lista principal do painel
  createdAt: string | null; // data em ISO
  updatedAt: string | null; // última vez que foi salvo no painel (ISO)
  pt: PostText;
  en: PostText;
};

export const emptyText: PostText = { title: "", excerpt: "", content: "" };

// Texto no idioma escolhido. Se a versão em inglês não foi escrita, usa a em português.
export function getPostText(post: Post, language: Language): PostText {
  if (language === "EN" && post.en.title) return post.en;
  return post.pt;
}

// Descrição para o Google: o resumo do post ou, se ele estiver vazio,
// o começo do texto sem a formatação Markdown (até ~155 caracteres).
export function postDescription(text: PostText) {
  if (text.excerpt.trim()) return text.excerpt.trim();

  const plain = text.content
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // imagens
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links: fica só o texto
    .replace(/[#>*_`~-]/g, " ") // títulos, citações, negrito, listas...
    .replace(/[\p{Extended_Pictographic}️]/gu, "") // emojis
    .replace(/\s+/g, " ")
    .trim();

  if (plain.length <= 155) return plain;
  // Corta no último espaço (sem deixar palavra pela metade) e tira a pontuação do fim antes do "…".
  return plain.slice(0, plain.lastIndexOf(" ", 152)).replace(/[\s.,;:!?]+$/, "") + "…";
}

// Tempo de leitura estimado (200 palavras por minuto, mínimo 1).
export function readingMinutes(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// "Meu Primeiro Post!" -> "meu-primeiro-post"
export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // tira acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatPostDate(iso: string | null, language: Language) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(language === "EN" ? "en-CA" : "pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  });
}
