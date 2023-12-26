import React from "react";
import FullServices from "../components/FullServices";
import Achivement from "../components/Achivement";
export default function AboutPage() {
  return (
    <section className="lg:mx-32 md:my-8 mx-4 my-4">
      <h1 className="text-5xl font-semibold text-center mb-10">About Us</h1>
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        <div className=" flex flex-col items-start gap-10">
          <h1 className="text-4xl">Our Story</h1>
          <p className="max-w-2xl">
            We started out as a small tech shop with a passion for bringing
            people the latest gadgets and devices. Over the years, we've grown
            into the premier online retailer providing an unbeatable selection
            of smart home tech, wearables, personal electronics and more
            innovative products that make life better. Though our business has
            evolved, our core values remain the same - we're still driven by a
            love for technology and a commitment to amazing customer
            experiences.
          </p>
        </div>
        <img
          src="https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/Surface-Laptop-4-Panel01_FullbleedHero_ImagePlatinum:VP1-539x400"
          alt=""
          className="max-w-2xl w-full"
        />
      </div>
      <Achivement />
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        <img
          src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="max-w-2xl w-full"
        />
        <div className=" flex flex-col items-start gap-10">
          <h1 className="text-4xl">Our Commitment</h1>
          <p className="max-w-2xl">
            At TechTopia, customers are our top priority. We pride ourselves on
            providing exceptional service, whether it's helping you find the
            perfect tech or answering product questions. Our team is dedicated
            to ensuring an excellent shopping experience through perks like free
            shipping, easy returns and price matching. We are committed to
            offering innovative products paired with outstanding service.
          </p>
        </div>
      </div>
      <FullServices />
    </section>
  );
}
