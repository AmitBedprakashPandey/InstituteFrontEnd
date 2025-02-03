import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Enquiry from "./Components/Student/Enquiry";
import Admission from "./Components/Student/Admission";
import AssignCourse from "./Components/Student/AssignCourse";
import LoginForm from "./Utilites/LoginForm";
import Course from "./Components/Setup/Course";
import HomePage from "./Components/HomePage";
import FeesCollection from "./Components/Fees/FeesCollection";
import PrintPage from "./Utilites/PrintPage";
import School from "./Components/Setup/School";
import SchoolForm from "./Components/Master/School";
import SchoolDetails from "./Components/SchoolDetails";
import Wizard from "./Components/UI/Wizard";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <NavBar/>
      <div className="flex-1 ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/wizard" element={<Wizard />} />
          <Route path="/master/school" element={<SchoolForm />} />
          <Route path="/school/enqiry" element={<Enquiry />} />
          <Route path="/school/admission" element={<Admission />} />
          <Route path="/school/assigncourse" element={<AssignCourse />} />
          {/* <Route path="/school/form" element={<SchoolDetails />} /> */}
          <Route path="/setup" element={<School />}>
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
