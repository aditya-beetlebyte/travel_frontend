"use client"
import NavMenu from "./Menu/NavMenu"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react";
import UseSticky from "@/hooks/UseSticky";
import Offcanvas from "./Menu/Offcanvas";
import Sidebar from "./Menu/Sidebar";
import PhoneIcon from "@/svg/PhoneIcon";
import UserIcon from "@/svg/UserIcon";

import logo_1 from "@/assets/img/logo/logo-white.png";
import logo_2 from "@/assets/img/logo/logo-green.png";

const HeaderOne = () => {

   const { sticky } = UseSticky();
   const [offCanvas, setOffCanvas] = useState<boolean>(false);
   const [sidebar, setSidebar] = useState<boolean>(false);

   return (
      <>
         <header className="tg-header-height">
            <div className={`tg-header__area tg-header-tu-menu tg-header-lg-space z-index-999 tg-transparent ${sticky ? "header-sticky" : ""}`} id="header-sticky">
               <div className="container">
                  <div className="row align-items-center">
                     <div className="col-xxl-9 col-xl-8 col-lg-8 col-5">
                        <div className="tgmenu__wrap d-flex align-items-center">
                           <div className="logo mr-25">
                              <Link className="logo-1" href="/"><Image src={logo_1} alt="Logo" /></Link>
                              <Link className="logo-2 d-none" href="/"><Image src={logo_2} alt="Logo" /></Link>
                           </div>
                           <button onClick={() => setSidebar(true)} style={{ cursor: "pointer" }} className="tgmenu-offcanvas-open-btn menu-tigger d-none d-xl-block">
                              <span></span>
                              <span></span>
                              <span></span>
                           </button>
                           <nav className="tgmenu__nav tgmenu-1-space ml-190">
                              <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                                 <NavMenu />
                              </div>
                           </nav>
                        </div>
                     </div>
                     <div className="col-xxl-3 col-xl-4 col-lg-4 col-7">
                        <div className="tg-menu-right-action d-flex align-items-center justify-content-end">
                           <div className="tg-header-contact-info d-flex align-items-center">
                              <span className="tg-header-contact-icon mr-10 d-none d-xl-block">
                                 <PhoneIcon />
                              </span>
                              <div className="tg-header-contact-number d-none d-xl-block">
                                 <span>Call Us:</span>
                                 <Link href="tel:+123595966">+123 5959 66</Link>
                              </div>
                           </div>
                           <div className="tg-header-btn ml-20 d-none d-sm-block">
                              <Link className="tg-btn-header" href="/login">
                                 <span>
                                    <UserIcon />
                                 </span>
                                 Login
                              </Link>
                           </div>
                           <div className="tg-header-menu-bar p-relative">
                              <button onClick={() => setOffCanvas(true)} style={{ cursor: "pointer" }} className="tgmenu-offcanvas-open-btn mobile-nav-toggler d-block d-xl-none ml-10">
                                 <span></span>
                                 <span></span>
                                 <span></span>
                              </button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>
         <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />
      </>
   )
}

export default HeaderOne
