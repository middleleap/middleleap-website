import Link from "next/link";
import { ecosystemContributions, portfolioProjects } from "@/lib/ventures";
import styles from "@/app/ventures/ventures.module.css";
import chromeStyles from "./SiteChrome.module.css";

export function VenturesPortfolio() {
  return (
    <div className={styles.portfolioExplorer}>
      <div className={styles.portfolioMap} role="group" aria-label="MiddleLeap portfolio and delivery profiles">
        <div className={styles.mapCore}>
          <span>Portfolio evidence</span>
          <strong>Build<br />Learn<br />Apply</strong>
        </div>
        <div className={styles.mapBranch}>
          <span>Regulated delivery</span>
          <strong>Backoffice · Declare</strong>
          <small>Formal assurance, controlled platform delivery and a supervised-AI prototype</small>
        </div>
        <div className={styles.mapBranch}>
          <span>Venture delivery</span>
          <strong>Setbay · HiveMind</strong>
          <small>Commercial evidence and expert-authority gates</small>
        </div>
      </div>

      <div className={styles.projectGrid}>
        {portfolioProjects.map((project) => (
          <article key={project.name}>
            <div className={styles.projectMeta}>
              <span>{project.portfolioRole}</span>
              <b>{project.status}</b>
            </div>
            <h3>
              {project.detailPath ? (
                <Link className={chromeStyles.titleLink} href={project.detailPath}>{project.name}</Link>
              ) : (
                <a className={chromeStyles.titleLink} href={project.href} target="_blank" rel="noreferrer">{project.name} ↗</a>
              )}
            </h3>
            <p>{project.summary}</p>
            <div className={styles.projectEvidence}>
              <span>{project.harnessProfile} profile</span>
              <strong>{project.evidence}</strong>
            </div>
            <div className={styles.projectLinks}>
              {project.detailPath && <Link href={project.detailPath} aria-label={`Read ${project.name}'s build record`}>Read the build record →</Link>}
              {project.href && <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}'s live product`}>Visit live product ↗</a>}
              {project.repository && <a href={project.repository} target="_blank" rel="noreferrer" aria-label={`View ${project.name}'s repository`}>View repository ↗</a>}
              {project.evidenceAccess && <span>{project.evidenceAccess}</span>}
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
              <h4><a className={chromeStyles.titleLink} href={contribution.href} target="_blank" rel="noreferrer">{contribution.name} ↗</a></h4>
              <p>{contribution.summary}</p>
              <div className={styles.projectLinks}>
                <a href={contribution.href} target="_blank" rel="noreferrer" aria-label={`Visit ${contribution.name}`}>Visit project ↗</a>
                {contribution.repository && (
                  <a href={contribution.repository} target="_blank" rel="noreferrer" aria-label={`View ${contribution.name}'s repository`}>View repository ↗</a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
