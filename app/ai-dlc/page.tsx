import Link from "next/link";
import { ExecutiveSummary } from "@/components/ExecutiveSummary";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./ai-dlc.module.css";

export const metadata = createPageMetadata({
  title: "The Loom Implementation | Governed Repository Controls",
  description:
    "The technical implementation of The Loom: repository controls, assurance, the BrainKit initializer and optional domain intelligence distributed through AI-DLC.",
  path: "/toolkit",
  socialDescription:
    "Install The Loom's repository controls and connect delivery to an institution-owned Brainstem.",
});

const bundles = [
  {
    id: "loom-implementation",
    number: "Repository implementation",
    version: "Loom 2.0 RC.10 · AI-SDLC 1.0",
    name: "The Loom implementation",
    label: "Governed delivery system",
    kind: "core",
    description:
      "The repository implementation carries The Loom's method, a BrainKit initializer and foundations that compile each change into the gates, evidence and accountable decisions it requires.",
    contents: ["Discovery + delivery harnesses", "BrainKit initializer", "Compiled control plans", "Continuous assurance", "Governance + evidence controls", "Safe, merge-aware adoption"],
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
  ["02", "Repository implementation", "Installs The Loom", "One manifest installs the harnesses, controls and templates, preserves existing agent settings and reports anything that still needs a human merge."],
  ["03", "BrainKit initializer", "Drafts the Brainstem", "Approved sources become draft identity, terminology, architecture, technology policy and decision rights; unknowns remain visible gaps."],
  ["04", "Human governance", "Approves and mounts", "Accountable context owners approve the private release; product repositories mount a digest-pinned snapshot."],
  ["05", "Institution", "Operates and compounds", "Each governed change binds the institutional profile while the wider context brain grows through delivery cycles."],
] as const;

const contextDimensions = [
  ["01", "Regulated context", "Mandates, deadlines, risk taxonomy, controls and security posture."],
  ["02", "Solution domain", "Contracts, data models, personas, scopes and evaluation assets."],
  ["03", "Institutional DNA", "Architecture, approved technology, design system, terminology, voice and approval routes."],
] as const;

const brainstemSources = [
  "Design standards",
  "Approved terminology",
  "Architecture principles",
  "Technology constraints",
  "Controls + decision rights",
] as const;

const brainstemOutputs = [
  "PRDs + discovery artifacts",
  "Code + architectures + ADRs",
  "Interfaces + prototypes",
  "Reports + evidence packs",
] as const;

const brainstemLifecycle = [
  ["01", "Draft from evidence", "The generator uses approved institutional sources only. Unsupported decisions go into a gap register."],
  ["02", "Approve with humans", "Accountable owners review the package. The agent can seal digests, but it cannot approve institutional context."],
  ["03", "Pin the release", "Each repository mounts the private Brainstem snapshot. Its institution profile and compiled plans record the release digest."],
  ["04", "Validate in CI", "Once compiled, CI checks the approved version, canonical sections, complete digest envelope, source grounding, D7 provenance and artifact provenance—and rejects undeclared context files."],
] as const;

export default function AiDlcPage() {
  return (
    <div className={styles.shell}>
      <SiteHeader
        active="intelligence"
        priority
        breadcrumbs={[
          { href: "/", label: "Advisory" },
          { href: "/institutional-intelligence", label: "Institutional Intelligence" },
          { href: "/the-loom", label: "The Loom" },
          { label: "Technical implementation" },
        ]}
        contextLabel="Implementation navigation"
        contextLinks={[
          { href: "/the-loom", label: "The Loom" },
          { href: "/institutional-brain", label: "Institutional Brain" },
          { href: "#catalogue", label: "Bundles" },
          { href: "#installation", label: "Installation" },
          { href: "#context", label: "Brainstem initialization" },
        ]}
      />

      <main id="main-content" tabIndex={-1}>
      <section className={styles.hero} id="problem">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The Loom · technical implementation</p>
          <h1>Install the method. Connect it to your <em>Institutional Brain.</em></h1>
          <p className={styles.lede}>
            AI-DLC distributes The Loom&apos;s repository controls. The BrainKit initializer
            drafts the private Brainstem from approved sources; human owners approve it,
            repositories pin it and The Loom applies it where work happens.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#catalogue">Explore the bundles</a>
            <Link className={styles.secondaryAction} href="/the-loom">Start with The Loom</Link>
          </div>
        </div>
        <div className={styles.packageVisual} role="img" aria-label="The Loom's repository implementation combines compiled control plans with a private Brainstem draft and optional domain packs">
          <div className={styles.packageHeader}><span>middleleap / ai-dlc</span><b>Loom 2.0 RC.10</b></div>
          <div className={styles.packageCore}><span>Discovery + delivery</span><span>Policy compiler</span><span>Continuous assurance</span><span>Manifest-driven adoption</span><strong>The Loom / repository implementation</strong></div>
          <div className={styles.packageOutput}><span>Brainstem draft / private</span><i>+</i><span>Optional domain intelligence</span></div>
        </div>
      </section>

      <ExecutiveSummary
        title="One method. One institutional asset. Technical machinery underneath."
        intro="The Loom applies the Institutional Brain to real work. BrainKit initializes the Brainstem, while AI-DLC distributes the repository implementation. Neither is a separate consulting proposition."
        items={[
          { label: "Method", title: "The Loom", detail: "The governed method for discovery, delivery, evidence and human authority." },
          { label: "Institutional asset", title: "Institutional Brain", detail: "The private, human-approved body of collective institutional understanding." },
          { label: "Initializer", title: "BrainKit", detail: "Technical tooling used to draft, validate and release the Brainstem from approved sources." },
          { label: "Distribution", title: "AI-DLC", detail: "The repository and plugin mechanism used to distribute and version the implementation." },
          { label: "Extensions", title: "Domain packs", detail: "Optional specialist intelligence, beginning with UAE Open Finance, attached only when a mandate requires it." },
        ]}
      />

      <section className={styles.layers}>
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>The adoption path</p><div><h2>Install The Loom. Draft the Brainstem. Put owners in control.</h2><p>The repository implementation installs from one manifest. BrainKit drafts the private Brainstem; accountable humans approve the Institutional Brain release mounted by each adopting repository.</p></div></div>
        <div className={styles.layerSystem} aria-label="From advisory mandate to installed institutional capability">
          <div className={styles.layerSystemHeader}><span>Capability adoption path / 05</span><b>Frame → install → draft → approve → compound</b></div>
          <div className={styles.layerGrid}>
            {layers.map(([id, title, label, detail]) => <article key={id}><span>{id}</span><small>{label}</small><h3>{title}</h3><p>{detail}</p></article>)}
          </div>
          <div className={styles.layerOutput}>
            <span>Installed capability</span>
            <div><b>The Loom</b><b>Private Brainstem</b><b>Compiled control plans</b><b>Optional domain packs</b></div>
            <strong>Operable by the institution</strong>
          </div>
        </div>
      </section>

      <section className={styles.catalogue} id="catalogue">
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>Implementation bundles</p><div><h2>One governed delivery system. A compiled route for every change.</h2><p>The public proposition remains The Loom and the Institutional Brain. This technical layer installs the repository controls and optional domain intelligence needed to operate them.</p></div></div>
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
          <h2>Install The Loom. Then draft the Brainstem.</h2>
          <p>RC.10 adopts The Loom from one copy manifest, preserves an existing <code>.claude/settings.json</code> and writes a sidecar when human merging is required. The BrainKit initializer may organise approved sources and expose gaps, but only accountable humans can approve the resulting Institutional Brain release.</p>
        </div>
        <pre aria-label="AI-DLC installation commands"><code>{`/plugin marketplace add middleleap/ai-dlc
/plugin install middleleap-loom@middleleap-ai-dlc
/plugin install middleleap-ai-sdlc@middleleap-ai-dlc

# install the Loom inside the repository
/middleleap-loom:loom-adopt

# draft the Brainstem from approved sources
/middleleap-loom:brainkit-init

# optional domain intelligence
/plugin install middleleap-open-finance@middleleap-ai-dlc`}</code></pre>
        <aside className={styles.operatingBoundary}>
          <span>Operating boundary / RC.10</span>
          <div>
            <h3>Build-time control frame. Institution-operated production controls.</h3>
            <p>The repository implementation validates gates, evidence and readiness records. Live IAM, platform enforcement, production monitoring, incident detection, resilience exercises and independent control functions remain the adopting institution&apos;s responsibility.</p>
          </div>
        </aside>
      </section>

      <section className={styles.boundaries} id="context">
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>Technical context initialization</p><div><h2>BrainKit creates the draft. The institution owns the Brain.</h2><p>The initializer assembles the Brainstem from approved institutional sources. It references regulated context and solution-domain assets without duplicating either, keeping each source of truth clear.</p></div></div>
        <div className={styles.boundaryGrid}>
          {contextDimensions.map(([id, title, detail]) => <article key={id} className={id === "03" ? styles.brainkitDimension : undefined}><span>{id}</span><h3>{title}</h3><p>{detail}</p>{id === "03" && <b>Brainstem scope</b>}</article>)}
        </div>
        <div className={styles.brainkitFlow} role="group" aria-label="Approved institutional sources become a governed Brainstem that shapes every Loom artifact">
          <div className={styles.brainkitHeader}>
            <span>Institution-owned context layer</span>
            <b>Versioned once · digest-pinned per repository</b>
          </div>
          <div className={styles.brainkitGrid}>
            <article>
              <span>01 / approved inputs</span>
              <h3>Institutional signals</h3>
              <ul>{brainstemSources.map((source) => <li key={source}>{source}</li>)}</ul>
            </article>
            <i aria-hidden="true">→</i>
            <article className={styles.brainkitSeed}>
              <span>02 / governed foundation</span>
              <h3>Brainstem draft</h3>
              <p>The stable foundation of institutional identity, terminology, architecture, technology policy and decision rights.</p>
              <div><b>Draft first</b><b>Human-owned</b><b>Versioned</b><b>Digest-pinned</b></div>
            </article>
            <i aria-hidden="true">→</i>
            <article>
              <span>03 / governed outputs</span>
              <h3>Every Loom artifact</h3>
              <ul>{brainstemOutputs.map((output) => <li key={output}>{output}</li>)}</ul>
            </article>
          </div>
          <div className={styles.brainkitLifecycle} aria-label="Brainstem governance lifecycle">
            {brainstemLifecycle.map(([id, title, detail]) => (
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
          <div className={styles.actions}>
            <Link className={styles.secondaryAction} href="/institutional-brain">Examine the Institutional Brain</Link>
          </div>
        </div>
      </section>

      <section className={styles.engage}>
        <p className={styles.eyebrow}>From implementation to capability</p>
        <h2>Adopt it around one bounded outcome.</h2>
        <p>Use an AI-native delivery pilot to establish the first Institutional Brain release from approved sources, assign accountable ownership and leave The Loom&apos;s governed controls in the repository.</p>
        <div className={styles.actions}><Link className={styles.primaryAction} href="/#engage">Discuss a delivery pilot</Link><a className={styles.darkAction} href="https://github.com/middleleap/ai-dlc" target="_blank" rel="noreferrer">Browse the repository ↗</a></div>
      </section>
      </main>

      <SiteFooter />
    </div>
  );
}
