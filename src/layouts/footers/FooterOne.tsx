"use client"
import Image from "next/image"
import Link from "next/link"

import { CONTACT_EMAIL, CONTACT_EMAIL_MAILTO } from "@/constants/contact"
import { INSTAGRAM_URL } from "@/constants/social"
import logo from "@/assets/img/logo/logo-white.png"

const FooterOne = () => {

   return (
      <footer>
         <div className="tg-footer-area tg-footer-su-wrapper tg-footer-space include-bg" style={{ backgroundImage: `url(/assets/img/footer/footer.jpg)` }}>
            <div className="container">
               <div className="tg-footer-top mb-45">
                  <div className="row">
                     <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <div className="tg-footer-widget mb-40">
                           <div className="tg-footer-logo mb-20">
                              <Link href="/"><Image src={logo} alt="" /></Link>
                           </div>
                           <p className="mb-20">Pharetra maecenas felisey vestibulum
                              convallis mollis nullam congue sittle
                              rivers of Finland Quebec.</p>
                           <div className="tg-footer-form mb-30">
                              <form onSubmit={(e) => e.preventDefault()}>
                                 <input type="email" placeholder="Enter your mail" />
                                 <button className="tg-footer-form-btn" type="submit">
                                    <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M1.52514 8.47486H20.4749M20.4749 8.47486L13.5 1.5M20.4749 8.47486L13.5 15.4497" stroke="white" strokeWidth="1.77778" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                 </button>
                              </form>
                           </div>
                           <div className="tg-footer-social">
                              <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></Link>
                           </div>
                        </div>
                     </div>
                     <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <div className="tg-footer-widget tg-footer-link ml-80 mb-40">
                           <h3 className="tg-footer-widget-title mb-25">Quick Links</h3>
                           <ul>
                              <li><Link href="/">Home</Link></li>
                              <li><Link href="/about">About Us</Link></li>
                              <li><Link href="#">Services</Link></li>
                              <li><Link href="#">Tour Guide</Link></li>
                              <li><Link href="/contact"> Contact Us</Link></li>
                           </ul>
                        </div>
                     </div>
                     {/* <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <div className="tg-footer-widget tg-footer-link mb-40">
                           <h3 className="tg-footer-widget-title mb-25">Utility Pages</h3>
                           <ul>
                              <li><Link href="#">Style Guide</Link></li>
                              <li><Link href="#">Password Protected</Link></li>
                              <li><Link href="#">404 Error</Link></li>
                              <li><Link href="#">Changelog</Link></li>
                              <li><Link href="#">License</Link></li>
                           </ul>
                        </div>
                     </div> */}
                     <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                        <div className="tg-footer-widget tg-footer-info mb-40">
                           <h3 className="tg-footer-widget-title mb-25">Information</h3>
                           <ul>
                              <li>
                                 <Link className="d-flex" href={CONTACT_EMAIL_MAILTO}>
                                    <span className="mr-15">
                                       <i className="fa-sharp text-white fa-solid fa-envelope"></i>
                                    </span>
                                    {CONTACT_EMAIL}
                                 </Link>
                              </li>
                              <li>
                                 <Link className="d-flex" href="tel:+919310436035">
                                    <span className="mr-15">
                                       <i className="fa-sharp text-white fa-solid fa-phone"></i>
                                    </span>
                                    +91 93104 36035
                                 </Link>
                              </li>
                              {/* <li className="d-flex">
                                 <span className="mr-15">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M11.9987 5.60006V12.0001L16.2654 14.1334M22.6654 12.0002C22.6654 17.8912 17.8897 22.6668 11.9987 22.6668C6.10766 22.6668 1.33203 17.8912 1.33203 12.0002C1.33203 6.10912 6.10766 1.3335 11.9987 1.3335C17.8897 1.3335 22.6654 6.10912 22.6654 12.0002Z" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                 </span>
                                 {/* <p className="mb-0">
                                    Mon – Sat: 8 am – 5 pm,<br />
                                    Sunday: <span className="text-white d-inline-block">CLOSED</span>
                                 </p> */}
                              {/* </li> */}
                           </ul>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="tg-footer-copyright text-center">
               <span>
                  Copyright <Link href="#">©Triptrixvoyages</Link> |  All Right Reserved
               </span>
            </div>
         </div>
      </footer>
   )
}

export default FooterOne
