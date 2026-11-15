import Link from "next/link";
import { ExternalArrow } from "@/components/ExternalArrow";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { bookingLinkProps } from "@/lib/contact";
import { founder, founderPersonId } from "@/lib/founder";
import { goLiveDecisions, goLiveReview } from "@/lib/goLiveDecisions";
import { pageMetadata, siteOrigin } from "@/lib/seo";
import styles from "./article.module.css";

const title = "Seven Decisions Before a UAE Open Finance Go-Live";
const description =
  "A sponsor's list for UAE banks: the seven decisions to settle before an Open Finance go-live, what happens when each is left open, and who should own it.";
const path = "/open-finance/go-live-decisions";

export const metadata = pageMetadata({ title, description, path });

const structuredData = {
  "@type": "Article",
  "@id": `${siteOrigin}${path}#article`,
  headline: title,
  description,
  url: `${siteOrigin}${path}`,
  datePublished: goLiveReview.reviewedOn,
  dateModified: goLiveReview.reviewedOn,
  inLanguage: "en-GB",
  author: { "@id": founderPersonId },
  publisher: { "@id": `${siteOrigin}/#organization` },
  about: ["Open Finance", "United Arab Emirates", "Licensed Financial Institution"],
};

export default function GoLiveDecisionsPage() {
  return (
    <main className={styles.shell} id="problem" tabIndex={-1}>
      <JsonLd node={structuredData} />
      <SiteHeader
        active="what"
        breadcrumbs={[
          { href: "/", label: "Advisory" },
          { href: "/open-finance", label: "Open Finance" },
          { label: "Go-live decisions" },
        ]}
      />
      <article className={styles.content}>
        <p className={styles.eyebrow}>Open Finance · UAE</p>
        <h1>Seven decisions to settle before your Open Finance <em>go-live.</em></h1>
        <p className={styles.byline}>
          <Link href="/founder">{founder.name}</Link> · Reviewed {goLiveReview.reviewedLabel}
        </p>

        <p className={styles.lede}>
          Open Finance is mandatory for licensed banks in the UAE. Building the connection is
          the part that comes with a specification. The decisions below come with none, and each
          is harder to make after launch than before it.
        </p>
        <p>
          This is a sponsor&apos;s list. For each decision it says what has to be settled, what
          tends to happen when it is left open, and who should own it. It is written for the
          executive who signs off the go-live.
        </p>

        <ol className={styles.decisions}>
          {goLiveDecisions.map((decision) => (
            <li key={decision.number}>
              <span className={styles.number}>{decision.number} · {decision.title}</span>
              <h2>{decision.question}</h2>
              <p>{decision.body}</p>
              <dl>
                <div><dt>If left open</dt><dd>{decision.leftOpen}</dd></div>
                <div><dt>Who should own it</dt><dd>{decision.owner}</dd></div>
              </dl>
            </li>
          ))}
        </ol>

        <section>
          <h2>Where to start</h2>
          <p>
            Settle role and proposition first. They decide how much the other five matter and
            who should be in the room for them. A bank that only complies needs a small, durable
            operation. A bank that also competes needs a business owner with a budget.
          </p>
          <p>
            The complimentary <Link href="/open-finance#readiness-review">Open Finance Readiness
            &amp; Value Review</Link> works through one of these decisions with your sponsor in a
            60-minute session and leaves a two-page brief behind.
          </p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} {...bookingLinkProps}>Book a fit call<ExternalArrow /></a>
            <Link className={styles.secondaryAction} href="/open-finance">Open Finance advisory →</Link>
          </div>
        </section>

        <section className={styles.sources}>
          <h2>Sources and scope</h2>
          <p>
            Statements about the scheme were checked on {goLiveReview.reviewedLabel} against{" "}
            {goLiveReview.standards}, the current published version. For scope and definitions
            use the{" "}
            <a href="https://rulebook.centralbank.ae/en/rulebook/introduction-and-scope-2" target="_blank" rel="noopener noreferrer">
              CBUAE Open Finance Regulation<ExternalArrow />
            </a>
            . For the Standards and their errata use the{" "}
            <a href="https://nebras-open-finance.com/tech/release-notes-and-erratas/" target="_blank" rel="noopener noreferrer">
              published release notes and errata<ExternalArrow />
            </a>
            .
          </p>
          <p>
            Fees, compensation amounts and service levels change, so this page does not quote
            them. It is a practitioner&apos;s view and is not legal or regulatory advice.
          </p>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
