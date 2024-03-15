
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];
  return (
    <div className="">
      
      <div className="flex items-center">
        <div className="ml-4">
          <h1 className="text-5xl font-bold">Find a Job that suits</h1>
          <h1 className="text-4xl font-light">your interest and skills</h1>
          <p className="mt-2 font-thin">
            Finding a job that aligns with both your interests and skills is essential for long-term satisfaction and success in your career. When you pursue a job that resonates with your passions, you're more likely to feel motivated and fulfilled.
          </p>
        </div>
        <div className="w-[1500px] ">
          <img src="/heroS.jpg" className="w-full h-full" />
        </div>
      </div>
      <div className="flex justify-between p-[50px] cursor-pointer">
        {details.map((element) => {
          return (
            <div className="flex gap-5 items-center hover:translate-y-1 duration-200 " key={element.id}>
              <div className="text-[24px] newBg flex items-center justify-center p-10px bg-green-600">{element.icon}</div>
              <div className="content">
                <p className="font-bold">{element.title}</p>
                <p className="text-[14px] text-gray-400 mt-1">{element.subTitle}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  )
}

export default HeroSection