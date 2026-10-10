import { expect, test as base } from "@playwright/test";
import { bookingUrl, contactEmail, mailtoHref } from "../lib/contact";

// Verify the handoff without making a booking, opening an email client or sending
// traffic to a third party. The Calendar popup is an intercepted test destination.
const test = base.extend<{ safeContactHandoff: void }>({
  safeContactHandoff: [async ({ context }, use) => {
    await context.route("**/*", async (route) => {
      const request = route.request();
      if (!["GET", "HEAD"].includes(request.method())) {
        await route.abort();
      } else if (request.url() === bookingUrl) {
        await route.fulfill({
          status: 200,
          contentType: "text/html",
          body: "<!doctype html><title>Intercepted contact handoff</title><p>No booking request was sent.</p>",
        });
      } else if (new URL(request.url()).origin === "http://127.0.0.1:4788") {
        await route.continue();
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
    test.use({ javaScriptEnabled: false, colorScheme });
    test("keeps the offer, example and contact route readable", async ({ page }) => {
      await page.goto("/open-finance");
      // Exercise native keyboard navigation without requiring hydration.
      await page.getByRole("link", { name: "Explore the complimentary review" }).press("Enter");
      await expect(page).toHaveURL(/#readiness-review$/);
      await expect(page.getByRole("heading", { name: "Open Finance Readiness & Value Review" })).toBeVisible();
      await expect(page.getByRole("link", { name: "Request the review by email" }))
        .toHaveAttribute("href", `mailto:${contactEmail}?subject=Open%20Finance%20Readiness%20%26%20Value%20Review`);
      await page.locator("#readiness-review").getByRole("link", { name: "View illustrative takeaway" }).press("Enter");
      await expect(page).toHaveURL(/#illustrative-takeaway$/);
      await expect(page.getByRole("heading", { name: "A suggested 90-day sequence" })).toBeInViewport();
    });
  });
}

test("keyboard journey opens only an intercepted booking handoff", async ({ page }) => {
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
  await booking.focus();
  const [popup] = await Promise.all([
    page.waitForEvent("popup"),
    page.keyboard.press("Enter"),
  ]);
  await popup.waitForLoadState("domcontentloaded");
  await expect(popup).toHaveURL(bookingUrl);
  await expect(popup).toHaveTitle("Intercepted contact handoff");
});
