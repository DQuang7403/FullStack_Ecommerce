import React, { useState, useEffect, useRef } from "react";
import { Categories } from "../../utils/constants";
import { fetchAPI } from "../../utils/fetchAPI";
import { Link } from "react-router-dom";
export default function CategoriesSection() {
  const category = useRef(null);
  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      const data = await fetchAPI("products/categories");
      setAllCategories(data);
    };
    fetchCategory();
  }, []);

  return (
    <section className="my-10 mx-2 border-b-2 ">
      <div>
        <h3 className="before:block before:h-10 before:rounded before:aspect-[1/2] before:bg-[#DB4444] flex items-center gap-3 text-[#DB4444] font-semibold">
          Categories
        </h3>
        <div className="flex items-center justify-between grow mt-4">
          <h1 className="font-bold text-2xl md:text-5xl ">
            Browse By category
          </h1>

          <div className="hidden items-center gap-2 md:flex">
            <button
              className="btn btn-circle"
              onClick={() => {
                category.current.scrollLeft -= 270;
              }}
            >
              ❮
            </button>
            <button
              className="btn btn-circle"
              onClick={() => {
                category.current.scrollLeft += 270;
              }}
            >
              ❯
            </button>
          </div>
        </div>
      </div>
      <div
        ref={category}
        className="flex items-center justify-between gap-4 py-3 mt-10 custom-caurosel max-w-full carousel-center"
      >
        {Categories.map((category) => {
          return (
            <div
              key={category.name}
              className="carousel-item btn flex w-40 h-36 flex-col gap-4 items-center justify-center  hover:text-white hover:bg-[#DB4444] transition-all cursor-pointer"
            >
              <div className="text-4xl font-thin ">{category.icon}</div>
              <h3 className="text-base">{category.name}</h3>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-center my-10">
        <button
          className="btn bg-[#DB4444] hover:bg-[#BB232D] text-white"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          View All Categories
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">All categories</h3>
            <ul className="p-2 w-full join join-vertical">
              {allCategories.map((category) => {
                return (
                  <button className="btn hover:bg-[#DB4444] active:bg-[#BB232D] hover:text-white  text-base transition-all join-item ">
                    <Link to={`/${category}`} className="hover:text-white">{category}</Link>
                  </button>
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
