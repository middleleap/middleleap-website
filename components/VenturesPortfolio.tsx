import Link from "next/link";
import { ecosystemContributions, portfolioProjects } from "@/lib/ventures";
import styles from "@/app/ventures/ventures.module.css";

export function VenturesPortfolio() {
  return (
    <div className={styles.portfolioExplorer}>
      <div className={styles.portfolioMap} role="img" aria-label="MiddleLeap portfolio and delivery profiles">
        <div className={styles.mapCore}>
          <span>Portfolio evidence</span>
          <strong>Build<br />Learn<br />Apply</strong>
        </div>
        <div className={styles.mapBranch}>
          <span>Regulated delivery</span>
          <strong>Backoffice</strong>
          <small>Formal assurance and controlled platform delivery</small>
        </div>
        <div className={styles.mapBranch}>
          <span>Venture delivery</span>
          <strong>Parqo · HiveMind</strong>
          <small>Commercial evidence and expert-authority gates</small>
        </div>
      </div>

      <div className={styles.evidenceMap} aria-label="Portfolio evidence and next decision gates">
        <div className={styles.evidenceMapHeader}>
          <span>Venture</span>
          <span>Proposition</span>
          <span>Evidence now</span>
          <span>Next gate</span>
        </div>
        {portfolioProjects.map((project, index) => (
          <Link className={styles.evidenceRow} href={project.detailPath} key={project.name}>
            <span data-label="Venture"><i>0{index + 1}</i><strong>{project.name}</strong></span>
            <span data-label="Proposition">{project.type}</span>
            <span data-label="Evidence now"><b>{project.status}</b></span>
            <span data-label="Next gate">{project.nextGate}<i aria-hidden="true">→</i></span>
          </Link>
        ))}
      </div>

      <div className={styles.projectGrid}>
        {portfolioProjects.map((project) => (
          <article key={project.name}>
            <div className={styles.projectMeta}>
              <span>{project.type}</span>
              <b>{project.status}</b>
            </div>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <div className={styles.projectEvidence}>
              <span>{project.harnessProfile} profile</span>
              <strong>{project.evidence}</strong>
            </div>
            <div className={styles.projectLinks}>
              <Link href={project.detailPath}>Read the build record →</Link>
              {project.href && <a href={project.href} target="_blank" rel="noreferrer">Visit live product ↗</a>}
              <a href={project.repository} target="_blank" rel="noreferrer">View repository ↗</a>
            </div>
          </article>
        ))}
      </div>

      <section className={styles.ecosystemSection} id="ecosystem" tabIndex={-1}>
        <div className={styles.familyIntroduction}>
          <p className={styles.eyebrow}>Ecosystem contributions</p>
          <h3>Shared infrastructure, with ownership made explicit.</h3>
          <p>
            MiddleLeap contributes to independent Open Finance infrastructure that makes the
            market more visible, testable and easier to navigate. These are community assets,
            not presented as owned ventures.
          </p>
        </div>
        <div className={styles.contributionGrid}>
          {ecosystemContributions.map((contribution) => (
            <article key={contribution.name}>
              <div className={styles.projectMeta}>
                <span>{contribution.role}</span>
                <b>{contribution.status}</b>
              </div>
              <h4>{contribution.name}</h4>
              <p>{contribution.summary}</p>
              <div className={styles.projectLinks}>
                <a href={contribution.href} target="_blank" rel="noreferrer">Visit project ↗</a>
                {contribution.repository && (
                  <a href={contribution.repository} target="_blank" rel="noreferrer">View repository ↗</a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
