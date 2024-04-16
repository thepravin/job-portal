import { dark } from "@mui/material/styles/createPalette";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Jobs = () => {
  const isAuthorized = useSelector((store) => store.isAuthorized);
  const [job, setJobs] = useState();
  const navigateTo = useNavigate();


  const fetchAllJobs = async () => {
    try {
      await axios.get("/v1/job/getall", { withCredentials: true })
        .then((res) => setJobs(res.data.jobs))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllJobs()
  }, [])

  if (!isAuthorized) {
    return navigateTo("/login")
  }
  const [searchQuery, setSearchQuery] = useState('');


  return (
    <>
      <ToastContainer />
      <section className="jobs page mt-12 ">
      <div className="container ">
        <h1 className="text-2xl font-bold -mb-6">ALL AVAILABLE JOBS</h1>
        <input
          type="text"
          placeholder="Search by skill..."
          className="border border-gray-300 rounded-lg px-3 py-2 mt-4 w-80 -mb-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="banner">
          {job &&
            job
              .filter((element) => {
                // Filter job array based on search query
                if (searchQuery === '') return true;
                const skillsArray = element.skills ? element.skills.split(',') : [];
                return skillsArray.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()));
              })
              .map((element) => {
                const skillsArray = element.skills ? element.skills.split(',') : [];

                return (
                  <div
                    className="card bg-white rounded-lg shadow-md p-4 mb-4"
                    key={element._id}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <p className="font-semibold text-lg mb-2">{element.title}</p>
                    <p className="text-gray-600 mb-2">{element.category}</p>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {skillsArray.map((skill, index) => (
                        <div
                          key={index}
                          className="mr-2 mb-2 rounded-full bg-blue-500 text-white px-2 py-1"
                          style={{ minWidth: "fit-content" }}
                        >
                          {skill.trim()}
                        </div>
                      ))}
                    </div>
                    <Link
                      to={`/job/${element._id}`}
                      className="text-blue-500 hover:underline mt-2 inline-block"
                    >
                      Job Details
                    </Link>
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