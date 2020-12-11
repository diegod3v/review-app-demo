import { useCallback, useEffect, useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function useCookie(name: string) {
  const [value, setValue] = useState(null);

  const setCookieVal = useCallback((val) => {
    cookies.set(name, val, {
      sameSite: "strict",
      path: "/",
    });
  }, []);

  const removeCookie = useCallback((val) => {
    cookies.remove(name);
  }, []);

  useEffect(() => {
    function getCookieAndSetValue() {
      const val = cookies.get(name);
      setValue(val);
    }
    cookies.addChangeListener(getCookieAndSetValue);
    getCookieAndSetValue();

    return () => {
      cookies.removeChangeListener(getCookieAndSetValue);
    };
  }, []);

  return [value, setCookieVal, removeCookie];
}

export default useCookie;
