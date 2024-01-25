import React, { useEffect, useRef, useState } from "react";
import Countdown from "../../utils/Countdown";
import { fetchAPI } from "../../utils/fetchAPI";
import { ProductCard } from "../ProductCard";
import { Link } from "react-router-dom";
export default function FlashSale() {
  const [flashSaleProducts, setFlashSaleProducts] = useState([]);
  const flashSaleSlide = useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchResult = async () => {
      const data = await fetchAPI(`sale_products?limit=8`);
      setFlashSaleProducts(data);
      setLoading(false);
    };
    try {
      fetchResult();
    } catch {
      console.log(err);
    }
  }, []);
  return (
    <section className="my-10 mx-2 border-b-2 ">
      <div>
        <h3 className="before:block before:h-10 before:rounded before:aspect-[1/2] before:bg-[#DB4444] flex items-center gap-3 text-[#DB4444] font-semibold ">
          Today's
        </h3>
        <div className="mt-5 md:flex items-center gap-10">
          <h1 className="font-bold text-2xl md:text-5xl ">Flash Sales</h1>

          <div className="flex items-center justify-between grow">
            <Countdown />
            <div className="flex items-center gap-2 ">
              <button
                className="btn btn-circle"
                onClick={() => {
                  let scrollAmount = 0;
                  const slideTimer = setInterval(() => {
                    flashSaleSlide.current.scrollLeft -= 20;
                    scrollAmount += 20;
                    if (scrollAmount >= 270) {
                      window.clearInterval(slideTimer);
                    }
                  }, 30);
                }}
              >
                ❮
              </button>
              <button
                className="btn btn-circle"
                onClick={() => {
                  let scrollAmount = 0;
                  const slideTimer = setInterval(() => {
                    flashSaleSlide.current.scrollLeft += 30;
                    scrollAmount += 30;
                    if (scrollAmount >= 270) {
                      window.clearInterval(slideTimer);
                    }
                  }, 30);
                }}
              >
                ❯
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={flashSaleSlide}
        className="custom-caurosel scroll-smooth max-w-full carousel-center p-4 space-x-4 rounded-box"
      >
        {loading ? (
          <span className="loading loading-spinner loading-md align-middle"></span>
        ) : (
          flashSaleProducts &&
          flashSaleProducts?.map((product) => {
            return <ProductCard key={product?.id} product={product} />;
          })
        )}
      </div>
      <div className="flex items-center justify-center">
        <Link
          to={"/products/Flash-sale"}
          className="btn bg-[#DB4444] hover:bg-[#BB232D] text-white my-10"
        >
          View all products
        </Link>
      </div>
    </section>
  );
}
