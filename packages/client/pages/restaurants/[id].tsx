import { GetServerSideProps } from "next";
import Rate from "../../components/Rate";
import API from "../../shared/api";
import { FaPhoneAlt, FaGlobeAmericas } from "react-icons/fa";
import ReviewPost from "../../components/ReviewPost";
import CommentComposer from "../../components/CommentComposer";
import RestaurantDetail from "../../components/RestaurantDetail";
import NavBarLayout from "../../components/NavBarLayout";

function RestaurantPage({ restaurant }) {
  return (
    <NavBarLayout>
      <div className="container mx-auto">
        <RestaurantDetail restaurant={restaurant} />
      </div>
    </NavBarLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { restaurant } = await API.getRestaurantById(params.id as string);
  return {
    props: { restaurant },
  };
};

export default RestaurantPage;
