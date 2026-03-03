import { StaticImageData } from "next/image";

import team_1 from "@/assets/img/team/member.png"
import team_2 from "@/assets/img/team/member-2.png"
import team_3 from "@/assets/img/team/member-3.png"
import team_4 from "@/assets/img/team/member-4.png"
import team_5 from "@/assets/img/team/member-5.png"
import team_6 from "@/assets/img/team/member-6.png"
import team_7 from "@/assets/img/team/member-7.png"

interface DataType {
   id: number;
   thum: StaticImageData;
   title: string;
   designation: string;
}

const team_data: DataType[] = [
   {
      id: 1,
      thum: team_1,
      title: "Esther Howard",
      designation: "Consulting"
   },
   {
      id: 2,
      thum: team_2,
      title: "Jane Cooper",
      designation: "Consulting"
   },
   {
      id: 3,
      thum: team_3,
      title: "Kristin Watson",
      designation: "Consulting"
   },
   {
      id: 4,
      thum: team_4,
      title: "Darrell Steward",
      designation: "Consulting"
   },
   {
      id: 5,
      thum: team_5,
      title: "Devon Lane",
      designation: "Consulting"
   },
   {
      id: 6,
      thum: team_6,
      title: "Theresa Web",
      designation: "Consulting"
   },
   {
      id: 7,
      thum: team_7,
      title: "Wade Warren",
      designation: "Consulting"
   },
   {
      id: 8,
      thum: team_1,
      title: "Ronald Richards",
      designation: "Consulting"
   },
]

export default team_data;