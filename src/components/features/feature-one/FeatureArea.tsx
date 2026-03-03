/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import UseProducts from "@/hooks/UseProducts";
import { Rating } from "react-simple-star-rating";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToWishlist } from "@/redux/features/wishlistSlice";
import FeatureTop from "./FeatureTop"
import FeatureSidebar from "./FeatureSidebar";
import ReactPaginate from "react-paginate";

const FeatureArea = () => {
   const dispatch = useDispatch();
   const { products, setProducts } = UseProducts();
   const [isListView, setIsListView] = useState(false);

   const itemsPerPage = 9;
   const [itemOffset, setItemOffset] = useState(0);
   const filteredProducts = products.filter((item) => item.page === "shop_1");
   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
   const currentItems = filteredProducts.slice(itemOffset, itemOffset + itemsPerPage);

   const startOffset = itemOffset + 1;
   const endOffset = Math.min(itemOffset + itemsPerPage, products.length);
   const totalItems = filteredProducts.length;

   const handlePageClick = ({ selected }: { selected: number }) => {
      const newOffset = selected * itemsPerPage;
      setItemOffset(newOffset);
   };

   const handleAddToWishlist = useCallback(
      (item: any) => {
         dispatch(addToWishlist(item));
      },
      [dispatch]
   );

   const handleListViewClick = () => {
      setIsListView(true);
   };
   const handleGridViewClick = () => {
      setIsListView(false);
   };

   return (
      <div className="tg-listing-grid-area mb-85 pt-80">
         <div className="container">
            <div className="row">
               <FeatureSidebar setProducts={setProducts} />
               <div className="col-xl-9 col-lg-8">
                  <div className="tg-listing-item-box-wrap ml-10">
                     <FeatureTop
                        startOffset={startOffset}
                        endOffset={Math.min(endOffset, totalItems)}
                        totalItems={totalItems}
                        setProducts={setProducts}
                        isListView={isListView}
                        handleListViewClick={handleListViewClick}
                        handleGridViewClick={handleGridViewClick}
                     />
                     <div className="tg-listing-grid-item">
                        <div className={`row list-card ${isListView ? 'list-card-open' : ''}`}>
                           {currentItems.map((item) => (
                              <div key={item.id} className="col-xxl-4 col-xl-6 col-lg-6 col-md-6 tg-grid-full">
                                 <div className="tg-listing-card-item tg-listing-4-card-item mb-25">
                                    <div className="tg-listing-card-thumb tg-listing-2-card-thumb mb-15 fix p-relative">
                                       <Link href="/tour-details-2">
                                          <Image className="tg-card-border w-100" src={item.thumb} alt="listing" />

                                          {item.tag && <span className="tg-listing-item-price-discount shape">{item.tag}</span>}
                                          {item.featured && <span className="tg-listing-item-price-discount shape-3">
                                             <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.60156 1L0.601562 8.2H6.00156L5.40156 13L11.4016 5.8H6.00156L6.60156 1Z" stroke="white" strokeWidth="0.857143" strokeLinecap="round" strokeLinejoin="round" />
                                             </svg>
                                             {item.featured}
                                          </span>}
                                          {item.offer && <span className="tg-listing-item-price-discount offer-btm shape-2">{item.offer}</span>}

                                       </Link>
                                       <div className="tg-listing-2-price">
                                          {item.delete_price && <del>${item.delete_price}</del>}
                                          <span className="new">${item.price}</span>
                                          <span className="shift">/night</span>
                                       </div>
                                    </div>
                                    <div className="tg-listing-card-content p-relative">
                                       <h4 className="tg-listing-card-title mb-5"><Link href="/tour-details-2">{item.title}</Link></h4>
                                       <span className="tg-listing-card-duration-map d-inline-block">
                                          <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M12.3329 6.7071C12.3329 11.2324 6.55512 15.1111 6.55512 15.1111C6.55512 15.1111 0.777344 11.2324 0.777344 6.7071C0.777344 5.16402 1.38607 3.68414 2.46962 2.59302C3.55316 1.5019 5.02276 0.888916 6.55512 0.888916C8.08748 0.888916 9.55708 1.5019 10.6406 2.59302C11.7242 3.68414 12.3329 5.16402 12.3329 6.7071Z" stroke="currentColor" strokeWidth="1.15556" strokeLinecap="round" strokeLinejoin="round" />
                                             <path d="M6.55512 8.64649C7.61878 8.64649 8.48105 7.7782 8.48105 6.7071C8.48105 5.636 7.61878 4.7677 6.55512 4.7677C5.49146 4.7677 4.6292 5.636 4.6292 6.7071C4.6292 7.7782 5.49146 8.64649 6.55512 8.64649Z" stroke="currentColor" strokeWidth="1.15556" strokeLinecap="round" strokeLinejoin="round" />
                                          </svg>
                                          {item.location}
                                       </span>
                                       <div className="tg-listing-card-review mb-10">
                                          <Rating initialValue={item.review} size={16} readonly={true} />
                                          <span className="tg-listing-rating-percent">({item.total_review} Reviews)</span>
                                       </div>
                                       <div className="tg-listing-avai d-flex align-items-center justify-content-between">
                                          <Link className="tg-listing-avai-btn" href="/tour-details-2">Check Availability</Link>
                                          <div className="tg-listing-item-wishlist">
                                             <a onClick={() => handleAddToWishlist(item)} style={{ cursor: "pointer" }}>
                                                <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                   <path d="M10.5167 16.3416C10.2334 16.4416 9.76675 16.4416 9.48341 16.3416C7.06675 15.5166 1.66675 12.075 1.66675 6.24165C1.66675 3.66665 3.74175 1.58331 6.30008 1.58331C7.81675 1.58331 9.15841 2.31665 10.0001 3.44998C10.8417 2.31665 12.1917 1.58331 13.7001 1.58331C16.2584 1.58331 18.3334 3.66665 18.3334 6.24165C18.3334 12.075 12.9334 15.5166 10.5167 16.3416Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                             </a>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                        <div className="tg-pagenation-wrap text-center mt-50 mb-30">
                           <nav>
                              <ReactPaginate
                                 breakLabel="..."
                                 nextLabel={<i className="p-btn">Next Page</i>}
                                 onPageChange={handlePageClick}
                                 pageRangeDisplayed={3}
                                 pageCount={totalPages}
                                 previousLabel={<i className="p-btn">Previous Page</i>}
                                 renderOnZeroPageCount={null}
                              />
                           </nav>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FeatureArea
