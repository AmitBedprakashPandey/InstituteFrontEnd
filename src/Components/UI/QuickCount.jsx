import { FaArrowCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
export default function QuickCount({ item, className }) {
  const navigate = useNavigate();
  return (
    <div
      className={`min-w-64 max-w-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg hover:scale-100 duration-150 ${className}`}
    >
      <div className="text-white text-3xl pt-5 px-5">
        <span></span>
      </div>
      <div className="text-white text-2xl py-2 px-5">
        <p>{item.lable}</p>
      </div>
      <Link to={item.icon}>
        <div className="text-nowrap text-center bg-gradient-to-r from-cyan-600 to-blue-800 hover:from-cyan-700 hover:to-blue-900 duration-300 text-white text-sm p-3 hover:cursor-pointer">
          <p className="flex justify-center items-center gap-3 ">
            More info <FaArrowCircleRight size={18} />
          </p>
        </div>
      </Link>
    </div>
  );
}
