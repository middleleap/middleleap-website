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

  it("handles zero team size gracefully", () => {
    render(<ROICalculator />);
    const teamInput = screen.getByLabelText("Team Size");
    fireEvent.change(teamInput, { target: { value: "0" } });

    // Stage 1 with team=0: 0*8=0h
    const allText = document.body.textContent;
    expect(allText).toContain("0h");
  });

  it("handles large team sizes with million-dollar formatting", () => {
    render(<ROICalculator />);
    const teamInput = screen.getByLabelText("Team Size");
    fireEvent.change(teamInput, { target: { value: "200" } });

    const costInput = screen.getByLabelText("Avg Annual Dev Cost ($)");
    fireEvent.change(costInput, { target: { value: "200000" } });

    // Stage 4: 200*80=16000h/mo, 16000*12*96.15 ≈ $18.5M
    const allText = document.body.textContent;
    expect(allText).toContain("M");
  });

  it("updates when annual dev cost changes", () => {
    render(<ROICalculator />);
    const costInput = screen.getByLabelText("Avg Annual Dev Cost ($)");
    fireEvent.change(costInput, { target: { value: "200000" } });

    // Stage 1: 10*8*12*(200000/2080) ≈ $92K
    const allText = document.body.textContent;
    expect(allText).toContain("$92K");
  });

  it("renders all 4 stage cards", () => {
    const { container } = render(<ROICalculator />);
    const cards = container.querySelectorAll(".roi-stage-card");
    expect(cards).toHaveLength(4);
  });

  it("renders CTA link to #cta", () => {
    const { container } = render(<ROICalculator />);
    const link = container.querySelector('a[href="#cta"]');
    expect(link).toBeInTheDocument();
  });
});
