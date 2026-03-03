import BreadCrumb from "./BreadCrumb"
import TourDetailsArea from "./TourDetailsArea"
import TourAboutDetails from "./TourAboutDetails"
import HeaderSix from "@/layouts/headers/HeaderSix"
import Listing from "./Listing"
import FooterFive from "@/layouts/footers/FooterFive"

const FeatureDetailsTwo = () => {
   return (
      <>
         <HeaderSix />
         <main>
            <BreadCrumb />
            <TourDetailsArea />
            <TourAboutDetails />
            <Listing />
         </main>
         <FooterFive />
      </>
   )
}

export default FeatureDetailsTwo
