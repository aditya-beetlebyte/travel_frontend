"use client";

import menu_data from "@/data/MenuData";
import { resolveNavSubMenus } from "@/data/navPackageSubMenus";
import { loadPackageDestinationsForNav } from "@/services/packageDestinationsNav";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const NavMenuInner = () => {
  const currentRoute = usePathname();
  const searchParams = useSearchParams();
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
      if (!queryPart) return true;
      const sub = new URLSearchParams(queryPart);
      const want = sub.getAll("destination").sort().join("\0");
      const have = searchParams.getAll("destination").sort().join("\0");
      return want === have;
    } catch {
      return currentRoute === subMenuLink;
    }
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
              <ul className="sub-menu">
                {subMenus.map((sub_m, i) => (
                  <li key={i}>
                    <Link href={sub_m.link} className={`${sub_m.link && isSubMenuItemActive(sub_m.link) ? "active" : ""}`}>
                      {sub_m.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

const NavMenu = () => (
  <Suspense fallback={<ul className="navigation" />}>
    <NavMenuInner />
  </Suspense>
);

export default NavMenu;
