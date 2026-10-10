import { expect, test } from "@playwright/test";

for (const theme of ["dark", "light"] as const) {
  test.describe(`${theme} Ceramic Pivot`, () => {
    test.use({ colorScheme: theme });

    test("hero plays once, supports pause and replay, and returns to its matching poster", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto("/");
      const figure = page.locator(`figure[data-art-theme="${theme}"]`);
      const video = figure.locator("video");
      await figure.scrollIntoViewIfNeeded();
      await expect(figure).toHaveAttribute("data-playback", "playing");
      expect(await video.evaluate((element: HTMLVideoElement) => ({
        muted: element.muted, loop: element.loop, duration: element.duration,
      }))).toEqual({ muted: true, loop: false, duration: 8 });
      await page.getByRole("button", { name: "Pause animation" }).click();
      await expect(figure).toHaveAttribute("data-playback", "paused");
      expect(await video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
      await page.getByRole("button", { name: "Resume animation" }).click();
      await expect(figure).toHaveAttribute("data-playback", "finished", { timeout: 12000 });
      await expect(video).toHaveCSS("opacity", "0");
      await page.getByRole("button", { name: "Replay animation" }).click();
      await expect(figure).toHaveAttribute("data-playback", "playing");
      expect(await video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeLessThan(2);
      // A preference change stops even an already playing film.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await expect(figure).toHaveAttribute("data-playback", "still");
      await expect(video).not.toHaveAttribute("src");
    });

    test("reduced motion loads only the poster until the visitor requests playback", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      const films: string[] = [];
      page.on("request", (request) => {
        if (/pivot(?:-light)?\.mp4$/.test(request.url())) films.push(request.url());
      });
      await page.goto("/");
      const figure = page.locator(`figure[data-art-theme="${theme}"]`);
      await figure.scrollIntoViewIfNeeded();
      await expect(figure.locator("img")).toBeVisible();
      await expect.poll(() => figure.locator("img").evaluate((img: HTMLImageElement) => img.naturalWidth)).toBe(1440);
      await page.waitForTimeout(1500);
      expect(films).toEqual([]);
      await expect(figure).toHaveAttribute("data-playback", "still");
      await page.getByRole("button", { name: "Play animation" }).click();
      await expect(figure).toHaveAttribute("data-playback", "playing");
      expect(films.length).toBeGreaterThan(0);
    });

    test("failed media retains the artwork without collapsing the mobile layout", async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.route("**/media/ceramic-pivot/*.mp4", (route) => route.abort());
      await page.goto("/");
      const figure = page.locator(`figure[data-art-theme="${theme}"]`);
      await figure.scrollIntoViewIfNeeded();
      await expect(figure).toHaveAttribute("data-playback", "unavailable");
      await expect(figure.locator("img")).toBeVisible();
      await expect(figure.locator("video")).toHaveCSS("opacity", "0");
      const dimensions = await page.evaluate((theme) => ({
        viewport: window.innerWidth, content: document.documentElement.scrollWidth,
        frame: document.querySelector(`figure[data-art-theme="${theme}"] img`)!.getBoundingClientRect().height,
      }), theme);
      expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
      expect(dimensions.frame).toBeGreaterThan(200);
    });

  });
}

test("switching themes swaps the film and stops the outgoing animation", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  const assets: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/media/ceramic-pivot/")) assets.push(request.url());
  });
  await page.goto("/");
  const dark = page.locator('figure[data-art-theme="dark"]');
  const light = page.locator('figure[data-art-theme="light"]');
  await dark.scrollIntoViewIfNeeded();
  await expect(dark).toHaveAttribute("data-playback", "playing");
  expect(assets.some((url) => /(?:pivot|poster)-light\./.test(url))).toBe(false);
  await page.getByRole("radio", { name: "Use light theme" }).click();
  await expect(dark).toBeHidden();
  await expect(dark.locator("video")).not.toHaveAttribute("src");
  await expect(light).toBeVisible();
  await light.scrollIntoViewIfNeeded();
  await expect(light).toHaveAttribute("data-playback", "playing");
  await expect(light.locator("video")).toHaveAttribute("src", /pivot-light\.mp4$/);
  await page.getByRole("radio", { name: "Use dark theme" }).click();
  await expect(light.locator("video")).not.toHaveAttribute("src");
  await expect(dark).toHaveAttribute("data-playback", "finished");
  await page.getByRole("button", { name: "Replay animation" }).click();
  await expect(dark).toHaveAttribute("data-playback", "playing");
});

test("automatic theme follows the system with matching reduced-motion artwork", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/");
  const dark = page.locator('figure[data-art-theme="dark"]');
  const light = page.locator('figure[data-art-theme="light"]');
  await expect(dark).toBeVisible();
  await page.emulateMedia({ colorScheme: "light" });
  await expect(light).toBeVisible();
  await expect(dark).toBeHidden();
  await expect(light.locator("img")).toHaveAttribute("src", /poster-light\.webp$/);
  await expect(page.locator("figure video[src]")).toHaveCount(0);
  await page.getByRole("radio", { name: "Use dark theme" }).click();
  await expect(dark).toBeVisible();
  // An explicit theme keeps its matching artwork when the system changes.
  await page.emulateMedia({ colorScheme: "dark" });
  await page.emulateMedia({ colorScheme: "light" });
  await expect(dark).toBeVisible();
  await expect(light).toBeHidden();
});
