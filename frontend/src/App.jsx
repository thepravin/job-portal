import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Store from "./Utils/Store";
import NavBar from "./components/Layout/NavBar";
import Footer from "./components/Layout/Footer";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { setIsAuthorized } from "./Utils/isAuthorizedSlice";
import { addUser } from "./Utils/userSlice";

function App() {
  const isAuthorized = useSelector((store) => store.isAuthorized);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();


  // user api
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/user/getuser", { withCredentials: true });
    dispatch(addUser(response.data.user));
    dispatch(setIsAuthorized(true));
    } catch (error) {
      dispatch(setIsAuthorized(false));
    }
  };

  useEffect(()=>{
    fetchUser()
  },[])

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
