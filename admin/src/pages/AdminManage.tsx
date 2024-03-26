import { useEffect, useMemo, useRef, useState } from "react";
import Table from "../components/Table";
import { IoMdSearch } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import AddModal from "../components/AddModal";
import Swal from "sweetalert2";
import EditModal from "../components/EditModal";

export type EmployeeType = {
  employee_id: number;
  firstname: string;
  email: string;
  lastname: string;
  address: string;
  phone: string;
  password: string;
};
export default function AdminManage() {
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [info, setInfo] = useState<EmployeeType>({} as EmployeeType);
  const titleRef = useRef<HTMLSelectElement>(null);
  const columnsTitles = ["Employee ID", "Name", "Email", "Action"];
  const [employees, setEmployees] = useState<EmployeeType[]>([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch("http://localhost:5000/admin/get_employee");
      const data = await res.json();
      setEmployees(data);
    };
    fetchEmployees();
  }, []);
  const deleteEmployee = async (id: number) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `http://localhost:5000/admin/delete_employee/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const data = await res.json();
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Deleted!",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
          });
        }
      }
    });
  };

  const rowsDisplay = useMemo(() => {
    return employees.map((employee: EmployeeType) => {
      return (
        <tr key={employee.employee_id} className={` font-semibold`}>
          <td>{employee.employee_id}</td>
          <td>
            {employee.firstname} {employee.lastname}
          </td>
          <td>{employee.email}</td>
          <td>
            <div className="cursor-pointer text-xl flex gap-2 items-center ">
              <FaRegEdit
                onClick={() => {
                  setOpenEdit(true);
                  setInfo(employee);
                }}
                className="text-green-500 hover:text-green-700"
              />
              <FaRegTrashCan
                onClick={() => deleteEmployee(employee.employee_id)}
                className="text-red-500 hover:text-red-700"
              />
            </div>
          </td>
        </tr>
      );
    });
  }, [employees]);

  return (
    <div className="overflow-auto bg-white sm:m-6 ">
      <TopSection
        query={query}
        setQuery={setQuery}
        titleRef={titleRef}
        setOpen={setOpen}
      />
      <Table title={columnsTitles} RowsDisplay={rowsDisplay} />
      {open && <AddModal setOpen={setOpen} />}
      {openEdit && <EditModal setOpenEdit={setOpenEdit} data={info} />}
    </div>
  );
}
type TopSectionProps = {
  query: string;
  setQuery: any;
  titleRef: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function TopSection(props: TopSectionProps) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 m-4 ">
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
        <button className="btn btn-sm" onClick={() => props.setOpen(true)}>
          Add New +
        </button>
      </div>
    </div>
  );
}
