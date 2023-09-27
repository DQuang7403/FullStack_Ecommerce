import React, { useState } from "react";
import { navbarCategories } from "../utils/constants";
import { Link } from "react-router-dom";
import { BiUserCircle, BiBell, BiSearch, BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";
export default function Nav_bar() {
  const [selectedPage, setSelectedPage] = useState("Home");
  return (
    <nav className="navbar border-b-2 border-gray-300 lg:px-12">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <div
                className="tooltip tooltip-bottom"
                data-tip="Menu"
              >
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
                <div className="flex items-center mb-4 border-b-2 border-gray-500">
                  <label
                    tabIndex={0}
                    htmlFor="my-drawer"
                    className="btn btn-ghost btn-circle mr-2"
                  >
                    <BiMenuAltLeft className="text-2xl" />
                  </label>

                  <div className=" font-bold text-2xl ">Exclusive</div>
                </div>
                <div className="flex mb-4 pb-2 border-b-2 justify-evenly border-gray-500 md:hidden">
                  <div
                    className="tooltip tooltip-bottom tooltip-info"
                    data-tip="Favorite"
                  >
                    <button className="btn btn-ghost btn-circle ">
                      <div className="indicator z-0">
                        <AiOutlineHeart className="text-2xl " />
                      </div>
                    </button>
                  </div>
                  <div
                    className="tooltip tooltip-bottom tooltip-info"
                    data-tip="Notification"
                  >
                    <button className="btn btn-ghost btn-circle flex">
                      <div className="indicator z-0">
                        <BiBell className="text-2xl " />
                        <span className="badge badge-xs bg-red-500 border-red-500 indicator-item text-white">
                          1
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
                {navbarCategories.map((category) => {
                  return (
                    <li
                      key={category.name}
                      className="text-lg font-semibold "
                      onClick={() => setSelectedPage(category.name)}
                    >
                      <Link
                        className={
                          category.name === selectedPage ? "active" : ""
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
        <div className="text-black font-bold text-2xl hidden min-[425px]:flex ">
          Exclusive
        </div>
      </div>
      <ul className="navbar-center gap-4 text-black hidden lg:flex">
        {navbarCategories.map((category) => {
          return (
            <Link to={`${category.url}`} key={category.name}>
              <li
                className={`tab text-black tab-bordered font-semibold text-base ${
                  category.name === selectedPage ? "tab-active" : ""
                } `}
                onClick={() => setSelectedPage(category.name)}
              >
                {category.name}
              </li>
            </Link>
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
          className="tooltip tooltip-bottom tooltip-info"
          data-tip="Favorite"
        >
          <button className="btn btn-ghost btn-circle hidden md:flex">
            <div className="indicator z-0">
              <AiOutlineHeart className="text-2xl " />
            </div>
          </button>
        </div>
        <div
          className="tooltip tooltip-bottom tooltip-info"
          data-tip="Notification"
        >
          <button className="btn btn-ghost btn-circle hidden md:flex">
            <div className="indicator z-0">
              <BiBell className="text-2xl " />
              <span className="badge badge-xs bg-red-500 border-red-500 indicator-item text-white">
                1
              </span>
            </div>
          </button>
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
              <Link>Log out</Link>
            </li>
          </ul>
        </details>
      </div>
    </nav>
  );
}
