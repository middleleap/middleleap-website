import { expect, test } from "@playwright/test";
import { bookingUrl } from "../lib/contact";
import { installationCommands } from "../lib/loom-product";

test("walkthrough supports keyboard navigation and keeps operations visible", async ({ page }) => {
  await page.goto("/the-loom");
  const discover = page.getByRole("tab", { name: /01\s*Discover/ });
  await discover.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: /02\s*Define/ })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText("Make the next decision clear.");
  await page.keyboard.press("End");
  await expect(page.getByRole("tabpanel")).toContainText("Keep the release accountable.");
  await expect(page.getByText("Observe outcomes, incidents and change.", { exact: false })).toBeVisible();
});

test("native disclosures open through keyboard and direct fragments", async ({ page }) => {
  await page.goto("/the-loom");
  const summary = page.getByText("Explore the nine discovery gates", { exact: true });
  await summary.focus(); await page.keyboard.press("Enter");
  await expect(page.locator("#d1")).toBeVisible();
  await page.goto("/the-loom#hg-0004");
  await expect(page.locator("#hg-0004")).toBeVisible();
  await expect(page.locator("#hg-0004").locator("xpath=ancestor::details")).toHaveAttribute("open", "");
});

test("toolkit explains hierarchy, example status, and booking", async ({ page }) => {
  await page.goto("/ai-dlc");
  await expect(page.locator("#loom-toolkit")).toContainText("The Loom Toolkit");
  await expect(page.locator("#open-finance")).toContainText("Open Finance Intelligence");
  await expect(page.getByRole("heading", { name: "AI SDLC / development foundations" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "MiddleLeap Brand" })).toHaveCount(0);
  await expect(page.locator("#examples")).toContainText("deliberately refusable");
  await expect(page.getByRole("link", { name: "Book a conversation ↗", exact: true })).toHaveAttribute("href", bookingUrl);
});

test("copy installation commands and report clipboard failure", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/ai-dlc");
  await page.getByRole("button", { name: "Copy commands" }).click();
  await expect(page.getByRole("status")).toContainText("Installation commands copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(installationCommands);
  await page.evaluate(() => { Object.defineProperty(navigator.clipboard, "writeText", { value: () => Promise.reject(new Error("denied")), configurable: true }); });
  await page.getByRole("button", { name: "Copy commands" }).click();
  await expect(page.getByRole("status")).toContainText("Select and copy the commands below.");
});

test("method and installation remain readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4788/the-loom");
  for (const text of ["Find the problem worth solving.", "Keep the release accountable."]) await expect(page.getByRole("heading", { name: text })).toBeVisible();
  await page.getByText("Explore the governance catalogue", { exact: true }).click();
  await expect(page.locator("#hg-0004")).toBeVisible();
  await page.goto("http://127.0.0.1:4788/ai-dlc");
  await expect(page.getByRole("region", { name: "AI-DLC installation commands" })).toContainText(installationCommands);
  await context.close();
});

for (const width of [390, 768, 1440]) for (const theme of ["light", "dark"] as const) {
  test(`product layouts and images ${width}px ${theme}`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.addInitScript(value => localStorage.setItem("middleleap-theme", value), theme);
    for (const route of ["/", "/the-loom", "/ai-dlc", "/open-finance"]) {
      await page.goto(route);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `/private/tmp/loom-review/${route.replaceAll("/", "") || "home"}-${width}-${theme}.png`, fullPage: true });
      const feature = page.locator(route === "/" ? '[class*="loomFeature"]' : route === "/the-loom" ? '[class*="walkthrough"]' : route === "/ai-dlc" ? '#examples' : '[class*="toolkitBridge"]');
      const images = page.locator('img[src^="/images/loom/"]');
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toBeVisible();
        await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
      }
      await feature.screenshot({ path: `/private/tmp/loom-review/${route.replaceAll("/", "") || "home"}-feature-${width}-${theme}.png` });
    }
  });
}
