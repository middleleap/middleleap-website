import { test, expect } from "@playwright/test";

test.describe("Full Page", () => {
  test("loads with hero heading visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toContainText("Product");
  });

  test("all major sections exist in DOM", async ({ page }) => {
    await page.goto("/");
    const sections = ["#problem", "#shift", "#mechanics", "#roadmap", "#lab", "#toolkit", "#cta"];
    for (const id of sections) {
      await expect(page.locator(id)).toBeAttached();
    }
  });

  test("navigation links scroll to correct sections", async ({ page }) => {
    await page.goto("/");
    await page.click('nav a[href="#problem"]');
    await expect(page.locator("#problem")).toBeInViewport();
  });
});
