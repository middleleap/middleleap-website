import Image from "next/image";
import { founder } from "@/lib/founder";
import styles from "./FounderPortrait.module.css";

type FounderPortraitProps = {
  className?: string;
  size: number;
  priority?: boolean;
};

// Two studio variants (ink and paper ground) render and CSS shows exactly one,
// the same pattern BrandLockup uses, so the portrait sits on the theme's own
// surface instead of a rectangle of the other theme's background.
export function FounderPortrait({ className = "", size, priority = false }: FounderPortraitProps) {
  return (
    <span className={`${styles.portrait} ${className}`.trim()}>
      <Image
        className={styles.onInk}
        src={founder.portrait.onInk}
        alt={founder.portrait.alt}
        width={size}
        height={size}
        priority={priority}
      />
      <Image
        className={styles.onLight}
        src={founder.portrait.onLight}
        alt=""
        width={size}
        height={size}
        priority={priority}
      />
    </span>
  );
}
