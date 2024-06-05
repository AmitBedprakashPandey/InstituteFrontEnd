import { Button } from "primereact/button";
import { useRef } from "react";
import ReactToPrint from "react-to-print";

export default function PrintPage(params) {
  const ref = useRef();
  const table = [
    { sr: 1, part: "Admission Fee", amt: 0 },
    { sr: 2, part: "Annual Fee", amt: 0 },
    { sr: 3, part: "Tuition Fee", amt: 400 },
    { sr: 4, part: "Transport Fee", amt: 0 },
    { sr: 5, part: "Stationary Fee", amt: 0 },
    { sr: 6, part: "Exam Fee", amt: 0 },
    { sr: 7, part: "Reg Fee", amt: 0 },
    { sr: 8, part: "Misc Fee", amt: 0 },
    { sr: 9, part: "Other Fee", amt: 0 },
    { sr: 10, part: "Caution Money", amt: 0 },
    { sr: 11, part: "Previous Balance", amt: 550 },
  ];

  return (
    <>
      <ReactToPrint
        trigger={() => (
          <Button
            label="Print"
            className="bg-blue-500 px-10 py-3 text-white m-3 print:hidden"
          />
        )}
        content={() => ref.current}
      />

      <div ref={ref} className="flex justify-center">
        <div className="flex gap-3 print:scale-95">
          <div className="w-[400px] h-[800px] mt-5 shadow-slate-800 print:shadow-none shadow flex flex-col items-center">
            <h1 className="text-3xl font-black uppercase mt-4">
              abcd public school
            </h1>
            <h1 className="text-xs flex justify-end mt-2 w-full mr-3">
              UDISE Code: 019100108145
            </h1>
            <h1 className="text-xs bg-red-300 w-full px-3 py-1 flex justify-center">
              Mobile: 019100108145 / 019100108145
            </h1>
            <h1 className="mt-1 text-xs border border-slate-600 border-l-0 border-r-0 w-full px-3 py-0 flex justify-start">
              Address : xxxxxxxx, xxxxxxxxxxxx, xxxxxxxxxxxxxxxx, xxxxxxxxxxxxxx
            </h1>
            <h1 className="mt-2 text-white bg-slate-800 w-full px-3 py-1 flex justify-center">
              FEE RECEIPT
            </h1>
            <h1 className="underline text-2xlw-full px-3 py-1 flex justify-center">
              Student Copy
            </h1>
            <div className="flex justify-between w-full gap-5 px-3">
              <ul className="text-xs">
                <li>Name:</li>
                <li>Father:</li>
                <li>Collected By:</li>
                <li>Narration:</li>
                <li>Fee Month:</li>
              </ul>
              <ul className="w-36 text-xs">
                <li className="font-bold">Payment Id:</li>
                <li>Date:</li>
                <li>Class:</li>
                <li>Ledger Number:</li>
                <li>Payment Mode:</li>
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
                  <th className="w-28 text-xs border border-l-0 border-black px-3 flex justify-start">
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
                  <span>950</span>
                </li>
                <li>
                  <span>0</span>
                </li>
                <li>
                  <span>10</span>
                </li>
                <li>
                  <span>940</span>
                </li>
                <li>
                  <span>800</span>
                </li>
                <li>
                  <span>140</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-evenly w-full mt-3">
              <div className="flex flex-col items-center">
                <div className="border w-24 h-24"></div>
                <p>Payment QR</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="border w-24 h-24"></div>
                <p>School Stamp</p>
              </div>
            </div>
            <p className="text-xs mt-1">This Is Computer Generated Hence Signature Is Not Required.
</p>
          </div>
          <div className="w-[400px] h-[800px] mt-5 shadow-slate-800 print:shadow-none shadow flex flex-col items-center">
            <h1 className="text-3xl font-black uppercase mt-4">
              abcd public school
            </h1>
            <h1 className="text-xs flex justify-end mt-2 w-full mr-3">
              UDISE Code: 019100108145
            </h1>
            <h1 className="text-xs bg-red-300 w-full px-3 py-1 flex justify-center">
              Mobile: 019100108145 / 019100108145
            </h1>
            <h1 className="mt-1 text-xs border border-slate-600 border-l-0 border-r-0 w-full px-3 py-0 flex justify-start">
              Address : xxxxxxxx, xxxxxxxxxxxx, xxxxxxxxxxxxxxxx, xxxxxxxxxxxxxx
            </h1>
            <h1 className="mt-2 text-white bg-slate-800 w-full px-3 py-1 flex justify-center">
              FEE RECEIPT
            </h1>
            <h1 className="underline text-2xlw-full px-3 py-1 flex justify-center">
            Office Copy
            </h1>
            <div className="flex justify-between w-full gap-5 px-3">
              <ul className="text-xs">
                <li>Name:</li>
                <li>Father:</li>
                <li>Collected By:</li>
                <li>Narration:</li>
                <li>Fee Month:</li>
              </ul>
              <ul className="w-36 text-xs">
                <li className="font-bold">Payment Id:</li>
                <li>Date:</li>
                <li>Class:</li>
                <li>Ledger Number:</li>
                <li>Payment Mode:</li>
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
                  <th className="w-28 text-xs border border-l-0 border-black px-3 flex justify-start">
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
                  <span>950</span>
                </li>
                <li>
                  <span>0</span>
                </li>
                <li>
                  <span>10</span>
                </li>
                <li>
                  <span>940</span>
                </li>
                <li>
                  <span>800</span>
                </li>
                <li>
                  <span>140</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-evenly w-full mt-3">
              <div className="flex flex-col items-center">
                <div className="border w-24 h-24"></div>
                <p>Payment QR</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="border w-24 h-24"></div>
                <p>School Stamp</p>
              </div>
            </div>

            <p className="text-xs mt-1">This Is Computer Generated Hence Signature Is Not Required.
</p>
          </div>
         
        </div>
      </div>
    </>
  );
}
