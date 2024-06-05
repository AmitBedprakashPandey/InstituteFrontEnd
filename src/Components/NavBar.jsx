import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Menubar } from "primereact/menubar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, logout, getProtection } from "../Redux/Slice/UserSlice";
function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getFirstLetter = (str) => {
    if (!str) return "";
    return str.trim().charAt(0); // Correct usage of charAt
  };

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/login");
    }
    dispatch(getUser());
    // dispatch(getProtection())
  }, [navigate]);
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

  const items = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "Student",
      items: [
        {
          label: "Enquiry",
          url: "/school/enqiry",
        },
        {
          label: "Admission",
          url: "/school/admission",
        },
        {
          label: "Course",
          url: "/school/course",
        },
        {
          label: "Assign Course",
          url: "/school/assigncourse",
        },
      ],
    },
    {
      label: "Fees",
      items: [
        {
          label: "Fees Collection",
          url: "/fees/collection",
        },
        {
          label: "Admission",
          url: "/school/admission",
        },
      ],
    },
  ];

  const start = (
    <div className="flex items-center">
      <Avatar
        imageAlt="logo"
        image="https://primefaces.org/cdn/primereact/images/logo.png"
        className="flex align-items-center justify-content-center mr-2"
        size="normal"
      ></Avatar>
      <span>{localStorage.getItem("email")}</span>
    </div>
  );
  const end = (
    <div className="flex items-center gap-5">
      <div className=" flex items-center gap-2">
        <Avatar
          label={getFirstLetter(localStorage.getItem("email"))}
          shape="circle"
          className="uppercase"
        />
        <h5 className="italic">{localStorage.getItem("email")}</h5>
      </div>
      <Button
        label="Logout"
        onClick={confirm1}
        className="bg-cyan-500 text-white px-2 py-1 text-xs"
      />
    </div>
  );

  return (
    <>
      <ConfirmDialog />
      <Menubar
        className="shadow-slate-400 shadow-md px-5 z-50"
        model={items}
        start={start}
        end={end}
      />
    </>
  );
}

export default NavBar;
