"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import Image, { StaticImageData } from "next/image"
import { useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import thumb_1 from "@/assets/img/tour-details/details-2/slider-big-1.jpg"
import thumb_2 from "@/assets/img/blog/sidebar/standard.jpg"
import thumb_3 from "@/assets/img/blog/sidebar/standard-2.jpg"
import thumb_4 from "@/assets/img/blog/sidebar/standard-3.jpg"
import thumb_5 from "@/assets/img/blog/sidebar/standard-4.jpg"
import thumb_6 from "@/assets/img/tour-details/details-2/slider-big-6.jpg"

import thumb_s1 from "@/assets/img/tour-details/details-2/slider-1.jpg"
import thumb_s2 from "@/assets/img/tour-details/details-2/slider-2.jpg"
import thumb_s3 from "@/assets/img/tour-details/details-2/slider-3.jpg"
import thumb_s4 from "@/assets/img/tour-details/details-2/slider-4.jpg"
import thumb_s5 from "@/assets/img/tour-details/details-2/slider-5.jpg"

const slider_b: StaticImageData[] = [thumb_1, thumb_2, thumb_3, thumb_4, thumb_5, thumb_6];
const slider_s: StaticImageData[] = [thumb_s1, thumb_s2, thumb_s3, thumb_s4, thumb_s5, thumb_s1];


const AboutSlider = () => {

   const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

   return (
      <div className="tg-tour-details-gallery-slider-wrap mb-40">
         <Swiper
            loop={true}
            navigation={{
               nextEl: '.tg-tour-details-gallery-next',
               prevEl: '.tg-tour-details-gallery-prev',
            }}
            slidesPerView={1}
            centeredSlides={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-container tg-tour-details-gallery-active mb-20"
         >

            {slider_b.map((item, i) => (
               <SwiperSlide key={i} className="swiper-slide">
                  <div className="tg-tour-details-gallery-thumb">
                     <Image className="w-100" src={item} alt="" />
                  </div>
               </SwiperSlide>
            ))}
            <div className="tg-tour-details-gallery-navigation">
               <button className="tg-tour-details-gallery-prev">
                  <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M20.0449 7.45455H1.8631M1.8631 7.45455L8.22674 1.09091M1.8631 7.45455L8.22674 13.8182" stroke="currentColor" strokeWidth="1.81818" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
               </button>
               <button className="tg-tour-details-gallery-next">
                  <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M0.955078 7.45455H19.1369M19.1369 7.45455L12.7733 1.09091M19.1369 7.45455L12.7733 13.8182" stroke="currentColor" strokeWidth="1.81818" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
               </button>
            </div>
         </Swiper>
         <div className="row justify-content-center">
            <div className="col-lg-12">
               <Swiper
                  onSwiper={setThumbsSwiper}
                  slidesPerView={5}
                  spaceBetween={20}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Thumbs]}
                  className="swiper-container tg-tour-details-gallery-thumb-active p-relative"
                  breakpoints={{
                     768: { spaceBetween: 20 },
                     576: { spaceBetween: 10 },
                     0: { spaceBetween: 10 },
                  }}
               >
                  {slider_s.map((item, i) => (
                     <SwiperSlide key={i} className="swiper-slide">
                        <div className="tg-tour-details-gallery-thumb">
                           <Image className="w-100" src={item} alt="" />
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>
            </div>
         </div>
      </div>
   )
}

export default AboutSlider
