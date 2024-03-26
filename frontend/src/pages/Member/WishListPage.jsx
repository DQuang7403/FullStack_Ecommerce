import React, { useEffect, useState, useContext } from "react";
import { fetchAPI } from "../../utils/fetchAPI";
import AuthContext from "../../context/AuthContext";
import WishListContext from "../../context/WishListContext";
import { Link } from "react-router-dom";
import WishListCart from "../../components/WishListCart";

export default function WishListPage() {
  const [userDetail, setUserDetail] = useState({});
  const { user } = useContext(AuthContext);
  const { wishList } = useContext(WishListContext);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(
        `http://127.0.0.1:5000/account/get_user/${user?.sub}`,
      );
      const data = await res.json();
      setUserDetail(data);
    };
    if (user?.sub !== undefined) {
      fetchUser();
    } else {
      setUserDetail({});
    }
  }, []);

  return (
    <section>
      <div className="flex justify-between my-10">
        <div className="text-2xl">Wishlist ({wishList.length})</div>

        <Link to={"/products/all"} className="btn btn-outline">
          Explore more
        </Link>
      </div>
      {wishList.length !== 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {wishList.map((item) => {
            return <WishListCart key={item.id} product={item}></WishListCart>;
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-10 my-20">
          <h1 className="text-3xl font-semibold">
            You Don't Have Any Items in Your Wishlist Yet
          </h1>
          <p className="text-md">
            Save Your Favorite Items to Your Wishlist and They'll Be Waiting
            Right Here!
          </p>
        </div>
      )}
    </section>
  );
}
