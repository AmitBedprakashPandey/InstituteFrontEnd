import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmissionbyId } from "../Redux/Slice/AdmissionSlice";
import { getCoursebyId } from "../Redux/Slice/CourseSlice";
import {
  createAssignCourse,
  updateAssignCourse,getclear
} from "../Redux/Slice/AssignCourseSlice";
import { Toast } from "primereact/toast";

export default function AssignCourseForm({ mode }) {
  const [formData, setFormData] = useState({ studentId: null, courseId: null });
  const dispatch = useDispatch();
  const toast = useRef();
  const { userid } = useSelector((state) => state.UserAuth);
  const { admission } = useSelector((state) => state.Admission);
  const { course } = useSelector((state) => state.Course);
  const { message, error, loading } = useSelector(
    (state) => state.AssignCourse
  );

  const formDatahandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value,userid : userid });
  };
 
  useEffect(() => {
    dispatch(getAdmissionbyId(userid));
    dispatch(getCoursebyId(userid));
  }, [dispatch, userid]);



  const onSave = () => {
    dispatch(createAssignCourse(formData));
  };

  const onUpdate = () => {
    dispatch(updateAssignCourse(formData));
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to save ?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "accept",
      acceptClassName: "px-4 py-3 bg-cyan-500 text-white",
      rejectClassName: "px-4 py-3",
      accept: onSave,
    });
  };

  const confirm2 = () => {
    confirmDialog({
      message: "Are you sure you want to update ?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "px-4 py-3 bg-cyan-500 text-white",
      rejectClassName: "px-4 py-3",
      accept: onUpdate,
    });
  };

  return (
    <>
      <div className="flex flex-col mt-5">
        <FloatLabel>
          <Dropdown
            id="studentId"
            value={formData?.studentId}
            onChange={formDatahandler}
            options={admission}
            name="studentId"
            optionLabel="studentName"            
            filter
            placeholder="Select student"
            filterPlaceholder="Select student"
            className="h-12 w-80 border-slate-500 border rounded-md"
            inputClassName="pl-3"
          />
          <label htmlFor="studentId">Select Student</label>
        </FloatLabel>
      </div>

      <div className="flex flex-col mt-7">
        <FloatLabel>
          <Dropdown
            id="courseId"
            name="courseId"
            value={formData.courseId}
            onChange={formDatahandler}
            options={course}
            optionLabel="courseName"            
            filter
            placeholder="Select Course"
            filterPlaceholder="Select Course"
            className="h-12 w-80  border-slate-500 border rounded-md"
            inputClassName="pl-3"
          />
          <label htmlFor="courseId">Select Course</label>
        </FloatLabel>
      </div>
      <div className="flex justify-end">
        {mode === "s" ? (
          <Button
            label="Save"
            disabled={formData.courseId && formData.studentId ? false : true}
            onClick={confirm1}
            className="bg-green-500 text-white py-3 px-8 mt-3 "
          />
        ) : (
          <Button
            label="Update"
            onClick={confirm2}
            className="bg-blue-500 text-white py-3 px-8 mt-3 "
          />
        )}
      </div>
    </>
  );
}
