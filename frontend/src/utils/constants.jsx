import React from "react";
import { FiSmartphone } from "react-icons/fi";
import {FaMotorcycle}from "react-icons/fa"
import { BsLaptop, BsLamp } from "react-icons/bs";
import { LuSofa } from "react-icons/lu";
import { RiInkBottleLine } from "react-icons/ri";
import {MdOutlineLocalGroceryStore} from "react-icons/md"
export const navbarCategories = [
  { name: "Home", url: "/" },
  { name: "Contact", url: "/contact" },
  { name: "About", url: "/about" },
  { name: "Sign Up", url: "/signup" },
];

export const Categories = [
  { name: "smartphones", icon: <FiSmartphone /> },
  { name: "laptops", icon: <BsLaptop /> },
  { name: "furniture", icon: <LuSofa /> },
  { name: "skincare", icon: <RiInkBottleLine /> },
  { name: "groceries", icon: <MdOutlineLocalGroceryStore /> },
  { name: "lighting", icon: <BsLamp /> },
  { name: "motorcycle", icon: <FaMotorcycle /> },
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
