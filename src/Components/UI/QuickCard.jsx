import { FaUserGraduate } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
export default function Admission({item}) {
  const navigate=useNavigate();
  return (
    <Link to={item.url} className="bg-gradient-to-r from-blue-500 to-sky-500 rounded-lg max-w-28 max-h-28 flex flex-col items-center p-3 hover:from-blue-600 hover:to-sky-600 hover:scale-105 duration-200 hover:cursor-pointer" >
      {item.icon}
      <label className="text-white font-medium mt-1 hover:cursor-pointer">{item.lable}</label>
    </Link>
  );
}
