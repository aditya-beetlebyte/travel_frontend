import InstagramIcon from "@/svg/InstagramIcon"
import { CONTACT_EMAIL, CONTACT_EMAIL_MAILTO } from "@/constants/contact"
import { INSTAGRAM_URL } from "@/constants/social"
import Link from "next/link"

const HeaderTwoTop = () => {   return (
      <div className="tg-header-top tg-header-top-space tg-primary-bg d-none d-lg-block">
         <div className="container-fluid container-1790">
            <div className="row">
               <div className="col-lg-6">
                  <div className="tg-header-top-info d-flex align-items-center">
                     <Link href="https://www.google.com/maps/@41.6758525,-86.2531698,18.17z"><i className="mr-5 fa-regular fa-location-dot"></i> 178 makr street, 8007 Australia</Link>
                     <span className="tg-header-dvdr mr-20 ml-20"></span>
                     <Link href={CONTACT_EMAIL_MAILTO}><i className="mr-5 fa-regular fa-envelope"></i> {CONTACT_EMAIL}</Link>
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="tg-header-top-social d-flex align-items-center justify-content-end">
                     <span>Follow us:</span>
                     <ul>
                        <li>
                           <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                              <InstagramIcon />
                           </Link>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeaderTwoTop
