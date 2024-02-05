
import Widget from "../components/Graphs/Widgets";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { ProfitStat } from "../utils/constants";
import RevenueGraph from "../components/Graphs/RevenueGraph";
import LastTransaction from "../components/Graphs/LastTransaction";
import TodayOrderGraph from "../components/Graphs/TodayOrders";
export default function Revenue() {
  return (
    <div className="grid gap-2 p-6 grid-cols-2 md:grid-cols-3 overflow-auto">
      <Widget
        title="Total Profit"
        stat={32578}
        icon={<FaMoneyBill1Wave className="text-2xl text-green-600" />}
        url={"/transactions"}
        data={ProfitStat}
        view={false}
      />
      <RevenueGraph />
      <LastTransaction />
      <TodayOrderGraph />
    </div>
  );
}
