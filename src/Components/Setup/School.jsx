import NavBar from "../NavBar";
import { Menu } from "primereact/menu";
import { PanelMenu } from "primereact/panelmenu";
import { useState } from "react";
import SchoolForm from "../../Utilites/SchoolForm";
import CourseType from "./tab/CourseType";
export default function School(params) {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    {
      label: "School Details",
      command: () => setSelectedItem("School Details"),
    },
    {
      label: "Common Data",
      items: [
        {
          label: "Course Type",
          command: () => setSelectedItem("Course Type"),
        },
        {
          label: "Payment Mode",
          command: () => setSelectedItem("Payment Mode"),
        },
      ],
    },
    {
      label: "Account",
      items: [
        {
          label: "Bank Details",
          command: () => setSelectedItem("Bank Details"),
        },
      ],
    },
  ];
  const renderContent = () => {
    switch (selectedItem) {
      case "School Details":
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
        return <div>Payment Mode Content</div>;
      case "Bank Details":
        return <div>Bank Details Content</div>;
      default:
        return <div>Select a menu item to see the content.</div>;
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex gap-3">
        <div className="w-96 bg-white m-3 h-[800px] rounded-md sticky top-16 shadow-gray-400 shadow-lg py-2">
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
        <div className="w-full bg-white m-3 h-[800px] rounded-md sticky top-16 shadow-gray-400 shadow-lg py-2">
          {renderContent()}
        </div>
      </div>
    </>
  );
}
