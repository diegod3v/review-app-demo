import Rate from "../components/Rate";
import { FaPhoneAlt, FaGlobeAmericas } from "react-icons/fa";
import ReviewPost from "../components/ReviewPost";
import CommentComposer from "../components/CommentComposer";

type Props = {
  restaurant: any;
};

function RestaurantDetail({ restaurant }: Props) {
  return (
    <div className="my-8">
      <div className="mx-3">
        <div className="relative w-full pb-169 mb-3 overflow-hidden rounded-xl shadow-lg">
          <img
            className="absolute w-full h-full object-cover"
            src={`https://picsum.photos/600/400?random=100`}
          />
        </div>
      </div>
      <div className="sm:flex sm:space-x-4 md:space-x-6 md:space-x-reverse">
        <div className="sm:w-1/2 sm:order-2">
          <div className="sm:sticky sm:top-16">
            <section className="mx-3 my-5">
              <div className="mx-3">
                <h1 className="text-2xl font-bold mb-2">{restaurant.name}</h1>
                <Rate rate={restaurant.rateAverage} size={"small"} />
                <small className="text-sm">
                  {restaurant.reviewsCount} reviews
                </small>
                <p className="my-4 text-sm text-gray-600">
                  {restaurant.description}
                </p>
              </div>
            </section>
            <section className="mx-6 my-5 py-6 border-t border-b border-gray-300">
              <p className="text-sm mb-5">
                <FaPhoneAlt className="text-yellow-500 text-xl inline mr-5" />{" "}
                {restaurant.phone}
              </p>
              <p className="text-sm">
                <FaGlobeAmericas className="text-yellow-500 text-xl inline mr-5" />{" "}
                {restaurant.website}
              </p>
            </section>
            <section className="mx-6 my-5 py-6 text-center">
              <h1 className="text-lg bold mb-4">Reviews Summary</h1>
              <div>
                <h2 className="text-5xl mb-3">{restaurant.rateAverage}</h2>
                <div>
                  <Rate rate={restaurant.rateAverage} size="medium" inline />
                </div>
                <p>{restaurant.reviewsCount} Reviews</p>
              </div>
            </section>
          </div>
        </div>
        <div className="sm:w-1/2 sm:order-1">
          <section className="mx-6 my-5 py-6">
            <h1 className="text-lg font-bold mb-4">Reviews</h1>
            <div>
              <CommentComposer />
              {restaurant.reviews.map((review) => (
                <ReviewPost
                  key={review.id}
                  comment={review.comment}
                  rate={review.rate}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetail;
