import styles from "./ExternalArrow.module.css";

// Marks a link that opens another site. Drawn as an SVG because the north-east
// arrow character (U+2197) is missing from the brand fonts, so iOS substitutes
// its colour emoji for it. Decorative, so the whole wrapper is hidden from
// assistive technology: the link text already names the destination.
// The word joiner keeps the arrow on the same line as the last word.
export function ExternalArrow() {
  return (
    <span className={styles.keep} aria-hidden="true">
      {"⁠"}
      <svg
        className={styles.arrow}
        viewBox="0 0 10 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        strokeLinejoin="miter"
        focusable="false"
      >
        <path d="M1.5 8.5 8.5 1.5M3.5 1.5h5v5" />
      </svg>
    </span>
  );
}
