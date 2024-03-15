import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const isAuthorized = useSelector((store) => store.isAuthorized);

  if (!isAuthorized) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <ToastContainer />
      <div className="mt-12">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </div></>
  )
}

export default Home