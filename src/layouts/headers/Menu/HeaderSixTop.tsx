import Link from "next/link"

import { CONTACT_EMAIL, CONTACT_EMAIL_MAILTO } from "@/constants/contact"

const HeaderSixTop = () => {
   return (
      <div className="tg-header-top tg-header-top-space tg-primary-bg d-none d-lg-block">
         <div className="container">
            <div className="row">
               <div className="col-lg-6">
                  <div className="tg-header-top-info d-flex align-items-center">
                     <Link href="https://www.google.com/maps/@41.6758525,-86.2531698,18.17z"><i className="mr-5 fa-regular fa-location-dot"></i> 178 makr street, 8007 Australia</Link>
                     <span className="tg-header-dvdr mr-10 ml-10"></span>
                     <Link href={CONTACT_EMAIL_MAILTO}><i className="mr-5 fa-regular fa-envelope"></i> {CONTACT_EMAIL}</Link>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="tg-header-top-info d-flex align-items-center justify-content-end">
                     <Link href="tel:+919310436035"><i className="fa-sharp fa-regular fa-phone"></i> +91 93104 36035</Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeaderSixTop
