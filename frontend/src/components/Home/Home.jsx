import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";


const Home = () => {
  const isAuthorized = useSelector((store) => store.isAuthorized);
  
  if(!isAuthorized){
    return <Navigate to={"/login"}/>
  }

  return (
    <>
    <HeroSection/>
    <HowItWorks/>
    <PopularCategories/>
    <PopularCompanies/>
    </>
  )
}

export default Home