// Content negotiation for Markdown for Agents.
//
// Every exported page has a Markdown twin written by scripts/build-markdown.mjs
// (out/open-finance.html -> out/open-finance.md). functions/_middleware.ts uses
// these helpers to serve that twin at the canonical URL when a client asks for
// `Accept: text/markdown`. Browsers never list text/markdown, so they keep HTML.

export const markdownContentType = "text/markdown; charset=utf-8";

const markdownTypes = new Set(["text/markdown", "text/x-markdown"]);

type MediaRange = { type: string; q: number };

function parseAccept(accept: string): MediaRange[] {
  return accept
    .split(",")
    .map((part) => {
      const [rawType, ...params] = part.split(";");
      let q = 1;
      for (const param of params) {
        const [key, value] = param.split("=").map((piece) => piece.trim());
        if (key.toLowerCase() === "q") {
          const parsed = Number(value);
          q = Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), 1) : 0;
        }
      }
      return { type: rawType.trim().toLowerCase(), q };
    })
    .filter((range) => range.type);
}

/**
 * True when the client explicitly accepts Markdown at least as much as HTML.
 * Wildcards never select Markdown: `*\/*` and `text/*` stay HTML, so browsers,
 * crawlers and link previews are unaffected.
 */
export function prefersMarkdown(accept: string | null | undefined): boolean {
  if (!accept) return false;
  const ranges = parseAccept(accept);
  const markdownQ = Math.max(0, ...ranges.filter((r) => markdownTypes.has(r.type)).map((r) => r.q));
  if (markdownQ === 0) return false;

  const htmlQ = Math.max(
    0,
    ...ranges
      .filter((r) => r.type === "text/html" || r.type === "application/xhtml+xml")
      .map((r) => r.q),
  );
  return markdownQ >= htmlQ;
}

/**
 * Maps a page path to its Markdown asset, or null for anything that is not a
 * page (API routes, Next.js assets, files with an extension).
 */
export function markdownPathFor(pathname: string): string | null {
  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/")) return null;
  const route = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (route === "/" || route === "/index") return "/index.md";
  const lastSegment = route.slice(route.lastIndexOf("/") + 1);
  if (!lastSegment || lastSegment.includes(".")) return null;
  return `${route}.md`;
}

/**
 * Rough token estimate for the `x-markdown-tokens` header (about four
 * characters per token for English prose). Agents use it to budget context,
 * not for billing, so an estimate is sufficient.
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/** Adds `Accept` to a response's Vary header so caches keep HTML and Markdown apart. */
export function varyOnAccept(headers: Headers): void {
  const vary = headers.get("vary");
  if (!vary) {
    headers.set("vary", "Accept");
  } else if (vary.trim() !== "*" && !/(^|,)\s*accept\s*(,|$)/i.test(vary)) {
    headers.set("vary", `${vary}, Accept`);
  }
}
