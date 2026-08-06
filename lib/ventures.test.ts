import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ecosystemContributions, portfolioProjects } from "./ventures";

describe("ventures data invariants", () => {
  it("every portfolio detailPath resolves to a real route", () => {
    for (const project of portfolioProjects) {
      const pagePath = path.join("app", project.detailPath, "page.tsx");
      expect(existsSync(pagePath), `${project.name}: ${pagePath} missing`).toBe(true);
    }
  });

  it("external links are absolute https URLs", () => {
    for (const project of portfolioProjects) {
      if (project.href) expect(project.href).toMatch(/^https:\/\//);
      expect(project.repository).toMatch(/^https:\/\//);
    }
    for (const contribution of ecosystemContributions) {
      expect(contribution.href).toMatch(/^https:\/\//);
    }
  });
});
