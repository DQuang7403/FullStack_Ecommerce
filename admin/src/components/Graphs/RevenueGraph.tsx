import { useEffect, useState } from "react";
import { TbChartInfographic } from "react-icons/tb";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
type ProfitType = {
  total_profit: number;
  profit_by_days: Array<{ name: string; stat: number }>;
};
type RevenueType = {
  name: string;
  stat: number;
  total_profit: number;
};
export default function RevenueGraph() {
  const [profit, setProfit] = useState<ProfitType>({
    total_profit: 0,
    profit_by_days: [],
  });
  const [revenue, setRevenue] = useState<RevenueType[]>([]);
  const fetchProfit = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin/total_profit");
      const data = await res.json();
      setProfit(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchProfit();
  }, []);
  useEffect(() => {
    const newRevenue = profit.profit_by_days.map((day) => ({
      name: day.name,
      stat: day.stat,
      total_profit: day.stat + Math.floor(Math.random() * 3000),
    }));
    setRevenue(newRevenue);
  }, [profit]);
  return (
    <div className="bg-white rounded-lg md:col-span-2 p-6 flex flex-col gap-3 col-span-1">
      <div className="flex gap-4 items-center">
        <TbChartInfographic className="text-2xl text-teal-500" />
        <h3 className="font-bold text-lg">Revenue Analytics</h3>
      </div>
      <ResponsiveContainer width="99%" height={250}>
        <AreaChart
          data={revenue}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="stat"
            stackId="1"
            stroke="#ffc658"
            fill="#ffc658"
          />
          <Area
            type="monotone"
            dataKey="total_profit"
            stackId="1"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
