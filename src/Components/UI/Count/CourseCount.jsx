import { FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CourseCount({ className }) {
  const navigate = useNavigate();
  return (
    <div
      className={`bg-gradient-to-r from-red-500 to-yellow-500 w-96 shadow-slate-500 shadow-lg hover:scale-105 duration-150 ${className}`}
    >
      <div className="text-white text-3xl pt-5 px-5">
        <span>5</span>
      </div>
      <div className="text-white text-2xl py-2 px-5">
        <p>Total Course's</p>
      </div>
      <div onClick={()=>navigate("/setup/course")} className="text-nowrap text-center bg-gradient-to-r from-red-600 to-yellow-800 hover:from-red-700 hover:to-yellow-900 duration-200 text-white text-sm p-3 hover:cursor-pointer">
        <p className="flex justify-center items-center gap-3 ">
          More info <FaArrowCircleRight size={18} />
        </p>
      </div>
    </div>
  );
}
