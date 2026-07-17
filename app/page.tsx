import type { Metadata } from "next";
import Link from "next/link";
import { BrandLockup } from "@/components/BrandLockup";
import { MandateSystem } from "@/components/MandateSystem";
import { ventureFamilies } from "@/lib/ventures";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "MiddleLeap | Platform Strategy & AI-Native Transformation",
  description:
    "MiddleLeap advises banks, fintechs, financial infrastructure and telecommunications providers on platform strategy and AI-native transformation.",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://middleleap.com/#organization",
      name: "MiddleLeap",
      url: "https://middleleap.com/",
      email: "contact@middleleap.com",
      foundingDate: "2021",
      slogan: "From strategic mandate to market execution.",
      description:
        "Independent advisory firm helping banks, fintechs, financial infrastructure providers, telecommunications companies and other regulated platform businesses navigate market shifts, design scalable platforms and build AI-native operating models.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
      areaServed: [
        { "@type": "Place", name: "Middle East and North Africa" },
        { "@type": "Country", name: "United Arab Emirates" },
      ],
      knowsAbout: [
        "Platform strategy",
        "Open Finance",
        "Embedded finance",
        "API strategy",
        "Ecosystem strategy",
        "AI-native operating models",
        "Agentic workflows",
        "Regulated industry transformation",
        "Telecommunications transformation",
        "Product operating models",
        "AI-DLC",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://middleleap.com/#website",
      url: "https://middleleap.com/",
      name: "MiddleLeap",
      description:
        "Platform strategy and AI-native transformation for regulated businesses.",
      publisher: { "@id": "https://middleleap.com/#organization" },
      inLanguage: "en",
    },
    {
      "@type": "Service",
      "@id": "https://middleleap.com/#advisory-service",
      name: "Regulated platform transformation advisory",
      serviceType: [
        "Executive advisory",
        "Platform and ecosystem strategy",
        "AI-native operating model design",
        "Transformation and execution",
      ],
      provider: { "@id": "https://middleleap.com/#organization" },
      areaServed: {
        "@type": "Place",
        name: "Middle East and North Africa",
      },
      description:
        "Senior advisory from strategic mandate through platform design, mobilisation and market execution.",
    },
  ],
};

const shifts = [
  {
    number: "01",
    title: "Regulated market shifts",
    question: "How will new mandates become market position and advantage?",
  },
  {
    number: "02",
    title: "Platform businesses",
    question: "How will APIs, partners and ecosystems create value?",
  },
  {
    number: "03",
    title: "AI-native operations",
    question: "How must the organization work differently to compete?",
  },
];

const capabilities = [
  {
    number: "01",
    title: "Regulatory & market transformation",
    detail:
      "Open Finance strategy, regulatory readiness, LFI and TPP operating models, market entry and ecosystem participation.",
  },
  {
    number: "02",
    title: "Platform & ecosystem strategy",
    detail:
      "Platform propositions, API strategy, embedded finance, partnerships, commercial models and monetisation.",
  },
  {
    number: "03",
    title: "AI-native operating models",
    detail:
      "Value-stream redesign, agentic workflows, product and engineering models, governance and control.",
  },
  {
    number: "04",
    title: "Transformation & execution",
    detail:
      "Executive mobilisation, programme leadership, platform delivery, organization design and delivery modernisation.",
  },
];

const approach = [
  { number: "01", name: "Frame", detail: "Clarify the regulatory, commercial or operating mandate." },
  { number: "02", name: "Design", detail: "Shape the proposition, ecosystem, platform and operating model." },
  { number: "03", name: "Mobilise", detail: "Align leaders, partners, product teams and governance stakeholders." },
  { number: "04", name: "Deliver", detail: "Turn the strategy into working products and capabilities." },
  { number: "05", name: "Codify", detail: "Embed reusable knowledge, controls and agent workflows." },
];

const engagements = [
  {
    title: "Executive advisory",
    detail: "Senior guidance for regulatory, platform and transformation mandates.",
  },
  {
    title: "Platform strategy sprint",
    detail: "Define the proposition, ecosystem, commercial model and execution roadmap.",
  },
  {
    title: "AI-native delivery pilot",
    detail: "Apply AI-DLC to one real platform, product or operating outcome.",
  },
];

export default function HomePage() {
  return (
    <main className={styles.shell} id="problem">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <header className={styles.nav}>
        <BrandLockup priority />
        <nav className={styles.navLinks} aria-label="Primary navigation">
          <a href="#expertise">Expertise</a>
          <a href="#method">How we work</a>
          <Link href="/ventures">Ventures</Link>
          <a href="#experience">Experience</a>
        </nav>
        <a className={styles.navCta} href="#engage">Discuss a mandate</a>
        <details className={styles.mobileMenu}>
          <summary><span aria-hidden="true" /> Menu</summary>
          <nav aria-label="Mobile navigation">
            <a href="#expertise">Expertise</a>
            <a href="#method">How we work</a>
            <Link href="/ventures">Ventures</Link>
            <a href="#experience">Experience</a>
            <a href="#engage">Discuss a mandate</a>
          </nav>
        </details>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Regulated markets · Platform businesses · AI-native execution</p>
          <h1>
            From strategic mandate<br />to <em>market execution.</em>
          </h1>
          <p className={styles.lede}>
            MiddleLeap helps banks, fintechs, financial infrastructure providers,
            telecommunications companies and other regulated platform businesses
            navigate market shifts, design scalable platforms and build AI-native
            operating models.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#engage">Discuss a strategic mandate</a>
            <a className={styles.secondaryAction} href="#expertise">Explore our capabilities</a>
          </div>
          <div className={styles.proofLine} aria-label="MiddleLeap positioning">
            <span><strong>MENA</strong> market focus</span>
            <span><strong>20+ years</strong> regulated platforms</span>
            <span><strong>Strategy</strong> through execution</span>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <MandateSystem />
        </div>
      </section>

      <section className={styles.shift}>
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The new mandate</p>
          <h2>Financial services is being redesigned around platforms, ecosystems and intelligent agents.</h2>
        </div>
        <div className={styles.shiftGrid}>
          {shifts.map((shift) => (
            <article key={shift.number}>
              <span>{shift.number}</span>
              <h3>{shift.title}</h3>
              <p>{shift.question}</p>
            </article>
          ))}
        </div>
        <p className={styles.shiftConclusion}>
          The opportunity is not simply to comply or deploy new technology. It is
          to redesign the proposition, ecosystem and operating model together.
        </p>
      </section>

      <section className={styles.expertise} id="expertise">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>What we do</p>
          <h2>Strategy designed to reach execution.</h2>
        </div>
        <div className={styles.capabilityGrid}>
          {capabilities.map((capability) => (
            <article key={capability.number}>
              <span>{capability.number}</span>
              <h3>{capability.title}</h3>
              <p>{capability.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.method} id="method">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>How we work</p>
          <h2>From mandate to working capability.</h2>
        </div>
        <ol className={styles.approach}>
          {approach.map((item) => (
            <li key={item.number}>
              <span>{item.number}</span>
              <strong>{item.name}</strong>
              <p>{item.detail}</p>
            </li>
          ))}
        </ol>

        <div className={styles.aidlc}>
          <div className={styles.aidlcCopy}>
            <p className={styles.eyebrow}>The execution engine</p>
            <h3>AI-DLC turns strategic intent into governed delivery.</h3>
            <p>
              MiddleLeap&apos;s Adaptive Development Lifecycle converts outcomes into
              specifications that people and intelligent agents can execute. It
              compresses discovery-to-delivery without losing architectural
              integrity, governance or auditability.
            </p>
          </div>
          <div className={styles.aidlcFlow} aria-label="AI-DLC delivery flow">
            <span>Outcome</span><b>→</b><span>Specify</span><b>→</b><span>Execute</span><b>→</b><span>Verify</span><b>→</b><span>Codify</span>
          </div>
        </div>
      </section>

      <section className={styles.ventures} id="ventures">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Ventures &amp; open infrastructure</p>
          <div>
            <h2>We build what we advise.</h2>
            <p className={styles.venturesIntro}>
              MiddleLeap contributes to open ecosystems, creates focused platform
              ventures and codifies AI-native execution systems—turning practical
              experience into stronger strategic and delivery advice.
            </p>
          </div>
        </div>

        <div className={styles.ventureLoop} aria-label="MiddleLeap venture learning loop">
          <span><b>Build</b> Working assets</span>
          <i aria-hidden="true">→</i>
          <span><b>Learn</b> Operating intelligence</span>
          <i aria-hidden="true">→</i>
          <span><b>Apply</b> Stronger mandates</span>
        </div>

        <div className={styles.ventureGrid}>
          {ventureFamilies.map((family) => (
            <article key={family.id}>
              <div className={styles.ventureMeta}>
                <span>{family.number}</span>
                <small>{family.eyebrow}</small>
              </div>
              <h3>{family.title}</h3>
              <p>{family.proposition}</p>
              <div className={styles.ventureProjects}>
                {family.projects.slice(0, 3).map((project) => (
                  <span key={project.name}>{project.name}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className={styles.venturesFooter}>
          <p>Open ecosystem infrastructure · Owned platform ventures · AI-native execution tooling</p>
          <Link className={styles.venturesLink} href="/ventures">Explore MiddleLeap Ventures →</Link>
        </div>
      </section>

      <section className={styles.experience} id="experience">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Experience behind the practice</p>
          <h2>Built in regulated markets—not in a transformation lab.</h2>
        </div>
        <div className={styles.experienceLayout}>
          <div className={styles.evidenceList}>
            <div><strong>20+ years</strong><span>Across banking, fintech, telecommunications and SaaS</span></div>
            <div><strong>UAE firsts</strong><span>Leadership behind first bank certification and first live licensed-TPP transactions</span></div>
            <div><strong>Platform scale</strong><span>Open Finance, BaaS, premium APIs, partner ecosystems and large-scale customer platforms</span></div>
            <div><strong>Execution depth</strong><span>Executive leadership across strategy, commercial growth, technology and transformation delivery</span></div>
          </div>

          <aside className={styles.network}>
            <p className={styles.eyebrow}>Built around the mandate</p>
            <h3>Senior expertise without the generic staffing model.</h3>
            <p>
              MiddleLeap assembles focused teams around each engagement, combining
              a senior lead advisor with specialists across regulation, strategy,
              product, technology, ecosystems and delivery.
            </p>
            <div className={styles.networkModel} aria-label="MiddleLeap engagement team model">
              <span>Lead advisor</span><b>+</b><span>Domain specialists</span><b>+</b><span>Client leadership</span>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.engage} id="engage">
        <div>
          <p className={styles.eyebrow}>Start with the mandate in front of you</p>
          <h2>Bring the right senior team to the problem.</h2>
        </div>
        <div className={styles.engagementGrid}>
          {engagements.map((engagement, index) => (
            <article key={engagement.title}>
              <span>0{index + 1}</span>
              <h3>{engagement.title}</h3>
              <p>{engagement.detail}</p>
            </article>
          ))}
        </div>
        <a className={styles.primaryAction} href="mailto:contact@middleleap.com?subject=Strategic%20mandate">
          Discuss your mandate →
        </a>
      </section>

      <footer className={styles.footer}>
        <span>MiddleLeap · Independent advisory firm · Dubai, UAE</span>
        <a href="#problem">Back to top</a>
      </footer>
    </main>
  );
}
