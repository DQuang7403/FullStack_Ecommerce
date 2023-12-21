import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { StarRating } from "../utils/constants";
export const ProductCard = ({ product }) => {
  const discountPrice = (price, discount) => {
    return Number((price / (1 - discount / 100)).toFixed(2));
  };
  return (
    <div className="card pt-4 w-[270px] bg-base-100 shadow-[0_2px_8px_3px_rgba(0,0,0,0.3)] carousel-item cursor-pointer hover:-translate-y-2 transition-transform">
      <div className="absolute z-50 flex gap-2 right-2 top-2 flex-col">
        <label className="swap btn h-10 bg-[#F5F5F5] aspect-square btn-ghost btn-circle hover:bg-slate-300">
          <input type="checkbox" />

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
            src={product?.thumbnail}
            className=" aspect-[1] object-contain w-[190px]"
          />
        </figure>

        <div className="card-body px-4 py-6 ">
          <h3 className="card-title text-lg">{product?.title}</h3>
          <div className="flex items-center  gap-4">
            <div className="text-[#DB4444] font-bold">${product?.price}</div>
            {product?.discount ? (
              <s className="text-[#808080]">
                ${discountPrice(product?.price, product?.discount)}
              </s>
            ) : null}
          </div>
          <div>
            <StarRating star={product?.rating} />{" "}
            <span>({product?.stock})</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
