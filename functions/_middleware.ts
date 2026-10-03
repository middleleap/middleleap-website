// Cloudflare Pages middleware: Markdown for Agents.
//
// Requests that prefer `Accept: text/markdown` receive the page's Markdown twin
// (written at build time by scripts/build-markdown.mjs) at the canonical URL.
// Everything else falls through to the static HTML, which gains
// `Vary: Accept` so caches keep the two representations apart.
//
// public/_routes.json limits this middleware to page routes and /api/*, so
// static assets never invoke a function.
//
// Wrangler bundles this file for Pages; imports must stay relative.
import {
  estimateTokens,
  markdownContentType,
  markdownPathFor,
  prefersMarkdown,
  varyOnAccept,
} from "../lib/markdown-negotiation";

export type AssetFetcher = { fetch: (request: Request) => Promise<Response> };

type MiddlewareContext = {
  request: Request;
  env: { ASSETS: AssetFetcher };
  next: () => Promise<Response>;
};

// Matches the open-crawl posture in app/robots.ts.
export const contentSignal = "ai-train=yes, search=yes, ai-input=yes";

async function withVaryAccept(pending: Promise<Response>): Promise<Response> {
  const response = await pending;
  const mutable = new Response(response.body, response);
  varyOnAccept(mutable.headers);
  return mutable;
}

export async function negotiateMarkdown(
  request: Request,
  assets: AssetFetcher,
  next: () => Promise<Response>,
): Promise<Response> {
  const url = new URL(request.url);
  const markdownPath = markdownPathFor(url.pathname);
  if (!markdownPath || (request.method !== "GET" && request.method !== "HEAD")) {
    return next();
  }
  if (!prefersMarkdown(request.headers.get("accept"))) {
    return withVaryAccept(next());
  }

  const asset = await assets.fetch(
    new Request(new URL(markdownPath, url), { method: "GET", headers: request.headers }),
  );
  if (asset.status !== 200 && asset.status !== 304) {
    // No Markdown twin for this path (for example a 404): serve the HTML.
    return withVaryAccept(next());
  }

  const headers = new Headers(asset.headers);
  headers.set("content-type", markdownContentType);
  headers.set("content-signal", contentSignal);
  // Direct /<page>.md URLs are noindex (public/_headers); the negotiated
  // response lives at the canonical page URL and must stay indexable.
  headers.delete("x-robots-tag");
  varyOnAccept(headers);

  if (asset.status === 304) {
    return new Response(null, { status: 304, headers });
  }

  const markdown = await asset.text();
  headers.set("x-markdown-tokens", String(estimateTokens(markdown)));
  // The body is re-created from decoded text, so the runtime sets the length.
  headers.delete("content-length");
  headers.delete("content-encoding");
  return new Response(request.method === "HEAD" ? null : markdown, { status: 200, headers });
}

export const onRequest = (context: MiddlewareContext): Promise<Response> =>
  negotiateMarkdown(context.request, context.env.ASSETS, context.next);
