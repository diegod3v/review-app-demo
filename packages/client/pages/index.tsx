import { GetServerSideProps } from "next";
import NavBarLayout from "../components/NavBarLayout";
import RestaurantListItem from "../components/RestaurantListItem";
import RestaurantSlideSection from "../components/RestaurantSlideSection";
import API from "../shared/api";

function Home({ restaurants }) {
  return (
    <NavBarLayout>
      <RestaurantSlideSection restaurants={restaurants} title={"Los mejores"} />
      <RestaurantSlideSection
        restaurants={restaurants}
        title={"Los tacos mas perrones"}
        itemsRatio={"square"}
      />
      <RestaurantSlideSection
        restaurants={restaurants}
        title={"Italianos de siempre"}
      />
      <section className="container mx-auto my-5">
        <div className="flex flex-col space-y-2 px-4">
          {restaurants.map((info, i) => (
            <RestaurantListItem
              key={info.id}
              id={info.id}
              image={i}
              name={info.name}
              rate={info.rateAverage}
              reviewsCount={info.reviewsCount}
            />
          ))}
        </div>
      </section>
    </NavBarLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { restaurants } = await API.getAllRestaurants();
  return {
    props: { restaurants },
  };
};

export default Home;
