import Button from "@/components/common/Button"
import Link from "next/link"

const CtaTwo = () => {
   return (
      <div className="tg-banner-area include-bg" style={{ backgroundImage: `url(/assets/img/banner/banner.png)` }}>
         <div className="container">
            <div className="col-lg-12">
               <div className="tg-banner-2-content text-center">
                  <div className="tg-about-section-title mb-25">
                     <h5 className="tg-section-subtitle mb-10 wow fadeInUp" data-wow-delay=".4s" data-wow-duration=".9s">Next Adventure Destination</h5>
                     <h2 className="tg-section-title-white mb-25 wow fadeInUp" data-wow-delay=".5s" data-wow-duration=".9s">Popular Travel Destinations <br />Available Worldwide</h2>
                  </div>
                  <div className="tp-banner-btn-wrap wow fadeInUp" data-wow-delay=".6s" data-wow-duration=".9s">
                     <Link href="/tour-details" className="tg-btn tg-btn-transparent tg-btn-switch-animation">
                        <Button text="Book Your Trip Now" />
                     </Link>
                  </div>
               </div>
            </div>
         </div>
         <div className="tg-banner-bottom">
            <div className="container-fluid">
               <div className="row">
                  <div className="col-lg-12">
                     <div className="tg-banner-2-big-title text-center wow fadeInUp" data-wow-delay=".5s" data-wow-duration=".9s">
                        <h2>Explore The World</h2>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default CtaTwo
