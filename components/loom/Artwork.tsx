import { preload } from "react-dom";
import styles from "./loom.module.css";

export function Artwork({ kind = "sculpture", priority = false }: { kind?: "sculpture" | "weave"; priority?: boolean }) {
  const src = `/images/loom/${kind}-1440.webp`;
  const srcSet = `/images/loom/${kind}-640.webp 640w, /images/loom/${kind}-960.webp 960w, ${src} 1440w`;
  const sizes = "(max-width: 720px) 100vw, (max-width: 1200px) 50vw, 700px";
  if (priority) preload(src, { as: "image", imageSrcSet: srcSet, imageSizes: sizes, fetchPriority: "high" });
  return <figure className={styles.artwork}>
    {/* Static export has no image optimizer; these local WebP sizes are generated ahead of time. */}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} srcSet={srcSet} sizes={sizes} width={1440} height={kind === "sculpture" ? 960 : 720} alt={kind === "sculpture" ? "A sculptural loom weaving ivory and copper threads into flowing fabric" : "Individual ivory and copper threads joining into a coherent woven structure"} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} />
    <figcaption><span>{kind === "sculpture" ? "Context becomes craft" : "Many threads. One coherent practice."}</span><span>AI-generated concept</span></figcaption>
  </figure>;
}
