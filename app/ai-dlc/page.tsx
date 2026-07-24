import type { Metadata } from "next";
import Link from "next/link";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./ai-dlc.module.css";

export const metadata: Metadata = {
  title: "The Loom Toolkit | Institutional AI Delivery",
  description:
    "The Loom Toolkit installs MiddleLeap's governed delivery method, an institution-owned BrainKit and optional domain intelligence inside repositories.",
  alternates: { canonical: "/ai-dlc" },
  openGraph: {
    title: "The Loom Toolkit | Institutional AI Delivery",
    description:
      "Install a governed delivery toolkit, draft the institution's BrainKit and pin that approved context across repositories.",
    url: "https://www.middleleap.com/ai-dlc",
  },
};

const bundles = [
  {
    id: "loom-toolkit",
    number: "Core bundle",
    version: "Loom 2.0 RC.9 · AI-SDLC 1.0",
    name: "The Loom Toolkit",
    label: "Governed delivery system",
    kind: "core",
    description:
      "The customer-facing core combines The Loom's governed method, the Institutional BrainKit and repository foundations that compile each change into the gates, evidence and accountable decisions it requires.",
    contents: ["Discovery + delivery harnesses", "Institutional BrainKit", "Compiled control plans", "Continuous assurance", "Governance + evidence controls", "Idempotent adoption"],
    href: "/the-loom",
    linkLabel: "Explore The Loom",
  },
  {
    id: "open-finance",
    number: "Domain pack 01",
    version: "v2.1",
    name: "Open Finance Intelligence",
    label: "UAE domain intelligence",
    kind: "domain",
    description:
      "The first attachable domain pack brings CBUAE and AlTareq knowledge, Islamic-banking context, risk review and value-proposition prototyping into the core system.",
    contents: ["Open Finance canon", "Islamic banking UAE", "UAE bank risk reviewer", "UI/UX prototyper"],
    href: "https://github.com/middleleap/ai-dlc/tree/main/plugins/middleleap-open-finance",
    linkLabel: "View the domain pack",
  },
] as const;

const layers = [
  ["01", "Advisory", "Frames the mandate", "Regulatory, commercial and operating questions are resolved at leadership level."],
  ["02", "The Loom Toolkit", "Installs the frame", "One manifest installs the harnesses, controls, templates and adoption report inside the repository."],
  ["03", "BrainKit draft", "Seeds institutional DNA", "Approved sources become draft identity, terminology, architecture, technology policy and decision rights; unknowns remain visible gaps."],
  ["04", "Human governance", "Approves and mounts", "Accountable context owners approve the private release; product repositories mount a digest-pinned snapshot."],
  ["05", "Institution", "Operates and compounds", "Each governed change binds the institutional profile while the wider context brain grows through delivery cycles."],
] as const;

const contextDimensions = [
  ["01", "Regulated context", "Mandates, deadlines, risk taxonomy, controls and security posture."],
  ["02", "Solution domain", "Contracts, data models, personas, scopes and evaluation assets."],
  ["03", "Institutional DNA", "Architecture, approved technology, design system, terminology, voice and approval routes."],
] as const;

const brainkitSources = [
  "Design standards",
  "Approved terminology",
  "Architecture principles",
  "Technology constraints",
  "Controls + decision rights",
] as const;

const brainkitOutputs = [
  "PRDs + discovery artifacts",
  "Code + architectures + ADRs",
  "Interfaces + prototypes",
  "Reports + evidence packs",
] as const;

const brainkitLifecycle = [
  ["01", "Draft from evidence", "The generator uses approved institutional sources only. Unsupported decisions go into a gap register."],
  ["02", "Approve with humans", "Accountable owners review the package. The agent can seal digests, but it cannot approve institutional context."],
  ["03", "Pin the release", "Each repository mounts the private snapshot. Its institution profile and compiled plans record the BrainKit digest."],
  ["04", "Validate in CI", "Once compiled, CI checks the approved version, canonical sections, source grounding, digests and artifact provenance against the live BrainKit."],
] as const;

export default function AiDlcPage() {
  return (
    <main className={styles.shell} id="problem">
      <SiteHeader
        active="method"
        priority
        breadcrumbs={[
          { href: "/", label: "Advisory" },
          { href: "/#method", label: "How we work" },
          { href: "/the-loom", label: "The Loom" },
          { label: "Toolkit" },
        ]}
        contextLabel="Toolkit navigation"
        contextLinks={[
          { href: "/the-loom", label: "The Loom" },
          { href: "#catalogue", label: "Bundles" },
          { href: "#installation", label: "Installation" },
          { href: "#context", label: "Your BrainKit" },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The Loom Toolkit · delivered through AI-DLC</p>
          <h1>Install the method. Give it your <em>institutional DNA.</em></h1>
          <p className={styles.lede}>
            The Toolkit includes the Institutional BrainKit: a private, governed seed for
            code, PRDs, architectures, interfaces and reports. Human owners approve it;
            repositories pin it; the Loom applies it where the work happens.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#catalogue">Explore the bundles</a>
            <Link className={styles.secondaryAction} href="/the-loom">Start with The Loom</Link>
          </div>
        </div>
        <div className={styles.packageVisual} role="img" aria-label="The Loom Toolkit combines compiled control plans with an institution-owned BrainKit and optional domain packs">
          <div className={styles.packageHeader}><span>middleleap / ai-dlc</span><b>Loom 2.0 RC.9</b></div>
          <div className={styles.packageCore}><span>Discovery + delivery</span><span>Policy compiler</span><span>Continuous assurance</span><span>Manifest-driven adoption</span><strong>The Loom Toolkit / public core</strong></div>
          <div className={styles.packageOutput}><span>Your BrainKit / private seed</span><i>+</i><span>Optional domain intelligence</span></div>
        </div>
      </section>

      <ExecutiveSummary
        title="The method is The Loom. The installable product is The Loom Toolkit."
        intro="AI-DLC is the technical distribution mechanism—not a competing consulting proposition. The Toolkit carries the method into the repository and binds it to institution-owned context."
        items={[
          { label: "Product", title: "The Loom Toolkit", detail: "The installable delivery system: discovery and delivery harnesses, controls, assurance and adoption machinery." },
          { label: "Context", title: "Your BrainKit", detail: "A private, human-approved package of institutional language, architecture, technology policy and decision rights." },
          { label: "Distribution", title: "AI-DLC", detail: "The repository and plugin mechanism used to distribute, version and adopt the public Toolkit." },
          { label: "Extensions", title: "Domain packs", detail: "Optional specialist intelligence, beginning with UAE Open Finance, attached only when a mandate requires it." },
          { label: "Adoption", title: "One bounded pilot", detail: "Install around a real outcome, establish ownership and leave the institution with an operable capability." },
        ]}
      />

      <section className={styles.layers}>
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>The adoption path</p><div><h2>Install the frame. Draft the identity. Put owners in control.</h2><p>The public toolkit installs from one manifest. The first institution-owned artifact is a private BrainKit, reviewed by accountable humans and pinned into each repository that adopts it.</p></div></div>
        <div className={styles.layerSystem} aria-label="From advisory mandate to installed institutional capability">
          <div className={styles.layerSystemHeader}><span>Capability adoption path / 05</span><b>Frame → install → draft → approve → compound</b></div>
          <div className={styles.layerGrid}>
            {layers.map(([id, title, label, detail]) => <article key={id}><span>{id}</span><small>{label}</small><h3>{title}</h3><p>{detail}</p></article>)}
          </div>
          <div className={styles.layerOutput}>
            <span>Installed capability</span>
            <div><b>Method</b><b>Private BrainKit</b><b>Compiled control plans</b><b>Optional domain packs</b></div>
            <strong>Operable by the institution</strong>
          </div>
        </div>
      </section>

      <section className={styles.catalogue} id="catalogue">
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>What you can adopt</p><div><h2>One governed delivery system. A compiled route for every change.</h2><p>The public proposition is deliberately smaller than the technical marketplace: a core toolkit whose compiler commands execution, plus domain packs when the mandate requires them.</p></div></div>
        <div className={`${styles.pluginGrid} ${styles.bundleGrid}`}>
          {bundles.map((bundle) => (
            <article id={bundle.id} key={bundle.id} className={bundle.kind === "core" ? styles.coreBundle : styles.domainBundle}>
              <div className={styles.pluginMeta}><span>{bundle.number} / {bundle.label}</span><b>{bundle.version}</b></div>
              <h3>{bundle.name}</h3>
              <p>{bundle.description}</p>
              <ul>{bundle.contents.map((item) => <li key={item}>{item}</li>)}</ul>
              {bundle.href.startsWith("/") ? <Link href={bundle.href}>{bundle.linkLabel} →</Link> : <a href={bundle.href} target="_blank" rel="noreferrer">{bundle.linkLabel} ↗</a>}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.install} id="installation">
        <div>
          <p className={styles.eyebrow}>For builders</p>
          <h2>Install the frame. Then draft the institution&apos;s seed.</h2>
          <p>The current release adopts the Loom from one copy manifest and leaves a file-by-file report. BrainKit templates land as a draft: the generator may organise approved sources and expose gaps, but only accountable humans can approve the result.</p>
        </div>
        <pre aria-label="AI-DLC installation commands"><code>{`/plugin marketplace add middleleap/ai-dlc
/plugin install middleleap-loom@middleleap-ai-dlc
/plugin install middleleap-ai-sdlc@middleleap-ai-dlc

# install the Loom inside the repository
/middleleap-loom:loom-adopt

# draft the BrainKit from approved sources
/middleleap-loom:brainkit-init

# optional domain intelligence
/plugin install middleleap-open-finance@middleleap-ai-dlc`}</code></pre>
      </section>

      <section className={styles.boundaries} id="context">
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>Your institutional BrainKit</p><div><h2>One governed seed—not a second compliance database.</h2><p>The BrainKit owns institutional DNA. It references regulated context and solution-domain assets without duplicating either, keeping each source of truth clear.</p></div></div>
        <div className={styles.boundaryGrid}>
          {contextDimensions.map(([id, title, detail]) => <article key={id} className={id === "03" ? styles.brainkitDimension : undefined}><span>{id}</span><h3>{title}</h3><p>{detail}</p>{id === "03" && <b>BrainKit scope</b>}</article>)}
        </div>
        <div className={styles.brainkitFlow} role="group" aria-label="Institutional sources become a governed BrainKit that shapes every Loom artifact">
          <div className={styles.brainkitHeader}>
            <span>Institution-owned context layer</span>
            <b>Versioned once · digest-pinned per repository</b>
          </div>
          <div className={styles.brainkitGrid}>
            <article>
              <span>01 / approved inputs</span>
              <h3>Institutional signals</h3>
              <ul>{brainkitSources.map((source) => <li key={source}>{source}</li>)}</ul>
            </article>
            <i aria-hidden="true">→</i>
            <article className={styles.brainkitSeed}>
              <span>02 / governed seed</span>
              <h3>Institutional BrainKit</h3>
              <p>A private package of institutional identity, terminology, architecture, technology policy and decision rights.</p>
              <div><b>Draft first</b><b>Human-owned</b><b>Versioned</b><b>Digest-pinned</b></div>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>03 / governed outputs</span>
              <h3>Every Loom artifact</h3>
              <ul>{brainkitOutputs.map((output) => <li key={output}>{output}</li>)}</ul>
            </article>
          </div>
          <div className={styles.brainkitLifecycle} aria-label="BrainKit governance lifecycle">
            {brainkitLifecycle.map(([id, title, detail]) => (
              <article key={id}>
                <span>{id}</span>
                <h4>{title}</h4>
                <p>{detail}</p>
              </article>
            ))}
          </div>
          <div className={styles.brainkitFooter}>
            <strong>Private by default. Local by design.</strong>
            <p>The public AI-DLC repository ships the schema, adoption machinery and a fictional example—not institutional content. Product repositories validate their mounted snapshot locally, without a public registry or live resolution service.</p>
          </div>
        </div>
      </section>

      <section className={styles.engage}>
        <p className={styles.eyebrow}>From package to capability</p>
        <h2>Adopt it around one bounded outcome.</h2>
        <p>Use an AI-native delivery pilot to draft the first BrainKit from approved sources, establish accountable ownership and leave a digest-pinned, manifest-installed harness in the repository.</p>
        <div className={styles.actions}><Link className={styles.primaryAction} href="/#engage">Discuss a delivery pilot</Link><a className={styles.darkAction} href="https://github.com/middleleap/ai-dlc" target="_blank" rel="noreferrer">Browse the repository ↗</a></div>
      </section>

      <SiteFooter />
    </main>
  );
}
