import Rate from "../components/Rate";
import { FaUserAlt } from "react-icons/fa";
import moment from "moment";

type Props = {
  comment: string;
  rate: number;
  date: string;
  user: { name: string };
};

function ReviewFeaturedCard({ comment, rate, user, date }: Props) {
  return (
    <article className="my-7 shadow-md rounded-md p-6">
      <div className="flex flex-col items-center">
        <div className="pb-5">
          <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center bg-gray-400">
            <FaUserAlt size={16} color={"#fff"} />
          </div>
          <h1 className="font-bold mt-2 text-center">{user.name}</h1>
          <small className="text-xs mt-1 mb-4">
            ({moment(date).format("DD-MM-YYYY")})
          </small>
        </div>
        <div className="mb-7">
          <p className="text-xl text-gray-700">
            <span className="text-2xl font-bold">”</span>
            {comment}
            <span className="text-2xl font-bold font-serif">”</span>
          </p>
        </div>
        <div>
          <Rate rate={rate} size="medium" />
        </div>
      </div>
    </article>
  );
}

export default ReviewFeaturedCard;
