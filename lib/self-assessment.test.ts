import { describe, it, expect } from "vitest";
import { computeStage, questions, stageResults } from "./self-assessment";

describe("computeStage", () => {
  it("returns the majority stage", () => {
    expect(computeStage([1, 1, 1, 2, 3])).toBe(1);
  });

  it("returns lower stage on tie (lower checked first)", () => {
    // 1 appears twice, 2 appears twice, 3 appears once
    expect(computeStage([1, 1, 2, 2, 3])).toBe(1);
  });

  it("returns correct stage when all answers are the same", () => {
    expect(computeStage([3, 3, 3, 3, 3])).toBe(3);
  });

  it("handles single answer", () => {
    expect(computeStage([4])).toBe(4);
  });

  it("handles empty array (returns default 1)", () => {
    expect(computeStage([])).toBe(1);
  });

  it("returns stage 4 when it has majority", () => {
    expect(computeStage([4, 4, 4, 1, 2])).toBe(4);
  });

  it("returns stage 2 when it has strict majority", () => {
    expect(computeStage([2, 2, 2, 1, 3])).toBe(2);
  });

  it("tie between 2 and 3 returns 2", () => {
    expect(computeStage([2, 2, 3, 3, 1])).toBe(2);
  });

  it("tie between 3 and 4 returns 3", () => {
    expect(computeStage([3, 3, 4, 4, 1])).toBe(3);
  });
});

describe("questions", () => {
  it("has 5 questions", () => {
    expect(questions).toHaveLength(5);
  });

  it("each question has 4 options", () => {
    questions.forEach((q) => {
      expect(q.options).toHaveLength(4);
    });
  });

  it("each question has a non-empty text", () => {
    questions.forEach((q) => {
      expect(q.text.length).toBeGreaterThan(0);
    });
  });
});

describe("stageResults", () => {
  it("has entries for stages 1-4", () => {
    expect(stageResults[1]).toBeDefined();
    expect(stageResults[2]).toBeDefined();
    expect(stageResults[3]).toBeDefined();
    expect(stageResults[4]).toBeDefined();
  });

  it("each stage has name, gap, and action", () => {
    for (let i = 1; i <= 4; i++) {
      expect(stageResults[i].name).toBeTruthy();
      expect(stageResults[i].gap).toBeTruthy();
      expect(stageResults[i].action).toBeTruthy();
    }
  });
});
