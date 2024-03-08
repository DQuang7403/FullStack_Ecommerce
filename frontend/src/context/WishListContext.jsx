import React, { createContext, useEffect, useState, useContext } from "react";
import AuthContext from "./AuthContext";
const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishList, setWishList] = useState([]);
  useEffect(() => {
    const fetchWishList = async () => {
      if (user?.sub !== undefined) {
        const res = await fetch(
          `http://127.0.0.1:5000/wishlist/user/${user?.sub}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        setWishList(data);
      } else {
        const res = await fetch("http://127.0.0.1:5000/wishlist", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        setWishList(data);
      }
    };
    fetchWishList();
  }, []);
  const toggleWishList = async (product, onWishList) => {
    if (onWishList) {
      const res = await fetch("http://127.0.0.1:5000/wishlist/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ product_id: product?.id }),
      });
      const data = await res.json();
      setWishList(data.item);
    } else {
      const res = await fetch("http://127.0.0.1:5000/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ product_id: product.id }),
      });
      const data = await res.json();
      setWishList(data.item);
    }
  };
  const toggleUserWishList = async (product, onWishList) => {
    if (user && !onWishList) {
      const res = await fetch(`http://127.0.0.1:5000/wishlist/user/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          product_id: product?.id,
          user_email: user?.sub,
        }),
      });
      const data = await res.json();
      setWishList(data.item);
    } else {
      const res = await fetch(`http://127.0.0.1:5000/wishlist/user/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          product_id: product?.id,
          user_email: user?.sub,
        }),
      });
      const data = await res.json();
      setWishList(data.item);
    }
  };
  const contextData = {
    wishList: wishList,
    toggleWishList: toggleWishList,
    toggleUserWishList: toggleUserWishList,
  };
  return (
    <WishListContext.Provider value={contextData}>
      {children}
    </WishListContext.Provider>
  );
};

export default WishListContext;
