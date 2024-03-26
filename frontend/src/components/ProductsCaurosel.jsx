import React from "react";
import { ProductCard } from "./ProductCard";
import { Link } from "react-router-dom";
export default function ProductsCaurosel({ products }) {
  return (
    <div>
      <div className="custom-caurosel scroll-smooth max-w-full carousel-center md:p-4 p-2 space-x-4 rounded-box w-full">
        {products.map((product) => {
          return <ProductCard key={product?.id} product={product} />;
        })}
      </div>
      <div className="flex items-center justify-center">
        <Link
          to={"/products/all"}
          className="btn bg-[#DB4444] hover:bg-primary_hover text-white my-10"
        >
          View all products
        </Link>
      </div>
    </div>
  );
}
