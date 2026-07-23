import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./ai-dlc.module.css";

export const metadata: Metadata = {
  title: "The Loom Toolkit | AI-DLC",
  description:
    "AI-DLC packages The Loom's governed delivery system, repository foundations and optional domain intelligence for adoption inside an institution.",
  alternates: { canonical: "/ai-dlc" },
  openGraph: {
    title: "The Loom Toolkit | AI-DLC",
    description:
      "One governed delivery toolkit, optional domain packs and clear seams for the institution's own context.",
    url: "https://middleleap.com/ai-dlc",
  },
};

const bundles = [
  {
    id: "loom-toolkit",
    number: "Core bundle",
    version: "Loom 2.0 RC · AI-SDLC 1.0",
    name: "The Loom Toolkit",
    label: "Governed delivery system",
    kind: "core",
    description:
      "The customer-facing core combines The Loom's governed method with the repository foundations that help AI coding assistants work against real conventions and risks.",
    contents: ["Discovery + delivery harnesses", "Continuous assurance", "Governance + evidence controls", "Repository context", "Structured code review", "Adoption machinery"],
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
  ["02", "The Loom Toolkit", "Installs the core system", "The method, repository foundations, controls and assurance machinery move into the repository."],
  ["03", "Domain packs", "Make the core specific", "Open Finance attaches regulated-market intelligence without hard-coding it into the method."],
  ["04", "Institution", "Mounts its own pattern", "Risk, architecture, design, terminology and accountable authority remain owned by the adopting entity."],
] as const;

const contextDimensions = [
  ["01", "Regulated context", "Mandates, deadlines, risk taxonomy, controls and security posture."],
  ["02", "Solution domain", "Contracts, data models, personas, scopes and evaluation assets."],
  ["03", "Institutional DNA", "Architecture, approved technology, design system, terminology, voice and approval routes."],
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
          { href: "#context", label: "Your context" },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The Loom Toolkit · delivered through AI-DLC</p>
          <h1>Install the method where the <em>work happens.</em></h1>
          <p className={styles.lede}>
            Start with one governed delivery system. Attach domain intelligence when
            the mandate requires it, then mount the institution&apos;s own context.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#catalogue">Explore the bundles</a>
            <Link className={styles.secondaryAction} href="/the-loom">Start with The Loom</Link>
          </div>
        </div>
        <div className={styles.packageVisual} role="img" aria-label="The Loom Toolkit core combines with optional domain packs and the institution's own context">
          <div className={styles.packageHeader}><span>middleleap / ai-dlc</span><b>Public marketplace</b></div>
          <div className={styles.packageCore}><span>Loom method</span><span>Repository foundations</span><span>Continuous assurance</span><span>Governance controls</span><strong>The Loom Toolkit / core</strong></div>
          <div className={styles.packageOutput}><span>Domain pack · Open Finance</span><i>+</i><span>Your institutional context</span></div>
        </div>
      </section>

      <section className={styles.layers}>
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>The adoption path</p><div><h2>One core system. Intelligence and context attach around it.</h2><p>Advisory frames the mandate, The Loom Toolkit installs the governed delivery system, a domain pack makes it specific, and the institution supplies the pattern.</p></div></div>
        <div className={styles.layerSystem} aria-label="From advisory mandate to installed institutional capability">
          <div className={styles.layerSystemHeader}><span>Capability installation path / 04</span><b>Frame → govern → install → mount</b></div>
          <div className={styles.layerGrid}>
            {layers.map(([id, title, label, detail]) => <article key={id}><span>{id}</span><small>{label}</small><h3>{title}</h3><p>{detail}</p></article>)}
          </div>
          <div className={styles.layerOutput}>
            <span>Installed capability</span>
            <div><b>Method</b><b>Foundations</b><b>Domain intelligence</b><b>Owned context</b></div>
            <strong>Operable by the institution</strong>
          </div>
        </div>
      </section>

      <section className={styles.catalogue} id="catalogue">
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>What you can adopt</p><div><h2>One governed delivery system. Domain intelligence when the mandate requires it.</h2><p>The public proposition is deliberately smaller than the technical marketplace: a core toolkit and attachable domain packs.</p></div></div>
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
          <h2>Install the core, then attach what the mandate needs.</h2>
          <p>The customer-facing Loom Toolkit spans two independently installable plugins. Domain packs remain optional, and always-on hooks activate only through explicit repository adoption.</p>
        </div>
        <pre aria-label="AI-DLC installation commands"><code>{`/plugin marketplace add middleleap/ai-dlc
/plugin install middleleap-loom@middleleap-ai-dlc
/plugin install middleleap-ai-sdlc@middleleap-ai-dlc

# optional domain intelligence
/plugin install middleleap-open-finance@middleleap-ai-dlc

# adopt the core inside the repository
/middleleap-loom:loom-adopt`}</code></pre>
      </section>

      <section className={styles.boundaries} id="context">
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>Your institutional context</p><div><h2>The toolkit carries the frame. The institution supplies the pattern.</h2><p>Generic automation does not understand an institution by default. These three governed dimensions make the installed system belong to its adopter.</p></div></div>
        <div className={styles.boundaryGrid}>
          {contextDimensions.map(([id, title, detail]) => <article key={id}><span>{id}</span><h3>{title}</h3><p>{detail}</p></article>)}
        </div>
        <div className={styles.referencePack}>
          <div><span>Reference implementation · not a client bundle</span><h3>MiddleLeap Brand</h3></div>
          <p>Our design-and-voice package proves the Loom&apos;s brand-profile seam and D7 conformance gate. It stays available in the repository as an example of institutional DNA—not as a customer value proposition.</p>
          <a href="https://github.com/middleleap/ai-dlc/tree/main/plugins/middleleap-brand" target="_blank" rel="noreferrer">View the reference package ↗</a>
        </div>
      </section>

      <section className={styles.engage}>
        <p className={styles.eyebrow}>From package to capability</p>
        <h2>Adopt it around one bounded outcome.</h2>
        <p>Use an AI-native delivery pilot to mount the context, prove the controls and leave an operable harness in the repository.</p>
        <div className={styles.actions}><Link className={styles.primaryAction} href="/#engage">Discuss a delivery pilot</Link><a className={styles.darkAction} href="https://github.com/middleleap/ai-dlc" target="_blank" rel="noreferrer">Browse the repository ↗</a></div>
      </section>

      <SiteFooter />
    </main>
  );
}
