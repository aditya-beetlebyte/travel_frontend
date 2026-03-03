/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import Link from "next/link";
import UseProducts from "@/hooks/UseProducts";
import { Rating } from "react-simple-star-rating";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToWishlist } from "@/redux/features/wishlistSlice";
import ReactPaginate from "react-paginate";
import ShopSidebar from "./ShopSidebar"
import ShopTop from "./ShopTop"
import { addToCart } from "@/redux/features/cartSlice";

const ShopArea = () => {
  const dispatch = useDispatch();
  const { products, setProducts } = UseProducts();

  const itemsPerPage = 9;
  const [itemOffset, setItemOffset] = useState(0);
  const filteredProducts = products.filter((item) => item.page === "shop_5");
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

  const handleAddToCart = useCallback(
    (item: any) => {
      dispatch(addToCart(item));
    },
    [dispatch]
  );

  return (
    <div className="tg-shop-area pt-130 pb-80">
      <div className="container">
        <div className="row">
          <ShopSidebar setProducts={setProducts} />
          <div className="col-xl-9 col-lg-8">
            <div className="tg-shop-product-wrap mb-50">
              <ShopTop
                startOffset={startOffset}
                endOffset={Math.min(endOffset, totalItems)}
                totalItems={totalItems}
                setProducts={setProducts}
              />
              <div className="row">
                {currentItems.map((item) => (
                  <div key={item.id} className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                    <div className="tg-shop-product-item mb-25">
                      <div className="tg-shop-product-thumb mb-15 fix p-relative">
                        <Link href={`/shop-details/${item.id}`}><Image className="w-100" src={item.thumb} alt="product" /></Link>
                        <div className="tg-shop-product-btn">
                          <a onClick={() => handleAddToWishlist(item)} style={{ cursor: "pointer" }} className="wishlist">
                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.96 2.2377C15.5678 1.84531 15.1022 1.53404 14.5896 1.32168C14.0771 1.10931 13.5277 1 12.973 1C12.4182 1 11.8688 1.10931 11.3563 1.32168C10.8437 1.53404 10.3781 1.84531 9.98587 2.2377L9.17191 3.05166L8.35794 2.2377C7.56572 1.44548 6.49123 1.00041 5.37086 1.00041C4.25049 1.00041 3.176 1.44548 2.38378 2.2377C1.59155 3.02993 1.14648 4.10441 1.14648 5.22479C1.14648 6.34516 1.59155 7.41965 2.38378 8.21187L9.17191 15L15.96 8.21187C16.3524 7.81967 16.6637 7.354 16.8761 6.84146C17.0884 6.32893 17.1977 5.77958 17.1977 5.22479C17.1977 4.67 17.0884 4.12064 16.8761 3.60811C16.6637 3.09558 16.3524 2.6299 15.96 2.2377Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                          <div className="tg-shop-product-hidden-btn">
                            <a onClick={() => handleAddToCart(item)} style={{ cursor: "pointer" }}>
                              <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.799805 4.2L3.1998 1H12.7998L15.1998 4.2M0.799805 4.2V15.4C0.799805 15.8243 0.968376 16.2313 1.26843 16.5314C1.56849 16.8314 1.97546 17 2.3998 17H13.5998C14.0242 17 14.4311 16.8314 14.7312 16.5314C15.0312 16.2313 15.1998 15.8243 15.1998 15.4V4.2M0.799805 4.2H15.1998M11.1998 7.4C11.1998 8.24869 10.8627 9.06263 10.2625 9.66274C9.66243 10.2629 8.8485 10.6 7.9998 10.6C7.15111 10.6 6.33718 10.2629 5.73706 9.66274C5.13695 9.06263 4.7998 8.24869 4.7998 7.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </a>
                            <a href="#">
                              <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.222 1H14.1109M14.1109 1V4.88889M14.1109 1L0.888672 14.2222M14.1109 11.1111V15M14.1109 15H10.222M14.1109 15L9.44423 10.3333M0.888672 1.77778L4.77756 5.66667" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="tg-shop-product-content">
                        <h3 className="tg-shop-product-title"><Link href={`/shop-details/${item.id}`}>{item.title}</Link></h3>
                        <div className="tg-shop-product-ratings">
                          <Rating initialValue={item.review} size={16} readonly={true} />
                          <span>({item.total_review} Reviews)</span>
                        </div>
                        <span className="price">${item.price}.00</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-12">
                  <div className="tg-pagenation-wrap text-center pt-35 mb-30">
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
    </div>
  )
}

export default ShopArea
