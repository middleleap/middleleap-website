# CLAUDE.md

## Project overview

MiddleLeap.com is the website for an independent Dubai-based advisory firm helping banks, fintechs, financial infrastructure providers and regulated platform businesses move from strategic mandate to market execution.

The firm's core capabilities are regulatory and market transformation, platform and ecosystem strategy, AI-native operating models, and transformation delivery. AI-DLC is positioned as an execution capability rather than the firm's umbrella identity.

The homepage connects these capabilities to institutional intelligence: each engagement delivers working capability and approved knowledge the institution can own. The Institutional Brain is the private asset, BrainKit initializes its governed Brainstem, and The Loom applies that context through discovery and delivery.

## Current architecture

- Next.js 16 App Router with React 19 and TypeScript
- Type checking uses the native TypeScript 7 `tsc` executable. The official `@typescript/typescript6` alias supplies the compiler API expected by lint tooling and Next's complete build check; both checks remain enabled. ESLint 10 uses the official compatibility adapter for Next's legacy plugin APIs.
- Static export through `output: "export"` (`next build --webpack` is used because the build opts out of Turbopack while `reactCompiler` is enabled). The server code is two Cloudflare Pages Functions: the Markdown middleware below, and `functions/api/propose.ts`, which emails Venture Studio proposals via Resend and needs the `RESEND_API_KEY` secret on the Pages project (see `.env.example`). Mail is sent from the `mail.middleleap.com` subdomain, which is the domain verified in Resend
- Markdown for Agents: a Next.js build adapter (`adapterPath` in `next.config.ts` → `scripts/markdown-adapter.mjs`) runs `scripts/build-markdown.mjs` at the end of every `next build`, whatever the bundler or build command, writing a Markdown twin of every exported page (`out/<route>.md`). `functions/_middleware.ts` serves the twin at the page URL when a request prefers `Accept: text/markdown` (negotiation helpers in `lib/markdown-negotiation.ts`); browsers keep the HTML. `public/_routes.json` limits Functions to page routes and `/api/*`: add every new page there (`npm run seo:check` fails otherwise), and add any new Function path outside `/api/*`
- Routes under `app/`: `/` (advisory homepage), `/institutional-intelligence`, `/institutional-brain`, `/open-finance`, `/the-loom`, `/ai-dlc`, `/practice`, `/how-we-engage`, `/founder` (founder profile, data in `lib/founder.ts`), `/ventures` plus venture detail pages (`/ventures/studio`, `/ventures/backoffice`, `/ventures/hivemind`, `/ventures/setbay`; `/ventures/parqo` 301-redirects to Setbay via `public/_redirects`), `/privacy`, `/venture-submission-terms`. Prototype names `/brainkit` and `/toolkit` redirect to `/institutional-brain` and `/ai-dlc`.
- Styling: route-scoped CSS Modules per page plus shared chrome styles in `components/SiteChrome.module.css`; global reset, fonts and grain overlay in `app/globals.css`
- **`brand-kit/` is a build dependency**: `app/globals.css` imports `brand-kit/tokens.css`, which holds all colour/type tokens including the light-theme override — do not delete or move it casually
- Shared components in `components/`: `SiteHeader` (nav, breadcrumbs, scrollspy), `SiteFooter`, `BrandLockup` (canonical lockup), `ThemeToggle`, `LoomMark` (pausable pivot loop with a settled reduced-motion state), `InstitutionalIntelligenceSystem`, `ExecutiveSummary`, `VenturesPortfolio`, `RelatedPortfolio`, `VentureProposalForm` (posts to `/api/propose`, falls back to mailto/copy when the endpoint is unavailable). Each canonical page has one focusable `h1#main-content` for the shared keyboard skip link.
- Data/logic in `lib/`: `ventures.ts` (portfolio data), `proposal.ts` (proposal field limits, validation and email serialisation shared by the form and the Pages Function), `theme.ts` (theme mode parsing/resolution — the FOUC-prevention boot script in `app/layout.tsx` is serialized from these functions), `legal.ts` (legal terms version)
- SEO: root metadata in `app/layout.tsx`, per-route metadata + canonicals on each page, generated OG/Twitter images (`app/opengraph-image.tsx`), `app/sitemap.ts`, `app/robots.txt/route.ts` (policy + Content Signals in `lib/robots.ts`), `public/llms.txt`
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
