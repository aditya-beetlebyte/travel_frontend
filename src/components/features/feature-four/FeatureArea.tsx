/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import UseProducts from "@/hooks/UseProducts";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToWishlist } from "@/redux/features/wishlistSlice";
import FeatureTop from "./FeatureTop"
import ReactPaginate from "react-paginate";
import BookingForm from "./BookingForm"

const FeatureArea = () => {
   const dispatch = useDispatch();
   const { products, setProducts } = UseProducts();

   const itemsPerPage = 6;
   const [itemOffset, setItemOffset] = useState(0);
   const filteredProducts = products.filter((item) => item.page === "shop_4");
   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
   const currentItems = filteredProducts.slice(itemOffset, itemOffset + itemsPerPage);

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

   return (
      <div className="tg-listing-map-area fix">
         <div className="container-fluid p-0">
            <div className="row gx-0">
               <div className="col-lg-6">
                  <div className="tg-listing-map-list-wrap mb-15">
                     <div className="tg-listing-map-booking pl-40 pr-35">
                        <div className="col-12">
                           <div className="tg-booking-form-item pt-35 pb-25">
                              <BookingForm />
                           </div>
                        </div>
                     </div>
                     <div className="tg-listing-map-filter-wrap pl-40 pr-35">
                        <FeatureTop />
                        <div className="tg-listing-map-list-item">
                           <div className="row">
                              {currentItems.map((item) => (
                                 <div key={item.id} className="col-12">
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
                                       </div>
                                       <div className="tg-listing-card-content mb-15 p-relative">
                                          <div className="d-flex justify-content-between">
                                             <div className="mr-30">
                                                <h4 className="tg-listing-card-title mb-5"><Link href="/tour-details-2">{item.title}</Link></h4>
                                                <div className="destination">
                                                   <span className="tg-listing-card-duration-map d-inline-block">
                                                      <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                         <path d="M12.3329 6.7071C12.3329 11.2324 6.55512 15.1111 6.55512 15.1111C6.55512 15.1111 0.777344 11.2324 0.777344 6.7071C0.777344 5.16402 1.38607 3.68414 2.46962 2.59302C3.55316 1.5019 5.02276 0.888916 6.55512 0.888916C8.08748 0.888916 9.55708 1.5019 10.6406 2.59302C11.7242 3.68414 12.3329 5.16402 12.3329 6.7071Z" stroke="currentColor" strokeWidth="1.15556" strokeLinecap="round" strokeLinejoin="round" />
                                                         <path d="M6.55512 8.64649C7.61878 8.64649 8.48105 7.7782 8.48105 6.7071C8.48105 5.636 7.61878 4.7677 6.55512 4.7677C5.49146 4.7677 4.6292 5.636 4.6292 6.7071C4.6292 7.7782 5.49146 8.64649 6.55512 8.64649Z" stroke="currentColor" strokeWidth="1.15556" strokeLinecap="round" strokeLinejoin="round" />
                                                      </svg>
                                                      {item.location}
                                                   </span>
                                                   <span className="tg-listing-card-duration-map d-inline-block">
                                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                         <path d="M1.51089 15.2889C1.33312 15.2889 1.15534 15.2 1.06645 15.1111C0.977561 14.9333 0.888672 14.8444 0.888672 14.6667C0.888672 13.4222 1.24423 12.1778 1.86645 11.0222C2.48867 9.95555 3.46645 8.97777 4.53312 8.35555C4.08867 7.82222 3.73312 7.11111 3.55534 6.4C3.46645 5.68889 3.46645 4.88889 3.64423 4.26666C3.82201 3.55555 4.26645 2.84444 4.71089 2.31111C5.24423 1.77777 5.86645 1.33333 6.48867 1.15555C7.02201 0.977774 7.55534 0.888885 8.08867 0.888885C8.26645 0.888885 8.53312 0.888885 8.71089 0.888885C9.42201 0.977774 10.1331 1.24444 10.7553 1.68889C11.3776 2.13333 11.822 2.66666 12.1776 3.28889C12.5331 3.91111 12.7109 4.62222 12.7109 5.42222C12.7109 6.48889 12.3553 7.55555 11.6442 8.35555C12.1776 8.71111 12.7109 9.06666 13.2442 9.51111C13.9553 10.2222 14.3998 10.9333 14.8442 11.8222C15.1998 12.7111 15.3776 13.6 15.3776 14.5778C15.3776 14.7556 15.2887 14.9333 15.1998 15.0222C15.1109 15.1111 14.9331 15.2 14.7553 15.2C14.6665 15.2 14.5776 15.2 14.4887 15.1111C14.3998 15.1111 14.3109 15.0222 14.3109 14.9333C14.222 14.8444 14.222 14.8444 14.1331 14.7556C14.1331 14.6667 14.0442 14.5778 14.0442 14.4889C14.0442 13.6889 13.8664 12.9778 13.5998 12.2667C13.3331 11.5556 12.8887 10.9333 12.2664 10.4C11.7331 9.95555 11.1998 9.51111 10.5776 9.24444C9.86645 9.68889 9.06645 9.95555 8.08867 9.95555C7.19978 9.95555 6.31089 9.68889 5.59978 9.24444C4.62201 9.68889 3.73312 10.4 3.11089 11.3778C2.48867 12.3556 2.13312 13.4222 2.13312 14.5778C2.13312 14.7556 2.04423 14.9333 1.95534 15.0222C1.86645 15.2 1.68867 15.2889 1.51089 15.2889ZM8.08867 2.22222C7.46645 2.22222 6.84423 2.4 6.31089 2.75555C5.68867 3.11111 5.33312 3.64444 5.06645 4.17777C4.79978 4.8 4.71089 5.42222 4.88867 6.13333C4.97756 6.75555 5.33312 7.37777 5.77756 7.82222C6.22201 8.26666 6.84423 8.62222 7.46645 8.71111C7.64423 8.71111 7.91089 8.8 8.08867 8.8C8.53312 8.8 8.97756 8.71111 9.33312 8.53333C9.95534 8.26666 10.3998 7.91111 10.8442 7.28889C11.1998 6.75555 11.3776 6.13333 11.3776 5.51111C11.3776 4.62222 11.022 3.82222 10.3998 3.2C9.77756 2.48889 8.97756 2.22222 8.08867 2.22222Z" fill="#353844" />
                                                      </svg>
                                                      {item.guest}
                                                   </span>
                                                   <span className="tg-listing-card-duration-map d-inline-block">
                                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                         <path d="M7.99979 3.73326V7.99993L10.8442 9.42215M15.1109 8C15.1109 11.9274 11.9271 15.1111 7.99978 15.1111C4.07242 15.1111 0.888672 11.9274 0.888672 8C0.888672 4.07264 4.07242 0.888885 7.99978 0.888885C11.9271 0.888885 15.1109 4.07264 15.1109 8Z" stroke="#353844" strokeWidth="1.06667" strokeLinecap="round" strokeLinejoin="round" />
                                                      </svg>
                                                      {item.duration}
                                                   </span>
                                                </div>
                                                <div className="tg-listing-card-review mb-10">
                                                   <span className="tg-listing-rating-icon"><i className="fa-sharp fa-solid fa-star"></i></span>
                                                   <span className="tg-listing-rating-icon"><i className="fa-sharp fa-solid fa-star"></i></span>
                                                   <span className="tg-listing-rating-icon"><i className="fa-sharp fa-solid fa-star"></i></span>
                                                   <span className="tg-listing-rating-icon"><i className="fa-sharp fa-solid fa-star"></i></span>
                                                   <span className="tg-listing-rating-icon"><i className="fa-sharp fa-solid fa-star"></i></span>
                                                   <span className="tg-listing-rating-percent">({item.total_review} Reviews)</span>
                                                </div>
                                             </div>
                                             <div className="tg-listing-item-wishlist">
                                                <a onClick={() => handleAddToWishlist(item)} style={{ cursor: "pointer" }}>
                                                   <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path d="M10.5167 16.3416C10.2334 16.4416 9.76675 16.4416 9.48341 16.3416C7.06675 15.5166 1.66675 12.075 1.66675 6.24165C1.66675 3.66665 3.74175 1.58331 6.30008 1.58331C7.81675 1.58331 9.15841 2.31665 10.0001 3.44998C10.8417 2.31665 12.1917 1.58331 13.7001 1.58331C16.2584 1.58331 18.3334 3.66665 18.3334 6.24165C18.3334 12.075 12.9334 15.5166 10.5167 16.3416Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                   </svg>
                                                </a>
                                             </div>
                                          </div>
                                          <span className="tg-listing-map-list-border mb-15"></span>
                                          <p className="tg-listing-map-list-para mb-25">{item.desc}</p>
                                          <div className="tg-listing-avai d-flex align-items-center justify-content-between">
                                             <div className="tg-listing-2-price">
                                                {item.delete_price && <del>${item.delete_price}</del>}
                                                <span className="new">${item.price}</span>
                                                <span className="shift">/night</span>
                                             </div>
                                             <Link className="tg-listing-avai-btn" href="/tour-details-2">Check Availability</Link>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                              <div className="col-12">
                                 <div className="tg-pagenation-wrap text-center mt-35 mb-30">
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
               <div className="col-lg-6">
                  <div className="tg-map-full h-100">
                     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31078.361591144112!2d-74.0256365664179!3d40.705584751235754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1724572184688!5m2!1sen!2sbd" width="600" height="450" style={{ border: "0" }} loading="lazy"></iframe>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default FeatureArea
