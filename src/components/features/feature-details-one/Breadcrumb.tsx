import Link from "next/link"

const Breadcrumb = () => {
   return (
      <>
         <div className="tg-breadcrumb-spacing-3 include-bg p-relative fix" style={{ backgroundImage: `url(/assets/img/breadcrumb/breadcrumb-2.jpg)` }}>
            <div className="tg-hero-top-shadow"></div>
         </div>
         <div className="tg-breadcrumb-list-2-wrap">
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <div className="tg-breadcrumb-list-2">
                        <ul>
                           <li><Link href="/">Home</Link></li>
                           <li><i className="fa-sharp fa-solid fa-angle-right"></i></li>
                           <li><Link href="/tour-grid-1">Tour Grid</Link></li>
                           <li><i className="fa-sharp fa-solid fa-angle-right"></i></li>
                           <li><span>Vatican Museums Sistine Chapel Skip the Line</span></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Breadcrumb
