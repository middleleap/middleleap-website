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
        src="/pivot-primary.svg"
        alt="MiddleLeap"
        width={152}
        height={36}
        priority={priority}
      />
    </Link>
  );
}
