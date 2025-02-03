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
          if (
            !admission ||
            !Array.isArray(admission) ||
            admission.length === 0
          ) {
            alert("Enquiry data is not defined or is not an array or is empty");
            return;
          }

          // Define the columns to export
          const columnsToExport = [
            "studentName",
            "fatherName",
            "motherName",
            "dob",
            "regdDate",
            "mobileNo",
            "altMobileNo",
            "email",
            "bloodGroup",
            "gender",
            "religion",
            "studentAadharNo",
            "studentQualification",
            "nationality",
            "caste",
            "address1",
            "address2",
            "city",
            "state",
            "examCenter",
            "foundationCourse",
            "status",
          ];

          // Filter the data to include only the selected columns
          const filteredData = admission.map((item, index) => {
            const filteredItem = {
              "Sr.No.": index + 1, // Add serial number
            };
            columnsToExport.forEach((col) => {
              if (col === "dob") {
                filteredItem[col] = moment(item[col]).format("DD/MM/YYYY");
              } else if (col === "regdDate") {
                filteredItem[col] = moment(item[col]).format("DD/MM/YYYY");
              } else {
                filteredItem[col] = item[col];
              }
            });
            return filteredItem;
          });

          const worksheet = xlsx.utils.json_to_sheet(filteredData);

          const workbook = {
            Sheets: { "Admission List": worksheet },
            SheetNames: ["Admission List"],
          };

          const excelBuffer = xlsx.write(workbook, {
            bookType: "xlsx",
            type: "array",
          });

          saveAsExcelFile(excelBuffer, "admissionlist");
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
      <Toast ref={toast} />
      <Dialog
        header="Admission Form"
        position="top"
        className="w-full h-full m-0 "
        maximized={true}
        contentClassName="px-4 lg:px-10 pt-3 lg:overflow-y-hidden"
        headerClassName="px-6 py-3 border-b"
        visible={openModel}
        onHide={() => setOpenModel(false)}
      >
        <AdmissionForm mode={mode} data={selectedData} />
      </Dialog>
      <Dialog
        header="Enquiry Form"
        position="top"
        className="w-full h-full m-0 "
        maximized={true}
        contentClassName="px-4 lg:px-10 pt-3 lg:overflow-y-hidden"
        headerClassName="px-6 py-3 border-b"
        visible={openModel2}
        onHide={() => setOpenModel2(false)}
      >
        <EnquiryForm mode={"s"} />
      </Dialog>
      <div className="md:m-3 p-3 border md:rounded-lg border-slate-400 shadow-slate-500 md:shadow-sm bg-white">
        <div className="grid md:flex md:justify-between">
          <strong className="text-lg py-2 md:text-md lg:text-2xl">
            Student Admission List
          </strong>
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
        <div className="grid lg:grid-cols-2 gap-3">
          <div className="grid">
            <label className="text-sm pt-3">Registration Date</label>
            <Calendar
              touchUI
              placeholder="DD/MM/YYYY"
              className="h-10 border-slate-500 border rounded-md"
              inputClassName="pl-3 "
            />
          </div>

          <div className="flex gap-2 mt-8 ">
            <Button
              icon={<FaFilter />}
              className="flex gap-2 bg-blue-500 text-white px-3 py-3"
            >
              <span className="hidden md:block">Filter</span>
            </Button>
            <Button
              icon={<FaRedo />}
              className="flex gap-2 bg-red-500 text-white px-3 py-3"
            >
              <span className="hidden md:block">Clear</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative bg-white md:rounded-lg border border-slate-400 shadow-slate-500 md:shadow-md md:m-4 p-2 overflow-hidden">
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
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Sr."
            sortable
            body={indexTemplate}
          ></Column>
          <Column
            field="studentPhoto"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Photo"
            body={imageTemplate}
            sortable
          ></Column>
          <Column
            field="_id"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Student Id"
            sortable
          ></Column>
          <Column
            field="userid"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="User Id"
            sortable
          ></Column>
          <Column
            field="category"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Password"
            sortable
          ></Column>
          <Column
            field="studentName"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Student Name"
            sortable
          ></Column>
          <Column
            field="fatherName"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Father Name"
            sortable
          ></Column>
          <Column
            field="mobileNo"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Mobile No."
            sortable
          ></Column>
          <Column
            field="examCenter"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Exam Center"
            sortable
          ></Column>
          <Column
            field="regdDate"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Req. Date"
            body={(e) => moment(e).format("DD/MM/YYYY")}
            sortable
          ></Column>
          <Column
            field="status"
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

export default Admission;
