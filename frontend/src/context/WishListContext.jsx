import React, { createContext, useEffect, useState } from "react";
const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]);
  useEffect(() => {
    const fetchWishList = async () => {
      const res = await fetch("http://127.0.0.1:5000/wishlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setWishList(data);
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

  const contextData = {
    wishList: wishList,
    toggleWishList: toggleWishList,
  };
  return (
    <WishListContext.Provider value={contextData}>
      {children}
    </WishListContext.Provider>
  );
};

export default WishListContext;
