import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import OAuthApi from "../OAuthApi";
import { cookieParser } from "../helpers";

const { VITE_BASE_OAUTH_STATE } = import.meta.env;

const useGetOAuthUrlParams = () => {
  const [authCode, setAuthCode] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const currentLocation = window.location.origin + location.pathname;
  const stateId = cookieParser()
    ? cookieParser("stateId")
    : VITE_BASE_OAUTH_STATE;

  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );
  const { state, code } = params;

  useEffect(() => {
    code && setAuthCode(code);
  }, [code]);

  return {
    twitterUrl: OAuthApi.getTwitterOAuthUrl(currentLocation, stateId),
    authCode,
    state,
    currentLocation,
    setSearchParams,
    setAuthCode,
  };
};

export default useGetOAuthUrlParams;
