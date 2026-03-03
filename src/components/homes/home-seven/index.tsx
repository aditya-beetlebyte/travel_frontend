import HeaderSeven from "@/layouts/headers/HeaderSeven"
import Banner from "./Banner"
import FoodArea from "./FoodArea"
import Cta from "./Cta"
import Counter from "./Counter"
import ChooseArea from "./ChooseArea"
import Location from "./Location"
import Testimonial from "./Testimonial"
import Brand from "./Brand"
import Blog from "../home-three/Blog"
import Listing from "./Listing"
import FooterFour from "@/layouts/footers/FooterFour"
import CtaTwo from "../home-one/Cta"

const HomeSeven = () => {
   return (
      <>
         <HeaderSeven />
         <main>
            <Banner />
            <FoodArea />
            <Listing />
            <Cta />
            <Counter />
            <ChooseArea />
            <Location />
            <Testimonial />
            <Brand />
            <Blog />
            <CtaTwo/>
         </main>
         <FooterFour />
      </>
   )
}

export default HomeSeven
