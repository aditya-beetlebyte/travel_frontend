"use client";
import { useEffect, useState } from "react";
import HeaderThree from "@/layouts/headers/HeaderThree";
import FooterSix from "@/layouts/footers/FooterSix";
import TourDetailContent from "./TourDetailContent";
import Link from "next/link";
import type { TravelPackage } from "@/services/packageApi";
import { fetchPublicPackageById } from "@/services/packagePublicApi";

const TourDetailById = ({ id }: { id: string }) => {
   const [tour, setTour] = useState<TravelPackage | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      setLoading(true);
      fetchPublicPackageById(id)
         .then((data) => setTour(data))
         .catch(() => setTour(null))
         .finally(() => setLoading(false));
   }, [id]);

   if (loading) {
      return (
         <>
            <HeaderThree />
            <main>
               <div className="container pt-120 pb-120 text-center">
                  <h2>Loading Tour...</h2>
               </div>
            </main>
            <FooterSix />
         </>
      );
   }

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
