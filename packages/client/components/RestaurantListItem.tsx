import classnames from "classnames";
import Rate from "../components/Rate";

type Props = {
  name: string;
  image: string;
  kitchen: string;
  rate: number;
  reviewsCount: number;
};

function RestaurantListItem({
  name,
  image,
  kitchen = "Mexican",
  reviewsCount = 100,
}: Props) {
  return (
    <article className="flex">
      <div className="w-4/12">
        <div className="relative mb-1 pb-916">
          <img
            className="absolute h-full w-full object-cover rounded-xl"
            src={`https://picsum.photos/600/400?random=${image}`}
            alt="dummy"
          />
        </div>
      </div>
      <div>
        <div className="pl-3 py-3">
          <h1 className="font-semibold">{name}</h1>
          <p className="text-xs text-gray-500 mb-3">{kitchen}</p>
          <Rate rate={3} size={"small"} />
          <small>{reviewsCount} reviews</small>
          <p className="text-xs mt-3">Hacker Av. #123, San Francisco</p>
        </div>
      </div>
    </article>
  );
}

export default RestaurantListItem;
