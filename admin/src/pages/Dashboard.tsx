import { BiShoppingBag } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";

import Widget from "../components/Graphs/Widgets";
import RevenueGraph from "../components/Graphs/RevenueGraph";
import TopSellingGraph from "../components/Graphs/CategoryTopSale";
import BestSelling from "../components/Graphs/BestSelling";
import TrendingProduct from "../components/Graphs/TrendingProduct";
import { useEffect, useState } from "react";
type UserType = {
  total_user: number;
  user_list: Array<{ name: string; stat: number }>;
};
type ProfitType = {
  total_profit: number;
  profit_by_days: Array<{ name: string; stat: number }>;
};
type OrderType = {
  total_order: number;
  order_by_days: Array<{ name: string; stat: number }>;
};
export default function Dashboard() {
  const [users, setUsers] = useState<UserType>({
    total_user: 0,
    user_list: [],
  });
  const [profit, setProfit] = useState<ProfitType>({
    total_profit: 0,
    profit_by_days: [],
  });
  const [orders, setOrders] = useState<OrderType>({
    total_order: 0,
    order_by_days: [],
  });
  const fetchTotalUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/total_users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchProfit = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/total_profit");
      const data = await res.json();
      setProfit(data);
    } catch (err) {
      console.error(err);
    }
  };
  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/total_order");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchTotalUser();
    fetchProfit();
    fetchOrders();
  }, []);
  return (
    <div className="grid gap-6 grid-cols-1 p-4 grid-grow-0 overflow-auto lg:grid-cols-3 md:grid-cols-2 ">
      <Widget
        title="Total Order"
        stat={orders.total_order}
        icon={<BiShoppingBag className="text-2xl text-red-500" />}
        url={"/orders"}
        data={orders?.order_by_days}
      />
      <Widget
        title="Total User"
        stat={users.total_user}
        icon={<FaUsers className="text-2xl text-blue-600" />}
        url={"/user"}
        data={users?.user_list}
      />
      <Widget
        title="Total Profit"
        stat={profit.total_profit}
        icon={<FaMoneyBill1Wave className="text-2xl text-green-600" />}
        url={"/transactions"}
        data={profit?.profit_by_days}
        view={false}
      />
      <RevenueGraph />
      <TrendingProduct />

      <TopSellingGraph />
      <BestSelling />
    </div>
  );
}
