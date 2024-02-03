import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { PiExport } from "react-icons/pi";
import { useState } from "react";
import { UserTitle } from "../utils/constants";
export default function User() {
  const User = [
    {
      userID: 1,
      username: "John",
      email: "john@john.com",
      phone: "(201) 555-0124",
      create_at: "2024-01-27 11:46:02.996387",
    },
    {
      userID: 2,
      username: "Felix",
      email: "felix@felix.com",
      phone: "(201) 666-0123",
      create_at: "2024-01-27 11:46:02.996387",
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
            {UserTitle.map((item) => (
              <th key={item}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {User.map((item) => {
            const day = new Date(item.create_at);
            const fomattedDate = day.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            const [check, setCheck] = useState(false);
            return (
              <tr
                key={item.userID}
                className={`${check ? "bg-base-200" : ""} `}
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
                <td>{item.userID}</td>
                <td>
                  <div className="font-bold">{item.username}</div>
                  <div className="text-sm opacity-50 font-semibold">
                    {item.email}
                  </div>
                </td>
                <td>{item.phone}</td>
                <td>{fomattedDate}</td>
                <td className="flex text-xl gap-3 cursor-pointer ">
                  <FaRegEdit className="text-green-500 hover:text-green-700" />
                  <FaRegTrashCan className="text-red-500 hover:text-red-700" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
