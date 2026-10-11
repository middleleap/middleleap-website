import { expect, test as base } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { siteOrigin } from "../lib/seo";
import { bookingUrl, contactEmail, mailtoHref } from "../lib/contact";

// Verify the handoff without making a booking, opening an email client or sending
// traffic to a third party. The Calendar popup is an intercepted test destination.
const test = base.extend<{ safeContactHandoff: void }>({
  safeContactHandoff: [async ({ context, javaScriptEnabled, baseURL }, use) => {
    await context.route("**/*", async (route) => {
      const request = route.request();
      if (!["GET", "HEAD"].includes(request.method())) {
        await route.abort();
      } else if (javaScriptEnabled === false && request.resourceType() === "script") {
        await route.abort();
      } else if (request.url() === bookingUrl) {
        await route.fulfill({
          status: 200,
          contentType: "text/html",
          body: "<!doctype html><title>Intercepted contact handoff</title><p>No booking request was sent.</p>",
        });
      } else if (new URL(request.url()).origin === new URL(baseURL!).origin) {
        if (javaScriptEnabled === false && request.isNavigationRequest()) {
          const response = await route.fetch();
          let html = await response.text();
          // Reproduce the delivered edge behaviour without changing Cloudflare:
          // normal mailto anchors are rewritten; noscript contents are excluded.
          html = html.split(/(<noscript\b[^>]*>[\s\S]*?<\/noscript>)/gi)
            .map((part) => /^<noscript\b/i.test(part) ? part : part.replace(/\bhref="mailto:([^"]*)"/g, (_match, email: string) => {
              const key = 0x42;
              const encoded = [key, ...Buffer.from(email)].map((byte, index) =>
                (index === 0 ? byte : byte ^ key).toString(16).padStart(2, "0"),
              ).join("");
              return `href="/cdn-cgi/l/email-protection#${encoded}"`;
            })).join("");
          await route.fulfill({ response, body: html });
        } else {
          await route.continue();
        }
      } else {
        await route.abort();
      }
    });
    await use();
  }, { auto: true }],
});

for (const colorScheme of ["light", "dark"] as const) {
  for (const width of [320, 390, 1440]) {
    test(`Open Finance review journey at ${width}px in ${colorScheme}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ colorScheme, reducedMotion: "reduce" });
      await page.goto("/");
      if (width < 680) {
        await page.getByText("Menu", { exact: true }).click();
        const mobileNav = page.getByRole("navigation", { name: "Mobile navigation" });
        await mobileNav.locator("summary").filter({ hasText: "What we do" }).click();
        await mobileNav.getByRole("link", { name: /Open Finance/ }).click();
      } else {
        const nav = page.getByRole("navigation", { name: "Primary navigation" });
        await nav.getByRole("button", { name: "What we do" }).click();
        await nav.getByRole("link", { name: /Open Finance/ }).click();
      }
      await expect(page).toHaveURL(/\/open-finance$/);
      await page.getByRole("link", { name: "Explore the complimentary review" }).click();
      await expect(page).toHaveURL(/#readiness-review$/);
      const review = page.getByRole("region", { name: "Open Finance Readiness & Value Review" });
      await expect(review.getByRole("heading", { name: "A short fit call" })).toBeVisible();
      await expect(review.getByRole("heading", { name: "A 60-minute working session" })).toBeVisible();
      await expect(review.getByRole("heading", { name: "A two-page takeaway" })).toBeVisible();
      const booking = review.getByRole("link", { name: "Book a fit call" });
      await expect(booking).toHaveAttribute("href", bookingUrl);
      await expect(booking).toHaveAttribute("target", "_blank");
      await expect(booking).toHaveAttribute("rel", "noopener noreferrer");
      await expect(review.getByRole("link", { name: "Request the review by email" }))
        .toHaveAttribute("href", mailtoHref("Open Finance Readiness & Value Review"));
      await expect(review).toContainText("Do not send customer data, credentials or internal bank documents.");

      await review.getByRole("link", { name: "View illustrative takeaway" }).click();
      await expect(page).toHaveURL(/#illustrative-takeaway$/);
      const example = page.locator("#illustrative-takeaway");
      await expect(example).toContainText("Illustrative structure only.");
      await expect(example.getByRole("article")).toHaveCount(2);
      await expect(example.getByRole("article").first().getByRole("listitem")).toHaveCount(3);
      await expect(example.getByRole("article").last().getByRole("listitem")).toHaveCount(3);
      await expect(example).toContainText("No delivery dates or outcomes are committed");
      await expect(page.locator("#engage")).toContainText("optional and separately agreed");

      // Check visible text and controls, not just scrollWidth: the page clips
      // overflow, which can hide a too-wide grid from a document-width assertion.
      const overflow = await page.locator("#readiness-review, #illustrative-takeaway")
        .evaluateAll((sections) => sections.flatMap((section) =>
          [...section.querySelectorAll("h2, h3, h4, p, a")].filter((node) => {
            const rect = node.getBoundingClientRect();
            return rect.left < -1 || rect.right > innerWidth + 1 || node.scrollWidth > node.clientWidth + 1;
          }).map((node) => node.textContent?.trim()),
        ));
      expect(overflow).toEqual([]);
      await review.getByRole("link", { name: "privacy notice" }).click();
      await expect(page).toHaveURL(/\/privacy$/);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }

  test.describe(`review without JavaScript in ${colorScheme}`, () => {
    test.use({ javaScriptEnabled: false, colorScheme, reducedMotion: "reduce" });
    for (const width of [320, 390, 1440]) test(`keeps the contact route usable at ${width}px after the email rewrite`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/open-finance");
      // Exercise native keyboard navigation without requiring hydration.
      await page.getByRole("link", { name: "Explore the complimentary review" }).press("Enter");
      await expect(page).toHaveURL(/#readiness-review$/);
      await expect(page.getByRole("heading", { name: "Open Finance Readiness & Value Review" })).toBeVisible();
      const email = page.getByRole("link", { name: "Request the review by email" });
      await expect(email).toHaveCount(1);
      await expect(email).toHaveAttribute("href", `mailto:${contactEmail}?subject=Open%20Finance%20Readiness%20%26%20Value%20Review`);
      await email.focus();
      await page.keyboard.press("Tab");
      await page.keyboard.press("Shift+Tab");
      await expect(email).toBeFocused();
      await expect(email).toHaveCSS("outline-style", "solid");
      const contrast = await email.evaluate((element) => {
        const luminance = (color: string) => {
          const c = (color.match(/[\d.]+/g) ?? []).slice(0, 3).map((value) => {
            const channel = Number(value) / 255;
            return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
          });
          return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
        };
        const background = luminance(getComputedStyle(document.body).backgroundColor);
        const ratio = (color: string) => (Math.max(luminance(color), background) + 0.05) / (Math.min(luminance(color), background) + 0.05);
        const style = getComputedStyle(element);
        return { text: ratio(style.color), focus: ratio(style.outlineColor) };
      });
      expect(contrast.text).toBeGreaterThanOrEqual(4.5);
      expect(contrast.focus).toBeGreaterThanOrEqual(3);
      const bounds = await email.boundingBox();
      expect(bounds).not.toBeNull();
      expect(bounds!.x).toBeGreaterThanOrEqual(0);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      await expect(page.getByRole("link", { name: "Book a fit call" })).toHaveAttribute("href", bookingUrl);
      await page.locator("#readiness-review").getByRole("link", { name: "View illustrative takeaway" }).press("Enter");
      await expect(page).toHaveURL(/#illustrative-takeaway$/);
      await expect(page.getByRole("heading", { name: "What the two-page takeaway can look like." })).toBeInViewport();
      await expect(page.getByRole("heading", { name: "A suggested 90-day sequence" })).toBeVisible();
      await page.locator("#readiness-review").getByRole("link", { name: "privacy notice" }).press("Enter");
      await expect(page).toHaveURL(/\/privacy$/);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  });
}

for (const colorScheme of ["light", "dark"] as const) {
  test(`keyboard journey and focus contrast in ${colorScheme}`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.goto("/open-finance");
    const entry = page.getByRole("link", { name: "Explore the complimentary review" });
    await entry.focus();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Shift+Tab");
    await expect(entry).toBeFocused();
    await expect(entry).toHaveCSS("outline-style", "solid");
    await page.keyboard.press("Enter");
    await expect(page.locator("#readiness-review")).toBeFocused();
    const booking = page.getByRole("link", { name: "Book a fit call" });
    for (const link of [booking, page.getByRole("link", { name: "Request the review by email" }),
      page.getByRole("link", { name: "privacy notice" }), page.getByRole("link", { name: "Discuss paid advisory" })]) {
      await link.focus();
      await expect(link).toHaveCSS("outline-style", "solid");
      const ratio = await link.evaluate((element) => {
        const luminance = (color: string) => {
          const channels = (color.match(/[\d.]+/g) ?? []).slice(0, 3).map((value) => {
            const c = Number(value) / 255;
            return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
          });
          return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
        };
        // The offset ring sits on the page or the inverse paid-advisory panel.
        const surface = element.closest("#engage") ?? document.body;
        const background = luminance(getComputedStyle(surface).backgroundColor);
        const foreground = luminance(getComputedStyle(element).outlineColor);
        return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
      });
      expect(ratio, await link.innerText()).toBeGreaterThanOrEqual(3);
    }
    expect((await new AxeBuilder({ page }).include("#readiness-review").analyze()).violations).toEqual([]);
    await booking.focus();
    const [popup] = await Promise.all([
      page.waitForEvent("popup"),
      page.keyboard.press("Enter"),
    ]);
    await popup.waitForLoadState("domcontentloaded");
    await expect(popup).toHaveURL(bookingUrl);
    await expect(popup).toHaveTitle("Intercepted contact handoff");
  });
}

test("review contact path and schema references use the canonical site", async ({ page }) => {
  await page.goto("/open-finance");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${siteOrigin}/open-finance`);
  const graphs = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.flatMap((script) => { const data = JSON.parse(script.textContent ?? "{}"); return data["@graph"] ?? [data]; }),
  );
  const service = graphs.find((node) => node["@type"] === "Service");
  expect(service["@id"]).toBe(`${siteOrigin}/open-finance#service`);
  expect(service.provider["@id"]).toBe(`${siteOrigin}/#organization`);
  const review = page.locator("#readiness-review");
  await expect(review.getByRole("link", { name: "Request the review by email" })).toHaveAttribute("href", mailtoHref("Open Finance Readiness & Value Review"));
  await review.getByRole("link", { name: "privacy notice" }).click();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${siteOrigin}/privacy`);
  await page.goto("/");
  await expect(page.locator("#expertise")).toHaveCount(1);
  const homeGraph = await page.locator('script[type="application/ld+json"]').evaluateAll((scripts) =>
    scripts.flatMap((script) => { const data = JSON.parse(script.textContent ?? "{}"); return data["@graph"] ?? [data]; }),
  );
  expect(homeGraph.some((node) => node["@id"] === service.provider["@id"])).toBe(true);
});
