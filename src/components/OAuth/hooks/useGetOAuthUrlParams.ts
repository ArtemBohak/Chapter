import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import OAuthApi from "../OAuthApi";
import { getUrlParams } from "../helpers";
import { UseGetOAuthUrlParamsProps } from "../OAuth.type";

const useGetOAuthUrlParams = ({
  stateId,
  setFacebookErrorMessage,
}: UseGetOAuthUrlParamsProps) => {
  const [googleAuthCode, setGoogleAuthCode] = useState("");
  const [facebookAuthCode, setFacebookAuthCode] = useState("");
  const [twitterAuthCode, setTwitterAuthCode] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const currentLocation = window.location.origin + location.pathname;

  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );

  const { state, code, error_message } = params;

  const [facebookCode, faceBookState] = getUrlParams(
    location.hash.slice(1),
    "access_token",
    "state"
  );

  useEffect(() => {
    if (code) {
      setGoogleAuthCode(code);
      setTwitterAuthCode(code);
    }
    facebookCode && setFacebookAuthCode(facebookCode);
  }, [code, facebookCode]);

  useEffect(() => {
    if (error_message) {
      setFacebookErrorMessage(error_message);
      setSearchParams("");
    }
  }, [error_message, setFacebookErrorMessage, setSearchParams]);

  return {
    twitterUrl: OAuthApi.getTwitterOAuthUrl(currentLocation, stateId),
    googleAuthCode,
    state,
    currentLocation,
    code,
    facebookAuthCode,
    faceBookState,
    twitterAuthCode,
    setTwitterAuthCode,
    setSearchParams,
    setGoogleAuthCode,
    setFacebookAuthCode,
  };
};

export default useGetOAuthUrlParams;
