# Lighthouse verification

Local `lhci autorun`: 13 exported routes, three runs each, 39 runs total. All configured assertions passed with the existing budgets unchanged. Values below are per-route medians.

| Route | Performance | Accessibility | Best practices | SEO | LCP (ms) | CLS |
|---|---:|---:|---:|---:|---:|---:|
| ai-dlc.html | 90 | 100 | 100 | 100 | 3316 | 0 |
| how-we-engage.html | 97 | 100 | 100 | 100 | 2627 | 0 |
| index.html | 97 | 100 | 100 | 100 | 2635 | 0 |
| open-finance.html | 97 | 100 | 100 | 100 | 2630 | 0 |
| practice.html | 97 | 100 | 96 | 100 | 2607 | 0 |
| privacy.html | 97 | 100 | 100 | 100 | 2608 | 0 |
| the-loom.html | 91 | 100 | 96 | 100 | 3459 | 0 |
| venture-submission-terms.html | 97 | 100 | 100 | 100 | 2564 | 0 |
| ventures.html | 95 | 100 | 100 | 100 | 2798 | 0 |
| ventures/backoffice.html | 95 | 100 | 96 | 100 | 2843 | 0 |
| ventures/hivemind.html | 95 | 100 | 100 | 100 | 2822 | 0 |
| ventures/parqo.html | 95 | 100 | 100 | 100 | 2918 | 0 |
| ventures/studio.html | 97 | 100 | 96 | 100 | 2634 | 0 |

The Loom scores 96 for best practices because the Lighthouse static server logs a 404 for a Next.js `/ai-dlc/` prefetch. This is above the 95 budget. The normal local static server passes navigation tests; the Cloudflare branch preview was also checked and logged no browser errors.

Code validated: `6e3507f`. Screenshot/documentation-only additions do not change the exported application.
