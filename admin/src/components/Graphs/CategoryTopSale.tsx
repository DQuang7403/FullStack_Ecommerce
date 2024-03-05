import { Cell, Pie, PieChart, Tooltip, ResponsiveContainer } from "recharts";
import { CategoryStat } from "../../utils/constants";

export default function TopSellingGraph() {
  return (
    <div className="bg-white rounded-lg col-span-1 p-6 flex flex-col gap-4">
      <h2 className="font-bold text-lg">Top Selling Category</h2>
      <ResponsiveContainer width="99%" height={250}>
        <PieChart>
          <Tooltip
            contentStyle={{ backgroundColor: "white", borderRadius: "10px" }}
          />
          <Pie
            data={CategoryStat}
            innerRadius={"60%"}
            outerRadius={"90%"}
            paddingAngle={5}
            dataKey="value"
          >
            {CategoryStat.map((item) => (
              <Cell key={`${item.name}`} fill={item.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-between flex-wrap">
        {CategoryStat.map((item) => (
          <div className="flex flex-col items-center ">
            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full`}
                style={{ backgroundColor: item.color }}
              />
              <h3>{item.name}</h3>
            </div>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
// select product_name, count(*) from Order_details group by product_name order by  count(*) DESC limit 0, 4