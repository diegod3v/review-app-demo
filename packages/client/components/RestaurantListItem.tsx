import Link from "next/link";
import Rate from "../components/Rate";
import { RESTAURANTS_ROUTE } from "../constants/routes";

type Props = {
  name: string;
  rate: number;
  reviewsCount: number;
  link: string;
  thumbnail: string;
};

function RestaurantListItem({
  name,
  rate,
  reviewsCount = 100,
  link,
  thumbnail,
}: Props) {
  return (
    <article className="flex">
      <div className="w-4/12">
        <Link href={link}>
          <a>
            <div className="relative mb-1 pb-916">
              <img
                className="absolute h-full w-full object-cover rounded-xl"
                src={thumbnail}
                alt="restaurant"
              />
            </div>
          </a>
        </Link>
      </div>
      <div>
        <div className="pl-3 py-3">
          <Link href={link}>
            <a>
              <h1 className="font-semibold">{name}</h1>
            </a>
          </Link>
          <Rate rate={rate} size={"small"} />
          <small>{reviewsCount} reviews</small>
        </div>
      </div>
    </article>
  );
}

export default RestaurantListItem;
