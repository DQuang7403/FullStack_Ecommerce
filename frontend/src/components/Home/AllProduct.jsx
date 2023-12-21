import React, { useEffect, useRef, useState } from "react";
import { fetchAPI } from "../../utils/fetchAPI";
import { ProductCard } from "../ProductCard";
import { Link } from "react-router-dom";
export default function AllProduct() {
  const [OurProducts, setOurProducts] = useState([]);
  const product = useRef(null);
  useEffect(() => {
    const fetchResult = async () => {
      const data = await fetchAPI(
        `product?limit=8`
      );
      setOurProducts(data);
    };
    fetchResult();
  }, []);
  return (
    <section className="my-10 mx-2 border-b-2">
      <div>
        <h3 className="before:block before:h-10 before:rounded before:aspect-[1/2] before:bg-[#DB4444] flex items-center gap-3 text-[#DB4444] font-semibold">
          Our Products
        </h3>
        <div className="flex items-center justify-between grow mt-4">
          <h1 className="font-bold text-2xl md:text-5xl ">
            Explore Our Products
          </h1>

          <div className="md:hidden items-center gap-2 flex">
            <button
              className="btn btn-circle"
              onClick={() => {
                product.current.scrollLeft -= 270;
              }}
            >
              ❮
            </button>
            <button
              className="btn btn-circle"
              onClick={() => {
                product.current.scrollLeft += 270;
              }}
            >
              ❯
            </button>
          </div>
        </div>
      </div>

      <div
        ref={product}
        className="custom-caurosel gap-4 lg:flex lg:flex-wrap lg:justify-evenly max-w-full mt-10 carousel-center p-4 rounded-box"
      >
        {OurProducts.map((product) => {
          return <ProductCard key={product?.id} product={product} />;
        })}
      </div>
      <div className="flex items-center justify-center">
        <Link to={"/products/all"} className="btn bg-[#DB4444] hover:bg-[#BB232D] text-white my-10">
          View all products
        </Link>
      </div>
    </section>
  );
}
