import moment from "moment";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useLayoutEffect, useState } from "react";
import { BiPlus, BiPrinter } from "react-icons/bi";
import { FaPenToSquare } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { getFeesbyId } from "../../Redux/Slice/FeesSlice";
import FeesForm from "../../Utilites/FeesForm";
import NavBar from "../NavBar";
export default function FeesCollection() {
  const [selectedData, setSelectedData] = useState();
  const [openModel, setopenModel] = useState(false);
  const [mode, setMode] = useState("s");
  const [dateData, setDateData] = useState();
  const { Fees } = useSelector((state) => state.Fees);
  const { userid } = useSelector((state) => state.UserAuth);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(getFeesbyId(userid));
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
  const ActionbodyTemplate = (rowData) => {
    return (
      <div className="flex items-center justify-center gap-2">
        <Button
          label={<BiPrinter size={20} />}
          onClick={() => {
            setSelectedData(rowData);
            setopenModel(true);
            setMode("u");
          }}
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
      <NavBar />
      <Dialog
        header="Fees Collection"
        visible={openModel}
        position="top"
        onHide={() => setopenModel(false)}
        style={{ width: "50vw" }}
      >
        <FeesForm mode={mode} data={selectedData} />
      </Dialog>
      <div className="m-4 p-3 border-4 rounded-lg border-blue-500 shadow-md">
        <div className="flex justify-between">
          <strong className="">Fees Collections</strong>
          <div>
            <Button
              label="New Fees"
              icon={<BiPlus size={20} />}
              className=" text-sm p-3  bg-blue-500 text-white capitalize hover:bg-blue-600 duration-300"
              onClick={() => {
                setMode("s");
                setopenModel(true);

                setSelectedData(null);
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
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

          <div className="flex flex-col">
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

          <div className="flex gap-2 mt-5">
            <Button
              label="Filter"
              disabled={dateData?.fromDate && dateData.endDate ? false : true}
              onClick={dateFilterhandler}
              className="bg-blue-500 text-white p-3"
            />
            <Button
              label="Clear"
              onClick={() => setDateData({ fromDate: null, endDate: null })}
              className="bg-red-500 text-white p-3"
            />
          </div>
        </div>
      </div>
      <div className="m-3">
        <DataTable value={Fees} size="small" stripedRows showGridlines>
          <Column field="code" header="Sr. No." body={indexTemplate}></Column>
          <Column
            field="date"
            header="Date"
            sortable
            body={(e) => moment(e?.date).format("DD/MM/YYYY")}
          ></Column>
          <Column field="studentname" header="Student Name" sortable></Column>
          <Column field="paymentMode" header="Payment Mode" sortable></Column>
          <Column field="dueAmt" header="Due Amt" sortable></Column>
          <Column field="dicount" header="Discount" sortable></Column>
          <Column field="paidAmt" header="Paid Amount" sortable></Column>
          <Column
            field="ApayDueAmt"
            header="After Pay Due Amt."
            sortable
          ></Column>
          <Column field="collecteBy" header="Collected By" sortable></Column>
          <Column field="remark" header="Remark" sortable></Column>
          <Column
            field="remark"
            header="Action"
            body={ActionbodyTemplate}
          ></Column>
        </DataTable>
      </div>
    </>
  );
}