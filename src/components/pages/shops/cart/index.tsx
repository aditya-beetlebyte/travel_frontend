import BreadCrumb from "@/components/common/BreadCrumb"
import FooterSix from "@/layouts/footers/FooterSix"
import HeaderThree from "@/layouts/headers/HeaderThree"
import CartArea from "./CartArea"

const Cart = () => {
   return (
      <>
         <HeaderThree />
         <main>
            <BreadCrumb title="Cart Page" sub_title="Cart" />
            <CartArea />
         </main>
         <FooterSix />
      </>
   )
}

export default Cart
