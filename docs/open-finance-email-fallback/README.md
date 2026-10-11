# Review email handoff without JavaScript

The Open Finance review uses the existing contact address, subject and CTA label in a native `noscript` link. A style scoped to the review swaps out the normal email link only when the browser parses the fallback. The standard booking and JavaScript email journeys remain intact, and the published offer wording is unchanged.

Cloudflare's existing email protection rewrites normal mailto links and restores them with its decoding script. The fallback uses the documented exclusion for `noscript` content. No account, security, privacy or email-obfuscation setting changes are required. See [Cloudflare documentation](https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/).

## Local previews

- [Desktop with JavaScript disabled](desktop-no-js.png)
- [Mobile with JavaScript disabled](mobile-no-js.png)

The screenshots use the local static export with external and non-GET/HEAD requests blocked. They contain only the existing public contact route and offer.

## Regression and audit

Two tests reproduce the delivered no-JavaScript failure on the live page. Before the fix, six local regressions also fail with the observed normal-link rewrite applied across both theme preferences at 320, 390 and 1440px. The fixture preserves noscript content according to the documented exclusion; it does not claim to replace an actual Cloudflare deployment check.

The final suite verifies one visible email handoff with the original mailto subject, native keyboard focus, mobile bounds, axe accessibility, illustrative-takeaway navigation and the privacy path. The existing JavaScript mobile/menu, booking and focus-contrast journeys remain covered. Calendar is intercepted with a local test document and no email client is opened.

The contact-path audit checks canonical URLs, the advisory service identifier and its provider reference against the homepage organization, and the existing homepage expertise anchor. These checks passed on current main before the fallback; no additional schema, canonical or content change was warranted.

## Validation commands

Run `npm run lint`, `npm run type-check`, `npm run test:run`, `npm run check:contrast`, `npm run build`, `npm run seo:check`, and Playwright over the built static export. GitHub CI also enforces Lighthouse budgets on every exported route. Exact results and the final head are recorded in the draft PR.

This branch starts at main `9f7197bed96148538bc7ad3d0ee4bc5117b1a313`. PR #37 is excluded. Commit prefixes hold Cloudflare deployment while GitHub Actions run. A real edge preview remains a release gate after explicit deployment approval; this draft is not merged or deployed.
