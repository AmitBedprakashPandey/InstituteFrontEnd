import { configureStore } from "@reduxjs/toolkit";
import EnquirySlice from "../Redux/Slice/EnquirySlice";
import AdmissionSlice from "./Slice/AdmissionSlice";
import AssignCourseSlice from "./Slice/AssignCourseSlice";
import CourseSlice from "./Slice/CourseSlice";
import CourseTypeSlice from "./Slice/CourseTypeSlice";
import FeesSlice from "./Slice/FeesSlice";
import FoundationSlice from "./Slice/FoundationSlice";
import GenderSlice from "./Slice/GenderSlice";
import "./Slice/Http";
import PaymentModeSlice from "./Slice/PaymentModeSlice";
import ReligionSlice from "./Slice/ReligionSlice";
import SchoolSlicse from "./Slice/SchoolSlicse";
import StateSlice from "./Slice/StateSlice";
import UserSlice from "./Slice/UserSlice";
const Store = configureStore({
  reducer: {
    Enquiry: EnquirySlice,
    Admission: AdmissionSlice,
    UserAuth: UserSlice,
    Course: CourseSlice,
    AssignCourse: AssignCourseSlice,
    Fees:FeesSlice,
    CourseType:CourseTypeSlice,
    State:StateSlice,
    Gender :GenderSlice,
    Religion:ReligionSlice,
    Foundation:FoundationSlice,
    PayementMode:PaymentModeSlice,
    School:SchoolSlicse
  },
});
export default Store;
