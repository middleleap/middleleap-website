import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { fieldNotes, getFieldNote } from "@/lib/field-notes";
import { createPageMetadata } from "@/lib/metadata";
import styles from "../field-notes.module.css";

export function generateStaticParams() {
  return fieldNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) return {};

  return createPageMetadata({
    title: note.title,
    description: note.dek,
    path: `/field-notes/${note.slug}`,
    socialTitle: `${note.title} | MiddleLeap Field Notes`,
  });
}

export default async function FieldNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) notFound();

  return (
    <div className={styles.shell}>
      <SiteHeader
        active="notes"
        priority
        breadcrumbs={[
          { href: "/", label: "Advisory" },
          { href: "/field-notes", label: "Field notes" },
          { label: note.title },
        ]}
      />

      <main id="main-content" tabIndex={-1}>
        <article className={styles.article}>
          <header>
            <p className={styles.eyebrow}>Field note · {note.number}</p>
            <h1>{note.title}</h1>
            <p className={styles.articleDek}>{note.dek}</p>
            <div className={styles.articleMeta}>
              <span>{note.theme}</span>
              <span>{note.readingTime}</span>
              <span>MiddleLeap · Dubai</span>
            </div>
          </header>

          <div className={styles.articleBody}>
            {note.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.points && (
                  <ul>
                    {section.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                )}
              </section>
            ))}
            <blockquote>{note.closing}</blockquote>
          </div>

          <footer className={styles.articleFooter}>
            <Link href="/field-notes">Read all field notes</Link>
            <a href="mailto:contact@middleleap.com?subject=Field%20note%20and%20strategic%20mandate">
              Discuss the decision →
            </a>
          </footer>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
