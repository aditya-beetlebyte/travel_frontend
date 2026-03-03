/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { selectProducts } from "@/redux/features/productSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import img_1 from "@/assets/img/shop/sm-product-1.jpg"
import img_2 from "@/assets/img/shop/sm-product-2.jpg"
import img_3 from "@/assets/img/shop/sm-product-3.jpg"
import img_4 from "@/assets/img/shop/sm-product.jpg"

interface DataType {
  id: number;
  thumb: StaticImageData;
  title: string;
  price: number;
}

const sidebar_data: DataType[] = [
  {
    id: 1,
    thumb: img_1,
    title: "Camera nstax",
    price: 20
  },
  {
    id: 2,
    thumb: img_2,
    title: "Hats Men Caps",
    price: 50
  },
  {
    id: 3,
    thumb: img_3,
    title: "Canon EOS R100",
    price: 80
  },
  {
    id: 4,
    thumb: img_4,
    title: "Halo Smartwatch",
    price: 99
  },
];

interface FilterCriteria {
  category: string;
}

interface FeatureSidebarProps {
  setProducts: (products: any[]) => void;
}

const ShopSidebar = ({ setProducts }: FeatureSidebarProps) => {

  const allProducts = useSelector(selectProducts);
  const filterdProduct = allProducts.filter(product => product.page === 'shop_5');

  const [categorySelected, setCategorySelected] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryFilter = filterdProduct.map(product => product.category);
  const allCategory = ['All Category', ...new Set(categoryFilter)];

  // Handle category selection
  const handleCategory = (category: string) => {
    setCategorySelected(prevCategory => prevCategory === category ? '' : category);
    filterProducts({ category: category === categorySelected ? '' : category });
  };

  // Handle search
  const handleSearch = (query: string) => {
    const filtered = allProducts.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filtered);
  };


  const filterProducts = ({ category }: FilterCriteria) => {
    let filteredProducts = allProducts;

    if (searchQuery.trim()) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category && category !== 'All Category') {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    setProducts(filteredProducts);
  };

  return (
    <div className="col-xl-3 col-lg-4">
      <div className="tg-shop-sidebar top-sticky mb-50">
        <div className="tg-blog-sidebar-search tg-blog-sidebar-box mb-40">
          <h5 className="tg-blog-sidebar-title mb-15">Search</h5>
          <div className="tg-blog-sidebar-form">
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchQuery);
            }} className="p-relative">
              <input
                className="input"
                type="text"
                placeholder="Type here . . ."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_497_1336)">
                    <path d="M17 17L13.5247 13.5247M15.681 8.3405C15.681 12.3945 12.3945 15.681 8.3405 15.681C4.28645 15.681 1 12.3945 1 8.3405C1 4.28645 4.28645 1 8.3405 1C12.3945 1 15.681 4.28645 15.681 8.3405Z" stroke="#560CE3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_497_1336">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div className="tg-blog-categories tg-blog-sidebar-box mb-40">
          <h5 className="tg-blog-sidebar-title mb-5">Categories</h5>
          <div className="tg-blog-categories-list">
            <ul>
              {allCategory.map((category, i) => {
                const categoryCount = category === 'All Category'
                  ? filterdProduct.length
                  : filterdProduct.filter(product => product.category === category).length;

                return (
                  <li key={i} onClick={() => handleCategory(category)}>
                    <span>{category}</span>
                    <span>({categoryCount})</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="tg-blog-post tg-blog-sidebar-box tg-shop-product-list-widget mb-40">
          <h5 className="tg-blog-sidebar-title mb-25">Best Selling Products</h5>
          {sidebar_data.map((item) => (
            <div key={item.id} className="tg-blog-post-item d-flex align-items-center mb-20">
              <div className="tg-blog-post-thumb mr-15">
                <Link href="/shop-details"><Image src={item.thumb} alt="product" /></Link>
              </div>
              <div className="tg-blog-post-content w-100">
                <h4 className="tg-blog-post-title mb-5"><Link href="/shop-details">{item.title}</Link></h4>
                <div className="ratings">
                  <span><i className="fa-sharp fa-solid fa-star"></i></span>
                  <span><i className="fa-sharp fa-solid fa-star"></i></span>
                  <span><i className="fa-sharp fa-solid fa-star"></i></span>
                  <span><i className="fa-sharp fa-solid fa-star"></i></span>
                  <span><i className="fa-sharp fa-regular fa-star"></i></span>
                </div>
                <span className="price">${item.price}.00</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopSidebar