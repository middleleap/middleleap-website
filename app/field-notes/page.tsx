import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { fieldNotes } from "@/lib/field-notes";
import { createPageMetadata } from "@/lib/metadata";
import styles from "./field-notes.module.css";

export const metadata = createPageMetadata({
  title: "Field Notes",
  description:
    "Short MiddleLeap notes on regulated transformation, institutional decisions, Open Finance and governed AI delivery.",
  path: "/field-notes",
  socialTitle: "Field Notes | MiddleLeap",
  socialDescription:
    "Practical thinking on the decisions, evidence and operating models behind regulated platform transformation.",
});

export default function FieldNotesPage() {
  return (
    <div className={styles.shell}>
      <SiteHeader
        active="notes"
        priority
        breadcrumbs={[
          { href: "/", label: "Advisory" },
          { label: "Field notes" },
        ]}
      />

      <main id="main-content" tabIndex={-1}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Field notes</p>
          <h1>Thinking for the decision <em>before the programme.</em></h1>
          <p>
            Short notes from MiddleLeap&apos;s work across regulated transformation,
            platform strategy, Open Finance and human-led AI delivery.
          </p>
        </section>

        <section className={styles.noteList} aria-label="Published field notes">
          {fieldNotes.map((note) => (
            <article key={note.slug}>
              <span>{note.number}</span>
              <div>
                <small>{note.theme} · {note.readingTime}</small>
                <h2>{note.title}</h2>
                <p>{note.dek}</p>
              </div>
              <Link href={`/field-notes/${note.slug}`}>Read the note →</Link>
            </article>
          ))}
        </section>

        <section className={styles.noteCta} id="engage">
          <p className={styles.eyebrow}>From thinking to mandate</p>
          <h2>Bring the decision that cannot stay unresolved.</h2>
          <p>
            MiddleLeap works with the leaders who own regulatory, platform and
            operating-model decisions and the teams who must make them real.
          </p>
          <a className={styles.primaryAction} href="mailto:contact@middleleap.com?subject=Strategic%20mandate">
            Write to MiddleLeap
          </a>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
