import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

// Mock next/image for Hero
vi.mock("next/image", () => ({
  default: ({ src, alt, ...rest }: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src as string} alt={alt as string ?? ""} {...rest} />
  ),
}));

import Nav from "./Nav";
import Hero from "./Hero";
import Footer from "./Footer";
import Problem from "./Problem";
import Shift from "./Shift";
import Roadmap from "./Roadmap";

describe("Smoke render tests", () => {
  it("Nav renders without error", () => {
    const { container } = render(<Nav />);
    expect(container.querySelector("nav")).toBeInTheDocument();
  });

  it("Hero renders without error", () => {
    render(<Hero />);
    expect(document.querySelector(".hero")).toBeInTheDocument();
  });

  it("Footer renders without error", () => {
    render(<Footer />);
    expect(document.querySelector("footer")).toBeInTheDocument();
  });

  it("Problem renders without error", () => {
    render(<Problem />);
    expect(document.querySelector("#problem")).toBeInTheDocument();
  });

  it("Shift renders without error", () => {
    render(<Shift />);
    expect(document.querySelector("#shift")).toBeInTheDocument();
  });

  it("Roadmap renders without error", () => {
    render(<Roadmap />);
    expect(document.querySelector("#roadmap")).toBeInTheDocument();
  });
});
