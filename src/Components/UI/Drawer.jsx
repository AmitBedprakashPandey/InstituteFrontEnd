import { PanelMenu } from "primereact/panelmenu";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import {
    BiBookAdd,
    BiBuilding,
    BiChevronDown,
    BiChevronLeft,
    BiChevronRight,
    BiDetail,
    BiLogOut,
    BiMenu,
    BiMoney,
    BiMoon,
    BiPhone,
    BiSun,
    BiUserPlus,
    BiX,
  } from "react-icons/bi";
  import {
    MdAccountBalance,
    MdManageAccounts,
    MdPhone,
    MdSchool,
  } from "react-icons/md";
  import { Badge } from "primereact/badge";
  
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from "primereact/avatar";
  
export default function SideBar(params) {
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const { School } = useSelector((state) => state.School);
  const navigate = useNavigate();
  
    const SideBarHeader = () => {
        return (
          <>
            <div className="flex items-center gap-3">
              <h1 className="flex items-center gap-5 text-white capitalize font-bold text-base">
                <Avatar size="large" shape="circle" image={School?.schoolPhoto} />
                {School?.schoolName || "School Name"}
              </h1>
            </div>
          </>
        );
      };
    
      const itemRenderer = (item, options) => (
        <div
          className="relative flex items-center bg-blue-900 dark:bg-slate-800 px-0 py-3 cursor-pointer "
          onClick={options.onClick}
        >
          <span className={`text-primary flex items-center`}>
            <BiChevronRight color="#fff" size={30} /> {item.icon}
          </span>
          <span className={`mx-2 font-medium text-white`}>{item.label}</span>
          {item.badge && <Badge className="ml-auto" value={item.badge} />}
          {item.shortcut && (
            <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
              {item.shortcut}
            </span>
          )}
        </div>
      );
    
      const itemListRenderer = (item, options) => (
        <Link
          to={item.url}
          className="flex items-center pl-6 bg-blue-900 dark:bg-slate-800  py-3 cursor-pointer"
          onClick={options.onClick}
        >
          {/* <span className={`text-primary flex items-center`}>{item.icon}</span> */}
          <span className={`mx-2 font-medium text-white`}>{item.label}</span>
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
        //   icon: <MdManageAccounts color="#fff" size={30} className="" />,
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
          icon: <MdSchool color="#fff" size={20} className="w-7 pr-2" />,
          template: itemRenderer,
          items: [
            {
              label: "Enquiry",
              command: () => navigate("/school/enqiry"),
            },
            {
              label: "Admission",
              command: () => navigate("/school/admission"),
            },
          ],
        },
        {
          label: "Account",
          icon: <MdAccountBalance color="#fff" size={20} className="w-7 pr-2" />,
          template: itemRenderer,
          items: [
            {
              label: "Fees",
              command: () => navigate("/account/collection"),
            },
          ],
        },
        {
          label: "Contact us",
          icon: <MdPhone color="#fff" size={20} className="w-7 pr-2" />,
          template: itemRenderer,
          command: () => {
            setVisible2(true);
            setVisible(false);
          },
        },
      ];

    return(
        <div className="w-64 border border-red-600">
        <Sidebar
        header={SideBarHeader}
        visible={visible}
        onHide={() => setVisible(false)}
        closeIcon={<BiX size={30} color="#fff" />}
        className="bg-blue-900 dark:bg-slate-800"
      >
        <hr className="opacity-40 py-3" />

        <PanelMenu
          model={items}
        />
      </Sidebar>
        </div>
    )
}