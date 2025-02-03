import Compressor from "compressorjs";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { confirmDialog } from "primereact/confirmdialog";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { FloatLabel } from "primereact/floatlabel";
import { Image } from "primereact/image";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useEffect, useLayoutEffect, useState } from "react";
import { BiSave, BiUpload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  createAdmission,
  updateAdmission,
} from "../Redux/Slice/AdmissionSlice";
import { getfoundationAll } from "../Redux/Slice/FoundationSlice";
import { getGenderAll } from "../Redux/Slice/GenderSlice";
import { getReligionAll } from "../Redux/Slice/ReligionSlice";
import { getStateAll } from "../Redux/Slice/StateSlice";
import { getCoursebyId } from "../Redux/Slice/CourseSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
function AdmissionForm({ mode, data }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState();
  const [selectedData, setSelectedData] = useState();
  const { loading } = useSelector((state) => state.Admission);
  const { userid } = useSelector((state) => state.UserAuth);
  const { State } = useSelector((state) => state.State);
  const { Gender } = useSelector((state) => state.Gender);
  const { Religion } = useSelector((state) => state.Religion);
  const { foundation } = useSelector((state) => state.Foundation);
  const { course } = useSelector((state) => state.Course);
  const formDataHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      userid: userid,
    });
  };
  useLayoutEffect(() => {
    dispatch(getCoursebyId(userid));
    dispatch(getStateAll());
    dispatch(getGenderAll());
    dispatch(getReligionAll());
    dispatch(getfoundationAll());
  }, [dispatch]);

  useEffect(() => {
    setSelectedData(
      course?.filter((item) => item.courseName === formData?.course)
    );
  }, [formData?.course, course]);

  useEffect(() => {
    if (mode === "u") {
      setFormData(data);
    }
  }, [data]);

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
  const certidicate1ImageHandler = async (e) => {
    try {
      const base64String = await handleImageUpload(e.files[0]);
      setFormData({ ...formData, certificate1: base64String });
    } catch (error) {
      console.error("Error handling father image:", error);
    }
  };
  const certidicate2ImageHandler = async (e) => {
    try {
      const base64String = await handleImageUpload(e.files[0]);
      setFormData({ ...formData, certificate2: base64String });
    } catch (error) {
      console.error("Error handling father image:", error);
    }
  };
  const certidicate3ImageHandler = async (e) => {
    try {
      const base64String = await handleImageUpload(e.files[0]);
      setFormData({ ...formData, certificate3: base64String });
    } catch (error) {
      console.error("Error handling father image:", error);
    }
  };
  const certidicate4ImageHandler = async (e) => {
    try {
      const base64String = await handleImageUpload(e.files[0]);
      setFormData({ ...formData, certificate4: base64String });
    } catch (error) {
      console.error("Error handling father image:", error);
    }
  };

  const onSave = () => {
    dispatch(createAdmission(formData));
  };

  const onUpdate = () => {
    dispatch(updateAdmission(formData));
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
      <div className="grid md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
        <div className="pt-5">
          <FloatLabel>
            <InputText
              id="StudentName"
              className="border border-slate-400 h-12 pl-3  w-full"
              name="studentName"
              value={formData?.studentName}
              onChange={formDataHandler}
            />
            <label htmlFor="StudentName">
              Student Name <span className="text-red-500">*</span>
            </label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <InputText
              id="fathername"
              className="border border-slate-400 h-12 pl-3 w-full"
              name="fatherName"
              value={formData?.fatherName}
              onChange={formDataHandler}
            />
            <label htmlFor="fathername">
              Husband/Father Name <span className="text-red-500">*</span>
            </label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <InputText
              id="mothername"
              className="border border-slate-400 h-12 pl-3  w-full"
              name="motherName"
              value={formData?.motherName}
              onChange={formDataHandler}
            />
            <label htmlFor="mothername">Mother Name</label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <Dropdown
              name="course"
              value={formData?.course}
              onChange={formDataHandler}
              options={course}
              optionLabel="courseName"
              optionValue="courseName"
              filterPlaceholder="Select a Course"
              filterInput
              filter
              className="border border-slate-400 w-full h-12"
            />
            <label htmlFor="dd-city">
              Select a Course <span className="text-red-500">*</span>
            </label>
          </FloatLabel>
        </div>
      </div>
      <div className="py-3 w-full">
        <DataTable
          value={selectedData}
          className="border shadow-gray-500 shadow-sm w-full"
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

      <div className="grid md:grid-cols-3 lg:grid-cols-4 w-full gap-3 mt-5">
        <div className="pt-5">
          <FloatLabel>
            <Calendar
              inputId="dd-dob"
              className="border border-slate-400  w-full h-12 rounded-md"
              inputClassName="pl-3"
              name="dob"
              dateFormat="dd/mm/yy"
              placeholder="dd/mm/yy"
              value={new Date(formData?.dob)}
              onChange={formDataHandler}
            />
            <label htmlFor="dd-dob">
              Date of Birth dd/mm/yy<span className="text-red-500">*</span>
            </label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <Calendar
              inputId="regdate"
              inputClassName="pl-3 "
              className="border border-slate-400 rounded-md  h-12  w-full"
              dateFormat="dd/mm/yy"
              placeholder="dd/mm/yy"
              name="regdDate"
              value={new Date(formData?.regdDate)}
              onChange={formDataHandler}
            />
            <label htmlFor="regdate">
              Regd Date<span className="text-red-500">*</span>
            </label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <InputNumber
              id="mobileNo"
              useGrouping={false}
              maxLength={10}
              inputClassName="pl-3"
              name="mobileNo"
              value={formData?.mobileNo}
              onChange={(e) => formDataHandler(e.originalEvent)}
              className="border border-slate-400 rounded-md h-12  w-full"
            />
            <label htmlFor="mobileNo">
              Mobile No. <span className="text-red-500">*</span>
            </label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <InputNumber
              id="altMobileNo"
              useGrouping={false}
              maxLength={10}
              inputClassName="pl-3"
              name="altMobileNo"
              value={formData?.altMobileNo}
              onChange={(e) => formDataHandler(e.originalEvent)}
              className="border border-slate-400 rounded-md h-12  w-full"
            />
            <label htmlFor="altMobileNo">Alternate Mobile No. </label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <InputText
              id="email"
              className="border border-slate-400 h-12  w-full pl-3"
              name="email"
              value={formData?.email}
              onChange={formDataHandler}
            />
            <label htmlFor="email">Email</label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <InputText
              id="bloodGroup"
              className="border border-slate-400 h-12  w-full pl-3"
              name="bloodGroup"
              value={formData?.bloodGroup}
              onChange={formDataHandler}
            />
            <label htmlFor="bloodGroup">Blood Group</label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <Dropdown
              id="gender"
              name="gender"
              value={formData?.gender}
              onChange={formDataHandler}
              options={Gender}
              optionLabel="gender"
              optionValue="gender"
              filterPlaceholder="Select a Course"
              filter
              className="border border-slate-400  w-full"
            />
            <label htmlFor="gender">Gender</label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <Dropdown
              id="religion"
              name="religion"
              value={formData?.religion}
              onChange={formDataHandler}
              options={Religion}
              optionLabel="religion"
              optionValue="religion"
              filterPlaceholder="Select a Course"
              filter
              className="border border-slate-400  w-full"
            />
            <label htmlFor="religion">Religion</label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <InputText
              className="border border-slate-400 h-12  w-full pl-3"
              id="studentAadharNo"
              name="studentAadharNo"
              value={formData?.studentAadharNo}
              onChange={formDataHandler}
            />
            <label htmlFor="studentAadharNo">Student Aadhar No.</label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <InputText
              className="border border-slate-400 h-12  w-full pl-3"
              id="studentQualification"
              name="studentQualification"
              value={formData?.studentQualification}
              onChange={formDataHandler}
            />
            <label htmlFor="studentQualification">Student Qualification</label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <InputText
              className="border border-slate-400 h-12  w-full pl-3"
              id="nationality"
              name="nationality"
              value={formData?.nationality}
              onChange={formDataHandler}
            />
            <label htmlFor="nationality">Nationality</label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <InputText
              className="border border-slate-400 h-12  w-full pl-3"
              id="caste"
              name="caste"
              value={formData?.caste}
              onChange={formDataHandler}
            />
            <label htmlFor="caste">Caste</label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <InputText
              className="border border-slate-400 h-12  w-full pl-3"
              id="address1"
              name="address1"
              value={formData?.address1}
              onChange={formDataHandler}
            />
            <label htmlFor="address1">Address-1</label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <InputText
              className="border border-slate-400 h-12  w-full pl-3"
              id="address2"
              name="address2"
              value={formData?.address2}
              onChange={formDataHandler}
            />
            <label htmlFor="address2">Address-2</label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <InputText
              className="border border-slate-400 h-12  w-full pl-3"
              id="city"
              name="city"
              value={formData?.city}
              onChange={formDataHandler}
            />
            <label htmlFor="city">City</label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <Dropdown
              id="state"
              name="state"
              value={formData?.state}
              onChange={formDataHandler}
              options={State}
              optionLabel="state"
              optionValue="state"
              filterPlaceholder="Select a Course"
              filter
              className="border border-slate-400  w-full"
            />
            <label htmlFor="state">State</label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <InputText
              id="examCenter"
              className="border border-slate-400 h-12  w-full pl-3"
              name="examCenter"
              value={formData?.examCenter}
              onChange={formDataHandler}
            />
            <label htmlFor="examCenter">Exam Center</label>
          </FloatLabel>
        </div>
        <div className="pt-5">
          <FloatLabel>
            <Dropdown
              id="foundationCourse"
              name="foundationCourse"
              value={formData?.foundationCourse}
              onChange={formDataHandler}
              options={foundation}
              optionLabel="foundation"
              optionValue="foundation"
              filterPlaceholder="Select a Course"
              filter
              className="border border-slate-400  w-full"
            />
            <label htmlFor="foundationCourse">Foundation Course</label>
          </FloatLabel>
        </div>
      </div>

      <div className="gird w-full gap-5 mt-7">
        <div className="grid grid-cols-2  md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-8 gap-3">
          <span>
            <label htmlFor="StudentName">Student Photo</label>
            <FileUpload
              mode="basic"
              onSelect={studentImageHandler}
              accept="image/*"
              id="StudentName"
              className="h-12"
            />
            <Image
              src={formData?.studentPhoto}
              className="w-16 h-16 mt-3 border border-slate-400 overflow-hidden"
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
              className=" h-12"
            />
            <Image
              src={formData?.fatherPhoto}
              className="w-16 h-16 mt-3 border border-slate-400 overflow-hidden"
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
              className=" h-12"
            />
            <Image
              src={formData?.motherPhoto}
              className="w-16 h-16 mt-3 border border-slate-400 overflow-hidden"
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
              className=" h-12"
            />
            <Image
              src={formData?.certificate}
              className="w-16 h-16 mt-3 border border-slate-400 overflow-hidden"
              preview
            />
          </span>

          <span>
            <label for="mothername">Certificate 1</label>
            <FileUpload
              mode="basic"
              onSelect={certidicate1ImageHandler}
              accept="image/*"
              id="StudentName"
              className=" h-12"
            />
            <Image
              src={formData?.certificate1}
              className="w-16 h-16 mt-3 border border-slate-400 overflow-hidden"
              preview
            />
          </span>
          <span>
            <label for="mothername">Certificate 2</label>
            <FileUpload
              mode="basic"
              onSelect={certidicate2ImageHandler}
              accept="image/*"
              id="StudentName"
              className=" h-12"
            />
            <Image
              src={formData?.certificate2}
              className="w-16 h-16 mt-3 border border-slate-400 overflow-hidden"
              preview
            />
          </span>
          <span>
            <label for="mothername">Certificate 3</label>
            <FileUpload
              mode="basic"
              onSelect={certidicate3ImageHandler}
              accept="image/*"
              id="StudentName"
              className=" h-12"
            />
            <Image
              src={formData?.certificate3}
              className="w-16 h-16 mt-3 border border-slate-400 overflow-hidden"
              preview
            />
          </span>
          <span>
            <label for="mothername">Certificate 4</label>
            <FileUpload
              mode="basic"
              onSelect={certidicate4ImageHandler}
              accept="image/*"
              id="StudentName"
              className=" h-12"
            />
            <Image
              src={formData?.certificate4}
              className="w-16 h-16 mt-3 border border-slate-400 overflow-hidden"
              preview
            />
          </span>
        </div>
      </div>
      
      <div className="mt-5 flex justify-end">
        {mode === "s" ? (
          <Button
            disabled={
              formData?.studentName &&
              formData?.fatherName &&
              formData?.dob &&
              formData?.regdDate &&
              formData?.mobileNo &&
              formData?.course
                ? false
                : true
            }
            onClick={confirm1}
            loading={loading}
            label="Save"
            icon={<BiSave size={20} />}
            className="bg-green-500 hover:bg-green-600 duration-200 flex gap-3 text-white py-5 px-24"
          />
        ) : (
          <Button
            onClick={confirm2}
            loading={loading}
            disabled={loading}
            label="Update"
            icon={<BiUpload size={20} />}
            className="bg-blue-500 hover:bg-blue-600 duration-200 flex gap-3 text-white py-5 px-24"
          />
        )}
      </div>
    </div>
  );
}

export default AdmissionForm;
