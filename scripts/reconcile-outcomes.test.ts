import { describe, expect, it } from "vitest";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { reconcileOutcomes } from "./reconcile-outcomes.mjs";

const version = "b00a929";
const publicPaths = ["/", "/practice", "/ventures"];
const start = "2026-10-01T00:00:00.000Z";
const end = "2026-10-08T00:00:00.000Z";
const asOf = "2026-10-09T00:00:00.000Z";

function record(overrides = {}) {
  return {
    stage: "accepted_booking", source: "calendar", recordKey: "opaque-booking-1",
    completedAt: "2026-10-04T09:00:00.000Z", observedAt: "2026-10-04T10:00:00.000Z",
    status: "active", environment: "production", internal: false,
    attribution: { landingPath: "/", campaign: null, visitAt: "2026-10-03T09:00:00.000Z", deploymentVersion: version },
    ...overrides,
  };
}

function input(records = [record()], overrides = {}) {
  return {
    schemaVersion: 1, deploymentVersion: version, window: { start, end, asOf },
    coverage: { browser: "complete", inbox: "complete", calendar: "complete", crm: "complete" },
    campaigns: ["search-october"], cohorts: [{ landingPath: "/", campaign: null, eligibleVisits: 100 }], records,
    ...overrides,
  };
}

describe("accepted outcome reconciliation", () => {
  it("keeps CTA intent separate from inbox, Calendar and qualified outcomes", () => {
    const data = input([
      record({ stage: "cta_intent", source: "browser" }),
      record({ stage: "received_inquiry", source: "inbox" }),
      record(),
      record({ stage: "qualified_conversation", source: "crm" }),
    ]);
    const report = reconcileOutcomes(data, publicPaths);
    expect(report.totals).toEqual({ cta_intent: 1, received_inquiry: 1, booking_accepted_ever: 1, booking_active_at_cutoff: 1, qualified_conversation: 1 });
    expect(report.outcomesPer100EligibleVisits.booking_active_at_cutoff).toBe(1);
    expect(report.distinctVisitorConversionRate).toBeNull();
    expect(JSON.stringify(report)).not.toContain("opaque-booking-1");
  });

  it("rejects browser claims of booking or inquiry completion", () => {
    expect(() => reconcileOutcomes(input([record({ source: "browser" })]), publicPaths)).toThrow(/authoritative/);
    expect(() => reconcileOutcomes(input([record({ stage: "received_inquiry", source: "browser" })]), publicPaths)).toThrow(/authoritative/);
  });

  it("deduplicates replayed and rescheduled bookings using the original stable key", () => {
    const report = reconcileOutcomes(input([
      record({ observedAt: "2026-10-06T10:00:00.000Z" }), record(), record(),
    ]), publicPaths);
    expect(report.totals.booking_active_at_cutoff).toBe(1);
    expect(report.excluded.deduplicatedSnapshots).toBe(2);
  });

  it("separates accepted-ever from active bookings using the latest snapshot regardless of export order", () => {
    const report = reconcileOutcomes(input([
      record({ status: "cancelled", observedAt: "2026-10-06T10:00:00.000Z" }), record(),
    ]), publicPaths);
    expect(report.totals.booking_active_at_cutoff).toBe(0);
    expect(report.totals.booking_accepted_ever).toBe(1);
    expect(report.bookingLifecycle.cancelledAtCutoff).toBe(1);
    expect(report.outcomesPer100EligibleVisits.booking_accepted_ever).toBe(1);
    expect(report.outcomesPer100EligibleVisits.booking_active_at_cutoff).toBe(0);
  });

  it("keeps a historical report stable when cancellation is observed after its cutoff", () => {
    const report = reconcileOutcomes(input([
      record(), record({ status: "cancelled", observedAt: "2026-10-10T10:00:00.000Z" }),
    ]), publicPaths);
    expect(report.totals.booking_active_at_cutoff).toBe(1);
    expect(report.excluded.ignoredAfterCutoff).toBe(1);
  });

  it("excludes test and internal records", () => {
    const report = reconcileOutcomes(input([
      record({ recordKey: "test-1", environment: "test" }), record({ recordKey: "internal-1", internal: true }),
    ]), publicPaths);
    expect(report.totals.booking_active_at_cutoff).toBe(0);
    expect(report.excluded.testOrInternal).toBe(2);
  });

  it("uses a half-open completion window and refuses to attribute a visit outside the cohort", () => {
    const report = reconcileOutcomes(input([
      record({ completedAt: end, observedAt: end }),
      record({ recordKey: "earlier-visit", attribution: { ...record().attribution, visitAt: "2026-09-30T09:00:00.000Z" } }),
    ]), publicPaths);
    expect(report.totals.booking_active_at_cutoff).toBe(1);
    expect(report.excluded.outsideWindow).toBe(1);
    expect(report.unattributed.booking_active_at_cutoff).toBe(1);
    expect(report.outcomesPer100EligibleVisits.booking_active_at_cutoff).toBeNull();
    expect(report.outcomesPer100EligibleVisits.booking_accepted_ever).toBeNull();
  });

  it("reports unknown attribution and missing denominators without inventing a rate", () => {
    const report = reconcileOutcomes(input([record({ attribution: null })], { cohorts: [] }), publicPaths);
    expect(report.totals.booking_active_at_cutoff).toBe(1);
    expect(report.unattributed.booking_active_at_cutoff).toBe(1);
    expect(report.eligibleVisits).toBe(0);
    expect(report.outcomesPer100EligibleVisits.booking_active_at_cutoff).toBeNull();
    expect(report.outcomesPer100EligibleVisits.booking_accepted_ever).toBeNull();
  });

  it("does not treat unavailable or partial sources as zero outcomes", () => {
    const report = reconcileOutcomes(input([], {
      coverage: { browser: "complete", inbox: "unavailable", calendar: "partial", crm: "unavailable" },
    }), publicPaths);
    expect(report.totals.received_inquiry).toBeNull();
    expect(report.totals.booking_active_at_cutoff).toBeNull();
    expect(report.outcomesPer100EligibleVisits.booking_active_at_cutoff).toBeNull();
    expect(report.outcomesPer100EligibleVisits.booking_accepted_ever).toBeNull();
  });

  it("suppresses rates when the claimed visit belongs to a cohort with zero eligible visits", () => {
    const report = reconcileOutcomes(input([record()], {
      cohorts: [
        { landingPath: "/", campaign: null, eligibleVisits: 0 },
        { landingPath: "/practice", campaign: null, eligibleVisits: 100 },
      ],
    }), publicPaths);
    expect(report.unattributed.booking_active_at_cutoff).toBe(1);
    expect(report.outcomesPer100EligibleVisits.booking_active_at_cutoff).toBeNull();
    expect(report.outcomesPer100EligibleVisits.booking_accepted_ever).toBeNull();
  });

  it("refuses conflicting lifecycle evidence instead of choosing an optimistic outcome", () => {
    expect(() => reconcileOutcomes(input([record(), record({ status: "cancelled" })]), publicPaths)).toThrow(/Conflicting/);
    expect(() => reconcileOutcomes(input([record(), record({ internal: true })]), publicPaths)).toThrow(/preserve/);
  });

  it("rejects personal fields, unknown campaigns, nonpublic paths and mismatched deployments", () => {
    for (const bad of [
      record({ attendee: "person@example.com" }),
      record({ attribution: { ...record().attribution, campaign: "unapproved" } }),
      record({ attribution: { ...record().attribution, landingPath: "/?email=person@example.com" } }),
      record({ attribution: { ...record().attribution, deploymentVersion: "0000000" } }),
    ]) expect(() => reconcileOutcomes(input([bad]), publicPaths)).toThrow();
  });

  it("rejects invalid dates, reversed evidence and incompatible denominators", () => {
    expect(() => reconcileOutcomes(input([record({ completedAt: "2026-02-31T00:00:00.000Z" })]), publicPaths)).toThrow(/timestamps/);
    expect(() => reconcileOutcomes(input([record({ observedAt: start })]), publicPaths)).toThrow(/predate/);
    expect(() => reconcileOutcomes(input([], { cohorts: [{ landingPath: "/", campaign: null, eligibleVisits: -1 }] }), publicPaths)).toThrow(/denominators/);
  });

  it("never logs a private input value or file path on CLI failure", () => {
    const directory = mkdtempSync(path.join(tmpdir(), "middleleap-outcomes-"));
    try {
      mkdirSync(path.join(directory, "out"));
      writeFileSync(path.join(directory, "out/sitemap.xml"), "<loc>https://www.middleleap.com/</loc>");
      const file = path.join(directory, "private-person@example.com.json");
      writeFileSync(file, '{"private":"person@example.com", broken}');
      const result = spawnSync(process.execPath, [path.resolve("scripts/reconcile-outcomes.mjs"), file], { cwd: directory, encoding: "utf8" });
      expect(result.status).toBe(1);
      expect(result.stdout).toBe("");
      expect(result.stderr).toContain("No input values were logged");
      expect(result.stderr).not.toContain("person@example.com");
      expect(result.stderr).not.toContain(directory);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});
