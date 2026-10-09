import { defineConfig } from "@playwright/test";

// Smoke-tests the exported static site in out/ — build first (npm run build).
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://127.0.0.1:4788",
    // Some CI/sandbox environments preinstall a Chromium at a fixed path
    // instead of the version-matched Playwright download.
    ...(process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH } }
      : {}),
  },
  webServer: {
    command: "npx serve out -l 4788",
    url: "http://127.0.0.1:4788",
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
