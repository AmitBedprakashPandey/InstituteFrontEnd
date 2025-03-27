import SchoolForm from "../../Utilites/SchoolForm";
import NavBar from "../Nabar2";

export default function Master(params) {
  return (
    <>
      <NavBar title={"School From"} />
      <div className="w-full dark:bg-slate-800">

      <SchoolForm />
      </div>
    </>
  );
}
