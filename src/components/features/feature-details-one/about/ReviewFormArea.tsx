import ReviewForm from "@/components/forms/ReviewForm"

interface DataType {
   id: number;
   title: string;
   rating: string[];
}

const review_data: DataType[] = [
   {
      id: 1,
      title: "Location :",
      rating: ["fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star",]
   },
   {
      id: 2,
      title: "Price :",
      rating: ["fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star",]
   },
   {
      id: 3,
      title: "Amenities :",
      rating: ["fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star",]
   },
   {
      id: 4,
      title: "Rooms :",
      rating: ["fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star",]
   },
   {
      id: 5,
      title: "Services :",
      rating: ["fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star", "fa-sharp fa-solid fa-star",]
   },
];

const ReviewFormArea = () => {
   return (
      <div className="tg-tour-about-review-form-wrap mb-45">
         <h4 className="tg-tour-about-title mb-5">Leave a Reply</h4>
         <div className="tg-tour-about-rating-category mb-20">
            <ul>
               {review_data.map((item) => (
                  <li key={item.id}>
                     <label>{item.title}</label>
                     <div className="rating-icon">
                        {item.rating.map((rat, i) => (
                           <i key={i} className={rat}></i>
                        ))}
                     </div>
                  </li>
               ))}
            </ul>
         </div>
         <div className="tg-tour-about-review-form">
            <ReviewForm />
         </div>
      </div>
   )
}

export default ReviewFormArea
