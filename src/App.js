import React from "react";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Enquiry from "./Components/Student/Enquiry";
import Admission from "./Components/Student/Admission";
import AssignCourse from "./Components/Student/AssignCourse";
import LoginForm from "./Utilites/LoginForm";
import Course from "./Components/Setup/Course";
import HomePage from "./Components/HomePage";
import FeesCollection from "./Components/Fees/FeesCollection";
import PrintPage from "./Utilites/PrintPage";
import SchoolForm from "./Components/Master/School";
import SchoolDetails from "./Components/SchoolDetails";
import Wizard from "./Components/UI/Wizard";
import Setup from "./Components/Setup/Setup";
import Dashboard from "./Components/Page/Dashboard";
import StudentList from "./Components/Student/StudentList";
import Settings from "./Components/Page/Setting";

function App() {
  return (
    <div className="relative h-screen w-screen dark:bg-slate-800">
      <div className="">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<HomePage />}>
            <Route index element={<Dashboard />} />
            <Route path="student/admission" element={<Admission />} />
            <Route path="student/enqiry" element={<Enquiry />} />
            <Route path="student/studentlist" element={<StudentList />} />
            <Route path="wizard" element={<Wizard />} />
            <Route path="master/school" element={<SchoolForm />} />
            <Route path="setting" element={<Settings />} />
          </Route>
          <Route path="/school/assigncourse" element={<AssignCourse />} />
          {/* <Route path="/school/form" element={<SchoolDetails />} /> */}
          <Route path="/setup" element={<Setup />}>
            <Route path="course" element={<Course />} />
            <Route path="sss" element={<SchoolDetails />} />
          </Route>
          <Route path="/account/collection" element={<FeesCollection />} />
          <Route path="/account/print" element={<PrintPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
