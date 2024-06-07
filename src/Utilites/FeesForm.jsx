import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import {BiSave , BiUpload} from 'react-icons/bi';
import { Toast } from "primereact/toast";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmissionbyId } from "../Redux/Slice/AdmissionSlice";
import { getAssignCoursebyId } from "../Redux/Slice/AssignCourseSlice";
import { getCoursebyId } from "../Redux/Slice/CourseSlice";
import { createFees, updateFees } from "../Redux/Slice/FeesSlice";
import { getPaymentModeAll } from "../Redux/Slice/PaymentModeSlice";

export default function FeesCollection({ mode, data }) {
  const [formData, setFormData] = useState();
  const toast = useRef();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.Fees);
  const { admission } = useSelector((state) => state.Admission);
  const { course } = useSelector((state) => state.Course);
  const { AssignCourse } = useSelector((state) => state.AssignCourse);
  const { userid } = useSelector((state) => state.UserAuth);
  const { PaymentMode } = useSelector((state) => state.PayementMode);
  const formDataHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      userid: userid,
    });
  };
  useLayoutEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  useLayoutEffect(() => {
    dispatch(getAdmissionbyId(userid));
    dispatch(getAssignCoursebyId(userid));
    dispatch(getCoursebyId(userid));
    dispatch(getPaymentModeAll());
  }, [dispatch,userid]);

  const show = (message) => {
    toast.current.show({ severity: "info", summary: message, life: 1000 });
  };

  useEffect(() => {
    if (message) {
      show(message);
    }
    if (error) {
      show(error);
    }
  }, [message, error]);

  useEffect(() => {
    const foundData = AssignCourse.filter(
      (item) => item.userid && item.studentId === formData?.studentname
    );
    const courseData = course.filter(
      (item) => item.userid && item._Id === foundData[0]?.courseId
    );
    setFormData({ ...formData, dueAmt: courseData[0]?.courseFee });
  }, [formData?.studentname,AssignCourse,course,admission]);

  useEffect(() => {
    const dueAmt = Number(formData?.dueAmt) || 0;
    const dicount = Number(formData?.dicount) || 0;
    const paidAmt = Number(formData?.paidAmt) || 0;
    setFormData({
      ...formData,
      ApayDueAmt: dueAmt - dicount - paidAmt,
    });
  }, [
    formData?.paidAmt,
    formData?.dicount,
    formData?.ApayDueAmt,
    formData?.dueAmt,
  ]);

  const onSave = () => {
    dispatch(createFees(formData));
  };
  const onUpdate = () => {
    dispatch(updateFees(formData));
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to save ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: onSave,
    });
  };

  const confirm2 = () => {
    confirmDialog({
      message: "Are you sure you want to update ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: onUpdate,
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="mt-7 grid grid-cols-3 gap-4">
        <FloatLabel>
          <Calendar
            dateFormat="dd/mm/yy"
            id="date"
            name="date"
            value={new Date(formData?.date || new Date())}
            onChange={formDataHandler}
            inputClassName="border-slate-300 border py-3 pl-3 w-full"
            className="w-full"
          />
          <label htmlFor="date">
            Date <strong className="text-red-500">*</strong>
          </label>
        </FloatLabel>
        <FloatLabel>
          <Dropdown
            id="paymentMode"
            name="paymentMode"
            value={formData?.paymentMode}
            onChange={formDataHandler}
            className="border-slate-300 border pl-3 w-[100%]"
            options={PaymentMode}
            optionLabel="name"
            optionValue="name"
          />
          <label htmlFor="paymentMode">
            Payment Mode <strong className="text-red-500">*</strong>
          </label>
        </FloatLabel>
        <FloatLabel>
          <Dropdown
            id="studentname"
            name="studentname"
            value={formData?.studentname}
            onChange={formDataHandler}
            className="border-slate-300 border pl-3 w-full"
            options={admission}
            optionLabel="studentName"
            optionValue="studentName"
          />
          <label htmlFor="studentname">
            Student Name <strong className="text-red-500">*</strong>
          </label>
        </FloatLabel>
      </div>
      <div className="mt-7 grid grid-cols-4 gap-3">
        <FloatLabel>
          <InputNumber
            disabled
            useGrouping={true}
            id="dueAmt"
            name="dueAmt"
            value={formData?.dueAmt}
            onChange={(e) => formDataHandler(e.originalEvent)}
            inputClassName="border-slate-300 border py-3 pl-3 w-full disabled:bg-slate-300 disabled:cursor-not-allowed"
          />
          <label htmlFor="dueAmt">
            Due Amount <strong className="text-red-500">*</strong>
          </label>
        </FloatLabel>
        <FloatLabel>
          <InputNumber
            useGrouping={false}
            id="dicount"
            name="dicount"
            value={formData?.dicount || 0}
            onChange={(e) => formDataHandler(e.originalEvent)}
            inputClassName="border-slate-300 border py-3 pl-3 w-full"
          />
          <label htmlFor="dicount">
            Discount <strong className="text-red-500">*</strong>
          </label>
        </FloatLabel>
        <FloatLabel>
          <InputNumber
            id="paidAmt"
            useGrouping={false}
            name="paidAmt"
            value={formData?.paidAmt || 0}
            onChange={(e) => formDataHandler(e.originalEvent)}
            inputClassName="border-slate-300 border py-3 pl-3 w-full"
          />
          <label htmlFor="paidAmt">
            Paid Amount <strong className="text-red-500">*</strong>
          </label>
        </FloatLabel>
        <FloatLabel>
          <InputNumber
            disabled
            useGrouping={true}
            id="ApayDueAmt"
            name="ApayDueAmt"
            value={Number(formData?.ApayDueAmt)}
            onChange={(e) => formDataHandler(e.originalEvent)}
            inputClassName="border-slate-300 border py-3 pl-3 w-full disabled:bg-slate-300 disabled:cursor-not-allowed"
          />
          <label htmlFor="ApayDueAmt">
            After Pay Due Amount <strong className="text-red-500">*</strong>
          </label>
        </FloatLabel>
      </div>
      <div className="mt-7 grid grid-cols-2 gap-3">
        <FloatLabel>
          <InputText
            className="border-slate-300 border py-3 pl-3 w-full"
            id="collecteBy"
            name="collecteBy"
            value={formData?.collecteBy}
            onChange={formDataHandler}
          />
          <label htmlFor="collecteBy">
            Collected By <strong className="text-red-500">*</strong>
          </label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            className="border-slate-300 border py-3 pl-3 w-full"
            id="remark"
            name="remark"
            value={formData?.remark}
            onChange={formDataHandler}
          />
          <label htmlFor="remark">Remark </label>
        </FloatLabel>
      </div>
      <div className="mt-7 flex justify-end">
        {mode === "s" ? (
          <Button
            disabled={
              formData?.date &&
              formData?.paymentMode &&
              formData?.studentname &&
              formData?.dicount &&
              formData?.paidAmt &&
              formData?.collecteBy
                ? false
                : true
            }
            label="Save"
            icon={<BiSave size={20} />}
            loading={loading}
            onClick={confirm1}
            className="bg-green-500 hover:bg-green-600 duration-200 flex gap-3 px-6 py-3 text-white"
          />
        ) : (
          <Button
            disabled={
              formData?.date &&
              formData?.paymentMode &&
              formData?.studentname &&
              formData?.dueAmt &&
              formData?.dicount &&
              formData?.paidAmt &&
              formData?.ApayDueAmt &&
              formData?.collecteBy
                ? false
                : true
            }
            label="Update"
            loading={loading}
            onClick={confirm2}
            icon={<BiUpload size={20} />}
            className="bg-blue-500 hover:bg-blue-600 duration-200 flex gap-3 px-6 py-3 text-white"
          />
        )}
      </div>
    </>
  );
}
