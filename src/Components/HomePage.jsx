import NavBar from "./NavBar";
import CourseCount from "./UI/Count/CourseCount";
import EnquiryCount from "./UI/Count/EnquiryCount";
import StudentCount from "./UI/Count/StudentCount";
import Admisson from "./UI/QuickLink/Admission";
import Enquiry from "./UI/QuickLink/Enquiry";
import Fees from "./UI/QuickLink/Fees";
export default function HomePage(params) {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 rounded-lg shadow-gray-500 shadow m-3 p-3 bg-white">
        <StudentCount />
        <CourseCount />
        <EnquiryCount />
      </div>
      <div className="bg-white px-2 m-5 rounded-lg shadow-gray-500 shadow-md">
        <header className="py-3">Quick Link</header>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 3xl:grid-cols-12 gap-3 p-3">
          <Admisson />
          <Enquiry />
          <Fees />
          <Admisson />
          <Enquiry />
          <Fees />
          <Admisson />
          <Enquiry />
          <Fees />
          <Admisson />
        </div>
      </div>
    </>
  );
}
