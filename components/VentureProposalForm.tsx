"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  participationOptions,
  proposalEndpoint,
  proposalRecipient,
  serializeProposal,
  validateProposal,
  type ProposalInput,
} from "@/lib/proposal";
import styles from "@/app/ventures/studio/studio.module.css";

type PreparedProposal = {
  body: string;
  mailto: string;
  subject: string;
};

type SubmissionState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent"; receivedAt: string }
  | { status: "fallback"; prepared: PreparedProposal; reason: string };

// Several mail clients truncate or drop mailto: URLs beyond ~2,000 characters,
// so long proposals should steer users to the copy fallback.
const mailtoLengthLimit = 2000;

const fallbackReason =
  "Direct sending is unavailable right now, so the brief has been prepared on your device instead. Open your email application or copy the brief and send it to contact@middleleap.com.";

function prepareLocally(proposal: ProposalInput): PreparedProposal {
  const { subject, body } = serializeProposal(proposal, new Date().toISOString());
  return {
    body,
    mailto: `mailto:${proposalRecipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    subject,
  };
}

async function sendProposal(proposal: ProposalInput): Promise<{ receivedAt: string }> {
  const response = await fetch(proposalEndpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...proposal, website: "" }),
  });
  if (!response.ok) throw new Error(`Proposal endpoint responded ${response.status}`);
  const data = (await response.json()) as { ok?: boolean; receivedAt?: string };
  if (!data.ok) throw new Error("Proposal endpoint declined the submission");
  return { receivedAt: data.receivedAt ?? new Date().toISOString() };
}

export function VentureProposalForm() {
  const [submission, setSubmission] = useState<SubmissionState>({ status: "idle" });
  const [copyStatus, setCopyStatus] = useState("");
  const resultSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (submission.status === "sent" || submission.status === "fallback") resultSectionRef.current?.focus();
  }, [submission]);

  async function submitProposal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const validation = validateProposal({
      ...Object.fromEntries(form.entries()),
      terms: form.get("terms") === "on",
    });
    // The browser's required/maxLength attributes already enforce these
    // limits; this guard only matters if they are bypassed.
    if (!validation.ok) return;

    setCopyStatus("");
    setSubmission({ status: "sending" });
    try {
      const { receivedAt } = await sendProposal(validation.value);
      formElement.reset();
      setSubmission({ status: "sent", receivedAt });
    } catch {
      setSubmission({ status: "fallback", prepared: prepareLocally(validation.value), reason: fallbackReason });
    }
  }

  async function copyProposal() {
    if (submission.status !== "fallback") return;

    try {
      await navigator.clipboard.writeText(`${submission.prepared.subject}\n\n${submission.prepared.body}`);
      setCopyStatus("Proposal copied. Paste it into any email application and send it to contact@middleleap.com.");
    } catch {
      setCopyStatus("Automatic copying is unavailable. Select the proposal text below and copy it manually.");
    }
  }

  const sending = submission.status === "sending";

  return (
    <form className={styles.form} onSubmit={submitProposal}>
      <div className={styles.formIntro}>
        <span>Proposal brief</span>
        <p>Submitting sends this brief to contact@middleleap.com. If direct sending is unavailable, you can open your email application or copy the brief instead.</p>
      </div>

      <label>
        <span>Working title</span>
        <input name="title" maxLength={100} required />
      </label>
      <label className={styles.fullField}>
        <span>What problem needs solving?</span>
        <textarea name="problem" rows={5} maxLength={700} required />
      </label>
      <label>
        <span>Who experiences it?</span>
        <textarea name="audience" rows={4} maxLength={350} required />
      </label>
      <label>
        <span>What evidence already exists?</span>
        <textarea name="evidence" rows={4} maxLength={600} required />
      </label>
      <label>
        <span>What market or customer access do you have?</span>
        <textarea name="access" rows={4} maxLength={350} />
      </label>
      <label>
        <span>Your connection to the problem</span>
        <textarea name="connection" rows={4} maxLength={400} required />
      </label>
      <label className={styles.fullField}>
        <span>How would you like to participate?</span>
        <select name="participation" required defaultValue="">
          <option value="" disabled>Select a role</option>
          {participationOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Your name</span>
        <input name="name" autoComplete="name" maxLength={100} required />
      </label>
      <label>
        <span>Your email</span>
        <input name="email" type="email" autoComplete="email" maxLength={254} required />
      </label>
      {/* Honeypot: hidden from people, filled by naive bots; the endpoint drops any submission that sets it. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className={`${styles.fullField} ${styles.consent}`}>
        <input name="terms" type="checkbox" required />
        <span>
          I have not included confidential information and I accept the{" "}
          <Link href="/venture-submission-terms">venture submission terms</Link>.
        </span>
      </label>
      <button type="submit" disabled={sending} aria-busy={sending}>
        {sending ? "Sending proposal…" : "Send proposal →"}
      </button>

      {submission.status === "sent" && (
        <section
          ref={resultSectionRef}
          tabIndex={-1}
          className={styles.preparedProposal}
          aria-labelledby="proposal-result-heading"
        >
          <div>
            <span>Sent</span>
            <h3 id="proposal-result-heading">Your proposal has been sent.</h3>
            <p>
              MiddleLeap received it at {new Date(submission.receivedAt).toUTCString()} and will reply to the
              email address you gave if there is a fit. Keep your own copy of the brief for your records.
            </p>
          </div>
        </section>
      )}

      {submission.status === "fallback" && (
        <section
          ref={resultSectionRef}
          tabIndex={-1}
          className={styles.preparedProposal}
          aria-labelledby="proposal-result-heading"
        >
          <div>
            <span>Ready to send</span>
            <h3 id="proposal-result-heading">Your proposal has been prepared locally.</h3>
            <p>{submission.reason}</p>
            <p>
              {submission.prepared.mailto.length > mailtoLengthLimit
                ? "This proposal is long enough that some mail applications may truncate it when opened directly — use “Copy proposal” and paste it into a new email instead."
                : "Opening email is convenient, but copying the brief is the reliable fallback if your device has no mail application configured."}
            </p>
          </div>
          <div className={styles.proposalActions}>
            <a href={submission.prepared.mailto}>Open email application →</a>
            <button type="button" onClick={copyProposal}>Copy proposal</button>
            <a href={`mailto:${proposalRecipient}?subject=${encodeURIComponent(submission.prepared.subject)}`}>Open blank email</a>
          </div>
          <p className={styles.copyStatus} aria-live="polite">{copyStatus}</p>
          <textarea
            aria-label="Prepared proposal text"
            className={styles.preparedText}
            readOnly
            rows={14}
            value={`${submission.prepared.subject}\n\n${submission.prepared.body}`}
          />
        </section>
      )}
    </form>
  );
}
