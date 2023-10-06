import React, { useState } from "react";
import { navbarCategories } from "../utils/constants";
import { Link, Outlet } from "react-router-dom";
import {  BiSearch, BiMenuAltLeft } from "react-icons/bi";

export default function SpecialNavBar() {
  const [selectedPage, setSelectedPage] = useState("Home");
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
          <div className="text-black font-bold text-2xl hidden lg:ml-20 min-[425px]:flex ">
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
                className="input bg-[#F5F5F5]  w-full h-10"
              />
              <button className="btn btn-ghost bg-[#F5F5F5] min-h-8 h-10">
                <BiSearch className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </nav>
  );
}
