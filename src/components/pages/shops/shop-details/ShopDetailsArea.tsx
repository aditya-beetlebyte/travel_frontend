/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import img_1 from "@/assets/img/shop/details/dt-large.png"
import img_2 from "@/assets/img/shop/details/dt-large-2.png"
import img_3 from "@/assets/img/shop/details/dt-large-3.png"
import img_4 from "@/assets/img/shop/details/dt-large-4.png"

import imgs_1 from "@/assets/img/shop/details/dt-small.png"
import imgs_2 from "@/assets/img/shop/details/dt-small-2.png"
import imgs_3 from "@/assets/img/shop/details/dt-small-3.png"
import imgs_4 from "@/assets/img/shop/details/dt-small-4.png"
import { addToCart, decrease_quantity } from "@/redux/features/cartSlice";
import { addToWishlist } from "@/redux/features/wishlistSlice";

const navb_data: StaticImageData[] = [img_1, img_2, img_3, img_4];
const navs_data: StaticImageData[] = [imgs_1, imgs_2, imgs_3, imgs_4];

const ShopDetailsArea = ({ single_product }: any) => {

   const [currentImageIndex, setCurrentImageIndex] = useState(0);

   const productItem = useSelector((state: any) => state.cart.cart);
   const dispatch = useDispatch();

   const handleAddToCart = (item: any) => {
      dispatch(addToCart(item));
   };

   const handleAddToWishlist = (item: any) => {
      dispatch(addToWishlist(item));
   };

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
   };

   const totalItems = productItem.find((d_item: any) => d_item?.id === single_product?.id)

   return (
      <div className="tg-shop-details-area pt-130 pb-35">
         <div className="container">
            <div className="row">
               <div className="col-xl-5 col-lg-6">
                  <div className="tg-product-modal-thumb-wrapper mb-40">
                     <div className="tg-product-details-thumb-tab">
                        <div className="tg-product-details-thumb mb-10">
                           <div className="tab-content" id="nav-tabContents">
                              {navb_data.map((img, index) => (
                                 <div key={index} className={`tab-pane fade ${index === currentImageIndex ? 'show active' : ''}`} id={`item${index}`}>
                                    <Image src={img} alt="img" />
                                 </div>
                              ))}
                           </div>
                        </div>
                        <div className="tg-product-details-thumb-nav cm-tab mb-10">
                           <div className="nav nav-tabs d-block" id="nav-tab-two" role="tablist">
                              <div className="row gx-10">
                                 {navs_data.map((img, index) => (
                                    <div key={index} className="col-3">
                                       <button onClick={() => setCurrentImageIndex(index)}
                                          className={`nav-link ${index === currentImageIndex ? 'active' : ''}`}>
                                          <Image src={img} alt="img" />
                                       </button>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-xl-7 col-lg-6">
                  <div className="tg-product-details-wrapper ml-55 mr-115 mb-40">
                     <h3 className="tg-product-details-title mb-5">{single_product?.title ? single_product.title : "Noise Fit Halo Smartwatch"}</h3>
                     <div className="tg-product-details-rating mb-20 d-flex align-items-center">
                        <div className="tg-product-rating d-flex">
                           <span>
                              <i className="fa-sharp fa-solid fa-star"></i>
                           </span>
                           <span>
                              <i className="fa-sharp fa-solid fa-star"></i>
                           </span>
                           <span>
                              <i className="fa-sharp fa-solid fa-star"></i>
                           </span>
                           <span>
                              <i className="fa-sharp fa-solid fa-star"></i>
                           </span>
                           <span>
                              <i className="fa-sharp fa-solid fa-star"></i>
                           </span>
                        </div>
                        <div className="tg-product-details-rating-count">
                           <span>(4 review)</span>
                           <Link href="#">I   Write a Review</Link>
                        </div>
                     </div>
                     <div className="tg-product-details-price">
                        <h6 className="mb-10">$44.00</h6>
                     </div>
                     <div className="tg-product-details-availability mb-20">
                        <span className="availability">Availability:</span>
                        <span className="stock">In Stock</span>
                     </div>
                     <p className="tg-product-details-para mb-20">Nam vel lacus eu nisl bibendum accumsan vitae vitae nibh. Nam
                        nec eros id magna hendrerit sagittis. Nullam sed mi non odio
                        feugiat volutpat sit amet nec elit. Maecenas id hendrerit ipsum.</p>

                     <div className="tg-product-details-quantity mb-30">
                        <span className="quantity mb-5 d-inline-block">Quantity </span>
                        <div className="tg-booking-quantity-item">
                           <span onClick={() => single_product ? dispatch(decrease_quantity(single_product)) : ""} className="decrement">
                              <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M1 1H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                           </span>
                           <input className="tg-quantity-input" type="text" onChange={handleSubmit} value={totalItems?.quantity ? totalItems?.quantity : 1} readOnly />
                           <span onClick={() => single_product ? dispatch(addToCart(single_product)) : ""} className="increment">
                              <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M1.21924 7H13.3836" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                 <path d="M7.30176 13V1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                           </span>
                        </div>
                     </div>
                     <div className="tg-product-details-button mb-25">
                        <a onClick={() => single_product ? handleAddToCart(single_product) : ""} style={{ cursor: "pointer" }} className="tg-btn mb-10">
                           <span>
                              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M1.16699 1.66669H4.72255L7.10477 13.5689C7.18605 13.9782 7.40869 14.3458 7.7337 14.6074C8.05871 14.869 8.46539 15.008 8.88255 15H17.5225C17.9397 15.008 18.3464 14.869 18.6714 14.6074C18.9964 14.3458 19.219 13.9782 19.3003 13.5689L20.7225 6.11113H5.61144M9.16699 19.4445C9.16699 19.9354 8.76902 20.3334 8.2781 20.3334C7.78718 20.3334 7.38921 19.9354 7.38921 19.4445C7.38921 18.9535 7.78718 18.5556 8.2781 18.5556C8.76902 18.5556 9.16699 18.9535 9.16699 19.4445ZM18.9448 19.4445C18.9448 19.9354 18.5468 20.3334 18.0559 20.3334C17.565 20.3334 17.167 19.9354 17.167 19.4445C17.167 18.9535 17.565 18.5556 18.0559 18.5556C18.5468 18.5556 18.9448 18.9535 18.9448 19.4445Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                           </span>
                           Add To Cart
                        </a>
                        <a onClick={() => single_product ? handleAddToWishlist(single_product) : ""} style={{ cursor: "pointer" }} className="tg-btn tg-btn-2 mb-10">
                           <span>
                              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M17.7579 2.41452C17.3097 1.96607 16.7775 1.61034 16.1917 1.36763C15.606 1.12492 14.9781 1 14.3441 1C13.71 1 13.0822 1.12492 12.4965 1.36763C11.9107 1.61034 11.3785 1.96607 10.9303 2.41452L10 3.34476L9.06979 2.41452C8.16439 1.50912 6.93641 1.00047 5.65598 1.00047C4.37555 1.00047 3.14757 1.50912 2.24217 2.41452C1.33677 3.31992 0.828125 4.5479 0.828125 5.82833C0.828125 7.10875 1.33677 8.33674 2.24217 9.24214L10 17L17.7579 9.24214C18.2063 8.79391 18.5621 8.26171 18.8048 7.67596C19.0475 7.0902 19.1724 6.46237 19.1724 5.82833C19.1724 5.19428 19.0475 4.56645 18.8048 3.9807C18.5621 3.39494 18.2063 2.86275 17.7579 2.41452Z" stroke="#560CE3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                           </span>
                           Add To Wishlist
                        </a>
                     </div>
                     <div className="tg-product-details-share">
                        <span>Social Share:</span>
                        <Link href="#"><i className="fa-brands fa-facebook-f"></i></Link>
                        <Link href="#">
                           <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.33161 6.77486L15.1688 0H13.7856L8.71722 5.8826L4.66907 0H0L6.12155 8.89546L0 16H1.38336L6.73581 9.78785L11.0109 16H15.68L9.33148 6.77486H9.33187H9.33161ZM7.43696 8.97374L6.81669 8.088L1.88171 1.03969H4.00634L7.98902 6.72789L8.60929 7.61362L13.7863 15.0074H11.6616L7.43709 8.974V8.97361L7.43696 8.97374Z" fill="currentColor" />
                           </svg>
                        </Link>
                        <Link href="#"><i className="fa-brands fa-linkedin-in"></i></Link>
                        <Link href="#"><i className="fa-brands fa-youtube"></i></Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ShopDetailsArea
