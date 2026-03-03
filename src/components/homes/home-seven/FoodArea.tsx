import location_data from "@/data/LocationData";
import Image from "next/image";
import Link from "next/link";

const FoodArea = () => {
   return (
      <div className="tg-foods-area pt-135 fix pb-90">
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="tg-about-section-title text-center mb-45">
                     <h5 className="tg-section-subtitle wow fadeInUp" data-wow-delay=".4s" data-wow-duration=".6s">Explore Restaurants & Cafes</h5>
                     <h2 className="mb-15 wow fadeInUp" data-wow-delay=".5s" data-wow-duration=".7s">Search By Cuisine</h2>
                  </div>
               </div>
            </div>
            <div className="row gx-30 row-cols-xl-5 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1 justify-content-center align-items-center">
               {location_data.filter((items) => items.page === "home_7").map((item) => (
                  <div key={item.id} className="col wow fadeInUp" data-wow-delay=".3s" data-wow-duration="1s">
                     <div className="tg-foods-wrap text-center mb-30">
                        <div className="fix tg-foods-thumb mb-15">
                           <Image src={item.thumb} alt="" />
                        </div>
                        <h3 className="w-100 tg-foods-title"><Link href="#">{item.title} <span>({item.total})</span></Link></h3>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default FoodArea
