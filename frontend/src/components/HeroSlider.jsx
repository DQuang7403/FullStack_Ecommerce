import React, { useState, useEffect } from "react";
import Iphone14Img from "../assets/Iphone14Hero.png";
import watchSale from "../assets/watchSale.png";
import heroSpeaker from "../assets/SpeakerHero.png";
import EarPhoneHero from "../assets/EarPhoneHero.png";

export default function HeroSlider() {
  const [activeSlider, setActiveSlider] = useState("1");
  
  useEffect(() => {
    console.log("render")
  },[])
  return (
    <>
      <div className="carousel w-full m-0 p-0 ">
        <div id="slide1" className="carousel-item relative w-full aspect-[5]">
          <img src={watchSale} className="w-full " />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 ">
            <a
              href="#slide4"
              className="hidden border-none opacity-40 hover:opacity-100  md:btn"
              onClick={() => setActiveSlider("4")}
            >
              ❮
            </a>
            <a
              href="#slide2"
              className="hidden border-none opacity-40 hover:opacity-100  md:btn"
              onClick={() => setActiveSlider("2")}
            >
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img
            src={Iphone14Img}
            className="w-full  "
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide1"
              className="hidden border-none opacity-40 hover:opacity-100  md:btn"
              onClick={() => setActiveSlider("1")}
            >
              ❮
            </a>
            <a
              href="#slide3"
              className="hidden border-none opacity-40 hover:opacity-100  md:btn"
              onClick={() => setActiveSlider("3")}
            >
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img
            src={EarPhoneHero}
            className="w-full  "
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide2"
              className="hidden border-none opacity-40 hover:opacity-100  md:btn"
              onClick={() => setActiveSlider("2")}
            >
              ❮
            </a>
            <a
              href="#slide4"
              className="hidden border-none opacity-40 hover:opacity-100  md:btn"
              onClick={() => setActiveSlider("4")}
            >
              ❯
            </a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img
            src={heroSpeaker}
            className="w-full  "
          />

          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href="#slide3"
              className="hidden border-none opacity-40 hover:opacity-100  md:btn"
              onClick={() => setActiveSlider("3")}
            >
              ❮
            </a>
            <a
              href="#slide1"
              className="hidden border-none opacity-40 hover:opacity-100  md:btn"
              onClick={() => setActiveSlider("1")}
            >
              ❯
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <a
          id="1"
          href="#slide1"
          className={`rounded-full h-3 aspect-square hover:bg-red-200 ${activeSlider === "1" ? "bg-red-500" : "bg-gray-200"}`}
          onClick={() => setActiveSlider("1")}
        ></a>
        <a
          href="#slide2"
          className={`rounded-full h-3 aspect-square hover:bg-red-200 ${activeSlider === "2" ? "bg-red-500" : "bg-gray-200"}`}
          onClick={() => setActiveSlider("2")}
        ></a>
        <a
          href="#slide3"
          className={`rounded-full h-3 aspect-square hover:bg-red-200 ${activeSlider === "3" ? "bg-red-500" : "bg-gray-200"}`}
          onClick={() => setActiveSlider("3")}
        ></a>
        <a
          href="#slide4"
          className={`rounded-full h-3 aspect-square hover:bg-red-200 ${activeSlider === "4" ? "bg-red-500" : "bg-gray-200"}`}
          onClick={() => setActiveSlider("4")}
        ></a>
      </div>
    </>
  );
}
