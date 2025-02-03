import { FaArrowCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function CourseCount({ className }) {
  const navigate = useNavigate();
  const { course } = useSelector((state) => state.Course);
  return (
    <div
      className={`bg-gradient-to-r from-green-800 to-green-400 shadow-slate-500 shadow-lg hover:scale-105 duration-150 ${className}`}
    >
      <div className="text-white text-3xl pt-5 px-5">
        <span>{course?.length}</span>
      </div>
      <div className="text-white text-2xl py-2 px-5">
        <p>Total Course's</p>
      </div>
      <div
        onClick={() => navigate("/school/admission")}
        className="text-nowrap text-center bg-gradient-to-r from-green-600 to-green-400 hover:from-cyan-700 hover:to-blue-900 duration-300 text-white text-sm p-3 hover:cursor-pointer"
      >
        <p className="flex justify-center items-center gap-3 ">
          More info <FaArrowCircleRight size={18} />
        </p>
      </div>
    </div>
  );
}
