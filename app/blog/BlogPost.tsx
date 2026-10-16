"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { contact } from "../utils/contact";
import { optimizeImage } from "./optimizeImage";
import { PostContent } from "./PostContent";
import { formatPostDate, getPostText, type Post } from "./types";

// Conteúdo da página de um post: capa, título, texto e chamada para contato no final.
export function BlogPost({ post }: { post: Post }) {
  const { language, t } = useLanguage();
  const text = getPostText(post, language);

  return (
    <article className="min-h-screen bg-white px-6 pb-20 pt-28 md:px-12 md:pt-36">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-[#004d4c]/70 transition-colors hover:text-[#004d4c]"
        >
          <ChevronLeft className="size-4" /> {t.blogBack}
        </Link>

        <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[#004d4c]/60">
          {formatPostDate(post.createdAt, language)}
        </p>
        <h1 className="mt-3 font-display text-4xl leading-tight tracking-tight text-[#004d4c] md:text-5xl">
          {text.title}
        </h1>
        {text.excerpt && <p className="mt-5 text-lg text-[#004d4c]/75">{text.excerpt}</p>}

        {post.coverUrl && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={optimizeImage(post.coverUrl, 1400)}
              alt={text.title}
              fill
              priority
              sizes="768px"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-12">
          <PostContent content={text.content} />
        </div>

        <div className="mt-16 rounded-2xl bg-[#004d4c] p-8 text-center text-white md:p-10">
          <p className="font-display text-2xl md:text-3xl">{t.blogCtaTitle}</p>
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#E8C39E] px-6 py-3 text-sm font-semibold text-[#004d4c] transition-colors hover:bg-white"
          >
            <FaWhatsapp className="size-4" /> {t.blogCtaButton}
          </a>
        </div>
      </div>
    </article>
  );
}
