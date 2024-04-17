import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { useSelector } from "react-redux";

const applicationAccept = async (id) => {
  try {
    await axios
      .put(`/v1/application/status/approve/${id}`, {}, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}
const applicationRejected = async (id) => {
  try {
    await axios
      .put(`/v1/application/status/rejected/${id}`, {}, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      });
  } catch (error) {
    toast.error(error.response.data.message);
  }
}


const MyApplications = () => {
  const isAuthorized = useSelector((store) => store.isAuthorized);
  const user = useSelector((store) => store.user);
  const [applications, setApplications] = useState([]);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios
          .get("/v1/application/employer/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      } else {
        axios
          .get("/v1/application/jobseeker/getall", {
            withCredentials: true,
          })
          .then((res) => {
            setApplications(res.data.applications);
          });
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    navigateTo("/");
  }

  const deleteApplication = (id) => {
    try {
      axios
        .delete(`/v1/application/delete/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success(res.data.message);
          setApplications((prevApplication) =>
            prevApplication.filter((application) => application._id !== id)
          );
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };





  return (
    <section className="my_applications page mt-12">
      {user && user.role === "Job Seeker" ? (
        <div className="container">
          <h1 className="text-center font-bold text-2xl">My Applications</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>{" "}
            </>
          ) : (
            applications.map((element) => {
              return (
                <JobSeekerCard
                  element={element}
                  key={element._id}
                  deleteApplication={deleteApplication}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      ) : (
        <div className="container">
          <h1 className="text-center font-bold text-2xl">Applications From Job Seekers</h1>
          {applications.length <= 0 ? (
            <>
              <h4>No Applications Found</h4>
            </>
          ) : (
            applications.map((element) => {
              return (
                <EmployerCard
                  element={element}
                  key={element._id}
                  openModal={openModal}
                />
              );
            })
          )}
        </div>
      )}
      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
}

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>jobTitle:</span> {element.jobTitle}
          </p>
          <p>
            <span>Job Status :</span> {element.employerID.status == "Accepted" ? <span className="text-green-500">Accepted</span> : <span className="text-red-500">Rejected</span>}

          </p>
        </div>
        <div className="w-[550px] h-auto object-cover">
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
        <div className="btn_area">
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name:</span> {element.name}
          </p>
          <p>
            <span>Email:</span> {element.email}
          </p>
          <p>
            <span>Phone:</span> {element.phone}
          </p>
          <p>
            <span>Address:</span> {element.address}
          </p>
          <p>
            <span>jobTitle:</span> {element.jobTitle}
          </p>

          {/* Buttons to update application status */}
          <div className="mt-4">
            {
              element.employerID.status === "Accepted" ? (

                <button className="bg-red-600 mr-4 px-5 py-2 text-white rounded-lg" onClick={() => applicationRejected(element._id)}>
                  Reject
                </button>

              ) : element.employerID.status === "Rejected" ? (
                <button className="bg-green-600 mr-4 px-5 py-2 text-white rounded-lg" onClick={() => applicationAccept(element._id)}>
                  Accept
                </button>
              ) : (
                <>
                  <button className="bg-green-600 mr-4 px-5 py-2 text-white rounded-lg" onClick={() => applicationAccept(element._id)}>
                    Accept
                  </button>
                  <button className="bg-red-600 mr-4 px-5 py-2 text-white rounded-lg" onClick={() => applicationRejected(element._id)}>
                    Reject
                  </button>
                </>
              )
            }
          </div>
            
        </div>
        <p className="mr-44 ">
        {element.employerID.status == "Accepted" ? <span className="text-green-500 text-3xl font-bold"> ✅Accepted</span> : <span className="text-red-500 text-3xl font-bold">❌Rejected</span>}
         
        </p>
        <div className="w-[550px]  h-auto">          
          <img
            src={element.resume.url}
            alt="resume"
            onClick={() => openModal(element.resume.url)}
          />
        </div>
      </div>
    </>
  );
};

export default MyApplications;
