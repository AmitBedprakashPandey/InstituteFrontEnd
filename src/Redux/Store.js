import { configureStore } from "@reduxjs/toolkit";
import EnquirySlice from "../Redux/Slice/EnquirySlice";
import "./Slice/Http";
import AdmissionSlice from "./Slice/AdmissionSlice";
import UserSlice from "./Slice/UserSlice";
import CourseSlice from "./Slice/CourseSlice";
import AssignCourseSlice from "./Slice/AssignCourseSlice";
import FeesSlice from "./Slice/FeesSlice";
import CourseTypeSlice from "./Slice/CourseTypeSlice";
const Store = configureStore({
  reducer: {
    Enquiry: EnquirySlice,
    Admission: AdmissionSlice,
    UserAuth: UserSlice,
    Course: CourseSlice,
    AssignCourse: AssignCourseSlice,
    Fees:FeesSlice,
    CourseType:CourseTypeSlice
  },
});
export default Store;