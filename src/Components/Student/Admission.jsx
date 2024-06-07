import { Dialog } from "primereact/dialog";

import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  FaFilePdf,
  FaFileExcel,
  FaFileCsv,
  FaPenToSquare,
  FaPlus,
  FaFilter,
  FaImage,
} from "react-icons/fa6";
import { FaRedo } from "react-icons/fa";
import AdmissionForm from "../../Utilites/AdmissionForm";
import EnquiryForm from "../../Utilites/EnquiryForm";
import { getAdmissionbyId } from "../../Redux/Slice/AdmissionSlice";
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
  const { admission, loading, message, error } = useSelector(
    (state) => state.Admission
  );
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
          label={<FaPenToSquare size={20} />}
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
      <>
        {rowData?.studentPhoto ? (
          <div className="w-12 h-12 overflow-hidden">
            <Image src={rowData?.studentPhoto} preview />
          </div>
        ) : (
          <div className="w-12 h-12  flex justify-center items-center overflow-hidden">
            <FaImage size={60} color="red" />
          </div>
        )}
      </>
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
      <div className="m-4 p-3 border-4 rounded-lg border-blue-500 shadow-slate-500 shadow-md bg-white">
        <div className="flex justify-between">
          <strong className="md:text-md lg:text-2xl">Student Admission List</strong>
          <div className="flex gap-4">
            <Button
            label="New Enquiry"
            icon={<FaPlus />}
              className="flex items-center justify-center rounded-lg gap-2 text-sm p-3 bg-blue-500 text-white capitalize hover:bg-blue-600 duration-300"
              onClick={() => setOpenModel2(true)}
             />            
              
            <Button
              label="New Admission"
              icon={<FaPlus />}
              className="flex gap-2 text-sm p-3  bg-blue-500 text-white capitalize hover:bg-blue-600 duration-300"
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
              icon={<FaFilter/>}
              className="flex gap-2 bg-blue-500 text-white px-3 py2"
            />
            <Button label="Clear" icon={<FaRedo />} className="flex gap-2 bg-red-500 text-white px-3 py-2" />
          </div>
        </div>
      </div>
      <div className="relative border-4 min-w-80 bg-white rounded-lg border-blue-500 shadow-slate-500 shadow-md m-4 overflow-hidden">
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
          headerClassName="border md:text-xs lg:text-lg text-nowrap pl-4 bg-slate-100"
            header="Sr."
            sortable
            body={indexTemplate}
          ></Column>
          <Column
            field="studentPhoto"
             headerClassName="border md:text-xs lg:text-lg text-nowrap pl-4 bg-slate-100"
            header="Photo"
            body={imageTemplate}
            sortable
          ></Column>
          <Column
            field="_id"
            headerClassName="border md:text-xs lg:text-lg text-nowrap pl-4 bg-slate-100"
            header="Student Id"
            sortable
          ></Column>
          <Column
            field="userid"
           headerClassName="border md:text-xs lg:text-lg text-nowrap pl-4 bg-slate-100"
            header="User Id"
            sortable
          ></Column>
          <Column
            field="category"
 headerClassName="border md:text-xs lg:text-lg text-nowrap pl-4 bg-slate-100"
            header="Password"
            sortable
          ></Column>
          <Column
            field="studentName"
      headerClassName="border md:text-xs lg:text-lg text-nowrap pl-4 bg-slate-100"
            header="Student Name"
            sortable
          ></Column>
          <Column
            field="fatherName"
           headerClassName="border md:text-xs lg:text-lg text-nowrap pl-4 bg-slate-100"
            header="Father Name"
            sortable
          ></Column>
          <Column
            field="mobileNo"
            headerClassName="border md:text-xs lg:text-lg text-nowrap pl-4 bg-slate-100"
            header="Mobile No."
            sortable
          ></Column>
          <Column
            field="examCenter"
            headerClassName="border md:text-xs lg:text-lg text-nowrap pl-4 bg-slate-100"
            header="Exam Center"
            sortable
          ></Column>
          <Column
            field="regdDate"
           headerClassName="border md:text-xs lg:text-lg text-nowrap pl-4 bg-slate-100"
            header="Req. Date"
            body={(e) => moment(e).format("DD/MM/YYYY")}
            sortable
          ></Column>
          <Column
            field="status"
            headerClassName="border md:text-xs lg:text-lg text-nowrap pl-4 bg-slate-100"
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
