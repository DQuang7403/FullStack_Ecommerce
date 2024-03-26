import React, { useEffect, useState, useContext } from "react";
import { fetchAPI } from "../../utils/fetchAPI";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function OrderPage() {
  const [order, setOrder] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchOrder = async () => {
      const data = await fetchAPI(`checkout/orders/${user?.sub}`);
      setOrder(data);
    };
    fetchOrder();
  }, []);
  return (
    <div className="overflow-x-auto my-20 pb-5 ">
      <table className="table table-lg table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th></th>
            <td>Order ID</td>
            <td>Order Date</td>
            <td>Satus</td>
            <td>Order Total</td>
            <td>View Details</td>
          </tr>
        </thead>
        <tbody>
          {order.map((item, index) => {
            const date = new Date(item.create_at);
            const formattedDate = date.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.order_id}</td>
                <td
                  className={`${
                    item.status === "Paid" ? "text-success" : "text-red-500"
                  }  text-lg font-bold`}
                >
                  {item.status}
                </td>
                <td>{formattedDate}</td>
                <td>$ {item.total}</td>
                <td className="link link-info ">
                  <Link to={`/order-details/${item.order_id}`}>
                    View details{" "}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
