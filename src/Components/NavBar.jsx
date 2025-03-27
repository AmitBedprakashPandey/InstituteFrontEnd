import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/Slice/UserSlice";
import { Dialog } from "primereact/dialog";
import {
  BiChevronDown, BiLogOut,
  BiMenu, BiMoon,
  BiPhone,
  BiSun
} from "react-icons/bi";


function NavBar() {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { School } = useSelector((state) => state.School);
  const { userid } = useSelector((state) => state.UserAuth);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const getFirstLetter = (str) => {
    if (!str) return "";
    return str.trim().charAt(0); // Correct usage of charAt
  };

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
      // accept,
      // reject
    });
  };



  return (
    <>
      <ConfirmDialog position="center" className="m-5" />
      <Dialog
        header="Contact us"
        visible={visible2}
        onHide={() => setVisible2(false)}
        className="w-96 h-96 dark:bg-slate-800"
        headerClassName="dark:bg-slate-800 dark:text-white"
        contentClassName="dark:bg-slate-800 dark:text-white"
      />
      <div className="relative flex-1  bg-blue-900 dark:bg-slate-800 border-slate-600 dark:border-b z-40 flex items-center justify-between  py-2 px-3 md:px-5 shadow-md">
        <div className="flex items-center">
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setVisible(true)}
              icon={<BiMenu size={30} color="#fff" />}
              className="lg:hidden"
            />
            <h1 className="flex items-center gap-5 text-white capitalize font-bold md:text-xs lg:text-lg">
              <Avatar
                size="normal"
                shape="circle"
                image={School?.schoolPhoto}
              />
              {School?.schoolName || "School Name"}
            </h1>
          </div>
          {/* <div className="hidden md:hidden lg:block ml-8">
            <div className="flex items-center">
              <div className="relative">
                <Link
                  to="/"
                  className="text-xs md:text-base capitalize px-4 py-2 rounded-lg focus:outline-none text-white"
                >
                  Home
                </Link>
              </div>
              <div className="relative group">
                <button className="text-xs md:text-base flex items-center gap-4 capitalize px-4 py-2 rounded-lg focus:outline-none text-white">
                  student <BiChevronDown />
                </button>
                <div className="absolute hidden min-w-56 group-hover:block  bg-white text-gray-800 rounded-sm shadow-slate-500 shadow-md">
                  <Link
                    to="/school/enqiry"
                    className="flex items-center gap-2  md:text-xs lg:text-lg px-4 py-2 hover:bg-slate-200 hover:text-black"
                  >
                    <BiDetail size={20} />
                    Enquiry
                  </Link>
                  <Link
                    to="/school/admission"
                    className="flex items-center gap-2 md:text-xs lg:text-lg px-4 py-2 hover:bg-slate-200 hover:text-black"
                  >
                    <BiUserPlus size={20} />
                    Adminssion
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <button className="text-xs md:text-base flex items-center gap-4 capitalize px-4 py-2 rounded-lg focus:outline-none text-white">
                  Account <BiChevronDown />
                </button>
                <div className="absolute hidden min-w-56 group-hover:block bg-white text-gray-800 rounded-sm shadow-slate-500 shadow-md mt-0 ">
                  <Link
                    to="/account/collection"
                    className="flex items-center gap-2 md:text-xs lg:text-lg px-4 py-2 hover:bg-slate-200 hover:text-black"
                  >
                    <BiMoney size={20} />
                    Fees
                  </Link>
                </div>
              </div>
              <div className="relative">
                <Link
                  to={"/setup"}
                  className="text-xs md:text-base flex items-center gap-4 capitalize px-4 py-2 rounded-lg focus:outline-none text-white"
                >
                  setup
                </Link>
                <div className="absolute min-w-56 hidden group-hover:block bg-white text-gray-800 rounded-sm shadow-slate-500 shadow-md mt-0 ">
                  <Link
                    to="/setup/course"
                    className="flex items-center gap-2 md:text-xs lg:text-lg px-4 py-2 hover:bg-slate-200 hover:text-black"
                  >
                    <BiBookAdd size={20} />
                    Course
                  </Link>
                  <Link
                    to="/setup/school"
                    className="flex items-center gap-2 md:text-xs lg:text-lg px-4 py-2 hover:bg-slate-200 hover:text-black"
                  >
                    <BiBuilding size={20} />
                    School Details
                  </Link>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        <div className="flex items-center gap-10">
          <div className="relative hidden lg:block lg:flex items-center gap-3">
            <label className="text-white">Session :</label>
            <Dropdown className="h-8 bg-transparent border border-white/40" />
          </div>
          <div>
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? (
                <BiSun color="#fff" size={25} />
              ) : (
                <BiMoon color="#fff" size={25} />
              )}
            </button>
          </div>
          <div className="relative group">
            <button className="md:text-xs flex items-center gap-3 py-2 rounded-lg focus:outline-none text-white">
              <div className="flex items-center gap-2">
                <Avatar
                  label={getFirstLetter(localStorage.getItem("email"))}
                  shape="circle"
                  className="uppercase text-black font-bold text-xl"
                />
                <h5 className="hidden md:hidden lg:block italic md:text-xs lg:text-lg text-white">
                  {localStorage.getItem("email") || "pamit8925@gmail.com"}
                </h5>
              </div>
              <BiChevronDown size={20} />
            </button>
            <div className="absolute right-0 hidden min-w-56 group-hover:block bg-white text-gray-800 rounded-lg shadow-slate-500 shadow-md mt-0">
              <button
                onClick={() => setVisible2(true)}
                className="w-full hidden lg:block lg:flex border-b items-center gap-3 md:text-xs lg:text-lg text-nowrap px-4 py-2 hover:bg-slate-200 hover:text-black"
              >
                <BiPhone size={20} />
                Contact
              </button>
              <Link
                onClick={confirm1}
                to="#"
                className="w-full flex items-center gap-3 md:text-xs lg:text-lg text-nowrap px-4 py-2 hover:bg-slate-200 hover:text-black"
              >
                <BiLogOut size={20} />
                Logout
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full mt-20" /> */}
      
    </>
  );
}

export default NavBar;
