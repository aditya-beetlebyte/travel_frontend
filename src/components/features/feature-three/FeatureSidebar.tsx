/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import shop_data from "@/data/ShopData";
import { selectProducts } from "@/redux/features/productSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating';
import PriceRange from "./PriceRange";
import DestinationForm from "./DestinationForm";

interface FilterCriteria {
  duration: string;
  amenities: string;
  language: string;
  rating: number | null;
}

interface FeatureSidebarProps {
  setProducts: (products: any[]) => void;
}

const FeatureSidebar = ({ setProducts }: FeatureSidebarProps) => {
 
  const allProducts = useSelector(selectProducts);
  const filterdProduct = allProducts.filter(product => product.page === 'shop_3');

  const [durationSelected, setDurationSelected] = useState('');
  const [amenitiesSelected, setAmenitiesSelected] = useState('');
  const [languageSelected, setLanguageSelected] = useState('');
  const [ratingSelected, setRatingSelected] = useState<number | null>(null);

  const durationFilter = filterdProduct.map(product => product.duration);
  const amenitiesFilter = filterdProduct.map(product => product.amenities);
  const languageFilter = filterdProduct.map(product => product.language);

  const allDuration = ['All Duration', ...new Set(durationFilter)];
  const allAmenities = ['All Amenities', ...new Set(amenitiesFilter)];
  const allLanguage = ['All Language', ...new Set(languageFilter)];

  // Handle duration selection
  const handleDuration = (duration: string) => {
    setDurationSelected(prevDuration => prevDuration === duration ? '' : duration);
    filterProducts({ duration: duration === durationSelected ? '' : duration, amenities: amenitiesSelected, language: languageSelected, rating: ratingSelected });
  };

  // Handle amenities selection
  const handleAmenities = (amenities: string) => {
    setAmenitiesSelected(prevAmenities => prevAmenities === amenities ? '' : amenities);
    filterProducts({ amenities: amenities === amenitiesSelected ? '' : amenities, language: languageSelected, rating: ratingSelected, duration: durationSelected });
  };

  // Handle language selection
  const handleLanguage = (language: string) => {
    setLanguageSelected(prevLanguage => prevLanguage === language ? '' : language);
    filterProducts({ amenities: amenitiesSelected, language: language === languageSelected ? '' : language, rating: ratingSelected, duration: durationSelected });
  };

  // Handle rating selection
  const handleRating = (rating: number) => {
    setRatingSelected(prevRating => prevRating === rating ? null : rating);
    filterProducts({ amenities: amenitiesSelected, language: languageSelected, rating: rating === ratingSelected ? null : rating, duration: durationSelected });
  };

  const filterProducts = ({ duration, amenities, language, rating }: FilterCriteria) => {
    let filteredProducts = allProducts;

    if (duration && duration !== 'All Duration') {
      filteredProducts = filteredProducts.filter(product => product.duration === duration);
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

          {/* destination */}
          <DestinationForm />

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

          {/* duration */}
          <h4 className="tg-filter-title mb-15">Duration</h4>
          <div className="tg-filter-list">
            <ul>
              {allDuration.map((duration, i) => (
                <li key={i} onClick={() => handleDuration(duration)}>
                  <div className="checkbox d-flex">
                    <input className="tg-checkbox" type="checkbox" checked={duration === durationSelected} readOnly id={`duration_${i}`} />
                    <label className="tg-label" htmlFor={`duration_${i}`} onClick={() => handleDuration(duration)}>{duration}</label>
                  </div>
                </li>
              ))}
            </ul>
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