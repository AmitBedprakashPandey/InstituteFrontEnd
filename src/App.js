import React from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import Enquiry from "./Components/Student/Enquiry";
import Admission from "./Components/Student/Admission";
import Course from "./Components/Student/Course";
import LoginForm from "./Utilites/LoginForm";

function App() {
  return<>
    <NavBar />
    <Routes>
      <Route path="/school/enqiry" element={<Enquiry />} />
      <Route path="/school/admission" element={<Admission />} />
      <Route path="/school/course" element={<Course />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  </>
}

export default App;
