import { expect, test } from "@playwright/test";

for (const route of ["/the-loom"]) {
  test(`${route} lets visitors pause and resume the complete loop`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(route);
    const loop = page.getByRole("group", { name: /From strategic mandate|The Loom: a strategic mandate/ });
    await expect(loop.getByRole("listitem")).toHaveCount(6);
    const states = () => loop.evaluate((element) => element.getAnimations({ subtree: true })
      .filter((animation) => animation instanceof CSSAnimation).map((animation) => animation.playState));
    expect((await states()).length).toBeGreaterThan(0);
    await loop.getByRole("button", { name: "Pause loop" }).click();
    await expect(loop.getByRole("button", { name: "Resume loop" })).toHaveAttribute("aria-pressed", "true");
    expect((await states()).every((state) => state === "paused")).toBe(true);
    await loop.getByRole("button", { name: "Resume loop" }).click();
    await expect(loop.getByRole("button", { name: "Pause loop" })).toHaveAttribute("aria-pressed", "false");
    expect((await states()).every((state) => state === "running")).toBe(true);
  });

  test(`${route} presents the settled loop with reduced motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    const loop = page.getByRole("group", { name: /From strategic mandate|The Loom: a strategic mandate/ });
    await expect(loop.getByRole("listitem")).toHaveCount(6);
    await expect(loop.getByRole("button", { name: "Pause loop" })).toBeHidden();
    expect(await loop.evaluate((element) => element.getAnimations({ subtree: true }).length)).toBe(0);
    await expect(loop.locator("p em:visible")).toHaveCount(1);
  });

  test(`${route} keeps the pause label readable throughout theme changes`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
    await page.goto(route);
    await page.evaluate(() => document.fonts.ready);
    const pause = page.getByRole("button", { name: "Pause loop" });
    for (const theme of ["light", "dark"] as const) {
      await page.getByRole("radio", { name: `Use ${theme} theme` }).click();
      const minContrast = await pause.evaluate(async (button) => {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const context = canvas.getContext("2d")!;
        const luminance = (rgb: Uint8ClampedArray) => {
          const channels = [...rgb].slice(0, 3).map((value) => {
            const c = value / 255;
            return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
          });
          return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
        };
        let minimum = Infinity;
        for (let frame = 0; frame < 14; frame++) {
          await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
          context.clearRect(0, 0, 1, 1);
          // Composite the transparent button's ancestors, including color-mix,
          // rather than treating its transparent background as black.
          const ancestors: Element[] = [];
          for (let node: Element | null = button; node; node = node.parentElement) ancestors.unshift(node);
          for (const node of ancestors) {
            context.fillStyle = getComputedStyle(node).backgroundColor;
            context.fillRect(0, 0, 1, 1);
          }
          const background = luminance(context.getImageData(0, 0, 1, 1).data);
          context.fillStyle = getComputedStyle(button).color;
          context.fillRect(0, 0, 1, 1);
          const foreground = luminance(context.getImageData(0, 0, 1, 1).data);
          minimum = Math.min(minimum, (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05));
        }
        return minimum;
      });
      expect(minContrast, `${route} ${theme}: pause label`).toBeGreaterThanOrEqual(4.5);
    }
  });
}
