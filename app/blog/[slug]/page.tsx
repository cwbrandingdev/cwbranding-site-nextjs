import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedPost, getPublishedPosts } from "@/lib/posts";
import { JsonLd } from "@/app/components/JsonLd";
import { blogPostingJsonLd } from "@/app/utils/jsonld";
import { site } from "@/app/utils/site";
import { BlogPost } from "../BlogPost";
import { IMAGE_WIDTHS, optimizeImage } from "../optimizeImage";
import { postDescription } from "../types";

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

  const description = postDescription(post.pt);

  return {
    title: post.pt.title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    // O openGraph da página substitui o do layout inteiro: por isso repete siteName e locale.
    openGraph: {
      title: post.pt.title,
      description,
      url: `${site.url}/blog/${post.slug}`,
      siteName: site.name,
      locale: site.locale,
      type: "article",
      publishedTime: post.createdAt ?? undefined,
      modifiedTime: post.updatedAt ?? undefined,
      // Em JPG: WhatsApp e LinkedIn nem sempre mostram WebP no compartilhamento.
      // Sem capa, usa a imagem padrão do site.
      images: [post.coverUrl ? optimizeImage(post.coverUrl, IMAGE_WIDTHS.share, "jpg") : site.ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  // "Leia também": os 3 posts mais recentes, sem o atual.
  const related = (await getPublishedPosts()).filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />
      <BlogPost post={post} related={related} />
    </>
  );
}
