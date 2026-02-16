export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-col-title">Navigate</div>
            <a href="#problem">Manifesto</a>
            <a href="#shift">The Shift</a>
            <a href="#whatthismeans">For You</a>
            <a href="#mechanics">Mechanics</a>
            <a href="#governance">Governance</a>
            <a href="#roadmap">Roadmap</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Build</div>
            <a href="#lab">The Lab</a>
            <a href="#toolkit">Toolkit</a>
            <a href="#">GitHub</a>
            <a href="#">Docs</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Read</div>
            <a href="#signal">The Signal</a>
            <a href="#">Case Studies</a>
            <a href="#">Essays</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Connect</div>
            <a href="https://www.linkedin.com/company/middleleap/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:contact@middleleap.com">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div
            className="footer-copy"
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                border: "1px solid var(--smoke)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily:
                  "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
                fontSize: "6px",
                color: "var(--smoke)",
              }}
            >
              &gt;&gt;
            </div>
            MiddleLeap Ventures · Dubai, UAE · The methodology behind the 20×
            company
          </div>
          <div className="footer-copy">© 2025. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
