import { StaticImageData } from "next/image";

import avatar_1 from "@/assets/img/testimonial/avatar.png"
import avatar_2 from "@/assets/img/testimonial/avatar-2.png"
import avatar_3 from "@/assets/img/testimonial/avatar-3.png"

interface DataType {
   id: number;
   page:string;
   avatar: StaticImageData;
   name: string;
   designation: string;
   desc: string;
}

const testi_data: DataType[] = [
   {
      id: 1,
      page:"home_2",
      avatar: avatar_1,
      name: "Esther Howard",
      designation: "CEO, Traveller",
      desc: "Morem ipsum dolor siterey amet mean earty areaeey consec taetur adipisrvice ollwing  ipsum dolor consectetur.",
   },
   {
      id: 2,
      page:"home_2",
      avatar: avatar_2,
      name: "Floyd Miles",
      designation: "CEO, Traveller",
      desc: "Morem ipsum dolor siterey amet mean earty areaeey consec taetur adipisrvice ollwing  ipsum dolor consectetur.",
   },
   {
      id: 3,
      page:"home_2",
      avatar: avatar_3,
      name: "Jacob Jones",
      designation: "CEO, Traveller",
      desc: "Morem ipsum dolor siterey amet mean earty areaeey consec taetur adipisrvice ollwing  ipsum dolor consectetur.",
   },
   {
      id: 4,
      page:"home_2",
      avatar: avatar_2,
      name: "Floyd Miles",
      designation: "CEO, Traveller",
      desc: "Morem ipsum dolor siterey amet mean earty areaeey consec taetur adipisrvice ollwing  ipsum dolor consectetur.",
   },
];

export default testi_data;