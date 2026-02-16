import { test, expect } from "@playwright/test";

test.describe("Theme Toggle", () => {
  test("toggles to light theme and back", async ({ page }) => {
    await page.goto("/");

    // Default is dark (no data-theme attribute)
    const htmlTag = page.locator("html");
    await expect(htmlTag).not.toHaveAttribute("data-theme", "light");

    // Click theme toggle
    await page.click(".theme-toggle");
    await expect(htmlTag).toHaveAttribute("data-theme", "light");

    // Click again to go back to dark
    await page.click(".theme-toggle");
    await expect(htmlTag).toHaveAttribute("data-theme", "dark");
  });

  test("persists theme in localStorage", async ({ page }) => {
    await page.goto("/");

    await page.click(".theme-toggle");

    const theme = await page.evaluate(() =>
      localStorage.getItem("middleleap-theme")
    );
    expect(theme).toBe("light");
  });

  test("restores light theme from localStorage on reload", async ({ page }) => {
    await page.goto("/");

    // Set light theme
    await page.click(".theme-toggle");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    // Reload
    await page.reload();

    // Should still be light
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  });
});
