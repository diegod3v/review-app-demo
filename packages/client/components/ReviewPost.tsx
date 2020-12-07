import Rate from "../components/Rate";

type Props = {
  comment: string;
  rate: number;
};

function ReviewPost({ comment, rate }: Props) {
  return (
    <article className="my-7">
      <div className="flex items-center">
        <div className="w-2/12 p-1">
          <div className="relative pb-full overflow-hidden rounded-full">
            <img
              className="absolute h-full w-full object-cover"
              src="https://picsum.photos/600/400?random=130"
            />
          </div>
        </div>
        <div className="pl-3">
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
