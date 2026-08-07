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

    test("BreadcrumbList markup matches the visible breadcrumb trail", async ({ page }) => {
      await page.goto(route);

      // The desktop trail only; the mobile duplicate lives under a different nav.
      const visible = (
        await page.$$eval('nav[aria-label="Breadcrumb"] > span', (spans) =>
          spans.map((span) => {
            const clone = span.cloneNode(true) as HTMLElement;
            clone.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove());
            return (clone.textContent ?? "").trim();
          }),
        )
      ).filter(Boolean);

      const blocks = await page
        .locator('script[type="application/ld+json"]')
        .allTextContents();
      const crumbNames: string[] = [];
      for (const block of blocks) {
        const parsed = JSON.parse(block);
        for (const node of parsed["@graph"] ?? [parsed]) {
          if (node?.["@type"] !== "BreadcrumbList") continue;
          for (const item of node.itemListElement) {
            expect(typeof item.position).toBe("number");
            crumbNames.push(item.name);
          }
          expect(node.itemListElement.map((i: { position: number }) => i.position)).toEqual(
            node.itemListElement.map((_: unknown, i: number) => i + 1),
          );
        }
      }

      expect(crumbNames).toEqual(visible);
    });

    test("same-page fragment links resolve to a target", async ({ page }) => {
      await page.goto(route);
      const missing = await page.$$eval("a[href*='#']", (anchors) =>
        anchors
          .map((a) => a.getAttribute("href") ?? "")
          .filter((h) => h.startsWith("#") && h.length > 1)
          .filter((h) => !document.getElementById(h.slice(1))),
      );
      expect(missing).toEqual([]);
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

        // axe downgrades aria-prohibited-attr from violation to "incomplete" when
        // the element has text content, which is exactly why the aria-label-on-div
        // defects survived this gate before. Assert on it specifically; do not fail
        // on all incomplete results, since color-contrast is perpetually incomplete.
        const prohibited = results.incomplete.filter((r) => r.id === "aria-prohibited-attr");
        expect(prohibited.flatMap((r) => r.nodes.map((n) => n.html))).toEqual([]);
      });
    }
  });
}
