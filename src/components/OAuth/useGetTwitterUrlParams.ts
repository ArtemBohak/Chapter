import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { getTwitterOAuthUrl } from "./helpers";

const useGetTwitterUrlParams = () => {
  const [authCode, setAuthCode] = useState("");
  const [searchParams] = useSearchParams();
  const currentLocation = window.location.origin;
  const location = useLocation();
  const redirectUri = currentLocation + location.pathname;

  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );
  const { state, code } = params;
  useEffect(() => {
    if (state && state === import.meta.env.VITE_TWITTER_STATE)
      setAuthCode(code);
  }, [code, state]);

  return {
    twitterUrl: getTwitterOAuthUrl(redirectUri),
    authCode,
    redirectUri,
  };
};

export default useGetTwitterUrlParams;
