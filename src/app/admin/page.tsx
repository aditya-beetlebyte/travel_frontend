"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import styles from "./admin.module.css";
import AdminBackButton from "./AdminBackButton";

export default function AdminDashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
          flexWrap: "wrap",
        }}
      >
        <AdminBackButton />
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>
            Welcome back, {user?.email ?? "Admin"}
          </p>
        </div>
      </div>
      <div className={styles.dashboardGrid}>
        <Link href="/admin/blog" className={`${styles.card} ${styles.cardLink}`}>
          <div className={`${styles.cardIcon} ${styles.cardIconBlog}`}>
            <span className={styles.iconBlog} aria-hidden>✈</span>
          </div>
          <h2 className={styles.cardTitle}>Blog</h2>
          <p className={styles.cardDesc}>Create and manage travel blog posts, stories, and tips.</p>
        </Link>
        <Link href="/admin/offers" className={`${styles.card} ${styles.cardLink}`}>
          <div className={`${styles.cardIcon} ${styles.cardIconOffers}`}>
            <span className={styles.iconOffers} aria-hidden>🏷</span>
          </div>
          <h2 className={styles.cardTitle}>Offers</h2>
          <p className={styles.cardDesc}>Manage deals, discounts, and special travel offers.</p>
        </Link>
      </div>
    </div>
  );
}
