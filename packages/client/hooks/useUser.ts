import { useEffect, useState } from "react";
import API from "../shared/api";
import useCookie from "./useCookie";

function useUser() {
  const [authCookie] = useCookie("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getMyUserInfo() {
      const { me } = await API.getMyProfile();
      setUser(me);
    }

    if (authCookie) {
      getMyUserInfo();
    } else {
      setUser(null);
    }
  }, [authCookie]);

  return user;
}

export default useUser;
