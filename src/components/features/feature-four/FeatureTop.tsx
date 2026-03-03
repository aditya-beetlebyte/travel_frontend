import NiceSelect from "@/ui/NiceSelect";

const FeatureTop = () => {

   const selectHandler = () => { };

   return (
      <>
         <div className="tg-listing-map-filter pt-25 pb-15">
            <div className="item-select mb-10">
               <NiceSelect
                  className="select  item-first"
                  options={[
                     { value: "01", text: "Type" },
                     { value: "02", text: "Hotel" },
                     { value: "03", text: "Resort" },
                     { value: "04", text: "Apartments" },
                  ]}
                  defaultCurrent={0}
                  onChange={selectHandler}
                  name=""
                  placeholder="" />
            </div>
            <div className="item-select mb-10">
               <NiceSelect
                  className="select"
                  options={[
                     { value: "01", text: "Price" },
                     { value: "02", text: "Price Low" },
                     { value: "03", text: "Price High" },
                     { value: "04", text: "Default" },
                  ]}
                  defaultCurrent={0}
                  onChange={selectHandler}
                  name=""
                  placeholder="" />
            </div>
            <div className="item-select mb-10">
               <NiceSelect
                  className="select"
                  options={[
                     { value: "01", text: "Amenities" },
                     { value: "02", text: "Free Coupons" },
                     { value: "03", text: "Car Parking" },
                     { value: "04", text: "Reservations" },
                     { value: "04", text: "Restaurant" },
                  ]}
                  defaultCurrent={0}
                  onChange={selectHandler}
                  name=""
                  placeholder="" />
            </div>
            <div className="item-select mb-10">
               <NiceSelect
                  className="select"
                  options={[
                     { value: "01", text: "Ratings" },
                     { value: "02", text: "1 Star" },
                     { value: "03", text: "2 Star" },
                     { value: "04", text: "3 Star" },
                     { value: "05", text: "4 Star" },
                     { value: "06", text: "5 Star" },
                  ]}
                  defaultCurrent={0}
                  onChange={selectHandler}
                  name=""
                  placeholder="" />
            </div>
         </div>
         <div className="tg-listing-map-filter-bottom mb-5">
            <div className="row align-items-center">
               <div className="col-xl-5 mb-15">
                  <div className="tg-listing-box-number-found">
                     <span>3,269 properties in Europe</span>
                  </div>
               </div>
               <div className="col-xl-7 mb-15">
                  <div className="tg-listing-box-view-type d-flex justify-content-end align-items-center">
                     <div className="tg-listing-sort">
                        <span>Sort by:</span>
                        <a href="#">
                           <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.46918 3.27934C8.6098 3.41979 8.80043 3.49868 8.99918 3.49868C9.19793 3.49868 9.38855 3.41979 9.52918 3.27934L10.2492 2.55934V12.7493C10.2492 12.9483 10.3282 13.139 10.4688 13.2797C10.6095 13.4203 10.8003 13.4993 10.9992 13.4993C11.1981 13.4993 11.3889 13.4203 11.5295 13.2797C11.6702 13.139 11.7492 12.9483 11.7492 12.7493V2.55934L12.4692 3.27934C12.5378 3.35303 12.6206 3.41213 12.7126 3.45312C12.8046 3.49411 12.904 3.51615 13.0047 3.51793C13.1054 3.51971 13.2054 3.50118 13.2988 3.46346C13.3922 3.42574 13.477 3.3696 13.5482 3.29838C13.6194 3.22716 13.6756 3.14233 13.7133 3.04894C13.751 2.95555 13.7695 2.85552 13.7678 2.75482C13.766 2.65411 13.7439 2.5548 13.703 2.4628C13.662 2.3708 13.6029 2.288 13.5292 2.21934L11.5292 0.21934C11.3886 0.0788894 11.1979 0 10.9992 0C10.8004 0 10.6098 0.0788894 10.4692 0.21934L8.46918 2.21934C8.32873 2.35997 8.24984 2.55059 8.24984 2.74934C8.24984 2.94809 8.32873 3.13871 8.46918 3.27934ZM3.74918 12.9393L4.46918 12.2193C4.53784 12.1457 4.62064 12.0866 4.71264 12.0456C4.80464 12.0046 4.90395 11.9825 5.00465 11.9807C5.10536 11.979 5.20539 11.9975 5.29877 12.0352C5.39216 12.0729 5.477 12.1291 5.54821 12.2003C5.61943 12.2715 5.67558 12.3564 5.7133 12.4497C5.75102 12.5431 5.76955 12.6432 5.76777 12.7439C5.76599 12.8446 5.74395 12.9439 5.70296 13.0359C5.66197 13.1279 5.60286 13.2107 5.52918 13.2793L3.52918 15.2793C3.38855 15.4198 3.19793 15.4987 2.99918 15.4987C2.80043 15.4987 2.6098 15.4198 2.46918 15.2793L0.469177 13.2793C0.39549 13.2107 0.336388 13.1279 0.295396 13.0359C0.254404 12.9439 0.232362 12.8446 0.230585 12.7439C0.228809 12.6432 0.247333 12.5431 0.285054 12.4497C0.322775 12.3564 0.37892 12.2715 0.450138 12.2003C0.521357 12.1291 0.606191 12.0729 0.699579 12.0352C0.792967 11.9975 0.892997 11.979 0.993699 11.9807C1.0944 11.9825 1.19372 12.0046 1.28571 12.0456C1.37771 12.0866 1.46052 12.1457 1.52918 12.2193L2.24918 12.9393V2.74934C2.24918 2.55043 2.32819 2.35966 2.46885 2.21901C2.6095 2.07836 2.80026 1.99934 2.99918 1.99934C3.19809 1.99934 3.38885 2.07836 3.52951 2.21901C3.67016 2.35966 3.74918 2.55043 3.74918 2.74934V12.9393Z" fill="currentColor" />
                           </svg>
                        </a>
                     </div>
                     <div className="tg-listing-select-price ml-10">
                        <NiceSelect
                           className="select"
                           options={[
                              { value: "01", text: "Price Low" },
                              { value: "02", text: "Price High" },
                              { value: "03", text: "Default" },
                              { value: "04", text: "Latest" },
                              { value: "05", text: "Trending" },
                           ]}
                           defaultCurrent={0}
                           onChange={selectHandler}
                           name=""
                           placeholder="" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default FeatureTop
