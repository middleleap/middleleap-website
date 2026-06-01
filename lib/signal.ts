import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, Persona, SignalTag } from "./signal-types";

export * from "./signal-types";

const CONTENT_DIR = path.join(process.cwd(), "content", "signal");

function parseFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ""),
    persona: (data.persona ?? "CTO") as Persona,
    tag: (data.tag ?? "Essay") as SignalTag,
    readingTime: String(data.readingTime ?? ""),
    excerpt: String(data.excerpt ?? ""),
    draft: Boolean(data.draft ?? false),
    content,
  };
}

/** All posts (including drafts), newest first. */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parseFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/** Published posts only (drafts excluded) — used for RSS and the sitemap. */
export function getPublishedPosts(): Post[] {
  return getAllPosts().filter((p) => !p.draft);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
