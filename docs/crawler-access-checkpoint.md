# Public crawler access checkpoint — 8 October 2026

Read-only evidence for issue #49. Source baseline: verified remote `main` at `b00a9295358fe4b24b6d92a994d91c2f2162f4e8`. Existing Content Signals and Markdown negotiation from #44/#45/#48 remain intact. No edge, DNS, account or production settings were changed.

## Intended access

| Route | Expected public representation |
| --- | --- |
| `/` | HTML with canonical `https://www.middleleap.com`; negotiated Markdown naming the same canonical |
| `/ventures` | HTML and negotiated Markdown at its canonical URL |
| `/ventures/hivemind` | HTML and negotiated Markdown at its canonical URL |
| `/robots.txt` | Public text with crawler groups, canonical host/sitemap and Content Signals |
| `/sitemap.xml` | Public XML containing canonical `https://www.middleleap.com` URLs |
| `/llms.txt` | Public supplemental source map; not a substitute for rendered canonical facts |

Ordinary browsers should retrieve these public resources, subject to existing abuse controls. Search indexing and user-directed retrieval are allowed by the source policy (including `OAI-SearchBot`, `ChatGPT-User`, `Claude-SearchBot`, `Claude-User`, `PerplexityBot` and `Perplexity-User`). Authentication/verification at the edge is distinct from permission declared in robots. A string claiming one of those agents does not prove its identity and should receive no special trust.

Training use is withheld by `ai-train=no`. Source rules currently allow `GPTBot` and `ClaudeBot` to fetch content while denying training permission through Content Signals; this checkpoint does not reinterpret that as permission to train or change that intentional policy. Robots describes use/access preferences, not security authorization. [Cloudflare's verified-bot guidance](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/) describes verification separately; [Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/) can challenge particular clients. Neither document establishes which rule handled a request on this site.

## Live observations

On 8 October 2026, 11:32:00–11:32:10 UTC, direct GETs from the Mac used the truthful agent `MiddleLeap-read-only-diagnostic/1.0` identifying this investigation. No crawler identity was impersonated. All requests completed successfully:

| Request | Status / representation |
| --- | --- |
| `https://middleleap.com/` | 301 → 200 at `https://www.middleleap.com/` |
| `http://middleleap.com/` | 301 → 301 → 200 at canonical HTTPS/www |
| `http://www.middleleap.com/` | 301 → 200 at canonical HTTPS/www |
| `/`, `/ventures`, `/ventures/hivemind` with `Accept: text/html` | 200, `text/html`; expected canonical link on each |
| `/robots.txt` | 200, `text/plain`; `search=yes`, `ai-input=yes`, `ai-train=no` present |
| `/sitemap.xml` | 200, `application/xml`; 14 canonical-origin URLs |
| `/llms.txt` | 200, `text/plain` |
| `/`, `/ventures`, `/ventures/hivemind` with `Accept: text/markdown` | 200, `text/markdown` |

The in-app browser also rendered the homepage successfully. Web extraction returned homepage content, but its robots/sitemap/llms fetches were unavailable without an exposed HTTP status. Those extraction failures cannot be classified as site 403s or live crawler failures. The earlier report's research-client 403 is not reproduced by the identified direct client above. Cloudflare response headers alone do not identify a refusing rule, and successful retrieval does not prove that every verified search bot can retrieve the same routes.

The public site did not expose a deployment commit, and GitHub's deployment list returned no entries. Public status/canonical/policy evidence is live; production-to-source commit mapping remains unverified. This local branch is not deployed.

## Remaining verification

1. An authorised owner should use Google Search Console URL Inspection and Bing Webmaster Tools to retrieve representative canonical URLs and inspect crawl/robots results. Record UTC time, status, tested URL and deployment identity, without personal records or private security details.
2. Where a verified retrieval fails, confirm actual crawler identity using the provider's official verification method and correlate the specific request through authorised private edge/origin evidence. Do not infer identity from a user-agent string or infer a WAF/BIC cause solely from a 403.
3. If a genuine intended-policy mismatch is established, prepare a route/purpose-specific correction and repeat the same requests before requesting separate approval. Preserve anti-abuse controls and `ai-train=no`; no global bot allow, DNS change or security weakening is justified by this checkpoint.
4. Until verified intended retrieval and the earlier refusal are accounted for, keep #49 open as a verification gap. Current evidence does not justify a crawler-outage claim or a security-policy code change.

The existing local regression gate remains `npm run build` then `npm run seo:check`, plus middleware negotiation and robots-policy unit tests. It verifies the source/export contract; it does not test the production edge or prove verified-crawler identity.
