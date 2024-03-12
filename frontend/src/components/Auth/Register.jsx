import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthorized } from "../../Utils/isAuthorizedSlice";
import { Link, Navigate } from "react-router-dom";


const Register = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const isAuthorized = useSelector((store) => store.isAuthorized);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      dispatch(setIsAuthorized(true));
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  if (isAuthorized) {
    return <Navigate to={"/"} />
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900 h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Create and account
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

              <form className="space-y-4 md:space-y-6" >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                  <input type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ABC" required="" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Role</label>
                  <input type="text" name="role"className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Employer / Job Seeker" required="" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
                  <input type="text" name="phone" value={phone} onChange={(e)=>setPhone(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+91 xxxxxxxx" required="" />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>


                <button type="submit" className="w-full text-white bg-slate-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-slate-600">Create an account</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <Link to={"/login"} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Register