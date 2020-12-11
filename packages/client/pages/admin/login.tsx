import { Formik } from "formik";
import classnames from "classnames";
import API from "../../shared/api";
import Cookies from "universal-cookie";
import { useRouter } from "next/router";

function LoginPage() {
  const Router = useRouter();

  return (
    <main className="h-screen w-screen bg-gray-300">
      <div className="flex flex-col justify-center items-center align-middle h-full w-full">
        <div className="w-3/12 bg-white p-8 shadow-lg rounded">
          <h1 className="text-2xl text-center mb-4 font-semibold">
            Admin Panel
          </h1>
          <div>
            <Formik
              initialValues={{
                username: "",
                password: "",
              }}
              onSubmit={async (values) => {
                const { access_token } = await API.login(
                  values.username,
                  values.password
                );
                const cookies = new Cookies();
                cookies.set("token", access_token, {
                  sameSite: "strict",
                  path: "/",
                });

                Router.push("/admin");
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="text-xs block mb-2">Email:</label>
                    <input
                      className="rounded-md bg-gray-200 p-1 w-full"
                      type="email"
                      name="username"
                      value={values.username}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="text-xs block mb-2">Password:</label>
                    <input
                      className="rounded-md bg-gray-200 p-1 w-full"
                      name="password"
                      type="password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className={classnames(
                        "bg-yellow-500 rounded-full px-6 py-2 text-white w-full uppercase font-bold text-sm",
                        { "bg-yellow-100": isSubmitting }
                      )}
                      disabled={isSubmitting}
                    >
                      Send
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
