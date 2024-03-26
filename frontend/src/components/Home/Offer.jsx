import React from "react";
import offer from "../../assets/offer.png";
import { Link } from "react-router-dom";
export default function Offer() {
  return (
    <section className="my-10 mx-2 border-b-2 bg-gradient-to-r from-cyan-500 to-[#EC704C] flex items-center gap-4 p-4 flex-col md:flex-row">
      <div className="flex flex-col gap-6 pl-8">
        <div className="font-bold text-4xl text-[#590000]">Don't Miss Out</div>
        <div className="text-4xl font-semibold">
          Limited Time Offers -<br /> Get a New Laptop for the Holidays!
        </div>
        <Link to={"/category/laptop"} className="btn bg-primary hover:bg-primary_hover text-white w-32 border-none">
          Shop Now
        </Link>
      </div>
      <img loading="lazy" src={offer} className="w-full md:w-[50%] " />
    </section>
  );
}
