import classnames from "classnames";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import Popover from "react-popover";
import API from "../../shared/api";
import useCookie from "../../hooks/useCookie";
import useUser from "../../hooks/useUser";

function LoginPopoverForm() {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [iscreatingAccount, setIsCreatingAccount] = useState(false);
  const [, setAuthCookie, removeAuthCookie] = useCookie("token");
  const user = useUser();
  const Router = useRouter();

  return (
    <Popover
      className="z-40"
      place="below"
      isOpen={popoverOpen}
      onOuterAction={() => setPopoverOpen(false)}
      body={
        <div className="p-4 bg-white rounded-md shadow-lg min-w-20">
          <div className="flex flex-col">
            {user ? (
              <div>
                <h1 className="text-xl text-center mb-8">
                  Welcome {user.name}!
                </h1>
                <button
                  className={classnames(
                    "w-full rounded-full py-1 bg-yellow-500"
                  )}
                  onClick={() => {
                    removeAuthCookie();
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Formik
                initialValues={{ username: "", password: "", name: "" }}
                onSubmit={async (values) => {
                  if (iscreatingAccount) {
                    await API.createUser({
                      email: values.username,
                      name: values.name,
                      password: values.password,
                    });
                  }
                  const { access_token } = await API.login(
                    values.username,
                    values.password
                  );
                  setAuthCookie(access_token);

                  Router.push(Router.asPath);
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
                      <label>Email: </label>
                      <input
                        type="email"
                        className="block w-full bg-gray-300 rounded-md p-1"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="mb-4">
                      <label>Password: </label>
                      <input
                        type="password"
                        className="block w-full bg-gray-300 rounded-md p-1"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    {iscreatingAccount && (
                      <div className="mb-4">
                        <label>Name: </label>
                        <input
                          className="block w-full bg-gray-300 rounded-md p-1"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      </div>
                    )}
                    <div className="flex space-x-3 text-sm align-middle items-center">
                      <div className="w-1/2">
                        <button
                          className="w-full text-blue-600"
                          onClick={() => setIsCreatingAccount((prev) => !prev)}
                        >
                          {iscreatingAccount ? "Back" : "Create Account"}
                        </button>
                      </div>
                      <div className="w-1/2">
                        <button
                          type="submit"
                          className={classnames(
                            "w-full rounded-full py-1",
                            { "bg-yellow-500": !isSubmitting },
                            { "bg-yellow-300": isSubmitting }
                          )}
                          disabled={isSubmitting}
                        >
                          {iscreatingAccount ? "Register" : "Login"}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            )}
          </div>
        </div>
      }
    >
      <FiUser
        className="cursor-pointer"
        size={24}
        onClick={() => {
          setPopoverOpen(true);
        }}
      />
    </Popover>
  );
}

export default LoginPopoverForm;
