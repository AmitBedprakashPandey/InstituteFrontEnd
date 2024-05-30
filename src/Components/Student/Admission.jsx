import { Dialog } from "primereact/dialog";
import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {
  FaFilePdf,
  FaFileExcel,
  FaFileCsv,
  FaEye,
  FaPenToSquare,
  FaPlus,
} from "react-icons/fa6";
import AdmissionForm from "../../Utilites/AdmissionForm";

function Admission(params) {
  const [openModel, setOpenModel] = useState(false);
  const [mode, setMode] = useState("s");
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
        className="border-black w-12 h-12 rounded-full border-2"
        onClick={() => exportCSV(false)}
        data-pr-tooltip="CSV"
      />
      <Button
        type="button"
        disabled={products}
        icon={<FaFileExcel color="#fff" />}
        className="bg-green-500 border-black border w-12 h-12 rounded-full "
        onClick={exportExcel}
        data-pr-tooltip="XLS"
      />
      <Button
        type="button"
        disabled={products}
        icon={<FaFilePdf color="#fff" />}
        className="bg-red-500 border-black border w-12 h-12 rounded-full "
        onClick={exportPdf}
        data-pr-tooltip="PDF"
      />
    </div>
  );

  const ActionbodyTemplate = () => {
    return (
      <div className="flex items-center">
        <Button label={<FaEye />} className="p-2" />
        <Button label={<FaPenToSquare />} className="text-blue-500 p-2" />
      </div>
    );
  };

  return (
    <div className="relative">
      <Dialog
        header="Admission Form"
        position="top"
        className="h-auto"
        visible={openModel}
        onHide={() => setOpenModel(false)}
      >
        <AdmissionForm mode={"s"} />
      </Dialog>
      <div className="p-3 m-4 border-t-4 rounded-lg border-blue-500 shadow-md">
        <div className="flex justify-between">
          <strong className="text-xl">Student Admission List</strong>

          <div className="flex ">
            <a
              className="flex items-center justify-center rounded-lg gap-4 p-3 m-3 w-48 bg-blue-500 text-white capitalize hover:bg-blue-600 duration-300"
              href={"/school/enqiry"}
            >
              <FaPlus />
              New Enquiry
            </a>
            <Button
            label="New Admission"
              icon={<FaPlus />}
              className="p-3 m-3 w-48 bg-blue-500 text-white capitalize hover:bg-blue-600 duration-300"
              onClick={() => {
                setMode("s");
                setOpenModel(true);
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <label>Registration Date</label>
            <Calendar
              touchUI
              placeholder="DD/MM/YYYY"
              className="h-12 border-slate-500 border rounded-md"
              inputClassName="pl-3 "
            />
          </div>

          <div className="flex gap-2 ml-8 ">
            <Button label="Filter" className="bg-blue-500 text-white p-3" />
            <Button label="Clear" className="bg-red-500 text-white p-3" />
          </div>
        </div>
      </div>
      <div className="border-t-4 rounded-lg border-blue-500 shadow-md m-4">
        <DataTable
          size="small"
          showGridlines
          stripedRows
          header={header}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column field="code" header="Sr." sortable></Column>
          <Column field="name" header="Photo" sortable></Column>
          <Column field="category" header="Student Id" sortable></Column>
          <Column field="category" header="User Id" sortable></Column>
          <Column field="category" header="Password" sortable></Column>
          <Column field="category" header="Student Name" sortable></Column>
          <Column field="quantity" header="Father Name" sortable></Column>
          <Column field="quantity" header="Mobile No." sortable></Column>
          <Column field="quantity" header="Exam Center" sortable></Column>
          <Column field="quantity" header="Req. Date" sortable></Column>
          <Column
            field="quantity"
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
