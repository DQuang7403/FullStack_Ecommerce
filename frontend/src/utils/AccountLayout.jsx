import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
export default function AccountLayout() {
  const { user, userDetail } = useContext(AuthContext);
  return (
    <section className="lg:mx-32 md:my-8 mx-4 my-4">
      {user && (
        <div className="text-lg text-right my-8">
          Hello,{" "}
          <span className="text-[#DB4444] font-semibold">
            {userDetail?.username}
          </span>
        </div>
      )}
      {user && (
        <div role="tablist" className="tabs tabs-boxed mx-0">
          <NavLink
            to={"/account/my_account"}
            role="tab"
            className={({ isActive }) =>
              isActive
                ? "tab h-14 sm:h-full px-2 bg-[#DB4444] text-white"
                : "tab h-14 sm:h-full px-2"
            }
          >
            My Account
          </NavLink>
          <NavLink
            to="/account/order"
            role="tab"
            className={({ isActive }) =>
              isActive
                ? "tab h-14 sm:h-full px-2 bg-[#DB4444] text-white"
                : "tab h-14 sm:h-full px-2"
            }
          >
            My Order
          </NavLink>
          <NavLink
            to={"/account/wishlist"}
            role="tab"
            className={({ isActive }) =>
              isActive
                ? "tab h-14 sm:h-full px-2 bg-[#DB4444] text-white"
                : "tab h-14 sm:h-full px-2"
            }
          >
            My WishList
          </NavLink>
          <NavLink
            to={"/account/my-reviews"}
            role="tab"
            className={({ isActive }) =>
              isActive
                ? "tab h-14 sm:h-full px-2 bg-[#DB4444] text-white"
                : "tab h-14 sm:h-full px-2"
            }
          >
            My Reviews
          </NavLink>
        </div>
      )}
      <Outlet />
    </section>
  );
}
