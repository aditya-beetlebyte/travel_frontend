import BreadCrumb from "@/components/common/BreadCrumb"
import HeaderThree from "@/layouts/headers/HeaderThree"
import WishlistArea from "./WishlistArea"
import FooterSix from "@/layouts/footers/FooterSix"

const Wishlist = () => {
  return (
    <>
      <HeaderThree />
      <main>
        <BreadCrumb title="Wishlist Page" sub_title="Wishlist" />
        <WishlistArea />
      </main>
      <FooterSix />
    </>
  )
}

export default Wishlist
