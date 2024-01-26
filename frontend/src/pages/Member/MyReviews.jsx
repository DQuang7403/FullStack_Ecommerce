import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { fetchAPI } from "../../utils/fetchAPI";
import { Link } from "react-router-dom";
export default function MyReviews() {
  const [userDetail, setUserDetail] = useState({});
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [reportedReviews, setReportedReviews] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchAPI(`account/get_user/${user?.sub}`);
      setUserDetail(data);
    };
    const fetchReviews = async () => {
      const res = await fetch(
        `http://127.0.0.1:5000/review/user/get/${user?.sub}`
      );
      const data = await res.json();
      console.log(data);
      setReviews(data);
      const response = await fetch(
        `http://127.0.0.1:5000/review/report/get/${user?.sub}`
      );
      const data2 = await response.json();
      console.log(data2);
      setReportedReviews(data2);
    };
    fetchUser();
    fetchReviews();
  }, [user]);
  return (
    <section className="lg:mx-32 md:my-8 mx-4 my-4">
      <div className="text-lg text-right my-8">
        Hello,{" "}
        <span className="text-[#DB4444] font-semibold">
          {userDetail?.username}
        </span>
      </div>

      <div role="tablist" className="tabs tabs-boxed mx-0">
        <Link to={"/account"} role="tab" className="tab h-14 sm:h-full px-2">
          My Account
        </Link>
        <Link to="/order" role="tab" className="tab  h-14 sm:h-full px-2">
          My Order
        </Link>
        <Link to={"/wishlist"} role="tab" className="tab h-14 sm:h-full px-2">
          My WishList
        </Link>
        <Link
          to={"/my-reviews"}
          role="tab"
          className="tab bg-[#DB4444] text-white h-14 sm:h-full px-2"
        >
          My Reviews
        </Link>
      </div>
      <div>
        <div>
          <h3 className="text-xl mt-6 font-semibold text-accent">
            All reviews:{" "}
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
              <div>You have no reviews</div>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-xl mt-6 font-semibold text-primary">
            Reported reviews
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
                        <td className={`font-semibold ${review.status=== "Pending" ? "text-warning" : "text-success"}`}>{review.status}</td>
                        <td>{formattedDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <h2 className="text-xl mt-6 font-semibold text-center">
                You haven't reported any reviews
              </h2>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
