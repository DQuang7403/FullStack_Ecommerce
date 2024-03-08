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
import { data } from "../../utils/constants";
export default function RevenueGraph() {
  return (
    <div className="bg-white rounded-lg md:col-span-2 p-6 flex flex-col gap-3 col-span-1">
      <div className="flex gap-4 items-center">
        <TbChartInfographic className="text-2xl text-purple-500" />
        <h3 className="font-bold text-lg">Revenue Analytics</h3>
      </div>
      <ResponsiveContainer width="99%" height={250}>
      <AreaChart
          data={data}
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
          <Area type="monotone" dataKey="uv" stackId="1" stroke="#ffc658" fill="#ffc658" />
          <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
