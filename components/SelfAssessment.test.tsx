import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import SelfAssessment from "./SelfAssessment";

function clickOption(optionIndex: number) {
  const buttons = screen.getAllByRole("button");
  const optionButtons = buttons.filter(
    (btn) =>
      !btn.textContent?.includes("Start") &&
      !btn.textContent?.includes("Retake") &&
      !btn.textContent?.includes("Schedule")
  );
  fireEvent.click(optionButtons[optionIndex]);
  act(() => { vi.advanceTimersByTime(300); });
}

describe("SelfAssessment", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders intro screen", () => {
    render(<SelfAssessment />);
    expect(screen.getByText("Find your stage")).toBeInTheDocument();
    expect(screen.getByText(/Start assessment/)).toBeInTheDocument();
  });

  it("shows first question after clicking start", () => {
    render(<SelfAssessment />);
    fireEvent.click(screen.getByText(/Start assessment/));
    expect(screen.getByText("Question 1 of 5")).toBeInTheDocument();
    expect(screen.getByText("How do your engineers currently use AI tools?")).toBeInTheDocument();
  });

  it("shows result after answering all 5 questions with stage 1", () => {
    vi.useFakeTimers();
    render(<SelfAssessment />);
    fireEvent.click(screen.getByText(/Start assessment/));

    for (let q = 0; q < 5; q++) {
      clickOption(0);
    }

    expect(screen.getByText("Your maturity stage")).toBeInTheDocument();
    expect(screen.getByText(/AI-Assisted/)).toBeInTheDocument();
  });

  it("displays correct stage name for majority answers", () => {
    vi.useFakeTimers();
    render(<SelfAssessment />);
    fireEvent.click(screen.getByText(/Start assessment/));

    // 3x stage 2, 2x stage 1
    const pattern = [1, 1, 1, 0, 0];
    for (let q = 0; q < 5; q++) {
      clickOption(pattern[q]);
    }

    expect(screen.getByText(/Templates & Scaffolds/)).toBeInTheDocument();
  });

  it("retake assessment returns to intro", () => {
    vi.useFakeTimers();
    render(<SelfAssessment />);
    fireEvent.click(screen.getByText(/Start assessment/));

    for (let q = 0; q < 5; q++) {
      clickOption(0);
    }

    fireEvent.click(screen.getByText("Retake assessment"));
    expect(screen.getByText("Find your stage")).toBeInTheDocument();
  });
});
