import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { useState } from "react";

export default function NewCourseForm(params) {
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
    return<>
    <div className="flex flex-col mt-5">
            <FloatLabel>
            <Dropdown
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.value)}
              options={countries}
              optionLabel="name"
              filter
              placeholder="Select student"
              filterPlaceholder="Select student"
              className="h-12 w-80 border-slate-500 border rounded-md"
              inputClassName="pl-3"
              />
              <label>Student</label>
              </FloatLabel>
          </div>

          <div className="flex flex-col mt-7">
            <FloatLabel>
            <Dropdown
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.value)}
              options={countries}
              optionLabel="name"
              filter
              placeholder="Select Course"
              filterPlaceholder="Select Course"
              className="h-12 w-80  border-slate-500 border rounded-md"
              inputClassName="pl-3"
              />
              <label>Courses</label>
            </FloatLabel>
          </div>
          <div className="flex justify-end">
            <Button label="Save" className="bg-green-500 text-white py-3 px-8 mt-3 "/>
            <Button label="Update" className="bg-blue-500 text-white py-3 px-8 mt-3 "/>
          </div>
    </>
}