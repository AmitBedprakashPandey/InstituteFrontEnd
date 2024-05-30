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

function EnquiryForm({ mode }) {
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
            Father Name <span className="text-red-500">*</span>
          </label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="mothername" className="border h-12 pl-3 w-64" />
          <label for="mothername">Mother Name</label>
        </FloatLabel>
        <FloatLabel>
          <Dropdown
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.value)}
            options={countries}
            optionLabel="name"
            filterPlaceholder="Select a Course"
            filterInput
            filter
            className="border w-64"
          />
          <label htmlFor="dd-city">
            Select a Course <span className="text-red-500">*</span>
          </label>
        </FloatLabel>
      </div>
      <div className="my-5">
        <DataTable>
          <Column field="code" header="Course types"></Column>
          <Column field="name" header="Course Name"></Column>
          <Column field="category" header="Certified Authority"></Column>
          <Column field="quantity" header="Exam Fee"></Column>
          <Column field="quantity" header="Course Fee"></Column>
          <Column field="quantity" header="Donation"></Column>
        </DataTable>
      </div>
      <div className="flex justify-center items-center gap-5 mt-5">
        <FloatLabel>
          <Calendar inputClassName="pl-3 " className="border h-12 w-64" />
          <label htmlFor="StudentName">
            Date Of Birth <span className="text-red-500">*</span>
          </label>
        </FloatLabel>
        <FloatLabel>
          <Calendar
            id="fathername"
            inputClassName="pl-3"
            className="border h-12 w-64"
          />
          <label htmlFor="fathername">Enquiry Date</label>
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
      </div>
      <div className="flex justify-center items-center gap-5 mt-5">
        <FloatLabel>
          <InputText id="StudentName" className="border h-12 w-64" />
          <label htmlFor="StudentName">Email</label>
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
          <InputText className="border h-12 w-64" />
          <label htmlFor="dd-city">Caste</label>
        </FloatLabel>
      </div>
      <div className="flex justify-center items-center gap-5 mt-5">
        <FloatLabel>
          <InputText id="StudentName" className="border h-12 w-64" />
          <label htmlFor="StudentName">Address-1</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="fathername" className="border h-12 w-64" />
          <label htmlFor="StudentName">Address-2</label>
        </FloatLabel>
        <FloatLabel>
          <InputText id="mothername" className="border h-12 w-64" />
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
      </div>
      <div className="flex justify-start items-center gap-5 mt-5">
        <FloatLabel>
          <InputText id="StudentName" className="border h-12 w-64" />
          <label htmlFor="StudentName">EnquiryBy</label>
        </FloatLabel>
      </div>
      <div className="flex justify-center items-center gap-5 mt-5">
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
      </div>
      <div className="absolute bottom-0 right-0 ">
        {mode === "s" ? (
          <Button label="Save" className="bg-green-500 w-36 text-white p-3" />
        ) : (
          <Button label="Update" className="bg-blue-500 w-36 text-white p-3" />
        )}
      </div>
    </div>
  );
}
export default EnquiryForm;
