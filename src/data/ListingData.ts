import { StaticImageData } from "next/image";

import listing_img1 from "@/assets/img/listing/su/listing-1.jpg"
import listing_img2 from "@/assets/img/listing/su/listing-2.jpg"
import listing_img3 from "@/assets/img/listing/su/listing-3.jpg"
import listing_img4 from "@/assets/img/listing/su/listing-4.jpg"
import listing_img5 from "@/assets/img/listing/su/listing-5.jpg"
import listing_img6 from "@/assets/img/listing/su/listing-6.jpg"

import listing3_img1 from "@/assets/img/listing/listing-1.jpg"
import listing3_img2 from "@/assets/img/listing/listing-2.jpg"
import listing3_img3 from "@/assets/img/listing/listing-3.jpg"
import listing3_img4 from "@/assets/img/listing/listing-4.jpg"
import listing3_img5 from "@/assets/img/listing/listing-5.jpg"
import listing3_img6 from "@/assets/img/listing/listing-6.jpg"
import listing3_img7 from "@/assets/img/listing/listing-8.jpg"
import listing3_img8 from "@/assets/img/listing/listing-4.jpg"

import listing5_img1 from "@/assets/img/listing/listing-3/list.jpg"
import listing5_img2 from "@/assets/img/listing/listing-3/list-2.jpg"
import listing5_img3 from "@/assets/img/listing/listing-3/list-3.jpg"
import listing5_img4 from "@/assets/img/listing/listing-3/list-4.jpg"
import listing5_img5 from "@/assets/img/listing/listing-3/list-5.jpg"
import listing5_img6 from "@/assets/img/listing/listing-3/list-6.jpg"
import listing5_img7 from "@/assets/img/listing/listing-3/list-7.jpg"
import listing5_img8 from "@/assets/img/listing/listing-3/list-8.jpg"

import listing7_img1 from "@/assets/img/listing/listing-5/listing-1.jpg"
import listing7_img2 from "@/assets/img/listing/listing-5/listing-2.jpg"
import listing7_img3 from "@/assets/img/listing/listing-5/listing-3.jpg"
import listing7_img4 from "@/assets/img/listing/listing-5/listing-4.jpg"

interface DataType {
   id: number;
   page: string;
   thumb: StaticImageData;
   tag?: string;
   featured?: string;
   time: string;
   guest?: string;
   title: string;
   location: string;
   delete_price?: number;
   price: number;
   review: number;
   total_review?: string;
   country?: string;
   recommended?: string;
   category?: string;
}

const listing_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      thumb: listing_img1,
      tag: "Featured",
      time: "7 Days",
      guest: "12 Guests",
      title: "Two Hour Walking Tour great of Manhattan jeihcen",
      location: "New York City, USA",
      price: 320,
      review: 4.5,
      total_review: "(02 Reviews)"
   },
   {
      id: 2,
      page: "home_1",
      thumb: listing_img2,
      time: "7 Days",
      guest: "12 Guests",
      title: "When you visit the Eternal Dubai City",
      location: "New York City, USA",
      price: 220,
      review: 4.5,
      total_review: "(02 Reviews)"
   },
   {
      id: 3,
      page: "home_1",
      thumb: listing_img3,
      tag: "Featured",
      time: "7 Days",
      guest: "12 Guests",
      title: "Vatican Museums, Sistine Chapel Skip the Line",
      location: "New York City, USA",
      price: 420,
      review: 4.5,
      total_review: "(02 Reviews)"
   },
   {
      id: 4,
      page: "home_1",
      thumb: listing_img4,
      time: "7 Days",
      guest: "12 Guests",
      title: "Vatican Museums, Sistine Chapel Skip the Line",
      location: "New York City, USA",
      price: 320,
      review: 4.5,
      total_review: "(02 Reviews)"
   },
   {
      id: 5,
      page: "home_1",
      thumb: listing_img5,
      tag: "Featured",
      time: "7 Days",
      guest: "12 Guests",
      title: "Day Oahu Tour Honolulu Pearl Harbor, & Diamond",
      location: "New York City, USA",
      price: 120,
      review: 4.5,
      total_review: "(02 Reviews)"
   },
   {
      id: 6,
      page: "home_1",
      thumb: listing_img6,
      tag: "Featured",
      time: "7 Days",
      guest: "12 Guests",
      title: "Vatican Museums, Sistine Chapel Skip the Line",
      location: "New York City, USA",
      price: 220,
      review: 4.5,
      total_review: "(02 Reviews)"
   },

   // home_3
   {
      id: 1,
      page: "home_3",
      thumb: listing3_img1,
      tag: "New",
      time: "7 Days",
      title: "Two Hour Walking Tour of Manhattan",
      location: "Veins City, italy",
      price: 320,
      review: 5,
      category: "cat-three cat-one",
   },
   {
      id: 2,
      page: "home_3",
      thumb: listing3_img2,
      tag: "% Offer",
      time: "2 Days",
      title: "When you visit the Eternal Dubai City",
      location: "Dubai, Emirates",
      delete_price: 299,
      price: 149,
      review: 5,
      category: "cat-two cat-one cat-five",
   },
   {
      id: 3,
      page: "home_3",
      thumb: listing3_img3,
      tag: "New",
      time: "5 Days",
      title: "The Pulau Seribu, Jakarta Indonesia",
      location: "51 Dekor Land, Thailand",
      price: 349,
      review: 5,
      category: "cat-four  cat-two",
   },
   {
      id: 4,
      page: "home_3",
      thumb: listing3_img4,
      tag: "% Offer",
      featured: "Featured",
      time: "3 Days",
      title: "American Parks Trail end Rapid City Express",
      location: "New York, USA",
      delete_price: 280,
      price: 255,
      review: 4,
      category: "cat-four cat-three",
   },
   {
      id: 5,
      page: "home_3",
      thumb: listing3_img5,
      time: "3 Days",
      title: "southwestern Switzerland Akam City",
      location: "Switzerland city",
      delete_price: 280,
      price: 255,
      review: 4,
      category: "cat-one cat-five",
   },
   {
      id: 6,
      page: "home_3",
      thumb: listing3_img6,
      featured: "Featured",
      time: "5 Days",
      title: "Modern Stefano La Piazze Wergeland",
      location: "East Norway",
      delete_price: 280,
      price: 255,
      review: 4,
      category: "cat-four",
   },
   {
      id: 7,
      page: "home_3",
      thumb: listing3_img7,
      time: "7 Days",
      title: "Vatican Museums, Sistine Chapel Skip the Line",
      location: "Rome City",
      delete_price: 280,
      price: 142,
      review: 5,
      category: "cat-three cat-one cat-five",
   },
   {
      id: 8,
      page: "home_3",
      thumb: listing3_img8,
      time: "4 Days",
      title: "win cities on opposite sides of the",
      location: "Sydney, Australia",
      delete_price: 240,
      price: 110,
      review: 5,
      category: "cat-three cat-four",
   },

   // home_5

   {
      id: 1,
      page: "home_5",
      thumb: listing5_img1,
      tag: "Offer",
      time: "7 Days",
      title: "Two Hour Walking Tour of Manhattan",
      location: "51 Dekor Land, Thailand",
      delete_price: 299,
      price: 330,
      review: 5,
   },
   {
      id: 2,
      page: "home_5",
      thumb: listing5_img2,
      tag: "Offer",
      time: "7 Days",
      title: "Vatican Museums, Sistine Chapel Skip the Line",
      location: "51 Dekor Land, Thailand",
      delete_price: 299,
      price: 330,
      review: 5,
   },
   {
      id: 3,
      page: "home_5",
      thumb: listing5_img3,
      time: "7 Days",
      title: "southwestern Switzerland Akam City",
      location: "51 Dekor Land, Thailand",
      delete_price: 299,
      price: 330,
      review: 5,
   },
   {
      id: 4,
      page: "home_5",
      thumb: listing5_img4,
      tag: "Offer",
      time: "7 Days",
      title: "Modern Stefano La Piazze Wergeland",
      location: "51 Dekor Land, Thailand",
      delete_price: 299,
      price: 330,
      review: 5,
   },
   {
      id: 5,
      page: "home_5",
      thumb: listing5_img5,
      time: "7 Days",
      title: "southwestern Switzerland Akam City",
      location: "51 Dekor Land, Thailand",
      delete_price: 299,
      price: 330,
      review: 5,
   },
   {
      id: 6,
      page: "home_5",
      thumb: listing5_img6,
      tag: "Offer",
      time: "7 Days",
      title: "When you visit the Eternal Dubai City",
      location: "51 Dekor Land, Thailand",
      delete_price: 299,
      price: 330,
      review: 5,
   },
   {
      id: 7,
      page: "home_5",
      thumb: listing5_img7,
      time: "7 Days",
      title: "win cities on opposite sides of the",
      location: "51 Dekor Land, Thailand",
      delete_price: 299,
      price: 330,
      review: 5,
   },
   {
      id: 8,
      page: "home_5",
      thumb: listing5_img8,
      tag: "Offer",
      time: "7 Days",
      title: "Two Hour Walking Tour of Manhattan",
      location: "51 Dekor Land, Thailand",
      delete_price: 299,
      price: 330,
      review: 5,
   },

   // home_7
   {
      id: 1,
      page: "home_7",
      thumb: listing7_img1,
      tag: "Open",
      featured: "Featured",
      recommended: "Recommended",
      country: "Americano",
      time: "7 Days",
      title: "Italiano Torero Restaurant & Bar menu",
      location: "51 Dekor Land, Thailand",
      price: 11,
      review: 5,
   },
   {
      id: 2,
      page: "home_7",
      thumb: listing7_img2,
      tag: "Close",
      country: "Italian",
      time: "7 Days",
      title: "The Most Cool Cafe in Houston Lane",
      location: "Rome City, Italy",
      price: 15,
      review: 5,
   },
   {
      id: 3,
      page: "home_7",
      thumb: listing7_img3,
      tag: "Open",
      recommended: "Recommended",
      country: "Japanese",
      time: "7 Days",
      title: "Northend Leoat Japanese Cuisine",
      location: "Switzerland city",
      price: 17,
      review: 5,
   },
   {
      id: 4,
      page: "home_7",
      thumb: listing7_img4,
      tag: "Open",
      country: "Mexican",
      time: "7 Days",
      title: "Chapghor Modern Food & Restaurant",
      location: "Sydney, Australia",
      price: 11,
      review: 5,
   },
   {
      id: 5,
      page: "home_7",
      thumb: listing7_img3,
      tag: "Open",
      recommended: "Recommended",
      country: "Japanese",
      time: "7 Days",
      title: "Northend Leoat Japanese Cuisine",
      location: "Switzerland city",
      price: 17,
      review: 5,
   },
];

export default listing_data;