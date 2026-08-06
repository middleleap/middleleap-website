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
