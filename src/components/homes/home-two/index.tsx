import FooterTwo from '@/layouts/footers/FooterTwo'
import HeaderTwo from '@/layouts/headers/HeaderTwo'
import Banner from './Banner'
import Listing from './Listing'
import Choose from './Choose'
import Location from './Location'
import Process from './Process'
import Pricing from './Pricing'
import Counter from './Counter'
import Cta from './Cta'
import Testimonial from './Testimonial'
import Blog from '../home-one/Blog'

const HomeTwo = () => {
   return (
      <>
         <HeaderTwo />
         <main>
            <Banner />
            <Listing />
            <Choose />
            <Location />
            <Process />
            <Pricing />
            <Counter />
            <Cta />
            <Testimonial />
            <Blog style={true} />
         </main>
         <FooterTwo />
      </>
   )
}

export default HomeTwo
