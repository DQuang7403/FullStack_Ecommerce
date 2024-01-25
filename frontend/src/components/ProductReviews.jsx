import React, { useEffect, useState, useContext } from "react";
import { StarRating } from "../utils/constants";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import AuthContext from "../context/AuthContext";
export default function ProductReviews({ product_name }) {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/review/get/${product_name}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReviews(data);
      });
  }, [product_name]);
  const handleReport = async (review_id) => {
    const { value: reportReason } = await Swal.fire({
      title: "Select field validation",
      input: "select",
      inputOptions: {
        "Inappropriate content/language": "Inappropriate content/language",
        "Spam or fake review": "Spam or fake review",
        "Offensive or abusive language": "Offensive or abusive language",
        "Conflicts of interest or biased review":
          "Conflicts of interest or biased review",
        "False or misleading information": "False or misleading information",
        "Multiple Reviews from the Same User":
          "Multiple Reviews from the Same User",
        "Violation of community guidelines":
          "Violation of community guidelines",
      },
      inputPlaceholder: "Select a reason to report",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (!user) {
            resolve("You have to log in to report");
          }
          if (value === "") {
            resolve("Please choose something to report");
          } else {
            resolve();
          }
        });
      },
    });
    if (reportReason) {
      const response = await fetch(`http://127.0.0.1:5000/review/report`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          review_id: review_id,
          user_email: user?.sub,
          report_reason: reportReason,
        }),
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Thank you for your report!",
          text: "We appreciate your feedback!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };
  return (
    <div className="mt-8 w-full">
      {reviews.length === 0 ? (
        <div className="text-center font-semibold text-xl">
          There is no review yet for this product
        </div>
      ) : (
        reviews?.map((review) => {
          const date = new Date(review.create_at);
          const formattedDate = date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          return (
            <div
              key={review.id}
              className="flex items-center justify-between border-b-2 border-[#E8E8E8] pb-4 "
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-white rounded-full w-10">
                      <span>
                        <BiUserCircle className="text-3xl" />
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{review.username}</div>
                    <StarRating star={review.rating} />
                    <div className="text-sm text-gray-500">{formattedDate}</div>
                  </div>
                </div>
                <div className="ml-12 max-w-4xl">
                  <p>{review.comment}</p>
                </div>
              </div>
              <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 rounded-full"
                >
                  <BsThreeDotsVertical />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <button
                      onClick={() => {
                        handleReport(review.id);
                      }}
                      className="text-red-500 font-semibold"
                    >
                      Report
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
