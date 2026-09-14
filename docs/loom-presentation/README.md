# Loom product presentation

This change integrates the approved visual mock into the advisory website. `/the-loom` explains the method; `/ai-dlc` presents the adoptable toolkit and optional Open Finance pack. AI SDLC remains a supporting foundation, not a competing flagship. MiddleLeap Brand remains internal.

## Source verification

Website base: `3251c58` (origin/main, refreshed 14 September 2026).
AI-DLC source: `063b42029066db2c0b0f44cbd9aa057894d7151d` (origin/main, refreshed 14 September 2026).
The plugin manifest and marketplace agree on Loom 2.4.2. AI SDLC is 1.0.0; Open Finance is 2.3.0. Public repository availability does not prove live runtime enforcement or customer production use. The historical synthetic reference build is method evidence, not complete qualification of the latest version.

Commands and runtime boundaries follow the Loom README at that commit. The Codex adapter is a bounded read-only reviewer pilot. Installing plugins does not adopt a repository, approve institutional context, or activate production controls.

Examples are read-only editorial previews, not outputs of a customer run:
- Intake: fictional values arranged around the intake handoff contract and its source/reference/review distinctions.
- Configuration: the first three tasks and role labels from `core/configuration-tasks.json`; all inputs remain pending.
- Release: structure summarized from `evidence-example/README.md`; fictional commit and demo signer deliberately make the example refusable as a live release.

Each preview links to its source at the pinned commit.

## Artwork

Both original compositions were generated using the built-in image generation tool on 14 September 2026. Exact prompts are in `image-prompts.md`. The originals remain in the task's `loom-product/assets` folder. The website owns twelve WebP derivatives under `public/images/loom/`, generated using Sharp at widths 640/960/1440 and quality 78. No runtime image service is needed. Figures are explicitly identified as AI-generated concepts.

The design uses existing website tokens, local fonts, chrome and theme controls. Matching light editions use warm paper studios and brushed silver; dark editions retain their original lighting. The shared picture component follows the device before hydration, then honours saved Light/Dark/Auto preferences and subsequent theme changes. Hero images are eagerly discovered with high fetch priority; an unconditional dark preload is avoided. A saved preference opposite to the device may request the device variant before hydration selects the saved variant. No additional hosting, runtime API or analytics integration is introduced.

## Verification

- Node 22.23.2: lint, type checking, 47 unit tests (45 existing plus two provenance/installation checks) and brand contrast checks pass.
- Production static export and SEO validation pass (initial build on Node 26.8.1; project supports >=22).
- Node 22.23.2 Playwright: 107 tests pass, including the existing smoke/axe suite and added product acceptance tests.
- Responsive coverage: 390, 768 and 1440 pixels, light and dark, across all four affected routes. Review contact sheets are in `screenshots/`.
- New behavioural checks: keyboard tabs, native disclosures, direct nested fragments, copy success/failure, catalogue/booking semantics and JavaScript-disabled reading.
- Lighthouse budgets remain unchanged. All assertions pass across 13 routes / 39 runs; see `lighthouse-results.md`.

Prior integration verification: GitHub checks on code commit `6e3507f`: Node 22 build, lint/type/contrast, unit tests and e2e-smoke pass. Hosted branch preview verified at https://98c5202a.middleleap-website.pages.dev/the-loom with loaded artwork and no browser errors. Production remains unchanged.

One unit run during concurrent Lighthouse collection hit the existing long-input form test's five-second timeout. With collection finished, the complete 47-test suite passes in 5.51 seconds; no timeouts or assertions were weakened.

## Light artwork follow-up

Both new reference-based illustrations have responsive WebP sizes and theme-aware captions. Lint, type checking, contrast, static build, SEO, 47 unit tests and the full 107-test browser/axe suite pass. Added browser coverage verifies stored light against a dark device, manual switching, and automatic device changes for both compositions. Desktop and mobile review captures are `screenshots/light-artwork-desktop.jpg` and `screenshots/light-artwork-mobile.jpg`.
