export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-label">System Override</div>
        <h1>
          From Keystrokes
          <br />
          to <em>Decisions.</em>
        </h1>
        <p className="hero-sub">
          Y Combinator is looking for the first 10-person, $100 billion company.
          That&apos;s only possible when AI isn&apos;t bolted on — it&apos;s the
          base layer. MiddleLeap is the methodology that gets you there. Built by
          practitioners with 20+ years shipping software across banking, telco,
          and enterprise.
        </p>
        <div className="hero-cta-row">
          <a href="#cta" className="hero-cta">
            Build the 20× Company →
          </a>
          <a href="#problem" className="hero-cta-ghost">
            Read the manifesto
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div />
      </div>
    </section>
  );
}
