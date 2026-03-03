/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product, selectProducts } from "@/redux/features/productSlice";
import NiceSelect from "@/ui/NiceSelect";
import {useState } from "react";
import { useSelector } from "react-redux";

interface ProductTopProps {
   startOffset: number;
   endOffset: number;
   totalItems: number;
   setProducts: (products: Product[]) => void;
}

interface Option {
   value: string;
   text: string;
}

const ShopTop = ({ startOffset, endOffset, totalItems, setProducts, }: ProductTopProps) => {

   const allProducts = useSelector(selectProducts);
   const filteredAllProduct = allProducts
   const [selected, setSelected] = useState('');

   const niceSelectHandler = (item: Option) => {
      setSelected(item.value);
   
      let sortedProducts = [...filteredAllProduct];
   
      switch (item.value) {
         case 'popular':
            sortedProducts = sortedProducts
               .filter(item => item.offer)
               .sort((a, b) => {
                  const aPopular = parseFloat(a.offer || "0");
                  const bPopular = parseFloat(b.offer || "0");
                  return bPopular - aPopular;
               });
            break;
         case 'price':
            sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
            break;
         case 'rating':
            sortedProducts = sortedProducts.sort((a, b) => b.review - a.review);
            break;
         default:
            sortedProducts = filteredAllProduct;
            break;
      }
   
      setProducts(sortedProducts);
   };
   
   return (
      <div className="tg-listing-box-filter tg-shop-product-filter mb-25">
         <div className="row align-items-center">
            <div className="col-lg-5 col-md-5 mb-15">
               <div className="tg-listing-box-number-found">
                  <span> Showing {startOffset}-{endOffset} of {totalItems} Results</span>
               </div>
            </div>
            <div className="col-lg-7 col-md-7 mb-15">
               <div className="tg-listing-box-view-type d-flex justify-content-end align-items-center">
                  <div className="tg-listing-select-price ml-10">
                     <NiceSelect
                        className="select"
                        options={[
                           { value: "", text: "Default sorting" },
                           { value: "popular", text: "Sort by Best Offers" },
                           { value: "price", text: "Sort by price" },
                           { value: "rating", text: "Sort by rating" },
                        ]}
                        defaultCurrent={0}
                        onChange={niceSelectHandler}
                        name=""
                        placeholder="" />
                  </div>
                  <div className="d-none d-sm-block">
                     <div className="tg-listing-box-view ml-10 d-flex">
                        <div className="list-switch-item">
                           <button className="grid-view active">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M8 1H1V8H8V1Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                 <path d="M19 1H12V8H19V1Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                 <path d="M19 12H12V19H19V12Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                                 <path d="M8 12H1V19H8V12Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                           </button>
                        </div>
                        <div className="list-switch-item ml-5">
                           <button className="list-view grids">
                              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M6 1H19M6 7H19M6 13H19M1 1H1.01M1 7H1.01M1 13H1.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ShopTop
