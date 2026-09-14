import { toolkitSource } from "./loom-product";
// Single source of truth for The Loom's public proof figures. These are
// evidence claims repeated on the homepage, /the-loom and /ventures/backoffice
// (and mirrored in public/llms.txt — a test asserts the copies stay in sync).
export const loomProof = {
  storiesDone: 134,
  storiesTotalApprox: 139,
  storiesRatio: "134 / ~139",
  harnesses: "2 + 1",
  humanApprovedMerges: "100%",
  realCustomerRecords: 0,
} as const;

// Product maturity and evidence maturity are deliberately separate. A released
// Toolkit version does not imply that the method has operated in customer
// production.
export const loomRelease = {
  version: toolkitSource.loomVersion,
  productStatus: "Available in the public repository",
  evidenceStatus: "Reference-build validated",
  evidenceDetail:
    "The method was exercised while building the synthetic Open Finance Backoffice; this is not version-specific qualification of every current capability.",
  evidenceBoundary:
    "It has not been used to deliver or operate a customer production system.",
} as const;
