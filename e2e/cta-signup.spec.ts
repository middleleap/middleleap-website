import { test, expect } from "@playwright/test";

test.describe("CTA Signup", () => {
  test("shows validation error for invalid email", async ({ page }) => {
    await page.goto("/");
    const ctaSection = page.locator("#cta");
    await ctaSection.scrollIntoViewIfNeeded();

    // "user@example" passes HTML5 email validation but fails our regex (no dot in domain)
    await ctaSection.locator('input[type="email"]').fill("user@example");
    await ctaSection.locator('button[type="submit"]').click();

    await expect(ctaSection.locator(".cta-error")).toContainText("Invalid email");
  });

  test("shows success on 200 response", async ({ page }) => {
    await page.route("**/buttondown.com/**", (route) =>
      route.fulfill({ status: 200, body: "ok" })
    );

    await page.goto("/");
    const ctaSection = page.locator("#cta");
    await ctaSection.scrollIntoViewIfNeeded();

    await ctaSection.locator('input[type="email"]').fill("test@example.com");
    await ctaSection.locator('button[type="submit"]').click();

    await expect(ctaSection.locator(".cta-success")).toContainText("Signal received");
  });

  test("shows error on 500 response", async ({ page }) => {
    await page.route("**/buttondown.com/**", (route) =>
      route.fulfill({ status: 500, body: "error" })
    );

    await page.goto("/");
    const ctaSection = page.locator("#cta");
    await ctaSection.scrollIntoViewIfNeeded();

    await ctaSection.locator('input[type="email"]').fill("test@example.com");
    await ctaSection.locator('button[type="submit"]').click();

    await expect(ctaSection.locator(".cta-error")).toContainText("Subscription failed");
  });
});
