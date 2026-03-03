import BreadCrumb from "@/components/common/BreadCrumb"
import HeaderThree from "@/layouts/headers/HeaderThree"
import BlogArea from "./BlogArea"
import FooterSix from "@/layouts/footers/FooterSix"

const BlogOne = () => {
   return (
      <>
         <HeaderThree />
         <main>
            <BreadCrumb title="Blogs" sub_title="Blog" />
            <BlogArea />
         </main>
         <FooterSix />
      </>
   )
}

export default BlogOne
