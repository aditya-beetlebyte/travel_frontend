import Image from "next/image"
import Link from "next/link"

import { INSTAGRAM_URL } from "@/constants/social"
import logo from "@/assets/img/logo/logo-green.png"
import MobileMenu from "./MobileMenu";

interface MobileSidebarProps {
   offCanvas: boolean;
   setOffCanvas: (offCanvas: boolean) => void;
}

const Offcanvas = ({ offCanvas, setOffCanvas }: MobileSidebarProps) => {

   return (
      <div className={offCanvas ? "mobile-menu-visible" : ""}>
         <div className="tgmobile__menu">
            <nav className="tgmobile__menu-box">
               <div onClick={() => setOffCanvas(false)} className="close-btn"><i className="fa-solid fa-xmark"></i></div>
               <div className="nav-logo">
                  <Link href="/"><Image src={logo} alt="logo" /></Link>
               </div>
               <div className="tgmobile__search">
                  {/* <form onSubmit={handleSubmit}>
                     <input
                        type="text"
                        placeholder="Search here..."
                        value={searchValue}
                        onChange={handleSearchChange}
                     />
                  </form> */}
               </div>
               <div className="tgmobile__menu-outer">
                  <MobileMenu />
               </div>
               <div className="social-links">
                  <ul className="list-wrap">
                     <li>
                        <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                           <i className="fab fa-instagram"></i>
                        </Link>
                     </li>
                  </ul>
               </div>
            </nav>
         </div>
         <div onClick={() => setOffCanvas(false)} className="tgmobile__menu-backdrop"></div>
      </div>
   )
}

export default Offcanvas
