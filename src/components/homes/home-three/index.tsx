"use client"
import BannerFormThree from "@/components/common/banner-form/BannerFormThree"
import About from "./About"
import Banner from "./Banner"
import Blog from "./Blog"
import Choose from "./Choose"
import CtaThree from "./Cta"
import CtaTwo from "./CtaTwo"
import Location from "./Location"
import Testimonial from "./Testimonial"
import dynamic from "next/dynamic"
import HeaderThree from "@/layouts/headers/HeaderThree"
import FooterThree from "@/layouts/footers/FooterThree"
import Cta from "../home-one/Cta"
const Listing = dynamic(() => import("./Listing"), { ssr: false });

const HomeThree = () => {
   return (
      <>
         <HeaderThree />
         <main>
            <Banner />
            <BannerFormThree />
            <About />
            <Listing />
            <Choose />
            <CtaThree />
            <Location />
            <CtaTwo />
            <Testimonial />
            <Blog />
            <Cta />
         </main>
         <FooterThree />
      </>
   )
}

export default HomeThree
