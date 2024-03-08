import { IconType } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineShoppingCart, MdAddCircleOutline } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { RiBillLine, RiAdminLine } from "react-icons/ri";
import { GoGear } from "react-icons/go";
import { MdOutlineRateReview } from "react-icons/md";
type SidebarProps = {
  name: string;
  url: string;
  icon: IconType;
};
type SidebarLargeProps = {
  name: string;
  url: string;
  icon: IconType;
};

export const sidebarSmall: SidebarProps[] = [
  { name: "Dashboard", url: "/", icon: AiOutlineHome },
  { name: "Orders", url: "/orders", icon: MdOutlineShoppingCart },
  { name: "User", url: "/user", icon: LuUsers },
  { name: "Product", url: "/product", icon: BsBoxSeam },
];

export const mainMenuItem: SidebarLargeProps[] = [
  { name: "Dashboard", url: "/", icon: AiOutlineHome },
  { name: "Order Management", url: "/orders", icon: MdOutlineShoppingCart },
  { name: "User", url: "/user", icon: LuUsers },
  { name: "Reviews", url: "/reviews", icon: MdOutlineRateReview },
  // { name: "Revenue", url: "/revenue", icon: RiBillLine },
];
export const productItem: SidebarLargeProps[] = [
  { name: "Product List", url: "/product", icon: BsBoxSeam },
  {
    name: "Add Product",
    url: "/product/add-product",
    icon: MdAddCircleOutline,
  },
];
export const adminItem: SidebarLargeProps[] = [
  { name: "Manage Admins", url: "/admin", icon: RiAdminLine },
  { name: "Settings", url: "/settings", icon: GoGear },
];

export const OrderTitle: string[] = [
  "Order ID",
  "Customer",
  "Date",
  "Total",
  "Status",
  "Action",
];
export const UserTitle: string[] = [
  "User ID",
  "Name",
  "Phone",
  "Create At",
  "Action",
];
export const ProductTitle: string[] = [
  "ID",
  "Image",
  "Title",
  "Price",
  "Category",
  "In Stock",
  "Action",
];
export const OrdersStat = [
  {
    name: "Page A",
    pv: 2400,
  },
  {
    name: "Page B",
    pv: 1398,
  },
  {
    name: "Page C",
    pv: 9800,
  },
  {
    name: "Page D",
    pv: 3908,
  },
  {
    name: "Page E",
    pv: 4800,
  },
  {
    name: "Page F",
    pv: 3800,
  },
  {
    name: "Page G",
    pv: 4300,
  },
];
export const UserStat = [
  {
    name: "Page A",
    pv: 4000,
  },
  {
    name: "Page B",
    pv: 3000,
  },
  {
    name: "Page C",
    pv: 2000,
  },
  {
    name: "Page D",
    pv: 2780,
  },
  {
    name: "Page E",
    pv: 1890,
  },
  {
    name: "Page F",
    pv: 2390,
  },
  {
    name: "Page G",
    pv: 3490,
  },
];

export const ProfitStat = [
  {
    name: "Page A",
    pv: 2400,
  },
  {
    name: "Page B",
    pv: 2210,
  },
  {
    name: "Page C",
    pv: 2290,
  },
  {
    name: "Page D",
    pv: 1500,
  },
  {
    name: "Page E",
    pv: 2181,
  },
  {
    name: "Page F",
    pv: 2500,
  },
  {
    name: "Page G",
    pv: 3000,
  },
];
export const data = [
  {
    name: "Page A",
    uv: 2400,
    pv: 4000,
  },
  {
    name: "Page B",
    uv: 1398,
    pv: 3000,
  },
  {
    name: "Page C",
    uv: 4000,
    pv: 7800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,

  },
];
export const TodayOrder = [
  {
    name: "6:00",
    order: 0,
  },
  {
    name: "7:00",
    order: 12,
  },
  {
    name: "8:00",
    order: 8,
  },
  {
    name: "9:00",
    order: 20,
  },
  {
    name: "10:00",
    order: 11,
  },
  {
    name: "11:00",
    order: 0,
  },
];


export const LastestTransaction = [
  {
    id: 1,
    date: "2024-01-27 11:46:02.996387",
    totals: 1200.0,
  },
  {
    id: 2,
    date: "2024-01-25 11:46:02.996387",
    totals: 1250.0,
  },
  {
    id: 3,
    date: "2024-01-25 10:59:37.323241",
    totals: 3000.0,
  },
  {
    id: 4,
    date: "2024-01-25 10:59:37.323241",
    totals: 900.0,
  },
  {
    id: 5,
    date: "2024-01-23 20:45:10.241472 ",
    totals: 1000.0,
  },
  {
    id: 6,
    date: "2024-01-12 20:45:10.241472",
    totals: 2000.0,
  },
];
type RatingProp = {
  star: number;
};
export const StarRating = ({ star }: RatingProp) => {
  const rate: JSX.Element[] = [];
  for (let i = 0; i < star; i++) {
    rate.push(<span key={i} className="fa fa-star text-[#FFAD33]"></span>);
  }
  if (star < 5) {
    for (let i = star; i < 5; i++) {
      rate.push(<span key={i} className="fa fa-star text-[#F5F5F5]"></span>);
    }
  }
  return <>{rate}</>;
};
