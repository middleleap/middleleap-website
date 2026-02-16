import { test, expect } from "@playwright/test";

test.describe("Self Assessment", () => {
  test("completes assessment and shows result", async ({ page }) => {
    await page.goto("/");
    const assessSection = page.locator("#roadmap");
    await assessSection.scrollIntoViewIfNeeded();

    // Start assessment
    await assessSection.locator(".assess-start").click();

    // Answer 5 questions with first option each time
    for (let q = 0; q < 5; q++) {
      await expect(assessSection.locator(".assess-question")).toBeVisible();
      const options = assessSection.locator(".assess-option");
      await options.first().click();
      // Wait for transition (300ms delay in component)
      await page.waitForTimeout(400);
    }

    // Result should be visible
    await expect(assessSection.locator(".assess-result-label")).toContainText("Your maturity stage");
    await expect(assessSection.locator(".assess-result-name")).toContainText("AI-Assisted");
  });

  test("retake returns to intro", async ({ page }) => {
    await page.goto("/");
    const assessSection = page.locator("#roadmap");
    await assessSection.scrollIntoViewIfNeeded();

    await assessSection.locator(".assess-start").click();

    for (let q = 0; q < 5; q++) {
      const options = assessSection.locator(".assess-option");
      await options.first().click();
      await page.waitForTimeout(400);
    }

    await assessSection.locator(".assess-restart").click();
    await expect(assessSection.locator(".assess-intro-title")).toContainText("Find your stage");
  });
});
