import Hero from "./Hero"
import Brand from "./Brand"
import Destination from "./Destination"
import Listing from "./Listing"
import Process from "./Process"
import Counter from "../home-two/Counter"
import Testimonial from "./Testimonial"
import Blog from "./Blog"
import HeaderFour from "@/layouts/headers/HeaderFour"
import BannerFormFour from "@/components/common/banner-form/BannerFormFour"
import Cta from "./Cta"
import FooterThree from "@/layouts/footers/FooterThree"
import CtaTwo from "../home-one/Cta"

const HomeFour = () => {
  return (
    <>
      <HeaderFour />
      <main>
        <Hero />
        <BannerFormFour />
        <Brand />
        <Destination />
        <Cta />
        <Listing />
        <Process />
        <Counter />
        <Testimonial style={false} />
        <Blog />
        <CtaTwo />
      </main>
      <FooterThree />
    </>
  )
}

export default HomeFour
