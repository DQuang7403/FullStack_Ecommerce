import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAPI } from "../utils/fetchAPI";
import { StarRating } from "../utils/constants";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GrPowerCycle } from "react-icons/gr";
import { ProductCard } from "../components/ProductCard";
export default function ProductPage() {
  const product = useParams();
  const relatedProduct = useRef(null);

  const [related, setRelated] = useState([]);
  const [added, setAdded] = useState(false);
  const [productDetail, setProductDetail] = useState({});
  const [images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [quantity, setQuantity] = useState(1);


  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:5000/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        product_id: productDetail.id,
        quantity: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAdded(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      const data = await fetchAPI(`products/${product.id}`);
      const related = await fetchAPI(`products/${data.category}`);
      setRelated(related);
      setProductDetail(data);
      setImages([data?.thumbnail]);
      setImages((current) => {
        return [...current, ...data?.images];
      });
      setSelectedImg(data?.thumbnail);
      setAdded(false)
    };
    fetchProductDetail();
  }, [product.id]);

  return (
    <section className="mx-4 my-10">
      <div
        role="alert"
        className={`alert alert-success mb-4 text-white font-semibold text-lg ${
          added === true ? "" : "hidden"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Product has been added to cart</span>
      </div>
      <div className="flex lg:flex-row flex-col items-center lg:justify-evenly gap-4">
        <div className="flex flex-wrap order-2 lg:order-first  lg:flex-col items-center gap-2 ">
          {images.map((img) => {
            return (
              <div
                key={img}
                className={`w-32 h-32 btn p-2 flex items-center justify-center rounded-lg border-2 hover:border-green-400 ${
                  img === selectedImg ? "border-red-500" : "outline-"
                }`}
                onClick={() => setSelectedImg(img)}
              >
                <img src={img} className="w-full object-cover" />
              </div>
            );
          })}
        </div>
        <div>
          <div className="lg:w-[536px] order-1 lg:order-2 flex lg:p-10 p-2 items-center justify-center aspect-square bg-blue shadow-xl bg-[#F2F2F2] rounded-lg">
            <img src={selectedImg} className="" />
          </div>
        </div>
        <div className="order-last max-w-[500px]">
          <h1 className=" text-2xl font-semibold">{productDetail?.title}</h1>
          <div>
            <StarRating star={productDetail?.rating} />
            <span className="ml-4">
              ({productDetail?.totalRating}) Reviews |{" "}
            </span>
            {productDetail?.stock > 0 ? (
              <span className="text-success"> In Stock</span>
            ) : (
              <span className="text-error"> | Out of Stock</span>
            )}
          </div>
          <div className="text-2xl ">${productDetail?.price}</div>
          <div className="py-4 border-b-2 border-black">
            {productDetail?.description}
          </div>
          <div className="flex items-center flex-wrap justify-evenly ">
            <div className="join">
              <button
                className={`btn join-item hover:bg-[#DB4444] hover:text-white `}
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>
              <input
                type="number"
                name="quantity"
                min="1"
                value={quantity}
                className=" w-20 text-center join-item"
                readOnly
              />
              <button
                className={`btn join-item hover:bg-[#DB4444] hover:text-white `}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <form onSubmit={handleSubmit} method="POST">
              <button
                className="btn bg-[#DB4444] hover:bg-[#BB232D] text-white my-10"
                type="submit"
              >
                Add to cart
              </button>
            </form>

            <label className="swap btn h-10 bg-[#F5F5F5] aspect-square btn-ghost rounded-lg hover:bg-slate-300">
              <input type="checkbox" />

              <AiFillHeart className="text-lg text-red-500 swap-on  fill-current" />

              <AiOutlineHeart className="text-lg swap-off fill-current" />
            </label>
          </div>
          <Link to={"/yourcart"} className="btn mb-4 w-full btn-accent">
            Go to cart
          </Link>
          <div>
            <div className="join join-vertical">
              <div className="join-item flex items-center border-2 p-6 gap-4">
                <LiaShippingFastSolid className="text-4xl" />
                <div>
                  <h2>Free Delivery</h2>
                  <p>Enter your postal code for Delivery Availability</p>
                </div>
              </div>
              <div className=" join-item flex items-center border-2 p-6 gap-4">
                <GrPowerCycle className="text-4xl" />
                <div>
                  <h2>Return Delivery</h2>
                  <p>Free 30 Days Delivery Returns. Details</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:mx-32 md:my-8 mx-1 my-8">
        <h2 className="text-2xl font-semibold">Relates Products</h2>
        <div
          ref={relatedProduct}
          className="custom-caurosel scroll-smooth max-w-full carousel-center p-4 space-x-4 rounded-box"
        >
          {related.map((product) => {
            return <ProductCard key={product?.id} product={product} />;
          })}
        </div>
        <div className="flex items-center justify-center">
          <Link
            to={"/products/all"}
            className="btn bg-[#DB4444] hover:bg-[#BB232D] text-white my-10"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
