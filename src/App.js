import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import Enquiry from "./Components/Student/Enquiry";
import Admission from "./Components/Student/Admission";
import AssignCourse from "./Components/Student/AssignCourse";
import LoginForm from "./Utilites/LoginForm";
import Course from "./Components/Setup/Course";
import HomePage from "./Components/HomePage";
import AdminHomePage from "./Components/Admin/HomePage";
import UserMang from "./Components/Admin/Components/UserMang";
import FeesCollection from "./Components/Fees/FeesCollection";
import PrintPage from "./Utilites/PrintPage";
import School from "./Components/Setup/School";
import SchoolDetails from "./Components/SchoolDetails";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/school/enqiry" element={<Enquiry />} />
        <Route path="/school/admission" element={<Admission />} />
        <Route path="/school/assigncourse" element={<AssignCourse />} />
        <Route path="/school/form" element={<SchoolDetails />} />
        <Route path="/setup/school" element={<School />} />
        <Route path="/setup/course" element={<Course />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/account/collection" element={<FeesCollection />} />
        <Route path="/account/print" element={<PrintPage />} />
      </Routes>
    </>
  );
}

export default App;
