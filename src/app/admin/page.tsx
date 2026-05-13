"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import styles from "./admin.module.css";
import AdminBackButton from "./AdminBackButton";
import { can } from "@/utils/permissions";

export default function AdminDashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const permissions = useSelector((state: RootState) => state.auth.permissions);
  const isSuperAdmin = !!user?.isSuperAdmin;

  const canBlog = can(permissions, isSuperAdmin, "blogs", "read");
  const canOffers = can(permissions, isSuperAdmin, "offers", "read");
  const canPackages = can(permissions, isSuperAdmin, "packages", "read");
  const canUsers = can(permissions, isSuperAdmin, "users", "read");
  const canEnquiry = can(permissions, isSuperAdmin, "enquiry", "read");

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
            Welcome back, {user?.name || user?.email || "Admin"}
            {user?.roleName ? (
              <span style={{ marginLeft: 8, color: "#64748b", fontSize: "0.875rem" }}>
                ({user.roleName})
              </span>
            ) : null}
          </p>
        </div>
      </div>
      <div className={styles.dashboardGrid}>
        {canBlog && (
          <Link href="/admin/blog" className={`${styles.card} ${styles.cardLink}`}>
            <div className={`${styles.cardIcon} ${styles.cardIconBlog}`}>
              <span className={styles.iconBlog} aria-hidden>✈</span>
            </div>
            <h2 className={styles.cardTitle}>Blog</h2>
            <p className={styles.cardDesc}>Create and manage travel blog posts, stories, and tips.</p>
          </Link>
        )}
        {canOffers && (
          <Link href="/admin/offers" className={`${styles.card} ${styles.cardLink}`}>
            <div className={`${styles.cardIcon} ${styles.cardIconOffers}`}>
              <span className={styles.iconOffers} aria-hidden>🏷</span>
            </div>
            <h2 className={styles.cardTitle}>Offers</h2>
            <p className={styles.cardDesc}>Manage deals, discounts, and special travel offers.</p>
          </Link>
        )}
        {canPackages && (
          <Link href="/admin/packages" className={`${styles.card} ${styles.cardLink}`}>
            <div className={`${styles.cardIcon} ${styles.cardIconOffers}`}>
              <span className={styles.iconOffers} aria-hidden>🧭</span>
            </div>
            <h2 className={styles.cardTitle}>Packages</h2>
            <p className={styles.cardDesc}>Manage package routes, durations, and active status.</p>
          </Link>
        )}
        {canUsers && (
          <Link href="/admin/rbac/users" className={`${styles.card} ${styles.cardLink}`}>
            <div className={`${styles.cardIcon} ${styles.cardIconBlog}`}>
              <span className={styles.iconBlog} aria-hidden>👥</span>
            </div>
            <h2 className={styles.cardTitle}>Users</h2>
            <p className={styles.cardDesc}>Create accounts and assign roles.</p>
          </Link>
        )}
        {canEnquiry && (
          <Link href="/admin/enquiries" className={`${styles.card} ${styles.cardLink}`}>
            <div className={`${styles.cardIcon} ${styles.cardIconBlog}`}>
              <span className={styles.iconBlog} aria-hidden>📩</span>
            </div>
            <h2 className={styles.cardTitle}>Enquiries</h2>
            <p className={styles.cardDesc}>View and manage package enquiries.</p>
          </Link>
        )}
        {isSuperAdmin && (
          <Link href="/admin/rbac/roles" className={`${styles.card} ${styles.cardLink}`}>
            <div className={`${styles.cardIcon} ${styles.cardIconOffers}`}>
              <span className={styles.iconOffers} aria-hidden>⚙</span>
            </div>
            <h2 className={styles.cardTitle}>Roles</h2>
            <p className={styles.cardDesc}>Define permissions for each module.</p>
          </Link>
        )}
        {!canBlog && !canOffers && !canPackages && !canUsers && !canEnquiry && !isSuperAdmin && (
          <div className={styles.card}>
            <p className={styles.cardDesc}>You don&apos;t have access to any admin modules. Contact a super admin.</p>
          </div>
        )}
      </div>
    </div>
  );
}
