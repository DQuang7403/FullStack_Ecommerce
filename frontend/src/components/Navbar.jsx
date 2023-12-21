import React, { useContext, useState } from "react";
import { navbarCategories } from "../utils/constants";
import { Link, Outlet } from "react-router-dom";
import { BiUserCircle, BiBell, BiSearch, BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import CartContext from "../context/CartContext";
export default function Nav_bar() {
  const [selectedPage, setSelectedPage] = useState(window.location.pathname);
  const { items } = useContext(CartContext);
  return (
    <nav>
      <div className="navbar border-b-2 border-gray-300 lg:px-12 py-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <div className="tooltip tooltip-bottom" data-tip="Menu">
                  <label
                    tabIndex={0}
                    htmlFor="my-drawer"
                    className="btn btn-ghost btn-circle mr-2 "
                  >
                    <BiMenuAltLeft className="text-2xl" />
                  </label>
                </div>
              </div>
              <div className="drawer-side z-10 ">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content menu-open">
                  <div
                    className={`flex items-center mb-4 border-b-2 border-gray-500 `}
                  >
                    <label
                      tabIndex={0}
                      htmlFor="my-drawer"
                      className="btn btn-ghost btn-circle mr-2"
                    >
                      <BiMenuAltLeft className="text-2xl" />
                    </label>

                    <div className=" font-bold text-2xl ">Exclusive</div>
                  </div>
                  <div
                    className={`mb-4 pb-2 border-b-2 justify-evenly border-gray-500 ${
                      window.location.pathname == "/login" ||
                      window.location.pathname == "/signup"
                        ? "hidden"
                        : "flex"
                    }`}
                  >
                    <div
                      className="tooltip tooltip-bottom tooltip-secondary"
                      data-tip="Favorite"
                    >
                      <button className="btn btn-ghost btn-circle ">
                        <div className="indicator z-0">
                          <AiOutlineHeart className="text-2xl " />
                        </div>
                      </button>
                    </div>
                    <div
                      className="tooltip tooltip-bottom tooltip-secondary"
                      data-tip="Your cart"
                    >
                      <Link
                        to={"/yourcart"}
                        className="btn btn-ghost btn-circle flex"
                      >
                        <div className="indicator z-0">
                          <AiOutlineShoppingCart className="text-2xl " />
                          <span className="badge badge-xs bg-red-500 border-red-500 indicator-item text-white">
                            {items}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  {navbarCategories.map((category) => {
                    return (
                      <li
                        key={category.name}
                        className="text-lg font-semibold "
                        onClick={() =>
                          setSelectedPage(window.location.pathname)
                        }
                      >
                        <Link
                          className={
                            category.url === selectedPage ? "active" : ""
                          }
                          to={`${category.url}`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="text-black font-bold text-2xl hidden lg:ml-20 min-[425px]:flex ">
            Electrifies
          </div>
        </div>
        <ul className="navbar-center gap-4 text-black hidden lg:flex">
          {navbarCategories.map((category) => {
            return (
              <li
                key={category.name}
                onClick={() => setSelectedPage(window.location.pathname)}
              >
                <Link
                  to={`${category.url}`}
                  className={`tab text-black tab-bordered font-semibold text-base ${
                    category.url === selectedPage ? "tab-active" : ""
                  } `}
                >
                  {category.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="navbar-end">
          <div className="form-control ">
            <div className="input-group items-center">
              <input
                type="text"
                placeholder="Search…"
                className="input bg-[#F5F5F5] w-36 lg:w-full h-10"
              />
              <button className="btn btn-ghost bg-[#F5F5F5] min-h-8 h-10">
                <BiSearch className="text-2xl" />
              </button>
            </div>
          </div>
          <div
            className={`${
              window.location.pathname == "/login" ||
              window.location.pathname == "/signup"
                ? "hidden"
                : "flex"
            }`}
          >
            <div
              className="tooltip tooltip-bottom tooltip-secondary"
              data-tip="Favorite"
            >
              <button className="btn btn-ghost btn-circle hidden md:flex">
                <div className="indicator z-0">
                  <AiOutlineHeart className="text-2xl " />
                </div>
              </button>
            </div>
            <div
              className="tooltip tooltip-bottom tooltip-secondary"
              data-tip="Your cart"
            >
              <Link to={"/yourcart"} className="btn btn-ghost btn-circle flex">
                <div className="indicator z-0">
                  <AiOutlineShoppingCart className="text-2xl " />
                  <span className="badge badge-xs bg-red-500 border-red-500 indicator-item text-white">
                    {items}
                  </span>
                </div>
              </Link>
            </div>

            <details className="dropdown dropdown-bottom dropdown-end ">
              <summary className="btn btn-ghost btn-circle">
                <BiUserCircle className="text-3xl" />
              </summary>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow  rounded-box w-52"
                style={{
                  borderRadius: "0.25rem",
                  background: "rgb(255, 255, 255)",
                }}
              >
                <li className="">
                  <Link>Manage My Account</Link>
                </li>
                <li className="">
                  <Link>My Order</Link>
                </li>
                <li className="">
                  <Link>My Watch list</Link>
                </li>
                <li className="">
                  <Link>Log out</Link>
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </nav>
  );
}
