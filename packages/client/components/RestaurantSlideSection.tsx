import RestaurantCard from "./RestaurantCard";

type Props = {
  restaurants: any;
  title: string;
  itemsRatio?: "wide" | "square";
};

function RestaurantSlideSection({
  restaurants,
  title,
  itemsRatio = "wide",
}: Props) {
  return (
    <section className="container mx-auto my-5">
      <h1 className="pl-2 mb-3 text-2xl font-bold">{title}</h1>
      <div className="overflow-x-scroll">
        <div className="flex flex-nowrap">
          {restaurants.map((info, i) => (
            <div key={info.id} className="w-10/12 flex-shrink-0 p-2">
              <RestaurantCard
                id={info.id}
                name={info.name}
                image={i}
                rate={info.rateAverage}
                reviewsCount={info.reviewsCount}
                ratio={itemsRatio}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RestaurantSlideSection;
