import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ecosystemContributions, portfolioProjects } from "./ventures";

describe("ventures data invariants", () => {
  it("every portfolio detailPath resolves to a real route", () => {
    for (const project of portfolioProjects) {
      if (!project.detailPath) continue;
      const pagePath = path.join("app", project.detailPath, "page.tsx");
      expect(existsSync(pagePath), `${project.name}: ${pagePath} missing`).toBe(true);
    }
  });

  it("every project without a build record links to something live", () => {
    for (const project of portfolioProjects) {
      if (!project.detailPath) expect(project.href, `${project.name}: no detailPath and no href`).toBeTruthy();
    }
  });

  it("external links are absolute https URLs", () => {
    for (const project of portfolioProjects) {
      if (project.href) expect(project.href).toMatch(/^https:\/\//);
      if (project.repository) expect(project.repository).toMatch(/^https:\/\//);
    }
    for (const contribution of ecosystemContributions) {
      expect(contribution.href).toMatch(/^https:\/\//);
    }
  });

  it("every build record states the review date recorded in reviewedOn", () => {
    for (const project of portfolioProjects) {
      if (!project.detailPath) continue;
      expect(project.reviewedOn, `${project.name}: build record without reviewedOn`).toBeTruthy();
      const reviewed = new Date(`${project.reviewedOn}T00:00:00Z`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      });
      const page = readFileSync(path.join("app", project.detailPath, "page.tsx"), "utf8");
      expect(page, `${project.name}: snapshot line should say "reviewed ${reviewed}"`).toContain(`reviewed ${reviewed}`);
    }
  });
});

// Parqo was Setbay's working codename. It may appear only where the rename is
// explained or redirected, so stale copy cannot quietly reintroduce it.
describe("retired venture codenames", () => {
  const allowed = new Set([
    "app/ventures/setbay/page.tsx",
    "lib/ventures.ts",
    "lib/ventures.test.ts",
    "public/_redirects",
    "public/llms.txt",
  ]);

  function files(dir: string): string[] {
    return readdirSync(dir).flatMap((entry) => {
      const full = path.join(dir, entry);
      if (statSync(full).isDirectory()) return files(full);
      return /\.(tsx?|mjs|css|txt|md)$|_redirects$/.test(entry) ? [full] : [];
    });
  }

  it("Parqo appears only in the rename record", () => {
    const offenders = ["app", "components", "lib", "public", "e2e", "functions"]
      .flatMap(files)
      .filter((file) => !allowed.has(file.split(path.sep).join("/")))
      .filter((file) => /parqo/i.test(readFileSync(file, "utf8")));
    expect(offenders).toEqual([]);
  });
});
