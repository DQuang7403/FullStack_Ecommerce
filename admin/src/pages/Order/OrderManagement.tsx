import { FaEye } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { PiExport } from "react-icons/pi";
import { useEffect, useMemo, useRef, useState } from "react";
import { OrderTitle } from "../../utils/constants";
import { Link } from "react-router-dom";
import Table from "../../components/Table";
import Swal from "sweetalert2";
export default function OrderManagement() {
  const [query, setQuery] = useState<string>("");
  const titleRef = useRef<HTMLSelectElement>(null);
  type Order = {
    order_id: number;
    username: string;
    create_at: string;
    totals: number;
    status: string;
  };
  const [OrderData, setOrderData] = useState<Order[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`http://localhost:5000/admin/orders`);
      if (res.status === 200) {
        const data = await res.json();
        setOrderData(data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
        });
      }
    };
    fetchOrders();
  }, []);

  const filterOrders: Order[] = useMemo(() => {
    return OrderData.filter((order) => {
      switch (titleRef.current?.value) {
        case "orderId":
          return order.order_id.toString().includes(query);
        case "status":
          return order.status.toLowerCase().includes(query.toLowerCase());
        case "total":
          return order.totals.toString().includes(query);
        default:
          return order.username.toLowerCase().includes(query.toLowerCase());
      }
    });
  }, [OrderData, query]);
  const rowsDisplay = useMemo(() => {
    return filterOrders.map((item) => {
      const day = new Date(item.create_at);
      const fomattedDate = day.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      return (
        <tr key={item.order_id}>
          <td>{item.order_id}</td>
          <td>{item.username}</td>
          <td>{fomattedDate}</td>
          <td>$ {item.totals}</td>
          <td>{item.status}</td>
          <td className="cursor-pointer text-2xl text-blue-500 hover:text-blue-800">
            <Link to={`${item.order_id}`}>
              <FaEye />
            </Link>
          </td>
        </tr>
      );
    });
  }, [filterOrders]);
  return (
    <div className="overflow-auto bg-white m-6">
      <TopSection query={query} setQuery={setQuery} titleRef={titleRef} />
      <Table title={OrderTitle} RowsDisplay={rowsDisplay} />
    </div>
  );
}
type TopSectionProps = {
  query: string;
  setQuery: any;
  titleRef: any;
};
const TopSection = (props: TopSectionProps) => {
  return (
    <div className="flex items-center justify-between m-4">
      <div className="flex items-center gap-2 border-b-2">
        <IoMdSearch className="text-2xl rounded-lg" />
        <input
          type="text"
          className="h-8 focus:outline-none "
          placeholder={`Search ...`}
          onChange={(e) => props.setQuery(e.target.value)}
        />
        <select ref={props.titleRef}>
          <option value="customer">Customer</option>
          <option value="orderId">Order ID</option>
          <option value="total">Total</option>
          <option value="status">Status</option>
        </select>
      </div>
      <div className="text-xl text-blue-500 flex items-center gap-2 cursor-pointer hover:text-blue-700">
        <PiExport />
        <h2>Export</h2>
      </div>
    </div>
  );
};
