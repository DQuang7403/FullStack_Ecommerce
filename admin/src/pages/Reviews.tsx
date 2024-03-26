import { BiUserCircle } from "react-icons/bi";
import { StarRating } from "../utils/constants";
import { MdReport } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
type ReviewType = {
  review_id: number;
  email: string;
  rating: number;
  comment: string;
  create_at: string;
  report_details?: string[];
};
const formatDate = (date: string) => {
  const d = new Date(date);
  const formatDate = d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatDate;
};
export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewType[]>([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin/get_reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="overflow-auto bg-white sm:m-4">
      <div className="text-2xl p-3 font-semibold w-full z-10 sticky top-0 bg-[#F5F5F5]">
        Reviews
      </div>
      <div className="flex flex-col md:flex-row bg-white p-4 h-full ">
        <div className="w-full space-y-2">
          {reviews.map((review) => {
            return <ReviewBlock key={review.review_id} data={review} />;
          })}
        </div>
      </div>
    </div>
  );
}
type ReviewProps = {
  data: ReviewType;
  selected?: boolean;
  setSelected?: any;
};
const ReviewBlock = ({ data }: ReviewProps) => {
  return (
    <div className="collapse bg-base-200">
      <input type="checkbox" />
      <div
        className={`collapse-title gap-4 p-4 rounded-md space-y-2 scale-hover last:mb-10`}
      >
        <div className="flex sm:items-center gap-4 flex-col sm:flex-row">
          <div className="flex gap-4 items-center">
            <div className="bg-gray-400 text-white rounded-full size-9 sm:flex items-center justify-center gap-4 hidden">
              <BiUserCircle className="text-white text-3xl" />
            </div>
            <div>
              <div className="font-bold">{data.email}</div>
              <div className="text-sm text-gray-500">
                {formatDate(data.create_at)}
              </div>
            </div>
          </div>
          <div className="sm:ml-auto flex items-center ">
            <StarRating star={data.rating} />
            <div className="flex text-lg text-primary items-center font-semibold ml-3">
              <MdReport />
              {data.report_details?.length}
            </div>
          </div>
        </div>
        <div className="sm:ml-12 max-w-4xl">
          <p>{data.comment}</p>
        </div>
      </div>
      <div className="border-t-2 border-[#a1a1a1] collapse-content sm:pl-12">
        <ReviewDetails data={data?.report_details} review_id={data.review_id} />
      </div>
    </div>
  );
};
type ReviewDetialsProps = {
  data: string[] | undefined;
  review_id: number;
};
const ReviewDetails = ({ data, review_id }: ReviewDetialsProps) => {
  const deleteReview = async (review_id: number) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `http://localhost:5000/admin/delete_review/${review_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const data = await res.json();
        if (res.status === 201) {
          Swal.fire({
            icon: "success",
            title: data.message,
            timer: 1500,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          Swal.fire({
            icon: "error",
            title: "Something went wrong!",
          });
        }
      }
    });
  };
  return (
    <>
      {data!.length > 0 ? (
        <div>
          <h2 className="text-lg my-2 font-semibold text-red-400 flex items-center">
            Report Details:{" "}
            <FaRegTrashCan
              onClick={() => deleteReview(review_id)}
              className=" text-red-500 hover:text-red-700 ml-auto cursor-pointer  "
            />
          </h2>

          {data?.map((report, index) => {
            return (
              <div key={index} className="flex flex-col sm:flex-row">
                <span>{report[0]}</span>
                <span className="text-gray-500 ml-auto">
                  {formatDate(report[1])}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <h2 className="text-lg my-2 font-semibold text-green-400 flex items-center">
          No Report
          <FaRegTrashCan
            onClick={() => deleteReview(review_id)}
            className=" text-red-500 hover:text-red-700 ml-auto cursor-pointer  "
          />
        </h2>
      )}
    </>
  );
};
