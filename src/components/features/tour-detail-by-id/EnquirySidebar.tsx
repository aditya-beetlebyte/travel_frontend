"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { createEnquiryPublic } from "@/services/authApi";
import type { TravelPackage } from "@/services/packageApi";

const EnquirySidebar = ({ tour }: { tour: TravelPackage }) => {
   const [saving, setSaving] = useState(false);
   const [form, setForm] = useState({
      customPackage: tour.packageName || "",
      arrivalDate: "",
      departureDate: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      adults: "",
      children: "",
      message: "",
   });

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!form.name.trim() || !form.email.trim()) {
         toast.error("Name and email are required");
         return;
      }
      setSaving(true);
      try {
         await createEnquiryPublic({
            contactPersonName: form.name.trim(),
            email: form.email.trim(),
            phone: form.phone.trim() || undefined,
            preferredDestination: form.customPackage || tour.destination || undefined,
            travelDate:
              form.arrivalDate || form.departureDate
                ? `${form.arrivalDate || "NA"} to ${form.departureDate || "NA"}`
                : undefined,
            travellersCount: `${form.adults || 0} adults, ${form.children || 0} children`,
            tripDuration:
              tour.duration?.nights != null && tour.duration?.days != null
                ? `${tour.duration.nights}N/${tour.duration.days}D`
                : undefined,
            message: [form.message.trim(), form.address.trim() ? `Address: ${form.address.trim()}` : ""]
              .filter(Boolean)
              .join("\n") || `Enquiry for ${tour.packageName}`,
            packageId: tour._id,
            packageName: tour.packageName,
         });
         toast.success("Enquiry sent successfully");
         setForm((prev) => ({
            ...prev,
            arrivalDate: "",
            departureDate: "",
            name: "",
            phone: "",
            email: "",
            address: "",
            adults: "",
            children: "",
            message: "",
         }));
      } catch (err) {
         toast.error(err instanceof Error ? err.message : "Failed to send enquiry");
      } finally {
         setSaving(false);
      }
   };

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
            <form onSubmit={handleSubmit}>
               <div className="mb-10">
                  <input
                     className="input w-100"
                     type="text"
                     placeholder="Customized Package"
                     value={form.customPackage}
                     onChange={(e) => setForm((f) => ({ ...f, customPackage: e.target.value }))}
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
                     value={form.arrivalDate}
                     onChange={(e) => setForm((f) => ({ ...f, arrivalDate: e.target.value }))}
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
                     value={form.departureDate}
                     onChange={(e) => setForm((f) => ({ ...f, departureDate: e.target.value }))}
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
                     value={form.name}
                     onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
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
                     value={form.phone}
                     onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
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
                     value={form.email}
                     onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
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
                     value={form.address}
                     onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
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
                     value={form.adults}
                     onChange={(e) => setForm((f) => ({ ...f, adults: e.target.value }))}
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
                     value={form.children}
                     onChange={(e) => setForm((f) => ({ ...f, children: e.target.value }))}
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
                     value={form.message}
                     onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
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
                     disabled={saving}
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
                  {saving ? "SENDING..." : "SEND ENQUIRY"}
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
               Call Us :{" "}
               <a href="tel:+919310436035" style={{ color: "inherit" }}>
                  +91 93104 36035
               </a>
            </p>
            <p style={{ fontSize: "14px" }}>
               Mail Us : info@vedikdestination.com
            </p>
         </div>
      </div>
   );
};

export default EnquirySidebar;
