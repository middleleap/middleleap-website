import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
import { inspectRetrieval, origin, probePublicRetrieval, retrievalCases } from "./check-public-retrieval.mjs";
import { renderRobotsTxt, contentSignal } from "../lib/robots";
import sitemap from "../app/sitemap";

describe("public retrieval verification", () => {
  const probe = retrievalCases.find((entry) => entry.kind === "markdown")!;
  const markdown = `---\nurl: "${origin}"\n---\n# MiddleLeap\n`;
  const markdownHeaders = () => new Headers({ "content-type": "text/markdown; charset=utf-8", vary: "Accept", "content-signal": contentSignal });

  it("accepts the source policy and canonical inventories", () => {
    expect(inspectRetrieval({ kind: "robots.txt" }, 200, new Headers({ "content-type": "text/plain" }), renderRobotsTxt())).toEqual([]);
    expect(inspectRetrieval({ kind: "sitemap.xml" }, 200, new Headers({ "content-type": "application/xml" }), sitemap().map((entry) => `<loc>${entry.url}</loc>`).join(""))).toEqual([]);
    expect(inspectRetrieval({ kind: "llms.txt" }, 200, new Headers({ "content-type": "text/plain" }), readFileSync("public/llms.txt", "utf8"))).toEqual([]);
    expect(inspectRetrieval(probe, 200, markdownHeaders(), markdown)).toEqual([]);
  });

  it("does not accept a 200 challenge page as canonical content", () => {
    expect(inspectRetrieval({ kind: "html", route: "/" }, 200, new Headers({ "content-type": "text/html" }), "<h1>Challenge</h1>")).toContain("HTML canonical differs from the intended URL");
    expect(inspectRetrieval(probe, 200, markdownHeaders(), "# Challenge")).toContain("Markdown canonical or page content is missing");
  });

  it("detects representation caching, training policy and canonical-indexing regressions", () => {
    const headers = markdownHeaders();
    headers.delete("vary");
    headers.set("content-signal", "search=yes, ai-input=yes, ai-train=yes");
    headers.set("x-robots-tag", "googlebot: noindex");
    expect(inspectRetrieval(probe, 200, headers, markdown)).toEqual([
      "canonical response carries noindex",
      "negotiated response is missing Vary: Accept",
      "negotiated Content-Signal differs from the intended policy",
    ]);
    expect(inspectRetrieval({ kind: "direct-markdown" }, 200, markdownHeaders(), markdown)).toContain("direct Markdown twin is missing noindex");
    expect(inspectRetrieval({ kind: "html", route: "/" }, 200, new Headers({ "content-type": "text/html" }), `<link href="${origin}" rel="canonical"><meta content="none" name="robots"><h1>MiddleLeap</h1>`)).toContain("canonical HTML declares noindex");
  });

  it("rejects temporary and offsite canonical redirects", () => {
    expect(inspectRetrieval({ kind: "redirect", url: "https://middleleap.com/" }, 302, new Headers({ location: "https://example.com/" }), "")).toHaveLength(2);
    expect(inspectRetrieval({ kind: "redirect", url: "https://middleleap.com/" }, 301, new Headers({ location: `${origin}/` }), "")).toEqual([]);
    expect(inspectRetrieval({ kind: "redirect", url: "https://middleleap.com/" }, 301, new Headers({ location: "https://middleleap.com/" }), "")).toContain("unexpected canonical redirect destination");
  });

  it("identifies a refusal as unavailable representation evidence", () => {
    expect(inspectRetrieval(probe, 403, markdownHeaders(), "private block details")).toEqual(["HTTP 403; representation checks unavailable"]);
  });

  it("detects a changed training declaration in robots rather than accepting Allow alone", () => {
    const findings = inspectRetrieval({ kind: "robots.txt" }, 200, new Headers({ "content-type": "text/plain" }), renderRobotsTxt().replaceAll("ai-train=no", "ai-train=yes"));
    expect(findings).toContain("robots policy mismatch for GPTBot");
    expect(findings).toContain("robots policy mismatch for *");
  });

  it("records canonical redirect evidence without publishing arbitrary Location values", async () => {
    const report = await probePublicRetrieval(async (url) => new Response(null, {
      status: 301,
      headers: { location: url === "https://middleleap.com/" ? `${origin}/` : "https://example.com/private-token" },
    }));
    expect(report.results.find((result) => result.url === "https://middleleap.com/")?.redirectTo).toBe(`${origin}/`);
    expect(JSON.stringify(report)).not.toContain("private-token");
  });

  it("keeps blocked responses and network errors private and never impersonates a crawler", async () => {
    const fetcher = vi.fn<typeof fetch>(async (_url, options) => {
      expect(options?.redirect).toBe("manual");
      expect(new Headers(options?.headers).get("user-agent")).toBe("MiddleLeap-Public-Verification/1.0");
      return new Response("private block details", { status: 403, headers: { "set-cookie": "private", "cf-ray": "private", "server": "private" } });
    });
    const report = await probePublicRetrieval(fetcher);
    expect(fetcher).toHaveBeenCalledTimes(retrievalCases.length);
    expect(JSON.stringify(report)).not.toContain("private");
    expect(report.scope).toContain("does not verify crawler identity");
    const unavailable = await probePublicRetrieval(async () => { throw new Error("private network details"); });
    expect(JSON.stringify(unavailable)).not.toContain("private network details");
    expect(unavailable.results.every((result) => result.findings.length === 1)).toBe(true);
  });
});
