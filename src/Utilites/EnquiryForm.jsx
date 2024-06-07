import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import Compressor from "compressorjs";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Image } from "primereact/image";
import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import {
  createEnquiry,
  updateEnquiry,
} from "../Redux/Slice/EnquirySlice";
import { useDispatch, useSelector } from "react-redux";
import { Toast } from "primereact/toast";
import { getCoursebyId } from "../Redux/Slice/CourseSlice";
import { getStateAll } from "../Redux/Slice/StateSlice";
import { getGenderAll } from "../Redux/Slice/GenderSlice";
import { getReligionAll } from "../Redux/Slice/ReligionSlice";
import { BiSave,BiUpload } from "react-icons/bi";
import moment from "moment/moment";
function EnquiryForm({ mode, data }) {
  const [formData, setFormData] = useState();
  const [selectedData, setSelectedData] = useState();
  const { message, error } = useSelector((state) => state.Enquiry);
  const dispatch = useDispatch();
  const toast = useRef();
  const { userid } = useSelector((state) => state.UserAuth);
  const { course } = useSelector((state) => state.Course);
  const { State } = useSelector((state) => state.State);
  const { Gender } = useSelector((state) => state.Gender);
  const { Religion } = useSelector((state) => state.Religion);

  const formDatahandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      userid: userid,
    });
  };

  const show = (message) => {
    toast.current.show({ severity: "info", summary: message, life: 3000 });
  };

  const showWarn = (error) => {
    toast.current.show({
      severity: "warn",
      summary: error,
      life: 3000,
    });
  };
  useEffect(() => {
    setSelectedData(
      course.filter((item) => item.courseName === formData?.course)
    );
  }, [formData?.course,course]);
  useLayoutEffect(() => {
    dispatch(getCoursebyId(userid));
    dispatch(getStateAll());
    dispatch(getGenderAll());
    dispatch(getReligionAll());
  }, [dispatch,userid]);
  useEffect(() => {
    if (message) {
      show(message);
    }
    if (error) {
      showWarn(message);
    }
    if (mode === "u") {
      setFormData(data);
    }
  }, [message, error, data,mode]);

  const handleImageUpload = (event) => {
    return new Promise((resolve, reject) => {
      const file = event; // Accessing the file from event

      try {
        new Compressor(file, {
          quality: 0.45,
          maxWidth: 500,
          resize: false,
          success: async (result) => {
            const base64String = await blobUrlToBase64(result);
            resolve(base64String);
            // You may set the base64 URL to state or perform other actions here
          },
          error(error) {
            console.error("Error compressing image:", error);
            reject(error);
          },
        });
      } catch (error) {
        console.error("Error compressing image:", error);
        reject(error);
      }
    });
  };

  async function blobUrlToBase64(blob) {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  const motherImageHandler = async (e) => {
    try {
      const base64String = await handleImageUpload(e.files[0]);
      setFormData({ ...formData, motherPhoto: base64String });
    } catch (error) {
      console.error("Error handling father image:", error);
    }
  };

  const studentImageHandler = async (e) => {
    try {
      const base64String = await handleImageUpload(e.files[0]);
      setFormData({ ...formData, studentPhoto: base64String });
    } catch (error) {
      console.error("Error handling father image:", error);
    }
  };

  const fatherImageHandler = async (e) => {
    try {
      const base64String = await handleImageUpload(e.files[0]);
      setFormData({ ...formData, fatherPhoto: base64String });
    } catch (error) {
      console.error("Error handling father image:", error);
    }
  };

  const certidicateImageHandler = async (e) => {
    try {
      const base64String = await handleImageUpload(e.files[0]);
      setFormData({ ...formData, certificate: base64String });
    } catch (error) {
      console.error("Error handling father image:", error);
    }
  };

  const onSave = () => {
    dispatch(createEnquiry(formData));
  };

  const onUpdate = () => {
    dispatch(updateEnquiry(formData));
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
      <Toast ref={toast} />

      <div className="flex justify-center items-center gap-5 mt-5">
        <FloatLabel>
          <InputText
            id="StudentName"
            name="studentName"
            value={formData?.studentName}
            onChange={formDatahandler}
            autoFocus
            className="border border-slate-400 md:h-10 h-12 pl-3 w-64"
          />
          <label htmlFor="StudentName">
            Student Name <span className="text-red-500">*</span>
          </label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="fatherName"
            name="fatherName"
            value={formData?.fatherName}
            onChange={formDatahandler}
            fatherName
            className="border border-slate-400 md:h-10 h-12 pl-3 w-64"
          />
          <label htmlFor="fatherName">
            Father Name <span className="text-red-500">*</span>
          </label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="mothername"
            name="motherName"
            autoComplete="motheer name"
            value={formData?.motherName}
            onChange={formDatahandler}
            className="border border-slate-400 md:h-10 h-12 pl-3 w-64"
          />
          <label for="mothername">Mother Name</label>
        </FloatLabel>
        <FloatLabel>
          <Dropdown
            name="course"
            value={formData?.course}
            onChange={formDatahandler}
            options={course}
            optionLabel="courseName"
            optionValue="courseName"
            filterPlaceholder="Select a Course"
            filterInput
            filter
            className="border border-slate-400 w-64 md:h-10 h-12"
          />
          <label htmlFor="dd-city">
            Select a Course <span className="text-red-500">*</span>
          </label>
        </FloatLabel>
      </div>
      <div className="py-3">
        <DataTable
          value={selectedData}
          className="border shadow-gray-500 shadow-sm"
          stripedRows
          showGridlines
        >
          <Column
            field="courseType"
            bodyClassName="md:text-xs text-nowrap"
            headerClassName="bg-blue-800 text-white border md:text-xs text-nowrap"
            header="Course types"
          ></Column>
          <Column
            field="courseName"
            bodyClassName="md:text-xs text-nowrap"
            headerClassName="bg-blue-800 text-white border md:text-xs text-nowrap"
            header="Course Name"
          ></Column>
          <Column
            field="certifiedAuthority"
            bodyClassName="md:text-xs text-nowrap"
            headerClassName="bg-blue-800 text-white border md:text-xs text-nowrap"
            header="Certified Authority"
          ></Column>
          <Column
            field="examFee"
            bodyClassName="md:text-xs text-nowrap"
            headerClassName="bg-blue-800 text-white border md:text-xs text-nowrap"
            header="Exam Fee"
          ></Column>
          <Column
            field="courseFee"
            bodyClassName="md:text-xs text-nowrap"
            headerClassName="bg-blue-800 text-white border md:text-xs text-nowrap"
            header="Course Fee"
          ></Column>
          <Column
            field="courseDuration"
            bodyClassName="md:text-xs text-nowrap"
            headerClassName="bg-blue-800 text-white border md:text-xs text-nowrap"
            header="Donation"
          ></Column>
        </DataTable>
      </div>
      <div className="flex justify-center items-center gap-5 lg:mt-5 md:mt-5">
        <FloatLabel>
          <Calendar
            id="birth_date"
            inputClassName="pl-3 "
            className="border border-slate-400 rounded-md md:h-10 h-12 w-64"
            dateFormat="dd/mm/yy"
            name="dob"
            showIcon
            value={moment(FormData?.dob).format("DD/MM/YYYY")}
            onChange={formDatahandler}
          />
          <label htmlFor="birth_date">
            Date Of Birth <span className="text-red-500">*</span>
          </label>
        </FloatLabel>
        <FloatLabel>
          <Calendar
            id="enquiryDate"
            name="enquiryDate"
            value={moment(FormData?.enquiryDate).format("DD/MM/YYYY")}
            onChange={formDatahandler}
            inputClassName="pl-3"
            showIcon
            className="border border-slate-400 rounded-md md:h-10 h-12 w-64"
          />
          <label htmlFor="fathername">Enquiry Date</label>
        </FloatLabel>
        <FloatLabel>
          <InputNumber
            id="mobileNo"
            useGrouping={false}
            name="mobileNo"
            value={formData?.mobileNo}
            onChange={(e) => formDatahandler(e.originalEvent)}
            maxLength={10}
            inputClassName="pl-3"
            className="border border-slate-400 rounded-md md:h-10 h-12 w-64"
          />
          <label for="mobileNo">
            Mobile No. <span className="text-red-500">*</span>
          </label>
        </FloatLabel>
        <FloatLabel>
          <InputNumber
            id="altMobile"
            name="altMobile"
            value={formData?.altMobile}
            onChange={(e) => formDatahandler(e.originalEvent)}
            useGrouping={false}
            maxLength={10}
            inputClassName="pl-3"
            className="border rounded-md border-slate-400 md:h-10 h-12 w-64"
          />
          <label for="altMobile">Alternate Mobile No. </label>
        </FloatLabel>
      </div>
      <div className="flex justify-center items-center gap-5 lg:mt-7 md:mt-5">
        <FloatLabel>
          <InputText
            id="email"
            className="border rounded-md border-slate-400 md:h-10 h-12 w-64 pl-3"
            name="email"
            autoComplete="email"
            value={formData?.email}
            onChange={formDatahandler}
          />
          <label htmlFor="email">Email</label>
        </FloatLabel>
        <FloatLabel>
          <Dropdown
            id="gender"
            name="gender"
            autoComplete="gender"
            value={formData?.gender}
            onChange={formDatahandler}
            options={Gender}
            optionLabel="gender"
            optionValue="gender"
            filterPlaceholder="Select a Course"
            filter
            className="border rounded-md border-slate-400 w-64 md:h-10 h-12"
          />
          <label htmlFor="gender">Gender</label>
        </FloatLabel>
        <FloatLabel>
          <Dropdown
            id="religion"
            name="religion"
            autoComplete="religion"
            value={formData?.religion}
            onChange={formDatahandler}
            options={Religion}
            optionLabel="religion"
            optionValue="religion"
            filterPlaceholder="Select a Course"
            filter
            className="border rounded-md border-slate-400 w-64 md:h-10 h-12"
          />
          <label htmlFor="religion">Religion</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            className="border rounded-md border-slate-400 md:h-10 h-12 w-64 pl-3"
            id="caste"
            name="caste"
            autoComplete="caste"
            value={formData?.caste}
            onChange={formDatahandler}
          />
          <label htmlFor="caste">Caste</label>
        </FloatLabel>
      </div>
      <div className="flex justify-center items-center gap-5 lg:mt-7 md:mt-5">
        <FloatLabel>
          <InputText
            id="address1"
            name="address1"
            value={formData?.address1}
            onChange={formDatahandler}
            className="border rounded-md border-slate-400 md:h-10 h-12 w-64 pl-3"
          />
          <label htmlFor="address1">Address-1</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="address2"
            name="address2"
            value={formData?.address2}
            onChange={formDatahandler}
            className="border rounded-md border-slate-400 md:h-10 h-12 w-64 pl-3"
          />
          <label htmlFor="address2">Address-2</label>
        </FloatLabel>
        <FloatLabel>
          <InputText
            id="city"
            name="city"
            value={formData?.city}
            onChange={formDatahandler}
            className="border rounded-md border-slate-400 md:h-10 h-12 w-64 pl-3"
          />
          <label for="mothername">City</label>
        </FloatLabel>
        <FloatLabel>
          <Dropdown
            id="state"
            name="state"
            value={formData?.state}
            onChange={formDatahandler}
            options={State}
            optionLabel="state"
            optionValue="state"
            filterPlaceholder="Select a Course"
            filter
            className="border rounded-md border-slate-400 w-64 md:h-10 h-12"
          />
          <label htmlFor="state">State</label>
        </FloatLabel>
      </div>
      <div className="flex justify-start items-center gap-5 lg:mt-7 md:mt-5">
        <FloatLabel>
          <InputText
            id="enquiryBy"
            name="enquiryBy"
            value={formData?.enquiryBy}
            onChange={formDatahandler}
            className="border rounded-md border-slate-400 md:h-10 h-12 w-64 pl-3"
          />
          <label htmlFor="enquiryBy">EnquiryBy</label>
        </FloatLabel>
      </div>
      <div className="flex justify-center items-center gap-5 mt-5">
        <span>
          <label htmlFor="StudentName">Student Photo</label>
          <FileUpload
            mode="basic"
            accept="image/*"
            id="StudentName"
            onSelect={studentImageHandler}
            className="border md:h-10 h-12"
          />

          <Image
            src={formData?.studentPhoto}
            className="w-16 h-16 mt-3 border rounded-md border-slate-400 overflow-hidden"
            preview
          />
        </span>
        <span>
          <label htmlFor="fathername">Father Photo</label>
          <FileUpload
            mode="basic"
            onSelect={fatherImageHandler}
            accept="image/*"
            id="StudentName"
            className="border rounded-md border-slate-400 md:h-10 h-12"
          />
          <Image
            src={formData?.fatherPhoto}
            className="w-16 h-16 mt-3 border rounded-md border-slate-400 overflow-hidden"
            preview
          />
        </span>
        <span>
          <label for="mothername">Mother Photo</label>
          <FileUpload
            mode="basic"
            onSelect={motherImageHandler}
            accept="image/*"
            id="StudentName"
            className="border md:h-10 h-12"
          />
          <Image
            src={formData?.motherPhoto}
            className="w-16 h-16 mt-3 border rounded-md border-slate-400 overflow-hidden"
            preview
          />
        </span>
        <span>
          <label for="mothername">Certificate</label>
          <FileUpload
            mode="basic"
            onSelect={certidicateImageHandler}
            accept="image/*"
            id="StudentName"
            className="border md:h-10 h-12"
          />
          <Image
            src={formData?.certificate}
            className="w-16 h-16 mt-3 border rounded-md border-slate-400 overflow-hidden"
            preview
          />
        </span>
      </div>
      <div className="absolute bottom-0 right-0 ">
        {mode === "s" ? (
          <Button
            onClick={confirm1}
            disabled={
              formData?.studentName &&
              formData?.fatherName &&
              formData?.course &&
              formData?.dob &&
              formData?.mobileNo
                ? false
                : true
            }
            label="Save"
              icon={<BiSave size={20} />}
            className="bg-green-500 hover:bg-green-600 duration-200 flex gap-3 text-white py-3 px-10"
          />
        ) : (
          <Button
            onClick={confirm2}
             icon={<BiUpload size={20} />}
            className="bg-blue-500 hover:bg-blue-600 duration-200 flex gap-3 text-white py-3 px-10"
          />
        )}
      </div>
    </div>
  );
}
export default EnquiryForm;
