import { pageMetadata } from "@/lib/seo";
import { bookingLinkProps, contactEmail, mailtoHref } from "@/lib/contact";
import Link from "next/link";
import chromeStyles from "@/components/SiteChrome.module.css";
import { engagementModels } from "@/lib/engagements";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./open-finance.module.css";

export const metadata = pageMetadata({
  title: "Open Finance Advisory & Complimentary Review | MiddleLeap",
  description:
    "A complimentary Open Finance review for banks and fintechs: a 60-minute working session and two-page takeaway with three priorities and a suggested 90-day sequence.",
  path: "/open-finance",
  socialTitle: "Open Finance Readiness & Value Review | MiddleLeap",
  socialDescription:
    "Start with a short fit call, a 60-minute working session and a two-page decision brief. Any paid follow-on is optional and separately scoped.",
});

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

export default function OpenFinancePage() {
  return (
    <main className={styles.shell} id="problem" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <SiteHeader
        active="what"
        breadcrumbs={[
          { href: "/", label: "Advisory" },
          { href: "/#expertise", label: "What we do" },
          { label: "Open Finance" },
        ]}
        contextLabel="Open Finance navigation"
        contextLinks={[
          { href: "#readiness-review", label: "Complimentary review" },
          { href: "#illustrative-takeaway", label: "Takeaway" },
          { href: "#mandates", label: "Mandates" },
          { href: "#evidence", label: "Evidence" },
          { href: "#engage", label: "Paid advisory" },
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
          <p className={styles.offerTeaser}>
            Start with a complimentary Open Finance Readiness &amp; Value Review:
            one working session and a two-page brief to frame your next decision.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#readiness-review">Explore the complimentary review</a>
            <a className={styles.secondaryAction} href="#illustrative-takeaway">View illustrative takeaway</a>
          </div>
        </div>

        <div
          className={styles.decisionSystem}
          role="group"
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

      <section className={styles.section} id="readiness-review" tabIndex={-1} aria-labelledby="readiness-review-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Complimentary review</p>
          <div>
            <h2 id="readiness-review-title">Open Finance Readiness &amp; Value Review</h2>
            <p>
              For leaders in banks, fintechs and financial infrastructure providers
              weighing an Open Finance proposition or preparing their next delivery
              decision. Bring one mandate that needs a clearer next step.
            </p>
            <p>
              The review is complimentary, with no obligation to commission further
              work. Regulatory certification and independent assurance sit outside
              its scope.
            </p>
          </div>
        </div>
        <ol className={styles.reviewSteps}>
          <li>
            <span>01 / Check the fit</span>
            <h3>A short fit call</h3>
            <p>
              Outline your role, the decision and the context you can safely share.
              We confirm whether the review is a useful fit before arranging the
              working session.
            </p>
          </li>
          <li>
            <span>02 / Work the decision</span>
            <h3>A 60-minute working session</h3>
            <p>
              Map your intended market role, one priority proposition, readiness
              questions and delivery dependencies with the relevant sponsor. Work
              from public or approved non-confidential context; keep unknowns visible.
            </p>
          </li>
          <li>
            <span>03 / Take away the priorities</span>
            <h3>A two-page takeaway</h3>
            <p>
              Receive a concise decision brief with three priorities, evidence gaps
              and a suggested 90-day sequence. Your accountable owners validate the
              assumptions and decide what happens next.
            </p>
          </li>
        </ol>
        <div className={styles.actions}>
          <a className={styles.primaryAction} {...bookingLinkProps}>Book a fit call</a>
          <a className={styles.secondaryAction} href={mailtoHref("Open Finance Readiness & Value Review")}>
            Request the review by email
          </a>
          <a className={styles.secondaryAction} href="#illustrative-takeaway">View illustrative takeaway</a>
        </div>
        <p className={styles.reviewPrivacy}>
          Please share only public or non-confidential context. Do not send customer
          data, credentials or internal bank documents. If protected material is
          needed later, agree confidentiality and handling arrangements first. Read
          our <Link href="/privacy">privacy notice</Link>.
        </p>
      </section>

      <section className={styles.section} id="illustrative-takeaway" tabIndex={-1} aria-labelledby="illustrative-takeaway-title">
        <div className={styles.sectionIntro}>
          <p className={styles.eyebrow}>Illustrative deliverable</p>
          <div>
            <h2 id="illustrative-takeaway-title">What the two-page takeaway can look like.</h2>
            <p>
              Illustrative structure only. These are prompts, not findings about a
              bank, a client engagement or a completed review. Your takeaway would
              reflect the discussion, with assumptions and evidence gaps stated
              explicitly.
            </p>
          </div>
        </div>
        <div className={styles.takeawayPages}>
          <article aria-labelledby="takeaway-priorities-title">
            <p className={styles.takeawayLabel}>Illustrative / Page 1 of 2</p>
            <h3 id="takeaway-priorities-title">Three priorities to resolve</h3>
            <ol className={styles.takeawayList}>
              <li>
                <h4>Define the participation choice</h4>
                <p>Which customer need and market role should shape the proposition? What would make it worth pursuing?</p>
              </li>
              <li>
                <h4>Test the readiness assumptions</h4>
                <p>What must be evidenced across consent, data, APIs, controls and partner responsibilities? Which gaps need an accountable owner?</p>
              </li>
              <li>
                <h4>Set the delivery decision</h4>
                <p>Who owns the next decision, which dependencies need resolving and what evidence would justify a bounded next step?</p>
              </li>
            </ol>
          </article>
          <article aria-labelledby="takeaway-sequence-title">
            <p className={styles.takeawayLabel}>Illustrative / Page 2 of 2</p>
            <h3 id="takeaway-sequence-title">A suggested 90-day sequence</h3>
            <ol className={styles.takeawayList}>
              <li>
                <h4>Days 1–30 / Frame</h4>
                <p>Agree the participation hypothesis, decision owners and evidence needed to judge the opportunity.</p>
              </li>
              <li>
                <h4>Days 31–60 / Validate</h4>
                <p>Test the proposition and readiness assumptions against approved evidence. Review partner dependencies and control responsibilities.</p>
              </li>
              <li>
                <h4>Days 61–90 / Decide</h4>
                <p>Bring the evidence to accountable owners for a decision to proceed, revise or stop. Scope any next delivery step separately.</p>
              </li>
            </ol>
            <p className={styles.sequenceNote}>
              Indicative planning windows, subject to your evidence, approvals and
              capacity. No delivery dates or outcomes are committed by this illustration.
            </p>
          </article>
        </div>
        <div className={styles.actions}>
          <a className={styles.secondaryAction} href="#readiness-review">Discuss your review</a>
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
            <p>
              For the current regulatory scope and definitions, use the{" "}
              <a
                href="https://rulebook.centralbank.ae/en/rulebook/introduction-and-scope-2"
                target="_blank"
                rel="noreferrer"
              >
                CBUAE Open Finance Regulation
              </a>{" "}
              as the primary source.
            </p>
          </div>
        </div>

        <div className={styles.evidenceFeature}>
          <div className={styles.evidenceTimeline} role="group" aria-label="MENA Open Banking and Open Finance experience">
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
            <h3><Link className={chromeStyles.titleLink} href="/ventures/backoffice">Open Finance Backoffice</Link></h3>
            <p>
              MiddleLeap&apos;s synthetic-only regulated build turns obligations into
              governed workflows and demonstrates how strategy, controls and delivery
              evidence can be constructed together.
            </p>
            <Link href="/ventures/backoffice" aria-label="Read Open Finance Backoffice's build record">Read the build record →</Link>
          </article>
          <article>
            <span>Execution method</span>
            <h3><Link className={chromeStyles.titleLink} href="/the-loom">The Loom</Link></h3>
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
          <p className={styles.eyebrow}>Optional paid advisory</p>
          <h2>Scope further work around an agreed mandate.</h2>
          <p>
            Any follow-on executive advisory, strategy sprint or mobilisation is
            optional and separately agreed, including deliverables, fees and
            responsibilities. The complimentary review does not require a paid
            engagement.
          </p>
        </div>
        <div className={styles.engagementGrid}>
          {engagementModels.map((model, index) => (
            <article key={model.key}>
              <span>0{index + 1} / {model.label}</span>
              <h3><Link className={chromeStyles.titleLink} href={model.href} aria-label={`Explore ${model.label}`}>{model.title}</Link></h3>
              <p>{model.detail}</p>
            </article>
          ))}
        </div>
        <div className={styles.engageActionRow}>
          <a className={styles.primaryAction} {...bookingLinkProps}>
            Discuss paid advisory
          </a>
          <Link className={styles.engagementLink} href="/how-we-engage#models">Explore engagement models →</Link>
          <span>
            <a href={mailtoHref("Open Finance mandate")}>{contactEmail}</a> · Dubai, UAE
          </span>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
