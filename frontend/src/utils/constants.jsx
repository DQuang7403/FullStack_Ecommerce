import React from "react";
import { FiSmartphone, FiWatch } from "react-icons/fi";
import { BsLaptop } from "react-icons/bs";
import { FaTabletScreenButton } from "react-icons/fa6";
import { RiWirelessChargingFill } from "react-icons/ri";
import { PiTelevisionLight } from "react-icons/pi";
export const navbarCategories = [
  { name: "Home", url: "/" },
  { name: "Products", url: "/products/all" },
  { name: "Contact", url: "/contact" },
  { name: "About", url: "/about" },
  // { name: "Sign Up", url: "/signup" },
];

export const Categories = [
  { name: "smartphones", icon: <FiSmartphone /> },
  { name: "laptop", icon: <BsLaptop /> },
  { name: "TV", icon: <PiTelevisionLight /> },
  { name: "tablet", icon: <FaTabletScreenButton /> },
  { name: "watch", icon: <FiWatch /> },
  { name: "accessories", icon: <RiWirelessChargingFill /> },
];

export const StarRating = ({ star }) => {
  const totalRate = Math.floor(star);
  const rate = [];
  for (let i = 0; i < totalRate; i++) {
    rate.push(<span key={i} className="fa fa-star text-[#FFAD33]"></span>);
  }
  if (totalRate < 5) {
    for (let i = totalRate; i < 5; i++) {
      rate.push(<span key={i} className="fa fa-star"></span>);
    }
  }
  return <>{rate}</>;
};
