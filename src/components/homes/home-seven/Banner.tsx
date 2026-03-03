"use client"
import BannerFormSeven from "@/components/common/banner-form/BannerFormSeven"

const Banner = () => {
   return (
      <div className="tg-hero-area tg-hero-5-spacing z-index-1 p-relative include-bg" style={{ backgroundImage: `url(/assets/img/hero/hero-5/bg.jpg)` }}>
         <div className="tg-hero-top-shadow"></div>
         <div className="tg-hero-5-top-shadow"></div>
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="tg-hero-3-content tg-hero-5-content text-center mb-45">
                     <h4 className="tg-hero-3-subtitle mb-15">Explore Restaurants
                        <span className="tg-hero-5-title-shape">
                           <svg width="262" height="15" viewBox="0 0 262 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 9.72727L89.3301 5L70.8656 13L123.764 5L118.774 13L178.159 5V13L261 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                           </svg>
                        </span>
                     </h4>
                     <h2 className="tg-hero-3-title">Hey! Discover Your Nearest<br />  Restaurants This City</h2>
                  </div>
               </div>
               <div className="col-12">
                  <div className="tg-booking-form-item tg-booking-5-form-item">
                     <BannerFormSeven />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Banner
