import { FiArrowLeft } from "react-icons/fi";

function NavBar() {
  return (
    <div className="flex p-2 shadow-lg bg-yellow-500 text-white min-h-10">
      <div className="w-2/12">
        <FiArrowLeft size={24} />
      </div>
      <div className="w-8/12">
        <h1 className="text-center font-bold">Review App</h1>
      </div>
      <div className="w-2/12"></div>
    </div>
  );
}

export default NavBar;
