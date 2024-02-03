import { FaEye } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { PiExport } from "react-icons/pi";
import { useState } from "react";
import { OrderTitle } from "../utils/constants";
export default function OrderManagement() {
  const OrderData = [
    {
      orderid: 1,
      custumer: "John",
      date: "2024-01-27 11:46:02.996387",
      total: 2500,
      status: "Delivered",
    },
    {
      orderid: 2,
      custumer: "Felix",
      date: "2024-01-27 11:46:02.996387",
      total: 1300.98,
      status: "Delivered",
    },
  ];
  return (
    <div className="overflow-x-auto bg-white m-6  overflow-auto">
      <div className="flex items-center justify-between m-4">
        <div className="flex items-center gap-2 border-b-2">
          <IoMdSearch className="text-2xl rounded-lg" />
          <input
            type="text"
            className="h-8 focus:outline-none "
            placeholder={`Search ...`}
          />
        </div>
        <div className="text-xl text-blue-500 flex items-center gap-2 cursor-pointer hover:text-blue-700">
          <PiExport />
          <h2>Export</h2>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            {OrderTitle.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {OrderData.map((item) => {
            const day = new Date(item.date);
            const fomattedDate = day.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            const [check, setCheck] = useState(false);
            return (
              <tr
                key={item.orderid}
                className={`${check ? "bg-base-200" : ""}`}
              >
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-accent"
                      onChange={() => setCheck(!check)}
                    />
                  </label>
                </th>
                <td>{item.orderid}</td>
                <td>{item.custumer}</td>
                <td>{fomattedDate}</td>
                <td>$ {item.total}</td>
                <td>{item.status}</td>
                <td className="cursor-pointer text-2xl text-blue-500 hover:text-blue-800">
                  <FaEye />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
