import React, { useEffect, useState, useContext } from "react";
import { fetchAPI } from "../../utils/fetchAPI";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
export default function OrderPage() {
  const [userDetail, setUserDetail] = useState({});
  const [order, setOrder] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchAPI(`account/get_user/${user?.sub}`);
      setUserDetail(data);
    };
    const fetchOrder = async () => {
      const data = await fetchAPI(`checkout/orders/${user?.sub}`);
      setOrder(data);
    };
    fetchUser();
    fetchOrder();
  }, []);
  return (
    <section className="lg:mx-32 md:my-8 mx-4 my-4">
      <div className="text-lg text-right my-8">
        Hello,{" "}
        <span className="text-[#DB4444] font-semibold">
          {userDetail?.username}
        </span>
      </div>

      <div role="tablist" className="tabs tabs-boxed mx-0">
        <Link to={"/account"} role="tab" className="tab">
          My Account
        </Link>
        <Link to="/order" role="tab" className="tab bg-[#DB4444] text-white">
          My Order
        </Link>
        <Link to={"/wishlist"} role="tab" className="tab ">
          My WishList
        </Link>
      </div>
      <div className="overflow-x-auto mt-10 pb-5">
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
    </section>
  );
}
