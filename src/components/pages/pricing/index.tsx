import BreadCrumb from "@/components/common/BreadCrumb"
import HeaderThree from "@/layouts/headers/HeaderThree"
import PricingArea from "./PricingArea"
import FooterThree from "@/layouts/footers/FooterThree"
import Cta from "./Cta"

const Pricing = () => {
  return (
    <>
      <HeaderThree />
      <main>
        <BreadCrumb title="Pricing Plan" sub_title="Pricing Plan" />
        <PricingArea />
        <Cta />
      </main>
      <FooterThree />
    </>
  )
}

export default Pricing
