import { describe, expect, it } from "vitest";
import { estimateTokens, markdownPathFor, prefersMarkdown, varyOnAccept } from "./markdown-negotiation";

describe("prefersMarkdown", () => {
  it.each([
    "text/markdown",
    "text/markdown; charset=utf-8",
    "text/x-markdown",
    "text/markdown, text/html;q=0.9",
    "text/html;q=0.5, text/markdown",
    "text/markdown, */*",
    "TEXT/MARKDOWN",
  ])("selects Markdown for %s", (accept) => {
    expect(prefersMarkdown(accept)).toBe(true);
  });

  it.each([
    null,
    "",
    // A current Chrome navigation request.
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "*/*",
    "text/*",
    "text/html, text/markdown;q=0.5",
    "text/markdown;q=0",
    "application/json",
  ])("keeps HTML for %s", (accept) => {
    expect(prefersMarkdown(accept)).toBe(false);
  });
});

describe("markdownPathFor", () => {
  it.each([
    ["/", "/index.md"],
    ["/index", "/index.md"],
    ["/open-finance", "/open-finance.md"],
    ["/open-finance/", "/open-finance.md"],
    ["/ventures/parqo", "/ventures/parqo.md"],
  ])("maps %s to %s", (pathname, expected) => {
    expect(markdownPathFor(pathname)).toBe(expected);
  });

  it.each(["/api/propose", "/_next/static/chunks/main.js", "/llms.txt", "/open-finance.md", "/icon.svg"])(
    "ignores %s",
    (pathname) => {
      expect(markdownPathFor(pathname)).toBeNull();
    },
  );
});

describe("varyOnAccept", () => {
  it.each([
    [null, "Accept"],
    ["Accept-Encoding", "Accept-Encoding, Accept"],
    ["accept", "accept"],
    ["Origin, Accept", "Origin, Accept"],
    ["*", "*"],
  ])("turns Vary %s into %s", (initial, expected) => {
    const headers = new Headers(initial ? { vary: initial } : {});
    varyOnAccept(headers);
    expect(headers.get("vary")).toBe(expected);
  });
});

describe("estimateTokens", () => {
  it("estimates roughly four characters per token", () => {
    expect(estimateTokens("")).toBe(0);
    expect(estimateTokens("a".repeat(400))).toBe(100);
    expect(estimateTokens("abcde")).toBe(2);
  });
});
