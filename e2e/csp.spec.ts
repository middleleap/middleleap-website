import { readFileSync } from "node:fs";
import { expect, test } from "@playwright/test";
import { routes } from "../lib/routes";

// `serve` does not apply public/_headers, so the smoke tests would never notice
// a Content Security Policy that blocks the site's own scripts. These tests
// read the policy the build wrote to out/_headers and enforce it in the browser.
const headers = readFileSync("out/_headers", "utf8");
const policy = /^\s*Content-Security-Policy:\s*(.+)$/m.exec(headers)?.[1] ?? "";

test("the built policy allows inline scripts by hash only", () => {
  expect(policy).toContain("script-src 'self' 'sha256-");
  expect(policy).not.toMatch(/script-src[^;]*'unsafe-inline'/);
  expect(policy).not.toContain("__INLINE_SCRIPT_HASHES__");
  expect(policy).toContain("frame-ancestors 'none'");
  // Cloudflare Web Analytics is injected at the edge on the live domain, so no
  // local page load would notice if these two hosts were dropped.
  expect(policy).toMatch(/script-src[^;]* https:\/\/static\.cloudflareinsights\.com/);
  expect(policy).toMatch(/connect-src[^;]* https:\/\/cloudflareinsights\.com/);
});

test.describe("pages under the built Content Security Policy", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/*", async (route) => {
      if (route.request().resourceType() !== "document") return route.continue();
      const response = await route.fetch();
      await route.fulfill({
        response,
        headers: { ...response.headers(), "content-security-policy": policy },
      });
    });
    await page.addInitScript(() => {
      const store = window as unknown as { cspViolations: string[] };
      store.cspViolations = [];
      document.addEventListener("securitypolicyviolation", (event) => {
        store.cspViolations.push(`${event.violatedDirective}: ${event.blockedURI || "inline"}`);
      });
    });
  });

  const violations = (page: import("@playwright/test").Page) =>
    page.evaluate(() => (window as unknown as { cspViolations: string[] }).cspViolations);

  for (const colorScheme of ["light", "dark"] as const) {
    test(`every route loads, themes and hydrates without a violation (${colorScheme})`, async ({ page }) => {
      test.setTimeout(120_000);
      await page.emulateMedia({ colorScheme });
      for (const route of [...routes.map((entry) => entry.path), "/a-page-that-does-not-exist"]) {
        await page.goto(route, { waitUntil: "networkidle" });
        // The inline theme script ran.
        await expect(page.locator("html"), route).toHaveAttribute("data-theme", colorScheme);
        // The bundles ran: the theme toggle is interactive.
        const other = colorScheme === "light" ? "dark" : "light";
        await page.getByRole("radio", { name: `Use ${other} theme` }).first().click();
        await expect(page.locator("html"), route).toHaveAttribute("data-theme", other);
        await page.getByRole("radio", { name: "Use automatic theme" }).first().click();
        expect(await violations(page), route).toEqual([]);
      }
    });
  }

  test("client-side navigation and the proposal form stay within the policy", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.locator("footer").getByRole("link", { name: "The Loom", exact: true }).click();
    await expect(page).toHaveURL(/\/the-loom$/);
    await expect(page.locator("h1")).toBeVisible();
    await page.locator("footer").getByRole("link", { name: "Venture Studio", exact: true }).click();
    await expect(page).toHaveURL(/\/ventures\/studio$/);
    await expect(page.getByRole("button", { name: /proposal/i }).first()).toBeVisible();
    expect(await violations(page)).toEqual([]);
  });

  test("an injected inline script is refused", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => {
      const script = document.createElement("script");
      script.textContent = "window.injected = true";
      document.body.append(script);
    });
    expect(await page.evaluate(() => (window as unknown as { injected?: boolean }).injected)).toBeUndefined();
    expect(await violations(page)).toEqual([expect.stringContaining("script-src")]);
  });
});
