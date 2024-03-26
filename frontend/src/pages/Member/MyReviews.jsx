import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
export default function MyReviews() {
  const { user, userDetail } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [reportedReviews, setReportedReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(
        `http://127.0.0.1:5000/review/user/get/${userDetail?.email}`,
      );
      const data = await res.json();
      setReviews(data);
      const response = await fetch(
        `http://127.0.0.1:5000/review/report/get/${user?.email}`,
      );
      const data2 = await response.json();
      setReportedReviews(data2);
    };
    fetchReviews();
  }, []);
  return (
    <div>
      <div>
        <h3 className="text-xl mt-6 font-semibold text-accent">
          All my reviews
        </h3>
        <div className="overflow-x-auto mt-5 pb-5">
          {reviews.length > 0 ? (
            <table className="table table-lg table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th></th>
                  <td>Review ID</td>
                  <td>Product</td>
                  <td>Rating</td>
                  <td>Comment</td>
                  <td>Review at</td>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review, index) => {
                  const date = new Date(review.create_at);
                  const formattedDate = date.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  });
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{review.id}</td>
                      <td className="hover:underline cursor-pointer">
                        <Link to={`/product/${review.product_id}`}>
                          {review.product_name}
                        </Link>
                      </td>
                      <td>{review.rating}</td>
                      <td>{review.comment}</td>
                      <td>{formattedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h2 className="text-xl mt-6 font-semibold text-center">
              You haven't reviewed any products
            </h2>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-xl mt-6 font-semibold text-primary">
          All reported reviews
        </h3>
        <div className="overflow-x-auto mt-5 pb-5">
          {reportedReviews.length > 0 ? (
            <table className="table table-lg table-pin-rows table-pin-cols">
              <thead>
                <tr>
                  <th></th>
                  <td>Review ID</td>
                  <td>Reason</td>
                  <td>Status</td>
                  <td>Reported at</td>
                </tr>
              </thead>
              <tbody>
                {reportedReviews.map((review, index) => {
                  const date = new Date(review.report_timestamp);
                  const formattedDate = date.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  });
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{review.review_id}</td>
                      <td>{review.reason}</td>
                      <td
                        className={`font-semibold ${
                          review.status === "Pending"
                            ? "text-warning"
                            : "text-success"
                        }`}
                      >
                        {review.status}
                      </td>
                      <td>{formattedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h2 className="text-xl mt-6 font-semibold text-center">
              You haven't reported any reviews or it has already been resolved
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}
