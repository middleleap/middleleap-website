import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

// Offline only. A source label is not authentication: an operator must verify
// the private backend export before normalising it to this restricted schema.
const sources = {
  cta_intent: "browser",
  received_inquiry: "inbox",
  accepted_booking: "calendar",
  qualified_conversation: "crm",
};
const stages = Object.keys(sources);
const reportStages = ["cta_intent", "received_inquiry", "booking_accepted_ever", "booking_active_at_cutoff", "qualified_conversation"];
const reportSource = (stage) => stage.startsWith("booking_") ? "calendar" : sources[stage];
const counts = () => Object.fromEntries(reportStages.map((stage) => [stage, 0]));

function object(value, keys) {
  if (!value || typeof value !== "object" || Array.isArray(value) ||
    Object.keys(value).some((key) => !keys.includes(key))) {
    throw new Error("Invalid or unexpected fields in the normalised export.");
  }
}

function timestamp(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value) ||
    !Number.isFinite(Date.parse(value)) || new Date(value).toISOString() !== value) {
    throw new Error("Export timestamps must be valid UTC ISO timestamps.");
  }
  return Date.parse(value);
}

/** Reconcile sanitised, authoritative snapshots; never infer outcomes from a CTA. */
export function reconcileOutcomes(input, publicPaths) {
  object(input, ["schemaVersion", "deploymentVersion", "window", "coverage", "campaigns", "cohorts", "records"]);
  if (input.schemaVersion !== 1 || typeof input.deploymentVersion !== "string" || !/^[a-f0-9]{7,40}$/.test(input.deploymentVersion)) {
    throw new Error("Schema version 1 and a verified deployment commit are required.");
  }
  object(input.window, ["start", "end", "asOf"]);
  const start = timestamp(input.window.start);
  const end = timestamp(input.window.end);
  const asOf = timestamp(input.window.asOf);
  if (start >= end || asOf < end) throw new Error("Invalid reporting window or observation cutoff.");
  object(input.coverage, Object.values(sources));
  if (Object.values(sources).some((source) => !["complete", "partial", "unavailable"].includes(input.coverage[source]))) {
    throw new Error("Source coverage must be explicit; missing evidence is not zero outcomes.");
  }
  if (!Array.isArray(input.campaigns) || input.campaigns.some((code) =>
    typeof code !== "string" || !/^[a-z0-9][a-z0-9_-]{0,39}$/.test(code)) ||
    !Array.isArray(input.cohorts) || !Array.isArray(input.records)) {
    throw new Error("Explicit campaign codes, cohorts and records are required.");
  }

  const allowedPaths = new Set(publicPaths);
  function context(value) {
    if (!allowedPaths.has(value.landingPath) ||
      !(value.campaign === null || input.campaigns.includes(value.campaign))) {
      throw new Error("Context must use a canonical public route and an approved campaign code.");
    }
    return JSON.stringify([value.landingPath, value.campaign]);
  }
  const attributionSignature = (value) => value === null ? null : JSON.stringify([
    context(value), value.visitAt, value.deploymentVersion,
  ]);

  const cohorts = new Map();
  for (const cohort of input.cohorts) {
    object(cohort, ["landingPath", "campaign", "eligibleVisits"]);
    const key = context(cohort);
    if (!Number.isSafeInteger(cohort.eligibleVisits) || cohort.eligibleVisits < 0 || cohorts.has(key)) {
      throw new Error("Cohort denominators must be unique, nonnegative eligible visit counts.");
    }
    cohorts.set(key, { ...cohort, observedOutcomes: counts() });
  }

  const latest = new Map();
  let ignoredAfterCutoff = 0;
  let deduplicatedSnapshots = 0;
  for (const record of input.records) {
    object(record, ["stage", "source", "recordKey", "completedAt", "observedAt", "status", "environment", "internal", "attribution"]);
    if (!stages.includes(record.stage) || sources[record.stage] !== record.source ||
      input.coverage[record.source] === "unavailable" ||
      typeof record.recordKey !== "string" || !/^[A-Za-z0-9_-]{1,128}$/.test(record.recordKey) ||
      !["production", "test"].includes(record.environment) || typeof record.internal !== "boolean" ||
      !["active", "cancelled"].includes(record.status) ||
      (record.status === "cancelled" && record.stage !== "accepted_booking")) {
      throw new Error("Outcome evidence must use its authoritative source and explicit exclusion flags.");
    }
    const completedAt = timestamp(record.completedAt);
    const observedAt = timestamp(record.observedAt);
    if (observedAt < completedAt) throw new Error("Evidence cannot predate its outcome.");
    if (record.attribution !== null) {
      object(record.attribution, ["landingPath", "campaign", "visitAt", "deploymentVersion"]);
      context(record.attribution);
      if (timestamp(record.attribution.visitAt) > completedAt ||
        record.attribution.deploymentVersion !== input.deploymentVersion) {
        throw new Error("Attribution requires an earlier visit on the verified production deployment.");
      }
    }
    if (observedAt > asOf) { ignoredAfterCutoff++; continue; }
    const key = JSON.stringify([record.stage, record.recordKey]);
    const previous = latest.get(key);
    if (previous) {
      deduplicatedSnapshots++;
      if (previous.completedAt !== record.completedAt || previous.source !== record.source ||
        previous.environment !== record.environment || previous.internal !== record.internal ||
        attributionSignature(previous.attribution) !== attributionSignature(record.attribution)) {
        throw new Error("Snapshots of one record must preserve its cohort and first acceptance time.");
      }
      if (previous.observedAt === record.observedAt && previous.status !== record.status) {
        throw new Error("Conflicting snapshots need an authoritative lifecycle decision.");
      }
      if (previous.observedAt >= record.observedAt) continue;
    }
    latest.set(key, record);
  }

  const totals = counts();
  const unattributed = counts();
  const excluded = { testOrInternal: 0, outsideWindow: 0, ignoredAfterCutoff, deduplicatedSnapshots };
  let observedCancelledAtCutoff = 0;
  for (const record of latest.values()) {
    if (record.environment !== "production" || record.internal) { excluded.testOrInternal++; continue; }
    const completedAt = timestamp(record.completedAt);
    if (completedAt < start || completedAt >= end) { excluded.outsideWindow++; continue; }
    const outputStages = record.stage === "accepted_booking"
      ? ["booking_accepted_ever", ...(record.status === "active" ? ["booking_active_at_cutoff"] : [])]
      : [record.stage];
    if (record.status === "cancelled") observedCancelledAtCutoff++;
    const attribution = record.attribution;
    const cohort = attribution && cohorts.get(context(attribution));
    const matched = attribution && cohort && cohort.eligibleVisits > 0 &&
      timestamp(attribution.visitAt) >= start && timestamp(attribution.visitAt) < end;
    for (const stage of outputStages) {
      totals[stage]++;
      if (matched) cohort.observedOutcomes[stage]++;
      else unattributed[stage]++;
    }
  }

  const eligibleVisits = [...cohorts.values()].reduce((total, cohort) => total + cohort.eligibleVisits, 0);
  if (!Number.isSafeInteger(eligibleVisits)) throw new Error("The eligible visit total exceeds supported integer precision.");
  // These count records per visit, not distinct converting visitors. Unknown
  // attribution or missing denominators suppress the rate rather than guess.
  const outcomesPer100EligibleVisits = Object.fromEntries(reportStages.map((stage) => [stage,
    input.coverage[reportSource(stage)] === "complete" && eligibleVisits > 0 && unattributed[stage] === 0
      ? 100 * totals[stage] / eligibleVisits : null,
  ]));
  return {
    schemaVersion: 2,
    inputSchemaVersion: 1,
    deploymentVersion: input.deploymentVersion,
    window: input.window,
    coverage: input.coverage,
    totals: Object.fromEntries(reportStages.map((stage) => [stage,
      input.coverage[reportSource(stage)] === "complete" ? totals[stage] : null,
    ])),
    observedCounts: totals,
    unattributed,
    excluded,
    bookingLifecycle: {
      observedCancelledAtCutoff,
      cancelledAtCutoff: input.coverage.calendar === "complete" ? observedCancelledAtCutoff : null,
    },
    eligibleVisits,
    outcomesPer100EligibleVisits,
    distinctVisitorConversionRate: null,
    cohorts: [...cohorts.values()],
    limitation: "Normalised source labels require operator verification. Record counts are not distinct visitor conversions; missing attribution or denominators suppress rates.",
  };
}

async function main() {
  const file = process.argv[2];
  if (!file || process.argv.length !== 3) throw new Error("Usage: npm run measurement:reconcile -- /private/path/normalised-export.json (build first)");
  const sitemap = await readFile("out/sitemap.xml", "utf8");
  const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((entry) => {
    const url = new URL(entry[1]);
    if (url.origin !== "https://www.middleleap.com" || url.search || url.hash) {
      throw new Error("The built sitemap must contain canonical MiddleLeap URLs only.");
    }
    return url.pathname.replace(/\/$/, "") || "/";
  });
  const report = reconcileOutcomes(JSON.parse(await readFile(file, "utf8")), paths);
  console.log(JSON.stringify(report, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch(() => {
    // Do not echo file paths, values, IDs, or JSON parser excerpts from private input.
    console.error("Reconciliation failed. Check the documented schema, trusted source evidence, built sitemap and reporting window. No input values were logged.");
    process.exitCode = 1;
  });
}
