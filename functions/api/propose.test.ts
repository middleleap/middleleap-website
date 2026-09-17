import { describe, expect, it, vi } from "vitest";
import { defaultProposalFrom, handleProposal, type SendEmail } from "./propose";

const origin = "https://www.middleleap.com";

const proposal = {
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
  website: "",
};

function post(body: unknown, headers: Record<string, string> = {}): Request {
  const text = typeof body === "string" ? body : JSON.stringify(body);
  return new Request(`${origin}/api/propose`, {
    method: "POST",
    headers: { "content-type": "application/json", origin, ...headers },
    body: text,
  });
}

const env = { RESEND_API_KEY: "re_test" };

describe("POST /api/propose", () => {
  it("sends a validated proposal to MiddleLeap with reply-to set to the submitter", async () => {
    const sendEmail = vi.fn<SendEmail>().mockResolvedValue({ id: "email_123" });
    const response = await handleProposal(post(proposal), env, sendEmail);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.ok).toBe(true);
    expect(data.id).toBe("email_123");

    expect(sendEmail).toHaveBeenCalledTimes(1);
    const message = sendEmail.mock.calls[0][0];
    expect(message.apiKey).toBe("re_test");
    expect(message.from).toBe(defaultProposalFrom);
    expect(message.to).toBe("contact@middleleap.com");
    expect(message.replyTo).toBe("test@example.com");
    expect(message.subject).toBe("Venture proposal: Test venture");
    expect(message.text).toContain("Problem:\nParking is fragmented.");
  });

  it("honours PROPOSAL_TO and PROPOSAL_FROM overrides", async () => {
    const sendEmail = vi.fn<SendEmail>().mockResolvedValue({});
    await handleProposal(
      post(proposal),
      { ...env, PROPOSAL_TO: "studio@middleleap.com", PROPOSAL_FROM: "Studio <noreply@middleleap.com>" },
      sendEmail,
    );
    expect(sendEmail.mock.calls[0][0].to).toBe("studio@middleleap.com");
    expect(sendEmail.mock.calls[0][0].from).toBe("Studio <noreply@middleleap.com>");
  });

  it("answers 503 when no API key is configured so the form falls back to email", async () => {
    const sendEmail = vi.fn<SendEmail>();
    const response = await handleProposal(post(proposal), {}, sendEmail);
    expect(response.status).toBe(503);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("rejects requests from other origins and non-POST methods", async () => {
    const sendEmail = vi.fn<SendEmail>();
    expect((await handleProposal(post(proposal, { origin: "https://evil.example" }), env, sendEmail)).status).toBe(403);
    const withoutOrigin = new Request(`${origin}/api/propose`, { method: "POST", body: JSON.stringify(proposal) });
    expect((await handleProposal(withoutOrigin, env, sendEmail)).status).toBe(403);
    const get = new Request(`${origin}/api/propose`, { method: "GET", headers: { origin } });
    expect((await handleProposal(get, env, sendEmail)).status).toBe(405);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("rejects malformed and incomplete proposals with details", async () => {
    const sendEmail = vi.fn<SendEmail>();
    expect((await handleProposal(post("not json"), env, sendEmail)).status).toBe(400);

    const incomplete = await handleProposal(post({ ...proposal, title: "", terms: false }), env, sendEmail);
    expect(incomplete.status).toBe(400);
    const data = await incomplete.json();
    expect(data.details).toContain("Working title is required.");
    expect(data.details).toContain("The venture submission terms must be accepted.");
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("silently drops honeypot submissions", async () => {
    const sendEmail = vi.fn<SendEmail>();
    const response = await handleProposal(post({ ...proposal, website: "http://spam.example" }), env, sendEmail);
    expect(response.status).toBe(200);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("rejects oversized bodies", async () => {
    const sendEmail = vi.fn<SendEmail>();
    const response = await handleProposal(post({ ...proposal, problem: "x".repeat(20_000) }), env, sendEmail);
    expect(response.status).toBe(413);
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it("reports a delivery failure as 502", async () => {
    const sendEmail = vi.fn<SendEmail>().mockRejectedValue(new Error("Resend responded 500"));
    const response = await handleProposal(post(proposal), env, sendEmail);
    expect(response.status).toBe(502);
  });
});
