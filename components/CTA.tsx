"use client";

import { useState, FormEvent } from "react";
import { validateEmail, type Status } from "@/lib/validation";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const trimmed = email.trim();
    if (!trimmed || !validateEmail(trimmed)) {
      setStatus("error");
      setErrorMsg("Invalid email format.");
      return;
    }

    const username = process.env.NEXT_PUBLIC_BUTTONDOWN_USERNAME;

    if (!username) {
      setStatus("error");
      setErrorMsg("Email capture is not configured yet.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(
        `https://buttondown.com/api/emails/embed-subscribe/${username}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ email: trimmed, embed: "1" }),
        }
      );

      if (!res.ok) {
        throw new Error("Subscription failed. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  return (
    <section id="cta" className="cta-section">
      <div className="rv">
        <div className="sec-label" style={{ textAlign: "center" }}>
          {"// ready?"}
        </div>
      </div>
      <h2 className="cta-title rv">
        Build the 20&times;
        <br />
        company.
      </h2>
      <p className="cta-sub rv rv-d1">
        The next wave of companies will be built by tiny teams with AI-native
        operating models — not by adding headcount. MiddleLeap is the methodology.
        Built by engineers who&apos;ve done this across regulated industries.
      </p>

      {status === "success" ? (
        <div className="cta-input-wrap rv rv-d2">
          <div className="cta-success">Signal received. Check your inbox.</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="cta-input-wrap rv rv-d2">
          <div className="cta-input-inner">
            <div className="cta-prompt">~$</div>
            <input
              type="email"
              className="cta-input"
              placeholder="your_email@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
            />
            <button
              type="submit"
              className="cta-btn"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Sending..." : "Initialize"}
            </button>
          </div>
          {status === "error" && errorMsg && (
            <div className="cta-error">{errorMsg}</div>
          )}
        </form>
      )}

      <div className="cta-note rv rv-d3">
        {status === "success"
          ? "Welcome to the signal."
          : "Get the playbook for 20× product velocity. Unsubscribe anytime."}
      </div>
    </section>
  );
}
