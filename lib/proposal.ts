// Single source of truth for the Venture Studio proposal: field limits,
// validation and the plain-text serialisation used in the email. Both the
// browser form (components/VentureProposalForm.tsx) and the Cloudflare Pages
// Function that sends the email (functions/api/propose.ts) import this file,
// so the two cannot drift. Keep it free of Next.js and DOM-only imports.
import { contactEmail } from "./contact";
import { legalTermsEffectiveDate } from "./legal";

export const proposalFields = [
  { name: "title", label: "Working title", maxLength: 100, required: true },
  { name: "problem", label: "Problem", maxLength: 700, required: true },
  { name: "audience", label: "Who experiences it", maxLength: 350, required: true },
  { name: "evidence", label: "Existing evidence", maxLength: 600, required: true },
  { name: "access", label: "Market or customer access", maxLength: 350, required: false },
  { name: "connection", label: "Your connection to the problem", maxLength: 400, required: true },
  { name: "participation", label: "Desired participation", maxLength: 80, required: true },
  { name: "name", label: "Name", maxLength: 100, required: true },
  { name: "email", label: "Email", maxLength: 254, required: true },
] as const;

export type ProposalFieldName = (typeof proposalFields)[number]["name"];

export type ProposalInput = Record<ProposalFieldName, string> & {
  /** The submitter accepted the venture submission terms. */
  terms: boolean;
};

export const participationOptions = [
  "Venture lead or operator",
  "Domain or industry partner",
  "Design partner or prospective customer",
  "Technical or delivery contributor",
  "Open to discussing the right role",
] as const;

export const proposalRecipient = contactEmail;

/** Where the browser posts a proposal; served by functions/api/propose.ts on Cloudflare Pages. */
export const proposalEndpoint = "/api/propose";

// Upper bound on a JSON proposal body. Field limits sum to ~3,000 characters;
// this leaves room for encoding and rejects anything that is clearly not a form.
export const proposalMaxBodyBytes = 16 * 1024;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readString(source: Record<string, unknown>, name: string): string {
  const value = source[name];
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Validates untrusted input (parsed JSON or a FormData-derived record).
 * Returns the normalised proposal or a list of human-readable errors.
 */
export function validateProposal(
  input: unknown,
): { ok: true; value: ProposalInput } | { ok: false; errors: string[] } {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    return { ok: false, errors: ["Proposal must be an object."] };
  }
  const source = input as Record<string, unknown>;
  const errors: string[] = [];
  const value = {} as Record<ProposalFieldName, string>;

  for (const field of proposalFields) {
    const text = readString(source, field.name);
    if (field.required && !text) errors.push(`${field.label} is required.`);
    if (text.length > field.maxLength) errors.push(`${field.label} must be ${field.maxLength} characters or fewer.`);
    value[field.name] = text;
  }

  if (value.email && !emailPattern.test(value.email)) errors.push("Email must be a valid address.");
  if (value.participation && !(participationOptions as readonly string[]).includes(value.participation)) {
    errors.push("Desired participation must be one of the listed roles.");
  }

  const terms = source.terms === true || source.terms === "on" || source.terms === "true";
  if (!terms) errors.push("The venture submission terms must be accepted.");

  return errors.length ? { ok: false, errors } : { ok: true, value: { ...value, terms } };
}

/** The subject line and plain-text body of the proposal email. */
export function serializeProposal(
  proposal: ProposalInput,
  preparedAt: string,
): { subject: string; body: string } {
  const lines = proposalFields.map((field) => `${field.label}:\n${proposal[field.name] || "—"}`);
  lines.push(`Submission terms accepted:\nYes — version ${legalTermsEffectiveDate}`);
  lines.push(`Prepared at:\n${preparedAt}`);
  return {
    subject: `Venture proposal: ${proposal.title || "New proposition"}`,
    body: lines.join("\n\n"),
  };
}
