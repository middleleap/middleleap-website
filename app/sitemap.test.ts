import { readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

// Every page.tsx under app/ must appear in the sitemap, and every sitemap
// entry must correspond to a real route — new routes cannot silently drop out.
function collectRoutes(directory: string, prefix = ""): string[] {
  const routes: string[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      routes.push(...collectRoutes(path.join(directory, entry.name), `${prefix}/${entry.name}`));
    } else if (entry.name === "page.tsx") {
      routes.push(prefix === "" ? "/" : prefix);
    }
  }
  return routes;
}

describe("sitemap route parity", () => {
  const filesystemRoutes = collectRoutes("app").sort();
  const sitemapPaths = sitemap()
    .map((entry) => {
      const url = new URL(entry.url);
      return url.pathname === "/" ? "/" : url.pathname.replace(/\/$/, "");
    })
    .sort();

  it("lists every filesystem route", () => {
    expect(sitemapPaths).toEqual(filesystemRoutes);
  });

  it("uses the canonical origin for every entry", () => {
    for (const entry of sitemap()) {
      expect(entry.url.startsWith("https://www.middleleap.com")).toBe(true);
    }
  });

  it("carries a real, well-formed content date for every entry", () => {
    for (const entry of sitemap()) {
      const value = entry.lastModified;
      expect(typeof value).toBe("string");
      expect(value as string).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Date.parse(value as string)).toBeLessThanOrEqual(Date.now());
    }
  });

  // A regression to `new Date()` would collapse all entries to one build-time
  // timestamp, failing both the format assertion above and this one.
  it("does not stamp every route with one build-time date", () => {
    const dates = sitemap().map((entry) => entry.lastModified as string);
    expect(new Set(dates).size).toBeGreaterThanOrEqual(2);
  });
});
