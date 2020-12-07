import Rate from "../components/Rate";

function ReviewPost() {
  return (
    <article className="my-7">
      <div className="flex items-center">
        <div className="w-2/12 p-1">
          <div className="relative pb-full overflow-hidden rounded-full">
            <img
              className="absolute h-full w-full object-cover"
              src="https://picsum.photos/600/400?random=130"
            />
          </div>
        </div>
        <div className="pl-3">
          <h1 className="text-xs font-bold mb-1">John Doe</h1>
          <Rate rate={2} size="small" />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </article>
  );
}

export default ReviewPost;
