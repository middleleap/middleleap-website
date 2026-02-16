import { test, expect } from "@playwright/test";

test.describe("Case Studies", () => {
  test("renders 5 case study cards in Results section", async ({ page }) => {
    await page.goto("/");

    const resultsSection = page.locator("#results");
    await resultsSection.scrollIntoViewIfNeeded();

    const cards = resultsSection.locator(".case-study-card");
    await expect(cards).toHaveCount(5);
  });

  test("each case study shows before/after timeline", async ({ page }) => {
    await page.goto("/");

    const resultsSection = page.locator("#results");
    await resultsSection.scrollIntoViewIfNeeded();

    const timelines = resultsSection.locator(".case-study-timeline");
    const count = await timelines.count();
    expect(count).toBe(5);

    // Check first card has before and after values
    const firstCard = resultsSection.locator(".case-study-card").first();
    await expect(firstCard.locator(".case-study-before")).toBeVisible();
    await expect(firstCard.locator(".case-study-after")).toBeVisible();
  });

  test("case study header is visible", async ({ page }) => {
    await page.goto("/");

    const resultsSection = page.locator("#results");
    await resultsSection.scrollIntoViewIfNeeded();

    await expect(resultsSection.locator(".case-studies-title")).toContainText("From weeks to days");
  });
});
