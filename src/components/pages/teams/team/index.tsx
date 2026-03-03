import BreadCrumb from "@/components/common/BreadCrumb"
import HeaderThree from "@/layouts/headers/HeaderThree"
import TeamArea from "./TeamArea"
import FooterSix from "@/layouts/footers/FooterSix"

const Team = () => {
   return (
      <>
         <HeaderThree />
         <main>
            <BreadCrumb title="Our Local Guyeds" sub_title="Guyeds" />
            <TeamArea />
         </main>
         <FooterSix />
      </>
   )
}

export default Team
