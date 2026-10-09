import { describe, expect, it } from "vitest";
import { legalTermsEffectiveDate } from "./legal";
import { proposalFields, serializeProposal, validateProposal } from "./proposal";

const valid = {
  title: "Test venture",
  problem: "Parking is fragmented.",
  audience: "Employers",
  evidence: "Waitlists",
  access: "",
  connection: "Operator",
  participation: "Venture lead or operator",
  name: "Test Person",
  email: "test@example.com",
  terms: true,
};

describe("validateProposal", () => {
  it("accepts a complete proposal and trims whitespace", () => {
    const result = validateProposal({ ...valid, title: "  Test venture  " });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.value.title).toBe("Test venture");
  });

  it("rejects non-objects", () => {
    expect(validateProposal(null).ok).toBe(false);
    expect(validateProposal("text").ok).toBe(false);
    expect(validateProposal([]).ok).toBe(false);
  });

  it("names every missing required field", () => {
    const result = validateProposal({ terms: true });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      for (const field of proposalFields) {
        if (field.required) expect(result.errors.join("\n")).toContain(`${field.label} is required.`);
      }
    }
  });

  it("enforces the shared length limits", () => {
    const result = validateProposal({ ...valid, problem: "x".repeat(701) });
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors).toContain("Problem must be 700 characters or fewer.");
  });

  it("requires a plausible email, a listed role and accepted terms", () => {
    expect(validateProposal({ ...valid, email: "not-an-email" }).ok).toBe(false);
    expect(validateProposal({ ...valid, participation: "Something else" }).ok).toBe(false);
    expect(validateProposal({ ...valid, terms: false }).ok).toBe(false);
    // FormData submits a checked checkbox as "on".
    expect(validateProposal({ ...valid, terms: "on" }).ok).toBe(true);
  });
});

describe("serializeProposal", () => {
  it("produces a labelled plain-text body stamped with the terms version", () => {
    const { subject, body } = serializeProposal(valid, "2026-09-17T12:00:00.000Z");
    expect(subject).toBe("Venture proposal: Test venture");
    expect(body).toContain("Working title:\nTest venture");
    expect(body).toContain("Market or customer access:\n—");
    expect(body).toContain(`Submission terms accepted:\nYes — version ${legalTermsEffectiveDate}`);
    expect(body).toContain("Prepared at:\n2026-09-17T12:00:00.000Z");
  });
});
