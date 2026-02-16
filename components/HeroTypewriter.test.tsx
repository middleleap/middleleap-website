import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import HeroTypewriter from "./HeroTypewriter";

// Helper to advance timers and flush all pending microtasks/promises
async function advanceAndFlush(ms: number) {
  await act(async () => {
    vi.advanceTimersByTime(ms);
    // Flush promise microtasks
    await Promise.resolve();
  });
}

describe("HeroTypewriter", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders with aria-label for accessibility", () => {
    vi.useFakeTimers();
    render(<HeroTypewriter />);
    expect(
      screen.getByLabelText("Loading SDLC... Error. Switching to AI-DLC... OK")
    ).toBeInTheDocument();
  });

  it("renders cursor element", () => {
    vi.useFakeTimers();
    const { container } = render(<HeroTypewriter />);
    expect(container.querySelector(".tw-cursor")).toBeInTheDocument();
  });

  it("starts with empty text before animation begins", () => {
    vi.useFakeTimers();
    const { container } = render(<HeroTypewriter />);
    const typewriter = container.querySelector(".hero-typewriter");
    // Only the cursor span should be present, no text segments yet
    const spans = typewriter?.querySelectorAll("span");
    // Just the cursor span
    expect(spans?.length).toBe(1);
  });

  it("shows typed text after sufficient time", async () => {
    vi.useFakeTimers();
    render(<HeroTypewriter />);

    // Advance through the entire animation in large chunks, flushing between each
    // to allow the async generator to progress through promise-based delays
    for (let i = 0; i < 100; i++) {
      await advanceAndFlush(100);
    }

    const container = screen.getByLabelText("Loading SDLC... Error. Switching to AI-DLC... OK");
    const text = container.textContent;
    expect(text).toContain("Loading SDLC");
    expect(text).toContain("Error.");
  });

  it("applies error class to Error segment", async () => {
    vi.useFakeTimers();
    const { container } = render(<HeroTypewriter />);

    for (let i = 0; i < 100; i++) {
      await advanceAndFlush(100);
    }

    const errorSpan = container.querySelector(".tw-error");
    expect(errorSpan).toBeInTheDocument();
    expect(errorSpan?.textContent).toContain("Error.");
  });

  it("applies ok class to [OK] segment", async () => {
    vi.useFakeTimers();
    const { container } = render(<HeroTypewriter />);

    for (let i = 0; i < 100; i++) {
      await advanceAndFlush(100);
    }

    const okSpan = container.querySelector(".tw-ok");
    expect(okSpan).toBeInTheDocument();
    expect(okSpan?.textContent).toContain("[OK]");
  });

  it("hides cursor after animation completes", async () => {
    vi.useFakeTimers();
    const { container } = render(<HeroTypewriter />);

    // Advance past all typing + 1500ms cursor fade delay
    for (let i = 0; i < 150; i++) {
      await advanceAndFlush(100);
    }

    const cursor = container.querySelector(".tw-cursor");
    expect(cursor?.classList.contains("tw-cursor-hidden")).toBe(true);
  });
});
