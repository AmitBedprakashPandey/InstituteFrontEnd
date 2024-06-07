import moment from "moment";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { useLayoutEffect, useRef, useState } from "react";
import { FaRedo } from "react-icons/fa";
import {
  FaEye,
  FaEyeSlash,
  FaFileCsv,
  FaFileExcel,
  FaFilePdf,
  FaFilter,
  FaImage,
  FaPenToSquare,
  FaPlus,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getEnquirybyId, updateEnquiry } from "../../Redux/Slice/EnquirySlice";
import EnquiryForm from "../../Utilites/EnquiryForm";
import NavBar from "../NavBar";

function Enquiry(_params) {
  const [openModel, setOpenModel] = useState(false);
  const [selectedData, setSelectedData] = useState();

  const [mode, setMode] = useState("s");
  const [dateData, setDateData] = useState({ fromDate: null, endDate: null });
  const { enquiry } = useSelector((state) => state.Enquiry);
  const { userid } = useSelector((state) => state.UserAuth);
  const dispatch = useDispatch();
  const dateDatahandler = (e) => {
    setDateData({ [e.target.name]: e.target.value });
  };

  useLayoutEffect(() => {
    dispatch(getEnquirybyId(userid));
  }, [dispatch]);

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

  const dateFilterhandler = () => {
    console.log(dateData);
  };

  const ActionbodyTemplate = (rowData) => {
    return (
      <div className="flex items-center justify-center">
        <Button
          label={
            rowData?.status === true ? (
              <FaEye size={25} />
            ) : (
              <FaEyeSlash size={25} />
            )
          }
          className="p-2"
          onClick={() => {
            dispatch(
              updateEnquiry({
                ...rowData,
                status: rowData?.status === true ? false : true,
              })
            );
          }}
        />
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
  const EnquiryStatusbodyTemplate = (rowData) => {
    return (
      <div className="flex items-center justify-center">
        <Button
          label={rowData?.enquiryStatus === true ? "Confired" : "Panding"}
          onClick={() => {
            dispatch(
              updateEnquiry({
                ...rowData,
                enquiryStatus: !rowData?.enquiryStatus,
              })
            );
          }}
          className={`${
            rowData?.enquiryStatus === true
              ? "bg-green-500 hover:bg-green-600"
              : "bg-red-500 hover:bg-red-600"
          } text-white py-2 px-5 md:py-1 md:px-3  duration-200 `}
        />
      </div>
    );
  };
  const indexTemplate = (_rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const imageTemplate = (rowData) => {
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
      <Dialog
        header="Enquiry Form"
        position="top"
        className="h-auto"
        visible={openModel}
        onHide={() => setOpenModel(false)}
      >
        <EnquiryForm mode={mode} data={selectedData} />
      </Dialog>
      <div className="m-4 p-3 border-4 rounded-lg border-blue-500 shadow-slate-500 shadow-md bg-white">
        <div className="flex justify-between">
          <strong className="">Register Enquries</strong>
          <div>
            <Button
              label="New Enquiry"
              icon={<FaPlus />}
              className=" text-sm p-3  bg-blue-500 text-white capitalize hover:bg-blue-600 duration-300"
              onClick={() => {
                setMode("s");
                setOpenModel(true);
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <label>From Date</label>
            <Calendar
              touchUI
              name="fromdate"
              dateFormat="dd/mm/yyyy"
              value={dateData.fromDate}
              onChange={dateDatahandler}
              placeholder="DD/MM/YYYY"
              className="h-10 border-slate-500 border rounded-md"
              inputClassName="pl-3"
            />
          </div>

          <div className="flex flex-col">
            <label>To Date</label>
            <Calendar
              touchUI
              name="enddate"
              value={dateData.endDate}
              dateFormat="dd/mm/yyyy"
              onChange={dateDatahandler}
              placeholder="DD/MM/YYYY"
              className="h-10 border-slate-500 border rounded-md"
              inputClassName="pl-3"
            />
          </div>

          <div className="flex gap-2 mt-5">
            <Button
              disabled={
                dateData.fromDate !== null && dateData.endDate !== null
                  ? false
                  : true
              }
              onClick={dateFilterhandler}
              className="capitalize flex gap-3 bg-blue-500 hover:bg-blue-600 duration-200 text-white p-3"
            >
              <FaFilter /> filter
            </Button>
            <Button
              onClick={() => setDateData({ fromDate: null, endDate: null })}
              className="flex gap-3 bg-red-500 hover:bg-red-600 duration-200 text-white p-3"
            >
              <FaRedo /> Clear
            </Button>
          </div>
        </div>
      </div>
      <div className="relative border-4 min-w-80 bg-white rounded-lg border-blue-500 shadow-slate-500 shadow-md m-4 overflow-hidden">
        <DataTable
          value={enquiry}
          size="small"
          rows={10}
          showGridlines
          stripedRows
          header={header}
          tableStyle={{ minWidth: "50rem" }}
        >
          <Column
            field="code"
            headerClassName="border md:text-xs lg:text-lg text-nowrap pl-4 bg-slate-100"
            bodyClassName="flex justify-center pt-7"
            header="Sr."
            body={indexTemplate}
            sortable
          ></Column>
          <Column
            field="studentPhoto"
            headerClassName="p-2 md:text-xs lg:text-lg text-nowrap  border  bg-slate-100"
            header="Photo"
            body={imageTemplate}
            sortable
          ></Column>
          <Column
            field="studentName"
            headerClassName="p-3 md:text-xs lg:text-lg text-nowrap  border  bg-slate-100"
            header="Student Name"
            bodyClassName="md:text-xs lg:text-lg text-nowrap"
            sortable
          ></Column>
          <Column
            field="fatherName"
            headerClassName="p-3  md:text-xs lg:text-lg text-nowrap border  bg-slate-100"
            header="Father Name"
            bodyClassName="md:text-xs lg:text-lg text-nowrap"
            sortable
          ></Column>
          <Column
            field="course"
            headerClassName="p-3 md:text-xs lg:text-lg text-nowrap  border  bg-slate-100"
            bodyClassName="md:text-xs lg:text-lg text-nowrap"
            header="Course"
            sortable
          ></Column>
          <Column
            field="email"
            headerClassName="p-3 md:text-xs lg:text-lg text-nowrap border  bg-slate-100"
            header="Email"
            bodyClassName="md:text-xs lg:text-lg text-nowrap"
            sortable
          ></Column>
          <Column
            field="mobileNo"
            headerClassName="p-3 md:text-xs lg:text-lg text-nowrap border  bg-slate-100"
            header="Mobile No."
            bodyClassName="md:text-xs lg:text-lg text-nowrap"
            sortable
          ></Column>
          <Column
            field="enquiryDate"
            headerClassName="p-3 md:text-xs lg:text-lg text-nowrap border  bg-slate-100"
            header="Enquiry Date"
            bodyClassName="md:text-xs lg:text-lg text-nowrap"
            body={(e) => moment(e).format("DD/MM/YYYY")}
            sortable
          ></Column>
          <Column
            field="enquiryBy"
            headerClassName="p-3 md:text-xs lg:text-lg text-nowrap border  bg-slate-100"
            header="Enquiry By"
            bodyClassName="md:text-xs lg:text-lg text-nowrap"
            sortable
          ></Column>
          <Column
            field="status"
            headerClassName="p-3 md:text-xs lg:text-lg text-nowrap border  bg-slate-100"
            header="Enquiry Status"
            sortable
            body={EnquiryStatusbodyTemplate}
          ></Column>
          <Column
            field="quantity"
            headerClassName="p-3 md:text-xs lg:text-lg text-nowrap border  bg-slate-100"
            header="Action"
            body={ActionbodyTemplate}
            sortable
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}

export default Enquiry;
