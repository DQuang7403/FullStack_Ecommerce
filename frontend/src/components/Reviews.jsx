import React, { useEffect, useState, useContext } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import ProductReviews from "./ProductReviews";
import AuthContext from "../context/AuthContext";
export default function Reviews({ product_name }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);
  const handleReviewPost = (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You haven't login yet!",

        footer: '<a href="/login">Login now</a>',
      });
    }
    if (comment === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please write something!",
      });
    } else {
      fetch(`http://127.0.0.1:5000/review/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: rating,
          comment: comment,
          product_name: product_name,
          email: user?.sub,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Thank you for your review!",
              text: "We appreciate your feedback!",
            });
            setComment("");
          }
          if (res.status === 400) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "You haven't buy this product yet!",
            });
          }
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    console.log(product_name);
  }, [product_name]);
  return (
    <div>
      <div className="flex md:flex-row flex-col items-start md:gap-7 gap-2">
        <div className="avatar placeholder mt-10">
          <div className="bg-accent text-white rounded-full w-10">
            <span>
              <BiUserCircle className="text-3xl"/>
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full items-start grow gap-2">
          <div className="rating rating-md">
            <input
              type="radio"
              name="rating-2"
              onClick={() => setRating(1)}
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              onClick={() => setRating(2)}
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              onClick={() => setRating(3)}
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              onClick={() => setRating(4)}
              className="mask mask-star-2 bg-orange-400"
            />
            <input
              type="radio"
              name="rating-2"
              onClick={() => setRating(5)}
              className="mask mask-star-2 bg-orange-400"
            />
          </div>
          <textarea
            type="text"
            placeholder="Write Your Review"
            className="textarea w-full shadow-md border-b-2 border-accent focus:outline-none rounded text-lg focus:ring-accent auto-size focus:ring-2"
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <form onSubmit={handleReviewPost} className="flex self-end">
          <button
            type="submit"
            className="btn bg-primary text-white hover:bg-[#c33c3c] "
          >
            Post <AiOutlineSend />
          </button>
        </form>
      </div>
      <ProductReviews product_name={product_name} />
    </div>
  );
}
