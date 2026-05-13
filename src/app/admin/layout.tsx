"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/authSlice";
import { can } from "@/utils/permissions";
import styles from "./admin.module.css";

const NavIcon = ({ d, className }: { d: string; className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d={d} />
  </svg>
);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const permissions = useSelector((state: RootState) => state.auth.permissions);
  const user = useSelector((state: RootState) => state.auth.user);
  const isSuperAdmin = !!user?.isSuperAdmin;
  const [mounted, setMounted] = useState(false);

  const canBlog = can(permissions, isSuperAdmin, "blogs", "read");
  const canOffers = can(permissions, isSuperAdmin, "offers", "read");
  const canPackages = can(permissions, isSuperAdmin, "packages", "read");
  const canUsers = can(permissions, isSuperAdmin, "users", "read");
  const canEnquiry = can(permissions, isSuperAdmin, "enquiry", "read");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [mounted, isAuthenticated, router]);

  const handleLogout = () => {
    const confirmed =
      typeof window === "undefined" ? true : window.confirm("Do you want to log out?");
    if (!confirmed) return;
    dispatch(logout());
    router.replace("/login");
  };

  if (!mounted) {
    return (
      <div style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", background: "#f1f5f9" }}>
        <div style={{ padding: 40, textAlign: "center", color: "#64748b", fontSize: "0.9375rem" }}>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: 40, textAlign: "center", background: "#f1f5f9", minHeight: "100vh" }}>
        Redirecting to login...
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <h1 className={styles.brandTitle}>Triptrix Voyages</h1>
          <p className={styles.brandSub}>Travel Admin</p>
        </div>
        <nav className={styles.nav}>
          <Link
            href="/admin"
            className={pathname === "/admin" ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
          >
            <NavIcon d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" />
            Dashboard
          </Link>
          {canBlog && (
            <Link
              href="/admin/blog"
              className={pathname.startsWith("/admin/blog") ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
              onClick={(e) => {
                if (pathname.startsWith("/admin/blog")) {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("admin-refresh-blog"));
                }
              }}
            >
              <NavIcon d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              Blog
            </Link>
          )}
          {canOffers && (
            <Link
              href="/admin/offers"
              className={pathname.startsWith("/admin/offers") ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
              onClick={(e) => {
                if (pathname.startsWith("/admin/offers")) {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("admin-refresh-offers"));
                }
              }}
            >
              <NavIcon d="M12 8v13m0-13V6a2 2 0 1 1 2 2h-2zm0 0V5.5A2.5 2.5 0 1 0 9.5 8H12zm-7 4h14M5 12a2 2 0 1 1 0 4h14a2 2 0 1 1 0-4M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
              Offers
            </Link>
          )}
          {canPackages && (
            <Link
              href="/admin/packages"
              className={pathname.startsWith("/admin/packages") ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
              onClick={(e) => {
                if (pathname.startsWith("/admin/packages")) {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent("admin-refresh-packages"));
                }
              }}
            >
              <NavIcon d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-4 M8 10h8 M8 14h6" />
              Packages
            </Link>
          )}
          {canUsers && (
            <Link
              href="/admin/rbac/users"
              className={pathname.startsWith("/admin/rbac/users") ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
            >
              <NavIcon d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              Users
            </Link>
          )}
          {canEnquiry && (
            <Link
              href="/admin/enquiries"
              className={pathname.startsWith("/admin/enquiries") ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
            >
              <NavIcon d="M3 5h18M3 12h18M3 19h18" />
              Enquiries
            </Link>
          )}
          {isSuperAdmin && (
            <Link
              href="/admin/rbac/roles"
              className={pathname.startsWith("/admin/rbac/roles") ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
            >
              <NavIcon d="M12 2v4 M12 18v4 M4.93 4.93l2.83 2.83 M16.24 16.24l2.83 2.83 M2 12h4 M18 12h4 M4.93 19.07l2.83-2.83 M16.24 7.76l2.83-2.83" />
              Roles
            </Link>
          )}
        </nav>
        <div className={styles.sidebarFooter}>
          <button type="button" onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </aside>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
