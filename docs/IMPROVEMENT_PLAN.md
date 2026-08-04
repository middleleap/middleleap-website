# MiddleLeap.com — Codebase & Website Improvement Plan

Date: 2026-08-04
Inputs: full codebase audit (all 11 routes, components, config, CI), competitive research
across best-in-class boutique advisory sites (11:FS, Flagship Advisory Partners, Elixirr,
Aperture, Oliver Wyman, AlixPartners, WhiteSight), and current Next.js 16 static-export
best-practice research.

---

## Where the site stands

The foundation is stronger than most marketing sites: 11 static routes, a lean
3-dependency runtime, strict TypeScript, per-route metadata with canonicals, generated
OG images, a well-built `llms.txt`, a tested theme system with FOUC prevention, CI with
lint/type-check/tests/build/Lighthouse budgets, and zero TODO/FIXME debt. The retired
20× Company / Agent Factory positioning is fully purged. Internal links all resolve.

The external research verdict: the dark-editorial design direction (near-black ground,
oversized serif, restrained motion) is exactly where 2026 B2B design trends sit. The gap
versus comparable firms is **not aesthetics — it is content depth, a people layer, and
lead-gen paths**, plus a set of fixable correctness and hygiene issues below.

---

## Phase 1 — Correctness fixes (small, do first)

1. **Plausible analytics loads unconditionally.** `app/layout.tsx:9` uses
   `process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "www.middleleap.com"` — the fallback
   makes the guard at line 126 always truthy, so the script ships in every build
   (including dev/previews), contradicting the code comment and `.env.example`.
   Fix: use `|| undefined` semantics and drop the hardcoded default.
2. **Theme boot script duplicates `lib/theme.ts` by hand.** The minified string at
   `app/layout.tsx:11` re-implements `parseThemeMode`/`resolveTheme` and re-states the
   storage key literal. The tested implementation and the shipped-first implementation
   can silently diverge. Fix: generate the boot script from the tested functions (or at
   minimum add a unit test asserting behavioral equivalence and share the key constant).
3. **`SiteHeader` scrollspy is the site's main INP risk.** `components/SiteHeader.tsx:102–127`
   runs unthrottled `querySelector` + `getBoundingClientRect` per context link on every
   scroll event, and the `contextLinks` dependency is a new array literal each render, so
   the effect re-subscribes constantly. Fix: `IntersectionObserver` + stable deps. Also
   simplify the 5-listener hash-scroll workaround (lines 74–100) once scroll-margin
   handling is cleaned up.
4. **Verify Open Graph shallow-merge output.** Pages that define partial `openGraph`
   objects (e.g. `app/the-loom/page.tsx:13–18`) replace the root object, likely dropping
   `siteName`/`locale`/`type`; the root layout also declares `og:image` manually while
   `opengraph-image.tsx` exists as a file convention (possible duplicate tags on `/`).
   Inspect `out/` after a build and normalize.
5. **`VentureProposalForm` mailto can silently fail.** Max field lengths total ~2,500
   chars pre-encoding — beyond practical `mailto:` limits in several clients. Warn users
   toward "Copy proposal" for long submissions, and move focus to the prepared-proposal
   section on submit (currently no focus management — screen-reader users get no signal).
6. **Terms version string duplicated in 3 places** (`VentureProposalForm.tsx:13`,
   `venture-submission-terms/page.tsx:16`, `privacy/page.tsx:16`). Centralize in `lib/`.

## Phase 2 — Repository hygiene (~1.4 MB of dead weight)

- Delete unreferenced files: 6 root-level PNGs (two byte-identical to `brand-kit/assets/`
  copies), `apps/` (orphaned monorepo skeleton from another project),
  `public/pivot-primary.svg`, `brand-kit/middleleap-brand-kit.zip` (binary in VCS),
  `brand-kit/pivot_anim.gif` (404 KB, unreferenced), and the three files duplicated
  between `brand-kit/` root and `brand-kit/assets/`.
- Remove both `docs/` legacy files: `20_ai_gtm_platform_architecture.md` is a Parqo
  design doc in the wrong repo; `ai-dlc-brainkit-rc8-handoff.md` is two RCs stale **and
  leaks a personal absolute filesystem path** (line 5).
- Delete ~170 lines of dead nav/footer CSS left from the SiteChrome extraction
  (`page.module.css`, `ventures.module.css` incl. the abandoned portfolio-explorer block
  at lines 90–149, `project.module.css`, `loom.module.css`, `ai-dlc.module.css`).
- `.gitignore`: add `*.zip`, editor dirs, and drop the Playwright entries or add
  Playwright for real (Phase 4).
- **Rewrite `CLAUDE.md`** — it claims a "single advisory homepage" (there are 11 routes),
  lists wrong brand hex values (actual tokens: `--ink-0 #080808`, `--bone-0 #ECE9E1`,
  `--ember-500 #E65C2D`), and never mentions that `brand-kit/tokens.css` is a build
  dependency or that a theme system exists. Make `AGENTS.md` a one-line pointer instead
  of a byte-identical copy that will drift.
- Config tidy: remove dead `NEXT_PUBLIC_BUTTONDOWN_USERNAME` (`.env.example`, `ci.yml:48`),
  remove the meaningless `start` script (no server exists under `output: "export"`),
  align `eslint-config-next` to `16.2.x` and `@types/node` to `^22`, add an `engines`
  field, and document why `build` uses `--webpack`. Consider removing Tailwind entirely —
  it is imported in `globals.css` but zero utility classes are used anywhere.

## Phase 3 — Code quality & structure

1. **Extract a `<ProjectPage>` component.** The three venture pages
   (backoffice/hivemind/parqo) are near-clones sharing an identical 8-section skeleton
   and byte-identical SVG connector paths. A data-driven component collapses ~700 lines
   to ~200 + typed data, and future ventures become a data file, not a page fork.
2. **Create shared CSS primitives.** `.eyebrow` is defined 15×, `.hero` 25×, `.engage`
   26×, `.primaryAction` 17× across route modules with drifting values. Move recurring
   primitives into a shared module (or extend `SiteChrome.module.css`) and fix the
   bidirectional `app/` ↔ `components/` CSS import coupling (route pages importing
   sibling routes' CSS, components importing route CSS).
3. **Move copy toward typed content files.** The site is ~90% hardcoded literals in TSX.
   Adopt the `content/*.ts` + `as const satisfies` pattern for repeating shapes
   (capabilities, engagement models, decisions, workstreams). Replace positional tuple
   arrays (`the-loom/page.tsx:36–43`, `studio/page.tsx:31–37`) with named fields.
4. **Single source of truth for proof figures.** "134 of ~139 stories", "2 + 1", venture
   evidence dates ("reviewed 11 July 2026") and pinned commits are hardcoded in up to
   three places each (`page.tsx`, `the-loom/page.tsx`, `llms.txt`, venture pages). Move
   into `lib/` data consumed everywhere; add a staleness check for evidence dates —
   these are public claims and aging silently has reputational cost.
5. **`lib/ventures.ts` cleanup**: drop the never-rendered `nextGate` field or render it;
   enable `noUnusedLocals`/`noUnusedParameters` (and consider `noUncheckedIndexedAccess`)
   in `tsconfig.json` to catch this class of drift.
6. Enable **`typedRoutes: true`** (stable in Next 16) — `<Link>` typos become compile
   errors for free.

## Phase 4 — Testing & CI hardening

Current suite: 3 files, ~7 assertions (theme unit tests, OG-image smoke, disclosure
guard). Good bones, big gaps:

1. **Audit all pages in Lighthouse CI, not just the homepage.** `lighthouserc.js:6`
   hardcodes `url: ["http://localhost/index.html"]`; removing it lets LHCI auto-discover
   all 11 exported pages — 10 routes currently have zero coverage, including the
   heaviest ones.
2. **Playwright smoke + axe over `out/`**: each page 200s, exactly one `h1`,
   title/description present, JSON-LD parses, nav links resolve; `@axe-core/playwright`
   failing on serious/critical violations. This is the 2026 standard pattern and would
   have caught the ARIA issues in Phase 5.
3. **Test `VentureProposalForm`** — the only interactive business logic on the site
   (serialization, mailto encoding, clipboard fallback, terms-version stamping) has zero
   tests. Add `jsdom` + Testing Library (vitest currently runs `environment: "node"`).
4. **Parity tests**: sitemap ↔ filesystem routes (a new route currently drops out of
   `sitemap.ts` silently — path knowledge is hand-maintained in three places: sitemap,
   footer, llms.txt), and `lib/ventures.ts` invariants (`detailPath` resolves).
5. **Widen the disclosure guard**: `app/disclosure.test.ts:5` scans only
   `app/components/lib/public` — extend to `docs/`, `brand-kit/`, and root markdown.
6. **CI efficiency & safety**: 4 jobs run 4 separate `npm ci`; add a `permissions:` block;
   pin actions; add Dependabot/Renovate; give the Lighthouse job report upload so a flaky
   run leaves evidence. Fix latent fragility: the type-check job never generates
   `next-env.d.ts`. Add `eslint-plugin-jsx-a11y` rules (current config misses all the
   ARIA misuse below). `npm run lint` already invokes the ESLint CLI directly — correct
   for Next 16, keep it.
7. Add a link checker (`lychee`/`linkinator`) over `out/` — internal every run, external
   weekly.

## Phase 5 — Accessibility (WCAG 2.2)

- **~7 `aria-label`s on role-less `<div>`s** (ignored by assistive tech) and **~11
  `role="img"` wrappers that swallow rich text** — screen-reader users currently lose
  the proof numbers entirely ("134/~139 stories" etc.). Replace with real landmarks/
  `role="group"` where appropriate, and let text be text.
- Skip link targets `#problem` but `<main>` isn't focusable (`tabIndex={-1}` missing) and
  the anchor name is stale; rename to `#main`.
- `ThemeToggle` should be a `radiogroup` (`role="radio"` + `aria-checked` + arrow keys),
  not three `aria-pressed` buttons.
- **Contrast headroom check**: ember `#E65C2D` on ink is ~4.6:1 — passes but with no
  margin; any muted variant or lighter panel fails. Wire the existing (currently
  orphaned) `brand-kit/scripts/check-contrast.mjs` into CI.
- Confirm `:focus-visible` rings site-wide, `prefers-reduced-motion` coverage for the
  grain overlay and MandateSystem auto-advance (partially present), and 24×24 target
  sizes on compact mono nav links.
- `BrandLockup` preloads both theme variants with `priority` on every page — one is
  always `display:none`. Branch or drop `priority`.

## Phase 6 — Strategic website evolution (from competitive research)

Ordered by evidence-backed impact for a boutique advisory firm (Hinge buyer research,
2025 Edelman–LinkedIn B2B thought-leadership data):

1. **People layer / named-partner page.** Boutique selection is driven by individual
   reputation ("Visible Expert" effect); the site currently has no people at all — the
   single biggest trust gap versus every comparable firm studied. Real bio, mandate
   history, headshot, `Person` JSON-LD, direct email, links to talks/posts.
2. **Ungated insights section with 3–5 cornerstone regulatory explainers** (e.g. "CBUAE
   Open Finance: what LFIs must do by phase", "AlTareq CX certification explained",
   "DIFC vs ADGM vs mainland licensing"). Law firms currently own these queries; almost
   no independent Dubai advisory firm owns the CBUAE Open Finance content niche — a
   genuine opening. Practitioner-voiced explainers with `Article` + FAQ schema are the
   fastest route to being the cited answer in both Google and AI answer engines
   (ChatGPT referral traffic +123% YoY; AI engines can only cite ungated content).
   Technical vehicle: **content-collections** (Contentlayer is abandoned) with Zod
   frontmatter feeding `generateStaticParams`, metadata, sitemap and Article JSON-LD in
   one pass. Don't add MDX tooling until 3+ pieces are actually committed.
3. **A named, recurring flagship asset** — e.g. a quarterly "UAE Open Finance Readiness
   Briefing" or annual "GCC Regulated Platforms Index" (the 11:FS Pulse / AlixPartners
   Disruption Index pattern). Highest-ROI credibility artifact per the research: it is
   simultaneously the gated lead-gen asset, the LinkedIn drumbeat, and the AI-citation
   target. Gate the PDF; keep an HTML executive summary open for citability.
4. **Split the contact path**: productized entry point ("Open Finance readiness
   briefing") with an embedded scheduler (~3× conversion vs bare forms), a short 4-field
   form, and newsletter capture with a stated cadence. 71% of B2B buyers barely talk to
   sales before shortlisting — the site must let a bank executive fully qualify the firm
   without a call.
5. **Anonymized, outcome-quantified engagement snapshots + an explicit "How we engage"
   page** (advisory retainer / strategy sprint / transformation mobilisation, senior
   staffing model, boutique-vs-big-firm rationale). Outcome-titled anonymized cards
   substitute for client logos where FS confidentiality applies.
6. **SEO/AEO polish**: add `BreadcrumbList` JSON-LD to the 8 routes that render visible
   breadcrumbs but only mark them up on `/open-finance`; type all JSON-LD with
   `schema-dts`; use real content dates in `sitemap.ts` instead of `new Date()` per
   build; fix the llms.txt drift (still describes the retired "profiles" vocabulary for
   The Loom, omits 2 routes, hardcodes proof figures a third time) — but note llms.txt
   is a hedge, not a strategy: Google explicitly ignores it; entity consistency and
   quotable ungated content are what earn AI citations.
7. **Decide `trailingSlash`** for static-host URL stability and keep canonicals in sync.

---

## Suggested sequencing

| Order | Work | Size | Value |
|---|---|---|---|
| 1 | Phase 1 correctness fixes | S | Stops shipping a real analytics bug + INP risk |
| 2 | Phase 2 hygiene + CLAUDE.md rewrite | S | Removes 1.4 MB dead weight, unblocks agents working accurately |
| 3 | Phase 4.1–4.2 (LHCI all pages, smoke+axe) | M | Locks in quality before refactors |
| 4 | Phase 3 refactors (ProjectPage, shared CSS, content files) | M–L | Halves duplication, makes content editable |
| 5 | Phase 5 accessibility pass | M | Fixes real AT-facing defects; protected by new CI |
| 6 | Phase 6.1–6.2 (people page, first explainers) | M | Biggest commercial impact |
| 7 | Phase 6.3–6.5 (flagship asset, lead-gen, engagement page) | L | Compounding credibility engine |

Phases 1–5 are pure engineering and can proceed without content decisions. Phase 6
needs founder input (bio, which explainers first, scheduler tooling) but items 6.1–6.2
can start with existing material.
