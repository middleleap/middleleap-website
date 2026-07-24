import type { Metadata } from "next";
import Link from "next/link";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./open-finance.module.css";

export const metadata: Metadata = {
  title: "Open Finance Advisory | MENA Strategy & Execution",
  description:
    "MiddleLeap helps banks, fintechs and financial infrastructure providers turn Open Finance mandates into propositions, platforms, operating models and market execution.",
  alternates: { canonical: "/open-finance" },
  openGraph: {
    title: "Open Finance Advisory | MiddleLeap",
    description:
      "Senior advisory for Open Finance strategy, regulatory readiness, LFI and TPP operating models, ecosystems and execution across MENA.",
    url: "https://www.middleleap.com/open-finance",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.middleleap.com/open-finance#service",
      name: "Open Finance advisory",
      serviceType: [
        "Open Finance strategy",
        "Regulatory readiness",
        "LFI operating model design",
        "TPP and embedded finance strategy",
        "Platform and ecosystem strategy",
        "Transformation mobilisation",
      ],
      provider: { "@id": "https://www.middleleap.com/#organization" },
      areaServed: {
        "@type": "Place",
        name: "Middle East and North Africa",
      },
      description:
        "Senior advisory that connects Open Finance regulatory obligations with proposition design, platform strategy, ecosystem economics and operating-model execution.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Advisory",
          item: "https://www.middleleap.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Open Finance",
          item: "https://www.middleleap.com/open-finance",
        },
      ],
    },
  ],
};

const decisions = [
  {
    number: "01",
    title: "Market position",
    detail:
      "Decide where the institution will lead, participate or partner as regulation changes the value chain.",
    output: "Strategic position · executive decisions",
  },
  {
    number: "02",
    title: "Proposition",
    detail:
      "Translate permitted data and payment capabilities into customer, partner and embedded-finance propositions.",
    output: "Use cases · value proposition · economics",
  },
  {
    number: "03",
    title: "Platform",
    detail:
      "Shape the consent, data, API, partner and control capabilities required to operate at ecosystem scale.",
    output: "Capability model · platform roadmap",
  },
  {
    number: "04",
    title: "Operating model",
    detail:
      "Align product, technology, risk, compliance, operations and partner management around accountable execution.",
    output: "Decision rights · governance · mobilisation",
  },
] as const;

const workstreams = [
  ["01", "Frame the mandate", "Clarify the regulatory direction, commercial ambition, risk posture and decisions that leadership must own."],
  ["02", "Design the role", "Choose the LFI, TPP, embedded-finance or infrastructure role and the propositions that make it valuable."],
  ["03", "Shape the ecosystem", "Define priority partners, participation rules, commercial logic and the capabilities each party must provide."],
  ["04", "Mobilise the platform", "Connect APIs, consent, data, controls, operations and delivery into one sequenced transformation roadmap."],
  ["05", "Move to execution", "Create accountable workstreams, executive governance and evidence loops that expose the next decision early."],
] as const;

const engagementModels = [
  {
    label: "Executive advisory",
    title: "Hold the strategic line",
    detail:
      "Senior support for boards, executives and programme sponsors making regulatory, proposition and ecosystem decisions.",
  },
  {
    label: "Strategy sprint",
    title: "Resolve the critical choices",
    detail:
      "A focused engagement to establish position, priority propositions, platform implications and an execution roadmap.",
  },
  {
    label: "Mobilisation",
    title: "Turn direction into movement",
    detail:
      "Programme leadership that aligns product, technology, risk, operations and external partners around delivery.",
  },
] as const;

export default function OpenFinancePage() {
  return (
    <main className={styles.shell} id="problem">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <SiteHeader
        active="open-finance"
        priority
        breadcrumbs={[
          { href: "/", label: "Advisory" },
          { href: "/#expertise", label: "What we do" },
          { label: "Open Finance" },
        ]}
        contextLabel="Open Finance navigation"
        contextLinks={[
          { href: "#mandates", label: "Mandates" },
          { href: "#work", label: "The work" },
          { href: "#evidence", label: "Evidence" },
          { href: "#engage", label: "Engage" },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Open Finance advisory · MENA</p>
          <h1>
            Turn regulatory change into <em>platform advantage.</em>
          </h1>
          <p className={styles.lede}>
            MiddleLeap helps banks, fintechs and financial infrastructure providers
            connect Open Finance obligations with market position, propositions,
            ecosystem economics, platform capabilities and accountable execution.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#engage">Discuss an Open Finance mandate</a>
            <a className={styles.secondaryAction} href="#evidence">Review the evidence</a>
          </div>
        </div>

        <div
          className={styles.decisionSystem}
          role="img"
          aria-label="Open Finance decision system connecting a regulatory mandate to market position, proposition, platform and operating model"
        >
          <div className={styles.systemHeader}>
            <span>Open Finance decision system / 04</span>
            <b>MENA focus</b>
          </div>
          <div className={styles.systemMandate}>
            <span>Regulatory mandate</span>
            <strong>What role will the institution play?</strong>
          </div>
          <div className={styles.systemFlow}>
            <article>
              <small>01</small>
              <strong>Position</strong>
              <span>Role in the value chain</span>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <small>02</small>
              <strong>Proposition</strong>
              <span>Customer and partner value</span>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <small>03</small>
              <strong>Platform</strong>
              <span>Data, consent and APIs</span>
            </article>
          </div>
          <div className={styles.systemOperating}>
            <span>04 · Operating model</span>
            <strong>LFI · TPP · Risk · Operations · Partners</strong>
          </div>
          <div className={styles.systemOutput}>
            <span>Market-ready participation model</span>
            <b aria-hidden="true">◆</b>
          </div>
        </div>
      </section>

      <ExecutiveSummary
        eyebrow="Executive view"
        title="Open Finance is a business-model decision with regulatory consequences."
        intro="The mandate crosses the boardroom and delivery floor. MiddleLeap keeps market position, proposition, platform, controls and mobilisation inside one decision system."
        items={[
          { label: "Mandate", title: "Regulation into strategy", detail: "Turn new obligations and permissions into an explicit institutional position." },
          { label: "For whom", title: "Banks and platforms", detail: "Built for banks, fintechs, TPPs and infrastructure providers shaping their role in the ecosystem." },
          { label: "Scope", title: "End-to-end choices", detail: "Connect use cases, economics, APIs, consent, controls, partners and operations." },
          { label: "Experience", title: "MENA market activation", detail: "Draw on platform-building and bank-side leadership across Open Banking and Open Finance." },
          { label: "Next step", title: "Resolve one mandate", detail: "Start with the decisions blocking strategic position or execution—not a generic transformation programme." },
        ]}
      />

      <section className={styles.section} id="mandates">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Mandates we take on</p>
          <div>
            <h2>Move the boardroom and delivery floor through the same decisions.</h2>
            <p>
              Open Finance becomes fragmented when regulatory readiness, proposition
              design and technology delivery run as separate programmes. The work must
              resolve four connected choices.
            </p>
          </div>
        </div>
        <div className={styles.decisionGrid}>
          {decisions.map((decision) => (
            <article key={decision.number}>
              <span>{decision.number}</span>
              <h3>{decision.title}</h3>
              <p>{decision.detail}</p>
              <small>{decision.output}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} id="work">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>The work</p>
          <div>
            <h2>One mandate. Five connected workstreams.</h2>
            <p>
              The sequence is adapted to the institution. The discipline is constant:
              each workstream must make the next executive or delivery decision clearer.
            </p>
          </div>
        </div>
        <ol className={styles.workstream}>
          {workstreams.map(([number, title, detail]) => (
            <li key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${styles.section} ${styles.evidenceSection}`} id="evidence">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Experience carried into the practice</p>
          <div>
            <h2>Evidence from both sides of the Open Finance market.</h2>
            <p>
              The experience below was built in prior executive roles and is brought
              into MiddleLeap&apos;s advisory practice. It is distinguished from work
              contracted directly by MiddleLeap.
            </p>
          </div>
        </div>

        <div className={styles.evidenceFeature}>
          <div className={styles.evidenceTimeline} aria-label="MENA Open Banking and Open Finance experience">
            <article>
              <span>Platform side</span>
              <h3>Build and expand across MENA</h3>
              <p>
                Built and expanded an Open Banking platform across the region, working
                across institutions, fintechs and emerging ecosystem requirements.
              </p>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>Institution side</span>
              <h3>Turn a framework into live participation</h3>
              <p>
                Led a dual LFI/TPP programme that helped a leading UAE bank achieve
                first-bank certification under the national framework and deliver the
                country&apos;s first live transactions with a licensed TPP.
              </p>
            </article>
          </div>
          <div className={styles.evidenceResult}>
            <span>Transferable perspective</span>
            <strong>Platform economics and institutional execution in one advisory frame.</strong>
          </div>
        </div>

        <div className={styles.supportingEvidence}>
          <article>
            <span>Business banking ecosystems</span>
            <h3>District platform and marketplace</h3>
            <p>
              Led the build-out of Danske Bank&apos;s District platform across the
              Nordics and UK, including API-based partner channels and the migration
              of 250,000 SMEs, corporates and institutions.
            </p>
          </article>
          <article>
            <span>Current working proof</span>
            <h3>Open Finance Backoffice</h3>
            <p>
              MiddleLeap&apos;s synthetic-only regulated build turns obligations into
              governed workflows and demonstrates how strategy, controls and delivery
              evidence can be constructed together.
            </p>
            <Link href="/ventures/backoffice">Read the build record →</Link>
          </article>
          <article>
            <span>Execution method</span>
            <h3>The Loom</h3>
            <p>
              A governed discovery and delivery system for moving one evidenced
              mandate into working software while accountable people retain authority.
            </p>
            <Link href="/the-loom">Explore the method →</Link>
          </article>
        </div>
      </section>

      <section className={styles.engage} id="engage">
        <div className={styles.engageIntro}>
          <p className={styles.eyebrow}>Engagement models</p>
          <h2>Start with the decision that cannot stay unresolved.</h2>
          <p>
            MiddleLeap assembles senior regulatory, strategy, product, technology and
            delivery expertise around the mandate rather than bringing a fixed bench.
          </p>
        </div>
        <div className={styles.engagementGrid}>
          {engagementModels.map((model, index) => (
            <article key={model.label}>
              <span>0{index + 1} / {model.label}</span>
              <h3>{model.title}</h3>
              <p>{model.detail}</p>
            </article>
          ))}
        </div>
        <div className={styles.engageActionRow}>
          <a
            className={styles.primaryAction}
            href="mailto:contact@middleleap.com?subject=Open%20Finance%20mandate"
          >
            Discuss the mandate
          </a>
          <span>contact@middleleap.com · Dubai, UAE</span>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
