"use client";

// Página de um post: visual branco e limpo, título grande e, ao lado do texto,
// uma coluna com a capa, os botões de compartilhar e o contato, que acompanha a rolagem.
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, House, Link2 } from "lucide-react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { contact } from "../utils/contact";
import { site } from "../utils/site";
import { IMAGE_WIDTHS, optimizeImage } from "./optimizeImage";
import { PostCard } from "./PostCard";
import { PostContent } from "./PostContent";
import { formatPostDate, getPostText, readingMinutes, type Post } from "./types";

export function BlogPost({ post, related }: { post: Post; related: Post[] }) {
  const { language, t } = useLanguage();
  const text = getPostText(post, language);

  return (
    <article className="bg-white">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-28 md:px-12 md:pt-32">
        <BackLinks />

        {/* Texto à esquerda; coluna da capa (380px) à direita, fixa durante a rolagem.
            No celular: título → capa → texto → compartilhar e contato no fim. */}
        <div className="mt-10 grid gap-14 lg:grid-cols-[1fr_380px]">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#004d4c]/60">
              {formatPostDate(post.createdAt, language)} · {readingMinutes(text.content)} {t.blogReadingTime}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight text-[#004d4c] md:text-7xl">
              {text.title}
            </h1>
            {text.excerpt && <p className="mt-6 text-xl text-[#004d4c]/70">{text.excerpt}</p>}
            {/* Capa no celular (no computador ela fica na coluna da direita) */}
            <Cover post={post} title={text.title} className="mt-10 lg:hidden" />
            <div className="my-10 h-px bg-[#004d4c]/15" />
            <PostContent content={text.content} />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Cover post={post} title={text.title} className="hidden lg:block" />
            <ShareButtons post={post} title={text.title} />
            <div className="rounded-2xl bg-[#004D4C] p-6 text-white">
              <p className="font-display text-2xl">{t.blogCtaTitle}</p>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#E8C39E] px-6 py-3 text-sm font-semibold text-[#004D4C] transition-colors hover:bg-white"
              >
                <FaWhatsapp className="size-4" /> {t.blogCtaButton}
              </a>
            </div>
          </aside>
        </div>
      </div>

      <RelatedPosts posts={related} />
    </article>
  );
}

// Capa no formato 1080x1350 (4:5, o mesmo das artes do Instagram).
// Com mais de uma foto vira carrossel: setas, bolinhas e deslizar com o dedo.
function Cover({ post, title, className }: { post: Post; title: string; className: string }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const images = post.images;
  if (images.length === 0) return null;

  const isCarousel = images.length > 1;

  // Vai para a foto anterior (-1) ou próxima (1), voltando ao início no fim.
  function go(direction: -1 | 1) {
    setCurrent((i) => (i + direction + images.length) % images.length);
  }

  // Deslizar o dedo mais de 40px para o lado troca a foto.
  function handleTouchEnd(endX: number) {
    if (touchStartX.current === null) return;
    const distance = endX - touchStartX.current;
    if (Math.abs(distance) > 40) go(distance < 0 ? 1 : -1);
    touchStartX.current = null;
  }

  const arrowClass =
    "absolute top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#004d4c] shadow transition-colors hover:bg-white";

  return (
    <div
      className={`relative aspect-[4/5] overflow-hidden rounded-2xl ${className}`}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].clientX)}
    >
      {/* As fotos ficam lado a lado; a faixa anda para mostrar a foto atual. */}
      <div
        className="flex h-full transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((url, index) => (
          <div key={url} className="relative h-full w-full shrink-0">
            <Image
              src={optimizeImage(url, IMAGE_WIDTHS.cover)}
              alt={isCarousel ? `${title} (${index + 1}/${images.length})` : title}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 380px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {isCarousel && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Anterior" className={`${arrowClass} left-3`}>
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Próxima" className={`${arrowClass} right-3`}>
            <ChevronRight className="size-5" />
          </button>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {images.map((url, index) => (
              <button
                key={url}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Foto ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  index === current ? "w-5 bg-white" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function BackLinks() {
  const { t } = useLanguage();
  const linkClass =
    "inline-flex items-center gap-1.5 text-sm text-[#004d4c]/70 transition-colors hover:text-[#004d4c]";
  return (
    <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <Link href="/blog" className={linkClass}>
        <ChevronLeft className="size-4" /> {t.blogBack}
      </Link>
      <Link href="/" className={linkClass}>
        <House className="size-4" /> {t.blogBackHome}
      </Link>
    </nav>
  );
}

// Compartilhar no WhatsApp e no LinkedIn, ou copiar o link do post.
function ShareButtons({ post, title }: { post: Post; title: string }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const url = `${site.url}/blog/${post.slug}`;

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const buttonClass =
    "flex size-10 items-center justify-center rounded-full border border-[#004d4c]/20 text-[#004d4c] transition-colors hover:border-[#004d4c] hover:bg-[#004d4c] hover:text-white";

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#004d4c]/60">
        {copied ? t.blogLinkCopied : t.blogShare}
      </span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
        className={buttonClass}
      >
        <FaWhatsapp className="size-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={buttonClass}
      >
        <FaLinkedin className="size-4" />
      </a>
      <button type="button" onClick={copyLink} aria-label={t.blogCopyLink} className={buttonClass}>
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
      </button>
    </div>
  );
}

// "Leia também": outros posts no fim da página.
function RelatedPosts({ posts }: { posts: Post[] }) {
  const { t } = useLanguage();
  if (posts.length === 0) return null;
  return (
    <section className="bg-[#EBF5F5] px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-3xl text-[#004d4c] md:text-4xl">{t.blogRelated}</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {posts.map((item) => (
            <PostCard key={item.slug} post={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
