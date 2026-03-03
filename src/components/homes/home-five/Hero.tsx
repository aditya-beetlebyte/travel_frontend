"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image, { StaticImageData } from "next/image"
import Link from "next/link"
import BannerFormTwo from '@/components/common/banner-form/BannerFormTwo'

import logo_1 from "@/assets/img/brand/brand-3/logo-1.png"
import logo_2 from "@/assets/img/brand/brand-3/logo-2.png"
import logo_3 from "@/assets/img/brand/brand-3/logo-3.png"
import logo_4 from "@/assets/img/brand/brand-3/logo-4.png"
import logo_5 from "@/assets/img/brand/brand-3/logo-5.png"

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

const Hero = () => {
   return (
      <div className="tg-hero-area tg-hero-3-spacing include-bg" style={{ backgroundImage: `url(/assets/img/hero/hero-3/hero.jpg)` }}>
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="tg-hero-3-content text-center mb-50">
                     <h4 className="tg-hero-3-subtitle">Explore New Places</h4>
                     <h2 className="tg-hero-3-title">Discover Your Next Adventure</h2>
                  </div>
               </div>
               <div className="col-12">
                  <div className="tg-booking-form-item tg-booking-form-3 mb-45">
                     <BannerFormTwo />
                  </div>
               </div>
               <div className="col-12">
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
      </div>
   )
}

export default Hero
