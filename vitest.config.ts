import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    exclude: ["e2e/**", "node_modules/**"],
    css: false,
    coverage: {
      provider: "v8",
      include: [
        "lib/**",
        "components/CTA.tsx",
        "components/SpecGenerator.tsx",
        "components/SelfAssessment.tsx",
        "components/ROICalculator.tsx",
        "components/Nav.tsx",
        "components/Hero.tsx",
        "components/Footer.tsx",
        "components/Problem.tsx",
        "components/Shift.tsx",
        "components/Roadmap.tsx",
      ],
      exclude: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
      thresholds: {
        statements: 60,
        branches: 60,
        functions: 60,
        lines: 60,
      },
    },
  },
});
