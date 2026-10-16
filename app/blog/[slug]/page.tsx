import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPost, getPublishedPosts } from "@/lib/posts";
import { BlogPost } from "../BlogPost";
import { IMAGE_WIDTHS, optimizeImage } from "../optimizeImage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Deixa as páginas dos posts prontas antecipadamente (abrem na hora, sem consultar o Firebase).
// Posts criados depois são montados na primeira visita e guardados.
// Ao salvar no painel, revalidatePath (app/admin/blog-actions.ts) refaz as páginas.
export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({ slug: post.slug }));
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
      images: post.coverUrl ? [{ url: optimizeImage(post.coverUrl, IMAGE_WIDTHS.share, "jpg") }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  return <BlogPost post={post} />;
}
