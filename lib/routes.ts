import type { MetadataRoute } from "next";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export type RouteMeta = {
  path: string;
  /**
   * The date this route's CONTENT last changed — not the build date. Update it in
   * the same commit that changes the page. `new Date()` here would tell crawlers
   * every page changed on every deploy, which is no signal at all.
   */
  contentUpdated: `${number}-${number}-${number}`;
  changeFrequency: ChangeFrequency;
  priority: number;
};

export const routes = [
  { path: "/", contentUpdated: "2026-08-06", changeFrequency: "monthly", priority: 1 },
  { path: "/open-finance", contentUpdated: "2026-08-06", changeFrequency: "monthly", priority: 0.9 },
  { path: "/the-loom", contentUpdated: "2026-08-12", changeFrequency: "monthly", priority: 0.85 },
  { path: "/practice", contentUpdated: "2026-08-12", changeFrequency: "monthly", priority: 0.85 },
  { path: "/how-we-engage", contentUpdated: "2026-08-07", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ventures", contentUpdated: "2026-08-12", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ai-dlc", contentUpdated: "2026-08-06", changeFrequency: "monthly", priority: 0.75 },
  { path: "/ventures/studio", contentUpdated: "2026-08-06", changeFrequency: "monthly", priority: 0.75 },
  { path: "/ventures/backoffice", contentUpdated: "2026-08-12", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ventures/hivemind", contentUpdated: "2026-08-12", changeFrequency: "monthly", priority: 0.7 },
  { path: "/ventures/parqo", contentUpdated: "2026-08-12", changeFrequency: "monthly", priority: 0.7 },
  // Both legal routes render legalTermsEffectiveDate from lib/legal.ts ("18 July 2026").
  { path: "/privacy", contentUpdated: "2026-07-18", changeFrequency: "yearly", priority: 0.2 },
  { path: "/venture-submission-terms", contentUpdated: "2026-07-18", changeFrequency: "yearly", priority: 0.2 },
] as const satisfies readonly RouteMeta[];
