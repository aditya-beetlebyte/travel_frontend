import React from 'react'

const Included = () => {
   return (
      <div className="tg-tour-about-inner mb-40">
         <h4 className="tg-tour-about-title mb-20">Included/Exclude</h4>
         <div className="row">
            <div className="col-lg-5">
               <div className="tg-tour-about-list  tg-tour-about-list-2">
                  <ul>
                     <li>
                        <span className="icon mr-10"><i className="fa-sharp fa-solid fa-check fa-fw"></i></span>
                        <span className="text">Pick and Drop Service</span>
                     </li>
                     <li>
                        <span className="icon mr-10"><i className="fa-sharp fa-solid fa-check fa-fw"></i></span>
                        <span className="text">1 Meal Per Day</span>
                     </li>
                     <li>
                        <span className="icon mr-10"><i className="fa-sharp fa-solid fa-check fa-fw"></i></span>
                        <span className="text">Cruise Dinner & Music Event</span>
                     </li>
                     <li>
                        <span className="icon mr-10"><i className="fa-sharp fa-solid fa-check fa-fw"></i></span>
                        <span className="text">Visit 7 Best Places</span>
                     </li>
                  </ul>
               </div>
            </div>
            <div className="col-lg-7">
               <div className="tg-tour-about-list tg-tour-about-list-2 disable">
                  <ul>
                     <li>
                        <span className="icon mr-10"><i className="fa-sharp fa-solid fa-xmark"></i></span>
                        <span className="text"> Gratuities</span>
                     </li>
                     <li>
                        <span className="icon mr-10"><i className="fa-sharp fa-solid fa-xmark"></i></span>
                        <span className="text">Return airport and round trip transfers.</span>
                     </li>
                     <li>
                        <span className="icon mr-10"><i className="fa-sharp fa-solid fa-xmark"></i></span>
                        <span className="text">Luxury air-conditioned coach</span>
                     </li>
                     <li>
                        <span className="icon mr-10"><i className="fa-sharp fa-solid fa-xmark"></i></span>
                        <span className="text">Tickets</span>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Included
