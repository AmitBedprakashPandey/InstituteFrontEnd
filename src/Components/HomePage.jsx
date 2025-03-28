import QuickCount from "./UI/QuickCount";
import QuickCard from "./UI/QuickCard";
import { FaCircleInfo, FaMoneyBills, FaUserGraduate } from "react-icons/fa6";
import NavBar from "./NavBar";
import SideBar from "./UI/SideBar";
import {
  EditButton,
  NoButton,
  SaveButton,
  UpdateButton,
  ViewButton,
  YesButton,
} from "../Components/UI/Buttons";
import { Outlet } from "react-router-dom";
import CameraView from "../Utilites/CameraView";
export default function HomePage(params) {
  

  return (
    <div className="flex flex-col relative h-screen w-screen dark:bg-slate-800">
      <NavBar />
      <div className="w-full h-full flex relative">
        {/* <SideBar /> */}
        <main className="border-l-2 relative flex-1 ">
          {/* <Outlet /> */}

          <CameraView />
        </main>

      </div>
    </div>
  );
}

