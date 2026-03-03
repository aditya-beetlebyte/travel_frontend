import Image from "next/image"
import BannerFormTwo from "@/components/common/banner-form/BannerFormTwo"

import shape_1 from "@/assets/img/booking/shape.png"
import shape_2 from "@/assets/img/booking/shape-2.png"

const BreadCrumb = () => {
   return (
      <div className="tg-booking-form-area p-relative z-index-1 tg-listing-booking-shadow">
         <Image className="tg-booking-4-shape d-none d-lg-block" src={shape_1} alt="shape" />
         <Image className="tg-booking-4-shape-2 d-none d-lg-block" src={shape_2} alt="shape" />
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="tg-booking-form-item pt-20 pb-10">
                     <BannerFormTwo />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default BreadCrumb
