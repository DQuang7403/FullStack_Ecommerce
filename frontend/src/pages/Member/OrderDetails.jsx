import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAPI } from "../../utils/fetchAPI";
import { Link } from "react-router-dom";
import { RiShoppingCart2Line } from "react-icons/ri";
import { LiaShippingFastSolid } from "react-icons/lia";
export default function OrderDetails() {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const [overview, setOverview] = useState();
  const calculateTotal = () => {
    let total = 0;
    details.forEach((item) => {
      total = total + item.total_price;
    });
    return Number(total.toFixed(2)); // Round to two decimal placestotal
  };
  useEffect(() => {
    const fetchDetails = async () => {
      const data = await fetchAPI(`checkout/order-details/${id}`);
      setDetails(data.Order_details);
      setOverview(data.Order_overview);
    };
    fetchDetails();
  }, [id]);
  return (
    <div className="lg:mx-32 md:my-8 mx-4 my-4">
      <div className="flex justify-evenly items-stretch flex-wrap">
        <div className="bg-gray-100 px-4 pt-4 rounded-md my-4">
          <div className="text-2xl text-blue-500 font-semibold flex gap-3 items-center">
            <RiShoppingCart2Line className="text-black text-3xl p-1 rounded-lg bg-white" />
            Order Details
          </div>
          <ul className="flex flex-col gap-1 p-4 font-semibold">
            <li>
              <span className="text-gray-500">Order ID:</span> {overview?.[0]}
            </li>
            <li>
              <span className="text-gray-500">Card Owner:</span> {overview?.[1]}
            </li>
            <li>
              <span className="text-gray-500">Status:</span> {overview?.[5]}
            </li>
            <li>
              <span className="text-gray-500">Order date:</span>{" "}
              {overview?.[6].toLocaleString().split(".")[0]}
            </li>
          </ul>
        </div>
        <div className="bg-gray-100 px-4 pt-4 rounded-md my-4 ">
          <div className="text-2xl text-blue-500 font-semibold flex gap-3 items-center">
            <LiaShippingFastSolid className="text-black text-3xl p-1 rounded-lg bg-white" />
            Shipping Details
          </div>
          <ul className="flex flex-col gap-1 p-4 font-semibold">
            <li>
              <span className="text-gray-500">Address:</span> {overview?.[3]}
            </li>
            <li>
              <span className="text-gray-500">Phone:</span> {overview?.[4]}
            </li>
            <li>
              <span className="text-gray-500">Email:</span> {overview?.[2]}
            </li>
          </ul>
        </div>
      </div>
      <div className="overflow-x-auto mt-10 pb-5">
        <table className="table table-lg table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th></th>
              <td>Product</td>
              <td>Title</td>
              <td>Quantity</td>
              <td>Price</td>
              <td>Total Price</td>
            </tr>
          </thead>
          <tbody>
            {details.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <img
                      loading="lazy"
                      className="w-14 object-contain"
                      src={item.thumbnail}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>$ {item.price}</td>
                  <td>$ {item.total_price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="border-black border-2 rounded-md px-6 py-8 w-full max-w-md ml-auto mt-4">
        <div className="flex items-center justify-between py-4 ">
          <p>Shipping:</p>
          <p>Free</p>
        </div>
        <div className="flex items-center justify-between py-4">
          <p>Total:</p>
          <p>$ {calculateTotal()}</p>
        </div>

        <Link
          to={"/order"}
          className={`btn bg-[#db4444] hover:bg-[#BB232D] text-white rounded-base w-full mt-6`}
        >
          Back to Order
        </Link>
      </div>
    </div>
  );
}
