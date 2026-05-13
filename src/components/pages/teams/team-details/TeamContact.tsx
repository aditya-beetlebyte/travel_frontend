import Link from "next/link"

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
                  <Link href="mailto:info@gmail.com">info@gmail.com</Link>
               </div>
            </div>
            <div className="col">
               <div className="tg-team-details-contact">
                  <span>Address :</span>
                  <Link href="#"> 1426 California, USA </Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default TeamContact
