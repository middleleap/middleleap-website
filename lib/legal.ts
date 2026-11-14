// Single source of truth for legal document versions. The proposal form
// stamps prepared emails with this version, so it must match the effective
// date shown on /venture-submission-terms and /privacy.
export const legalTermsEffectiveDate = "18 July 2026";

// The licensed legal entity behind the MiddleLeap brand. Marketing pages never
// state legal status (brand rule); the privacy notice and the submission terms
// are the deliberate exception, because a data controller and a contracting
// party have to be identifiable. Values are taken from the business licence.
export const legalEntity = {
  name: "Middleleap L.L.C-FZ",
  licenceNumber: "2655696.01",
  licensingAuthority: "Meydan Free Zone",
  address: "Meydan Grandstand, 6th floor, Meydan Road, Nad Al Sheba, Dubai, United Arab Emirates",
} as const;
