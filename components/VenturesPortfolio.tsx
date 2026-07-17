import { ventureFamilies } from "@/lib/ventures";
import Link from "next/link";
import styles from "@/app/ventures/ventures.module.css";

export function VenturesPortfolio() {
  return (
    <div className={styles.portfolioExplorer}>
      <nav className={styles.portfolioControls} aria-label="Jump to a venture family">
        {ventureFamilies.map((family) => (
          <a key={family.id} href={`#family-${family.id}`}>
            <span>{family.number}</span>
            <strong>{family.title}</strong>
            <small>{family.eyebrow} · View projects ↓</small>
          </a>
        ))}
      </nav>

      <div className={styles.portfolioVisual}>
        <svg
          className={styles.portfolioMap}
          viewBox="0 0 760 310"
          role="img"
          aria-labelledby="portfolio-map-title portfolio-map-description"
        >
          <title id="portfolio-map-title">MiddleLeap venture intelligence loop</title>
          <desc id="portfolio-map-description">
            Three visible venture families create market, platform and execution intelligence that strengthens advisory mandates.
          </desc>
          <circle cx="380" cy="155" r="111" />
          <circle cx="380" cy="155" r="70" />
          <path className={styles.visibleMapPath} d="M310 132 C247 105 197 82 120 71" />
          <path className={styles.visibleMapPath} d="M450 132 C513 105 563 82 640 71" />
          <path className={styles.visibleMapPath} d="M380 225 C380 251 380 265 380 287" />
          <g className={styles.visibleMapNode}>
            <rect x="30" y="33" width="190" height="76" />
            <text x="48" y="61">01 / COMMONS</text>
            <text className={styles.mapNodeTitle} x="48" y="86">Ecosystem evidence</text>
          </g>
          <g className={styles.visibleMapNode}>
            <rect x="540" y="33" width="190" height="76" />
            <text x="558" y="61">02 / VENTURES</text>
            <text className={styles.mapNodeTitle} x="558" y="86">Platform patterns</text>
          </g>
          <g className={styles.visibleMapNode}>
            <rect x="285" y="248" width="190" height="56" />
            <text x="303" y="273">03 / TOOLING</text>
            <text className={styles.mapNodeTitle} x="303" y="294">Execution methods</text>
          </g>
          <g className={styles.mapCore}>
            <circle cx="380" cy="155" r="58" />
            <text x="380" y="139">BUILD</text>
            <text x="380" y="158">LEARN</text>
            <text x="380" y="177">APPLY</text>
          </g>
        </svg>

        <div className={styles.portfolioOutput}>
          <span>Three intelligence streams</span>
          <strong>Ecosystem evidence · Platform patterns · Execution methods</strong>
          <b>01—03</b>
        </div>
      </div>

      <div className={styles.portfolioFamilies}>
        {ventureFamilies.map((family) => (
          <section
            className={styles.familyPanel}
            id={`family-${family.id}`}
            key={family.id}
            aria-labelledby={`family-${family.id}-title`}
            tabIndex={-1}
          >
            <div className={styles.familyIntroduction}>
              <p className={styles.eyebrow}>{family.number} · {family.eyebrow}</p>
              <h3 id={`family-${family.id}-title`}>{family.title}</h3>
              <p>{family.proposition}</p>
              <div className={styles.familyIntelligence}>
                <span>Intelligence created</span>
                <strong>{family.intelligence}</strong>
              </div>
            </div>
            <div className={styles.projectGrid}>
              {family.projects.map((project) => (
                <article key={project.name}>
                  <div className={styles.projectMeta}>
                    <span>{project.role}</span>
                    <b>{project.status}</b>
                  </div>
                  <h4>{project.name}</h4>
                  <p>{project.summary}</p>
                  <div className={styles.projectLinks}>
                    {project.detailPath && (
                      <Link href={project.detailPath} aria-label={`Read the ${project.name} build story`}>
                        Build story →
                      </Link>
                    )}
                    {project.href && (
                      <a href={project.href} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}`}>
                        Visit ↗
                      </a>
                    )}
                    {project.repository && (
                      <a href={project.repository} target="_blank" rel="noreferrer" aria-label={`Open the ${project.name} repository`}>
                        Repository ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
