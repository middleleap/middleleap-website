import type { Metadata } from "next";
import Link from "next/link";
import { InstitutionalIntelligenceSystem } from "@/components/InstitutionalIntelligenceSystem";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "MiddleLeap | Institutional Intelligence for Regulated Businesses",
  description:
    "MiddleLeap helps regulated institutions turn strategic mandates into working capability while building institutional intelligence they own.",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.middleleap.com/#organization",
      name: "MiddleLeap",
      url: "https://www.middleleap.com/",
      email: "contact@middleleap.com",
      foundingDate: "2021",
      founder: { "@id": "https://www.middleleap.com/#michael-ryberg-hartmann" },
      slogan: "Every engagement should leave the institution smarter.",
      description:
        "Independent Dubai-based advisory practice helping regulated institutions move from strategic mandate to working capability while retaining the decisions, architecture, controls and operating knowledge created along the way.",
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
        "Institutional intelligence",
        "Institutional BrainKit",
        "Platform strategy",
        "Open Finance",
        "API strategy",
        "Ecosystem strategy",
        "AI-native operating models",
        "The Loom governed AI delivery method",
        "Regulated industry transformation",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.middleleap.com/#michael-ryberg-hartmann",
      name: "Michael Ryberg Hartmann",
      jobTitle: "Founder and Principal Adviser",
      url: "https://www.middleleap.com/#practice",
      sameAs: ["https://www.linkedin.com/in/michael-ryberg-hartmann"],
      worksFor: { "@id": "https://www.middleleap.com/#organization" },
    },
    {
      "@type": "Service",
      "@id": "https://www.middleleap.com/#advisory-service",
      name: "Regulated platform transformation advisory",
      serviceType: [
        "Executive advisory",
        "Platform and ecosystem strategy",
        "AI-native operating model design",
        "Transformation delivery",
      ],
      provider: { "@id": "https://www.middleleap.com/#organization" },
      areaServed: { "@type": "Place", name: "Middle East and North Africa" },
      description:
        "Senior advisory that delivers working capability and leaves governed institutional intelligence behind.",
    },
  ],
};

const capabilities = [
  {
    number: "01",
    title: "Regulatory & market transformation",
    detail:
      "Turn a regulatory shift into market position, proposition, operating model and accountable execution.",
    href: "/open-finance",
  },
  {
    number: "02",
    title: "Platform & ecosystem strategy",
    detail:
      "Design the platform proposition, APIs, partner model, economics and governance as one commercial system.",
  },
  {
    number: "03",
    title: "AI-native operating models",
    detail:
      "Redesign value streams, decision rights, teams and controls for human-and-agent execution.",
  },
  {
    number: "04",
    title: "Transformation delivery",
    detail:
      "Move from executive mandate through mobilisation to working products, platforms and institutional capability.",
  },
];

const evidence = [
  {
    title: "MENA Open Banking & Open Finance",
    detail:
      "Built and expanded an Open Banking platform across MENA, then led a dual LFI/TPP programme that helped a leading UAE bank achieve first-bank certification and deliver the country’s first live transactions with a licensed TPP.",
  },
  {
    title: "Business banking ecosystems",
    detail:
      "Led the build-out of Danske Bank’s District platform and marketplace across the Nordics and UK, including migration at enterprise scale and API-based partner channels.",
  },
  {
    title: "Enterprise transformation",
    detail:
      "Led a 70+ person digital delivery organisation through an API-first Telco-as-a-Service transformation inside a 140-year-old enterprise.",
  },
  {
    title: "Product to boardroom",
    detail:
      "Experience spanning software engineering and architecture through product, commercial and executive transformation leadership.",
  },
];

const engagements = [
  ["Executive mandate", "Frame a regulatory, platform or operating-model decision with the leaders who own it."],
  ["Strategy sprint", "Resolve the proposition, ecosystem, economics and execution path around one bounded opportunity."],
  ["Governed delivery pilot", "Build one real outcome with The Loom and leave an institution-owned capability behind."],
] as const;

export default function HomePage() {
  return (
    <main className={styles.shell} id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <SiteHeader active="advisory" home priority />

      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Independent advisory · Dubai</p>
          <h1>
            Every engagement should leave the institution <em>smarter.</em>
          </h1>
          <p className={styles.lede}>
            MiddleLeap helps regulated institutions move from strategic mandate to working
            capability—while retaining the decisions, architecture, controls and operating
            knowledge created along the way.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#engage">Discuss a mandate</a>
            <a className={styles.secondaryAction} href="#model">See the operating model</a>
          </div>
          <div className={styles.proofLine} aria-label="MiddleLeap engagement principles">
            <span><strong>Senior-led</strong> from mandate to execution</span>
            <span><strong>Institution-owned</strong> context and capability</span>
            <span><strong>MENA-grounded</strong> regulated market experience</span>
          </div>
        </div>

        <div className={styles.heroThesis} aria-label="MiddleLeap proposition">
          <span>MiddleLeap thesis / 01</span>
          <blockquote>Institutions should not rent intelligence from consultants.</blockquote>
          <div>
            <small>Working capability</small>
            <b>+</b>
            <small>Institutional intelligence</small>
          </div>
          <p>Deliver the mandate in front of you. Strengthen the institution behind it.</p>
        </div>
      </section>

      <section className={styles.expertise} id="expertise">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Advisory is the front door</p>
          <div>
            <h2>Start with the strategic mandate—not the toolkit.</h2>
            <p>
              MiddleLeap works where regulation, platform economics, technology and operating
              models have to move together. The delivery system supports the work; it does not
              replace senior judgement.
            </p>
          </div>
        </div>
        <div className={styles.capabilityGrid}>
          {capabilities.map((capability) => (
            <article key={capability.number}>
              <span>{capability.number}</span>
              <h3>{capability.title}</h3>
              <p>{capability.detail}</p>
              {capability.href && <Link href={capability.href}>Explore the capability →</Link>}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.model} id="model">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The MiddleLeap model</p>
          <div>
            <h2>Build the capability. Codify what made it possible.</h2>
            <p>
              Institutional intelligence is the governed context an organisation can own,
              approve, apply and improve. It grows through delivery—not as a documentation
              exercise after delivery.
            </p>
          </div>
        </div>
        <InstitutionalIntelligenceSystem />
        <div className={styles.modelLink}>
          <Link href="/institutional-intelligence">Explore the institutional intelligence proposition →</Link>
        </div>
      </section>

      <section className={styles.practice} id="practice">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Experience carried into the practice</p>
          <div>
            <h2>Operating evidence across regulated platforms and transformation.</h2>
            <p>
              MiddleLeap is an independent advisory practice. A senior lead stays accountable;
              specialists are assembled around the mandate; client leaders remain inside the
              working system.
            </p>
          </div>
        </div>
        <div className={styles.practiceLayout}>
          <div className={styles.evidenceList}>
            {evidence.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
          <aside className={styles.founderNote}>
            <p className={styles.eyebrow}>Founded in Dubai</p>
            <h3>Michael Ryberg Hartmann</h3>
            <small>Founder and Principal Adviser</small>
            <p>
              More than 20 years across banking, fintech, telecommunications and SaaS. Michael
              leads selected mandates and assembles senior specialists around each client and problem.
            </p>
            <a href="https://www.linkedin.com/in/michael-ryberg-hartmann" target="_blank" rel="noreferrer">
              Founder profile ↗
            </a>
          </aside>
        </div>
      </section>

      <section className={styles.ventureBridge}>
        <div>
          <p className={styles.eyebrow}>MiddleLeap Ventures</p>
          <h2>Put propositions under operating pressure.</h2>
        </div>
        <p>
          Ventures test platform and human-authority principles in working systems. Their
          evidence returns to the advisory practice without becoming the company’s main identity.
        </p>
        <Link href="/ventures">Explore the portfolio →</Link>
      </section>

      <section className={styles.engage} id="engage">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Start with the mandate in front of you</p>
          <div>
            <h2>Deliver the outcome. Leave the institution stronger.</h2>
            <p>
              Bring a regulatory, platform or operating-model mandate. We will shape the right
              senior team and the smallest credible path to evidence.
            </p>
          </div>
        </div>
        <div className={styles.engagementGrid}>
          {engagements.map(([title, detail], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
        <a className={styles.primaryAction} href="mailto:contact@middleleap.com?subject=Strategic%20mandate">
          Discuss your mandate
        </a>
        <p className={styles.contactFallback}>
          Or write directly to <a href="mailto:contact@middleleap.com">contact@middleleap.com</a>.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
