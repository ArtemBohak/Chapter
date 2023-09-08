import { useEffect, useState } from "react";
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
// import { useAppDispatch } from "@/src/redux/hooks";

import OAuthApi from "../OAuthApi";

const {
  VITE_BASE_OAUTH_STATE,
  VITE_TWITTER_STATE,
  VITE_FACEBOOK_STATE,
  VITE_GOOGLE_STATE,
  VITE_GOOGLE_REDIRECT_URI,
} = import.meta.env;

const useOAuth = ({ variant, googlePopupMode = false }: UseOAuthProps) => {
  const {
    authCode,
    state,
    currentLocation,
    twitterUrl,
    setSearchParams,
    setAuthCode,
  } = useGetOAthUrlParams();
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const stateId = cookieParser()
    ? cookieParser("stateId")
    : VITE_BASE_OAUTH_STATE;

  useEffect(() => {
    (async () => {
      if (
        variant === "twitter" &&
        authCode &&
        (state === VITE_TWITTER_STATE + stateId ||
          state === VITE_TWITTER_STATE + VITE_BASE_OAUTH_STATE)
      ) {
        new OAuthApi({
          token: authCode,
          setSearchParams,
          setAuthCode,
          navigate,
          // dispatch,
          setLoading,
        }).twitterDataHandler();
      }

      if (
        variant === "facebook" &&
        authCode &&
        (state === VITE_FACEBOOK_STATE + stateId ||
          state === VITE_FACEBOOK_STATE + VITE_BASE_OAUTH_STATE)
      ) {
        new OAuthApi({
          token: authCode,
          setSearchParams,
          setAuthCode,
          navigate,
          // dispatch,
          setLoading,
        }).facebookDataHandler();
      }

      if (
        variant === "google" &&
        authCode &&
        (state === VITE_GOOGLE_STATE + stateId ||
          state === VITE_GOOGLE_STATE + VITE_BASE_OAUTH_STATE)
      ) {
        new OAuthApi({
          token: authCode,
          redirectUri: currentLocation,
          setSearchParams,
          setAuthCode,
          navigate,
          // dispatch,
          setLoading,
        }).googleDataHandler();
      }
    })();
  }, [
    authCode,
    currentLocation,
    // dispatch,
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
      // dispatch,
      setLoading,
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
    state: VITE_GOOGLE_STATE + stateId,
    onSuccess: async (codeResponse) => {
      if (
        codeResponse.state === VITE_GOOGLE_STATE + stateId ||
        codeResponse.state === VITE_GOOGLE_STATE + VITE_BASE_OAUTH_STATE
      ) {
        new OAuthApi({
          token: codeResponse.code,
          redirectUri: VITE_GOOGLE_REDIRECT_URI,
          navigate,
          // dispatch,
          setLoading,
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
    loading,
    currentLocation,
  };
};

export default useOAuth;
