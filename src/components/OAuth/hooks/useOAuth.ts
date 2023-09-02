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

import OAuthApi from "../OAuthApi";

const useOAuth = ({
  type,
  googleUxMode = "redirect",
  url = "/",
}: UseOAuthProps) => {
  const {
    authCode,
    state,
    setSearchParams,
    setAuthCode,
    currentLocation,
    twitterUrl,
  } = useGetOAthUrlParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (
        type === "twitter" &&
        authCode &&
        state === import.meta.env.VITE_TWITTER_STATE
      ) {
        new OAuthApi({
          token: authCode,
          url,
          setSearchParams,
          setAuthCode,
          navigate,
        }).twitterDataHandler();
      }
    })();
  }, [authCode, navigate, setAuthCode, setSearchParams, state, type, url]);

  useEffect(() => {
    (async () => {
      if (
        type === "facebook" &&
        authCode &&
        state === import.meta.env.VITE_FACEBOOK_STATE
      ) {
        new OAuthApi({
          token: authCode,
          url,
          setSearchParams,
          setAuthCode,
          navigate,
        }).facebookDataHandler();
      }
    })();
  }, [authCode, navigate, setAuthCode, setSearchParams, state, type, url]);

  useEffect(() => {
    (async () => {
      if (
        type === "google" &&
        authCode &&
        state === import.meta.env.VITE_GOOGLE_STATE
      ) {
        new OAuthApi({
          token: authCode,
          redirectUri: currentLocation,
          url,
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
    type,
    url,
  ]);

  const onFacebookOauthSuccess = async (codeResponse: SuccessResponse) => {
    new OAuthApi({
      token: codeResponse.accessToken,
      url,
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
    ux_mode: googleUxMode,
    redirect_uri: currentLocation,
    state: import.meta.env.VITE_GOOGLE_STATE,
    onSuccess: async (codeResponse) => {
      if (codeResponse.state === import.meta.env.VITE_GOOGLE_STATE) {
        new OAuthApi({
          token: codeResponse.code,
          redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
          url,
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
