"use client";

export default function CTA() {
  return (
    <section id="cta" className="cta-section">
      <div className="rv">
        <div className="sec-label" style={{ textAlign: "center" }}>
          {"// ready?"}
        </div>
      </div>
      <h2 className="cta-title rv">
        Build the 20×
        <br />
        company.
      </h2>
      <p className="cta-sub rv rv-d1">
        The next wave of companies will be built by tiny teams with AI-native
        operating models — not by adding headcount. MiddleLeap is the methodology.
        Built by engineers who&apos;ve done this across regulated industries.
      </p>
      <div className="cta-input-wrap rv rv-d2">
        <div className="cta-input-inner">
          <div className="cta-prompt">~$</div>
          <input
            type="email"
            className="cta-input"
            placeholder="your_email@company.com"
          />
          <button className="cta-btn">Initialize</button>
        </div>
      </div>
      <div className="cta-note rv rv-d3">
        Get the playbook for 20× product velocity. Unsubscribe anytime.
      </div>
    </section>
  );
}
