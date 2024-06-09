import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout, getProtection } from "../Redux/Slice/UserSlice";
import {
  BiAddToQueue,
  BiBookAdd,
  BiBuilding,
  BiChevronDown,
  BiDetail,
  BiLogOut,
  BiMoney,
  BiPhone,
  BiUserPlus,
} from "react-icons/bi";
import { getSchoolbyId } from "../Redux/Slice/SchoolSlicse";
function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { School, message } = useSelector((state) => state.School);
  const { userid } = useSelector((state) => state.UserAuth);

  const getFirstLetter = (str) => {
    if (!str) return "";
    return str.trim().charAt(0); // Correct usage of charAt
  };
  
  useLayoutEffect(() => {
    dispatch(getSchoolbyId(userid));
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/login");
    }
    dispatch(getUser());
    if (!School) {
      navigate("/school/form");
    }
    // dispatch(getProtection())
  }, [navigate, dispatch]);

  const accept = () => {
    dispatch(logout());
    if (!localStorage.getItem("userToken")) {
      navigate("/login");
    }
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to logout ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      acceptClassName: "py-3 px-5 bg-cyan-500 text-white",
      rejectClassName: "py-3 px-5 mr-5",
      accept,
      // reject
    });
  };

  return (
    <>
      <ConfirmDialog />
      <div className="bg-blue-900 fixed top-0 w-full z-40 flex justify-between lg:py-3 px-14 shadow-gray-500 shadow-md">
        <div className="flex items-center gap-10">
          <div>
            <h1 className="flex items-center  gap-5 text-white capitalize font-bold md:text-xs lg:text-lg">
              <Avatar
                size="normal"
                shape="circle"
                image={School?.schoolPhoto}
              />
              {School?.schoolName}
            </h1>
          </div>
          <div className="flex">
            <div class="relative group">
              <a
                href="/"
                class="md:text-xs flex items-center gap-4 lg:text-lg capitalize px-4 py-2 rounded-lg focus:outline-none text-white"
              >
                Home
              </a>
            </div>
            <div class="relative group">
              <button class="md:text-xs flex items-center gap-4 lg:text-lg capitalize px-4 py-2 rounded-lg focus:outline-none text-white">
                student <BiChevronDown />
              </button>
              <div class="absolute hidden min-w-56 group-hover:block  bg-white text-gray-800 rounded-sm shadow-slate-500 shadow-md">
                <a
                  href="/school/enqiry"
                  class="flex items-center gap-2  md:text-xs lg:text-lg px-4 py-2 hover:bg-slate-200 hover:text-black"
                >
                  <BiDetail size={20} />
                  Enquiry
                </a>
                <a
                  href="/school/admission"
                  class="flex items-center gap-2 md:text-xs lg:text-lg px-4 py-2 hover:bg-slate-200 hover:text-black"
                >
                  <BiUserPlus size={20} />
                  Adminssion
                </a>
                <a
                  href="/school/assigncourse"
                  class="flex items-center gap-2 md:text-xs lg:text-lg text-nowrap px-4 py-2 hover:bg-slate-200 hover:text-black"
                >
                  <BiAddToQueue size={20} />
                  Assign Course
                </a>
              </div>
            </div>
            <div class="relative group">
              <button class="md:text-xs flex items-center gap-4 lg:text-lg capitalize px-4 py-2 rounded-lg focus:outline-none text-white">
                Account <BiChevronDown />
              </button>
              <div class="absolute hidden min-w-56 group-hover:block bg-white text-gray-800 rounded-sm shadow-slate-500 shadow-md mt-0 ">
                <Link
                  to="/account/collection"
                  class="flex items-center gap-2 md:text-xs lg:text-lg px-4 py-2 hover:bg-slate-200 hover:text-black"
                >
                  <BiMoney size={20} />
                  Fees
                </Link>
              </div>
            </div>
            <div class="relative group">
              <button class="md:text-xs flex items-center gap-4 lg:text-lg capitalize px-4 py-2 rounded-lg focus:outline-none text-white">
                setup <BiChevronDown />
              </button>
              <div class="absolute min-w-56 hidden group-hover:block bg-white text-gray-800 rounded-sm shadow-slate-500 shadow-md mt-0 ">
                <a
                  href="/setup/course"
                  class="flex items-center gap-2 md:text-xs lg:text-lg px-4 py-2 hover:bg-slate-200 hover:text-black"
                >
                  <BiBookAdd size={20} />
                  Course
                </a>
                <a
                  href="/setup/school"
                  class="flex items-center gap-2 md:text-xs lg:text-lg px-4 py-2 hover:bg-slate-200 hover:text-black"
                >
                  <BiBuilding size={20} />
                  School Details
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div class="relative group">
            <button class="md:text-xs flex items-center gap-3 py-2 rounded-lg focus:outline-none text-white">
              <div className=" flex items-center gap-2">
                <Avatar
                  label={getFirstLetter(localStorage.getItem("email"))}
                  shape="circle"
                  className="uppercase text-black font-bold text-xl"
                />
                <h5 className="italic md:text-xs lg:text-lg text-white">
                  {localStorage.getItem("email")}
                </h5>
              </div>
              <BiChevronDown size={20} />
            </button>
            <div class="absolute hidden min-w-56 group-hover:block bg-white text-gray-800 rounded-sm shadow-slate-500 shadow-md mt-0 ">
              <a
                href="#"
                class="w-full flex items-center gap-3 md:text-xs lg:text-lg text-nowrap px-4 py-2 hover:bg-slate-200 hover:text-black"
              >
                <BiPhone size={20} />
                Contact
              </a>
              <a
                onClick={confirm1}
                href="#"
                class="w-full flex items-center gap-3 md:text-xs lg:text-lg text-nowrap px-4 py-2 hover:bg-slate-200 hover:text-black"
              >
                <BiLogOut size={20} />
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20" />
    </>
  );
}

export default NavBar;
