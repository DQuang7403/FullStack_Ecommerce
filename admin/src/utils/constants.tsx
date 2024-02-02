import { IconType } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { MdOutlineShoppingCart, MdAddCircleOutline } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { RiBillLine, RiAdminLine } from "react-icons/ri";
import { GoGear } from "react-icons/go";
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
  { name: "Customer", url: "/customer", icon: LuUsers },
  { name: "Product", url: "/product", icon: BsBoxSeam },
];

export const mainMenuItem: SidebarLargeProps[] = [
  { name: "Dashboard", url: "/", icon: AiOutlineHome },
  { name: "Order Management", url: "/orders", icon: MdOutlineShoppingCart },
  { name: "Customer", url: "/customer", icon: LuUsers },
  { name: "Categories", url: "/categories", icon: BiCategoryAlt },
  { name: "Transactions", url: "/transactions", icon: RiBillLine },
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
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
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

export const CategoryStat = [
  { name: "Phone", value: 400, color: "#00C49F" },
  { name: "Laptop", value: 300, color: "#FFBB28" },
  { name: "Tablet", value: 300, color: "#0088FE" },
  { name: "Watch", value: 200, color: "#FF8042" },
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
export const TopSellingProduct = [
  {
    id: 1,
    name: "Iphone 15 Pro",
    stock: 5,
    totalOrder: 506,
    price: 1200.0,
  },
  {
    id: 2,
    name: "Galaxy Z Flip5",
    stock: 5,
    totalOrder: 219,
    price: 600.0,
  },
  {
    id: 3,
    name: "Galaxy Tab S8",
    stock: 80,
    totalOrder: 100,
    price: 699.99,
  },
  {
    id: 4,
    name: "Yoga Book 9i (13″ Intel)",
    stock: 5,
    totalOrder: 90,
    price: 2000.0,
  },
  {
    id: 5,
    name: "Apple Watch Ultra 2",
    stock: 0,
    totalOrder: 78,
    price: 799.0,
  },
  {
    id: 6,
    name: "75” Class X77L 4K HDR LED Google TV (2023)",
    stock: 10,
    totalOrder: 60,
    price: 749.99,
  },
];
