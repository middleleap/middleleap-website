# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MiddleLeap.com is the website for MiddleLeap Ventures, a UAE-based advisory practice helping engineering leaders transition from the SDLC to the AI-DLC (Adaptive Development Lifecycle). The site is both a manifesto and a conversion engine targeting CTOs, CPOs, and CIOs.

## Current State

The project is a **static HTML prototype** — a single-page scrolling site in `middleleap-v3.html` (565 lines) with all CSS and JS inline. There is no build system, no package.json, no framework. The PRD (`MiddleLeap_PRD_v1.1.md`) outlines a migration path to Next.js + Tailwind.

### Key Files

- `middleleap-v3.html` — Complete working prototype (HTML + inline CSS + inline JS)
- `MiddleLeap_PRD_v1.1.md` — Comprehensive PRD (v1.1) covering vision, personas, design system, content strategy, and phased roadmap
- `website design mock example.jpg` — Visual design reference

## Design System

### Color Palette (CSS custom properties in `:root`)
- `--void: #080808` (background)
- `--paper: #ece9e1` (primary text)
- `--signal: #e05a2b` (accent/CTAs — orange-red)
- `--ash: #1e1e1e` (borders), `--fog: #666` (secondary text), `--mist: #999`, `--bone: #d4d4cf`

### Typography
- Headlines: `Instrument Serif` (editorial/italic)
- Body: `DM Sans` (sans-serif)
- Code/UI: `JetBrains Mono` (monospace)

### Visual Identity
The aesthetic is dark, terminal-inspired with editorial typography. Key effects: custom cursor (dot + ring), particle network canvas background, grain texture overlay, scroll-reveal animations via IntersectionObserver, 3D flywheel canvas visualization, CRT scanline terminal blocks, animated stat counters.

## Site Sections (in scroll order)

1. **Hero** — Tagline "From Keystrokes to Decisions"
2. **The Problem** (`#problem`) — Manifesto on SDLC limitations
3. **The Shift** (`#shift`) — SDLC vs AI-DLC animated timeline comparison
4. **Mechanics** (`#mechanics`) — Three core mechanisms (Plan→Delegate→Assess→Codify)
5. **Roadmap** (`#roadmap`) — 4-stage maturity model
6. **Results** (`#results`) — Evidence and proof points with stat counters
7. **Built** (`#built`) — Build log / transparency section
8. **Lab** (`#lab`) — Open-source repositories
9. **Toolkit** (`#toolkit`) — Curated tool stack
10. **Signal** (`#signal`) — Content feed / essays
11. **CTA** (`#cta`) — Email capture
12. **Footer** — Navigation grid

## Planned Architecture (from PRD)

**Phase 1 (current):** Static HTML + Tailwind CSS (CDN), deploy to Vercel
**Phase 2:** Migrate to Next.js, component-ize sections, add MDX for blog content
**Phase 3:** GitHub API integration for Lab section, analytics (Plausible/PostHog)
**Phase 4:** User accounts, CRM integration, interactive spec module (Claude API)

### Target Performance
- Lighthouse: ≥95 all categories
- LCP: <2.5s, FCP: <1.2s, CLS: <0.1
- Bundle: <200KB excluding fonts

## Git Workflow

- Main branch for PRs: `main`
- Current working branch: `master`
