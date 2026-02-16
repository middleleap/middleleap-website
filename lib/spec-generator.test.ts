import { describe, it, expect } from "vitest";
import { generateSpec, KEYWORD_MAP } from "./spec-generator";

describe("generateSpec", () => {
  describe("keyword matching", () => {
    it("matches a single keyword", () => {
      const result = generateSpec("add auth flow");
      expect(result.constraints).toContain("Session management must follow OWASP guidelines");
      expect(result.dependencies).toContain("Identity provider integration");
    });

    it("matches multiple keywords", () => {
      const result = generateSpec("auth login page");
      // auth + login + page = 3 keywords
      expect(result.complexity).toBe("high"); // weight = 2+2+1 = 5
    });

    it("returns defaults when no keywords match", () => {
      const result = generateSpec("do something totally unique");
      expect(result.constraints).toContain("Standard code review required");
      expect(result.constraints).toContain("Unit test coverage > 80%");
      expect(result.dependencies).toContain("Existing codebase conventions");
      expect(result.dependencies).toContain("CI/CD pipeline");
    });

    it("deduplicates constraints from overlapping keywords", () => {
      // payment and checkout both have "PCI DSS compliance required"
      const result = generateSpec("payment checkout flow");
      const pciCount = result.constraints.filter(
        (c) => c === "PCI DSS compliance required"
      ).length;
      expect(pciCount).toBeLessThanOrEqual(1);
    });

    it("is case-insensitive", () => {
      const lower = generateSpec("auth");
      const upper = generateSpec("AUTH flow");
      expect(lower.complexity).toBe(upper.complexity);
    });
  });

  describe("complexity scoring", () => {
    it("returns low complexity when totalWeight < 2", () => {
      const result = generateSpec("build a simple widget");
      expect(result.complexity).toBe("low");
    });

    it("returns medium complexity when totalWeight is 2-4", () => {
      // "auth" alone has weight 2
      const result = generateSpec("add auth");
      expect(result.complexity).toBe("medium");
    });

    it("returns high complexity when totalWeight >= 5", () => {
      // payment(3) + auth(2) = 5
      const result = generateSpec("payment auth integration");
      expect(result.complexity).toBe("high");
    });
  });

  describe("routing rules", () => {
    it("routes low complexity to Fast-Track Agent", () => {
      const result = generateSpec("simple task");
      expect(result.routing).toBe("Fast-Track Agent");
    });

    it("routes medium complexity to Standard Agent + QA Gate", () => {
      const result = generateSpec("add search functionality");
      expect(result.routing).toBe("Standard Agent + QA Gate");
    });

    it("routes high complexity to Senior Agent + Human Review", () => {
      const result = generateSpec("payment auth realtime");
      expect(result.routing).toBe("Senior Agent + Human Review");
    });
  });

  describe("objective formatting", () => {
    it("capitalizes first letter", () => {
      const result = generateSpec("add a button");
      expect(result.objective).toMatch(/^A/);
    });

    it("adds trailing period if missing", () => {
      const result = generateSpec("add a button");
      expect(result.objective).toBe("Add a button.");
    });

    it("does not double-add period", () => {
      const result = generateSpec("add a button.");
      expect(result.objective).toBe("Add a button.");
    });
  });

  describe("acceptance criteria", () => {
    it("includes security review for high complexity", () => {
      const result = generateSpec("payment auth realtime");
      expect(result.acceptanceCriteria).toContain("Security review sign-off required");
    });

    it("includes code review for non-high complexity", () => {
      const result = generateSpec("simple widget");
      expect(result.acceptanceCriteria).toContain("Code review approved");
    });
  });

  describe("constraints and dependencies slicing", () => {
    it("limits constraints to max 4", () => {
      // Trigger many keywords to get lots of constraints
      const result = generateSpec("auth login payment checkout api search notification upload");
      expect(result.constraints.length).toBeLessThanOrEqual(4);
    });

    it("limits dependencies to max 4", () => {
      const result = generateSpec("auth login payment checkout api search notification upload");
      expect(result.dependencies.length).toBeLessThanOrEqual(4);
    });
  });
});

describe("KEYWORD_MAP", () => {
  it("has all expected keywords", () => {
    const keys = Object.keys(KEYWORD_MAP);
    expect(keys.length).toBe(14);
    expect(keys).toContain("auth");
    expect(keys).toContain("payment");
    expect(keys).toContain("realtime");
  });
});
