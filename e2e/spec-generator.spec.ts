import { test, expect } from "@playwright/test";

test.describe("Spec Generator", () => {
  test("generates spec from feature description", async ({ page }) => {
    await page.goto("/");
    const specSection = page.locator(".spec-gen-wrapper");
    await specSection.scrollIntoViewIfNeeded();

    await specSection.locator(".spec-gen-input").fill("add auth and payment flow");
    await specSection.locator(".spec-gen-btn").click();

    // Wait for loading to finish (1200ms timeout in component)
    await expect(specSection.locator(".spec-output-card")).toBeVisible({ timeout: 5000 });
  });

  test("shows complexity badge", async ({ page }) => {
    await page.goto("/");
    const specSection = page.locator(".spec-gen-wrapper");
    await specSection.scrollIntoViewIfNeeded();

    await specSection.locator(".spec-gen-input").fill("add auth");
    await specSection.locator(".spec-gen-btn").click();

    await expect(specSection.locator(".spec-output-complexity")).toBeVisible({ timeout: 5000 });
    await expect(specSection.locator(".spec-output-complexity")).toContainText("complexity");
  });

  test("'Try another' resets the form", async ({ page }) => {
    await page.goto("/");
    const specSection = page.locator(".spec-gen-wrapper");
    await specSection.scrollIntoViewIfNeeded();

    await specSection.locator(".spec-gen-input").fill("add auth");
    await specSection.locator(".spec-gen-btn").click();

    await expect(specSection.locator(".spec-output-card")).toBeVisible({ timeout: 5000 });

    await specSection.locator(".spec-output-reset").click();
    await expect(specSection.locator(".spec-output-card")).not.toBeVisible();
    await expect(specSection.locator(".spec-gen-input")).toHaveValue("");
  });
});
