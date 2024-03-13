import { useEffect, useMemo, useRef, useState } from "react";
import Table from "../components/Table";
import { IoMdSearch } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import useSidebarContext from "../context/SidebarContext";

export type EmployeeType = {
  id: number;
  firstname: string;
  email: string;
  lastName: string;
};
export default function AdminManage() {
  const [query, setQuery] = useState<string>("");
  const titleRef = useRef<HTMLSelectElement>(null);
  const columnsTitles = ["Employee ID", "Name", "Email", "Action"];
  const Employees = [
    {
      id: 1,
      firstname: "John",
      email: "HJkKd@example.com",
      lastName: "Doe",
    },
    {
      id: 2,
      firstname: "Jane",
      email: "HJkKd@example.com",
      lastName: "Doe",
    },
  ];
  const rowsDisplay = useMemo(() => {
    return Employees.map((employee: EmployeeType) => {
      return (
        <tr key={employee.id} className={` font-semibold`}>
          <td>{employee.id}</td>
          <td>
            {employee.firstname} {employee.lastName}
          </td>
          <td>{employee.email}</td>
          <td>
            <div className="cursor-pointer text-xl flex gap-2 items-center ">
              <FaRegEdit className="text-green-500 hover:text-green-700" />
              <FaRegTrashCan className="text-red-500 hover:text-red-700" />
            </div>
          </td>
        </tr>
      );
    });
  }, [Employees]);

  return (
    <div className="overflow-auto bg-white m-6">
      <TopSection query={query} setQuery={setQuery} titleRef={titleRef} />
      <Table title={columnsTitles} RowsDisplay={rowsDisplay} />
    </div>
  );
}
type TopSectionProps = {
  query: string;
  setQuery: any;
  titleRef: any;
};
function TopSection(props: TopSectionProps) {
  return (
    <div className="flex items-center justify-between sm:m-4 flex-wrap gap-4">
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-2 border-b-2 ">
          <IoMdSearch className="text-2xl rounded-lg" />
          <input
            onChange={(e) => props.setQuery(e.target.value)}
            type="search"
            className="h-8 focus:outline-none "
            placeholder={`Search ...`}
          />
        </div>
        <select ref={props.titleRef}>
          <option value="title">Name</option>
          <option value="productId">ID</option>
          <option value="price">Email</option>
        </select>
        <button className="btn btn-sm">Add New +</button>
      </div>
    </div>
  );
}
