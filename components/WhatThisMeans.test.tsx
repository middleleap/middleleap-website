import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import WhatThisMeans from "./WhatThisMeans";

describe("WhatThisMeans", () => {
  it("renders all persona tabs", () => {
    render(<WhatThisMeans />);
    expect(screen.getByText("For the CTO")).toBeInTheDocument();
    expect(screen.getByText("For the CPO")).toBeInTheDocument();
    expect(screen.getByText("For the CIO / CDO")).toBeInTheDocument();
  });

  it("shows CTO content by default", () => {
    render(<WhatThisMeans />);
    expect(screen.getByText(/already deployed Copilot/)).toBeInTheDocument();
  });

  it("switches to CPO content on tab click", () => {
    render(<WhatThisMeans />);
    fireEvent.click(screen.getByText("For the CPO"));
    expect(screen.getByText(/constrained by delivery capacity/)).toBeInTheDocument();
  });

  it("switches to CIO content on tab click", () => {
    render(<WhatThisMeans />);
    fireEvent.click(screen.getByText("For the CIO / CDO"));
    expect(screen.getByText(/Autonomous agents/)).toBeInTheDocument();
  });

  it("CTO tab has link to #roadmap", () => {
    const { container } = render(<WhatThisMeans />);
    const link = container.querySelector('a[href="#roadmap"]');
    expect(link).toBeInTheDocument();
  });
});
