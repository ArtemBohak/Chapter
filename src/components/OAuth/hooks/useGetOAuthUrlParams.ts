import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import OAuthApi from "../OAuthApi";

const useGetOAuthUrlParams = () => {
  const [authCode, setAuthCode] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const currentLocation = window.location.origin + location.pathname;

  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );
  const { state, code } = params;

  useEffect(() => {
    code && setAuthCode(code);
  }, [code]);

  return {
    twitterUrl: OAuthApi.getTwitterOAuthUrl(currentLocation),
    authCode,
    state,
    currentLocation,
    setSearchParams,
    setAuthCode,
  };
};

export default useGetOAuthUrlParams;
