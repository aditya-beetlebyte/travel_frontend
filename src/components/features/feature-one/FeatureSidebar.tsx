/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import shop_data from "@/data/ShopData";
import { selectProducts } from "@/redux/features/productSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating';
import PriceRange from "./PriceRange";

interface FilterCriteria {
  category: string;
  amenities: string;
  language: string;
  rating: number | null;
}

interface FeatureSidebarProps {
  setProducts: (products: any[]) => void;
}

const FeatureSidebar = ({ setProducts }: FeatureSidebarProps) => {
  
  const allProducts = useSelector(selectProducts);
  const filterdProduct = allProducts.filter(product => product.page === 'shop_1');

  const [categorySelected, setCategorySelected] = useState('');
  const [amenitiesSelected, setAmenitiesSelected] = useState('');
  const [languageSelected, setLanguageSelected] = useState('');
  const [ratingSelected, setRatingSelected] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryFilter = filterdProduct.map(product => product.category);
  const amenitiesFilter = filterdProduct.map(product => product.amenities);
  const languageFilter = filterdProduct.map(product => product.language);

  const allCategory = ['All Property Type', ...new Set(categoryFilter)];
  const allAmenities = ['All Amenities', ...new Set(amenitiesFilter)];
  const allLanguage = ['All Language', ...new Set(languageFilter)];

  // Handle category selection
  const handleCategory = (category: string) => {
    setCategorySelected(prevCategory => prevCategory === category ? '' : category);
    filterProducts({ category: category === categorySelected ? '' : category, amenities: amenitiesSelected, language: languageSelected, rating: ratingSelected });
  };

  // Handle amenities selection
  const handleAmenities = (amenities: string) => {
    setAmenitiesSelected(prevAmenities => prevAmenities === amenities ? '' : amenities);
    filterProducts({ category: categorySelected, amenities: amenities === amenitiesSelected ? '' : amenities, language: languageSelected, rating: ratingSelected });
  };

  // Handle language selection
  const handleLanguage = (language: string) => {
    setLanguageSelected(prevLanguage => prevLanguage === language ? '' : language);
    filterProducts({ category: categorySelected, amenities: amenitiesSelected, language: language === languageSelected ? '' : language, rating: ratingSelected });
  };

  // Handle rating selection
  const handleRating = (rating: number) => {
    setRatingSelected(prevRating => prevRating === rating ? null : rating);
    filterProducts({ category: categorySelected, amenities: amenitiesSelected, language: languageSelected, rating: rating === ratingSelected ? null : rating });
  };

  // Handle search
  const handleSearch = (query: string) => {
    const filtered = allProducts.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filtered);
  };


  const filterProducts = ({ category, amenities, language, rating }: FilterCriteria) => {
    let filteredProducts = allProducts;

    if (searchQuery.trim()) {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category && category !== 'All Property Type') {
      filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    if (amenities && amenities !== 'All Amenities') {
      filteredProducts = filteredProducts.filter(product => product.amenities === amenities);
    }

    if (language && language !== 'All Language') {
      filteredProducts = filteredProducts.filter(product => product.language === language);
    }

    if (rating !== null) {
      filteredProducts = filteredProducts.filter(product => product.review === rating);
    }

    setProducts(filteredProducts);
  };

  // handle Price
  const maxPrice = shop_data.reduce((max, item) => {
    return item.price > max ? item.price : max;
  }, 0);

  const [priceValue, setPriceValue] = useState([0, maxPrice]);

  useEffect(() => {
    const filterPrice = shop_data.filter((j) => j.price >= priceValue[0] && j.price <= priceValue[1]);
    setProducts(filterPrice);
  }, [priceValue, setProducts]);

  const handleChanges = (val: number[]) => {
    setPriceValue(val)
  }

  return (
    <div className="col-xl-3 col-lg-4 order-last order-lg-first">
      <div className="tg-filter-sidebar mb-40 top-sticky">
        <div className="tg-filter-item">
          <div className="d-flex justify-content-between align-items-center mb-10">
            <h4 className="tg-filter-title mb-0">Search</h4>
            <a className="tg-filter-reset" href="#">Reset All</a>
          </div>
          <div className="tg-filter-search-form">
            <form onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchQuery);
            }} className="p-relative">
              <input
                className="input"
                type="text"
                placeholder="Search Hotel"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="buttons" type="submit">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_397_1228)">
                    <path d="M13.2218 13.2222L10.5188 10.5192M12.1959 6.48705C12.1959 9.6402 9.63977 12.1963 6.48662 12.1963C3.33348 12.1963 0.777344 9.6402 0.777344 6.48705C0.777344 3.3339 3.33348 0.777771 6.48662 0.777771C9.63977 0.777771 12.1959 3.3339 12.1959 6.48705Z" stroke="#353844" strokeWidth="1.575" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                  <defs>
                    <clipPath id="clip0_397_1228">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </form>
          </div>
          <span className="tg-filter-border mt-30 mb-25"></span>

          {/* category */}
          <h4 className="tg-filter-title mb-15">Property Type</h4>
          <div className="tg-filter-list">
            <ul>
              {allCategory.map((category, i) => (
                <li key={i} onClick={() => handleCategory(category)}>
                  <div className="checkbox d-flex">
                    <input className="tg-checkbox" type="checkbox" checked={category === categorySelected} readOnly id={`cat_${i}`} />
                    <label htmlFor={`cat_${i}`} onClick={() => handleCategory(category)} className="tg-label">{category}</label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <span className="tg-filter-border mt-25 mb-25"></span>

          {/* price range */}
          <div className="tg-filter-price-input">
            <h4 className="tg-filter-title mb-20">Price By Filter</h4>
            <PriceRange
              MAX={maxPrice}
              MIN={0}
              STEP={1}
              values={priceValue}
              handleChanges={handleChanges}
            />
            <div className="d-flex align-items-center mt-15">
              <span className="input-range" onChange={() => handleChanges}>
                ${priceValue[0]} - ${priceValue[1]}
              </span>
            </div>
          </div>
          <span className="tg-filter-border mt-25 mb-25"></span>

          {/* amenitiess */}
          <h4 className="tg-filter-title mb-15">Amenities</h4>
          <div className="tg-filter-list">
            <ul>
              {allAmenities.map((amenities, i) => (
                <li key={i} onClick={() => handleAmenities(amenities)}>
                  <div className="checkbox d-flex">
                    <input className="tg-checkbox" type="checkbox" checked={amenities === amenitiesSelected} readOnly id={`amenities_${i}`} />
                    <label className="tg-label" htmlFor={`amenities_${i}`} onClick={() => handleAmenities(amenities)}>{amenities}</label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <span className="tg-filter-border mt-25 mb-25"></span>

          {/* rating */}
          <h4 className="tg-filter-title mb-15">Top Reviews</h4>
          <div className="tg-filter-list">
            <ul>
              {[5, 4, 3, 2, 1].map((rating, i) => (
                <li key={i} onClick={() => handleRating(rating)}>
                  <div className="checkbox d-flex">
                    <input className="tg-checkbox" type="checkbox" checked={rating === ratingSelected} readOnly id={`rating_${i}`} />
                    <label htmlFor={`rating_${i}`} onClick={() => handleRating(rating)}>
                      <div className="tg-filter-review">
                        <Rating initialValue={rating} size={18} readonly />
                      </div>
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <span className="tg-filter-border mt-25 mb-25"></span>

          {/* language */}
          <h4 className="tg-filter-title mb-15">Language</h4>
          <div className="tg-filter-list">
            <ul>
              {allLanguage.map((language, i) => (
                <li key={i} onClick={() => handleLanguage(language)}>
                  <div className="checkbox d-flex">
                    <input className="tg-checkbox" type="checkbox" checked={language === languageSelected} readOnly id={`language_${i}`} />
                    <label className="tg-label" htmlFor={`language_${i}`} onClick={() => handleLanguage(language)}>{language}</label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureSidebar