import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InlineCTA from "./InlineCTA";

describe("InlineCTA", () => {
  const defaultProps = {
    label: "// Find your stage",
    text: "Take the assessment.",
    href: "#roadmap",
    buttonText: "Start the assessment",
  };

  it("renders label, text, and button", () => {
    render(<InlineCTA {...defaultProps} />);
    expect(screen.getByText("// Find your stage")).toBeInTheDocument();
    expect(screen.getByText("Take the assessment.")).toBeInTheDocument();
    expect(screen.getByText(/Start the assessment/)).toBeInTheDocument();
  });

  it("button links to correct href", () => {
    const { container } = render(<InlineCTA {...defaultProps} />);
    const link = container.querySelector("a.inline-cta-btn") as HTMLAnchorElement;
    expect(link.getAttribute("href")).toBe("#roadmap");
  });

  it("renders with different props", () => {
    const { container } = render(
      <InlineCTA
        label="// Ready?"
        text="Schedule a session."
        href="#cta"
        buttonText="Book now"
      />
    );
    expect(screen.getByText("// Ready?")).toBeInTheDocument();
    expect(screen.getByText("Schedule a session.")).toBeInTheDocument();
    const link = container.querySelector("a.inline-cta-btn") as HTMLAnchorElement;
    expect(link.getAttribute("href")).toBe("#cta");
    expect(link.textContent).toContain("Book now");
  });
});
