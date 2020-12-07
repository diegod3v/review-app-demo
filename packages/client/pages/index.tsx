import { GetServerSideProps } from "next";
import RestaurantListItem from "../components/RestaurantListItem";
import RestaurantSlideSection from "../components/RestaurantSlideSection";
import API from "../shared/api";

function Home({ restaurants }) {
  return (
    <>
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
      {restaurants.map((info, i) => (
        <RestaurantListItem
          key={info.id}
          image={i}
          name={info.name}
          kitchen={info.kitchen}
          rate={info.rateAverage}
          reviewsCount={info.reviewsCount}
        />
      ))}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { restaurants } = await API.getAllRestaurants();
  return {
    props: { restaurants },
  };
};

export default Home;
