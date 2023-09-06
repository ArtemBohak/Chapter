import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import {
  SuccessResponse,
  FailResponse,
  ProfileSuccessResponse,
} from "@greatsumini/react-facebook-login";

import { type UseOAuthProps } from "../OAuth.type";
import useGetOAthUrlParams from "./useGetOAuthUrlParams";
import { cookieParser } from "../helpers";

import OAuthApi from "../OAuthApi";

const useOAuth = ({ variant, googlePopupMode = false }: UseOAuthProps) => {
  const {
    authCode,
    state,
    setSearchParams,
    setAuthCode,
    currentLocation,
    twitterUrl,
  } = useGetOAthUrlParams();
  const navigate = useNavigate();
  const stateId = cookieParser()
    ? cookieParser("stateId")
    : import.meta.env.VITE_BASE_OAUTH_STATE;

  useEffect(() => {
    (async () => {
      if (
        variant === "twitter" &&
        authCode &&
        state === import.meta.env.VITE_TWITTER_STATE + stateId
      ) {
        new OAuthApi({
          token: authCode,
          setSearchParams,
          setAuthCode,
          navigate,
        }).twitterDataHandler();
      }

      if (
        variant === "facebook" &&
        authCode &&
        state === import.meta.env.VITE_FACEBOOK_STATE + stateId
      ) {
        new OAuthApi({
          token: authCode,
          setSearchParams,
          setAuthCode,
          navigate,
        }).facebookDataHandler();
      }

      if (
        variant === "google" &&
        authCode &&
        state === import.meta.env.VITE_GOOGLE_STATE + stateId
      ) {
        new OAuthApi({
          token: authCode,
          redirectUri: currentLocation,
          setSearchParams,
          setAuthCode,
          navigate,
        }).googleDataHandler();
      }
    })();
  }, [
    authCode,
    currentLocation,
    navigate,
    setAuthCode,
    setSearchParams,
    state,
    stateId,
    variant,
  ]);

  const onFacebookOauthSuccess = async (codeResponse: SuccessResponse) => {
    new OAuthApi({
      token: codeResponse.accessToken,
      navigate,
    }).facebookDataHandler();
  };

  const onFacebookOauthFail = (error: FailResponse) => {
    console.log("Facebook Login Failed!", error);
  };

  const onFacebookOauthProfileSuccess = (response: ProfileSuccessResponse) => {
    console.log("Get Facebook Profile Success!", response);
  };

  const googleOAuthLogin = useGoogleLogin({
    flow: "auth-code",
    ux_mode: googlePopupMode ? "popup" : "redirect",
    redirect_uri: currentLocation,
    state: import.meta.env.VITE_GOOGLE_STATE + stateId,
    onSuccess: async (codeResponse) => {
      if (codeResponse.state === import.meta.env.VITE_GOOGLE_STATE + stateId) {
        new OAuthApi({
          token: codeResponse.code,
          redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
          navigate,
        }).googleDataHandler();
      }
    },
    onError: (onError) => {
      console.log("Google Login Failed!", onError);
    },
  });

  return {
    twitterUrl,
    onFacebookOauthSuccess,
    onFacebookOauthFail,
    onFacebookOauthProfileSuccess,
    googleOAuthLogin,
    currentLocation,
  };
};

export default useOAuth;
