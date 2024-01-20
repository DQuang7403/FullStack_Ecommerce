import React, { useContext, useEffect, useState } from "react";
import { navbarCategories } from "../utils/constants";
import { Link, Outlet } from "react-router-dom";
import { BiUserCircle, BiBell, BiSearch, BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
export default function Nav_bar() {
  const [selectedPage, setSelectedPage] = useState(window.location.pathname);
  const [searchInput, setSearchInput] = useState("");
  const { items } = useContext(CartContext);
  const navigate = useNavigate();
  const { user, logoutUser } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput === "") {
      return;
    }
    navigate(`/products/search/${searchInput}`);
    setSearchInput("");
  };
  return (
    <nav>
      <div className="navbar border-b-2 border-gray-300 lg:px-12 py-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden ">
            <div className="drawer z-50">
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
                  <div className={`flex items-center mb-4`}>
                    <label
                      tabIndex={0}
                      htmlFor="my-drawer"
                      className="btn btn-ghost btn-circle mr-2"
                    >
                      <BiMenuAltLeft className="text-2xl" />
                    </label>

                    <div className=" font-bold text-2xl ">TechTopia</div>
                    <Link
                      to={"/yourcart"}
                      className="btn btn-ghost btn-circle flex flex-grow"
                    >
                      <div className="indicator z-0">
                        <AiOutlineShoppingCart className="text-2xl " />
                        <span className="badge badge-xs bg-red-500 border-red-500 indicator-item text-white">
                          {items}
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div
                    className={`mb-4 pb-2 border-b-2 justify-evenly border-gray-500 ${
                      window.location.pathname == "/login" ||
                      window.location.pathname == "/signup"
                        ? "hidden"
                        : "flex"
                    }`}
                  ></div>
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
            TechTopia
          </div>
        </div>
        <ul className="navbar-center tabs tabs-bordered gap-4 text-black hidden lg:flex">
          {navbarCategories.map((category) => {
            return (
              <li
                key={category.name}
                onClick={() => setSelectedPage(window.location.pathname)}
                className={`tab text-black font-semibold text-base ${
                  category.url === selectedPage ? "tab-active" : ""
                } `}
              >
                <Link to={`${category.url}`}>{category.name}</Link>
              </li>
            );
          })}
        </ul>
        <div className="navbar-end">
          <div className="form-control ">
            <form
              onSubmit={handleSubmit}
              method="post"
              className="join items-center"
            >
              <input
                type="text"
                placeholder="Search…"
                onChange={(e) => setSearchInput(e.target.value)}
                className="input join-item bg-[#F5F5F5] w-36 h-12 md:w-full"
              />
              <button
                type="submit"
                className="btn join-item btn-ghost bg-[#F5F5F5] h-10"
              >
                <BiSearch className="text-2xl" />
              </button>
            </form>
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
              className="tooltip tooltip-bottom hidden lg:block"
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
            {!user ? (
              <div className="dropdown dropdown-bottom dropdown-end ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <BiUserCircle className="text-3xl" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-50 menu p-2 shadow  rounded-box w-52"
                  style={{
                    borderRadius: "0.25rem",
                    background: "rgb(255, 255, 255)",
                  }}
                >
                  <li className="">
                    <Link to={"/login"}>Log In</Link>
                  </li>
                  <li className="">
                    <Link to={"/wishlist"}>My Wish List</Link>
                  </li>
                  <li className="">
                    <Link to={"/signup"}>Sign Up</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="dropdown dropdown-bottom dropdown-end ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <BiUserCircle className="text-3xl" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-50 menu p-2 shadow  rounded-box w-52"
                  style={{
                    borderRadius: "0.25rem",
                    background: "rgb(255, 255, 255)",
                  }}
                >
                  <li>
                    <Link to={"/account"}>Manage My Account</Link>
                  </li>
                  <li>
                    <Link to={"/order"}>My Order</Link>
                  </li>
                  <li>
                    <Link to={"/wishlist"}>My Wish list</Link>
                  </li>
                  <li className="">
                    <div onClick={logoutUser}>Log Out</div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
