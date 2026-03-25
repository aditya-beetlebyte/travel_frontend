"use client";
import listing_data from "@/data/ListingData";
import HeaderThree from "@/layouts/headers/HeaderThree";
import FooterSix from "@/layouts/footers/FooterSix";
import TourDetailContent from "./TourDetailContent";
import Link from "next/link";

const TourDetailById = ({ id }: { id: string }) => {
   const numId = Number(id);
   const tour = listing_data.find(
      (item) => item.id === numId && item.page === "home_1"
   );

   if (!tour) {
      return (
         <>
            <HeaderThree />
            <main>
               <div className="container pt-120 pb-120 text-center">
                  <h2>Tour Not Found</h2>
                  <p className="mt-15 mb-25">
                     The tour you are looking for does not exist or has been removed.
                  </p>
                  <Link href="/" className="tg-btn tg-btn-switch-animation">
                     Back to Home
                  </Link>
               </div>
            </main>
            <FooterSix />
         </>
      );
   }

   return (
      <>
         <HeaderThree />
         <main>
            <TourDetailContent tour={tour} />
         </main>
         <FooterSix />
      </>
   );
};

export default TourDetailById;
