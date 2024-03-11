import { Provider } from "react-redux";
import "./App.css";
import store from "./Utils/Store";
import NavBar from "./components/Layout/NavBar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import MyJobs from "./components/Job/MyJobs";
import PostJob from "./components/Job/PostJob";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import NotFound from "./components/NotFound/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";

function App() {
  return (
    <>
      <Provider store={store}>
        <NavBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/job/getall" element={<Jobs />} />
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/application/:id" element={<Application />} />
            <Route path="/applications/me" element={<MyApplications />} />
            <Route path="/job/post" element={<PostJob />} />
            <Route path="/job/me" element={<MyJobs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Toaster />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
