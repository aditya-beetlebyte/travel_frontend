import HeaderThree from "@/layouts/headers/HeaderThree"
import Breadcrumb from "./Breadcrumb"
import FeatureDetailsArea from "./FeatureDetailsArea"
import FeatureAboutArea from "./FeatureAboutArea"
import FooterSix from "@/layouts/footers/FooterSix"

const FeatureDetailsOne = () => {
   return (
      <>
         <HeaderThree />
         <main>
            <Breadcrumb />
            <FeatureDetailsArea />
            <FeatureAboutArea />
         </main>
         <FooterSix />
      </>
   )
}

export default FeatureDetailsOne
