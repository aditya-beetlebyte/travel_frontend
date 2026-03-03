import BreadCrumb from "@/components/common/BreadCrumb"
import HeaderThree from "@/layouts/headers/HeaderThree"
import TeamDetailsArea from "./TeamDetailsArea"
import FooterSix from "@/layouts/footers/FooterSix"

const TeamDetails = () => {
   return (
      <>
         <HeaderThree />
         <main>
            <BreadCrumb title="Esther Howard" sub_title="Esther Howard" />
            <TeamDetailsArea />
         </main>
         <FooterSix />
      </>
   )
}

export default TeamDetails
