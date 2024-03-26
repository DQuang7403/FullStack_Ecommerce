import { BiBell, BiMenuAltLeft } from "react-icons/bi";
import useSidebarContext from "../context/SidebarContext";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa";
import { useEffect, useState } from "react";
export default function Navbar() {
  return (
    <div className="flex lg:gap-20 sm:justify-between pt-2 mb-2 mx-4 sticky">
      <NavbarFirstSection visible={false} />
      <div className="flex flex-shrink-0 md:gap-4 gap-2">
        <button className=" btn btn-ghost btn-circle">
          <div className="indicator z-0">
            <BiBell className="text-2xl " />
            <span className="badge badge-xs bg-red-500 border-red-500 indicator-item text-white py-2">
              2
            </span>
          </div>
        </button>
        <TodayDate />
      </div>
    </div>
  );
}

type BrandProps = {
  visible?: boolean;
};
export function NavbarFirstSection({ visible = true }: BrandProps) {
  const url = window.location.pathname;
  const { toggle } = useSidebarContext();
  return (
    <div className="flex gap-2 items-center flex-shrink-0">
      {url !== "/login" && (
        <button className="btn btn-ghost btn-circle" onClick={toggle}>
          <BiMenuAltLeft className="text-2xl" />
        </button>
      )}
      <div
        className={` font-bold text-xl ${
          visible ? "block" : "hidden"
        } sm:block`}
      >
        <span className="text-primary">Tech</span>Topia Admin
      </div>
    </div>
  );
}
const TodayDate = () => {
  const day = new Date();
  const today = day.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [time, setTime] = useState<string>("00:00:00");
  useEffect(() => {
    const time = day.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    const interval = setInterval(() => {
      setTime(time);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="">
      {day.getHours() >= 12 ? (
        <p className="flex items-center gap-2 font-semibold">
          <FaMoon className="text-xl text-blue-900" />
          Good Evening
        </p>
      ) : (
        <p className=" flex items-center gap-2 font-semibold">
          <FaSun className="text-xl text-yellow-500" />
          Good Morning
        </p>
      )}
      <div className="flex gap-3 ">
        <p>{today}</p>
        <p>{time}</p>
      </div>
    </div>
  );
};
