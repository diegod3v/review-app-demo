import { FaPizzaSlice, FaCommentAlt, FaUser } from "react-icons/fa";

function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      <aside className="w-2/12 bg-gray-900 text-white">
        <nav>
          <ul className="flex-col mt-5 font-semibold">
            <li className="py-2 pl-3 cursor-pointer hover:text-gray-400 bg-yellow-100 text-gray-900">
              <FaPizzaSlice className="inline mr-3" />
              Restaurants
            </li>
            <li className="py-2 pl-3 cursor-pointer hover:text-gray-400">
              <FaCommentAlt className="inline mr-3" />
              Reviews
            </li>
            <li className="py-2 pl-3 cursor-pointer hover:text-gray-400">
              <FaUser className="inline mr-3" />
              Users
            </li>
          </ul>
        </nav>
      </aside>
      <main className="w-10/12 overflow-y-scroll">{children}</main>
    </div>
  );
}

export default AdminLayout;
