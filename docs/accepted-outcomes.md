# Accepted advisory outcomes

Companion to issue #50 and `docs/search-measurement.md`. Source baseline: remote `main` at `b00a9295358fe4b24b6d92a994d91c2f2162f4e8`, fetched 8 October 2026. The local change is not deployed.

## Observed production inventory

At 11:32 UTC on 8 October, public GETs returned 200 for the homepage, `/ventures` and `/ventures/hivemind`. The homepage's rendered browser DOM included Cloudflare's analytics beacon, no Plausible script and no tagged Plausible goals. This is an observation of this page at this time; it does not establish the absence of all private measurement or of real inquiries. Public HTML did not establish a deployment commit, and GitHub's deployment list returned no entries. Production-to-commit mapping remains unverified.

In source, `app/layout.tsx` loads Plausible only when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is configured. `lib/contact.ts` supplies ordinary `mailto:` links and a Google Calendar appointment-schedule URL. There is no advisory intake backend, booking callback, Calendar reconciliation, or browser contact-goal code in this baseline. Following either link leaves the site's observable journey. Optional analytics code and an outbound click are not accepted-outcome evidence. [Plausible's custom-event documentation](https://plausible.io/docs/custom-event-goals) also requires matching goals to be configured in the account before conversions appear in its dashboard; those account settings have not been inspected or changed.

The separate Venture Studio backend `/api/propose` receives form JSON and asks Resend to deliver email. The previous browser treated `{ok: true}` as receipt and fabricated a timestamp when absent; the previous backend allowed an absent provider ID. The fix requires the provider ID and a real server acceptance timestamp, and says **accepted for delivery**. It retains the legacy timestamp field during deployment. Honeypot success, locally prepared briefs, copy actions and mailto links do not establish receipt. Neither provider acceptance nor browser acknowledgement establishes inbox delivery, an accepted advisory inquiry, a Calendar booking or a qualified conversation. No analytics events or new tracker are added.

## Evidence definitions

| Stage | Required evidence | Excluded interpretation |
| --- | --- | --- |
| `cta_intent` | An observed contact action in an existing, verified browser measurement export | A message sent, booking accepted or commercial outcome |
| `received_inquiry` | A real advisory message received in the controlled inbox, with a stable private record key | Mailto click, provider queued-delivery acknowledgement, proposal content |
| `accepted_booking` | A genuine accepted appointment in the controlled Calendar source | Schedule-page visit, selected slot or browser success claim |
| `qualified_conversation` | A reviewed CRM / engagement record meeting the practice's agreed fit definition | A scheduled or attended call alone |

Keep Studio and advisory populations separate. An operator must verify inbox/Calendar/CRM exports and the qualification definition before assigning source labels. The offline tool validates the contract; it does not authenticate sources, access accounts, send email, create appointments or infer missing records. A source marked unavailable or partial yields unknown complete totals and no rate, rather than a claim of zero outcomes.

## Private reconciliation

1. Record the verified production deployment commit, exported source coverage, reporting window and observation cutoff. Use a half-open UTC completion window `[start, end)`. The cutoff must be on or after its end.
2. Normalise records locally from authorised backend evidence. Strip attendees, names, addresses, messages, titles, appointment URLs and provider payloads. Use an opaque stable key allocated in the private source; never put these keys in analytics, a public issue or the report.
3. Exclude test, internal, spam and synthetic records and their visits upstream. The schema requires explicit environment and internal flags as a second exclusion gate. Keep the source's exclusion and completeness audit private.
4. Deduplicate repeated exports using `(stage, recordKey)`. Calendar reschedules retain the original series/root booking key and first acceptance time; a new snapshot updates the observation time. Normalize authoritative cancellations to `cancelled`; the latest snapshot at or before `asOf` removes the lineage from **active-at-cutoff**, while **accepted-ever** retains its original acceptance in the reporting window. A later cancellation changes a later active-state report, not an earlier cutoff or the fact of historical acceptance. Cancel-and-rebook chains must be resolved to their original root upstream. Contradictory snapshots or changed identity/cohort data fail validation.
5. Join landing/campaign context only through an already authorised, verified link recorded with the backend record. The visit must precede the outcome and use the same verified production deployment. Do not guess from email domains, attendee identity, a coincident click, IP address or appointment URL. If that link does not exist, use `attribution: null`. Self-reported source may be useful operationally but must remain separate from verified campaign attribution.
6. Import eligible **visits** for exactly the same UTC window, deployment, public landing route and approved public campaign code. Exclude internal, test, bot and synthetic traffic using the same population rules. A visit count is not unique prospects. Do not substitute CTA clicks, all-time visits or another deployment's traffic. Unknown campaigns remain unattributed; do not copy raw query strings, referrer URLs or arbitrary UTM values into the file.
7. Run `npm run build`, then `npm run measurement:reconcile -- /private/path/normalised-export.json`. The tool reads the built canonical sitemap, accepts only inventoried paths and allowlisted campaign codes, rejects unexpected input fields, and emits aggregates without record keys. CLI errors never echo input values or file paths. Keep real inputs and small-cohort outputs outside Git and public issues; share only sufficiently aggregated results under existing retention rules.

## Export contract

The following record is **synthetic test data**, not a production booking. Timestamps must include three fractional digits and `Z`. Every top-level field below is required. `campaigns` contains only approved public codes; use `null` for no campaign. `coverage` is `complete`, `partial` or `unavailable` for each source. `cohorts` can be empty when denominators are unavailable.

```json
{
  "schemaVersion": 1,
  "deploymentVersion": "b00a929",
  "window": {
    "start": "2026-10-01T00:00:00.000Z",
    "end": "2026-10-08T00:00:00.000Z",
    "asOf": "2026-10-09T00:00:00.000Z"
  },
  "coverage": {
    "browser": "unavailable",
    "inbox": "unavailable",
    "calendar": "complete",
    "crm": "unavailable"
  },
  "campaigns": ["search-october"],
  "cohorts": [
    { "landingPath": "/", "campaign": null, "eligibleVisits": 100 }
  ],
  "records": [
    {
      "stage": "accepted_booking",
      "source": "calendar",
      "recordKey": "synthetic-root-booking",
      "completedAt": "2026-10-04T09:00:00.000Z",
      "observedAt": "2026-10-04T10:00:00.000Z",
      "status": "active",
      "environment": "production",
      "internal": false,
      "attribution": {
        "landingPath": "/",
        "campaign": null,
        "visitAt": "2026-10-03T09:00:00.000Z",
        "deploymentVersion": "b00a929"
      }
    }
  ]
}
```

Sources are fixed: browser for intent, inbox for received inquiry, Calendar for accepted booking, CRM for qualified conversation. Only bookings can have `status: "cancelled"`. Repeated snapshots must preserve first completion time, attribution, exclusion flags and source. Each cohort denominator is unique. Unknown fields are rejected to prevent accidental personal-data export.

## Reading the report

`observedCounts` records eligible evidence actually present; `totals` is null for incomplete source coverage. `unattributed` records missing context, missing matching cohort denominators, or visits outside the reporting window. `excluded` explains deduplication, internal/test, window and cutoff exclusions. `bookingLifecycle` reports cancellations separately; cancellation is not exclusion from accepted-ever. The report preserves coverage, deployment and window metadata. Historical cutoffs require a source snapshot history that can reconstruct state at that cutoff; mark coverage partial when the export cannot establish that history.

Output schema version 2 names the two booking measures explicitly: `booking_accepted_ever` counts a lineage whose first acceptance is in `[start, end)`, even if later cancelled; `booking_active_at_cutoff` counts only those lineages whose latest authoritative snapshot at or before `asOf` has `status: "active"`. Neither implies attendance, completion, future availability or qualification. They must not be substituted for each other or added together. The input contract remains schema version 1 with the evidence stage `accepted_booking`; there is no business decision about which outcome to optimise.

`outcomesPer100EligibleVisits` is a **record count per 100 eligible visits**, calculated only with complete source coverage, a positive denominator and no unattributed outcomes for that stage. It is not a distinct-visitor conversion rate: one visit can yield multiple records and cross-device journeys are not joined. `distinctVisitorConversionRate` therefore remains null. Accepted-ever bookings, active-at-cutoff bookings, received inquiries and qualified conversations are separate measures and must not be summed as one funnel total. Matched observation windows still omit completions outside the window; use a consistent lag/window policy and disclose that limit when comparing periods.

## Verification and remaining gates

Unit tests use synthetic source records and mock email delivery only. They cover browser-completion rejection, missing provider acknowledgements, legacy acknowledgement compatibility, no invented timestamps, deduplication/rescheduling, cancellation cutoffs, internal/test exclusion, cohort-window and deployment mismatch, incomplete source coverage, unknown attribution, invalid dates, privacy-field rejection and CLI redaction. No live message or booking was created.

Production reconciliation remains blocked on verified deployment mapping, authorised backend exports, source completeness, recorded attribution and eligible visit denominators. Plausible goals/settings have not been verified. This work supplies a tested reconciliation path and corrects unsupported UI success claims; it does not verify accepted production outcomes or claim a measured conversion rate. Any extension requiring a new tracker or backend attribution capture, account settings, or a live send/booking needs separate approval.
