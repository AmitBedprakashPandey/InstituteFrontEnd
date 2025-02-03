import moment from "moment";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useLayoutEffect, useState } from "react";
import {
  BiPlus,
  BiPrinter,
  BiFilter,
  BiRedo,
  BiFilterAlt,
} from "react-icons/bi";
import { FaPenToSquare } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getFeesbyId } from "../../Redux/Slice/FeesSlice";
import FeesForm from "../../Utilites/FeesForm";
import NavBar from "../NavBar";
import { useNavigate } from "react-router-dom";
import { getAdmissionbyId } from "../../Redux/Slice/AdmissionSlice";

export default function FeesCollection() {
  const [selectedData, setSelectedData] = useState();
  const [selectedPrint, setSelectedPrint] = useState();
  const [openModel, setopenModel] = useState(false);
  const [mode, setMode] = useState("s");
  const [dateData, setDateData] = useState();
  const { Fees } = useSelector((state) => state.Fees);
  const { admission } = useSelector((state) => state.Admission);
  const { userid } = useSelector((state) => state.UserAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(getFeesbyId(userid));
    dispatch(getAdmissionbyId(userid));
  }, [dispatch]);

  const dateDatahandler = (e) => {
    setDateData({ ...dateData, [e.target.name]: e.target.value });
  };

  const dateFilterhandler = () => {
    console.log(dateData);
  };
  const indexTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1;
  };

  const print = (data) => {
    const student = admission.filter(
      (item) => item.studentName === data.studentname
    );
    console.log(student);
    navigate("/account/print", { state: { student, fees: data } });
  };

  const ActionbodyTemplate = (rowData) => {
    return (
      <div className="flex items-center justify-center gap-2">
        <Button
          label={<BiPrinter size={20} />}
          onClick={() => print(rowData)}
          className="text-blue-500 p-2"
        />

        <Button
          label={<FaPenToSquare />}
          onClick={() => {
            setSelectedData(rowData);
            setopenModel(true);
            setMode("u");
          }}
          className="text-blue-500 p-2"
        />
      </div>
    );
  };

  return (
    <>
      <Dialog
        header="Fees Collection"
        position="top"
        className="w-full h-full m-0 "
        maximized={true}
        contentClassName="px-4 lg:px-10 pt-3 lg:overflow-y-hidden"
        headerClassName="px-6 py-3 border-b"
        visible={openModel}
        onHide={() => setopenModel(false)}
        style={{ width: "50vw" }}
      >
        <FeesForm mode={mode} data={selectedData} />
      </Dialog>
      <div className="md:m-3 p-3 border md:rounded-lg border-slate-400 shadow-slate-500 md:shadow-sm bg-white">
        <div className="flex justify-between">
          <strong className="">Fees Collections</strong>
          <div>
            <Button
              label="New Fees"
              icon={<BiPlus size={20} />}
              className=" text-sm p-3 flex gap-3 bg-blue-500 text-white capitalize hover:bg-blue-600 duration-200"
              onClick={() => {
                setMode("s");
                setopenModel(true);

                setSelectedData(null);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
          <div className="grid">
            <label>From Date</label>
            <Calendar
              touchUI
              name="fromDate"
              dateFormat="dd/mm/yy"
              value={dateData?.fromDate}
              onChange={dateDatahandler}
              placeholder="DD/MM/YYYY"
              className="h-10 border-slate-500 border rounded-md"
              inputClassName="pl-3"
            />
          </div>

          <div className="grid">
            <label>To Date</label>
            <Calendar
              touchUI
              name="endDate"
              value={dateData?.endDate}
              dateFormat="dd/mm/yy"
              onChange={dateDatahandler}
              placeholder="DD/MM/YYYY"
              className="h-10 border-slate-500 border rounded-md"
              inputClassName="pl-3"
            />
          </div>

          <div className="flex gap-2 md:mt-5">
            <Button
              label="Filter"
              icon={<BiFilterAlt size={20} />}
              disabled={dateData?.fromDate && dateData.endDate ? false : true}
              onClick={dateFilterhandler}
              className="bg-blue-500 hover:bg-blue-600 duration-200 flex gap-3 text-white p-3"
            />
            <Button
              label="Clear"
              icon={<BiRedo size={20} />}
              onClick={() => setDateData({ fromDate: null, endDate: null })}
              className="bg-red-500 hover:bg-red-600 duration-200 flex gap-3 text-white p-3"
            />
          </div>
        </div>
      </div>
      <div className="relative bg-white md:rounded-lg border border-slate-400 shadow-slate-500 md:shadow-md md:m-4 p-2 overflow-hidden">
        <DataTable value={Fees} size="small" stripedRows showGridlines>
          <Column
            field="code"
            header="Sr."
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            body={indexTemplate}
          ></Column>
          <Column
            field="date"
            header="Date"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            sortable
            body={(e) => moment(e?.date).format("DD/MM/YYYY")}
          ></Column>
          <Column
            field="studentname"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Student Name"
            sortable
          ></Column>
          <Column
            field="paymentMode"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Payment Mode"
            sortable
          ></Column>
          <Column
            field="dueAmt"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Due Amt"
            sortable
          ></Column>
          <Column
            field="dicount"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Discount"
            sortable
          ></Column>
          <Column
            field="paidAmt"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Paid Amount"
            sortable
          ></Column>
          <Column
            field="ApayDueAmt"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="After Pay Due Amt."
            sortable
          ></Column>
          <Column
            field="collecteBy"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Collected By"
            sortable
          ></Column>
          <Column
            field="remark"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Remark"
            sortable
          ></Column>
          <Column
            field="remark"
            headerClassName="text-xs  md:text-base md:font-semibold font-normal text-nowrap pl-4 border-b border-black"
            header="Action"
            body={ActionbodyTemplate}
          ></Column>
        </DataTable>
      </div>
    </>
  );
}
