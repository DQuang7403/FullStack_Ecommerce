import { BiBell, BiUserCircle, BiMenuAltLeft } from "react-icons/bi";
import useSidebarContext from "../context/SidebarContext";
export default function Navbar() {
  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-2 mx-4 sticky">
      <NavbarFirstSection visible={false} />
      <div className="flex flex-shrink-0 md:gap-2">
        <button className=" btn btn-ghost btn-circle">
          <div className="indicator z-0">
            <BiBell className="text-2xl " />
            <span className="badge badge-xs bg-red-500 border-red-500 indicator-item text-white py-2">
              2
            </span>
          </div>
        </button>

        <button className="btn btn-ghost btn-circle">
          <BiUserCircle className="text-2xl " />
        </button>
      </div>
    </div>
  );
}

type BrandProps = {
  visible?: boolean;
};
export function NavbarFirstSection({ visible = true }: BrandProps) {
  const { toggle } = useSidebarContext();
  return (
    <div className="flex gap-2 items-center flex-shrink-0">
      <button className="btn btn-ghost btn-circle" onClick={toggle}>
        <BiMenuAltLeft className="text-2xl" />
      </button>
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
