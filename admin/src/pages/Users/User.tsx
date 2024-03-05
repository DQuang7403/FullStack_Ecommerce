import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { PiExport } from "react-icons/pi";
import { useEffect, useMemo, useRef, useState } from "react";
import { UserTitle } from "../../utils/constants";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function User() {
  const [query, setQuery] = useState<string>("");
  const titleRef = useRef<HTMLSelectElement>(null);
  type User = {
    user_id: number;
    username: string;
    email: string;
    create_at: string;
    phone?: string;
    firstname?: string;
    lastname?: string;
    address?: string;
  };
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:5000/admin/users`);
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);
  const filterUsers: User[] = useMemo(() => {
    return users.filter((user) => {
      const title = titleRef.current?.value;
      switch (title) {
        case "userid":
          return user.user_id.toString().includes(query);
        case "email":
          return user.email.toLowerCase().includes(query.toLowerCase());
        default:
          return user.username.toLowerCase().includes(query.toLowerCase());
      }
    });
  }, [query, users]);
  
  const rowsDisplay = useMemo(() => {
    return filterUsers.map((item) => {
      const day = new Date(item.create_at);
      const fomattedDate = day.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return (
        <tr key={item.user_id}>
          <td>{item.user_id}</td>
          <td>
            <div className="font-bold">{item.username}</div>
            <div className="text-sm opacity-50 font-semibold">{item.email}</div>
          </td>
          <td>{item.phone ? item.phone : "Not Available"}</td>
          <td>{fomattedDate}</td>
          <td>
            <div className="flex text-xl gap-3 cursor-pointer ">
              <Link to={`/user/${item.user_id}`}>
                <FaRegEdit className="text-green-500 hover:text-green-700" />
              </Link>
              <FaRegTrashCan
                onClick={() => deleteUser(item.user_id)}
                className=" text-red-500 hover:text-red-700"
              />
            </div>
          </td>
        </tr>
      );
    });
  }, [filterUsers]);
  return (
    <div className="overflow-auto bg-white m-6">
      <TopSection query={query} setQuery={setQuery} titleRef={titleRef} />
      <Table title={UserTitle} RowsDisplay={rowsDisplay} />
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
    <div className="flex items-center justify-between m-4 flex-wrap">
      <div className="flex items-center gap-2 border-b-2 flex-wrap">
        <IoMdSearch className="text-2xl rounded-lg" />
        <input
          type="search"
          onChange={(e) => props.setQuery(e.target.value)}
          className="h-8 focus:outline-none "
          placeholder={`Search ...`}
        />
        <select ref={props.titleRef}>
          <option value="username">Username</option>
          <option value="userid">User ID</option>
          <option value="email">Email</option>
        </select>
      </div>
      <div className="text-xl text-blue-500 flex items-center gap-2 cursor-pointer hover:text-blue-700">
        <PiExport />
        <h2>Export</h2>
      </div>
    </div>
  );
}
export const deleteUser = async (id: number) => {
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
        `http://localhost:5000/admin/users/delete/${id}`,
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
          title: data.message,
        });
        window.location.reload();
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
        });
      }
    }
  });
};