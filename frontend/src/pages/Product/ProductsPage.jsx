import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAPI } from "../../utils/fetchAPI";
import { ProductCard } from "../../components/ProductCard";
export default function ProductsPage() {
  const ProductType = useParams();
  const Search = useParams();
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(8);
  useEffect(() => {
    const fetchProducts = async () => {
      if (ProductType.name === "Flash-sale") {
        const data = await fetchAPI("discount_products");
        setProducts(data);
      } else if (ProductType.name === "all") {
        const data = await fetchAPI(`products/all/${quantity}`);
        setProducts(data);
      } else if (Search.search) {
        const data = await fetchAPI(`products/search/${Search.search}`);
        setProducts(data);
      }
    };
    fetchProducts();
  }, [quantity, ProductType.name, Search.search]);
  return (
    <section className="my-10 lg:mx-32 border-b-2 mx-1 ">
      <div>
        <h3 className="before:block before:h-10 before:rounded before:aspect-[1/2] before:bg-[#DB4444] flex items-center gap-3 text-[#DB4444] font-semibold">
          Products
        </h3>
      </div>

      <div className="custom-carousel md:justify-evenly gap-4 md:flex md:flex-wrap max-w-full mt-10 carousel-center p-4 rounded-box">
        {products.length === 0 ? (
          <div className="text-white text-2xl text-center my-10">
            No products found !!!
          </div>
        ) : (
          products.map((product) => {
            return <ProductCard key={product?.id} product={product} />;
          })
        )}
      </div>
      <div className="flex items-center justify-center">
        <button
          className="btn bg-[#DB4444] hover:bg-primary_hover text-white my-10"
          onClick={() => setQuantity((prev) => prev + 4)}
        >
          Load more 
        </button>
      </div>
    </section>
  );
}
