import { GetServerSideProps } from "next";
import Rate from "../../components/Rate";
import API from "../../shared/api";
import { FaPhoneAlt, FaGlobeAmericas } from "react-icons/fa";
import ReviewPost from "../../components/ReviewPost";

function RestaurantPage({ restaurant }) {
  return (
    <div>
      <section className="mx-3 my-5">
        <div className="relative w-full pb-169 mb-3 overflow-hidden rounded-xl shadow-lg">
          <img
            className="absolute w-full h-full object-cover"
            src={`https://picsum.photos/600/400?random=100`}
          />
        </div>
        <div className="mx-3">
          <h1 className="text-2xl font-bold mb-2">{restaurant.name}</h1>
          <Rate rate={3} size={"small"} />
          <small className="text-sm">{restaurant.reviewsCount} reviews</small>
          <p className="my-4 text-sm text-gray-600">{restaurant.description}</p>
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
          <h2 className="text-5xl mb-3">4.2</h2>
          <div>
            <Rate rate={3} size="medium" inline />
          </div>
          <p>{restaurant.reviewsCount} Reviews</p>
        </div>
      </section>
      <section className="mx-6 my-5 py-6">
        <h1 className="text-lg font-bold mb-4">Reviews</h1>
        <div>
          <ReviewPost />
          <ReviewPost />
          <ReviewPost />
          <ReviewPost />
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { restaurant } = await API.getRestaurantById(params.id as string);
  return {
    props: { restaurant },
  };
};

export default RestaurantPage;
