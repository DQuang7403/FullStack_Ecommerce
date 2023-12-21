import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAPI } from "../utils/fetchAPI";
import { ProductCard } from "../components/ProductCard";
export default function ProductsPage() {
  const ProductType = useParams();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      if (ProductType.name === "Flash-sale") {
        const data = await fetchAPI("discount_products");
        setProducts(data);
      } else {
        const data = await fetchAPI(
          `products`
        );
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);
  return (
    <section className="my-10 lg:mx-32 border-b-2 mx-1 ">
      <div>
        <h3 className="before:block before:h-10 before:rounded before:aspect-[1/2] before:bg-[#DB4444] flex items-center gap-3 text-[#DB4444] font-semibold">
          Products
        </h3>
        <div className="flex items-center justify-between grow mt-4">
          <h1 className="font-bold text-2xl md:text-5xl ">
            Explore Our {ProductType.name}
          </h1>

          
        </div>
      </div>

      <div className="custom-caurosel gap-4 md:flex md:flex-wrap md:justify-evenly max-w-full mt-10 carousel-center p-4  bg-neutral rounded-box">
        {products.map((product) => {
          return <ProductCard key={product?.id} product={product} />;
        })}
      </div>
      <div className="flex items-center justify-center">
        <button className="btn bg-[#DB4444] hover:bg-[#BB232D] text-white my-10">
          Load more
        </button>
      </div>
    </section>
  );
}
