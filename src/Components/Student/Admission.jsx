import { Dialog } from "primereact/dialog";

import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  FaFilePdf,
  FaFileExcel,
  FaFileCsv, FaPenToSquare,
  FaPlus
} from "react-icons/fa6";
import AdmissionForm from "../../Utilites/AdmissionForm";
import EnquiryForm from "../../Utilites/EnquiryForm";
import {
  getAdmissionbyId
} from "../../Redux/Slice/AdmissionSlice";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../NavBar";
import { Image } from "primereact/image";
import moment from "moment/moment";
import { Toast } from "primereact/toast";

function Admission(_params) {
  const [openModel, setOpenModel] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [openModel2, setOpenModel2] = useState(false);
  const [mode, setMode] = useState("s");
  const dispatch = useDispatch();
  const toast = useRef();
  const { admission, loading,message,error } = useSelector((state) => state.Admission);
  const { user, userid } = useSelector((state) => state.UserAuth);
  const dt = useRef(null);
  const products = [];

  useEffect(() => {
    dispatch(getAdmissionbyId(userid));
  }, [dispatch]);

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
    if (message) {
      show(message);
    }
    if (error) {
      showWarn(message);
    }
  }, [message, error]);

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
          label={<FaPenToSquare />}
          onClick={() => {
            setSelectedData(rowData);
            setOpenModel(true);
            setMode("u");
          }}
          className="text-blue-500 p-2"
        />
      </div>
    );
  };
  const indexTemplate = (_rowData, { rowIndex }) => {
    return rowIndex + 1;
  };
  const imageTemplate = (rowData, { rowIndex }) => {
    return (
      <div className="w-20 h-20 overflow-hidden">
        <Image src={rowData?.studentPhoto} preview />
      </div>
    );
  };
  return (
    <div className="relative">
      <NavBar />
      <Toast ref={toast} />
      <Dialog
        header="Admission Form"
        position="top"
        className="h-auto"
        visible={openModel}
        onHide={() => setOpenModel(false)}
      >
        <AdmissionForm mode={mode} data={selectedData} />
      </Dialog>
      <Dialog
        header="Enquiry Form"
        position="top"
        className="h-auto"
        visible={openModel2}
        onHide={() => setOpenModel2(false)}
      >
        <EnquiryForm mode={"s"} />
      </Dialog>
      <div className="p-3 m-4 border-t-4 rounded-lg border-blue-500 shadow-md">
        <div className="flex justify-between">
          <strong className="text-sm">Student Admission List</strong>

          <div className="flex gap-4">
            <Button
              className="flex items-center justify-center rounded-lg gap-4 text-sm p-3 bg-blue-500 text-white capitalize hover:bg-blue-600 duration-300"
              onClick={() => setOpenModel2(true)}
            >
              <FaPlus />
              New Enquiry
            </Button>
            <Button
              label="New Admission"
              icon={<FaPlus />}
              className="text-sm p-3  bg-blue-500 text-white capitalize hover:bg-blue-600 duration-300"
              onClick={() => {
                setMode("s");
                setOpenModel(true);
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <label className="text-sm">Registration Date</label>
            <Calendar
              touchUI
              placeholder="DD/MM/YYYY"
              className="h-10 border-slate-500 border rounded-md"
              inputClassName="pl-3 "
            />
          </div>

          <div className="flex gap-2 mt-5 ">
            <Button
              label="Filter"
              className="bg-blue-500 text-white px-3 py2"
            />
            <Button label="Clear" className="bg-red-500 text-white px-3 py-2" />
          </div>
        </div>
      </div>
      <div className="border-t-4 rounded-lg border-blue-500 shadow-md m-4">
        <DataTable
          value={admission}
          size="small"
          showGridlines
          stripedRows
          header={header}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="index"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Sr."
            sortable
            body={indexTemplate}
          ></Column>
          <Column
            field="studentPhoto"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Photo"
            body={imageTemplate}
            sortable
          ></Column>
          <Column
            field="_id"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Student Id"
            sortable
          ></Column>
          <Column
            field="userid"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="User Id"
            sortable
          ></Column>
          <Column
            field="category"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Password"
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
            field="mobileNo"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Mobile No."
            sortable
          ></Column>
          <Column
            field="examCenter"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Exam Center"
            sortable
          ></Column>
          <Column
            field="regdDate"
            headerClassName="p-3 border-black border  bg-slate-200"
            header="Req. Date"
            body={(e) => moment(e).format("DD/MM/YYYY")}
            sortable
          ></Column>
          <Column
            field="status"
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

export default Admission;
