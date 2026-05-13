import { redirect } from "next/navigation";

export const metadata = {
  title: "Feature Two Triptrixvoyages - Tour & Travel Booking React Next js Template",
};
export default function Page() {
  redirect("/packages");
}