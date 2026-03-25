import { StaticImageData } from "next/image"

import location_1 from "@/assets/img/destination/tu/des-1.jpg"
import location_2 from "@/assets/img/destination/tu/des-2.jpg"
import location_3 from "@/assets/img/destination/tu/des-3.jpg"
import location_4 from "@/assets/img/destination/tu/des-4.jpg"


interface DataType {
   id: number;
   page: string;
   thumb: StaticImageData;
   title: string;
   total?: string;
   class?: string;
}

const location_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      thumb: location_1,
      title: "Kaziranga & Meghalaya",
      total: "05N / 06D",
   },
   {
      id: 2,
      page: "home_1",
      thumb: location_2,
      title: "Mystic Meghalaya & Caves",
      total: "05N / 06D",
   },
   {
      id: 3,
      page: "home_1",
      thumb: location_3,
      title: "Mystic Bhutan",
      total: "06N / 07D",
   },
   {
      id: 4,
      page: "home_1",
      thumb: location_4,
      title: "Arunachal Tawang Explorer",
      total: "06N / 07D",
   },
   {
      id: 5,
      page: "home_1",
      thumb: location_1,
      title: "Nongriat Root Bridge Trek",
      total: "05N / 06D",
   },
   {
      id: 6,
      page: "home_1",
      thumb: location_2,
      title: "Tawang Short Circuit",
      total: "05N / 06D",
   },
   {
      id: 7,
      page: "home_1",
      thumb: location_3,
      title: "Arunachal & Kaziranga Grand",
      total: "07N / 08D",
   },
   {
      id: 8,
      page: "home_1",
      thumb: location_4,
      title: "Grand Arunachal & Nameri",
      total: "08N / 09D",
   },
   {
      id: 9,
      page: "home_1",
      thumb: location_1,
      title: "Meghalaya & Sacred Forest",
      total: "07N / 08D",
   },
   {
      id: 10,
      page: "home_1",
      thumb: location_2,
      title: "Nongriat & Kamakhya",
      total: "06N / 07D",
   },
   {
      id: 11,
      page: "home_1",
      thumb: location_3,
      title: "Complete Meghalaya Discovery",
      total: "06N / 07D",
   },
   {
      id: 12,
      page: "home_1",
      thumb: location_4,
      title: "Kaziranga & Meghalaya Highlights",
      total: "05N / 06D",
   },
];

export default location_data;