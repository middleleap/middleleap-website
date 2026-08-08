# CLAUDE.md

## Project overview

MiddleLeap.com is the website for an independent Dubai-based advisory firm helping banks, fintechs, financial infrastructure providers and regulated platform businesses move from strategic mandate to market execution.

The firm's core capabilities are regulatory and market transformation, platform and ecosystem strategy, AI-native operating models, and transformation delivery. AI-DLC is positioned as an execution capability rather than the firm's umbrella identity.

## Current architecture

- Next.js 16 App Router with React 19 and TypeScript
- Static export through `output: "export"` (no server; `next build --webpack` is used because the build opts out of Turbopack while `reactCompiler` is enabled)
- Routes under `app/`: `/` (advisory homepage), `/open-finance`, `/the-loom`, `/ai-dlc`, `/ventures` plus venture detail pages (`/ventures/studio`, `/ventures/backoffice`, `/ventures/hivemind`, `/ventures/parqo`), `/privacy`, `/venture-submission-terms`
- Styling: route-scoped CSS Modules per page plus shared chrome styles in `components/SiteChrome.module.css`; global reset, fonts and grain overlay in `app/globals.css`
- **`brand-kit/` is a build dependency**: `app/globals.css` imports `brand-kit/tokens.css`, which holds all colour/type tokens including the light-theme override — do not delete or move it casually
- Shared components in `components/`: `SiteHeader` (nav, breadcrumbs, scrollspy), `SiteFooter`, `BrandLockup` (canonical lockup), `ThemeToggle`, `MandateSystem`, `ExecutiveSummary`, `VenturesPortfolio`, `RelatedPortfolio`, `VentureProposalForm` (client-side mailto form, no backend)
- Data/logic in `lib/`: `ventures.ts` (portfolio data), `theme.ts` (theme mode parsing/resolution — the FOUC-prevention boot script in `app/layout.tsx` is serialized from these functions), `legal.ts` (legal terms version)
- SEO: root metadata in `app/layout.tsx`, per-route metadata + canonicals on each page, generated OG/Twitter images (`app/opengraph-image.tsx`), `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt`
- Theme system: three-state (auto/light/dark) via `data-theme`/`data-theme-mode` attributes, localStorage key `middleleap-theme`, tokens in `brand-kit/tokens.css`

## Brand system

Tokens live in `brand-kit/tokens.css` (canonical source):

- Ink (background): `--ink-0: #080808`
- Bone (text): `--bone-0: #ECE9E1`, `--bone-1: #DEDBD4`
- Ember (signal orange): `--ember-500: #E65C2D`
- Headlines: Instrument Serif
- Body: DM Sans
- Interface labels: JetBrains Mono

Use a calm, executive, evidence-led tone. Lead with regulated markets, platform businesses and strategic mandates. Avoid reviving the retired 20× Company, Agent Factory or developer-productivity positioning as the main company story.

## Commands

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run type-check`
- `npm run test` (watch) / `npm run test:run` (CI)
- `npm run test:e2e` — Playwright smoke + axe accessibility checks over the built `out/` (run `npm run build` first)
- `npm run check:contrast` — WCAG contrast gate over the brand token pairings

CI (`.github/workflows/ci.yml`) runs lint, type-check, contrast check, unit tests, the static build, Playwright smoke + axe, and Lighthouse budgets over every exported page (`lighthouserc.js`).

## Roadmap

See `docs/IMPROVEMENT_PLAN.md` for the phased improvement plan (correctness, hygiene, refactoring, testing, accessibility, strategic content).
