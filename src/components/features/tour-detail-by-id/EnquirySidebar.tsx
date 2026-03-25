"use client";
import type { DataType } from "@/data/ListingData";

const EnquirySidebar = ({ tour }: { tour: DataType }) => {
   return (
      <div>
         {/* Enquiry Form */}
         <div
            style={{
               border: "1px solid #e5e5e5",
               borderRadius: "8px",
               padding: "25px",
               marginBottom: "25px",
            }}
         >
            <h4
               className="text-center mb-20"
               style={{ fontWeight: 700, fontSize: "18px" }}
            >
               SEND YOUR QUERY
            </h4>
            <form onSubmit={(e) => e.preventDefault()}>
               <div className="mb-10">
                  <input
                     className="input w-100"
                     type="text"
                     placeholder="Customized Package"
                     style={{
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "10px 15px",
                        width: "100%",
                     }}
                  />
               </div>
               <div className="mb-10">
                  <input
                     className="input w-100"
                     type="date"
                     placeholder="Arrival Date"
                     style={{
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "10px 15px",
                        width: "100%",
                     }}
                  />
               </div>
               <div className="mb-10">
                  <input
                     className="input w-100"
                     type="date"
                     placeholder="Departure Date"
                     style={{
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "10px 15px",
                        width: "100%",
                     }}
                  />
               </div>
               <div className="mb-10">
                  <input
                     className="input w-100"
                     type="text"
                     placeholder="Name"
                     style={{
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "10px 15px",
                        width: "100%",
                     }}
                  />
               </div>
               <div className="mb-10">
                  <input
                     className="input w-100"
                     type="tel"
                     placeholder="Phone No"
                     style={{
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "10px 15px",
                        width: "100%",
                     }}
                  />
               </div>
               <div className="mb-10">
                  <input
                     className="input w-100"
                     type="email"
                     placeholder="Email ID"
                     style={{
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "10px 15px",
                        width: "100%",
                     }}
                  />
               </div>
               <div className="mb-10">
                  <input
                     className="input w-100"
                     type="text"
                     placeholder="Address"
                     style={{
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "10px 15px",
                        width: "100%",
                     }}
                  />
               </div>
               <div className="mb-10">
                  <input
                     className="input w-100"
                     type="number"
                     placeholder="No of Adults"
                     style={{
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "10px 15px",
                        width: "100%",
                     }}
                  />
               </div>
               <div className="mb-10">
                  <input
                     className="input w-100"
                     type="number"
                     placeholder="No of Childs"
                     style={{
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "10px 15px",
                        width: "100%",
                     }}
                  />
               </div>
               <div className="mb-15">
                  <textarea
                     className="w-100"
                     placeholder="Message Here"
                     rows={4}
                     style={{
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        padding: "10px 15px",
                        width: "100%",
                        resize: "vertical",
                     }}
                  ></textarea>
               </div>
               <button
                  type="submit"
                  className="w-100"
                  style={{
                     background: "#560CE3",
                     color: "#fff",
                     border: "none",
                     borderRadius: "4px",
                     padding: "12px",
                     fontWeight: 700,
                     fontSize: "14px",
                     textTransform: "uppercase",
                     cursor: "pointer",
                     letterSpacing: "1px",
                  }}
               >
                  SEND ENQUIRY
               </button>
            </form>
         </div>

         {/* Why Choose Us */}
         <div
            style={{
               border: "1px solid #e5e5e5",
               borderRadius: "8px",
               padding: "25px",
               marginBottom: "25px",
            }}
         >
            <h6
               style={{ color: "#560CE3", fontWeight: 600, marginBottom: "5px" }}
            >
               Exceptional Travel Planner
            </h6>
            <h5 style={{ fontWeight: 700, marginBottom: "15px" }}>
               Why Choose Vedic ?
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
               <li
                  className="d-flex align-items-center mb-10"
                  style={{ gap: "10px" }}
               >
                  <span
                     style={{
                        width: "10px",
                        height: "10px",
                        background: "#560CE3",
                        borderRadius: "50%",
                        display: "inline-block",
                        flexShrink: 0,
                     }}
                  ></span>
                  24*7 Travel Support
               </li>
               <li
                  className="d-flex align-items-center mb-10"
                  style={{ gap: "10px" }}
               >
                  <span
                     style={{
                        width: "10px",
                        height: "10px",
                        background: "#560CE3",
                        borderRadius: "50%",
                        display: "inline-block",
                        flexShrink: 0,
                     }}
                  ></span>
                  Exceptional Destinations
               </li>
               <li
                  className="d-flex align-items-center mb-10"
                  style={{ gap: "10px" }}
               >
                  <span
                     style={{
                        width: "10px",
                        height: "10px",
                        background: "#560CE3",
                        borderRadius: "50%",
                        display: "inline-block",
                        flexShrink: 0,
                     }}
                  ></span>
                  Luxurious Stay
               </li>
            </ul>
         </div>

         {/* Need Booking Help */}
         <div
            className="text-center"
            style={{
               border: "1px solid #e5e5e5",
               borderRadius: "8px",
               padding: "25px",
            }}
         >
            <h5 style={{ fontWeight: 700, marginBottom: "5px" }}>
               Need Booking Help ?
            </h5>
            <div
               style={{
                  width: "40px",
                  height: "3px",
                  background: "#560CE3",
                  margin: "0 auto 15px",
               }}
            ></div>
            <p className="mb-5" style={{ fontSize: "14px" }}>
               Call Us : +91 98320 98320
            </p>
            <p style={{ fontSize: "14px" }}>
               Mail Us : info@vedikdestination.com
            </p>
         </div>
      </div>
   );
};

export default EnquirySidebar;
