"use client"
import { useState } from "react";
import Specification from "./Specification";
import Review from "./Review";

const tab_title: string[] = ["Product Description", "Specification", "Reviews"]

const ShopDetailsTabArea = () => {

   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: number) => {
      setActiveTab(index);
   };

   return (
      <section className="tg-product-details-tab-area pb-120">
         <div className="container">
            <div className="row">
               <div className="col-xl-12">
                  <div className="tg-product-details-tab-nav mb-25">
                     <div className="tg-product-details-tab-nav-inner nav cm-tab-menu d-flex c-relative flex-wrap" id="nav-tab-info" role="tablist">
                        {tab_title.map((tab, index) => (
                           <button key={index} onClick={() => handleTabClick(index)} className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                        ))}
                     </div>
                  </div>
                  <div className="product__details-tab-content">
                     <div className="tab-content" id="nav-tabContent-info">
                        <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="nav-desc" role="tabpanel" aria-labelledby="nav-desc-tab">
                           <div className="tg-product-details-description-content">
                              <p>Rimply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the when  unknown rinter took a galley scrambled. Rimply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard mmy text ever since the when an unknown printer took a  typesetting industry.</p>
                              <h3 className="mb-20">Key Features</h3>
                              <p>Rimply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the when  unknown rinter took a galley scrambled. Rimply
                                 dummy text of the printing and typesetting industry. Lorem IpsumRimply dummy text of the printing and typesetting industry.</p>
                              <ul>
                                 <li>Rimply dummy text of the printing and </li>
                                 <li>typesetting industry. Lorem Ipsum </li>
                                 <li>has been the industry’s standard </li>
                              </ul>
                           </div>
                        </div>
                        <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`} id="nav-additional" role="tabpanel" aria-labelledby="nav-additional-tab">
                           <Specification />
                        </div>
                        <div className={`tab-pane fade ${activeTab === 2 ? 'show active' : ''}`} id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab">
                           <Review />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default ShopDetailsTabArea
