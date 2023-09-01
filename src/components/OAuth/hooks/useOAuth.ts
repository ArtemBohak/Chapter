import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { type UseOAuthProps } from "../OAuth.type";
import useGetOAthUrlParams from "../hooks/useGetOAthUrlParams";

export const useOAuth = ({
  type,
  facebookMode,
  googleMode,
  url = "/",
}: UseOAuthProps) => {
  const { authCode, twitterUrl, state, setSearchParams, setAuthCode } =
    useGetOAthUrlParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (
        type === "twitter" &&
        authCode &&
        state === import.meta.env.VITE_TWITTER_STATE
      ) {
        console.log("POST auth/twitter/login => ", authCode);
        setSearchParams("");
        setAuthCode("");
        navigate(url);
      }
    })();
  }, [authCode, navigate, setAuthCode, setSearchParams, state, type, url]);

  useEffect(() => {
    if (type === "facebook") console.log(1);
  }, [type]);

  return { twitterUrl };
};
