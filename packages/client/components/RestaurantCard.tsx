import classnames from "classnames";
import { RESTAURANTS_ROUTE } from "../constants/routes";
import Rate from "./Rate";
import Link from "next/link";

type Props = {
  id: string;
  name: string;
  image: any;
  rate: number;
  ratio: "square" | "wide";
  reviewsCount: number;
  link: string;
};

function RestaurantCard({
  id,
  name,
  image,
  rate,
  reviewsCount,
  ratio,
  link,
}: Props) {
  return (
    <article>
      <Link href={link}>
        <a>
          <div
            className={classnames("relative mb-1", {
              "pb-full": ratio === "square",
              "pb-169": ratio === "wide",
            })}
          >
            <img
              className="absolute h-full w-full object-cover rounded-xl"
              src={`https://picsum.photos/600/400?random=${image}`}
              alt="restaurant"
            />
          </div>
        </a>
      </Link>
      <div className="pl-2">
        <Link href={link}>
          <a>
            <h1 className="font-semibold mb-2">{name}</h1>
          </a>
        </Link>
        <Rate rate={rate} size={"small"} />
        <small>{reviewsCount} reviews</small>
      </div>
    </article>
  );
}

export default RestaurantCard;
