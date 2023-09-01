import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import getTwitterOAuthUrl from "../helpers/getTwitterOAuthUrl";

const useGetOAthUrlParams = () => {
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
    twitterUrl: getTwitterOAuthUrl(currentLocation),
    authCode,
    state,
    currentLocation,
    setSearchParams,
    setAuthCode,
  };
};

export default useGetOAthUrlParams;
