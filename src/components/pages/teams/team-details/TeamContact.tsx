import Link from "next/link"

import { CONTACT_EMAIL, CONTACT_EMAIL_MAILTO } from "@/constants/contact"

const TeamContact = () => {
   return (
      <div className="tg-team-details-contact-info">
         <div className="row row-cols-sm-2 row-cols-1">
            <div className="col">
               <div className="tg-team-details-contact">
                  <span>Phone :</span>
                  <Link href="tel:+919310436035">+91 93104 36035</Link>
               </div>
            </div>
            <div className="col">
               <div className="tg-team-details-contact">
                  <span>Website : </span>
                  <Link href="#">www.info.com</Link>
               </div>
            </div>
            <div className="col">
               <div className="tg-team-details-contact">
                  <span>E-mail : </span>
                  <Link href={CONTACT_EMAIL_MAILTO}>{CONTACT_EMAIL}</Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default TeamContact
