import Rate from "../components/Rate";
import { FaUserAlt } from "react-icons/fa";

type Props = {
  comment: string;
  rate: number;
};

function ReviewPost({ comment, rate }: Props) {
  return (
    <article className="my-7">
      <div className="flex items-center">
        <div className="p-1">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-400">
            <FaUserAlt className="a" size={16} color={"#fff"} />
          </div>
        </div>
        <div className="pl-2 w-full">
          <h1 className="text-xs font-bold mb-1">John Doe</h1>
          <Rate rate={rate} size="small" />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-700">{comment}</p>
      </div>
    </article>
  );
}

export default ReviewPost;
