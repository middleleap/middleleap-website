import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { engagementModels } from "../lib/engagements";
import { ecosystemContributions, portfolioProjects } from "../lib/ventures";
import { routes } from "../lib/routes";

const profiles = [
  { name: "desktop", viewport: { width: 1440, height: 1000 } },
  { name: "mobile", viewport: { width: 390, height: 844 } },
];

for (const profile of profiles) {
  for (const colorScheme of ["light", "dark"] as const) {
    test.describe(`${profile.name} / ${colorScheme} link journeys`, () => {
      test.use({ viewport: profile.viewport, colorScheme, reducedMotion: "reduce" });

      test("venture names and build-record actions reach the same record", async ({ page }) => {
        for (const route of ["/", "/ventures"]) {
          for (const project of portfolioProjects.filter((project) => project.detailPath)) {
            await page.goto(route);
            const card = page.getByRole("article").filter({
              has: page.getByRole("heading", { name: project.name, exact: true }),
            });
            const title = card.getByRole("link", { name: project.name, exact: true });
            const action = card.getByRole("link", { name: `Read ${project.name}'s build record`, exact: true });
            await expect(title).toHaveAttribute("href", project.detailPath!);
            await expect(action).toHaveAttribute("href", project.detailPath!);
            // A keyboard user can move from the title to its explicit action.
            await title.focus();
            await page.keyboard.press("Tab");
            await expect(action).toBeFocused();
            await page.keyboard.press("Enter");
            await expect(page).toHaveURL(new RegExp(`${project.detailPath}$`));
            await expect(page.locator("h1")).toContainText(project.name === "Open Finance Backoffice" ? "Backoffice" : project.name);
            await page.goto(route);
            await page.getByRole("article").filter({
              has: page.getByRole("heading", { name: project.name, exact: true }),
            }).getByRole("link", { name: project.name, exact: true }).click();
            await expect(page).toHaveURL(new RegExp(`${project.detailPath}$`));
          }
        }
      });

      test("operating-model destinations navigate to the named content", async ({ page }) => {
        const destinations = [
          ["What we do", "/#expertise"],
          ["How we work", "/#method"],
          ["Experience", "/#experience"],
          ["The Loom", "/the-loom"],
          ["The Loom Toolkit", "/ai-dlc"],
          ["Portfolio", "/ventures#portfolio"],
          ["Venture Studio", "/ventures/studio"],
        ];
        for (const [label, destination] of destinations) {
          await page.goto("/");
          const link = page.getByRole("group", { name: "MiddleLeap company operating model", exact: true })
            .getByRole("link", { name: label, exact: true });
          await link.click();
          await expect(page).toHaveURL(`http://127.0.0.1:4788${destination}`);
          if (destination.includes("#")) {
            const section = page.locator(`#${destination.split("#")[1]}`);
            await expect(section).toBeInViewport();
          } else {
            await expect(page.locator("h1")).toBeVisible();
          }
        }
      });

      test("capabilities, practice and engagement summaries have useful onward journeys", async ({ page }) => {
        const capabilities = [
          ["Explore Open Finance advisory →", "/open-finance"],
          ["Discuss platform strategy →", "/#engage"],
          ["Explore governed AI delivery →", "/the-loom"],
          ["Explore engagement models →", "/how-we-engage"],
        ];
        for (const [label, destination] of capabilities) {
          await page.goto("/");
          await page.locator("#expertise").getByRole("link", { name: label, exact: true }).click();
          await expect(page).toHaveURL(`http://127.0.0.1:4788${destination}`);
        }
        await page.goto("/");
        await page.getByRole("link", { name: "How the practice works →", exact: true }).click();
        await expect(page).toHaveURL(/\/practice$/);
        for (const route of ["/", "/open-finance"]) {
          for (const model of engagementModels) {
            await page.goto(route);
            const name = route === "/" ? model.label : `Explore ${model.label}`;
            await page.locator("#engage").getByRole("link", { name, exact: true }).click();
            await expect(page).toHaveURL(`http://127.0.0.1:4788${model.href}`);
            await expect(page.locator(`#${model.key}`)).toBeInViewport();
          }
          await page.goto(route);
          await page.locator("#engage").getByRole("link", { name: "Explore engagement models →", exact: true }).click();
          await expect(page).toHaveURL(/\/how-we-engage#models$/);
        }
      });

      test("external product names preserve distinct live-product destinations", async ({ page }) => {
        // Exercise popup creation without relying on third-party application state.
        // Their real HTTP availability is checked separately during the review.
        await page.context().route(/^https:\/\//, (route) => route.fulfill({
          status: 200, contentType: "text/html", body: "<title>External destination</title>",
        }));
        await page.goto("/ventures");
        for (const contribution of ecosystemContributions) {
          const title = page.getByRole("link", { name: `${contribution.name} ↗`, exact: true });
          const [popup] = await Promise.all([page.waitForEvent("popup"), title.click()]);
          await popup.waitForLoadState("domcontentloaded");
          expect(popup.url()).toBe(contribution.href);
          await popup.close();
        }
        const declare = portfolioProjects.find((project) => project.name === "Declare")!;
        for (const path of ["/", "/ventures"]) {
          await page.goto(path);
          const [popup] = await Promise.all([
            page.waitForEvent("popup"),
            page.getByRole("link", { name: "Declare ↗", exact: true }).click(),
          ]);
          await popup.waitForLoadState("domcontentloaded");
          expect(popup.url()).toBe(declare.href);
          await popup.close();
        }
        await page.goto("/ai-dlc");
        for (const [name, directory] of [
          ["Open Finance Intelligence ↗", "middleleap-open-finance-uae"],
          ["UAE Banking Intelligence ↗", "middleleap-banking-uae"],
        ]) {
          const [popup] = await Promise.all([
            page.waitForEvent("popup"), page.getByRole("link", { name, exact: true }).click(),
          ]);
          await popup.waitForLoadState("domcontentloaded");
          expect(popup.url()).toBe(`https://github.com/middleleap/ai-dlc/tree/main/plugins/${directory}`);
          await popup.close();
        }
      });

      test("global navigation reaches the portfolio and closes the mobile menu", async ({ page }) => {
        await page.goto("/");
        if (profile.name === "mobile") {
          await page.locator("header > details > summary").click();
          await page.getByRole("navigation", { name: "Mobile navigation", exact: true })
            .locator("summary").filter({ hasText: "Ventures" }).click();
          await page.getByRole("navigation", { name: "Mobile navigation", exact: true })
            .getByRole("link", { name: "Ventures overview", exact: false }).click();
          await expect(page.locator("header > details")).not.toHaveAttribute("open", "");
        } else {
          await page.getByRole("button", { name: "Ventures", exact: true }).click();
          await page.locator("#nav-panel-ventures").getByRole("link", { name: /Ventures overview/ }).click();
        }
        await expect(page).toHaveURL(/\/ventures$/);
        await page.getByRole("link", { name: "Explore the portfolio", exact: true }).click();
        await expect(page.locator("#portfolio")).toBeInViewport();
      });

      test("all public routes resolve their internal links, including cross-page fragments", async ({ page, request }) => {
        const documents = new Map<string, string>();
        for (const route of routes) {
          await page.goto(route.path);
          const destinations = await page.locator("a[href]").evaluateAll((anchors) => {
            return [...new Set(anchors.map((anchor) => new URL((anchor as HTMLAnchorElement).href))
              .filter((url) => url.origin === location.origin)
              .map((url) => `${url.pathname}${url.hash}`))];
          });
          for (const destination of destinations) {
            const [path, hash] = destination.split("#");
            if (!documents.has(path)) {
              const response = await request.get(path);
              expect(response.status(), `${route.path} → ${destination}`).toBe(200);
              documents.set(path, await response.text());
            }
            if (hash) expect(documents.get(path), `${route.path} → ${destination}`).toContain(`id="${decodeURIComponent(hash)}"`);
          }
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
          expect(overflow, `${route.path} overflows the ${profile.name} viewport`).toBe(false);
        }
      });

      test("changed navigation surfaces retain accessible links", async ({ page }) => {
        for (const route of ["/", "/ventures", "/open-finance", "/ai-dlc", "/how-we-engage"]) {
          await page.goto(route);
          const results = await new AxeBuilder({ page }).analyze();
          expect(results.violations.filter((v) => ["serious", "critical"].includes(v.impact ?? ""))
            .map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.html) }))).toEqual([]);
          await expect(page.locator("a a")).toHaveCount(0);
        }
      });
    });
  }
}
