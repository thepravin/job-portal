import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Application = () => {
  const isAuthorized = useSelector((store) => store.isAuthorized);
  const user = useSelector((store) => store.user);
  const { id } = useParams();
  const navigateTo = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setjobTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);





  const fetchJob = async () => {
    const res = await axios.get(`/v1/job/${id}`, { withCredentials: true });
    setjobTitle(res.data.job.title)

  };
  useEffect(() => {
    fetchJob()
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
  }, [])


  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setResume(resume);
  };

  const handleApplication = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("jobTitle", jobTitle);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setName("");
      setEmail("");
      setjobTitle("");
      setPhone("");
      setAddress("");
      setResume("");
      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }


  return (
    <>
  
      <section className="application">
        <div className="container">
          <h3 className="mt-12 font-bold text-2xl">Application Form</h3>
          <form onSubmit={handleApplication} >
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="number"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              type="text"
              placeholder="Your Address"
              value={jobTitle}
            />




            <div>
              <label className="text-gray-500"
                style={{ textAlign: "start", display: "block", fontSize: "20px" }}
              >
                Select Resume
              </label>
              <input
                type="file"
                accept=".pdf, .jpg, .png"
                onChange={handleFileChange}
                style={{ width: "100%" }}
              />
            </div>
            <button type="submit">Send Application</button>
          </form>
        </div>
      </section>
      
    </>
  );
}

export default Application