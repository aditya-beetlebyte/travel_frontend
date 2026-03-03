"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image, { StaticImageData } from "next/image"
import Link from "next/link"

import logo_1 from "@/assets/img/brand/logo-1.png"
import logo_2 from "@/assets/img/brand/logo-2.png"
import logo_3 from "@/assets/img/brand/logo-3.png"
import logo_4 from "@/assets/img/brand/logo-4.png"
import logo_5 from "@/assets/img/brand/logo-5.png"

import shape_1 from "@/assets/img/brand/shape.png"
import shape_2 from "@/assets/img/brand/shape-2.png"

const brand_logo: StaticImageData[] = [logo_1, logo_2, logo_3, logo_4, logo_5, logo_3, logo_4, logo_5];

const setting = {
   loop: true,
   freeMode: true,
   slidesPerView: 'auto' as const,
   spaceBetween: 25,
   centeredSlides: true,
   allowTouchMove: false,
   speed: 4000,
   autoplay: {
      delay: 1,
      disableOnInteraction: true,
   },
};

const Brand = () => {
   return (
      <div className="tg-brand-area tg-grey-bg pb-80 p-relative z-index-1">
         <Image className="tg-brand-shape" src={shape_1} alt="" />
         <Image className="tg-brand-shape-2" src={shape_2} alt="" />
         <div className="container">
            <div className="row">
               <div className="tg-brand-wrap">
                  <Swiper {...setting} modules={[Autoplay]} className="swiper-container tg-brand-slide fix">
                     {brand_logo.map((logo, i) => (
                        <SwiperSlide key={i} className="swiper-slide">
                           <div className="tg-brand-items">
                              <Link href="#"><Image src={logo} alt="logo" /></Link>
                           </div>
                        </SwiperSlide>
                     ))}
                  </Swiper>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Brand
