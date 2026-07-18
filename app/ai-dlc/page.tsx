import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./ai-dlc.module.css";

export const metadata: Metadata = {
  title: "The Loom Toolkit | AI-DLC",
  description:
    "The Loom Toolkit packages MiddleLeap's governed delivery method, agents, controls and domain knowledge through the AI-DLC public marketplace.",
  alternates: { canonical: "/ai-dlc" },
  openGraph: {
    title: "The Loom Toolkit | AI-DLC",
    description:
      "MiddleLeap methods, domain knowledge and controls packaged as installable skills, agents and workflows.",
    url: "https://middleleap.com/ai-dlc",
  },
};

const plugins = [
  {
    id: "loom",
    number: "01",
    version: "v1.1",
    name: "The Loom",
    label: "Governed delivery harness",
    description:
      "A gated discovery harness, an autonomous delivery loop with human four-eyes merge, always-on guardrails and the machinery to adopt the method in a repository.",
    contents: ["Loom method canon", "Loom adoption skill", "2 reviewer agents", "D1—D9 gates + Q-gate patterns"],
    href: "/the-loom",
  },
  {
    id: "open-finance",
    number: "02",
    version: "v2.1",
    name: "Open Finance",
    label: "UAE domain intelligence",
    description:
      "CBUAE and AlTareq knowledge, Islamic-banking context, a virtual Head of Risk and value-proposition prototyping for the UAE Open Finance ecosystem.",
    contents: ["Open Finance canon", "Islamic banking UAE", "UAE bank risk reviewer", "UI/UX prototyper"],
    href: "https://github.com/middleleap/ai-dlc/tree/main/plugins/middleleap-open-finance",
  },
  {
    id: "ai-sdlc",
    number: "03",
    version: "v1.0",
    name: "AI-SDLC",
    label: "Repository operating context",
    description:
      "Practical patterns for context files and structured code review so AI coding assistants work against the repository's actual conventions and risks.",
    contents: ["CLAUDE.md guide", "Context template", "Four-pass code reviewer"],
    href: "https://github.com/middleleap/ai-dlc/tree/main/plugins/middleleap-ai-sdlc",
  },
  {
    id: "brand",
    number: "04",
    version: "v2.0",
    name: "MiddleLeap Brand",
    label: "Design and voice system",
    description:
      "The complete MiddleLeap brand as portable tokens, components, assets, copy rules and a WCAG AA contrast gate for interfaces and documents.",
    contents: ["Design canon", "CSS + JSON tokens", "React components", "Accessibility gate"],
    href: "https://github.com/middleleap/ai-dlc/tree/main/plugins/middleleap-brand",
  },
] as const;

const layers = [
  ["01", "Advisory", "Frames the mandate", "Regulatory, commercial and operating questions are resolved at leadership level."],
  ["02", "Method", "Defines how work moves", "The Loom turns an evidenced problem into governed, auditable delivery."],
  ["03", "The Loom Toolkit", "Carries the method into the repo", "AI-DLC packages installable skills, agents and controls that make the operating model executable."],
  ["04", "Institution", "Mounts its own context", "Regulation, domain knowledge and institutional DNA remain owned by the adopting entity."],
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
          { href: "#catalogue", label: "Catalogue" },
          { href: "#installation", label: "Installation" },
          { href: "#boundaries", label: "Boundaries" },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>The Loom Toolkit · delivered through AI-DLC</p>
          <h1>Install the harness where the <em>work happens.</em></h1>
          <p className={styles.lede}>
            The Loom defines how governed delivery works. AI-DLC packages its methods,
            agents, controls and domain knowledge as installable repository capability.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} href="#catalogue">Browse the catalogue</a>
            <Link className={styles.secondaryAction} href="/the-loom">Start with The Loom</Link>
          </div>
        </div>
        <div className={styles.packageVisual} role="img" aria-label="AI-DLC package architecture">
          <div className={styles.packageHeader}><span>middleleap / ai-dlc</span><b>Public marketplace</b></div>
          <div className={styles.packageCore}><span>Methods</span><span>Domain knowledge</span><span>Controls</span><span>Brand</span><strong>Install into the repository</strong></div>
          <div className={styles.packageOutput}><span>Skills</span><i>+</i><span>Agents</span><i>+</i><span>Workflows</span><i>+</i><span>Guardrails</span></div>
        </div>
      </section>

      <section className={styles.layers}>
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>The hierarchy</p><div><h2>The Loom is the delivery system. AI-DLC is its installable toolkit.</h2><p>Advisory frames the mandate, The Loom governs how the work moves, and the toolkit carries reusable skills, agents and controls into the repository.</p></div></div>
        <div className={styles.layerSystem} aria-label="From advisory mandate to installed institutional capability">
          <div className={styles.layerSystemHeader}><span>Capability installation path / 04</span><b>Frame → govern → install → mount</b></div>
          <div className={styles.layerGrid}>
            {layers.map(([id, title, label, detail]) => <article key={id}><span>{id}</span><small>{label}</small><h3>{title}</h3><p>{detail}</p></article>)}
          </div>
          <div className={styles.layerOutput}>
            <span>Repository capability</span>
            <div><b>Skills</b><b>Agents</b><b>Controls</b><b>Owned context</b></div>
            <strong>Operable by the institution</strong>
          </div>
        </div>
      </section>

      <section className={styles.catalogue} id="catalogue">
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>The catalogue</p><div><h2>Four plugin families. One governed knowledge layer.</h2><p>Each package has a clear job. The Loom is the flagship method; the other plugins carry the domain, repository and brand context around it.</p></div></div>
        <div className={styles.pluginGrid}>
          {plugins.map((plugin) => (
            <article id={plugin.id} key={plugin.id}>
              <div className={styles.pluginMeta}><span>{plugin.number} / {plugin.label}</span><b>{plugin.version}</b></div>
              <h3>{plugin.name}</h3>
              <p>{plugin.description}</p>
              <ul>{plugin.contents.map((item) => <li key={item}>{item}</li>)}</ul>
              {plugin.href.startsWith("/") ? <Link href={plugin.href}>Explore {plugin.name} →</Link> : <a href={plugin.href} target="_blank" rel="noreferrer">View package ↗</a>}
            </article>
          ))}
        </div>
      </section>

      <section className={styles.install} id="installation">
        <div>
          <p className={styles.eyebrow}>For builders</p>
          <h2>Install the marketplace, then choose the capability.</h2>
          <p>The current distribution targets Claude Code. Installing a plugin adds discoverable skills and agents; always-on hooks activate only through explicit repository adoption.</p>
        </div>
        <pre aria-label="AI-DLC installation commands"><code>{`/plugin marketplace add middleleap/ai-dlc
/plugin install middleleap-loom@middleleap-ai-dlc

# inside the adopting repository
/middleleap-loom:loom-adopt`}</code></pre>
      </section>

      <section className={styles.boundaries} id="boundaries">
        <div className={styles.sectionIntro}><p className={styles.eyebrow}>Clear by design</p><div><h2>The package carries the frame. The institution supplies the pattern.</h2><p>Adoption is not a claim that generic automation understands an institution by default.</p></div></div>
        <div className={styles.boundaryGrid}>
          <article><span>AI-DLC supplies</span><h3>Reusable machinery</h3><p>Gate validators, renderer, templates, build-loop skills, reviewer protocols and guardrail hooks.</p></article>
          <article><span>The institution supplies</span><h3>Owned context</h3><p>Binding conventions, risk registers, architecture, approvals, technology policy, brand and accountable owners.</p></article>
          <article><span>People retain</span><h3>Judgement and authority</h3><p>Problem selection, risk acceptance, merge approval, production promotion and mandatory cease-use decisions.</p></article>
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
