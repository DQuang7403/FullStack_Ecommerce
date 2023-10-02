import React from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineEye,
  AiFillEye,
} from "react-icons/ai";
import { StarRating } from "../utils/constants";
export const ProductCard = ({ product }) => {
  const discountPrice = (price, discount) => {
    price = Number(price);
    discount = Number(discount);
    return Math.round(price / (1 - discount / 100));
  };
  return (
    <div className="card rounded-none pt-4 w-[270px] bg-base-100 shadow-xl carousel-item cursor-pointer">
      <div className="absolute  bg-[#1FB2A6] text-white py-1 px-3 text-sm left-2 top-2 rounded-lg">
        - {Math.floor(product?.discountPercentage)} %
      </div>
      <figure>
        <img
          src={product?.images[0]}
          className="rounded-box aspect-[1] object-contain w-[190px]"
        />
      </figure>
      <div className="absolute flex gap-2 right-2 top-2 flex-col">
        <label className="swap btn h-10 bg-[#F5F5F5] aspect-square btn-ghost btn-circle hover:bg-slate-300">
          <input type="checkbox" />

          <AiFillHeart className="text-lg text-red-500 swap-on  fill-current" />

          <AiOutlineHeart className="text-lg swap-off fill-current" />
        </label>

        <label className="swap btn h-10 bg-[#F5F5F5] aspect-square btn-ghost btn-circle hover:bg-slate-300">
          <input type="checkbox" />

          <AiFillEye className="text-lg text-blue-500 swap-on fill-current" />

          <AiOutlineEye className="text-lg swap-off fill-current" />
        </label>
      </div>
      <div className="card-body px-4 py-6 bg-[#F5F5F5]">
        <h3 className="card-title text-lg">{product?.title}</h3>
        <div className="flex items-center  gap-4">
          <div className="text-[#DB4444] font-bold">${product?.price}</div>
          <s className="text-[#808080]">
            ${discountPrice(product?.price, product?.discountPercentage)}
          </s>
        </div>
        <div>
          <StarRating star={product?.rating} /> <span>({product?.stock})</span>
        </div>
      </div>
    </div>
  );
};
