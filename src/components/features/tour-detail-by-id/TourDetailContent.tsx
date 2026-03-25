"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { DataType } from "@/data/ListingData";
import EnquirySidebar from "./EnquirySidebar";

const TourDetailContent = ({ tour }: { tour: DataType }) => {
   const [openDay, setOpenDay] = useState<number>(0);

   return (
      <>
         {/* Breadcrumb */}
         <div
            className="tg-breadcrumb-spacing-3 include-bg p-relative fix"
            style={{
               backgroundImage: `url(/assets/img/breadcrumb/breadcrumb-2.jpg)`,
            }}
         >
            <div className="tg-hero-top-shadow"></div>
         </div>
         <div className="tg-breadcrumb-list-2-wrap">
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <div className="tg-breadcrumb-list-2">
                        <ul>
                           <li>
                              <Link href="/">Home</Link>
                           </li>
                           <li>
                              <i className="fa-sharp fa-solid fa-angle-right"></i>
                           </li>
                           <li>
                              <Link href="/tour-grid-1">Tours</Link>
                           </li>
                           <li>
                              <i className="fa-sharp fa-solid fa-angle-right"></i>
                           </li>
                           <li>
                              <span>{tour.title}</span>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="tg-tour-about-area tg-tour-about-border pt-40 pb-70">
            <div className="container">
               <div className="row">
                  {/* Left Column */}
                  <div className="col-xl-8 col-lg-8">
                     <div className="tg-tour-about-wrap mr-30">
                        {/* Title */}
                        <h2 className="tg-tour-details-video-title mb-20">
                           {tour.title}
                        </h2>

                        {/* Tour Image */}
                        <div className="tg-tour-details-video-thumb mb-25">
                           <Image
                              className="w-100"
                              src={tour.thumb}
                              alt={tour.title}
                              style={{ borderRadius: "8px" }}
                           />
                        </div>

                        {/* Tour Meta Info */}
                        <div className="d-flex flex-wrap align-items-center gap-3 mb-20">
                           <span className="tg-listing-card-duration-map">
                              <i className="fa-regular fa-clock mr-5"></i>
                              {tour.time}
                           </span>
                           {tour.tourType && (
                              <span
                                 style={{
                                    background: "#560CE31a",
                                    color: "#560CE3",
                                    padding: "4px 12px",
                                    borderRadius: "20px",
                                    fontSize: "14px",
                                 }}
                              >
                                 {tour.tourType}
                              </span>
                           )}
                           <span
                              style={{
                                 background: "#560CE31a",
                                 color: "#560CE3",
                                 padding: "4px 12px",
                                 borderRadius: "20px",
                                 fontSize: "14px",
                              }}
                           >
                              {tour.location}
                           </span>
                        </div>

                        {/* Tour Overview */}
                        {tour.overview && (
                           <div className="tg-tour-about-inner mb-25">
                              <h4 className="tg-tour-about-title mb-15">
                                 Tour Overview
                              </h4>
                              <p className="text-capitalize lh-28">
                                 {tour.overview}
                              </p>
                           </div>
                        )}

                        {/* Tour Highlights */}
                        {tour.highlights && tour.highlights.length > 0 && (
                           <div className="tg-tour-about-inner mb-30">
                              <h4 className="tg-tour-about-title mb-15">
                                 Trip Highlights
                              </h4>
                              <div className="tg-tour-about-list">
                                 <ul>
                                    {tour.highlights.map((hl, i) => (
                                       <li key={i}>
                                          <span className="icon mr-10">
                                             <i className="fa-sharp fa-solid fa-check fa-fw"></i>
                                          </span>
                                          <span className="text">{hl}</span>
                                       </li>
                                    ))}
                                 </ul>
                              </div>
                           </div>
                        )}

                        <div className="tg-tour-about-border mb-40"></div>

                        {/* Itinerary */}
                        {tour.itinerary && tour.itinerary.length > 0 && (
                           <div className="tg-tour-faq-wrap mb-40">
                              <h4 className="tg-tour-about-title mb-20">
                                 Itinerary
                              </h4>
                              <div className="tg-tour-about-faq-inner">
                                 <div
                                    className="tg-tour-about-faq"
                                    id="itineraryAccordion"
                                 >
                                    {tour.itinerary.map((item, idx) => (
                                       <div key={idx} className="accordion-item">
                                          <h2 className="accordion-header">
                                             <button
                                                className={`accordion-button ${
                                                   openDay === idx ? "" : "collapsed"
                                                }`}
                                                onClick={() => setOpenDay(idx)}
                                                type="button"
                                             >
                                                <span>{item.day}</span> -{" "}
                                                {item.title}
                                             </button>
                                          </h2>
                                          <div
                                             className={`accordion-collapse collapse ${
                                                openDay === idx ? "show" : ""
                                             }`}
                                          >
                                             <div className="accordion-body">
                                                <p>{item.desc}</p>
                                             </div>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        )}

                        {/* Inclusions / Exclusions */}
                        {(tour.inclusions || tour.exclusions) && (
                           <div className="tg-tour-about-inner mb-40">
                              <h4 className="tg-tour-about-title mb-20">
                                 Included / Excluded
                              </h4>
                              <div className="row">
                                 {tour.inclusions && (
                                    <div className="col-lg-6">
                                       <div className="tg-tour-about-list tg-tour-about-list-2">
                                          <ul>
                                             {tour.inclusions.map((inc, i) => (
                                                <li key={i}>
                                                   <span className="icon mr-10">
                                                      <i className="fa-sharp fa-solid fa-check fa-fw"></i>
                                                   </span>
                                                   <span className="text">
                                                      {inc}
                                                   </span>
                                                </li>
                                             ))}
                                          </ul>
                                       </div>
                                    </div>
                                 )}
                                 {tour.exclusions && (
                                    <div className="col-lg-6">
                                       <div className="tg-tour-about-list tg-tour-about-list-2 disable">
                                          <ul>
                                             {tour.exclusions.map((exc, i) => (
                                                <li key={i}>
                                                   <span className="icon mr-10">
                                                      <i className="fa-sharp fa-solid fa-xmark"></i>
                                                   </span>
                                                   <span className="text">
                                                      {exc}
                                                   </span>
                                                </li>
                                             ))}
                                          </ul>
                                       </div>
                                    </div>
                                 )}
                              </div>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Right Sidebar */}
                  <div className="col-xl-4 col-lg-4">
                     <div className="tg-tour-about-sidebar top-sticky mb-50">
                        <EnquirySidebar tour={tour} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default TourDetailContent;
