import { BiUserCircle } from "react-icons/bi";
import { StarRating } from "../utils/constants";
import { MdReport } from "react-icons/md";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineViewHeadline } from "react-icons/md";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
type Review = {
  reviewID: number;
  name: string;
  date: string;
  comment: string;
  reportedTime: number;
  rating: number;
  reasons?: string[];
};
export default function Reviews() {
  const Reviews: Review[] = [
    {
      reviewID: 1,
      name: "Felix",
      date: "2024-01-27 11:46:02.996387",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ipsam. Ipsa reprehenderit tempore corrupti, hic harum commodi amet veritatis laudantium!",
      reportedTime: 12,
      rating: 4,
      reasons: ["Spam or fake review", "Offensive or abusive language"],
    },
    {
      reviewID: 2,
      name: "John",
      date: "2024-01-27 11:46:02.996387",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ipsam. Ipsa reprehenderit tempore corrupti, hic harum commodi amet veritatis laudantium!",
      reportedTime: 0,
      rating: 5,
    },
    {
      reviewID: 3,
      name: "Nick",
      date: "2024-01-22 22:37:30.566378",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, ipsam. Ipsa reprehenderit tempore corrupti, hic harum commodi amet veritatis laudantium!",
      reportedTime: 0,
      rating: 3,
    },
  ];
  const [selectedReview, setSelectedReview] = useState<Review>(Reviews[0]);
  return (
    <div className="overflow-auto md:m-4 flex flex-col">
      <div className="text-2xl p-3 font-semibold w-full z-10 sticky top-0 bg-[#F5F5F5]">
        Reviews
      </div>
      <div className="flex md:divide-x-2 overflow-auto flex-col md:flex-row bg-white p-4 ">
        <div className="md:w-[75%] w-full overflow-auto space-y-2 pr-4">
          {Reviews.map((review) => {
            return (
              <ReviewBlock
                key={review.reviewID}
                data={review}
                selected={selectedReview.reviewID === review.reviewID}
                setSelected={setSelectedReview}
              />
            );
          })}
        </div>
        <div className="md:w-[25%] md:block h-full hidden p-4 bg-[#f7f7f7] font-semibold space-y-3">
          <ReviewStatus data={selectedReview} />
        </div>
      </div>
    </div>
  );
}
type ReviewProps = {
  data: Review;
  selected?: boolean;
  setSelected?: any;
};
const ReviewBlock = ({ data, selected, setSelected }: ReviewProps) => {
  const navigate = useNavigate();
  const day = new Date(data.date);
  const formatDate = day.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div
      className={`gap-4 border-2 border-gray-200 p-4 rounded-md space-y-2 ${
        selected && window.innerWidth >= 768 && "border-green-300"
      } cursor-pointer hover:border-green-500 transition-all`}
      onClick={() => {
        if (window.innerWidth >= 768) {
          setSelected(data);
        } else {
          navigate(`/reviews/${data.reviewID}`);
        }
      }}
    >
      <div className="flex items-center gap-4">
        <div className="flex gap-4 items-center">
          <div className="bg-red-500 text-white rounded-full size-10 flex items-center justify-center gap-4">
            <span>
              <BiUserCircle className="text-3xl" />
            </span>
          </div>
          <div>
            <div className="font-bold">{data.name}</div>
            <div className="text-sm text-gray-500">{formatDate}</div>
          </div>
        </div>
        <div className="ml-auto">
          <StarRating star={data.rating} />
          <div className="flex text-lg text-primary items-center font-semibold">
            <MdReport />
            <span>{data.reportedTime}</span>
          </div>
        </div>
      </div>
      <div className="ml-12 max-w-4xl">
        <p>{data.comment}</p>
      </div>
    </div>
  );
};
const ReviewStatus = ({ data }: ReviewProps) => {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl text-red-400 mb-6">Reported: {data.reportedTime}</h1>
      {data.reportedTime > 0 && (
        <h3 className="text-lg flex items-center gap-2">
          <BsFillQuestionCircleFill className=" text-warning text-2xl" />
          Reasons:{" "}
        </h3>
      )}

      <ul className="ml-10 list-disc">
        {data.reasons?.map((reason, index) => (
          <li key={index}>{reason}</li>
        ))}
      </ul>
      <div className="flex flex-row md:flex-col gap-4 mt-auto ">
        <button className="btn rounded-full bg-primary text-white hover:bg-red-700">
          <FaRegTrashCan className="" />
          Delete{" "}
        </button>
        <Link
          to={`/reviews/${data.reviewID}`}
          className="btn rounded-full text-white bg-[#0090E2] hover:bg-[#005EAA]"
        >
          <MdOutlineViewHeadline className="text-xl" />
          View Details{" "}
        </Link>
      </div>
    </div>
  );
};
