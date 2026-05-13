import type { MenuItem } from "@/data/MenuData";

export const PACKAGES_MENU_ID = 4;

export type NavSubMenuItem = { title: string; link: string };

export function packageDestinationSubMenus(destinations: string[]): NavSubMenuItem[] {
  return [
    { title: "All packages", link: "/packages" },
    ...destinations.map((d) => ({
      title: d,
      link: `/packages?destination=${encodeURIComponent(d)}`,
    })),
  ];
}

export function resolveNavSubMenus(menu: MenuItem, packageDestinations: string[]): NavSubMenuItem[] {
  if (menu.id === PACKAGES_MENU_ID && menu.has_dropdown) {
    return packageDestinationSubMenus(packageDestinations);
  }
  return menu.sub_menus ?? [];
}
