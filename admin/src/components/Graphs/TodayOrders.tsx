import { MdOutlineShoppingCart } from "react-icons/md";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { TodayOrder } from "../../utils/constants";

export default function TodayOrderGraph() {
  return (
    <div className="bg-white rounded-lg col-span-1 p-6 flex flex-col gap-4 ">
      <div className="flex gap-4 items-center">
        <MdOutlineShoppingCart className="text-2xl text-teal-500 font-bold " />
        <h2 className="font-bold text-lg">Today Order</h2>
      </div>
      <ResponsiveContainer width="99%" height="90%">
        <BarChart width={150} height={40} data={TodayOrder}>
          <XAxis dataKey="name" />
          <Tooltip />
          <Bar dataKey="order" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
