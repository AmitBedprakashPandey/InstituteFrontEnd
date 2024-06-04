import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCourse,
  getclear,
  updateCourse,
} from "../Redux/Slice/CourseSlice";

function CourseForm({ mode, data }) {
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();
  const { userid } = useSelector((state) => state.UserAuth);

  const formDatahandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      userid: userid,
    });
  };

  const countries = [
    { name: "Australia", code: "AU" },
    { name: "Brazil", code: "BR" },
    { name: "China", code: "CN" },
    { name: "Egypt", code: "EG" },
    { name: "France", code: "FR" },
    { name: "Germany", code: "DE" },
    { name: "India", code: "IN" },
    { name: "Japan", code: "JP" },
    { name: "Spain", code: "ES" },
    { name: "United States", code: "US" },
  ];

  useEffect(() => {
    if (mode === "u") {
      setFormData(data);
    }
  }, [data]);

  const onSave = () => {
    dispatch(createCourse(formData));
  };

  const onUpdate = () => {
    dispatch(updateCourse(formData));
  };

  const confirm1 = (e) => {
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

  const confirm2 = (e) => {
    confirmDialog({
      message: "Are you sure you want to update ?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "accept",
      acceptClassName: "px-4 py-3 bg-cyan-500 text-white",
      rejectClassName: "px-4 py-3",
      accept: onUpdate,
    });
  };

  return (
    <div className="relative">
      <div className="flex flex-col gap-5 mt-5">
        <FloatLabel>
          <Dropdown
            id="courseType"
            name="courseType"
            value={formData?.courseType || countries[0]}
            onChange={formDatahandler}
            options={countries}
            optionLabel="name"
            optionValue="code"
            filterPlaceholder="Select a Course"
            className="border w-full"
          />
          <label htmlFor="dcourseType">Course Type</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="courseName"
            required
            className="border h-12 w-full pl-3"
            name="courseName"
            value={formData?.courseName}
            onChange={formDatahandler}
          />
          <label htmlFor="courseName">
            Course Name <strong className="text-red-500">*</strong>
          </label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="courseCode"
            className="border h-12 w-full pl-3"
            name="courseCode"
            value={formData?.courseCode}
            onChange={formDatahandler}
          />
          <label htmlFor="courseCode">Course Code</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="certifiedAuthority"
            className="border h-12 w-full pl-3"
            name="certifiedAuthority"
            value={formData?.certifiedAuthority}
            onChange={formDatahandler}
          />
          <label htmlFor="certifiedAuthority">Certified Authority</label>
        </FloatLabel>
        <FloatLabel>
          <InputNumber
            id="examFee"
            useGrouping={false}
            name="examFee"
            value={formData?.examFee}
            onChange={(e) => formDatahandler(e.originalEvent)}
            inputClassName="pl-3 w-full"
            className="border h-12 w-full"
          />
          <label for="examFee">Exam Fee</label>
        </FloatLabel>
        <FloatLabel>
          <InputNumber
            id="courseFee"
            useGrouping={false}
            name="courseFee"
            value={formData?.courseFee}
            onChange={(e) => formDatahandler(e.originalEvent)}
            inputClassName="pl-3 w-full"
            className="border h-12 w-full"
          />
          <label for="courseFee">Course Fee</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="courseDuration"
            className="border h-12 w-full pl-3"
            name="courseDuration"
            value={formData?.courseDuration}
            onChange={formDatahandler}
          />
          <label htmlFor="email">Course Duration</label>
        </FloatLabel>
      </div>

      <div className="mt-5 flex justify-end">
        {mode === "s" ? (
          <Button
            onClick={confirm1}
            disabled={formData?.courseName ? false : true}
            label="Save"
            className="bg-green-500 w-36 text-white p-3"
          />
        ) : (
          <Button
            onClick={confirm2}
            label="Update"
            className="bg-blue-500 w-36 text-white p-3"
          />
        )}
      </div>
    </div>
  );
}
export default CourseForm;
