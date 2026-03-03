import Image from "next/image"
import team_data from "@/data/TeamData"
import Link from "next/link"

import shape_1 from "@/assets/img/about/details/shape.png"
import shape_2 from "@/assets/img/banner/banner-2/shape.png"
import shape_3 from "@/assets/img/listing/listing-2/shape.png"

const TeamArea = () => {
   return (
      <div className="tg-team-area pt-130 pb-100 p-relative z-index-1">
         <Image className="tg-team-shape d-none d-md-block" src={shape_1} alt="" />
         <Image className="tg-team-shape-2 d-none d-md-block" src={shape_2} alt="" />
         <div className="container">
            <div className="row">
               {team_data.map((item) => (
                  <div key={item.id} className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                     <div className="tg-team-wrap text-center mb-30">
                        <div className="tg-team-thumb p-relative">
                           <Image className="hover-img" src={item.thum} alt="team" />
                           <div className="tg-listing-2-mask">
                              <Image className="w-100" src={shape_3} alt="" />
                           </div>
                        </div>
                        <div className="tg-team-content">
                           <h5><Link href="/team-details">{item.title}</Link></h5>
                           <span>Consulting</span>
                           <div className="tg-team-social">
                              <Link href="#"><i className="fa-brands fa-facebook-f"></i></Link>
                              <Link href="#"><i className="fa-brands fa-twitter"></i></Link>
                              <Link href="#"><i className="fa-brands fa-instagram"></i></Link>
                              <Link href="#"><i className="fa-brands fa-pinterest-p"></i></Link>
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default TeamArea
