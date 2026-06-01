import { describe, it, expect } from "vitest";
import {
  getAllPosts,
  getPublishedPosts,
  getPostBySlug,
  getAllSlugs,
  toMeta,
  SIGNAL_TAGS,
  PERSONAS,
} from "./signal";

describe("signal content layer", () => {
  it("loads the six launch posts", () => {
    const posts = getAllPosts();
    expect(posts.length).toBe(6);
  });

  it("sorts posts newest first", () => {
    const dates = getAllPosts().map((p) => p.date);
    const sorted = [...dates].sort((a, b) => (a < b ? 1 : -1));
    expect(dates).toEqual(sorted);
  });

  it("parses valid persona and tag frontmatter on every post", () => {
    for (const p of getAllPosts()) {
      expect(PERSONAS).toContain(p.persona);
      expect(SIGNAL_TAGS).toContain(p.tag);
      expect(p.title.length).toBeGreaterThan(0);
      expect(p.excerpt.length).toBeGreaterThan(0);
    }
  });

  it("excludes drafts from the published set", () => {
    const all = getAllPosts();
    const published = getPublishedPosts();
    expect(published.every((p) => !p.draft)).toBe(true);
    expect(published.length).toBe(all.filter((p) => !p.draft).length);
  });

  it("resolves a post by slug with its content", () => {
    const slug = getAllSlugs()[0];
    const post = getPostBySlug(slug);
    expect(post).toBeDefined();
    expect(post?.slug).toBe(slug);
    expect(post?.content.length).toBeGreaterThan(0);
  });

  it("returns undefined for an unknown slug", () => {
    expect(getPostBySlug("does-not-exist")).toBeUndefined();
  });

  it("toMeta strips the content field", () => {
    const post = getAllPosts()[0];
    const meta = toMeta(post);
    expect("content" in meta).toBe(false);
    expect(meta.slug).toBe(post.slug);
  });
});
