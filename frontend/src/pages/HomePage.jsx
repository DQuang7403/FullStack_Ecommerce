import React from "react";
import HeroSlider from "../components/HeroSlider";
import FlashSale from "../components/FlashSale";
export default function HomePage() {
  return (
    <section className="lg:mx-32 md:my-8 mx-1 my-4">
      <HeroSlider />
      <FlashSale />
    </section>
  );
}
