import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
type PersonalType = {
  order_id: number;
  username: string;
  email: string;
  address: string;
  phone: string;
  status: string;
  create_at: string;
};
type OrderType = {
  product_name: string;
  price: number;
  quantity: number;
};
export default function OrderDetails() {
  const order: any = useParams();
  const [personalInfo, setPersonalInfo] = useState<PersonalType>({
    order_id: 0,
    username: "",
    email: "",
    address: "",
    phone: "",
    status: "",
    create_at: "",
  });
  const [orderDetails, setOrderDetails] = useState<OrderType[]>([]);
  const calculateTotal = () => {
    let total = 0;
    orderDetails.forEach((item) => {
      total = total + item.price;
    });
    return Number(total.toFixed(2));
  };
  useEffect(() => {
    const fetchOrderDetails = async () => {
      const res = await fetch(`http://localhost:5000/admin/orders/${order.id}`);
      const data = await res.json();
      setPersonalInfo(data?.personal);
      setOrderDetails(data?.details);
    };
    fetchOrderDetails();
  }, []);
  return (
    <section className="overflow-x-auto bg-white md:m-6 overflow-auto rounded-md">
      <div className="flex flex-col items-stretch xl:flex-row divide-y-2 xl:divide-y-0 xl:items-center xl:justify-evenly space-x-4 xl:divide-x-2 mx-4">
        <div className="grid grid-cols-2 gap-4 m-4 p-4">
          <h2 className="text-lg font-semibold">Order ID</h2>
          <h2 className="text-lg font-semibold">Customer Name</h2>
          <div className="bg-red-600 size-16 flex items-center justify-center rounded-full">
            <div className="bg-red-400 size-12 flex items-center justify-center rounded-full">
              <h3 className="text-white text-lg">{personalInfo.order_id}</h3>
            </div>
          </div>
          <h1 className="text-xl place-self-center">{personalInfo.username}</h1>
        </div>
        <div className="flex flex-col my-6 gap-4 p-4 ">
          <h1 className="text-lg font-semibold text-[#8B909A]">
            Personal Information
          </h1>
          <div className="columns-2">
            <h2>Address</h2> <h2>Phone</h2> <h2>Email</h2>
            <h2 className=" font-bold">{personalInfo.address}</h2>
            <h2 className=" font-bold">{personalInfo.phone}</h2>
            <h2 className=" font-bold">{personalInfo.email}</h2>
          </div>
        </div>
        <div className="flex flex-col my-6 gap-4 p-4 ">
          <h1 className="text-lg font-semibold text-[#8B909A]">
            Order Details
          </h1>
          <div className="columns-2">
            <h2>Status</h2> <h2>Create At</h2> <h2>Total Price</h2>
            <h2 className=" font-bold">{personalInfo.status}</h2>
            <h2 className=" font-bold">
              {new Date(personalInfo.create_at).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </h2>
            <h2 className=" font-bold">${calculateTotal()}</h2>
          </div>
        </div>
      </div>
      <hr />
      <table className="table table-lg table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th></th>
            <td>Product</td>
            <td>Price</td>
            <td>Quantity</td>
            <td>Total Price</td>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map((item, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.product_name}</td>
                <td>$ {Number((item.price / item.quantity).toFixed(2))}</td>
                <td>{item.quantity}</td>
                <td>$ {item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
