"use client"
import { useState } from "react";
import VideoPopup from "@/modals/VideoPopup";
import Button from "@/components/common/Button"
import Image from "next/image"
import Link from "next/link"

import shape from "@/assets/img/banner/shape.png"

const Cta = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <div className="tg-banner-area tg-banner-space">
            <div className="container">
               <div className="row gx-0">
                  <div className="col-lg-7">
                     <div className="tg-banner-video-wrap include-bg" style={{ backgroundImage: `url(/assets/img/banner/thumb.jpg)` }}>
                        <div className="tg-banner-video-inner text-center">
                           <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="tg-video-play popup-video tg-pulse-border">
                              <span className="p-relative z-index-11">
                                 <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.3616 8.34455C19.0412 9.31425 19.0412 11.7385 17.3616 12.7082L4.13504 20.3445C2.45548 21.3142 0.356021 20.1021 0.356021 18.1627L0.356022 2.89C0.356022 0.950609 2.45548 -0.261512 4.13504 0.708185L17.3616 8.34455Z" fill="currentColor" />
                                 </svg>
                              </span>
                           </a>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-5">
                     <div className="tg-banner-content p-relative z-index-1 text-center">
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
               </div>
            </div>
         </div>
         <span className="tg-banner-transparent-bg"></span>
         <VideoPopup
            isVideoOpen={isVideoOpen}
            setIsVideoOpen={setIsVideoOpen}
            videoId="eEzD-Y97ges"
         />
      </>
   )
}

export default Cta
