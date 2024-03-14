import { dark } from "@mui/material/styles/createPalette";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Jobs = () => {
  const isAuthorized = useSelector((store) => store.isAuthorized);
  const [job,setJobs]=useState();
  const navigateTo = useNavigate();


  const fetchAllJobs = async()=>{
    try {
      await axios.get("/v1/job/getall",{withCredentials:true})
      .then((res)=> setJobs(res.data.jobs))  
    } catch (error) {
      console.log(error)
    }
  }

useEffect(()=>{
  fetchAllJobs()
},[])

if(!isAuthorized){
  return navigateTo("/login")
}


  return (
    <>
    <ToastContainer/>
     <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {job &&
            job.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
    
    </>
  )
}

export default Jobs