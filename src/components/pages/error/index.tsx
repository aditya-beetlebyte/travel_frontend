import HeaderThree from "@/layouts/headers/HeaderThree"
import ErrorArea from "./ErrorArea"
import FooterFive from "@/layouts/footers/FooterFive"
import BreadCrumb from "@/components/common/BreadCrumb"

const NotFound = () => {
  return (
    <>
      <HeaderThree />
      <main>
        <BreadCrumb title="404 Error Page" sub_title="404" />
        <ErrorArea />
      </main>
      <FooterFive />
    </>
  )
}

export default NotFound
