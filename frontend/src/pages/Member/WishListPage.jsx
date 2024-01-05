import React, { useEffect, useState, useContext } from "react";
import { fetchAPI } from "../../utils/fetchAPI";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
export default function WishListPage() {
  const [userDetail, setUserDetail] = useState({});
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchAPI(`/account/get_user/${user?.sub}`);
      setUserDetail(data);
    };
    fetchUser();
  }, []);
  return (
    <section className="lg:mx-32 md:my-8 mx-4 my-4">
      <div className="text-lg text-right my-8">
        Hello,{" "}
        <span className="text-[#DB4444] font-semibold">
          {userDetail?.username}
        </span>
      </div>

      <div role="tablist" className="tabs tabs-boxed">
        <Link to={"/account"} role="tab" className="tab">
        My Account
        </Link>
        <Link to="/order" role="tab" className="tab ">
          My Order
        </Link>
        <Link
          to={"/wishlist"}
          role="tab"
          className="tab bg-[#DB4444] text-white"
        >
          My WishList
        </Link>
      </div>
    </section>
  );
}
