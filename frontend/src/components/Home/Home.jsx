import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import { ToastContainer } from "react-toastify";


const Home = () => {
  const isAuthorized = useSelector((store) => store.isAuthorized);
  
  if(!isAuthorized){
    return <Navigate to={"/login"}/>
  }

  return (
    <div className="mt-12">
     <ToastContainer/>
    <HeroSection/>
    <HowItWorks/>
    <PopularCategories/>
    <PopularCompanies/>
    </div>
  )
}

export default Home