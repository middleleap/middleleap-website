import type { Route } from "next";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { ExecutiveSummary } from "./ExecutiveSummary";
import { RelatedPortfolio } from "./RelatedPortfolio";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import styles from "./ProjectPage.module.css";

export type ProjectAction = {
  label: string;
  href: Route;
  kind: "primary" | "secondary";
  external?: boolean;
};

export type ProjectCard = {
  tag: string;
  title: string;
  detail: string;
};

// The architecture map has eight fixed layout slots; each project fills them
// with its own content. Slot order determines grid position and connector fit.
export type ArchSlot =
  | "users"
  | "agents"
  | "portal"
  | "mcp"
  | "bff"
  | "ports"
  | "data"
  | "external";

export type ArchNode = {
  slot: ArchSlot;
  tag: string;
  title: string;
  small: string;
};

export type ProjectPhase = {
  number: string;
  title: string;
  state: "done" | "next" | "later";
  label: string;
};

export type ProjectPageData = {
  currentPath: string;
  breadcrumbLabel: string;
  contextLabel: string;
  hero: {
    eyebrow: string;
    title: ReactNode;
    lede: ReactNode;
    actions: ProjectAction[];
    snapshot: string;
  };
  status: {
    ariaLabel: string;
    headerLabel: string;
    headerValue: string;
    rows: Array<{ term: string; detail: string }>;
  };
  executiveSummary: {
    title: string;
    intro: string;
    items: Array<{ label: string; title: string; detail: string }>;
  };
  why: {
    heading: ReactNode;
    lede: ReactNode;
    cards: ProjectCard[];
  };
  architecture: {
    label: string;
    heading: ReactNode;
    lede: ReactNode;
    mapAriaLabel: string;
    nodes: ArchNode[];
  };
  delivery: {
    label: string;
    heading: ReactNode;
    lede: ReactNode;
    stages: Array<{ number: string; name: string; detail: string }>;
  };
  technical: {
    summary: string;
    ai: {
      label: string;
      heading: ReactNode;
      lede: ReactNode;
      cards: Array<{ label: string; title: string; detail: string }>;
      controlLine: string[];
    };
    technology: {
      heading: ReactNode;
      stack: string[];
    };
    quality: {
      label: string;
      heading: ReactNode;
      cards: ProjectCard[];
    };
  };
  development: {
    heading: ReactNode;
    phases: ProjectPhase[];
    evidence: Array<{ stat: string; caption: string }>;
    boundary: ReactNode;
  };
  sources: Array<{ id: string; label: string; href?: string }>;
  engage: {
    heading: string;
    detail: string;
    mailtoSubject: string;
  };
};

const archSlotClass: Record<ArchSlot, string> = {
  users: styles.archUsers,
  agents: styles.archAgents,
  portal: styles.archPortal,
  mcp: styles.archMcp,
  bff: styles.archBff,
  ports: styles.archPorts,
  data: styles.archData,
  external: styles.archExternal,
};

// Connector geometry is shared by every project's architecture map.
const archConnectors = (
  <svg viewBox="0 0 760 430" aria-hidden="true">
    <path d="M118 82 C190 82 208 138 285 138" />
    <path d="M642 82 C570 82 552 138 475 138" />
    <path d="M285 176 C285 215 320 215 352 235" />
    <path d="M475 176 C475 215 440 215 408 235" />
    <path d="M380 285 L380 320" />
    <path d="M330 275 C260 286 220 335 180 366" />
    <path d="M470 360 L570 360" />
  </svg>
);

function ProjectActionLink({ action }: { action: ProjectAction }) {
  const className = action.kind === "primary" ? styles.primaryAction : styles.secondaryAction;
  if (action.external) {
    return (
      <a className={className} href={action.href} target="_blank" rel="noreferrer">
        {action.label}
      </a>
    );
  }
  if (action.href.startsWith("/")) {
    return (
      <Link className={className} href={action.href}>
        {action.label}
      </Link>
    );
  }
  return (
    <a className={className} href={action.href}>
      {action.label}
    </a>
  );
}

export function ProjectPage({ data }: { data: ProjectPageData }) {
  return (
    <main className={styles.shell} id="problem" tabIndex={-1}>
      <SiteHeader
        active="ventures"
        breadcrumbs={[
          { href: "/", label: "Advisory" },
          { href: "/ventures", label: "Ventures" },
          { href: "/ventures#portfolio", label: "Portfolio" },
          { label: data.breadcrumbLabel },
        ]}
        contextLabel={data.contextLabel}
        contextLinks={[
          { href: "#problem", label: "Overview" },
          { href: "#architecture", label: "Architecture" },
          { href: "#delivery", label: "Delivery" },
          { href: "#development", label: "Current boundary" },
          { href: "#technical-record", label: "Technical record" },
          { href: "#outcome", label: "What it proves" },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{data.hero.eyebrow}</p>
          <h1>{data.hero.title}</h1>
          <p className={styles.lede}>{data.hero.lede}</p>
          <div className={styles.actions}>
            {data.hero.actions.map((action) => (
              <ProjectActionLink key={action.label} action={action} />
            ))}
          </div>
          <p className={styles.snapshot}>{data.hero.snapshot}</p>
        </div>

        <aside className={styles.statusPanel} aria-label={data.status.ariaLabel}>
          <div className={styles.statusHeader}>
            <span>{data.status.headerLabel}</span>
            <b>{data.status.headerValue}</b>
          </div>
          <dl>
            {data.status.rows.map((row) => (
              <div key={row.term}>
                <dt>{row.term}</dt>
                <dd>{row.detail}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      <ExecutiveSummary
        title={data.executiveSummary.title}
        intro={data.executiveSummary.intro}
        items={data.executiveSummary.items}
      />

      <section className={styles.section}>
        <div className={styles.sectionLabel}><span>01</span><p>Why it exists</p></div>
        <div>
          <h2>{data.why.heading}</h2>
          <p className={styles.sectionLede}>{data.why.lede}</p>
          <div className={styles.outcomeGrid}>
            {data.why.cards.map((card) => (
              <article key={card.title}>
                <span>{card.tag}</span><h3>{card.title}</h3><p>{card.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="architecture" tabIndex={-1}>
        <div className={styles.sectionLabel}><span>02</span><p>{data.architecture.label}</p></div>
        <div>
          <h2>{data.architecture.heading}</h2>
          <p className={styles.sectionLede}>{data.architecture.lede}</p>
          <div className={styles.architectureMap} role="group" aria-label={data.architecture.mapAriaLabel}>
            {data.architecture.nodes.map((node) => (
              <div key={node.slot} className={`${styles.archNode} ${archSlotClass[node.slot]}`}>
                <span>{node.tag}</span><strong>{node.title}</strong><small>{node.small}</small>
              </div>
            ))}
            {archConnectors}
          </div>
        </div>
      </section>

      <section className={styles.section} id="delivery">
        <div className={styles.sectionLabel}><span>03</span><p>{data.delivery.label}</p></div>
        <div>
          <h2>{data.delivery.heading}</h2>
          <p className={styles.sectionLede}>{data.delivery.lede}</p>
          <div className={styles.buildFlow}>
            {data.delivery.stages.map((stage) => (
              <article key={stage.number}>
                <span>{stage.number}</span><h3>{stage.name}</h3><p>{stage.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <details className={styles.technicalDetails} id="technical-record">
        <summary>
          <span>Technical build record</span>
          <strong>{data.technical.summary}</strong>
          <i aria-hidden="true">+</i>
        </summary>
        <div className={styles.technicalDetailsBody}>
          <section className={styles.section}>
            <div className={styles.sectionLabel}><span>04</span><p>{data.technical.ai.label}</p></div>
            <div>
              <h2>{data.technical.ai.heading}</h2>
              <p className={styles.sectionLede}>{data.technical.ai.lede}</p>
              <div className={styles.harnessGrid}>
                {data.technical.ai.cards.map((card) => (
                  <article key={card.title}>
                    <span>{card.label}</span><h3>{card.title}</h3><p>{card.detail}</p>
                  </article>
                ))}
              </div>
              <div className={styles.controlLine}>
                {data.technical.ai.controlLine.map((step, index) => (
                  <Fragment key={step}>
                    {index > 0 && <i aria-hidden="true">→</i>}
                    <span>{step}</span>
                  </Fragment>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionLabel}><span>05</span><p>Technology</p></div>
            <div>
              <h2>{data.technical.technology.heading}</h2>
              <div className={styles.stackGrid}>
                {data.technical.technology.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionLabel}><span>06</span><p>{data.technical.quality.label}</p></div>
            <div>
              <h2>{data.technical.quality.heading}</h2>
              <div className={styles.gateGrid}>
                {data.technical.quality.cards.map((card) => (
                  <article key={card.title}>
                    <span>{card.tag}</span><h3>{card.title}</h3><p>{card.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      </details>

      <section className={styles.section} id="development" tabIndex={-1}>
        <div className={styles.sectionLabel}><span>07</span><p>Development record</p></div>
        <div>
          <h2>{data.development.heading}</h2>
          <div className={styles.phaseTrack}>
            {data.development.phases.map((phase) => (
              <article className={phase.state === "next" ? styles.nextPhase : styles.donePhase} key={phase.number}>
                <span>{phase.number}</span><h3>{phase.title}</h3><p>{phase.label}</p>
              </article>
            ))}
          </div>
          <div className={styles.evidenceGrid}>
            {data.development.evidence.map((item) => (
              <article key={item.caption}>
                <strong>{item.stat}</strong><span>{item.caption}</span>
              </article>
            ))}
          </div>
          <div className={styles.boundaryNote}>
            <span>Known boundary</span>
            <p>{data.development.boundary}</p>
          </div>
        </div>
      </section>

      <section className={styles.sources} id="evidence">
        <div className={styles.sectionLabel}><span>08</span><p>Evidence register</p></div>
        <div>
          <h2>{data.sources.some((source) => source.href) ? "Claims trace back to the repository." : "Claims are grounded in a reviewed private build record."}</h2>
          {!data.sources.some((source) => source.href) && <p className={styles.sectionLede}>The repository is not publicly accessible. This register names the material reviewed; detailed source access can be considered during appropriate diligence.</p>}
          <div className={styles.sourceList}>
            {data.sources.map((source) => source.href ? (
              <a href={source.href} target="_blank" rel="noreferrer" key={source.id}><span>{source.id}</span><strong>{source.label}</strong><b>Open ↗</b></a>
            ) : (
              <div key={source.id}><span>{source.id}</span><strong>{source.label}</strong><b>Reviewed</b></div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.engage} id="outcome">
        <p className={styles.eyebrow}>What this venture proves</p>
        <h2>{data.engage.heading}</h2>
        <p>{data.engage.detail}</p>
        <a href={`mailto:contact@middleleap.com?subject=${data.engage.mailtoSubject}`}>Discuss the mandate →</a>
      </section>

      <RelatedPortfolio currentPath={data.currentPath} />
      <SiteFooter />
    </main>
  );
}
