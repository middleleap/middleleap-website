# CLAUDE.md

## Project overview

MiddleLeap.com is the website for an independent Dubai-based advisory firm helping banks, fintechs, financial infrastructure providers and regulated platform businesses move from strategic mandate to market execution.

The firm's core capabilities are regulatory and market transformation, platform and ecosystem strategy, AI-native operating models, and transformation delivery. AI-DLC is positioned as an execution capability rather than the firm's umbrella identity.

## Current architecture

- Next.js 16 App Router with React 19 and TypeScript
- Static export through `output: "export"`
- Single advisory homepage in `app/page.tsx`
- Route-scoped styling in `app/page.module.css`
- Global reset, fonts, grain and cursor styles in `app/globals.css`
- Shared canonical lockup in `components/BrandLockup.tsx`
- Generated Open Graph and Twitter images

## Brand system

- Background: `#090908`
- Primary text: `#eeeae0`
- Signal orange: `#e65c2d`
- Headlines: Instrument Serif
- Body: DM Sans
- Interface labels: JetBrains Mono

Use a calm, executive, evidence-led tone. Lead with regulated markets, platform businesses and strategic mandates. Avoid reviving the retired 20× Company, Agent Factory or developer-productivity positioning as the main company story.

## Commands

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run type-check`
- `npm run test:run`
