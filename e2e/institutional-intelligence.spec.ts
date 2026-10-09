import { expect, test } from "@playwright/test";

for (const route of ["/", "/institutional-intelligence", "/institutional-brain"]) {
  for (const colorScheme of ["light", "dark"] as const) {
    test(`${route} keeps the mobile content within the viewport (${colorScheme})`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
      await page.goto(route);
      await page.evaluate(async () => { await document.fonts.ready; });
      const width = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: window.innerWidth }));
      expect(width.document).toBeLessThanOrEqual(width.viewport);
      const heading = await page.locator("h1").boundingBox();
      expect(heading).not.toBeNull();
      expect(heading!.x).toBeGreaterThanOrEqual(0);
      expect(heading!.x + heading!.width).toBeLessThanOrEqual(width.viewport);
    });
  }
}
