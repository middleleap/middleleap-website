"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PERSONAS,
  SIGNAL_TAGS,
  type PostMeta,
  type Persona,
  type SignalTag,
} from "@/lib/signal-types";

type TagFilter = SignalTag | "All";
type PersonaFilter = Persona | "All";

export default function SignalList({ posts }: { posts: PostMeta[] }) {
  const [tag, setTag] = useState<TagFilter>("All");
  const [persona, setPersona] = useState<PersonaFilter>("All");

  // Only offer filters that actually appear in the content set.
  const availableTags = useMemo(
    () => SIGNAL_TAGS.filter((t) => posts.some((p) => p.tag === t)),
    [posts]
  );
  const availablePersonas = useMemo(
    () => PERSONAS.filter((pn) => posts.some((p) => p.persona === pn)),
    [posts]
  );

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (tag === "All" || p.tag === tag) &&
          (persona === "All" || p.persona === persona)
      ),
    [posts, tag, persona]
  );

  return (
    <>
      <div className="sig-filters" role="group" aria-label="Filter essays">
        <div className="sig-filter-row">
          <span className="sig-filter-label">{"// type"}</span>
          <FilterButton active={tag === "All"} onClick={() => setTag("All")}>
            All
          </FilterButton>
          {availableTags.map((t) => (
            <FilterButton key={t} active={tag === t} onClick={() => setTag(t)}>
              {t}
            </FilterButton>
          ))}
        </div>
        <div className="sig-filter-row">
          <span className="sig-filter-label">{"// for"}</span>
          <FilterButton
            active={persona === "All"}
            onClick={() => setPersona("All")}
          >
            All
          </FilterButton>
          {availablePersonas.map((pn) => (
            <FilterButton
              key={pn}
              active={persona === pn}
              onClick={() => setPersona(pn)}
            >
              {pn}
            </FilterButton>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="sig-empty">No essays match that filter yet.</p>
      ) : (
        <div className="sig-grid">
          {filtered.map((p) => (
            <Link
              href={`/signal/${p.slug}`}
              className="sig-card"
              key={p.slug}
            >
              <div className="sig-persona">
                {p.tag} &middot; For {p.persona}s
              </div>
              <div className="sig-title">{p.title}</div>
              <div className="sig-excerpt">{p.excerpt}</div>
              <div className="sig-meta">
                {p.readingTime}
                {p.draft && (
                  <>
                    {" "}
                    &middot; <span className="sig-soon">Draft</span>
                  </>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`sig-filter-btn${active ? " is-active" : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
