import { GetServerSideProps } from "next";
import NavBarLayout from "../components/NavBarLayout";
import RestaurantDetail from "../components/RestaurantDetail";
import RestaurantListItem from "../components/RestaurantListItem";
import RestaurantSlideSection from "../components/RestaurantSlideSection";
import { RESTAURANTS_ROUTE } from "../constants/routes";
import API from "../shared/api";

function Home({ restaurants }) {
  return (
    <NavBarLayout>
      <div className="container mx-auto">
        <RestaurantSlideSection
          restaurants={restaurants}
          title={"The best"}
          baseLink={`${RESTAURANTS_ROUTE}/`}
        />
        <RestaurantSlideSection
          restaurants={restaurants}
          title={"New places to eat"}
          itemsRatio={"square"}
          baseLink={`${RESTAURANTS_ROUTE}/`}
        />
        <section className="container mx-auto my-5">
          <h1 className="pl-2 mb-3 text-2xl font-bold">All places</h1>
          <div className="flex flex-col sm:flex-row space-y-2 px-4">
            {restaurants.map((info, i) => (
              <div className="w-full sm:w-1/2">
                <RestaurantListItem
                  key={info.id}
                  thumbnail={info.thumbnail}
                  name={info.name}
                  rate={info.rateAverage}
                  reviewsCount={info.reviewsCount}
                  link={`${RESTAURANTS_ROUTE}/${info.id}`}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </NavBarLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { restaurants } = await API.getAllRestaurants();
  return {
    props: { restaurants },
  };
};

export default Home;
