/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import menu_data from "@/data/MenuData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileMenu = () => {
   const currentRoute = usePathname();
   const [navTitle, setNavTitle] = useState("");
   const [subNavTitle, setSubNavTitle] = useState("");

   const isMenuItemActive = (menuLink: string) => {
      return currentRoute === menuLink;
   };

   const isSubMenuItemActive = (subMenuLink: string) => {
      return currentRoute === subMenuLink;
   };

   // Open or close the parent menu
   const openMobileMenu = (menu: any) => {
      setNavTitle((prev: any) => (prev === menu ? "" : menu));
      setSubNavTitle("");
   };

   // Open or close the submenu
   const openMobileSubMenu = (sub_m: any) => {
      setSubNavTitle((prev: any) => (prev === sub_m ? "" : sub_m));
   };

   return (
      <ul className="navigation">
         {menu_data.map((menu) => (
            <li key={menu.id} className={menu.has_dropdown ? "menu-item-has-children" : ""}>
               <Link href={menu.link} className={`${(isMenuItemActive(menu.link) || (menu.sub_menus && menu.sub_menus.some((sub_m) => sub_m.link && isSubMenuItemActive(sub_m.link)))) ? "active" : ""}`}>
                  {menu.title}
               </Link>

               {menu.has_dropdown && (
                  <>
                     {menu.sub_menus && (
                        <>
                           <ul className="sub-menu" style={{ display: navTitle === menu.title ? "block" : "none" }}>
                              {menu.sub_menus.map((sub_m, i) => (
                                 <li key={i}>
                                    <Link href={sub_m.link} className={`${sub_m.link && isSubMenuItemActive(sub_m.link) ? "active" : ""}`}>
                                       {sub_m.title}
                                    </Link>
                                 </li>
                              ))}
                           </ul>
                           <div className={`dropdown-btn ${navTitle === menu.title ? "open" : ""}`}
                              onClick={() => openMobileMenu(menu.title)}>
                              <span className="plus-line"></span>
                           </div>
                        </>
                     )}
                  </>
               )}
            </li>
         ))}
      </ul>
   );
};

export default MobileMenu;
