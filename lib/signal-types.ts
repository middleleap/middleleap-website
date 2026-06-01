// Client-safe types and constants for the Signal content engine.
// Kept separate from lib/signal.ts (which uses `fs`) so client
// components can import these without pulling Node built-ins into the bundle.

export const SIGNAL_TAGS = [
  "Essay",
  "Technical",
  "Case Study",
  "Tutorial",
] as const;
export type SignalTag = (typeof SIGNAL_TAGS)[number];

export const PERSONAS = ["CTO", "CPO", "CIO"] as const;
export type Persona = (typeof PERSONAS)[number];

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  persona: Persona;
  tag: SignalTag;
  readingTime: string;
  excerpt: string;
  draft: boolean;
}

export interface Post extends PostMeta {
  content: string;
}

/** Metadata-only view, safe to pass to client components. */
export function toMeta(post: Post): PostMeta {
  const { content: _content, ...meta } = post;
  void _content;
  return meta;
}
