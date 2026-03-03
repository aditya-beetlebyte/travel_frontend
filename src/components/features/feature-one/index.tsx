import FeatureArea from "./FeatureArea"
import BreadCrumb from "./BreadCrumb"
import HeaderSix from "@/layouts/headers/HeaderSix"
import FooterSix from "@/layouts/footers/FooterSix"

const FeatureOne = () => {
   return (
      <>
         <HeaderSix />
         <main>
            <BreadCrumb />
            <FeatureArea />
         </main>
         <FooterSix />
      </>
   )
}

export default FeatureOne
