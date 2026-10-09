import { describe, expect, it } from "vitest";
import { readProposalAcceptance } from "./proposal";

const acceptedAt = "2026-10-08T11:00:00.000Z";

describe("proposal delivery evidence", () => {
  it("recognises provider acceptance without asserting inbox receipt", () => {
    expect(readProposalAcceptance({ ok: true, status: "accepted_for_delivery", id: "email_123", acceptedAt }))
      .toEqual({ id: "email_123", acceptedAt });
    expect(readProposalAcceptance({ ok: true, id: "email_123", receivedAt: acceptedAt }))
      .toEqual({ id: "email_123", acceptedAt });
  });

  it.each([
    null, [], { ok: true }, { ok: true, id: "email_123" },
    { ok: true, id: null, acceptedAt }, { ok: true, id: " ", acceptedAt },
    { ok: false, id: "email_123", acceptedAt },
    { ok: true, status: "received_inquiry", id: "email_123", acceptedAt },
    { ok: true, id: "email_123", acceptedAt: "2026-02-31T11:00:00.000Z" },
    { ok: true, id: "email_123", acceptedAt: "not a timestamp" },
  ])("rejects incomplete or misleading success evidence: %j", (input) => {
    expect(readProposalAcceptance(input)).toBeNull();
  });
});
