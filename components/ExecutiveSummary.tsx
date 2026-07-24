import styles from "./SiteChrome.module.css";

type SummaryItem = {
  label: string;
  title: string;
  detail: string;
};

type ExecutiveSummaryProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  items: SummaryItem[];
};

export function ExecutiveSummary({
  eyebrow = "Executive view",
  title,
  intro,
  items,
}: ExecutiveSummaryProps) {
  return (
    <section className={styles.executiveSummary} aria-labelledby="executive-summary-title">
      <div className={styles.executiveSummaryIntro}>
        <p>{eyebrow}</p>
        <div>
          <h2 id="executive-summary-title">{title}</h2>
          <p>{intro}</p>
        </div>
      </div>
      <div className={styles.executiveSummaryGrid}>
        {items.map((item, index) => (
          <article key={item.label}>
            <span>0{index + 1} / {item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
