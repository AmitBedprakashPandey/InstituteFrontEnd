import NavBar from "../NavBar";
import { Menu } from "primereact/menu";
import { PanelMenu } from "primereact/panelmenu";
import { useState } from "react";
import SchoolForm from "../../Utilites/SchoolForm";
import { FaSchool, FaBuildingColumns } from "react-icons/fa6";
import CourseType from "./tab/CourseType";
import { Outlet, useNavigate } from "react-router-dom";
export default function School(params) {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const items = [
    {
      label: `School Details`,
      icon: <FaSchool size={20} className="mr-3" />,
      command: () => setSelectedItem("school"),
    },
    // {
    //   label: "Common Data",
    //   items: [
    //     {
    //       label: "Course Type",
    //       command: () => setSelectedItem("Course Type"),
    //     },
    //     {
    //       label: "Payment Mode",
    //       command: () => setSelectedItem("Payment Mode"),
    //     },
    //   ],
    // },
    {
      label: "Account",
      icon: <FaBuildingColumns size={20} className="mr-3" />,
      items: [
        {
          label: "- Bank Details",
          command: () => setSelectedItem("bank"),
        },
      ],
    },
  ];
  const renderContent = () => {
    switch (selectedItem) {
      case "school":
        return (
          <div className="flex justify-center">
            <SchoolForm />
          </div>
        );
      case "Course Type":
        return (
          <div className="p-5">
            <CourseType />
          </div>
        );
      case "Payment Mode":
        return <div className="p-5"></div>;
      case "bank":
        return <div>Bank Details Content</div>;
      default:
        return <div>Select a menu item to see the content.</div>;
    }
  };

  return (
    <>
      <div className="flex gap-2 h-full">
        <div className="w-[250px] bg-white sticky shadow-gray-400 shadow-lg">
          <PanelMenu
            model={items}
            className="w-full"
            itemTemplate={(item, options) => {
              const isActive = selectedItem === item.label;
              return (
                <div
                  className={isActive ? "p-panelmenu-header-active" : ""}
                  onClick={options.onClick}
                >
                  <span
                    className={
                      isActive ? "p-menuitem-link-active" : "p-menuitem-link"
                    }
                  >
                    {item.label}
                  </span>
                </div>
              );
            }}
          />
        </div>
        <div className="flex-1 bg-white shadow-gray-400 shadow-lg p-2">
          {renderContent()}
        </div>
      </div>
    </>
  );
}
