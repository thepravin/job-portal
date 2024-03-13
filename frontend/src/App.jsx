import { useDispatch, useSelector } from "react-redux";
import "./App.css"
import Store from "./Utils/Store";
import NavBar from "./components/Layout/NavBar";
import Footer from "./components/Layout/Footer";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { setIsAuthorized } from "./Utils/isAuthorizedSlice";
import { addUser } from "./Utils/userSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const isAuthorized = useSelector((store) => store.isAuthorized);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();


  // user api
  const fetchUser = async () => {
    try {
      const response = await axios.get("/v1/user/getuser", { withCredentials: true });
      console.log("Rsponse in App"+response)
    dispatch(addUser(response?.data?.user));
    dispatch(setIsAuthorized(true));
    } catch (error) {
      dispatch(setIsAuthorized(false));
    }
  };

  useEffect(()=>{
    fetchUser()
  },[isAuthorized])

  return (
    <>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
     
    </>
  );
}

export default App;
