import { FaUserGraduate } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export default function Admission(params) {
  const navigate=useNavigate();
  return (
    <div onClick={()=>navigate("/school/admission")} className="bg-gradient-to-r from-blue-500 to-sky-500 w-28 h-28 flex flex-col items-center p-5 hover:from-blue-600 hover:to-sky-600 hover:scale-105 duration-200 hover:cursor-pointer" >
      <FaUserGraduate size={50} color="#ffff" className="hover:cursor-pointer" />
      <label className="text-white font-bold hover:cursor-pointer">Admission</label>
    </div>
  );
}