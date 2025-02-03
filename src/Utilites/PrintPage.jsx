import moment from "moment";
import { Button } from "primereact/button";
import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { BiPrinter } from "react-icons/bi";
import { Avatar } from "primereact/avatar";
import { getSchoolbyId } from "../Redux/Slice/SchoolSlicse";
import { useDispatch, useSelector } from "react-redux";
export default function PrintPage(params) {
  const ref = useRef();

  const { School } = useSelector((state) => state.School);
  const { userid } = useSelector((state) => state.UserAuth);
  const location = useLocation();
  const { student, fees } = location.state || {};
  const dispatch = useDispatch();

  const table = [
    { sr: 1, part: "Admission Fee", amt: fees.admissionFee || 0 },
    { sr: 2, part: "Annual Fee", amt: fees.annualFee || 0 },
    { sr: 3, part: "Tuition Fee", amt: fees.tuitionFee || 0 },
    { sr: 4, part: "Transport Fee", amt: fees.transportFee || 0 },
    { sr: 5, part: "Stationary Fee", amt: fees?.stationoryFees || 0 },
    { sr: 6, part: "Exam Fee", amt: fees.examFee || 0 },
    { sr: 7, part: "Reg Fee", amt: fees.regFee || 0 },
    { sr: 8, part: "Misc Fee", amt: fees?.miscFee || 0 },
    { sr: 9, part: "Other Fee", amt: fees?.otherfee || 0 },
    { sr: 10, part: "Caution Money", amt: fees?.cautionmoneyFee || 0 },
    { sr: 11, part: "Previous Balance", amt: fees?.previousbalanceFee || 0 },
  ];

  const total = table.reduce((acc, item) => acc + item.amt, 0);

  useLayoutEffect(() => {
    dispatch(getSchoolbyId(userid));
  }, [dispatch]);

  console.log(fees);

  return (
    <>
      <ReactToPrint
        trigger={() => (
          <Button
            label="Print"
            icon={<BiPrinter size={20} />}
            className="bg-blue-500 hover:bg-blue-600 duration-200 flex gap-3 px-10 py-3 text-white m-3 print:hidden"
          />
        )}
        content={() => ref.current}
      />

      <div ref={ref} className="flex justify-center">
        <div className="flex print:scale-95 bg-white">
          <div className="w-[400px] h-[800px] shadow-slate-800 print:shadow-none shadow flex flex-col items-center">
            <h1 className="text-3xl font-black uppercase mt-4 flex items-center gap-5">
              <Avatar image={School?.schoolPhoto} shape="circle" size="large" />
              {School?.schoolName}
            </h1>
            <h1 className="text-xs bg-red-300 w-full px-3 py-1 flex justify-center mt-2">
              <span className="font-bold">Mobile: </span>
              {School?.phone} / {School?.phone2}
            </h1>
            <h1 className="mt-1 text-xs border border-slate-600 border-l-0 border-r-0 w-full px-3 py-0 flex justify-start">
              <span className="font-bold text-nowrap">Address :</span>
              <p className="uppercase">
                {School?.address} {School?.city} {School?.state}{" "}
                {School?.pincode}
              </p>
            </h1>
            <h1 className="mt-2 text-white bg-slate-800 w-full px-3 py-1 flex justify-center">
              FEE RECEIPT
            </h1>
            <h1 className="underline text-2xlw-full px-3 py-1 flex justify-center">
              Student Copy
            </h1>
            <div className="flex justify-between w-full gap-5 px-3">
              <ul className="text-xs">
                <li>
                  <span className="font-bold">Name:</span> {student.studentName}
                </li>
                <li>
                  <span className="font-bold">Father: </span>{" "}
                  {student.fatherName}
                </li>
                <li>
                  <span className="font-bold">Collected By: </span>{" "}
                  {fees.collecteBy}
                </li>
                <li>
                  <span className="font-bold">Narration: </span> {fees.remark}
                </li>
                <li>
                  <span className="font-bold">Fee Month: </span>{" "}
                  {moment(fees.date).format("MMMM-yyyy")}
                </li>
              </ul>
              <ul className="w-36 text-xs">
                <li className="font-bold">Payment Id:</li>
                <li>
                  <span className="font-bold">Date: </span>
                  {moment(fees.date).format("DD/MM/YYYY")}
                </li>
                <li>
                  <span className="font-bold">Class: </span>
                </li>
                <li>
                  <span className="font-bold">Ledger Number: </span>
                </li>
                <li>
                  <span className="font-bold">Payment Mode: </span>
                  {fees.paymentMode}
                </li>
              </ul>
            </div>
            <div className="flex justify-center mt-3 w-full px-3">
              <table className="">
                <thead className="flex">
                  <th className="w-16 text-xs border border-black px-3 flex">
                    Sr. No.
                  </th>
                  <th className="w-48 text-xs border border-l-0 border-black px-3 flex justify-start">
                    Particulars
                  </th>
                  <th className="w-28 text-xs border border-l-0 border-black px-3 flex justify-center">
                    Amount
                  </th>
                </thead>
                <tbody className="flex flex-col">
                  {table.map((item) => (
                    <tr className="flex">
                      <td className="w-16 text-xs border border-t-0 border-black px-3 flex items-center justify-center">
                        {item.sr}
                      </td>
                      <td className="w-48 text-xs border border-t-0 border-l-0 border-black px-3 flex justify-start items-center">
                        {item.part}
                      </td>
                      <td className="w-28 text-xs border border-l-0  border-t-0 border-black px-3 flex justify-center items-center">
                        {item.amt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 mr-24 w-full flex justify-end gap-3">
              <ul className="text-xs">
                <li>
                  <span>Total:</span>
                </li>
                <li>
                  <span>Fine/Penaly:</span>
                </li>
                <li>
                  <span>Discount:</span>
                </li>
                <li>
                  <span className="text-nowrap">Net Amount:</span>
                </li>
                <li>
                  <span className="text-nowrap">Paid Amount:</span>
                </li>
                <li>
                  <span>Balance:</span>
                </li>
              </ul>
              <ul className="text-xs">
                <li>
                  <span>{total}</span>
                </li>
                <li>
                  <span>0</span>
                </li>
                <li>
                  <span>{fees?.dicount}</span>
                </li>
                <li>
                  <span>{total + fees?.dicount}</span>
                </li>
                <li>
                  <span>{fees?.paidAmt}</span>
                </li>
                <li>
                  <span>{fees?.ApayDueAmt}</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-evenly w-full mt-3">
              <div className="flex flex-col items-center">
                <div className="border w-24 h-24"></div>
                <p>Payment QR</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 relative overflow-hidden">
                  <img src={School?.schoolStamp} className="w-full" />
                </div>
                <p>School Stamp</p>
              </div>
            </div>
            <p className="text-xs mt-1">
              This Is Computer Generated Hence Signature Is Not Required.
            </p>
          </div>
          <div className="p-0 m-0 border border-black border-dashed mx-2" />
        </div>
      </div>
    </>
  );
}
