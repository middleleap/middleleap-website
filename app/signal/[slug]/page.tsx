import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostBySlug } from "@/lib/signal";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — The Signal`,
    description: post.excerpt,
    // Drafts are reachable but kept out of search indexes.
    robots: post.draft ? { index: false, follow: true } : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function SignalPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({ source: post.content });

  return (
    <main className="signal-page">
      <article className="container article">
        <p className="sig-back">
          <Link href="/signal">← The Signal</Link>
        </p>

        <div className="sig-persona">
          {post.tag} &middot; For {post.persona}s
        </div>
        <h1 className="article-title">{post.title}</h1>
        <div className="article-meta">
          {post.readingTime}
          {post.draft && (
            <>
              {" "}
              &middot; <span className="sig-soon">Draft</span>
            </>
          )}
        </div>

        {post.draft && (
          <div className="article-draft-notice" role="note">
            This essay is a published draft — the outline is in place and the
            full piece is being written.
          </div>
        )}

        <div className="prose">{content}</div>
      </article>
    </main>
  );
}
