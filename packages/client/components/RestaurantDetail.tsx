import Rate from "../components/Rate";
import { FaPhoneAlt, FaGlobeAmericas } from "react-icons/fa";
import ReviewPost from "../components/ReviewPost";
import CommentComposer from "../components/CommentComposer";
import API from "../shared/api";
import { useRouter } from "next/router";
import { sanitizeUrl } from "../utils/sanitize";
import useUser from "../hooks/useUser";
import ReviewFeaturedCard from "./ReviewFeaturedCard";

interface Review {
  id: string;
  date: string;
  comment: string;
  rate: number;
  user: {
    name: string;
  };
}

interface RestaurantDetail {
  id: string;
  name: string;
  description: string;
  phone: string;
  website: string;
  thumbnail: string;
  rateAverage: number;
  reviewsCount: number;
  latestReview: Review;
  highestReview: Review;
  lowestReview: Review;
  reviews: Review;
}

type Props = {
  restaurant: RestaurantDetail;
};

function RestaurantDetail({ restaurant }: Props) {
  const user = useUser();
  const router = useRouter();

  const { highestReview, lowestReview, latestReview } = restaurant;

  return (
    <div className="my-8">
      <div className="mx-3">
        <div className="relative w-full pb-169 mb-3 overflow-hidden rounded-xl shadow-lg">
          <img
            className="absolute w-full h-full object-cover"
            src={restaurant.thumbnail}
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
                <a
                  className="underline text-blue-500 hover:text-blue-300"
                  href={`tel:${restaurant.phone}`}
                >
                  {restaurant.phone}
                </a>
              </p>
              <p className="text-sm">
                <FaGlobeAmericas className="text-yellow-500 text-xl inline mr-5" />{" "}
                <a
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  className="underline text-blue-500 hover:text-blue-300"
                  href={sanitizeUrl(restaurant.website)}
                >
                  {restaurant.website}
                </a>
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
            <section className="mx-6 my-5 py-6">
              <h1 className="text-lg font-bold my-4 text-center">
                What customers says ?
              </h1>
              {highestReview && (
                <div>
                  <h2 className="text-lg mb-3">The good</h2>
                  <ReviewFeaturedCard
                    comment={highestReview.comment}
                    rate={highestReview.rate}
                    user={highestReview.user}
                    date={highestReview.date}
                  />
                </div>
              )}
              {lowestReview && (
                <div>
                  <h2 className="text-lg mb-3">The bad</h2>
                  <ReviewFeaturedCard
                    comment={lowestReview.comment}
                    rate={lowestReview.rate}
                    user={lowestReview.user}
                    date={lowestReview.date}
                  />
                </div>
              )}
              {latestReview && (
                <div>
                  <h2 className="text-lg mb-3">Latest Review</h2>
                  <ReviewFeaturedCard
                    comment={latestReview.comment}
                    rate={latestReview.rate}
                    user={latestReview.user}
                    date={latestReview.date}
                  />
                </div>
              )}
            </section>
          </div>
        </div>
        <div className="sm:w-1/2 sm:order-1">
          <section className="mx-6 my-5 py-6">
            <h1 className="text-lg font-bold mb-4">Reviews</h1>
            <div>
              {user ? (
                <CommentComposer
                  onSubmit={async (review) => {
                    try {
                      await API.createReview(restaurant.id, review);
                      router.replace(router.asPath);
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                />
              ) : (
                <div>
                  <p className="text-2xl font-semibold text-center">
                    Registrate para dejar un comentario!
                  </p>
                </div>
              )}
              {restaurant.reviews.map((review) => (
                <ReviewPost
                  key={review.id}
                  comment={review.comment}
                  rate={review.rate}
                  user={review.user}
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
