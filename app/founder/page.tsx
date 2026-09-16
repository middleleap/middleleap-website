import Link from "next/link";
import { FounderPortrait } from "@/components/FounderPortrait";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { bookingLinkProps, mailtoHref } from "@/lib/contact";
import {
  founder,
  founderBeyond,
  founderBioLong,
  founderBioShort,
  founderCareer,
  founderCredentials,
  founderPerson,
} from "@/lib/founder";
import { jsonLdScript } from "@/lib/structured-data";
import { pageMetadata, siteOrigin } from "@/lib/seo";
import styles from "./founder.module.css";

export const metadata = pageMetadata({
  title: `${founder.name} — Founder`,
  description: founderBioShort,
  path: founder.path,
  socialTitle: `${founder.name} — Founder | MiddleLeap`,
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${siteOrigin}${founder.path}#page`,
      url: `${siteOrigin}${founder.path}`,
      name: `${founder.name} — Founder`,
      description: founderBioShort,
      mainEntity: { "@id": founderPerson["@id"] },
      about: { "@id": `${siteOrigin}/#organization` },
    },
    founderPerson,
  ],
};

export default function FounderPage() {
  return (
    <main className={styles.shell} id="problem" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(structuredData) }}
      />

      <SiteHeader
        active="founder"
        breadcrumbs={[{ href: "/", label: "Advisory" }, { label: "Founder" }]}
        contextLabel="Founder navigation"
        contextLinks={[
          { href: "#record", label: "Track record" },
          { href: "#career", label: "Career" },
          { href: "#engage", label: "Engage" },
        ]}
      />

      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Founder</p>
          <h1>The senior lead on every mandate. <em>By name.</em></h1>
          <p className={styles.lede}>{founderBioLong[0]}</p>
          <div className={styles.actions}>
            <a className={styles.primaryAction} {...bookingLinkProps}>
              Book a conversation
            </a>
            <a
              className={styles.secondaryAction}
              href={founder.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
        <FounderPortrait className={styles.portrait} size={960} priority />
      </section>

      <section className={styles.credentials} aria-label="Track record in numbers">
        <dl>
          {founderCredentials.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.figure}</dd>
            </div>
          ))}
        </dl>
        <p>
          Figures are from prior executive roles, before MiddleLeap, and are dated in the career
          record below.
        </p>
      </section>

      <section className={styles.section} id="record" tabIndex={-1}>
        <div className={styles.columns}>
          <div>
            <p className={styles.eyebrow}>Track record</p>
            <h2>Three platform shifts, <em>delivered from the inside.</em></h2>
            <div className={styles.bio}>
              {founderBioLong.slice(1).map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <div className={styles.links}>
              <a href={founder.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              <a href={founder.links.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              <a href={founder.links.x} target="_blank" rel="noopener noreferrer">X ↗</a>
            </div>
          </div>

          <div id="career" tabIndex={-1}>
            <p className={styles.eyebrow}>Career</p>
            <ol className={styles.record}>
              {founderCareer.map((role) => (
                <li key={role.title}>
                  <span>{role.years}</span>
                  <div>
                    <strong>{role.title}</strong>
                    <p>{role.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className={styles.eyebrow}>Beyond the day job</p>
            <dl className={styles.record}>
              {founderBeyond.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className={styles.engage} id="engage" tabIndex={-1}>
        <p className={styles.eyebrow}>Start with the mandate in front of you</p>
        <h2>Bring the mandate. Michael takes the first call.</h2>
        <p>
          Book a call directly, or email {" "}
          <a href={mailtoHref("Strategic mandate")}>contact@middleleap.com</a> if you prefer.
        </p>
        <div className={styles.engageActions}>
          <a {...bookingLinkProps}>Book a conversation ↗</a>
          <Link href="/practice">See how the practice is staffed →</Link>
          <Link href="/how-we-engage">See how we engage →</Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
