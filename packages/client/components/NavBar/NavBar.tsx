import { useState } from "react";
import { FiUser } from "react-icons/fi";
import Popover from "react-popover";

function NavBar() {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [iscreatingAccount, setIsCreatingAccount] = useState(false);

  return (
    <div className="flex px-2 py-2 md:py-4 shadow-lg bg-yellow-500 text-white min-h-10">
      <div className="w-2/12"></div>
      <div className="w-8/12">
        <h1 className="text-center font-bold">Review App</h1>
      </div>
      <div className="w-2/12">
        <Popover
          className="z-40"
          place="below"
          isOpen={popoverOpen}
          onOuterAction={() => setPopoverOpen(false)}
          body={
            <div className="p-4 bg-white rounded-md shadow-lg min-w-20">
              <div className="flex flex-col">
                <div className="mb-4">
                  <label>Email: </label>
                  <input className="block w-full bg-gray-300 rounded-md p-1" />
                </div>
                <div className="mb-4">
                  <label>Password: </label>
                  <input className="block w-full bg-gray-300 rounded-md p-1" />
                </div>
                {iscreatingAccount && (
                  <div className="mb-4">
                    <label>Name: </label>
                    <input className="block w-full bg-gray-300 rounded-md p-1" />
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
                    <button className="w-full bg-yellow-500 rounded-full py-1">
                      {iscreatingAccount ? "Register" : "Login"}
                    </button>
                  </div>
                </div>
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
      </div>
    </div>
  );
}

export default NavBar;
