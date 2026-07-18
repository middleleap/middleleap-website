import Link from "next/link";
import { portfolioProjects } from "@/lib/ventures";
import styles from "./SiteChrome.module.css";

export function RelatedPortfolio({ currentPath }: { currentPath: string }) {
  const related = portfolioProjects.filter((project) => project.detailPath !== currentPath);

  return (
    <section className={styles.related} aria-labelledby="related-portfolio-title">
      <div>
        <span>Related portfolio</span>
        <h2 id="related-portfolio-title">Continue through the evidence.</h2>
      </div>
      <div className={styles.relatedLinks}>
        {related.map((project) => (
          <Link href={project.detailPath} key={project.detailPath}>
            <small>{project.harnessProfile}</small>
            <strong>{project.name}</strong>
            <span>Read the build record →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
