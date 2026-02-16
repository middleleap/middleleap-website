import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ROICalculator from "./ROICalculator";

describe("ROICalculator", () => {
  it("renders with default values", () => {
    render(<ROICalculator />);
    expect(screen.getByText("Model your transformation.")).toBeInTheDocument();
    expect(screen.getByLabelText("Team Size")).toHaveValue(10);
  });

  it("updates results when team size changes", () => {
    render(<ROICalculator />);

    const teamInput = screen.getByLabelText("Team Size");
    fireEvent.change(teamInput, { target: { value: "20" } });

    // Stage 1 with team=20: 20*8=160h — check it exists in the document
    const allText = document.body.textContent;
    expect(allText).toContain("160h");
  });

  it("stage 4 card has apex class", () => {
    const { container } = render(<ROICalculator />);
    const apexCard = container.querySelector(".roi-stage-card.apex");
    expect(apexCard).toBeInTheDocument();
    expect(apexCard?.textContent).toContain("Agent Factory");
  });

  it("displays formatted savings values", () => {
    render(<ROICalculator />);
    // With default team=10, annualDevCost=120000:
    // hourlyRate = 120000/2080 ≈ 57.69
    // Stage 1: 10*8*12*57.69 ≈ 55384 → "$55K"
    const allText = document.body.textContent;
    expect(allText).toContain("$55K");
  });
});
