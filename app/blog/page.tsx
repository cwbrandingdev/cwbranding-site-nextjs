import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { BlogList } from "./BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conteúdos da CWBranding sobre branding, marketing digital e tráfego pago para fazer sua marca crescer.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return <BlogList posts={posts} />;
}
