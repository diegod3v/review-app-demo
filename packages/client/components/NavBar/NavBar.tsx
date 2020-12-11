import Link from "next/link";
import useCookie from "../../hooks/useCookie";
import LoginPopoverForm from "./LoginPopoverForm";

function NavBar() {
  const [authCookie] = useCookie("token");

  return (
    <div className="px-2 py-2 md:py-4 shadow-lg bg-yellow-500 text-white min-h-10">
      <div className="flex container mx-auto">
        <div className="w-2/12 sm:w-0"></div>
        <div className="w-8/12 sm:w-full">
          <h1 className="text-center sm:text-left sm:pl-8 font-bold">
            <Link href="/">
              <a>Review App</a>
            </Link>
          </h1>
        </div>
        <div className="w-2/12">
          <LoginPopoverForm />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
