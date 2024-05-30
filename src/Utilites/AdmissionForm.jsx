import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";
import { useState } from "react";
import { Image } from "primereact/image";
import { Button } from "primereact/button";

function AdmissionForm({ mode }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  return (
    <div className="relative">
      <div className="flex justify-center items-center gap-5 mt-5">
        <FloatLabel>
          <InputText id="StudentName" className="border h-12 pl-3 w-64" />
          <label htmlFor="StudentName">
            Student Name <span className="text-red-500">*</span>
          </label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="fathername" className="border h-12 pl-3 w-64" />
          <label htmlFor="fathername">
            Husband/Father Name <span className="text-red-500">*</span>
          </label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="mothername" className="border h-12 pl-3 w-64" />
          <label for="mothername">Mother Name</label>
        </FloatLabel>
        <FloatLabel>
          <Calendar className="border w-64 h-12 rounded-md" inputClassName="pl-3" />
          <label htmlFor="dd-city">
            Date of Birth <span className="text-red-500">*</span>
          </label>
        </FloatLabel>
      </div>

      <div className="flex justify-center items-center gap-5 mt-7">
        <FloatLabel>
          <Calendar inputClassName="pl-3 " className="border h-12 w-64" />
          <label htmlFor="StudentName">
            Regd Date<span className="text-red-500">*</span>
          </label>
        </FloatLabel>
        <FloatLabel>
          <InputNumber
            id="mothername"
            useGrouping={false}
            maxLength={10}
            inputClassName="pl-3"
            className="border h-12 w-64"
          />
          <label for="mothername">
            Mobile No. <span className="text-red-500">*</span>
          </label>
        </FloatLabel>
        <FloatLabel>
          <InputNumber
            id="mothername"
            useGrouping={false}
            maxLength={10}
            inputClassName="pl-3"
            className="border h-12 w-64"
          />
          <label for="mothername">Alternate Mobile No. </label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="StudentName" className="border h-12 w-64 pl-3" />
          <label htmlFor="StudentName">Email</label>
        </FloatLabel>
      </div>
      <div className="flex justify-center items-center gap-5 mt-7">
        <FloatLabel>
          <InputText id="StudentName" className="border h-12 w-64 pl-3" />
          <label htmlFor="StudentName">Blood Group</label>
        </FloatLabel>
        <FloatLabel>
          <Dropdown
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.value)}
            options={countries}
            optionLabel="name"
            filterPlaceholder="Select a Course"
            filter
            className="border w-64"
          />
          <label htmlFor="fathername">Gender</label>
        </FloatLabel>
        <FloatLabel>
          <Dropdown
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.value)}
            options={countries}
            optionLabel="name"
            filterPlaceholder="Select a Course"
            filter
            className="border w-64"
          />
          <label htmlFor="fathername">Religion</label>
        </FloatLabel>
        <FloatLabel>
          <InputText className="border h-12 w-64 pl-3" />
          <label htmlFor="dd-city">Student Aadhar No.</label>
        </FloatLabel>
      </div>
      <div className="flex justify-center items-center gap-5 mt-7">
        <FloatLabel>
          <InputText className="border h-12 w-64 pl-3" />
          <label htmlFor="dd-city">Student Qualification</label>
        </FloatLabel>
        <FloatLabel>
          <InputText className="border h-12 w-64 pl-3" />
          <label htmlFor="dd-city">Nationality</label>
        </FloatLabel>
        <FloatLabel>
          <InputText className="border h-12 w-64 pl-3" />
          <label htmlFor="dd-city">Caste</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="StudentName" className="border h-12 w-64 pl-3" />
          <label htmlFor="StudentName">Address-1</label>
        </FloatLabel>
      </div>
      <div className="flex justify-start items-center gap-5 mt-7">
        <FloatLabel>
          <InputText id="fathername" className="border h-12 w-64 pl-3" />
          <label htmlFor="StudentName">Address-2</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="mothername" className="border h-12 w-64 pl-3" />
          <label for="mothername">City</label>
        </FloatLabel>
        <FloatLabel>
          <Dropdown
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.value)}
            options={countries}
            optionLabel="name"
            filterPlaceholder="Select a Course"
            filter
            className="border w-64"
          />
          <label htmlFor="dd-city">State</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="StudentName" className="border h-12 w-64 pl-3" />
          <label htmlFor="StudentName">Exam Center</label>
        </FloatLabel>
      </div>
      <div className="flex justify-start items-center gap-5 mt-7">
        <FloatLabel>
          <Dropdown
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.value)}
            options={countries}
            optionLabel="name"
            filterPlaceholder="Select a Course"
            filter
            className="border w-64"
          />
          <label htmlFor="dd-city">Foundation Course</label>
        </FloatLabel>
      </div>
      <div className="flex flex-col items-center gap-5 mt-7">
        <div className="grid grid-cols-8 gap-3">
          <span>
            <label htmlFor="StudentName">Student Photo</label>
            <FileUpload
              mode="basic"
              customUpload
              accept="image/*"
              id="StudentName"
              className="border h-12"
            />
            <Image className="w-16 h-16 mt-3 border" preview />
          </span>
          <span>
            <label htmlFor="fathername">Father Photo</label>
            <FileUpload
              mode="basic"
              customUpload
              accept="image/*"
              id="StudentName"
              className="border h-12"
            />
            <Image className="w-16 h-16 mt-3 border" preview />
          </span>
          <span>
            <label for="mothername">Mother Photo</label>
            <FileUpload
              mode="basic"
              customUpload
              accept="image/*"
              id="StudentName"
              className="border h-12"
            />
            <Image className="w-16 h-16 mt-3 border" preview />
          </span>
          <span>
            <label for="mothername">Certificate</label>
            <FileUpload
              mode="basic"
              customUpload
              accept="image/*"
              id="StudentName"
              className="border h-12"
            />
            <Image className="w-16 h-16 mt-3 border" preview />
          </span>

          <span>
            <label for="mothername">Certificate 1</label>
            <FileUpload
              mode="basic"
              customUpload
              accept="image/*"
              id="StudentName"
              className="border h-12"
            />
            <Image className="w-16 h-16 mt-3 border" preview />
          </span>
          <span>
            <label for="mothername">Certificate 2</label>
            <FileUpload
              mode="basic"
              customUpload
              accept="image/*"
              id="StudentName"
              className="border h-12"
            />
            <Image className="w-16 h-16 mt-3 border" preview />
          </span>
          <span>
            <label for="mothername">Certificate 3</label>
            <FileUpload
              mode="basic"
              customUpload
              accept="image/*"
              id="StudentName"
              className="border h-12"
            />
            <Image className="w-16 h-16 mt-3 border" preview />
          </span>
          <span>
            <label for="mothername">Certificate 4</label>
            <FileUpload
              mode="basic"
              customUpload
              accept="image/*"
              id="StudentName"
              className="border h-12"
            />
            <Image className="w-16 h-16 mt-3 border" preview />
          </span>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        {mode === "s" ? (
          <Button label="Save" className="bg-green-500 w-36 text-white p-3" />
        ) : (
          <Button label="Update" className="bg-blue-500 w-36 text-white p-3" />
        )}
      </div>
    </div>
  );
}

export default AdmissionForm;
