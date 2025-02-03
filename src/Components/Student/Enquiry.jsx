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
  FaFileExcel,
  FaFilter,
  FaImage,
  FaPenToSquare,
  FaPlus,
} from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getEnquirybyId, updateEnquiry } from "../../Redux/Slice/EnquirySlice";
import { createAdmission } from "../../Redux/Slice/AdmissionSlice";
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

  const exportExcel = () => {
    import("xlsx")
      .then((xlsx) => {
        // Verify if xlsx was imported successfully
        if (!xlsx) {
          alert("Failed to load xlsx library");
          return;
        }
        try {
          // Check if 'enquiry2' is defined and has data
          if (!enquiry || !Array.isArray(enquiry) || enquiry.length === 0) {
            alert("Enquiry data is not defined or is not an array or is empty");
            return;
          }

          // Define the columns to export
          const columnsToExport = [
            "studentName",
            "fatherName",
            "course",
            "email",
            "mobileNo",
            "enquiryDate",
            "enquiryBy",
            "status",
          ];

          // Filter the data to include only the selected columns
          const filteredData = enquiry.map((item, index) => {
            const filteredItem = {
              "Sr.No.": index + 1, // Add serial number
            };
            columnsToExport.forEach((col) => {
              if (col === "enquiryDate") {
                filteredItem[col] = moment(item[col]).format("DD/MM/YYYY");
              } else {
                filteredItem[col] = item[col];
              }
            });
            return filteredItem;
          });

          const worksheet = xlsx.utils.json_to_sheet(filteredData);

          const workbook = {
            Sheets: { "Enquiry List": worksheet },
            SheetNames: ["Enquiry List"],
          };

          const excelBuffer = xlsx.write(workbook, {
            bookType: "xlsx",
            type: "array",
          });

          saveAsExcelFile(excelBuffer, "enquirylist");
        } catch (error) {
          console.error("Error creating Excel file:", error);
        }
      })
      .catch((error) => {
        console.error("Error importing xlsx:", error);
      });
  };
  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver")
      .then((module) => {
        if (module && module.default) {
          const EXCEL_TYPE =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
          const EXCEL_EXTENSION = ".xlsx";
          const data = new Blob([buffer], {
            type: EXCEL_TYPE,
          });

          module.default.saveAs(
            data,
            fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
          );
        } else {
          console.error("Failed to load file-saver module");
        }
      })
      .catch((error) => {
        console.error("Error importing file-saver:", error);
      });
  };

  const header = (
    <div className="flex items-center justify-end gap-2">
      <div>
        {/* <Button
        type="button"
        icon={<FaFileCsv />}
        disabled={products}
        className="border-black w-10 h-10 rounded-full border-2"
        onClick={() => exportCSV(false)}
        data-pr-tooltip="CSV"
      /> */}
        <Button
          type="button"
          icon={<FaFileExcel color="#fff" />}
          className="bg-green-500 border-black border w-10 h-10 rounded-full "
          onClick={exportExcel}
          data-pr-tooltip="XLS"
        />
        {/* <Button
        type="button"
        disabled={products}
        icon={<FaFilePdf color="#fff" />}
        className="bg-red-500 border-black border w-10 h-10 rounded-full "
        onClick={exportPdf}
        data-pr-tooltip="PDF"
      /> */}
      </div>
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
        {rowData?.enquiryStatus === true ? (
          <Button
            label={"Confired"}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-5 md:py-1 md:px-3  duration-200"
          />
        ) : (
          <Button
            label={"Panding"}
            onClick={() => {
              dispatch(
                updateEnquiry({
                  ...rowData,
                  enquiryStatus: true,
                })
              ).then((item) => dispatch(createAdmission(item.payload?.data)));
            }}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 md:py-1 md:px-3  duration-200"
          />
        )}
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
      <Dialog
        header="Enquiry Form"
        position="top"
        className="w-full h-full m-0 "
        maximized={true}
        contentClassName="px-4 lg:px-10 pt-3 lg:overflow-y-hidden"
        headerClassName="px-6 py-3 border-b"
        visible={openModel}
        onHide={() => setOpenModel(false)}
      >
        <EnquiryForm mode={mode} data={selectedData} />
      </Dialog>
      <div className="md:m-3 p-3 border md:rounded-lg border-slate-400 shadow-slate-500 md:shadow-sm bg-white">
        <div className="flex justify-between">
          <strong className="">Register Enquries</strong>
          <div>
            <Button
              label="New Enquiry"
              icon={<FaPlus size={20} />}
              className="flex gap-3  text-sm p-3  bg-blue-500 text-white capitalize hover:bg-blue-600 duration-300"
              onClick={() => {
                setMode("s");
                setOpenModel(true);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="grid">
            <label>From Date</label>
            <Calendar
              touchUI
              name="fromdate"
              dateFormat="dd/mm/yyyy"
              value={dateData.fromDate}
              onChange={dateDatahandler}
              placeholder="DD/MM/YYYY"
              className="min-h-12 border-slate-500 border rounded-md"
              inputClassName="pl-3"
            />
          </div>

          <div className="grid">
            <label>To Date</label>
            <Calendar
              touchUI
              name="enddate"
              value={dateData.endDate}
              dateFormat="dd/mm/yyyy"
              onChange={dateDatahandler}
              placeholder="DD/MM/YYYY"
              className="min-h-12 border-slate-500 border rounded-md"
              inputClassName="pl-3"
            />
          </div>

          <div className="flex gap-2 md:mt-7">
            <Button
              disabled={
                dateData.fromDate !== null && dateData.endDate !== null
                  ? false
                  : true
              }
              onClick={dateFilterhandler}
              className="capitalize flex gap-3 bg-blue-500 hover:bg-blue-600 duration-200 text-white px-3 w-full lg:w-24"
            >
              <FaFilter size={20} />
              filter
            </Button>
            <Button
              onClick={() => setDateData({ fromDate: null, endDate: null })}
              className="flex gap-3 bg-red-500 hover:bg-red-600 duration-200 text-white p-3 w-full lg:w-24  "
            >
              <FaRedo size={20} />
              <span className="">Clear</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="relative bg-white md:rounded-lg border border-slate-400 shadow-slate-500 md:shadow-md md:m-4 p-2 overflow-hidden">
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
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            bodyClassName="flex justify-center pt-7"
            header="Sr."
            body={indexTemplate}
            sortable
          ></Column>
          <Column
            field="studentPhoto"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Photo"
            body={imageTemplate}
            sortable
          ></Column>
          <Column
            field="studentName"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Student Name"
            bodyClassName="md:text-xs lg:text-lg text-nowrap"
            sortable
          ></Column>
          <Column
            field="fatherName"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Father Name"
            bodyClassName="md:text-xs lg:text-lg text-nowrap"
            sortable
          ></Column>
          <Column
            field="course"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            bodyClassName="md:text-xs lg:text-lg text-nowrap"
            header="Course"
            sortable
          ></Column>
          <Column
            field="email"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Email"
            bodyClassName="md:text-xs lg:text-lg text-nowrap"
            sortable
          ></Column>
          <Column
            field="mobileNo"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Mobile No."
            bodyClassName="md:text-xs lg:text-lg text-nowrap"
            sortable
          ></Column>
          <Column
            field="enquiryDate"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Enquiry Date"
            bodyClassName="md:text-xs lg:text-lg text-nowrap"
            body={(e) => moment(e).format("DD/MM/YYYY")}
            sortable
          ></Column>
          <Column
            field="enquiryBy"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Enquiry By"
            bodyClassName="md:text-xs lg:text-lg text-nowrap"
            sortable
          ></Column>
          <Column
            field="status"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Enquiry Status"
            sortable
            body={EnquiryStatusbodyTemplate}
          ></Column>
          <Column
            field="quantity"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
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
