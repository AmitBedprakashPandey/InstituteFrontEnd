import { Dialog } from "primereact/dialog";
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import {
  FaFilePdf,
  FaFileExcel,
  FaFileCsv,
  FaEye,
  FaPenToSquare,
  FaPlus,
  FaEyeSlash,
} from "react-icons/fa6";
import CourseForm from "../../Utilites/CourseForm";
import NavBar from "../NavBar";
import { useDispatch, useSelector } from "react-redux";
import { getCoursebyId, updateCourse } from "../../Redux/Slice/CourseSlice";
import { Toast } from "primereact/toast";

function Course() {
  const [openModel, setOpenModel] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [mode, setMode] = useState("s");
  const dispatch = useDispatch();
  const toast = useRef();
  const { userid } = useSelector((state) => state.UserAuth);
  const { course, message, error, loading } = useSelector(
    (state) => state.Course
  );

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

  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "country.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  useEffect(() => {
    dispatch(getCoursebyId(userid));
  }, [dispatch, userid]);

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
    <>
      <div className="flex justify-between">
        <strong className="pb-3">Registered Courses</strong>
      </div>
      <div className="flex justify-between  items-center py-4">
        <div className="flex justify-content-end">
          <IconField iconPosition="right">
            <InputIcon className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
              className="h-10 border-slate-300 border pl-3"
            />
          </IconField>
        </div>
        <Button
          label="New Course"
          icon={<FaPlus />}
          className=" text-sm p-3  bg-blue-500 text-white capitalize hover:bg-blue-600 duration-300"
          onClick={() => {
            setMode("s");
            setOpenModel(true);
          }}
        />
      </div>

      <div className="flex justify-end gap-2">
        <div className="flex gap-3">
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
      </div>
    </>
  );

  const ActionbodyTemplate = (rowData) => {
    return (
      <div className="flex items-center justify-center">
        <Button
          onClick={() =>
            dispatch(
              updateCourse({
                ...rowData,
                status: rowData.status === true ? false : true,
              })
            )
          }
          label={
            rowData.status ? <FaEye size={20} /> : <FaEyeSlash size={20} />
          }
          className="p-2"
        />
        <Button
          onClick={() => {
            setMode("u");
            setSelectedData(rowData);
            setOpenModel(true);
          }}
          label={<FaPenToSquare />}
          className="text-blue-500 p-2"
        />
      </div>
    );
  };

  const indexTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  return (
    <div className="relative bg-white">
      <NavBar />
      <Toast ref={toast} />
      
      <Dialog
        header="Course Form"
        position="top"
        className="h-auto w-[30vw]"
        visible={openModel}
        onHide={() => setOpenModel(false)}
      >
        <CourseForm mode={mode} data={selectedData} />
      </Dialog>

      <div className="border-t-4 rounded-lg border-blue-500 shadow-slate-400 shadow-md m-4 p-2">
        <DataTable
          value={course}
          size="small"
          showGridlines
          filters={filters}
          filterDisplay="row"
          globalFilterFields={[
            "name",
            "country.name",
            "representative.name",
            "status",
          ]}
          stripedRows
          header={header}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="code"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Sr."
            sortable
            body={indexTemplate}
          ></Column>
          <Column
            field="courseType"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Course Type"
            sortable
          ></Column>
          <Column
            field="courseName"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Course Name"
            sortable
          ></Column>
          <Column
            field="courseCode"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Course Code"
            sortable
          ></Column>
          <Column
            field="certifiedAuthority"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Cerified Authority"
            sortable
          ></Column>
          <Column
            field="examFee"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Exam Fee"
            sortable
          ></Column>
          <Column
            field="courseFee"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Course Fee"
            sortable
          ></Column>
          <Column
            field="courseDuration"
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

export default Course;
