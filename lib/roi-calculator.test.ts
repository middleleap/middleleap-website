import { describe, it, expect } from "vitest";
import {
  fmt,
  calculateROIResults,
  STAGE_SAVINGS_HOURS,
  STAGE_NAMES,
  STAGE_INVESTMENT,
} from "./roi-calculator";

describe("fmt", () => {
  it("formats millions", () => {
    expect(fmt(1_500_000)).toBe("$1.5M");
  });

  it("formats exact million", () => {
    expect(fmt(1_000_000)).toBe("$1.0M");
  });

  it("formats thousands", () => {
    expect(fmt(50_000)).toBe("$50K");
  });

  it("formats exact thousand", () => {
    expect(fmt(1_000)).toBe("$1K");
  });

  it("formats sub-1000 values", () => {
    expect(fmt(500)).toBe("$500");
  });

  it("formats zero", () => {
    expect(fmt(0)).toBe("$0");
  });

  it("handles boundary at 999", () => {
    expect(fmt(999)).toBe("$999");
  });

  it("handles boundary at 999999", () => {
    expect(fmt(999_999)).toBe("$1000K");
  });
});

describe("calculateROIResults", () => {
  it("returns 4 stages", () => {
    const results = calculateROIResults({ teamSize: 10, annualDevCost: 120000 });
    expect(results).toHaveLength(4);
  });

  it("calculates hours saved correctly", () => {
    const results = calculateROIResults({ teamSize: 10, annualDevCost: 120000 });
    // Stage 1: 10 * 8 = 80
    expect(results[0].hoursSaved).toBe(80);
    // Stage 4: 10 * 80 = 800
    expect(results[3].hoursSaved).toBe(800);
  });

  it("calculates annual savings correctly", () => {
    const results = calculateROIResults({ teamSize: 10, annualDevCost: 120000 });
    const hourlyRate = 120000 / 2080;
    // Stage 1: 10 * 8 * 12 * hourlyRate
    const expected = 10 * 8 * 12 * hourlyRate;
    expect(results[0].annualSavings).toBeCloseTo(expected, 2);
  });

  it("calculates payback period correctly", () => {
    const results = calculateROIResults({ teamSize: 10, annualDevCost: 120000 });
    const hourlyRate = 120000 / 2080;
    const monthlySavings = 10 * 8 * hourlyRate;
    const expectedPayback = 5000 / monthlySavings;
    expect(results[0].paybackMonths).toBeCloseTo(expectedPayback, 2);
  });

  it("returns Infinity payback when teamSize is 0", () => {
    const results = calculateROIResults({ teamSize: 0, annualDevCost: 120000 });
    results.forEach((r) => {
      expect(r.paybackMonths).toBe(Infinity);
    });
  });

  it("assigns correct stage numbers and names", () => {
    const results = calculateROIResults({ teamSize: 5, annualDevCost: 100000 });
    expect(results[0].stage).toBe(1);
    expect(results[0].name).toBe("AI-Assisted");
    expect(results[3].stage).toBe(4);
    expect(results[3].name).toBe("Agent Factory");
  });
});

describe("constants", () => {
  it("has 4 stages", () => {
    expect(STAGE_SAVINGS_HOURS).toHaveLength(4);
    expect(STAGE_NAMES).toHaveLength(4);
    expect(STAGE_INVESTMENT).toHaveLength(4);
  });

  it("savings hours increase monotonically", () => {
    for (let i = 1; i < STAGE_SAVINGS_HOURS.length; i++) {
      expect(STAGE_SAVINGS_HOURS[i]).toBeGreaterThan(STAGE_SAVINGS_HOURS[i - 1]);
    }
  });

  it("investments increase monotonically", () => {
    for (let i = 1; i < STAGE_INVESTMENT.length; i++) {
      expect(STAGE_INVESTMENT[i]).toBeGreaterThan(STAGE_INVESTMENT[i - 1]);
    }
  });
});
