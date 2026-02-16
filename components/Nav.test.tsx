import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Nav from "./Nav";

describe("Nav", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("data-theme");
    localStorage.clear();
  });

  it("renders logo with Middle >> Leap", () => {
    render(<Nav />);
    expect(screen.getByText("Middle")).toBeInTheDocument();
    expect(screen.getByText("Leap")).toBeInTheDocument();
    expect(screen.getByText(">>")).toBeInTheDocument();
  });

  it("renders all nav links", () => {
    render(<Nav />);
    expect(screen.getByText("Manifesto")).toBeInTheDocument();
    expect(screen.getByText("Mechanics")).toBeInTheDocument();
    expect(screen.getByText("Roadmap")).toBeInTheDocument();
    expect(screen.getByText("Lab")).toBeInTheDocument();
    expect(screen.getByText("Toolkit")).toBeInTheDocument();
  });

  it("renders Get Started CTA", () => {
    render(<Nav />);
    expect(screen.getByText("Get Started")).toBeInTheDocument();
  });

  it("toggles theme from dark to light", () => {
    render(<Nav />);
    const toggle = screen.getByRole("button", { name: /switch to light theme/i });
    fireEvent.click(toggle);

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(localStorage.getItem("middleleap-theme")).toBe("light");
  });

  it("toggles theme from light back to dark", () => {
    document.documentElement.setAttribute("data-theme", "light");
    render(<Nav />);

    const toggle = screen.getByRole("button", { name: /switch to dark theme/i });
    fireEvent.click(toggle);

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("middleleap-theme")).toBe("dark");
  });

  it("smooth scrolls to section on nav link click", () => {
    // Create a target element
    const section = document.createElement("div");
    section.id = "problem";
    section.scrollIntoView = vi.fn();
    document.body.appendChild(section);

    render(<Nav />);
    const link = screen.getByText("Manifesto");
    fireEvent.click(link);

    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
    document.body.removeChild(section);
  });

  it("scrolls to top on logo click", () => {
    window.scrollTo = vi.fn();
    render(<Nav />);

    const logo = screen.getByText("Middle").closest("a")!;
    fireEvent.click(logo);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
