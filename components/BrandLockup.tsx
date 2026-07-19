import Image from "next/image";
import Link from "next/link";
import styles from "./BrandLockup.module.css";

type BrandLockupProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLockup({ className = "", priority = false }: BrandLockupProps) {
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
        priority={priority}
      />
      <Image
        className={styles.onLight}
        src="/pivot-on-light.svg"
        alt="MiddleLeap"
        width={164}
        height={39}
        priority={priority}
      />
    </Link>
  );
}
