import { FaCircleInfo } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export default function Enquiry(params) {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate("/school/enqiry")} className="bg-gradient-to-r from-blue-500 to-sky-500 max-w-28 max-h-28 flex flex-col items-center p-5 hover:from-blue-600 hover:to-sky-600 hover:scale-105 duration-200 hover:cursor-pointer" >
      <FaCircleInfo size={50} color="#ffff" className="hover:cursor-pointer" />
      <label className="text-white font-bold hover:cursor-pointer">Enquiry</label>
    </div>
  );
}
