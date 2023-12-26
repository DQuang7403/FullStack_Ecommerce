import React from "react";
import { BsShop } from "react-icons/bs";
import { AiOutlineDollar } from "react-icons/ai";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
export default function Achivement() {
  return (
    <section className="flex items-center justify-evenly my-24 flex-wrap gap-4">
      <div className="flex hover:bg-[#DB4444] hover:text-white cursor-pointer flex-col items-center gap-6 py-4 w-[270px] border-gray-300 border-[2px]">
        <div className=" w-16 aspect-square bg-[#C1C0C1] rounded-full flex items-center justify-center">
          <div className=" w-12 aspect-square bg-black rounded-full flex items-center justify-center">
            <BsShop className="text-white text-3xl" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className=" text-xl font-bold mb-2">10.5k </h3>
          <p>Sallers active our site</p>
        </div>
      </div>
      <div className="flex hover:bg-[#DB4444] hover:text-white cursor-pointer flex-col items-center gap-6 py-4 w-[270px] border-gray-300 border-[2px]">
        <div className=" w-16 aspect-square bg-[#C1C0C1] rounded-full flex items-center justify-center">
          <div className=" w-12 aspect-square bg-black rounded-full flex items-center justify-center">
            <AiOutlineDollar className="text-white text-3xl" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className=" text-xl font-bold mb-2">33k </h3>
          <p>Monthly Produduct Sale</p>
        </div>
      </div>
      <div className="flex hover:bg-[#DB4444] hover:text-white cursor-pointer flex-col items-center gap-6 py-4 w-[270px] border-gray-300 border-[2px]">
        <div className=" w-16 aspect-square bg-[#C1C0C1] rounded-full flex items-center justify-center">
          <div className=" w-12 aspect-square bg-black rounded-full flex items-center justify-center">
            <MdOutlineShoppingBag className="text-white text-3xl" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className=" text-xl font-bold mb-2">45.5k</h3>
          <p>Customer active in our site</p>
        </div>
      </div>
      <div className="flex hover:bg-[#DB4444] hover:text-white cursor-pointer flex-col items-center gap-6 py-4 w-[270px] border-gray-300 border-[2px]">
        <div className=" w-16 aspect-square bg-[#C1C0C1] rounded-full flex items-center justify-center">
          <div className=" w-12 aspect-square bg-black rounded-full flex items-center justify-center">
            <FaSackDollar className="text-white text-3xl" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className=" text-xl font-bold mb-2">25k</h3>
          <p>Anual gross sale in our site</p>
        </div>
      </div>
    </section>
  );
}
