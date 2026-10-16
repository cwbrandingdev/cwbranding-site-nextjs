import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPost } from "@/lib/posts";
import { BlogPost } from "../BlogPost";
import { optimizeImage } from "../optimizeImage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Título e descrição para o Google e para compartilhamento (versão em português).
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Post não encontrado" };

  return {
    title: post.pt.title,
    description: post.pt.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.pt.title,
      description: post.pt.excerpt,
      type: "article",
      // Em JPG: WhatsApp e LinkedIn nem sempre mostram WebP no compartilhamento.
      images: post.coverUrl ? [{ url: optimizeImage(post.coverUrl, 1200, "jpg") }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  return <BlogPost post={post} />;
}
