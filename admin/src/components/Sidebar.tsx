import { NavbarFirstSection } from "./Navbar";
import {
  sidebarSmall,
  mainMenuItem,
  productItem,
  adminItem,
} from "../utils/constants";
import { Link } from "react-router-dom";
import { IconType } from "react-icons/lib";
import useSidebarContext from "../context/SidebarContext";
import { MdLogout } from "react-icons/md";
import useAuthContext from "../context/AuthContext";
type SidebarProps = {
  name: string;
  url: string;
  icon: IconType;
};
export default function Sidebar() {
  const { isSmallOpen, isLargeOpen, close } = useSidebarContext();
  const { selectedPageURL, setSelectedPageURL } = useSidebarContext();
  const { logoutUser } = useAuthContext();
  return (
    <>
      <aside
        className={`bg-white sticky top-0 overflow-auto pb-0 sm:flex flex-col ml-1 gap-3 h-[calc(100vh-64px)] hidden  ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        {sidebarSmall.map((item: SidebarProps) => (
          <SmallSideBarButton
            key={item.name}
            name={item.name}
            url={item.url}
            icon={item.icon}
            isActive={selectedPageURL === item.url}
            setSelectedPageURL={setSelectedPageURL}
          />
        ))}
        <button
          onClick={() => logoutUser()}
          className={`btn btn-ghost btn-lg w-16 font-normal mr-2 `}
        >
          <div className="flex flex-col gap-2 items-center">
            <MdLogout className="text-2xl" />
            <div className="text-xs">Log out</div>
          </div>
        </button>
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-gray-500 opacity-50"
        />
      )}
      <aside
        className={`bg-white w-60 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-2 flex-col gap-2 px-2 ${
          isSmallOpen ? "flex z-[999] bg-white inset-0" : "hidden"
        } ${isLargeOpen ? "lg:flex" : "lg:hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <NavbarFirstSection />
        </div>
        <div className="font-bold ml-4 text-accent">MAIN MENU</div>
        {mainMenuItem.map((item: SidebarProps) => (
          <LargeSideBarButton
            key={item.name}
            name={item.name}
            url={item.url}
            icon={item.icon}
            isActive={selectedPageURL === item.url}
            setSelectedPageURL={setSelectedPageURL}
          />
        ))}
        <div className="font-bold ml-4 mt-2 text-accent">PRODUCTS</div>
        {productItem.map((item: SidebarProps) => (
          <LargeSideBarButton
            key={item.name}
            name={item.name}
            url={item.url}
            icon={item.icon}
            isActive={selectedPageURL === item.url}
            setSelectedPageURL={setSelectedPageURL}
          />
        ))}
        <div className="font-bold ml-4 mt-2 text-accent">ADMIN</div>
        {adminItem.map((item: SidebarProps) => (
          <LargeSideBarButton
            key={item.name}
            name={item.name}
            url={item.url}
            icon={item.icon}
            isActive={selectedPageURL === item.url}
            setSelectedPageURL={setSelectedPageURL}
          />
        ))}
        <button
          onClick={() => logoutUser()}
          className={`btn btn-ghost justify-start font-semibold`}
        >
          <div className="flex gap-4 items-center justify-start">
            <MdLogout className="text-2xl" />
            <div className="text-md">Log out</div>
          </div>
        </button>
      </aside>
    </>
  );
}

type ActiveSidebarProps = {
  name: string;
  url: string;
  icon: IconType;
  isActive?: boolean;
  setSelectedPageURL: (url: string) => void;
};
function SmallSideBarButton({
  name,
  url,
  icon,
  isActive = false,
  setSelectedPageURL,
}: ActiveSidebarProps) {
  return (
    <Link
      to={url}
      onClick={() => setSelectedPageURL(url)}
      className={`btn btn-ghost btn-lg w-16 font-normal mr-2 ${
        isActive ? "btn-active" : ""
      }`}
    >
      <div className="flex flex-col gap-2 items-center">
        <div>{icon({ size: 25 })}</div>
        <div className="text-xs">{name}</div>
      </div>
    </Link>
  );
}
function LargeSideBarButton({
  name,
  url,
  icon,
  isActive,
  setSelectedPageURL,
}: ActiveSidebarProps) {
  return (
    <Link
      to={url}
      className={`btn btn-ghost justify-start font-semibold ${
        isActive ? "btn-active" : ""
      }`}
      onClick={() => setSelectedPageURL(url)}
    >
      <div className="flex gap-4 items-center justify-start">
        <div>{icon({ size: 25 })}</div>
        <div className="text-md">{name}</div>
      </div>
    </Link>
  );
}
