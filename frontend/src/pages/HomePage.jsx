import React from "react";
import HeroSlider from "../components/Home/HeroSlider";
import FlashSale from "../components/Home/FlashSale";
import CategoriesSection from "../components/Home/CategoriesSection";
import AllProduct from "../components/Home/AllProduct";
import FullServices from "../components/FullServices";
import Offer from "../components/Home/Offer";
export default function HomePage() {
  return (
    <section className="lg:mx-32 md:my-8 mx-1 my-4">
      <HeroSlider />
      <FlashSale />
      <CategoriesSection />
      <AllProduct />
      <Offer />
      <FullServices />
    </section>
  );
}
