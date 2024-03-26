import React, { useEffect, useState, useRef, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAPI } from "../../utils/fetchAPI";
import { ProductCard } from "../../components/ProductCard";
import CategoryContext from "../../context/CategoryContext";
export default function ProductByCategory() {
  const Category = useParams();
  const product = useRef(null);
  const [products, setProducts] = useState([]);
  const { allCategories } = useContext(CategoryContext);
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetchAPI(`products/${Category.name}`);
      setProducts(data);
    };
    fetchProducts();
  }, [Category.name]);
  return (
    <section className=" my-10 lg:mx-32 border-b-2 mx-1">
      <div>
        <h3 className="before:block before:h-10 before:rounded before:aspect-[1/2] before:bg-[#DB4444] flex items-center gap-3 text-[#DB4444] font-semibold">
          Category Products
        </h3>
        <div className="flex items-center justify-between grow mt-4">
          <h1 className="font-bold text-2xl md:text-5xl ">
            Explore Our {Category.name}
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
        className="custom-caurosel gap-4 md:flex md:flex-wrap md:justify-evenly max-w-full mt-10 carousel-center p-4  bg-neutral rounded-box"
      >
        {products.map((product) => {
          return <ProductCard key={product?.id} product={product} />;
        })}
      </div>
      <div className="flex items-center justify-center my-10">
        <button
          className="btn bg-primary hover:bg-primary_hover text-white"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          View All Categories
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">All categories</h3>
            <ul className="p-2 w-full join join-vertical">
              {allCategories.map((category) => {
                return (
                  <Link
                    key={category}
                    to={`/category/${category}`}
                    className="hover:text-white btn hover:bg-[#DB4444] active:bg-primary_hover  text-base transition-all join-item"
                    
                  >
                    {category}
                  </Link>
                );
              })}
            </ul>
            <p className="py-4">Press ESC key or click on ✕ button to close</p>
          </div>
        </dialog>
      </div>
    </section>
  );
}
