import Button from "@/components/common/Button"
import Link from "next/link"

const Ads = () => {
   return (
      <>
         <div className="tg-ads-area tg-ads-space p-relative z-index-1">
            <div className="container">
               <div className="row">
                  <div className="col-lg-4 col-md-6 mb-30">
                     <div className="tg-ads-wrap include-bg fix" style={{ backgroundImage: `url(/assets/img/ads/destination-1.jpg)` }}>
                        <div className="row">
                           <div className="col-xl-6 col-4"></div>
                           <div className="col-xl-6 col-8">
                              <div className="tg-ads-content text-center ml-20">
                                 <div className="tg-ads-upto p-relative text-center mb-30">
                                    <h2 className="mb-0">12%</h2>
                                    <span className="saving">Savings</span>
                                    <div className="upto">up to</div>
                                 </div>
                                 <div className="tg-ads-btn">
                                    <Link href="/tour-details" className="tg-btn tg-btn-switch-animation">
                                       <Button text="See Details" />
                                    </Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-30">
                     <div className="tg-ads-wrap-2 include-bg fix" style={{ backgroundImage: `url(/assets/img/ads/destination-2.jpg)` }}>
                        <div className="tg-ads-content-2 text-center">
                           <h5 className="mb-0">Strike The Deal With<br />Used Payments</h5>
                           <div className="tg-ads-discount-inner d-flex align-items-center justify-content-center">
                              <h2 className="mb-0">5%</h2>
                              <div className="tg-ads-discount">
                                 <h3 className="mb-0">Extra</h3>
                                 <span>Discount</span>
                              </div>
                           </div>
                           <Link href="/tour-details">On Flight Tickets</Link>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-4 col-md-6 mb-30">
                     <div className="tg-ads-wrap-3 include-bg fix" style={{ backgroundImage: `url(/assets/img/ads/destination-3.jpg)` }}>
                        <div className="tg-ads-content-2">
                           <div className="tg-ads-discount-inner mb-5">
                              <h2 className="mb-0">25%</h2>
                              <div className="tg-ads-discount">
                                 <h3 className="mb-0">Extra</h3>
                                 <span>Discount</span>
                              </div>
                           </div>
                           <div className="tg-ads-btn">
                              <Link href="/tour-details" className="tg-btn tg-btn-switch-animation">
                                 <Button text="See Details" />
                              </Link>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <span className="tg-banner-transparent-bg transparent-bg-2 d-none d-lg-block"></span>
      </>
   )
}

export default Ads
