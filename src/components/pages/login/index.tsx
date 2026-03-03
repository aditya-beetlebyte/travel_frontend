import LoginArea from "./LoginArea"
import FooterFive from "@/layouts/footers/FooterFive"
import InnerHeader from "@/layouts/headers/InnerHeader"

const Login = () => {
   return (
      <>
         <InnerHeader />
         <main>
            <LoginArea />
         </main>
         <FooterFive />
      </>
   )
}

export default Login
