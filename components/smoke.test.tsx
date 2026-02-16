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
import Mechanics from "./Mechanics";
import Governance from "./Governance";
import Results from "./Results";
import WhatThisMeans from "./WhatThisMeans";
import Built from "./Built";
import Lab from "./Lab";
import Signal from "./Signal";
import Toolkit from "./Toolkit";
import InlineCTA from "./InlineCTA";
import Divider from "./Divider";

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

  it("Mechanics renders without error", () => {
    render(<Mechanics />);
    expect(document.querySelector("#mechanics")).toBeInTheDocument();
  });

  it("Governance renders without error", () => {
    render(<Governance />);
    expect(document.querySelector("#governance")).toBeInTheDocument();
  });

  it("Results renders without error", () => {
    render(<Results />);
    expect(document.querySelector("#results")).toBeInTheDocument();
  });

  it("WhatThisMeans renders without error", () => {
    render(<WhatThisMeans />);
    expect(document.querySelector("#whatthismeans")).toBeInTheDocument();
  });

  it("Built renders without error", () => {
    render(<Built />);
    expect(document.querySelector("#built")).toBeInTheDocument();
  });

  it("Lab renders without error", () => {
    render(<Lab />);
    expect(document.querySelector("#lab")).toBeInTheDocument();
  });

  it("Signal renders without error", () => {
    render(<Signal />);
    expect(document.querySelector("#signal")).toBeInTheDocument();
  });

  it("Toolkit renders without error", () => {
    render(<Toolkit />);
    expect(document.querySelector("#toolkit")).toBeInTheDocument();
  });

  it("InlineCTA renders without error", () => {
    const { container } = render(
      <InlineCTA label="// Test" text="Test text" href="#cta" buttonText="Click" />
    );
    expect(container.querySelector(".inline-cta")).toBeInTheDocument();
  });

  it("Divider renders without error", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector(".divider")).toBeInTheDocument();
  });
});
