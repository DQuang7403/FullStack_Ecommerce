import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { StarRating } from "../utils/constants";
import CartContext from "../context/CartContext";
import WishListContext from "../context/WishListContext";
import AuthContext from "../context/AuthContext";
export const ProductCard = ({ product }) => {
  const { formatNumberWithCommas } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { wishList, toggleWishList, toggleUserWishList } =
    useContext(WishListContext);
  const discountPrice = (price, discount) => {
    return Number((price / (1 - discount / 100)).toFixed(2));
  };
  const [isWishList, setIsWishList] = useState();
  useEffect(() => {
    setIsWishList(() => {
      return wishList.find((item) => item.id === product?.id) ? true : false;
    });
  }, [wishList]);
  return (
    <div className=" card pt-4 w-[270px] bg-base-100 shadow-[0_2px_8px_3px_rgba(0,0,0,0.3)] carousel-item cursor-pointer hover:-translate-y-2 transition-transform">
      <div className="absolute z-10 flex gap-2 right-2 top-2 flex-col">
        <label className="swap btn h-10 bg-[#F5F5F5] aspect-square btn-ghost btn-circle hover:bg-slate-300">
          <input
            type="checkbox"
            checked={isWishList ? "checked" : ""}
            name="watchList"
            onChange={() => {
              setIsWishList(!isWishList);
              user
                ? toggleUserWishList(product, isWishList)
                : toggleWishList(product, isWishList);
            }}
          />

          <AiFillHeart className="text-lg text-red-500 swap-on  fill-current" />

          <AiOutlineHeart className="text-lg swap-off fill-current" />
        </label>
      </div>
      <Link to={`/product/${product.id}`}>
        {product?.discount ? (
          <div className="absolute  bg-[#1FB2A6] text-white py-1 px-3 text-sm left-2 top-2 rounded-lg">
            - {Math.floor(product?.discount)} %
          </div>
        ) : null}

        <figure>
          <img
            loading="lazy"
            src={product?.thumbnail}
            className=" aspect-[1] object-contain w-[190px]"
          />
        </figure>

        <div className="card-body px-4 py-6 ">
          <h3 className="card-title text-lg">{product?.title}</h3>
          <div className="flex items-center  gap-4">
            <div className="text-[#DB4444] font-bold">
              ${formatNumberWithCommas(product?.price)}
            </div>
            {product?.discount ? (
              <s className="text-[#808080]">
                $
                {formatNumberWithCommas(
                  discountPrice(product?.price, product?.discount)
                )}
              </s>
            ) : null}
          </div>
          <div>
            <StarRating star={product?.rating} />{" "}
            <span>({product?.totalRating})</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
