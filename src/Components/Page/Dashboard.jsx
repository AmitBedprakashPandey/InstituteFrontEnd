import QuickCount from "../UI/QuickCount";
import QuickCard from "../UI/QuickCard";
import { FaUserGraduate } from "react-icons/fa";
import { FaCircleInfo, FaMoneyBills } from "react-icons/fa6";
export default function Dashboard(params) {

  const quickLink = [
    {
      lable: "Admission",
      url: "student/admission",
      icon: <FaUserGraduate size={50} color="#fff" />,
    },
    {
      lable: "Enquiry",
      url: "student/enqiry",
      icon: <FaCircleInfo size={50} color="#fff" />,
    },
    {
      lable: "Expenses",
      url: "",
      icon: <FaMoneyBills size={50} color="#fff" />,
    },
  ];

  const quickCount = [
    { lable: "Total Student", icon: "", url: "" },
    { lable: "Enquiry Count", icon: "", url: "" },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 rounded-lg px-3 py-2  dark:bg-slate-800">
        {quickCount.map((item, index) => (
          <QuickCount key={index} item={item} />
        ))}
      </div>
      <div className="px-4 w-full">
        <header className="dark:text-slate-300 font-medium py-3 w-full">
          Quick Link
        </header>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-11 3xl:grid-cols-12 gap-2">
          {quickLink.map((item, index) => (
            <QuickCard item={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
