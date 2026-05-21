import Image from "next/image"
import Link from "next/link"

import { CONTACT_EMAIL, CONTACT_EMAIL_MAILTO } from "@/constants/contact"
import { INSTAGRAM_URL } from "@/constants/social"
import logo from "@/assets/img/logo/logo-green.png"
interface SidebarProps {
   sidebar: boolean;
   setSidebar: (offCanvas: boolean) => void;
}

const Sidebar = ({ sidebar, setSidebar }: SidebarProps) => {
   return (
      <>
         <div className={`offCanvas__info ${sidebar ? "active" : ""}`}>
            <div className="offCanvas__close-icon menu-close">
               <button onClick={() => setSidebar(false)}><i className="fa-sharp fa-regular fa-xmark"></i></button>
            </div>
            <div className="offCanvas__logo mb-30">
               <Link href="/"><Image src={logo} alt="Logo" /></Link>
            </div>
            <div className="offCanvas__side-info mb-30">
               <div className="contact-list mb-30">
                  <h4>Phone Number</h4>
                  <p>
                     <Link href="tel:+919310436035">+91 93104 36035</Link>
                  </p>
               </div>
               <div className="contact-list mb-30">
                  <h4>Email Address</h4>
                  <p>
                     <Link href={CONTACT_EMAIL_MAILTO}>{CONTACT_EMAIL}</Link>
                  </p>
               </div>
            </div>
            <div className="offCanvas__social-icon mt-30">
               <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
               </Link>
            </div>
         </div>
         <div onClick={() => setSidebar(false)} className={`offCanvas__overly ${sidebar ? "active" : ""}`}></div>
      </>
   )
}

export default Sidebar
