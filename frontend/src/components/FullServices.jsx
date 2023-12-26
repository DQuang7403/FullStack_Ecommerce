import React from "react";
import { FaTruckFast } from "react-icons/fa6";
import { RiCustomerService2Line, RiShieldCheckLine } from "react-icons/ri";
export default function FullServices() {
  return (
    <section className="flex items-center justify-evenly flex-wrap gap-10 my-24">
      <div className="flex flex-col items-center gap-6">
        <div className=" w-16 aspect-square bg-[#C1C0C1] rounded-full flex items-center justify-center">
          <div className=" w-12 aspect-square bg-black rounded-full flex items-center justify-center">
            <FaTruckFast className="text-white text-3xl" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className=" text-xl font-bold mb-2">FREE AND FAST DELIVERY</h3>
          <p >Free delivery for all orders over $140</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className=" w-16 aspect-square bg-[#C1C0C1] rounded-full flex items-center justify-center">
          <div className=" w-12 aspect-square bg-black rounded-full flex items-center justify-center">
            <RiCustomerService2Line className="text-white text-3xl" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className=" text-xl font-bold mb-2">24/7 CUSTOMER SERVICE</h3>
          <p >Friendly 24/7 customer support</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6">
        <div className=" w-16 aspect-square bg-[#C1C0C1] rounded-full flex items-center justify-center">
          <div className=" w-12 aspect-square bg-black rounded-full flex items-center justify-center">
            <RiShieldCheckLine className="text-white text-3xl" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className=" text-xl font-bold mb-2">MONEY BACK GUARANTEE</h3>
          <p >We return money within 30 days</p>
        </div>
      </div>
    </section>
  );
}
