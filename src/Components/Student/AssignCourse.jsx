import { Dialog } from "primereact/dialog";
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  FaFilePdf,
  FaFileExcel,
  FaFileCsv, FaPlus,
  FaTrash
} from "react-icons/fa6";
import { Dropdown } from "primereact/dropdown";
import NewCourseForm from "../../Utilites/AssignCourseForm";
import { FloatLabel } from "primereact/floatlabel";
import NavBar from "../NavBar";
import { getAdmissionbyId } from "../../Redux/Slice/AdmissionSlice";
import { getCoursebyId } from "../../Redux/Slice/CourseSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAssignCourse,
  getAssignCoursebyId,
} from "../../Redux/Slice/AssignCourseSlice";
import { Toast } from "primereact/toast";

function AssignCourse(_params) {
  const [openModel, setOpenModel] = useState(false);
  const [mode, setMode] = useState("s");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const { userid } = useSelector((state) => state.UserAuth);
  const { admission } = useSelector((state) => state.Admission);
  const { course } = useSelector((state) => state.Course);
  const { AssignCourse, message, error, loading } = useSelector(
    (state) => state.AssignCourse
  );
  const [formData, setFormData] = useState([]);
  const dispatch = useDispatch();
  const toast = useRef();

  useEffect(() => {
    dispatch(getAdmissionbyId(userid));
    dispatch(getCoursebyId(userid));
    dispatch(getAssignCoursebyId(userid));
  }, [dispatch, userid]);

  useEffect(() => {
    const newFormData = AssignCourse.map((assign) => {
      const student = admission.find((item) => item._id === assign.studentId);
      const Courses = course.find((item) => item._id === assign.courseId);
      return { ...student, Courses };
    });

    setFormData(newFormData);
  }, [AssignCourse, admission, course]);

  const show = (message) => {
    toast.current.show({ severity: "info", summary: message, life: 1000 });
  };
  const showWarn = (error) => {
    toast.current.show({
      severity: "warn",
      summary: error,
      life: 3000,
    });
  };
  useEffect(() => {
    if (message) {
      show(message);
    }
    if (error) {
      showWarn(message);
    }
  }, [message, error]);

  const dt = useRef(null);
  const products = [];
  const cols = [
    { field: "code", header: "Code" },
    { field: "name", header: "Name" },
    { field: "category", header: "Category" },
    { field: "quantity", header: "Quantity" },
  ];
  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(exportColumns, products);
        doc.save("products.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(products);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "products");
    });
  };
  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const header = (
    <div className="flex items-center justify-end gap-2">
      <Button
        type="button"
        icon={<FaFileCsv />}
        disabled={products}
        className="border-black w-10 h-10 rounded-full border-2"
        onClick={() => exportCSV(false)}
        data-pr-tooltip="CSV"
      />
      <Button
        type="button"
        disabled={products}
        icon={<FaFileExcel color="#fff" />}
        className="bg-green-500 border-black border w-10 h-10 rounded-full "
        onClick={exportExcel}
        data-pr-tooltip="XLS"
      />
      <Button
        type="button"
        disabled={products}
        icon={<FaFilePdf color="#fff" />}
        className="bg-red-500 border-black border w-10 h-10 rounded-full "
        onClick={exportPdf}
        data-pr-tooltip="PDF"
      />
    </div>
  );

  const ActionbodyTemplate = (rowData) => {
    return (
      <div className="flex items-center justify-center">
        <Button
          onClick={() => dispatch(deleteAssignCourse(rowData._id))}
          label={<FaTrash />}
          className="text-blue-500 p-2"
        />
      </div>
    );
  };

  const indexTemplate = (_rowData, { rowIndex }) => {
    return rowIndex + 1;
  };


  return (
    <div className="relative">
      <NavBar />
      <Toast ref={toast} />
      <Dialog
        header="Assign Course Form"
        position="top"
        className="h-auto"
        visible={openModel}
        onHide={() => setOpenModel(false)}
      >
        <NewCourseForm mode={"s"} />
      </Dialog>
      <div className="p-3 m-4 border-4  rounded-lg border-blue-500 shadow-md">
        <div className="flex justify-between">
          <strong className="">Filter Records</strong>
          <Button
            label="Assign New Course"
            icon={<FaPlus />}
            className="text-sm p-3  bg-blue-500 text-white capitalize hover:bg-blue-600 duration-300"
            onClick={() => {
              setMode("s");
              setOpenModel(true);
            }}
          />
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="">
            <FloatLabel>
              <Dropdown
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.value)}
                options={admission}
                optionLabel="studentName"
                optionValue="_id"
                filter
                filterPlaceholder="Select student"
                className="h-10 w-full max-w-80 border-slate-500 border rounded-md"
                inputClassName="pl-3"
              />
              <label>Student</label>
            </FloatLabel>
          </div>

          <div className="">
            <FloatLabel>
              <Dropdown
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.value)}
                options={course}
                optionLabel="courseName"
                optionValue="_id"
                filter
                placeholder="Select Course"
                filterPlaceholder="Select Course"
                className="h-10 w-80  border-slate-500 border rounded-md"
                inputClassName="pl-3"
              />
              <label>Courses</label>
            </FloatLabel>
          </div>

          <div className="flex gap-2 ">
            <Button
              label="Filter"
              className="bg-blue-500 text-white px-3 py-2"
            />
            <Button label="Clear" className="bg-red-500 text-white px-3 py-2" />
          </div>
        </div>
      </div>
      <div className="shadow-md m-4 border-t-4 rounded-lg border-blue-500">
        <DataTable
          value={formData}
          size="small"
          showGridlines
          stripedRows
          header={header}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="code"
            headerClassName="p-3 border-black border  bg-slate-200"
            bodyClassName="flex justify-center"
            header="Sr."
            body={indexTemplate}
            sortable
          ></Column>
          <Column
            field="studentName"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Student Name"
            sortable
          ></Column>
          <Column
            field="fatherName"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Father Name"
            sortable
          ></Column>
          <Column
            field="studentId"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Student Id"
            sortable
          ></Column>
          <Column
            field="Courses.courseType"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Course Type"
            sortable
          ></Column>
          <Column
            field="Courses.courseName"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Course Name"
            sortable
          ></Column>
          <Column
            field="Courses.courseCode"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Course Code"
            sortable
          ></Column>
          <Column
            field="Courses.examFee"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Exam Fee"
            sortable
          ></Column>
          <Column
            field="Courses.courseFee"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Course Fee"
            sortable
          ></Column>
          <Column
            field="Courses.courseDuration"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Duration"
            sortable
          ></Column>
          <Column
            field="quantity"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Action"
            body={ActionbodyTemplate}
            sortable
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default AssignCourse;
