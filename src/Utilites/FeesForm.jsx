import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { BiCheck, BiCheckCircle, BiSave, BiUpload } from "react-icons/bi";
import { Toast } from "primereact/toast";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdmissionbyId } from "../Redux/Slice/AdmissionSlice";
import { getAssignCoursebyId } from "../Redux/Slice/AssignCourseSlice";
import { getCoursebyId } from "../Redux/Slice/CourseSlice";
import {
  createFees,
  findBalanceAmtbyStudentName,
  updateFees,
} from "../Redux/Slice/FeesSlice";
import { getPaymentModeAll } from "../Redux/Slice/PaymentModeSlice";
import { getSchoolbyId } from "../Redux/Slice/SchoolSlicse";
import { Checkbox } from "primereact/checkbox";
import {
  getFeesMonthbyId,
  createFeesMonth,
  updateFeesMonth,
  eraseMessError,
} from "../Redux/Slice/FeesMonthSlise";

export default function FeesCollection({ mode, data }) {
  const [formData, setFormData] = useState();
  const toast = useRef();
  const dispatch = useDispatch();
  const [foundData, setFoundData] = useState();
  const { loading, message, error } = useSelector((state) => state.Fees);
  const { admission } = useSelector((state) => state.Admission);
  const { course } = useSelector((state) => state.Course);
  const { AssignCourse } = useSelector((state) => state.AssignCourse);
  const { userid } = useSelector((state) => state.UserAuth);
  const { PaymentMode } = useSelector((state) => state.PayementMode);
  const { School } = useSelector((state) => state.School);
  const { Fees } = useSelector((state) => state.Fees);
  const { FeesMonth } = useSelector((state) => state.FeesMonth);
  const [checkedMonths, setCheckedMonths] = useState([]);
  const formDataHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      userid: userid,
      date: new Date(),
    });
  };

  useLayoutEffect(() => {
    if (data) {
      setFormData(data);
    }
    if (!data) {
      dispatch(eraseMessError());
    }
  }, [data]);

  useLayoutEffect(() => {
    dispatch(getAdmissionbyId(userid));
    dispatch(getCoursebyId(userid));
    dispatch(getSchoolbyId(userid));
    dispatch(getPaymentModeAll());
  }, [dispatch, userid]);

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
    setFoundData(
      admission.filter((item) => item.studentName === formData?.studentname)
    );
    if (foundData) {
      const courseData = course.filter(
        (item) =>
          item.userid === userid && item.courseName === foundData[0]?.course
      );
      setFormData({ ...formData, dueAmt: courseData[0]?.courseFee });
    }
  }, [formData?.studentname]);

  useEffect(() => {
    if (foundData) {
      dispatch(getFeesMonthbyId(foundData[0]?._id)).then((item) =>
        setCheckedMonths(item.payload?.month || [])
      );
    }
  }, [foundData]);

  useEffect(() => {
    const dueAmt = Number(formData?.dueAmt) || 0;
    const dicount = Number(formData?.dicount) || 0;
    const paidAmt = Number(formData?.paidAmt) || 0;
    setFormData({
      ...formData,
      ApayDueAmt:
        mode == "u"
          ? dueAmt - dicount - paidAmt
          : formData?.dueAmt -
            paidAmt -
            dicount -
            Fees?.reduce((acc, item) => acc + item.paidAmt, 0),
    });
  }, [
    formData?.paidAmt,
    formData?.dicount,
    formData?.ApayDueAmt,
    formData?.dueAmt,
  ]);

  const onSave = () => {
    dispatch(createFees(formData)).then(() =>
      dispatch(
        createFeesMonth({
          month: checkedMonths,
          studentid: foundData[0]?._id,
          userid: userid,
        })
      ).then(() => dispatch(eraseMessError))
    );
  };

  const onUpdate = () => {
    dispatch(updateFees(formData)).then(() =>
      dispatch(
        updateFeesMonth({
          ...FeesMonth,
          month: checkedMonths,
          studentid: foundData[0]?._id,
          userid: userid,
        })
      )
    );
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to save ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      acceptClassName: "bg-blue-600 py-3 px-5 text-white",
      rejectClassName: "py-3 px-5 mr-3",
      accept: onSave,
    });
  };

  const confirm2 = () => {
    confirmDialog({
      message: "Are you sure you want to update ?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      acceptClassName: "bg-blue-600 py-3 px-5 text-white",
      rejectClassName: "py-3 px-5 mr-3",
      accept: onUpdate,
    });
  };

  const months = [
    { name: "jan", no: 1 },
    { name: "feb", no: 2 },
    { name: "mar", no: 3 },
    { name: "apr", no: 4 },
    { name: "may", no: 5 },
    { name: "jun", no: 6 },
    { name: "jul", no: 7 },
    { name: "aug", no: 8 },
    { name: "sep", no: 9 },
    { name: "oct", no: 10 },
    { name: "nov", no: 11 },
    { name: "dec", no: 12 },
  ];

  const handleCheckboxChange = (event) => {
    const monthNumber = parseInt(event.target.value);
    if (checkedMonths.includes(monthNumber)) {
      setCheckedMonths(checkedMonths.filter((month) => month !== monthNumber));
    } else {
      setCheckedMonths([...checkedMonths, monthNumber]);
    }
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="grid md:grid-cols-3 w-full gap-4">
        <div className="pt-7">
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
        </div>
        <div className="pt-7">
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
        </div>
        <div className="pt-7">
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
      </div>

      <div className=" grid md:grid-cols-4 w-full gap-4">
        <div className="pt-7">
          <FloatLabel>
            <InputNumber
              disabled
              useGrouping={true}
              id="dueAmt"
              name="dueAmt"
              value={formData?.dueAmt}
              className="w-full"
              onChange={(e) => formDataHandler(e.originalEvent)}
              inputClassName="border-slate-300 border py-3 pl-3 w-full disabled:bg-slate-300 disabled:cursor-not-allowed"
            />
            <label htmlFor="dueAmt">
              Due Amount <strong className="text-red-500">*</strong>
            </label>
          </FloatLabel>
        </div>
        <div className="pt-7">
          <FloatLabel>
            <InputNumber
              useGrouping={false}
              id="dicount"
              name="dicount"
              value={formData?.dicount || 0}
              onChange={(e) => formDataHandler(e.originalEvent)}
              className="w-full"
              inputClassName="border-slate-300 border py-3 pl-3 w-full"
            />
            <label htmlFor="dicount">Discount</label>
          </FloatLabel>
        </div>
        <div className="pt-7">
          <FloatLabel>
            <InputNumber
              id="paidAmt"
              useGrouping={false}
              name="paidAmt"
              value={formData?.paidAmt || 0}
              onChange={(e) => formDataHandler(e.originalEvent)}
              className="w-full"
              inputClassName="border-slate-300 border py-3 pl-3 w-full"
            />
            <label htmlFor="paidAmt">
              Paid Amount <strong className="text-red-500">*</strong>
            </label>
          </FloatLabel>
        </div>
        <div className="pt-7">
          <FloatLabel>
            <InputNumber
              disabled
              id="ApayDueAmt"
              name="ApayDueAmt"
              value={Number(formData?.ApayDueAmt)}
              useGrouping={false}
              onChange={(e) => formDataHandler(e.originalEvent)}
              className="w-full"
              inputClassName="border-slate-300 border py-3 pl-3 w-full disabled:bg-slate-300 disabled:cursor-not-allowed"
            />
            <label htmlFor="ApayDueAmt">
              After Pay Due Amount <strong className="text-red-500">*</strong>
            </label>
          </FloatLabel>
        </div>
      </div>
      <div className="border">
        <table className="w-full flex justify-center">
          <tr className="grid grid-cols-12 gap-20 py-5">
            {months.map((item, index) => (
              <div className="flex items-center">
                <Checkbox
                  inputId="ingredient1"
                  name="pizza"
                  value={item.no}
                  checked={checkedMonths.includes(item.no)}
                  onChange={handleCheckboxChange}
                  className="outline-gray-400 outline outline-1 rounded-lg "
                />
                <label htmlFor="ingredient1" className="ml-2">
                  {item.name}
                </label>
              </div>
            ))}
          </tr>

          {/* <tr className="grid grid-cols-12 gap-20 py-5">
            <td>
              <div className="flex items-center">
                <Checkbox
                  inputId="ingredient1"
                  name="pizza"
                  value="1"
                  checked={months.no === 1 ? true :false}
                  className="border-gray-500 border rounded-lg p-3"
                />
                <label htmlFor="ingredient1" className="ml-2">
                  Jan
                </label>
              </div>
            </td>
            <td>
              <div className="flex items-center">
                <Checkbox
                  inputId="ingredient2"
                  name="pizza"
                  value="Cheese"
                  className="border-gray-500 border rounded-lg p-3"
                />
                <label htmlFor="ingredient2" className="ml-2">
                  Feb
                </label>
              </div>
            </td>
            <td>
              <div className="flex items-center">
                <Checkbox
                  inputId="ingredient3"
                  name="pizza"
                  value="Cheese"
                  className="border-gray-500 border rounded-lg p-3"
                />
                <label htmlFor="ingredient3" className="ml-2">
                  Mar
                </label>
              </div>
            </td>
            <td>
              <div className="flex items-center">
                <Checkbox
                  inputId="ingredient4"
                  name="pizza"
                  value="Cheese"
                  className="border-gray-500 border rounded-lg p-3"
                />
                <label htmlFor="ingredient4" className="ml-2">
                  Apr
                </label>
              </div>
            </td>
            <td>
              <div className="flex items-center">
                <Checkbox
                  inputId="ingredient5"
                  name="pizza"
                  value="Cheese"
                  className="border-gray-500 border rounded-lg p-3"
                />
                <label htmlFor="ingredient5" className="ml-2">
                  May
                </label>
              </div>
            </td>
            <td>
              <div className="flex items-center">
                <Checkbox
                  inputId="ingredient6"
                  name="pizza"
                  value="Cheese"
                  className="border-gray-500 border rounded-lg p-3"
                />
                <label htmlFor="ingredient6" className="ml-2">
                  Jun
                </label>
              </div>
            </td>
            <td>
              <div className="flex items-center">
                <Checkbox
                  inputId="ingredient7"
                  name="pizza"
                  value="Cheese"
                  className="border-gray-500 border rounded-lg p-3"
                />
                <label htmlFor="ingredient7" className="ml-2">
                  Jul
                </label>
              </div>
            </td>
            <td>
              <div className="flex items-center">
                <Checkbox
                  inputId="ingredient8"
                  name="pizza"
                  value="Cheese"
                  className="border-gray-500 border rounded-lg p-3"
                />
                <label htmlFor="ingredient8" className="ml-2">
                  Aug
                </label>
              </div>
            </td>
            <td>
              <div className="flex items-center">
                <Checkbox
                  inputId="ingredient9"
                  name="pizza"
                  value="Cheese"
                  className="border-gray-500 border rounded-lg p-3"
                />
                <label htmlFor="ingredient9" className="ml-2">
                  Sep
                </label>
              </div>
            </td>
            <td>
              <div className="flex items-center">
                <Checkbox
                  inputId="ingredient10"
                  name="pizza"
                  value="Cheese"
                  className="border-gray-500 border rounded-lg p-3"
                />
                <label htmlFor="ingredient10" className="ml-2">
                  Oct
                </label>
              </div>
            </td>
            <td>
              <div className="flex items-center">
                <Checkbox
                  inputId="ingredient11"
                  name="pizza"
                  value="Cheese"
                  className="border-gray-500 border rounded-lg p-3"
                />
                <label htmlFor="ingredient11" className="ml-2">
                  Nov
                </label>
              </div>
            </td>
            <td>
              <div className="flex items-center">
                <Checkbox
                  inputId="ingredient12"
                  name="pizza"
                  value="Cheese"
                  className="border-gray-500 border rounded-lg p-3"
                />
                <label htmlFor="ingredient12" className="ml-2">
                  Dec
                </label>
              </div>
            </td>
          </tr> */}
        </table>
      </div>
      <div className="grid md:grid-cols-4 w-full gap-3">
        <div className="pt-7">
          <FloatLabel>
            <InputNumber
              id="admissionFee"
              name="admissionFee"
              value={formData?.admissionFee}
              className="w-full"
              inputClassName="border-slate-300 border pl-3 w-full h-12"
              useGrouping={false}
              onChange={(e) => formDataHandler(e.originalEvent)}
            />
            <label htmlFor="admissionFee">Admission Fee</label>
          </FloatLabel>
        </div>
        <div className="pt-7">
          <FloatLabel>
            <InputNumber
              className="w-full"
              inputClassName="border-slate-300 border pl-3 w-full h-12"
              id="annualFee"
              name="annualFee"
              value={formData?.annualFee}
              useGrouping={false}
              onChange={(e) => formDataHandler(e.originalEvent)}
            />
            <label htmlFor="annualFee">Annual Fee </label>
          </FloatLabel>
        </div>
        <div className="pt-7">
          <FloatLabel>
            <InputNumber
              className="w-full"
              inputClassName="border-slate-300 border pl-3 w-full h-12"
              id="tuitionFee"
              name="tuitionFee"
              value={formData?.tuitionFee}
              useGrouping={false}
              onChange={(e) => formDataHandler(e.originalEvent)}
            />
            <label htmlFor="tuitionFee">Tuition Fee </label>
          </FloatLabel>
        </div>
        <div className="pt-7">
          <FloatLabel>
            <InputNumber
              className="w-full"
              inputClassName="border-slate-300 border pl-3 w-full h-12"
              id="transportFee"
              name="transportFee"
              value={formData?.transportFee}
              useGrouping={false}
              onChange={(e) => formDataHandler(e.originalEvent)}
            />
            <label htmlFor="transportFee">Transport Fee </label>
          </FloatLabel>
        </div>
      </div>

      <div className="grid md:grid-cols-2 w-full gap-3">
        <div className="pt-7">
          <FloatLabel>
            <InputNumber
              inputClassName="border-slate-300 border pl-3 w-full h-12"
              id="examFee"
              name="examFee"
              className="w-full"
              value={formData?.examFee}
              useGrouping={false}
              onChange={(e) => formDataHandler(e.originalEvent)}
            />
            <label htmlFor="examFee">Exam Fee</label>
          </FloatLabel>
        </div>
        <div className="pt-7">
          <FloatLabel>
            <InputNumber
              className="w-full"
              inputClassName="border-slate-300 border pl-3 w-full h-12"
              id="regFee"
              name="regFee"
              value={formData?.regFee}
              useGrouping={false}
              onChange={(e) => formDataHandler(e.originalEvent)}
            />
            <label htmlFor="regFee">Reg Fee </label>
          </FloatLabel>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="pt-7">
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
        </div>
        <div className="pt-7">
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
      </div>

      <div className="mt-7 flex justify-end">
        {mode === "s" ? (
          <Button
            disabled={
              formData?.date &&
              formData?.paymentMode &&
              formData?.studentname &&
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
              formData?.paidAmt &&
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
