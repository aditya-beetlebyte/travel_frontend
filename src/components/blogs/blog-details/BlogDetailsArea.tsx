"use client"
import Image from "next/image"
import Link from "next/link"
import Comment from "./Comment";
import BlogForm from "@/components/forms/BlogForm";
import BlogSidebar from "../blog-sidebar";

import img_1 from "@/assets/img/blog/sidebar/standard-3.jpg"
import img_2 from "@/assets/img/blog/details/video.jpg"

interface DataType {
   title_1: string;
   title_2: string;
   desc_1: string;
   desc_2: string;
   desc_3: string;
   desc_4: string;
   desc_5: string;
   list: string[];
}

const blog_content: DataType = {
   title_1: "Exploring The Green Spaces Of Realar Residence Area Harmony with Nature",
   title_2: "Tips For Building Future",
   desc_1: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we are explore the green innovations seamlessly integrated into the fabric.when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
   desc_2: "“ urabitur varius erros area rutrum consequat Mauris sollici area tudino electronic typesetting, remaining essentially dimentum luctus enim”",
   desc_3: "nown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also electronic typesetting remaining essentially unchanged. It was popularised in the with the release of Letraset sheets containingn an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centurie.",
   desc_4: "Seorem Ipsum is simply dummy t the printing and typese tting industry. Lorem Ipsum has been industr.",
   desc_5: "Seorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been industry tandard when an unknown printer took a galley.",
   list: ["Etiam porta sem malesuada euismod.", "porta sem area Product", "Service tiam porta sem malesuada"],
}

const { title_1, title_2, desc_1, desc_2, desc_3, desc_4, desc_5, list } = blog_content;

const BlogDetailsArea = () => {
   return (
      <div className="tg-blog-grid-area pt-130 pb-80">
         <div className="container">
            <div className="row">
               <div className="col-xl-9 col-lg-8">
                  <div className="tg-blog-details-wrap tg-blog-lg-spacing mr-50 mb-50">
                     <div className="tg-blog-standard-item mb-35">
                        <div className="tg-blog-standard-thumb mb-15 d-flex justify-content-center">
                           <Image
                              className="w-100"
                              src={img_1}
                              alt="blog"
                              style={{
                                 width: "100%",
                                 maxWidth: "900px",
                                 height: "auto",
                                 maxHeight: "420px",
                                 objectFit: "contain",
                              }}
                           />
                        </div>
                        <div className="tg-blog-standard-content">
                           <div className="tg-blog-standard-date mb-10">
                              <span>
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.51089 15.2889C1.33312 15.2889 1.15534 15.2 1.06645 15.1111C0.977561 14.9334 0.888672 14.8445 0.888672 14.6667C0.888672 13.4222 1.24423 12.1778 1.86645 11.0222C2.48867 9.95558 3.46645 8.9778 4.53312 8.35558C4.08867 7.82225 3.73312 7.11114 3.55534 6.40003C3.46645 5.68892 3.46645 4.88892 3.64423 4.26669C3.82201 3.55558 4.26645 2.84447 4.71089 2.31114C5.24423 1.7778 5.86645 1.33336 6.48867 1.15558C7.02201 0.977805 7.55534 0.888916 8.08867 0.888916C8.26645 0.888916 8.53312 0.888916 8.71089 0.888916C9.42201 0.977805 10.1331 1.24447 10.7553 1.68892C11.3776 2.13336 11.822 2.66669 12.1776 3.28892C12.5331 3.91114 12.7109 4.62225 12.7109 5.42225C12.7109 6.48892 12.3553 7.55558 11.6442 8.35558C12.1776 8.71114 12.7109 9.06669 13.2442 9.51114C13.9553 10.2222 14.3998 10.9334 14.8442 11.8222C15.1998 12.7111 15.3776 13.6 15.3776 14.5778C15.3776 14.7556 15.2887 14.9334 15.1998 15.0222C15.1109 15.1111 14.9331 15.2 14.7553 15.2C14.6665 15.2 14.5776 15.2 14.4887 15.1111C14.3998 15.1111 14.3109 15.0222 14.3109 14.9334C14.222 14.8445 14.222 14.8445 14.1331 14.7556C14.1331 14.6667 14.0442 14.5778 14.0442 14.4889C14.0442 13.6889 13.8664 12.9778 13.5998 12.2667C13.3331 11.5556 12.8887 10.9334 12.2664 10.4C11.7331 9.95558 11.1998 9.51114 10.5776 9.24447C9.86645 9.68892 9.06645 9.95558 8.08867 9.95558C7.19978 9.95558 6.31089 9.68892 5.59978 9.24447C4.62201 9.68892 3.73312 10.4 3.11089 11.3778C2.48867 12.3556 2.13312 13.4222 2.13312 14.5778C2.13312 14.7556 2.04423 14.9334 1.95534 15.0222C1.86645 15.2 1.68867 15.2889 1.51089 15.2889ZM8.08867 2.22225C7.46645 2.22225 6.84423 2.40003 6.31089 2.75558C5.68867 3.11114 5.33312 3.64447 5.06645 4.1778C4.79978 4.80003 4.71089 5.42225 4.88867 6.13336C4.97756 6.75558 5.33312 7.37781 5.77756 7.82225C6.22201 8.26669 6.84423 8.62225 7.46645 8.71114C7.64423 8.71114 7.91089 8.80003 8.08867 8.80003C8.53312 8.80003 8.97756 8.71114 9.33312 8.53336C9.95534 8.26669 10.3998 7.91114 10.8442 7.28892C11.1998 6.75558 11.3776 6.13336 11.3776 5.51114C11.3776 4.62225 11.022 3.82225 10.3998 3.20003C9.77756 2.48892 8.97756 2.22225 8.08867 2.22225Z" fill="#560CE3" />
                                 </svg>
                                 by Admin
                              </span>
                              <span>
                                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.76501 0.777771V3.26668M4.23413 0.777771V3.26668M0.777344 5.75548H13.2218M2.16006 2.02211H11.8391C12.6027 2.02211 13.2218 2.57927 13.2218 3.26656V11.9778C13.2218 12.6651 12.6027 13.2222 11.8391 13.2222H2.16006C1.39641 13.2222 0.777344 12.6651 0.777344 11.9778V3.26656C0.777344 2.57927 1.39641 2.02211 2.16006 2.02211Z" stroke="#560CE3" strokeWidth="0.977778" strokeLinecap="round" strokeLinejoin="round" />
                                 </svg>
                                 26th Sep, 2024
                              </span>
                              <span>
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.99979 3.73329V7.99996L10.8442 9.42218M15.1109 8.00003C15.1109 11.9274 11.9271 15.1111 7.99978 15.1111C4.07242 15.1111 0.888672 11.9274 0.888672 8.00003C0.888672 4.07267 4.07242 0.888916 7.99978 0.888916C11.9271 0.888916 15.1109 4.07267 15.1109 8.00003Z" stroke="#560CE3" strokeWidth="1.06667" strokeLinecap="round" strokeLinejoin="round" />
                                 </svg>
                                 5 mins Read
                              </span>
                           </div>
                           <h2 className="tg-blog-standard-title">{title_1}</h2>
                           <p>{desc_1}</p>
                        </div>
                     </div>
                     <blockquote className="tg-blog-blockquote p-relative mb-25">
                        <p>{desc_2}</p>
                        <span className="tg-blog-blockquote-icon">
                           <svg width="38" height="32" viewBox="0 0 38 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M34.7762 27.416C32.1113 30.458 28.0789 32 22.7928 32L20.8934 32L20.8934 26.362L22.4206 26.04C25.0227 25.492 26.8329 24.414 27.8016 22.832C28.307 21.9797 28.5937 21.0039 28.6335 20L22.7928 20C22.2891 20 21.806 19.7893 21.4498 19.4142C21.0935 19.0391 20.8934 18.5304 20.8934 18L20.8934 4C20.8934 1.794 22.5972 2.39128e-06 24.6922 2.58489e-06L36.0887 3.63806e-06C36.5924 3.68462e-06 37.0755 0.210716 37.4317 0.585789C37.7879 0.960861 37.9881 1.46957 37.9881 2L37.9881 12L37.9824 17.838C37.9995 18.06 38.3603 23.32 34.7762 27.416ZM3.7988 6.54059e-07L15.1952 1.70724e-06C15.699 1.75379e-06 16.1821 0.210714 16.5383 0.585787C16.8945 0.960859 17.0946 1.46957 17.0946 2L17.0946 12L17.0889 17.838C17.106 18.06 17.4669 23.32 13.8827 27.416C11.2179 30.458 7.18544 32 1.8994 32L-3.8147e-06 32L-3.34842e-06 26.362L1.52712 26.04C4.1293 25.492 5.93943 24.414 6.90812 22.832C7.41357 21.9797 7.70024 21.0039 7.74007 20L1.8994 20C1.39565 20 0.912526 19.7893 0.556317 19.4142C0.200112 19.0391 -2.70074e-06 18.5304 -2.65687e-06 18L-1.49904e-06 4C-1.3166e-06 1.794 1.70376 4.6045e-07 3.7988 6.54059e-07Z" fill="#560CE3" />
                           </svg>
                        </span>
                     </blockquote>
                     <p className="tg-blog-para lh-28 mb-40">{desc_3}</p>
                     <div className="tg-blog-video-list mb-25">
                        <div className="row">
                           <div className="col-xl-5 col-lg-12 col-md-5">
                              <div className="tg-blog-details-video p-relative mb-30">
                                 <Image className="w-100" src={img_2} alt="video" />
                                 <div className="tg-tour-details-video-inner text-center">
                                    <Link className="tg-video-play popup-video tg-pulse-border" href="https://www.youtube.com/watch?v=sY2bdbsy3rg">
                                       <span className="p-relative z-index-11">
                                          <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                             <path d="M17.3616 8.34455C19.0412 9.31425 19.0412 11.7385 17.3616 12.7082L4.13504 20.3445C2.45548 21.3142 0.356021 20.1021 0.356021 18.1627L0.356022 2.89C0.356022 0.950609 2.45548 -0.261512 4.13504 0.708185L17.3616 8.34455Z" fill="currentColor" />
                                          </svg>
                                       </span>
                                    </Link>
                                 </div>
                              </div>
                           </div>
                           <div className="col-xl-7 col-lg-12 col-md-7">
                              <div className="tg-blog-details-video-content ml-15 mb-30">
                                 <h3>{title_2}</h3>
                                 <p className="tg-blog-para lh-28 mb-20">{desc_4}</p>
                                 <div className="tg-blog-details-video-list">
                                    <ul>
                                       {list.map((list, i) => (
                                          <li key={i}>
                                             <span><i className="fa-sharp fa-solid fa-check"></i></span>
                                             <p>{list}</p>
                                          </li>
                                       ))}
                                    </ul>
                                 </div>
                                 <p className="tg-blog-para lh-28">{desc_5}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="tg-blog-details-tag mb-40 d-flex flex-wrap justify-content-between align-items-center">
                        <div className="tg-blog-sidebar-tag-list d-flex flex-wrap align-items-center">
                           <h5 className="tg-blog-sidebar-title mr-10">Tags:</h5>
                           <ul>
                              <li><Link href="#">Bath Cleaning</Link></li>
                              <li><Link href="#">Cleaning</Link></li>
                           </ul>
                        </div>
                        <div className="tg-blog-details-social mb-10">
                           <span>Share:</span>
                           <Link href="#"><i className="fa-brands fa-facebook-f"></i></Link>
                           <Link href="#"><i className="fa-brands fa-twitter"></i></Link>
                           <Link href="#"><i className="fa-brands fa-instagram"></i></Link>
                           <Link href="#"><i className="fa-brands fa-pinterest-p"></i></Link>
                           <Link href="#"><i className="fa-brands fa-youtube"></i></Link>
                        </div>
                     </div>
                     <Comment />
                     <div className="tg-tour-about-review-form tg-blog-details-review-form">
                        <h4 className="tg-tour-about-title mb-10">Post a comment</h4>
                        <p>Your email address will not be published. Required fields are marked *</p>
                        <BlogForm />
                     </div>
                  </div>
               </div>
               <div className="col-xl-3 col-lg-4">
                  <BlogSidebar />
               </div>
            </div>
         </div>
      </div>
   )
}

export default BlogDetailsArea
