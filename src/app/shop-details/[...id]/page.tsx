import BreadCrumb from "@/components/common/BreadCrumb";
import ShopDetails from "@/components/pages/shops/shop-details";
import ShopDetailsArea from "@/components/pages/shops/shop-details/ShopDetailsArea";
import ShopDetailsTabArea from "@/components/pages/shops/shop-details/ShopDetailsTabArea";
import shop_data from "@/data/ShopData";
import FooterSix from "@/layouts/footers/FooterSix";
import HeaderThree from "@/layouts/headers/HeaderThree";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Shop Details Triptrixvoyages - Tour & Travel Booking React Next js Template",
};

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const product = shop_data.filter((items) => items.page === "shop_5");
  const single_product = product.find((item) => Number(item.id) === Number(id));

  return (
    <Wrapper>
      <HeaderThree />
      <main>
        <BreadCrumb title="Shop Details" sub_title="Bluetooth Headphone" />
        <ShopDetailsArea single_product={single_product} />
        <ShopDetailsTabArea />
      </main>
      <FooterSix />
      <ShopDetails />
    </Wrapper>
  )
}

export default page