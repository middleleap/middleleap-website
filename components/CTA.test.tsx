import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CTA from "./CTA";

describe("CTA", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders form in idle state", () => {
    render(<CTA />);
    expect(screen.getByPlaceholderText("your_email@company.com")).toBeInTheDocument();
    expect(screen.getByText("Initialize")).toBeInTheDocument();
  });

  it("shows validation error for invalid email without calling fetch", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const { container } = render(<CTA />);

    const input = screen.getByPlaceholderText("your_email@company.com");
    fireEvent.change(input, { target: { value: "not-an-email" } });
    fireEvent.submit(container.querySelector("form")!);

    expect(screen.getByText("Invalid email format.")).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("shows config error when env var is missing", async () => {
    const originalEnv = process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME;
    delete process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME;

    const user = userEvent.setup();
    render(<CTA />);

    const input = screen.getByPlaceholderText("your_email@company.com");
    await user.type(input, "test@example.com");
    await user.click(screen.getByText("Initialize"));

    expect(screen.getByText("Email capture is not configured yet.")).toBeInTheDocument();

    if (originalEnv) process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME = originalEnv;
  });

  it("shows success on successful submission", async () => {
    process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME = "testuser";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 200 }));

    const user = userEvent.setup();
    render(<CTA />);

    const input = screen.getByPlaceholderText("your_email@company.com");
    await user.type(input, "test@example.com");
    await user.click(screen.getByText("Initialize"));

    expect(await screen.findByText("Signal received. Check your inbox.")).toBeInTheDocument();

    delete process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME;
  });

  it("shows error on API failure", async () => {
    process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME = "testuser";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(null, { status: 500 }));

    const user = userEvent.setup();
    render(<CTA />);

    const input = screen.getByPlaceholderText("your_email@company.com");
    await user.type(input, "test@example.com");
    await user.click(screen.getByText("Initialize"));

    expect(await screen.findByText("Subscription failed. Please try again.")).toBeInTheDocument();

    delete process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME;
  });
});
