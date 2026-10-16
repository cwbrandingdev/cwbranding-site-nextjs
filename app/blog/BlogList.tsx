"use client";

import { useLanguage } from "../context/LanguageContext";
import { PostCard } from "./PostCard";
import type { Post } from "./types";

// Conteúdo da página /blog: título e todos os posts publicados.
export function BlogList({ posts }: { posts: Post[] }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white px-6 pb-20 pt-32 md:px-12 md:pb-28 md:pt-40">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-5xl tracking-tight text-[#004d4c] md:text-6xl">
          <span className="italic">{t.blogTitleLine1}</span> {t.blogTitleLine2}
        </h1>
        <p className="mt-4 max-w-xl text-[#004d4c]/75">{t.blogDescription}</p>

        {posts.length === 0 ? (
          <p className="py-20 text-center text-[#004d4c]/60">{t.blogEmpty}</p>
        ) : (
          <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
