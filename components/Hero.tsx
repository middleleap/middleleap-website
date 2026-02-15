import Image from "next/image";
import AuroraBackground from "./AuroraBackground";

export default function Hero() {
  return (
    <section className="hero">
      <Image
        src="/hero-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-bg-img"
      />
      <AuroraBackground />
      <div className="container">
        <div className="hero-label">System Override</div>
        <h1>
          From Process
          <br />
          to <em>Product.</em>
        </h1>
        <p className="hero-sub">
          The next wave of $100B companies won&apos;t have 2,000 engineers.
          They&apos;ll have 10 — with AI as the base layer, not a bolt-on.
          MiddleLeap is the methodology that gets you there. Built by
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
