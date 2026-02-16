import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SpecGenerator from "./SpecGenerator";

describe("SpecGenerator", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders input and disabled generate button", () => {
    render(<SpecGenerator />);
    expect(screen.getByPlaceholderText("Describe your next feature in one sentence")).toBeInTheDocument();
    expect(screen.getByText("Generate")).toBeDisabled();
  });

  it("enables generate button with input text", async () => {
    const user = userEvent.setup();
    render(<SpecGenerator />);

    await user.type(
      screen.getByPlaceholderText("Describe your next feature in one sentence"),
      "add auth"
    );
    expect(screen.getByText("Generate")).toBeEnabled();
  });

  it("shows loading state during generation", () => {
    vi.useFakeTimers();
    render(<SpecGenerator />);

    const input = screen.getByPlaceholderText("Describe your next feature in one sentence");
    fireEvent.change(input, { target: { value: "add auth" } });
    fireEvent.click(screen.getByText("Generate"));

    expect(screen.getByText("Generating specification...")).toBeInTheDocument();

    act(() => { vi.advanceTimersByTime(1200); });

    expect(screen.queryByText("Generating specification...")).not.toBeInTheDocument();
  });

  it("shows result card with complexity badge after generation", () => {
    vi.useFakeTimers();
    render(<SpecGenerator />);

    const input = screen.getByPlaceholderText("Describe your next feature in one sentence");
    fireEvent.change(input, { target: { value: "add auth" } });
    fireEvent.click(screen.getByText("Generate"));
    act(() => { vi.advanceTimersByTime(1200); });

    expect(screen.getByText("Feature Specification")).toBeInTheDocument();
    expect(screen.getByText("medium complexity")).toBeInTheDocument();
  });

  it("resets form when 'Try another' is clicked", () => {
    vi.useFakeTimers();
    render(<SpecGenerator />);

    const input = screen.getByPlaceholderText("Describe your next feature in one sentence");
    fireEvent.change(input, { target: { value: "add auth" } });
    fireEvent.click(screen.getByText("Generate"));
    act(() => { vi.advanceTimersByTime(1200); });

    fireEvent.click(screen.getByText("Try another"));

    expect(screen.queryByText("Feature Specification")).not.toBeInTheDocument();
    const resetInput = screen.getByPlaceholderText("Describe your next feature in one sentence") as HTMLInputElement;
    expect(resetInput.value).toBe("");
  });

  it("generates spec on Enter key press", () => {
    vi.useFakeTimers();
    render(<SpecGenerator />);

    const input = screen.getByPlaceholderText("Describe your next feature in one sentence");
    fireEvent.change(input, { target: { value: "add auth" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(screen.getByText("Generating specification...")).toBeInTheDocument();

    act(() => { vi.advanceTimersByTime(1200); });
    expect(screen.getByText("Feature Specification")).toBeInTheDocument();
  });

  it("shows high complexity for payment + auth input", () => {
    vi.useFakeTimers();
    render(<SpecGenerator />);

    const input = screen.getByPlaceholderText("Describe your next feature in one sentence");
    fireEvent.change(input, { target: { value: "payment auth integration" } });
    fireEvent.click(screen.getByText("Generate"));
    act(() => { vi.advanceTimersByTime(1200); });

    expect(screen.getByText("high complexity")).toBeInTheDocument();
    expect(screen.getByText(/Senior Agent \+ Human Review/)).toBeInTheDocument();
  });

  it("shows low complexity for generic input", () => {
    vi.useFakeTimers();
    render(<SpecGenerator />);

    const input = screen.getByPlaceholderText("Describe your next feature in one sentence");
    fireEvent.change(input, { target: { value: "add a simple widget" } });
    fireEvent.click(screen.getByText("Generate"));
    act(() => { vi.advanceTimersByTime(1200); });

    expect(screen.getByText("low complexity")).toBeInTheDocument();
    expect(screen.getByText(/Fast-Track Agent/)).toBeInTheDocument();
  });

  it("disables input during generation", () => {
    vi.useFakeTimers();
    render(<SpecGenerator />);

    const input = screen.getByPlaceholderText("Describe your next feature in one sentence");
    fireEvent.change(input, { target: { value: "add auth" } });
    fireEvent.click(screen.getByText("Generate"));

    expect(input).toBeDisabled();

    act(() => { vi.advanceTimersByTime(1200); });
    // After generation, the result is shown (input may or may not re-enable depending on result state)
  });

  it("shows CTA text after generation", () => {
    vi.useFakeTimers();
    render(<SpecGenerator />);

    const input = screen.getByPlaceholderText("Describe your next feature in one sentence");
    fireEvent.change(input, { target: { value: "add auth" } });
    fireEvent.click(screen.getByText("Generate"));
    act(() => { vi.advanceTimersByTime(1200); });

    expect(screen.getByText(/This took/)).toBeInTheDocument();
    expect(screen.getByText(/8 seconds/)).toBeInTheDocument();
  });
});
