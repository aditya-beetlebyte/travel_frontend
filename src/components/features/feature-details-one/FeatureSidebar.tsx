"use client"
import NiceSelect from "@/ui/NiceSelect"

const FeatureSidebar = () => {

   const selectHandler = () => { };

   return (
      <form onSubmit={(e) => e.preventDefault()}>
         <h4 className="tg-tour-about-title title-2 mb-15">Book This Tour</h4>
         <div className="tg-booking-form-parent-inner mb-10">
            <div className="tg-tour-about-date p-relative">
               <input className="input" name="datetime-local" type="text" placeholder="When (Date)" />
               <span className="calender">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M11.1111 1V3.80003M4.88888 1V3.80003M1 6.59992H15M2.55556 2.39988H13.4444C14.3036 2.39988 15 3.02668 15 3.79989V13.6C15 14.3732 14.3036 15 13.4444 15H2.55556C1.69645 15 1 14.3732 1 13.6V3.79989C1 3.02668 1.69645 2.39988 2.55556 2.39988Z" stroke="#560CE3" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
               </span>
               <span className="angle"><i className="fa-sharp fa-solid fa-angle-down"></i></span>
            </div>
         </div>
         <div className="tg-tour-about-time d-flex align-items-center mb-10">
            <span className="time">Time:</span>
            <div className="form-check mr-15">
               <input className="form-check-input" type="radio" name="flexRadioDefault" id="time1" checked readOnly />
               <label className="form-check-label" htmlFor="time1">
                  12:00
               </label>
            </div>
            <div className="form-check">
               <input className="form-check-input" type="radio" name="flexRadioDefault" id="time2" />
               <label className="form-check-label" htmlFor="time2">
                  19:00
               </label>
            </div>
         </div>
         <div className="tg-tour-about-border-doted mb-15"></div>
         <div className="tg-tour-about-tickets-wrap mb-15">
            <span className="tg-tour-about-sidebar-title">Tickets:</span>
            <div className="tg-tour-about-tickets mb-10">
               <div className="tg-tour-about-tickets-adult">
                  <span>Adult</span>
                  <p className="mb-0">(14+ years) <span>$20</span></p>
               </div>
               <div className="tg-tour-about-tickets-quantity">
                  <NiceSelect
                     className="select  item-first"
                     options={[
                        { value: "01", text: "0" },
                        { value: "02", text: "01" },
                        { value: "03", text: "02" },
                        { value: "04", text: "03" },
                        { value: "05", text: "04" },
                        { value: "06", text: "05" },
                        { value: "07", text: "06" },
                        { value: "08", text: "07" },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className="tg-tour-about-tickets mb-10">
               <div className="tg-tour-about-tickets-adult">
                  <span>Youth </span>
                  <p className="mb-0">(13-17 years) <span>$20</span></p>
               </div>
               <div className="tg-tour-about-tickets-quantity">
                  <NiceSelect
                     className="select  item-first"
                     options={[
                        { value: "01", text: "0" },
                        { value: "02", text: "01" },
                        { value: "03", text: "02" },
                        { value: "04", text: "03" },
                        { value: "05", text: "04" },
                        { value: "06", text: "05" },
                        { value: "07", text: "06" },
                        { value: "08", text: "07" },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
            <div className="tg-tour-about-tickets mb-10">
               <div className="tg-tour-about-tickets-adult">
                  <span>Children </span>
                  <p className="mb-0">(13-17 years) <span>$15</span></p>
               </div>
               <div className="tg-tour-about-tickets-quantity">
                  <NiceSelect
                     className="select  item-first"
                     options={[
                        { value: "01", text: "0" },
                        { value: "02", text: "01" },
                        { value: "03", text: "02" },
                        { value: "04", text: "03" },
                        { value: "05", text: "04" },
                        { value: "06", text: "05" },
                        { value: "07", text: "06" },
                        { value: "08", text: "07" },
                     ]}
                     defaultCurrent={0}
                     onChange={selectHandler}
                     name=""
                     placeholder="" />
               </div>
            </div>
         </div>
         <div className="tg-tour-about-border-doted mb-15"></div>
         <div className="tg-tour-about-extra mb-10">
            <span className="tg-tour-about-sidebar-title mb-10 d-inline-block">Add Extra:</span>
            <div className="tg-filter-list">
               <ul>
                  <li>
                     <div className="checkbox d-flex">
                        <input className="tg-checkbox" type="checkbox" id="amenities" />
                        <label htmlFor="amenities" className="tg-label">Service per booking</label>
                     </div>
                     <span className="quantity">$30.00</span>
                  </li>
                  <li>
                     <div className="checkbox d-flex">
                        <input className="tg-checkbox" type="checkbox" id="amenities-2" />
                        <label htmlFor="amenities-2" className="tg-label">Service per person</label>
                     </div>
                     <span className="quantity">$20.00</span>
                  </li>
                  <li>
                     <span className="adult">Adult:</span>
                     <span className="quantity">$15.00</span>
                  </li>
                  <li>
                     <span className="adult">Youth:</span>
                     <span className="quantity">$20.00</span>
                  </li>
               </ul>
            </div>
         </div>
         <div className="tg-tour-about-border-doted mb-15"></div>
         <div className="tg-tour-about-coast d-flex align-items-center flex-wrap justify-content-between mb-20">
            <span className="tg-tour-about-sidebar-title d-inline-block">Total Cost:</span>
            <h5 className="total-price">$300.00</h5>
         </div>
         <button type="submit" className="tg-btn tg-btn-switch-animation w-100">Book now</button>
      </form>
   )
}

export default FeatureSidebar
