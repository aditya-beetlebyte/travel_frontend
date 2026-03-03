import BlogDetailsById from "@/components/blogs/blog-details/BlogDetailsById";
import BreadCrumb from "@/components/common/BreadCrumb";
import HeaderThree from "@/layouts/headers/HeaderThree";
import FooterFive from "@/layouts/footers/FooterFive";

export const metadata = {
  title: "Blog Details - Triptrix Voyages",
};

export default async function BlogDetailsIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <HeaderThree />
      <main>
        <BreadCrumb title="Blog Details" sub_title="Post" />
        <BlogDetailsById id={id} />
      </main>
      <FooterFive />
    </>
  );
}
