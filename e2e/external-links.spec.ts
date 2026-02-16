import { test, expect } from "@playwright/test";

test.describe("External Links", () => {
  test("Lab repo links open in new tab with correct hrefs", async ({ page }) => {
    await page.goto("/");

    const labSection = page.locator("#lab");
    await labSection.scrollIntoViewIfNeeded();

    const repoLinks = labSection.locator("a.repo");
    const count = await repoLinks.count();
    expect(count).toBe(6);

    for (let i = 0; i < count; i++) {
      const link = repoLinks.nth(i);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
      const href = await link.getAttribute("href");
      expect(href).toMatch(/^https:\/\/github\.com\/middleleap\//);
    }
  });

  test("Signal reading list links open in new tab", async ({ page }) => {
    await page.goto("/");

    const signalSection = page.locator("#signal");
    await signalSection.scrollIntoViewIfNeeded();

    const readingLinks = signalSection.locator(".sig-reading-link");
    const count = await readingLinks.count();
    expect(count).toBe(5);

    for (let i = 0; i < count; i++) {
      const link = readingLinks.nth(i);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });

  test("Signal articles show 'Coming soon' tag", async ({ page }) => {
    await page.goto("/");

    const signalSection = page.locator("#signal");
    await signalSection.scrollIntoViewIfNeeded();

    const soonTags = signalSection.locator(".sig-soon");
    const count = await soonTags.count();
    expect(count).toBe(3);
  });

  test("Footer contains expected navigation columns", async ({ page }) => {
    await page.goto("/");

    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();

    await expect(footer.locator("text=Navigate")).toBeVisible();
    await expect(footer.locator("text=Build")).toBeVisible();
    await expect(footer.locator("text=Read")).toBeVisible();
    await expect(footer.locator("text=Connect")).toBeVisible();
  });
});
