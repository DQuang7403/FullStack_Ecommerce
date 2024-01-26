import React, {useState, useEffect, useContext} from "react";
import AuthContext from "../../context/AuthContext";
import { fetchAPI } from "../../utils/fetchAPI";
import { Link } from "react-router-dom";
export default function MyReviews() {
  const [userDetail, setUserDetail] = useState({});
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchAPI(`account/get_user/${user?.sub}`);
      setUserDetail(data);
    };
    fetchUser();
  }, [user]);
  return (
    <section className="lg:mx-32 md:my-8 mx-4 my-4">
      <div className="text-lg text-right my-8">
        Hello,{" "}
        <span className="text-[#DB4444] font-semibold">
          {userDetail?.username}
        </span>
      </div>

      <div role="tablist" className="tabs tabs-boxed mx-0">
        <Link to={"/account"} role="tab" className="tab h-14 sm:h-full px-2">
          My Account
        </Link>
        <Link to="/order" role="tab" className="tab  h-14 sm:h-full px-2">
          My Order
        </Link>
        <Link to={"/wishlist"} role="tab" className="tab h-14 sm:h-full px-2">
          My WishList
        </Link>
        <Link
          to={"/my-reviews"}
          role="tab"
          className="tab bg-[#DB4444] text-white h-14 sm:h-full px-2"
        >
          My Reviews
        </Link>
      </div>
      
    </section>
  );
}
