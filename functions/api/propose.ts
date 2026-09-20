// Cloudflare Pages Function: POST /api/propose
//
// Receives the Venture Studio proposal as JSON, validates it against the shared
// field limits and sends it to MiddleLeap by email through Resend. The static
// site has no other server; this file is the whole backend for the form.
//
// Configure as Cloudflare Pages secrets (Settings → Variables and Secrets):
//   RESEND_API_KEY  required; the function answers 503 without it
//   PROPOSAL_TO     optional; defaults to contact@middleleap.com
//   PROPOSAL_FROM   optional; must be on a domain verified in Resend
//
// Wrangler bundles this file for Pages; imports must stay relative.
import { contactEmail } from "../../lib/contact";
import { proposalMaxBodyBytes, serializeProposal, validateProposal } from "../../lib/proposal";

export type ProposalEnv = {
  RESEND_API_KEY?: string;
  PROPOSAL_TO?: string;
  PROPOSAL_FROM?: string;
};

type PagesContext = { request: Request; env: ProposalEnv };

export type SendEmail = (message: {
  apiKey: string;
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}) => Promise<{ id?: string }>;

export const defaultProposalFrom = "MiddleLeap Venture Studio <studio@middleleap.com>";

function json(status: number, data: Record<string, unknown>): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

async function sendWithResend(message: Parameters<SendEmail>[0]): Promise<{ id?: string }> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${message.apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: message.from,
      to: [message.to],
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
    }),
  });
  if (!response.ok) {
    throw new Error(`Resend responded ${response.status}`);
  }
  return (await response.json()) as { id?: string };
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

export async function handleProposal(
  request: Request,
  env: ProposalEnv,
  sendEmail: SendEmail = sendWithResend,
): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { allow: "POST" } });
  }
  if (!sameOrigin(request)) {
    return json(403, { ok: false, error: "Proposals are accepted from the MiddleLeap website only." });
  }
  if (!env.RESEND_API_KEY) {
    return json(503, { ok: false, error: "Direct sending is not configured." });
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > proposalMaxBodyBytes) {
    return json(413, { ok: false, error: "Proposal is too large." });
  }
  const raw = await request.text();
  if (raw.length > proposalMaxBodyBytes) {
    return json(413, { ok: false, error: "Proposal is too large." });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: "Proposal must be JSON." });
  }

  // Honeypot: the visible form never fills `website`. Bots that do get a
  // success response and nothing is sent.
  if (typeof parsed === "object" && parsed !== null && (parsed as Record<string, unknown>).website) {
    return json(200, { ok: true });
  }

  const validation = validateProposal(parsed);
  if (!validation.ok) {
    return json(400, { ok: false, error: "Proposal is incomplete.", details: validation.errors });
  }

  const receivedAt = new Date().toISOString();
  const { subject, body } = serializeProposal(validation.value, receivedAt);

  try {
    const result = await sendEmail({
      apiKey: env.RESEND_API_KEY,
      from: env.PROPOSAL_FROM || defaultProposalFrom,
      to: env.PROPOSAL_TO || contactEmail,
      replyTo: validation.value.email,
      subject,
      text: body,
    });
    return json(200, { ok: true, id: result.id ?? null, receivedAt });
  } catch {
    return json(502, { ok: false, error: "Direct sending failed." });
  }
}

export const onRequest = (context: PagesContext): Promise<Response> =>
  handleProposal(context.request, context.env);
