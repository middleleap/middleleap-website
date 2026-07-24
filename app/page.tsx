import type { Metadata } from "next";
import Link from "next/link";
import { MandateSystem } from "@/components/MandateSystem";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { portfolioProjects } from "@/lib/ventures";
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
      founder: { "@id": "https://middleleap.com/#michael-ryberg-hartmann" },
      slogan: "From strategic mandate to market execution.",
      description:
        "Independent advisory practice assembling senior leadership and specialist teams to help banks, fintechs, financial infrastructure providers, telecommunications companies and other regulated platform businesses navigate market shifts, design scalable platforms and build AI-native operating models.",
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
        "The Loom governed AI delivery harness",
        "AI delivery governance",
        "Regulated industry transformation",
        "Telecommunications transformation",
        "Product operating models",
        "AI-DLC",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://middleleap.com/#michael-ryberg-hartmann",
      name: "Michael Ryberg Hartmann",
      jobTitle: "Founder and Principal Adviser",
      url: "https://middleleap.com/#experience",
      sameAs: ["https://www.linkedin.com/in/michael-ryberg-hartmann"],
      worksFor: { "@id": "https://middleleap.com/#organization" },
      alumniOf: [
        { "@type": "Organization", name: "Fintech Galaxy" },
        { "@type": "Organization", name: "TDC Group" },
        { "@type": "Organization", name: "Danske Bank" },
      ],
      knowsAbout: [
        "Open Finance",
        "Platform strategy",
        "AI-native operating models",
        "Product and technology strategy",
        "Transformation delivery",
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
    detail: "Adopt The Loom around one real outcome and leave a governed repository capability behind.",
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
      <SiteHeader home priority />

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
          <div className={styles.proofLine} role="group" aria-label="MiddleLeap positioning">
            <span><strong>MENA</strong> market focus</span>
            <span><strong>Senior-led</strong> every mandate</span>
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

      <section className={styles.operatingModel} aria-labelledby="operating-model-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>How MiddleLeap fits together</p>
          <div>
            <h2 id="operating-model-title">One practice. Three connected systems.</h2>
            <p className={styles.operatingModelIntro}>
              Advisory frames the mandate. Execution turns it into working capability.
              Ventures test propositions and return operating evidence to the practice.
            </p>
          </div>
        </div>

        <div className={styles.companySystem} aria-label="MiddleLeap company operating model">
          <div className={styles.companySystemHeader}>
            <span>MiddleLeap operating system / 03</span>
            <b>Evidence compounds</b>
          </div>
          <div className={styles.companySystemFlow}>
            <article>
              <span>01 · Front door</span>
              <h3>Advisory</h3>
              <p>Frame the strategic, regulatory and commercial mandate.</p>
              <div><small>What we do</small><small>How we work</small><small>Experience</small></div>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>02 · Delivery system</span>
              <h3>Execution</h3>
              <p>Use a governed harness and installable toolkit to deliver.</p>
              <div><small>The Loom</small><small>The Loom Toolkit</small></div>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>03 · Evidence engine</span>
              <h3>Ventures</h3>
              <p>Test propositions in operating reality and expose the next decision.</p>
              <div><small>Portfolio</small><small>Venture Studio</small></div>
            </article>
          </div>
          <div className={styles.companySystemReturn}>
            <span>Operating evidence</span>
            <b aria-hidden="true">↶</b>
            <strong>Learning returns to Advisory and sharpens the next mandate.</strong>
          </div>
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

        <div className={styles.loomFeature}>
          <div className={styles.loomCopy}>
            <p className={styles.eyebrow}>The Loom · Governed AI delivery</p>
            <h3>Find the right problem. Ship it under control. Learn from what runs.</h3>
            <p>
              Two harnesses turn an evidenced mandate into audit-ready software.
              Operational signals then return to Discovery, keeping assurance and the
              institution&apos;s context current.
            </p>
            <div className={styles.loomActions}>
              <Link href="/the-loom">Explore the closed loop →</Link>
              <Link href="/ai-dlc">View the technical toolkit →</Link>
            </div>
          </div>
          <div className={styles.loomMini} role="img" aria-label="The Loom combines Discovery and Delivery harnesses with a Run feedback arc">
            <div className={styles.loomMiniHeader}>
              <span>Mandate → outcome</span>
              <b>Two harnesses · one loop</b>
            </div>
            <div className={styles.loomMiniFlow}>
              <article className={styles.loomDiamond}>
                <small>Diamond 01</small>
                <strong>Discovery</strong>
                <span>Discover → Define · D1—D9</span>
              </article>
              <div className={styles.loomWaist}>
                <small>Gate-green</small>
                <strong>Hand-off</strong>
              </div>
              <article className={styles.loomDiamond}>
                <small>Diamond 02</small>
                <strong>Delivery</strong>
                <span>Develop → Deliver · Q1—Q5</span>
              </article>
            </div>
            <div className={styles.loomRuntime}>
              <span>Audit-ready software</span>
              <i aria-hidden="true">→</i>
              <strong>Run / Operations</strong>
              <b aria-hidden="true">↶</b>
              <small>Signals return to Discovery as evidence</small>
            </div>
            <div className={styles.loomWarp}>
              <span>Four-eyes</span>
              <span>Audit</span>
              <span>Lineage</span>
              <span>Gates</span>
              <span>Residency</span>
            </div>
            <div className={styles.loomProof}>
              <span><strong>134 / ~139</strong> stories to done</span>
              <span><strong>2 + 1</strong> harnesses + Run arc</span>
              <span><strong>0</strong> real records</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.experience} id="experience">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The practice behind the mandate</p>
          <div>
            <h2>Senior leadership, assembled around the work.</h2>
            <p className={styles.experienceIntro}>
              MiddleLeap is an independent advisory practice built for mandates that cross
              strategy, regulation, product, technology and delivery. Each engagement is shaped
              around the work—not a fixed consulting bench.
            </p>
          </div>
        </div>

        <div className={styles.practiceGrid}>
          <article>
            <span>01</span>
            <h3>Senior accountability</h3>
            <p>
              A senior lead stays accountable from mandate framing through the decisions,
              operating model and route to execution.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Specialists around the problem</h3>
            <p>
              Regulation, strategy, product, technology, ecosystem and delivery expertise is
              brought in where the mandate requires it.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Client ownership by design</h3>
            <p>
              Client leaders remain part of the working system so decisions, institutional
              context and delivery capability stay inside the organization.
            </p>
          </article>
        </div>

        <div className={styles.experienceLayout}>
          <div className={styles.evidencePanel}>
            <p className={styles.eyebrow}>Experience carried into the practice</p>
            <h3>Operating evidence across regulated platforms and transformation.</h3>
            <div className={styles.evidenceList}>
              <div>
                <strong>MENA Open Banking &amp; Open Finance</strong>
                <span>Built and expanded an Open Banking platform across MENA, then led a dual LFI/TPP programme that helped a leading UAE bank achieve first-bank certification under the UAE framework and deliver the country&apos;s first live transactions with a licensed TPP.</span>
              </div>
              <div>
                <strong>Business banking ecosystems</strong>
                <span>Led the build-out of Danske Bank&apos;s District platform and marketplace across the Nordics and UK, including the migration of 250,000 SMEs, corporates and institutions and the development of API-based partner channels.</span>
              </div>
              <div>
                <strong>Enterprise transformation</strong>
                <span>Led a 70+ person digital delivery organization through an API-first Telco-as-a-Service transformation within a 140-year-old enterprise, modernising the operating model as well as the technology.</span>
              </div>
              <div>
                <strong>Product to boardroom</strong>
                <span>Experience spanning software engineering and architecture through product, commercial and executive transformation leadership.</span>
              </div>
            </div>
          </div>

          <aside className={styles.founderNote}>
            <p className={styles.eyebrow}>Founded in Dubai</p>
            <h3>Michael Ryberg Hartmann</h3>
            <small>Founder and Principal Adviser</small>
            <p>
              Michael founded MiddleLeap after more than 20 years across banking, fintech,
              telecommunications and SaaS, including senior roles at a leading UAE bank,
              Fintech Galaxy, TDC Group, Danske Bank and Planday.
            </p>
            <p>
              He leads selected mandates and assembles the senior specialists required
              around each client and problem.
            </p>
            <a href="https://www.linkedin.com/in/michael-ryberg-hartmann" target="_blank" rel="noreferrer">
              Founder profile ↗
            </a>
          </aside>
        </div>
      </section>

      <section className={styles.ventures} id="ventures">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>MiddleLeap Ventures</p>
          <div>
            <h2>One regulated proof. Two venture experiments.</h2>
            <p className={styles.venturesIntro}>
              Backoffice demonstrates governed delivery in MiddleLeap&apos;s core market.
              Parqo and HiveMind test transferable platform and human-authority principles
              in different operating contexts. Their roles are deliberately not presented as equal evidence.
            </p>
          </div>
        </div>

        <div className={styles.ventureLoop} role="img" aria-label="MiddleLeap venture learning loop">
          <span><b>Build</b> Working assets</span>
          <i aria-hidden="true">→</i>
          <span><b>Learn</b> Operating intelligence</span>
          <i aria-hidden="true">→</i>
          <span><b>Apply</b> Stronger mandates</span>
        </div>

        <div className={styles.ventureGrid}>
          {portfolioProjects.map((project, index) => (
            <article key={project.name}>
              <div className={styles.ventureMeta}>
                <span>0{index + 1}</span>
                <small>{project.portfolioRole}</small>
              </div>
              <h3>{project.name}</h3>
              <p>{project.summary}</p>
              <div className={styles.ventureProjects}>
                <span>{project.type}</span>
                <span>{project.status}</span>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.venturesFooter}>
          <p>Working platforms · Operating evidence · New propositions</p>
          <div className={styles.loomActions}>
            <Link className={styles.venturesLink} href="/ventures">Explore MiddleLeap Ventures →</Link>
            <Link className={styles.venturesLink} href="/ventures/studio">Propose a venture →</Link>
          </div>
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
        <p className={styles.contactFallback}>
          Prefer to use your own email client? Copy <a href="mailto:contact@middleleap.com">contact@middleleap.com</a>.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
