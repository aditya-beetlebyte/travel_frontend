import BreadCrumb from "@/components/common/BreadCrumb"
import FooterSix from "@/layouts/footers/FooterSix"
import HeaderThree from "@/layouts/headers/HeaderThree"
import CheckoutArea from "./CheckoutArea"

const Checkout = () => {
   return (
      <>
         <HeaderThree />
         <main>
            <BreadCrumb title="Checkout Page" sub_title="Checkout Page" />
            <CheckoutArea />
         </main>
         <FooterSix />
      </>
   )
}

export default Checkout
