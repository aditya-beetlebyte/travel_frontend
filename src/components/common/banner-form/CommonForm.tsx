// import { useEffect, useRef, useState } from "react";

// interface DataType {
//    id: number;
//    title: string;
//    count: number
// }

// const guest_data: DataType[] = [
//    {
//       id: 1,
//       title: "Rooms",
//       count: 0
//    },
//    {
//       id: 2,
//       title: "Adults",
//       count: 0
//    },
//    {
//       id: 3,
//       title: "Children",
//       count: 0
//    },
// ];

// const CommonForm = () => {

//    const [location, setLocation] = useState(false);
//    const [checkInDate, setCheckInDate] = useState<Date | Date[]>(new Date());
//    const [checkOutDate, setCheckOutDate] = useState<Date | Date[]>(new Date());
//    const [guest, setGuest] = useState(false);
//    const [guestCounts, setGuestCounts] = useState<DataType[]>(guest_data);

//    const locationRef = useRef<HTMLDivElement>(null);
//    const guestRef = useRef<HTMLDivElement>(null);

//    useEffect(() => {
//       const handleClickOutside = (event: MouseEvent) => {
//          if (
//             locationRef.current &&
//             !locationRef.current.contains(event.target as Node)
//          ) {
//             setLocation(false);
//          }
//          if (
//             guestRef.current &&
//             !guestRef.current.contains(event.target as Node)
//          ) {
//             setGuest(false);
//          }
//       };

//       document.addEventListener("mousedown", handleClickOutside);
//       return () => {
//          document.removeEventListener("mousedown", handleClickOutside);
//       };
//    }, []);

//    const handleIncrement = (id: number) => {
//       setGuestCounts(prev =>
//          prev.map(item =>
//             item.id === id ? { ...item, count: item.count + 1 } : item
//          )
//       );
//    };

//    const handleDecrement = (id: number) => {
//       setGuestCounts(prev =>
//          prev.map(item =>
//             item.id === id && item.count > 0
//                ? { ...item, count: item.count - 1 }
//                : item
//          )
//       );
//    };
   
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default CommonForm
