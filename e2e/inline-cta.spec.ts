import { test, expect } from "@playwright/test";

test.describe("Inline CTA", () => {
  test("inline CTAs are visible on page", async ({ page }) => {
    await page.goto("/");

    const inlineCtas = page.locator(".inline-cta");
    const count = await inlineCtas.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test("first inline CTA links to #roadmap", async ({ page }) => {
    await page.goto("/");

    const firstCta = page.locator(".inline-cta").first();
    await firstCta.scrollIntoViewIfNeeded();

    const link = firstCta.locator(".inline-cta-btn");
    await expect(link).toHaveAttribute("href", "#roadmap");
  });

  test("second inline CTA links to #cta", async ({ page }) => {
    await page.goto("/");

    const secondCta = page.locator(".inline-cta").nth(1);
    await secondCta.scrollIntoViewIfNeeded();

    const link = secondCta.locator(".inline-cta-btn");
    await expect(link).toHaveAttribute("href", "#cta");
  });

  test("inline CTA displays label and text", async ({ page }) => {
    await page.goto("/");

    const firstCta = page.locator(".inline-cta").first();
    await firstCta.scrollIntoViewIfNeeded();

    await expect(firstCta.locator(".inline-cta-label")).toBeVisible();
    await expect(firstCta.locator(".inline-cta-text")).toBeVisible();
  });
});
