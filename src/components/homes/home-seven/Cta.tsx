import Button from "@/components/common/Button"
import Link from "next/link"

const Cta = () => {
   return (
      <div className="tg-banner-area tg-banner-5-space fix  include-bg" style={{ backgroundImage: `url(/assets/img/banner/banner-5/banner-5.jpg)` }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-7">
                  <div className="tg-banner-5-content text-center">
                     <h2 className="tg-banner-5-title mb-15 wow fadeInUp" data-wow-delay=".4s" data-wow-duration="1s">
                        <span className="p-relative">Let’s Discover
                           <svg className="svgs d-none d-lg-block" width="483" height="35" viewBox="0 0 483 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3.25 22.8999C37.75 19.3999 126.866 25.8999 161.5 25.8999C278.5 25.8999 398.5 48.3999 479.5 3.3999" stroke="white" strokeWidth="6" strokeLinecap="round" />
                           </svg>
                        </span>
                        <span>The Whole World !</span>
                     </h2>
                     <div className="tg-banner-5-btn text-center wow fadeInUp" data-wow-delay=".5s" data-wow-duration="1s">
                        <Link href="/tour-details-2" className="tg-btn tg-btn-switch-animation">
                           <Button text="Find Awesome Deals" />
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Cta
