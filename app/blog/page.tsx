import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { site } from "@/app/utils/site";
import { BlogList } from "./BlogList";

const description =
  "Conteúdos da CWBranding sobre branding, marketing digital e tráfego pago para fazer sua marca crescer.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  // O openGraph da página substitui o do layout inteiro: por isso repete siteName, locale e imagem.
  openGraph: {
    title: "Blog | CWBranding",
    description,
    url: `${site.url}/blog`,
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [site.ogImage],
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return <BlogList posts={posts} />;
}
