import NavBar from "./NavBar";
import CourseCount from "./UI/Count/CourseCount";
import StudentCount from "./UI/Count/StudentCount";
import Admisson from "./UI/QuickLink/Admission";
import Enquiry from "./UI/QuickLink/Enquiry";
import Fees from "./UI/QuickLink/Fees";
export default function HomePage(params) {
    return<>
<NavBar/>

<div className="flex gap-3 rounded-lg shadow-gray-500 shadow-md m-5 p-3 bg-white">
<StudentCount />
<CourseCount/>

</div>
<div className="bg-white px-3 m-5 rounded-lg shadow-gray-500 shadow-md">
<header className="py-3">
    Quick Link
</header>
<div className="flex gap-3 pb-3">
    <Admisson/>
    <Enquiry/>
    <Fees/>
</div>
</div>
    </>
}