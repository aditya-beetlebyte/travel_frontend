"use client";

import { useRouter } from "next/navigation";
import styles from "./admin.module.css";

interface AdminBackButtonProps {
  onClick?: () => void;
}

export default function AdminBackButton({ onClick }: AdminBackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.backIconButton}
      aria-label="Go back"
    >
      <span aria-hidden>←</span>
    </button>
  );
}

