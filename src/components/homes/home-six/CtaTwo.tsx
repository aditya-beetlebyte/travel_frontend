import Image from "next/image"
import Link from "next/link"
import Button from "@/components/common/Button"

import shape from "@/assets/img/banner/banner-2/shape-2.png"

const CtaTwo = () => {
   return (
      <>
         <span className="tg-banner-transparent-bg tg-grey-bg"></span>
         <div className="tg-banner-area tg-banner-space-3 p-relative z-index-9">
            <div className="container">
               <div className="row gx-0">
                  <div className="col-lg-4">
                     <div className="tg-banner-content tg-banner-3-content banner-3 p-relative z-index-1 text-center">
                        <Image className="tg-banner-shape" src={shape} alt="shape" />
                        <h4 className="tg-banner-subtitle mb-10">Enjoy Summer Deals</h4>
                        <h2 className="tg-banner-title mb-25">Up to 40% Discount!</h2>
                        <div className="tg-banner-btn">
                           <Link href="/tour-details" className="tg-btn tg-btn-switch-animation">
                              <Button text="See Details" />
                           </Link>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-8">
                     <div className="tg-banner-3-big-content banner-3 text-center include-bg" style={{ backgroundImage: `url(/assets/img/banner/banner-2/thumb.jpg)` }}>
                        <h2>Let’s Discover</h2>
                        <span className="d-none d-sm-block">
                           <svg width="322" height="23" viewBox="0 0 322 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.5 15C25.5 12.6667 84.9106 17 108 17C186 17 266 32 320 2" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                           </svg>
                        </span>
                        <h2>The Whole World !</h2>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default CtaTwo;
