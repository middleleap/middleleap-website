# Search and agent-discovery measurement

This is the deployment and measurement companion to the route inventory in `lib/routes.ts` and the metadata helpers in `lib/seo.ts`.

## Before deployment

1. Run `npm run build`, then `npm run seo:check` against the static export.
2. Set `GOOGLE_SITE_VERIFICATION` and `BING_SITE_VERIFICATION` in the production build environment.
3. Confirm the production host serves `https://www.middleleap.com` as the canonical origin, redirects alternate hostnames consistently and does not inject a conflicting robots or canonical policy.
4. Validate the homepage entity graph and representative page and breadcrumb graphs with Schema.org Validator and Google Rich Results Test.

## On deployment

1. Verify `https://www.middleleap.com/robots.txt`, `/sitemap.xml`, `/llms.txt` and representative canonical pages from outside the deployment network.
2. Submit the sitemap in Google Search Console and Bing Webmaster Tools.
3. Inspect the homepage, `/practice`, `/open-finance`, `/the-loom`, `/ventures` and `/ventures/backoffice` in both webmaster tools.
4. Enable Bing IndexNow at the hosting or deployment layer. The sitemap remains the complete inventory; IndexNow should notify only added, changed or removed URLs.

## Outcome metrics

| Signal | Source | Decision use |
| --- | --- | --- |
| Valid indexed canonical pages | Google Search Console and Bing Webmaster Tools | Detect crawl, canonical or rendering regressions |
| Non-brand impressions and clicks by route | Search Console and Bing queries | Test whether each page owns its intended subject |
| AI answer citations and cited URLs | Bing AI Performance plus sampled answer-engine checks | Identify selected evidence and entity ambiguity |
| Referral visits from AI and search assistants | Plausible referrers and campaign parameters | Separate citations from qualified visits |
| Mandate enquiries by landing page | Plausible goals plus enquiry context | Connect discoverability to commercial relevance |
| Venture proposals by landing page | Plausible goals plus proposal context | Measure Studio discovery without treating volume as quality |

## Review cadence

- **Day 0:** Record indexed pages, Lighthouse results, branded and non-brand query baselines, referring domains, AI citations and qualified enquiries for the prior 90 days where available.
- **Day 30:** Resolve exclusions, duplicate canonicals, metadata rewrites, crawl anomalies and entity inconsistencies. Do not rewrite pages from early ranking noise alone.
- **Day 60:** Compare page-level query clusters with the intended subject. Improve content only where real queries reveal an evidence-backed missing answer or unclear terminology.
- **Day 90:** Evaluate qualified enquiries, AI citations, non-brand visibility and link acquisition. Decide whether demand justifies additional dedicated capability or evidence pages.

## Guardrails

- Do not publish unsupported client claims, production claims, regulatory conclusions or invented credentials for search visibility.
- Treat `llms.txt` as a supplemental source map. Canonical facts must remain in rendered HTML, metadata, schema and authoritative external profiles.
- Update route `contentUpdated` only when public content materially changes.
- Keep training-crawler policy separate from search and user-retrieval crawler policy in `app/robots.ts`.
