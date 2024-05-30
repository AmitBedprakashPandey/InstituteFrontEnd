import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { BiGroup } from "react-icons/bi";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
function NavBar() {
  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to logout ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      acceptClassName: "p-3 bg-cyan-500 text-white",
      rejectClassName: "p-3 mr-5",
      // accept,
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
      ],
    },
  ];
  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      className="mr-2 w-16"
    ></img>
  );
  const end = (
    <div className="flex items-center gap-5">
      <div className=" flex items-center gap-2">
        <h5>Login user name</h5>
        <Avatar
          image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          shape="circle"
        />
      </div>
      <Button
        label="Logout"
        onClick={confirm1}
        className="bg-cyan-500 text-white px-2 py-1"
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
