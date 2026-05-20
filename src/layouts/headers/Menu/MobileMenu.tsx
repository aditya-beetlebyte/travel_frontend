/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import menu_data from "@/data/MenuData";
import { resolveNavSubMenus } from "@/data/navPackageSubMenus";
import { loadPackageDestinationsForNav } from "@/services/packageDestinationsNav";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const MobileMenuInner = () => {
  const currentRoute = usePathname();
  const searchParams = useSearchParams();
  const [navTitle, setNavTitle] = useState("");
  const [packageDestinations, setPackageDestinations] = useState<string[]>([]);

  useEffect(() => {
    loadPackageDestinationsForNav().then(setPackageDestinations);
  }, []);

  const isMenuItemActive = (menuLink: string) => {
    return currentRoute === menuLink;
  };

  const isSubMenuItemActive = (subMenuLink: string) => {
    try {
      const [pathPart, queryPart] = subMenuLink.split("?");
      if (currentRoute !== pathPart) return false;
      if (!queryPart) {
        return searchParams.getAll("destination").length === 0;
      }
      const sub = new URLSearchParams(queryPart);
      const want = sub.getAll("destination").sort().join("\0");
      const have = searchParams.getAll("destination").sort().join("\0");
      return want === have;
    } catch {
      return currentRoute === subMenuLink;
    }
  };

  const openMobileMenu = (menu: any) => {
    setNavTitle((prev: any) => (prev === menu ? "" : menu));
  };

  return (
    <ul className="navigation">
      {menu_data.map((menu) => {
        const subMenus = resolveNavSubMenus(menu, packageDestinations);
        const hasDrop = menu.has_dropdown && subMenus.length > 0;

        return (
          <li key={menu.id} className={hasDrop ? "menu-item-has-children" : ""}>
            <Link
              href={menu.link}
              className={`${
                isMenuItemActive(menu.link) || subMenus.some((sub_m) => sub_m.link && isSubMenuItemActive(sub_m.link))
                  ? "active"
                  : ""
              }`}
            >
              {menu.title}
            </Link>

            {hasDrop && (
              <>
                <ul className="sub-menu" style={{ display: navTitle === menu.title ? "block" : "none" }}>
                  {subMenus.map((sub_m, i) => (
                    <li key={i}>
                      <Link href={sub_m.link} className={`${sub_m.link && isSubMenuItemActive(sub_m.link) ? "active" : ""}`}>
                        {sub_m.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className={`dropdown-btn ${navTitle === menu.title ? "open" : ""}`} onClick={() => openMobileMenu(menu.title)}>
                  <span className="plus-line"></span>
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const MobileMenu = () => (
  <Suspense fallback={<ul className="navigation" />}>
    <MobileMenuInner />
  </Suspense>
);

export default MobileMenu;
