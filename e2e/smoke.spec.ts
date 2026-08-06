import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/open-finance",
  "/the-loom",
  "/ai-dlc",
  "/ventures",
  "/ventures/studio",
  "/ventures/backoffice",
  "/ventures/hivemind",
  "/ventures/parqo",
  "/privacy",
  "/venture-submission-terms",
];

for (const route of routes) {
  test.describe(route, () => {
    test("renders with core metadata and a single h1", async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      await expect(page.locator("h1")).toHaveCount(1);
      expect(await page.title()).not.toEqual("");

      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveAttribute("content", /.{20,}/);

      // Every JSON-LD block must parse as valid JSON.
      const jsonLdBlocks = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      for (const block of jsonLdBlocks) {
        expect(() => JSON.parse(block)).not.toThrow();
      }
    });

    test("internal navigation links resolve", async ({ page }) => {
      await page.goto(route);
      const hrefs = await page.$$eval("a[href^='/']", (anchors) =>
        anchors.map((a) => (a as HTMLAnchorElement).getAttribute("href") ?? ""),
      );
      const paths = [...new Set(hrefs.map((href) => href.split("#")[0]).filter(Boolean))];
      for (const path of paths) {
        const response = await page.request.get(path);
        expect(response.status(), `${route} links to ${path}`).toBe(200);
      }
    });

    for (const colorScheme of ["light", "dark"] as const) {
      test(`has no serious or critical accessibility violations (${colorScheme})`, async ({ page }) => {
        await page.emulateMedia({ colorScheme });
        await page.goto(route);
        const results = await new AxeBuilder({ page }).analyze();
        const blocking = results.violations.filter(
          (violation) => violation.impact === "serious" || violation.impact === "critical",
        );
        expect(
          blocking.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
        ).toEqual([]);
      });
    }
  });
}
