import React, { useState, useEffect } from "react";
import Iphone14Img from "../../assets/Iphone14Hero.png";
import watchSale from "../../assets/watchSale.png";
import heroSpeaker from "../../assets/SpeakerHero.png";
import EarBud from "../../assets/EarBud.png";

export default function HeroSlider() {
  const SliderData = [Iphone14Img, watchSale, heroSpeaker, EarBud];
  const [currentSlide, setCurrentSlide] = useState(0);

  const moveRight = () => {
    setCurrentSlide((index) => {
      if (index === SliderData.length - 1) {
        return 0;
      }
      return index + 1;
    });
  };
  const moveLeft = () => {
    setCurrentSlide((index) => {
      if (index === 0) {
        return SliderData.length - 1;
      }
      return index - 1;
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      moveRight();
    }, 3000);
    return () => clearInterval(interval);
  });

  return (
    <section className="hidden md:block ">
      <div className="flex overflow-x-hidden relative">
        {SliderData.map((slide) => {
          return (
            <img
            loading="lazy"
              key={slide}
              src={slide}
              className="w-full aspect-[12/4] flex-grow-0 flex-shrink-0 "
              style={{
                translate: `${-100 * currentSlide}%`,
                transition: "translate 500ms ease-in-out",
              }}
            />
          );
        })}{" "}
        <button
          className=" absolute block left-0 top-0 bottom-0 z-10 p-4 hover:bg-black/20 text-white transition-all"
          onClick={moveLeft}
        >
          ❮
        </button>
        <button
          className="absolute block right-0 top-0 bottom-0 z-10 p-4 hover:bg-black/20 text-white transition-all"
          onClick={moveRight}
        >
          ❯
        </button>
      </div>

      <div className="flex justify-center w-full py-2 gap-2">
        {SliderData.map((_, index) => {
          return (
            <a
              id={index}
              key={index}
              className={`rounded-full h-3 aspect-square hover:bg-red-200 ${
                currentSlide === index ? "bg-red-500" : "bg-gray-200"
              }`}
              onClick={() => setCurrentSlide(index)}
            ></a>
          );
        })}
      </div>
    </section>
  );
}
