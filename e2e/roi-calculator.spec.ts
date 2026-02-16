import { test, expect } from "@playwright/test";

test.describe("ROI Calculator", () => {
  test("input changes update result cards", async ({ page }) => {
    await page.goto("/");
    const roiSection = page.locator(".roi-wrapper");
    await roiSection.scrollIntoViewIfNeeded();

    const teamInput = roiSection.locator("#roi-team-size");
    await teamInput.fill("20");

    // Stage 1: 20*8=160h/mo
    const firstCard = roiSection.locator(".roi-stage-card").first();
    await expect(firstCard.locator(".roi-metric-value").first()).toContainText("160h");
  });

  test("values display with proper formatting", async ({ page }) => {
    await page.goto("/");
    const roiSection = page.locator(".roi-wrapper");
    await roiSection.scrollIntoViewIfNeeded();

    // Default team=10, annualDevCost=120000 → Stage 1 annual savings ≈ $55K
    const firstCard = roiSection.locator(".roi-stage-card").first();
    await expect(firstCard).toContainText("$55K");
  });
});
