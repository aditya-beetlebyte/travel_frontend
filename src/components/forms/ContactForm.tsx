"use client";

import { toast } from "react-toastify";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createEnquiryPublic } from "@/services/authApi";

interface FormData {
  companyName: string;
  contactPersonName: string;
  email: string;
  phone: string;
  preferredDestination: string;
  travelDate: string;
  travellersCount: number | undefined;
  tripDuration: string;
  budgetRange: number | undefined;
  businessType: string;
  message: string;
}

const schema = yup
  .object({
    companyName: yup.string().optional().label("Company / Agency Name"),
    contactPersonName: yup.string().required().label("Contact Person Name"),
    email: yup.string().required().email().label("Email"),
    phone: yup.string().optional().label("Phone / WhatsApp"),
    preferredDestination: yup.string().optional().label("Preferred Destination"),
    travelDate: yup.string().optional().label("Tentative Travel Date / Month"),
    travellersCount: yup
      .number()
      .typeError("Number of Travellers must be a number")
      .optional()
      .label("Number of Travellers"),
    tripDuration: yup.string().optional().label("Trip Duration"),
    budgetRange: yup
      .number()
      .typeError("Budget Range must be a number")
      .optional()
      .label("Budget Range"),
    businessType: yup.string().optional().label("Business Type"),
    message: yup.string().required().label("Message"),
  })
  .required();

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    if (startDate && endDate) {
      setValue(
        "travelDate",
        `${startDate.toISOString().slice(0, 10)} to ${endDate.toISOString().slice(0, 10)}`
      );
    } else {
      setValue("travelDate", "");
    }
  }, [startDate, endDate, setValue]);

  const onSubmit = async (values: FormData) => {
    try {
      await createEnquiryPublic({
        companyName: values.companyName || undefined,
        contactPersonName: values.contactPersonName,
        email: values.email,
        phone: values.phone || undefined,
        preferredDestination: values.preferredDestination || undefined,
        travelDate: values.travelDate || undefined,
        travellersCount:
          typeof values.travellersCount === "number"
            ? String(values.travellersCount)
            : undefined,
        tripDuration: values.tripDuration || undefined,
        budgetRange:
          typeof values.budgetRange === "number" ? String(values.budgetRange) : undefined,
        businessType: values.businessType || undefined,
        message: values.message,
      });
      toast.success("Thank you! Your enquiry has been sent.", {
        position: "top-center",
      });
      reset();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to send enquiry. Please try again.",
        { position: "top-center" }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="contact-form">
      <div className="row">
        <div className="col-lg-6 mb-25">
          <input
            className="input"
            type="text"
            {...register("companyName")}
            placeholder="Company / Agency Name"
          />
          <p className="form_error">{errors.companyName?.message}</p>
        </div>
        <div className="col-lg-6 mb-25">
          <input
            className="input"
            type="text"
            {...register("contactPersonName")}
            placeholder="Contact Person Name"
          />
          <p className="form_error">{errors.contactPersonName?.message}</p>
        </div>
        <div className="col-lg-6 mb-25">
          <input
            className="input"
            type="email"
            {...register("email")}
            placeholder="Email Address"
          />
          <p className="form_error">{errors.email?.message}</p>
        </div>
        <div className="col-lg-6 mb-25">
          <input
            className="input"
            type="text"
            {...register("phone")}
            placeholder="Phone / WhatsApp Number"
          />
          <p className="form_error">{errors.phone?.message}</p>
        </div>
        <div className="col-lg-6 mb-25">
          <input
            className="input"
            type="text"
            {...register("preferredDestination")}
            placeholder="Preferred Destination"
          />
          <p className="form_error">{errors.preferredDestination?.message}</p>
        </div>
        <div className="col-lg-6 mb-25">
          <DatePicker
            className="input"
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update) => setDateRange(update as [Date | null, Date | null])}
            placeholderText="Tentative Travel Date / Month"
          />
          <input
            type="hidden"
            {...register("travelDate")}
          />
          <p className="form_error">{errors.travelDate?.message}</p>
        </div>
        <div className="col-lg-6 mb-25">
          <input
            className="input"
            type="number"
            {...register("travellersCount")}
            placeholder="Number of Travellers / Group Size"
          />
          <p className="form_error">{errors.travellersCount?.message}</p>
        </div>
        <div className="col-lg-6 mb-25">
          <input
            className="input"
            type="text"
            {...register("tripDuration")}
            placeholder="Trip Duration"
          />
          <p className="form_error">{errors.tripDuration?.message}</p>
        </div>
        <div className="col-lg-6 mb-25">
          <input
            className="input"
            type="number"
            {...register("budgetRange")}
            placeholder="Budget Range (If Applicable)"
          />
          <p className="form_error">{errors.budgetRange?.message}</p>
        </div>
        <div className="col-lg-6 mb-25">
          <select
            className="input"
            {...register("businessType")}
            defaultValue=""
          >
            <option value="" disabled>
              Business Type
            </option>
            <option value="Travel Agent">Travel Agent</option>
            <option value="Corporate Client">Corporate Client</option>
            <option value="Event">Event</option>
            <option value="MICE">MICE</option>
            <option value="Others">Others</option>
          </select>
          <p className="form_error">{errors.businessType?.message}</p>
        </div>
        <div className="col-lg-12">
          <textarea
            className="textarea mb-5"
            {...register("message")}
            placeholder="Message / Special Requirements"
          ></textarea>
          <p className="form_error">{errors.message?.message}</p>
          <button type="submit" className="tg-btn" name="message" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Send Message"}
          </button>
          <p className="ajax-response mb-0 pt-10"></p>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
