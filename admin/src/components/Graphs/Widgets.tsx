import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Line, LineChart, Tooltip, XAxis } from "recharts";
import useSidebarContext from "../../context/SidebarContext";
type WidgetProps = {
  title: string;
  stat: number;
  icon: ReactNode;
  url: string;
  data: {
    name: string;
    pv: number;
  }[];
  view?: boolean;
};
export default function Widget({
  title,
  stat,
  icon,
  url,
  data,
  view = true,
}: WidgetProps) {
  const { setSelectedPageURL } = useSidebarContext();
  return (
    <div className="bg-white rounded-lg p-6 flex flex-shrink-0 col-span-1 justify-evenly">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <div>{icon}</div>
          <div className="font-bold">{title}</div>
        </div>
        <div className="text-sm text-slate-400">Last 7 days</div>
        <div className="text-3xl font-bold">{stat.toLocaleString("de-DE")}</div>
        {view && (
          <Link
            to={url}
            onClick={() => setSelectedPageURL(url)}
            className="link link-hover mt-auto"
          >
            View All &gt;&gt;
          </Link>
        )}
      </div>
      <LineChart
        width={200}
        height={150}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis />
        <Tooltip />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
