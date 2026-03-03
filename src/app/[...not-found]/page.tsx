import NotFound from "@/components/pages/error";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "404 || Triptrixvoyages - Tour & Travel Booking React Next js Template",
};
const page = () => {
   return (
      <Wrapper>
         <NotFound />
      </Wrapper>
   )
}

export default page