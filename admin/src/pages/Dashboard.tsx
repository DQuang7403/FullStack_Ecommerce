import { BiShoppingBag } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { OrdersStat, UserStat, ProfitStat } from "../utils/constants";

import Widget from "../components/Graphs/Widgets";
import RevenueGraph from "../components/Graphs/RevenueGraph";
import TodayOrderGraph from "../components/Graphs/TodayOrders";
import TopSellingGraph from "../components/Graphs/CategoryTopSale";
import LastTransaction from "../components/Graphs/LastTransaction";
import BestSelling from "../components/Graphs/BestSelling";
import TrendingProduct from "../components/Graphs/TrendingProduct";
export default function Dashboard() {
  return (
    <div className="grid gap-6 grid-cols-1 p-4 grid-grow-0 overflow-auto lg:grid-cols-3 md:grid-cols-2 ">
      <Widget
        title="Total Order"
        stat={23578}
        icon={<BiShoppingBag className="text-2xl text-red-500" />}
        url={"/orders"}
        data={OrdersStat}
      />
      <Widget
        title="Total User"
        stat={23578}
        icon={<FaUsers className="text-2xl text-blue-600" />}
        url={"/user"}
        data={UserStat}
      />
      <Widget
        title="Total Profit"
        stat={32578}
        icon={<FaMoneyBill1Wave className="text-2xl text-green-600" />}
        url={"/transactions"}
        data={ProfitStat}
        view={false}
      />
      <RevenueGraph />
      <TodayOrderGraph />

      <TopSellingGraph />
      <LastTransaction />

      <BestSelling />
      <TrendingProduct />
    </div>
  );
}
