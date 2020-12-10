import AdminLayout from "../../components/AdminLayout";
import { FaPizzaSlice, FaCommentAlt, FaUser } from "react-icons/fa";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Cookies from "universal-cookie";

function AdminHome() {
  return (
    <AdminLayout>
      <section className="container mx-auto h-full">
        <div className="flex w-full h-full items-center justify-center">
          <div className="w-6/12">
            <h1 className="mb-4 text-center text-2xl font-semibold">
              Welcome! Choose a data set to edit:
            </h1>
            <div className="flex space-x-6">
              <div className="w-1/3">
                <Link href="/admin/restaurants">
                  <a>
                    <div className="h-40 p-5 bg-gray-100 rounded-xl">
                      <FaPizzaSlice className="mx-auto" size={72} />
                      <p className="text-center text-lg font-semibold my-5">
                        Restaurants
                      </p>
                    </div>
                  </a>
                </Link>
              </div>
              <div className="w-1/3">
                <Link href="/admin/reviews">
                  <a>
                    <div className="h-40 p-5 bg-gray-100 rounded-xl">
                      <FaCommentAlt className="mx-auto" size={72} />
                      <p className="text-center text-lg font-semibold my-5">
                        Reviews
                      </p>
                    </div>
                  </a>
                </Link>
              </div>
              <div className="w-1/3">
                <Link href="/admin/users">
                  <a>
                    <div className="h-40 p-5 bg-gray-100 rounded-xl">
                      <FaUser className="mx-auto" size={72} />
                      <p className="text-center text-lg font-semibold my-5">
                        Users
                      </p>
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = new Cookies(req ? req.headers.cookie : null);
  const token = cookies.get("token");

  if (!token) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  } else {
    return { props: {} };
  }
};

export default AdminHome;
