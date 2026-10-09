import { expect, test } from "@playwright/test";

for (const route of ["/", "/the-loom"]) {
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
}
