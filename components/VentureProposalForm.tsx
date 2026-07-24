"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import styles from "@/app/ventures/studio/studio.module.css";

type PreparedProposal = {
  body: string;
  mailto: string;
  subject: string;
};

const submissionTermsVersion = "18 July 2026";

export function VentureProposalForm() {
  const [preparedProposal, setPreparedProposal] = useState<PreparedProposal | null>(null);
  const [copyStatus, setCopyStatus] = useState("");

  function prepareProposal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fields = [
      ["Working title", form.get("title")],
      ["Problem", form.get("problem")],
      ["Who experiences it", form.get("audience")],
      ["Existing evidence", form.get("evidence")],
      ["Market or customer access", form.get("access")],
      ["Your connection to the problem", form.get("connection")],
      ["Desired participation", form.get("participation")],
      ["Name", form.get("name")],
      ["Email", form.get("email")],
      ["Submission terms accepted", `Yes — version ${submissionTermsVersion}`],
      ["Prepared at", new Date().toISOString()],
    ];
    const body = fields.map(([label, value]) => `${label}:\n${String(value ?? "").trim() || "—"}`).join("\n\n");
    const subject = `Venture proposal: ${String(form.get("title") ?? "New proposition")}`;
    setPreparedProposal({
      body,
      mailto: `mailto:contact@middleleap.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      subject,
    });
    setCopyStatus("");
  }

  async function copyProposal() {
    if (!preparedProposal) return;

    try {
      await navigator.clipboard.writeText(`${preparedProposal.subject}\n\n${preparedProposal.body}`);
      setCopyStatus("Proposal copied. Paste it into any email application and send it to contact@middleleap.com.");
    } catch {
      setCopyStatus("Automatic copying is unavailable. Select the proposal text below and copy it manually.");
    }
  }

  return (
    <form className={styles.form} onSubmit={prepareProposal}>
      <div className={styles.formIntro}>
        <span>Proposal brief</span>
        <p>This prepares a proposal locally. You choose whether to open email or copy the brief; nothing is submitted automatically.</p>
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
          <option>Venture lead or operator</option>
          <option>Domain or industry partner</option>
          <option>Design partner or prospective customer</option>
          <option>Technical or delivery contributor</option>
          <option>Open to discussing the right role</option>
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
      <label className={`${styles.fullField} ${styles.consent}`}>
        <input name="terms" type="checkbox" required />
        <span>
          I have not included confidential information and I accept the{" "}
          <Link href="/venture-submission-terms">venture submission terms</Link>.
        </span>
      </label>
      <button type="submit">Prepare proposal options →</button>

      {preparedProposal && (
        <section className={styles.preparedProposal} aria-labelledby="prepared-proposal-heading">
          <div>
            <span>Ready to send</span>
            <h3 id="prepared-proposal-heading">Your proposal has been prepared locally.</h3>
            <p>Opening email is convenient, but copying the brief is the reliable fallback if your device has no mail application configured.</p>
          </div>
          <div className={styles.proposalActions}>
            <a href={preparedProposal.mailto}>Open email application →</a>
            <button type="button" onClick={copyProposal}>Copy proposal</button>
            <a href={`mailto:contact@middleleap.com?subject=${encodeURIComponent(preparedProposal.subject)}`}>Open blank email</a>
          </div>
          <p className={styles.copyStatus} aria-live="polite">{copyStatus}</p>
          <textarea
            aria-label="Prepared proposal text"
            className={styles.preparedText}
            readOnly
            rows={14}
            value={`${preparedProposal.subject}\n\n${preparedProposal.body}`}
          />
        </section>
      )}
    </form>
  );
}
