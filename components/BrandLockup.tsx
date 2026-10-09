import Image from "next/image";
import Link from "next/link";
import styles from "./BrandLockup.module.css";

type BrandLockupProps = {
  className?: string;
};

// Both theme variants render and CSS shows exactly one; neither is preloaded
// because they are sub-kilobyte SVGs and one is always display: none.
export function BrandLockup({ className = "" }: BrandLockupProps) {
  return (
    <Link
      href="/"
      className={`${styles.lockup} ${className}`.trim()}
      aria-label="MiddleLeap home"
    >
      <Image
        className={styles.onInk}
        src="/pivot-on-ink.svg"
        alt="MiddleLeap"
        width={164}
        height={39}
      />
      <Image
        className={styles.onLight}
        src="/pivot-on-light.svg"
        alt=""
        width={164}
        height={39}
      />
    </Link>
  );
}
