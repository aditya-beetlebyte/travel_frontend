import { StaticImageData } from "next/image";

import blog_1 from "@/assets/img/blog/blog-2/blog-1.jpg"
import blog_2 from "@/assets/img/blog/blog-2/blog-2.jpg"
import blog_3 from "@/assets/img/blog/blog-2/blog-3.jpg"

import blog2_1 from "@/assets/img/blog/grid/grid.jpg"
import blog2_2 from "@/assets/img/blog/grid/grid-2.jpg"
import blog2_3 from "@/assets/img/blog/grid/grid-3.jpg"
import blog2_4 from "@/assets/img/blog/grid/grid-4.jpg"
import blog2_5 from "@/assets/img/blog/grid/grid-5.jpg"
import blog2_6 from "@/assets/img/blog/grid/grid-6.jpg"
import blog2_7 from "@/assets/img/blog/grid/grid-7.jpg"
import blog2_8 from "@/assets/img/blog/grid/grid-8.jpg"

import blog3_1 from "@/assets/img/blog/sidebar/standard.jpg"
import blog3_2 from "@/assets/img/blog/sidebar/standard-3.jpg"
import blog3_3 from "@/assets/img/blog/sidebar/standard-4.jpg"
import blog3_4 from "@/assets/img/blog/sidebar/standard-2.jpg"

interface DataType {
   id: number;
   page: string;
   thumb: StaticImageData;
   tag?: string;
   title: string;
   date: string;
   time: string;
   desc: string;
}

const blog_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      thumb: blog_1,
      tag: "Hiking",
      title: "Spiritual Sojourn mageey for Soul Seekers",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Are you tired the typical tourist destinat ons and looking step out of your comf ort zone travel."
   },
   {
      id: 2,
      page: "home_1",
      thumb: blog_2,
      tag: "River",
      title: "Wine Country Escapeeyard Tours for Connoisseurs",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Are you tired the typical tourist destinat ons and looking step out of your comf ort zone travel."
   },
   {
      id: 3,
      page: "home_1",
      thumb: blog_3,
      tag: "Travel",
      title: "Thrills & Chills treme Sports Tours for Adrenaline",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Are you tired the typical tourist destinat ons and looking step out of your comf ort zone travel."
   },

   // inner_1

   {
      id: 1,
      page: "inner_1",
      thumb: blog2_1,
      title: "Exploring The Green Spac Realar Residence Area Harmony",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we explore the green innovations.",
   },
   {
      id: 2,
      page: "inner_1",
      thumb: blog2_2,
      title: "An arts and culture guide to Turin, Italy",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we explore the green innovations.",
   },
   {
      id: 3,
      page: "inner_1",
      thumb: blog2_3,
      title: "Enrich Your Mind Envision Your Future Education for",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we explore the green innovations.",
   },
   {
      id: 4,
      page: "inner_1",
      thumb: blog2_4,
      title: "Change your place and get the fresh air",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we explore the green innovations.",
   },
   {
      id: 5,
      page: "inner_1",
      thumb: blog2_5,
      title: "This Spanish city is a feast for the eyes",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we explore the green innovations.",
   },
   {
      id: 6,
      page: "inner_1",
      thumb: blog2_6,
      title: "When you visit the Eternal Rome City",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we explore the green innovations.",
   },
   {
      id: 7,
      page: "inner_1",
      thumb: blog2_7,
      title: "Three of the Best Day Trips to Make from Francisco",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we explore the green innovations.",
   },
   {
      id: 8,
      page: "inner_1",
      thumb: blog2_8,
      title: "10 Safest Destinations for Solo Female Travelers",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we explore the green innovations.",
   },
   {
      id: 9,
      page: "inner_1",
      thumb: blog2_5,
      title: "This Spanish city is a feast for the eyes",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we explore the green innovations.",
   },
   {
      id: 10,
      page: "inner_1",
      thumb: blog2_6,
      title: "When you visit the Eternal Rome City",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we explore the green innovations.",
   },
   {
      id: 11,
      page: "inner_1",
      thumb: blog2_7,
      title: "Three of the Best Day Trips to Make from Francisco",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we explore the green innovations.",
   },
   {
      id: 12,
      page: "inner_1",
      thumb: blog2_8,
      title: "10 Safest Destinations for Solo Female Travelers",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we explore the green innovations.",
   },

   // inner_1

   {
      id: 1,
      page: "inner_2",
      thumb: blog3_1,
      title: "Exploring The Green Spaces Of Realar Residence Area Harmony with Nature",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we are explore the green innovations seamlessly integrated into the fabric.",
   },
   {
      id: 2,
      page: "inner_2",
      thumb: blog3_2,
      title: "Enrich Your Mind Envision Your Future Education for Success",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we are explore the green innovations seamlessly integrated into the fabric.",
   },
   {
      id: 3,
      page: "inner_2",
      thumb: blog3_3,
      title: "An arts and culture guide to Turin, Italy",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we are explore the green innovations seamlessly integrated into the fabric.",
   },
   {
      id: 4,
      page: "inner_2",
      thumb: blog3_4,
      title: "10 Safest Destinations for Solo Female Travelers",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we are explore the green innovations seamlessly integrated into the fabric.",
   },
   {
      id: 5,
      page: "inner_2",
      thumb: blog3_3,
      title: "An arts and culture guide to Turin, Italy",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we are explore the green innovations seamlessly integrated into the fabric.",
   },
   {
      id: 6,
      page: "inner_2",
      thumb: blog3_4,
      title: "10 Safest Destinations for Solo Female Travelers",
      date: "26th Sep, 2024",
      time: "5 mins Read",
      desc: "Welcome to Realar Residence, where sustainability meets comfort in every corner. In this blog post, we are explore the green innovations seamlessly integrated into the fabric.",
   },
];

export default blog_data;