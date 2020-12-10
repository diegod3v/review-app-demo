import { FaPizzaSlice, FaCommentAlt, FaUser } from "react-icons/fa";
import Link from "next/link";
import classnames from "classnames";
import { useRouter } from "next/router";

function AdminLayout({ children }) {
  const router = useRouter();
  return (
    <div className="flex h-screen">
      <aside className="w-2/12 bg-gray-900 text-white">
        <nav>
          <ul className="flex-col mt-5 font-semibold">
            <li
              className={classnames(
                "py-2 pl-3 cursor-pointer hover:text-gray-400",
                {
                  " bg-yellow-100 text-gray-900": router.asPath.includes(
                    "restaurants"
                  ),
                }
              )}
            >
              <Link href="/admin/restaurants">
                <a>
                  <FaPizzaSlice className="inline mr-3" />
                  Restaurants
                </a>
              </Link>
            </li>
            <li
              className={classnames(
                "py-2 pl-3 cursor-pointer hover:text-gray-400",
                {
                  " bg-yellow-100 text-gray-900": router.asPath.includes(
                    "reviews"
                  ),
                }
              )}
            >
              <Link href="/admin/reviews">
                <a>
                  <FaCommentAlt className="inline mr-3" />
                  Reviews
                </a>
              </Link>
            </li>
            <li
              className={classnames(
                "py-2 pl-3 cursor-pointer hover:text-gray-400",
                {
                  " bg-yellow-100 text-gray-900": router.asPath.includes(
                    "users"
                  ),
                }
              )}
            >
              <Link href="/admin/users">
                <a>
                  <FaUser className="inline mr-3" />
                  Users
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="w-10/12 overflow-y-scroll">{children}</main>
    </div>
  );
}

export default AdminLayout;
