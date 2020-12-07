import classnames from "classnames";
import Rate from "./Rate";

type Props = {
  name: string;
  image: any;
  rate: number;
  ratio: "square" | "wide";
  reviewsCount: number;
};

function RestaurantCard({ name, image, rate, reviewsCount, ratio }: Props) {
  return (
    <article>
      <div
        className={classnames("relative mb-1", {
          "pb-full": ratio === "square",
          "pb-169": ratio === "wide",
        })}
      >
        <img
          className="absolute h-full w-full object-cover rounded-xl"
          src={`https://picsum.photos/600/400?random=${image}`}
          alt="dummy"
        />
      </div>
      <div className="pl-2">
        <h1 className="font-semibold mb-2">{name}</h1>
        <Rate rate={rate} size={"small"} />
        <small>{reviewsCount} reviews</small>
      </div>
    </article>
  );
}

export default RestaurantCard;
