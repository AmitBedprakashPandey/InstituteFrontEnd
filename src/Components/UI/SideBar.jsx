import { Badge } from "primereact/badge";
import { PanelMenu } from "primereact/panelmenu";
import { PiMinus, PiGear, PiPhone, PiBank, PiBuilding } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

export default function Drawer(params) {
  const navigate = useNavigate();

  const itemRenderer = (item, options) => (
    <Link to={item?.url} className="">
    <div
      className="w-full relative flex items-center bg-transparent duration-200 hover:bg-blue-300 dark:bg-slate-800 py-3 px-6 cursor-pointer "
      onClick={options.onClick}
    >
      <span className={`text-primary dark:text-white flex items-center`}>
        {item.icon}
      </span>
      <span className={`ml-1 font-medium capitalize dark:text-white`}>{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </div>
      </Link>
  );

  const itemListRenderer = (item, options) => (
    <Link
      to={item.url}
      className="flex items-center pl-6 dark:bg-slate-800  py-3 cursor-pointer"
      onClick={options.onClick}
    >
      <span className={`text-primary flex items-center`}>{<PiMinus className="dark:text-white" />}</span>
      <span className={`mx-2 font-medium dark:text-white`}>{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </Link>
  );

  const items = [
    // {
    //   label: "Master",
    //   icon: <MdManageAccounts  size={30} className="" />,
    //   template: itemRenderer,
    //   // badge: 5,
    //   items: [
    //     {
    //       label: "School",
    //       url: "master/school",
    //       template: itemListRenderer,
    //     },
    //     {
    //       label: "Course",
    //       template: itemListRenderer,
    //     },
    //     {
    //       label: "Payment",
    //       template: itemListRenderer,
    //     },
    //     {
    //       label: "Finance Year",
    //       template: itemListRenderer,
    //     },
    //     {
    //       label: "Admission Number",
    //       template: itemListRenderer,
    //     },
    //     {
    //       label: "Roll Number",
    //       template: itemListRenderer,
    //     },
    //   ],
    // },
    {
      label: "Student",
      icon: <PiBuilding  size={20} className="w-7 pr-2" />,
      template: itemRenderer,
      items: [
        {
          label: "Enquiry",
          template:itemListRenderer,
          url: "student/enqiry",
        },
        {
          label: "Admission",
          template:itemListRenderer,
          url: "student/admission",
        },
        {
          label: "Student List",
          template:itemListRenderer,
          url: "student/studentlist",
        },
        {
            label: "Attendance",
            template:itemListRenderer,
            url: "",
          },
      ],
    },
    {
      label: "Account",
      icon: <PiBank  size={20} className="w-7 pr-2" />,
      template: itemRenderer,
      items: [
        {
          label: "Fees",
          template:itemListRenderer,
          command: () => navigate("/account/collection"),
        },
      ],
    },
    {
        label: "Settings",
        icon: <PiGear  size={20} className="w-7 pr-2" />,
        url:"setting",
        template: itemRenderer,
        //   command: () => {
            //     setVisible2(true);
            //     setVisible(false);
            //   },
        },
        {
          label: "Contact us",
          icon: <PiPhone  size={20} className="w-7 pr-2" />,
          template: itemRenderer,
        //   command: () => {
        //     setVisible2(true);
        //     setVisible(false);
        //   },
        },
  ];

  return (
    <div className="w-64 bg-white dark:bg-slate-800">
      <PanelMenu model={items}/>
    </div>
  );
}
