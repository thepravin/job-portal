import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJobData] = useState();
  const navigateTo = useNavigate();
  const isAuthorized = useSelector((store) => store.isAuthorized);
  const user = useSelector((store) => store.user);

  const calculateDaysAgo = (postedDate) => {
    const currentDate = new Date();
    const postedDateObj = new Date(postedDate);
    const differenceInTime = currentDate.getTime() - postedDateObj.getTime();
    const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const fetchJob = async () => {
    try {
      const res = await axios.get(`/v1/job/${id}`, { withCredentials: true });
      setJobData(res.data.job);
    } catch (error) {
      navigateTo("/notfound");
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  if (!isAuthorized) {
    return navigateTo("/login");
  }

  console.log(job);

  return job ? (
    <section className="jobDetail page">
      <div className="container">
        <h1 className="font-bold text-2xl">Job Details</h1>
        <div className="banner">
          <p>
            Title: <span>{job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span> ({calculateDaysAgo(job.jobPostedOn)} days ago)</span>
          </p>
          <p>
            Salary:
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <></>
          ) : (
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
        </div>
      </div>
    </section>
  ) : null;
};

export default JobDetails;
