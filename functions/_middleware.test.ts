import { describe, expect, it, vi } from "vitest";
import { contentSignal } from "../lib/robots";
import { negotiateMarkdown, type AssetFetcher } from "./_middleware";

const origin = "https://www.middleleap.com";
const markdown = "---\ntitle: \"Open Finance\"\n---\n\n# Open Finance\n";

function request(pathname: string, headers: Record<string, string> = {}, method = "GET"): Request {
  return new Request(`${origin}${pathname}`, { method, headers });
}

function html(): Response {
  return new Response("<!doctype html><h1>Open Finance</h1>", {
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "public, max-age=0, must-revalidate" },
  });
}

function assetsServing(files: Record<string, string>): AssetFetcher & { fetch: ReturnType<typeof vi.fn> } {
  return {
    fetch: vi.fn(async (assetRequest: Request) => {
      const body = files[new URL(assetRequest.url).pathname];
      if (body === undefined) return new Response("not found", { status: 404 });
      if (assetRequest.headers.get("if-none-match") === '"md-etag"') {
        return new Response(null, { status: 304, headers: { etag: '"md-etag"' } });
      }
      return new Response(body, {
        headers: {
          "content-type": "application/octet-stream",
          "cache-control": "public, max-age=0, must-revalidate",
          etag: '"md-etag"',
          "x-robots-tag": "noindex",
        },
      });
    }),
  };
}

describe("Markdown for Agents middleware", () => {
  it("serves the Markdown twin at the canonical URL when Markdown is preferred", async () => {
    const assets = assetsServing({ "/open-finance.md": markdown });
    const next = vi.fn(async () => html());
    const response = await negotiateMarkdown(
      request("/open-finance", { accept: "text/markdown" }),
      assets,
      next,
    );

    expect(response.status).toBe(200);
    expect(await response.text()).toBe(markdown);
    expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(response.headers.get("vary")).toBe("Accept");
    expect(response.headers.get("x-markdown-tokens")).toBe(String(Math.ceil(markdown.length / 4)));
    expect(response.headers.get("content-signal")).toBe(contentSignal);
    expect(response.headers.get("cache-control")).toBe("public, max-age=0, must-revalidate");
    expect(response.headers.get("x-robots-tag")).toBeNull();
    expect(next).not.toHaveBeenCalled();
    expect(new URL(assets.fetch.mock.calls[0][0].url).pathname).toBe("/open-finance.md");
  });

  it("maps the homepage to index.md", async () => {
    const assets = assetsServing({ "/index.md": markdown });
    const response = await negotiateMarkdown(request("/", { accept: "text/markdown" }), assets, async () => html());
    expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(await response.text()).toBe(markdown);
  });

  it("keeps HTML as the default for browsers and marks it as varying on Accept", async () => {
    const assets = assetsServing({ "/open-finance.md": markdown });
    const response = await negotiateMarkdown(
      request("/open-finance", { accept: "text/html,application/xhtml+xml,*/*;q=0.8" }),
      assets,
      async () => html(),
    );

    expect(response.headers.get("content-type")).toBe("text/html; charset=utf-8");
    expect(response.headers.get("vary")).toBe("Accept");
    expect(await response.text()).toContain("<h1>");
    expect(assets.fetch).not.toHaveBeenCalled();
  });

  it("answers HEAD with Markdown headers and no body", async () => {
    const assets = assetsServing({ "/open-finance.md": markdown });
    const response = await negotiateMarkdown(
      request("/open-finance", { accept: "text/markdown" }, "HEAD"),
      assets,
      async () => html(),
    );
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
    expect(response.headers.get("x-markdown-tokens")).not.toBeNull();
    expect(response.body).toBeNull();
  });

  it("passes conditional requests through to the Markdown asset", async () => {
    const assets = assetsServing({ "/open-finance.md": markdown });
    const response = await negotiateMarkdown(
      request("/open-finance", { accept: "text/markdown", "if-none-match": '"md-etag"' }),
      assets,
      async () => html(),
    );
    expect(response.status).toBe(304);
    expect(response.headers.get("vary")).toBe("Accept");
    expect(response.headers.get("content-type")).toBe("text/markdown; charset=utf-8");
  });

  it("falls back to the HTML response when a path has no Markdown twin", async () => {
    const assets = assetsServing({});
    const notFound = new Response("<h1>Not found</h1>", { status: 404, headers: { "content-type": "text/html" } });
    const response = await negotiateMarkdown(
      request("/missing", { accept: "text/markdown" }),
      assets,
      async () => notFound,
    );
    expect(response.status).toBe(404);
    expect(response.headers.get("content-type")).toBe("text/html");
  });

  it("leaves API routes and non-GET requests untouched", async () => {
    const assets = assetsServing({});
    const apiResponse = new Response("{}", { headers: { "content-type": "application/json" } });
    const api = await negotiateMarkdown(
      request("/api/propose", { accept: "text/markdown" }, "POST"),
      assets,
      async () => apiResponse,
    );
    expect(api).toBe(apiResponse);
    expect(api.headers.get("vary")).toBeNull();

    const pagePost = new Response("", { status: 405 });
    expect(
      await negotiateMarkdown(request("/open-finance", { accept: "text/markdown" }, "POST"), assets, async () => pagePost),
    ).toBe(pagePost);
    expect(assets.fetch).not.toHaveBeenCalled();
  });
});
