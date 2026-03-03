"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/features/authSlice";
import { showConfirmToast } from "@/utils/confirmToast";
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
  const [mounted, setMounted] = useState(false);

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
    showConfirmToast("Do you want to log out?", () => {
      dispatch(logout());
      router.replace("/login");
    });
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
