import RestaurantCard from "./RestaurantCard";
import ScrollContainer from "react-indiana-drag-scroll";

type Props = {
  restaurants: any;
  title: string;
  itemsRatio?: "wide" | "square";
  baseLink: string;
};

function RestaurantSlideSection({
  restaurants,
  title,
  itemsRatio = "wide",
  baseLink,
}: Props) {
  return (
    <section className="container mx-auto my-5">
      <h1 className="pl-2 mb-3 text-2xl font-bold">{title}</h1>
      <ScrollContainer vertical={false}>
        <div className="flex flex-nowrap">
          {restaurants.map((info, i) => (
            <div
              key={info.id}
              className="w-10/12 sm:w-1/2 md:w-1/3 flex-shrink-0 p-2"
            >
              <RestaurantCard
                id={info.id}
                name={info.name}
                image={i}
                rate={info.rateAverage}
                reviewsCount={info.reviewsCount}
                ratio={itemsRatio}
                link={`${baseLink}${info.id}`}
              />
            </div>
          ))}
        </div>
      </ScrollContainer>
    </section>
  );
}

export default RestaurantSlideSection;
