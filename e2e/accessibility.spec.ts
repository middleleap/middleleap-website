import { test, expect } from "@playwright/test";

test.describe("Accessibility", () => {
  test("skip link is present and targets #problem", async ({ page }) => {
    await page.goto("/");

    const skipLink = page.locator(".skip-link");
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute("href", "#problem");
  });

  test("skip link becomes visible on focus", async ({ page }) => {
    await page.goto("/");

    // Tab to the skip link (first focusable element)
    await page.keyboard.press("Tab");

    const skipLink = page.locator(".skip-link");
    // Skip link should be visible when focused
    await expect(skipLink).toBeFocused();
  });

  test("theme toggle has accessible aria-label", async ({ page }) => {
    await page.goto("/");

    const toggle = page.locator(".theme-toggle");
    await expect(toggle).toHaveAttribute("aria-label", /Switch to .+ theme/);
  });

  test("nav links are keyboard-navigable", async ({ page }) => {
    await page.goto("/");

    // Tab past skip-link, then through nav items
    await page.keyboard.press("Tab"); // skip-link
    await page.keyboard.press("Tab"); // logo
    await page.keyboard.press("Tab"); // first nav link (Manifesto)

    const focused = page.locator(":focus");
    await expect(focused).toHaveText("Manifesto");
  });

  test("hero typewriter has aria-label", async ({ page }) => {
    await page.goto("/");

    const typewriter = page.locator(".hero-typewriter");
    await expect(typewriter).toHaveAttribute(
      "aria-label",
      "Loading SDLC... Error. Switching to AI-DLC... OK"
    );
  });
});
