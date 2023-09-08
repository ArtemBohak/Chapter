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

// import { useAppDispatch } from "@/src/redux/hooks";

import OAuthApi from "../OAuthApi";

const {
  VITE_BASE_OAUTH_STATE,
  VITE_TWITTER_STATE,
  VITE_FACEBOOK_STATE,
  VITE_GOOGLE_STATE,
  VITE_GOOGLE_REDIRECT_URI,
} = import.meta.env;

const useOAuth = ({
  variant,
  googlePopupMode = false,
  stateId,
}: UseOAuthProps) => {
  const [facebookErrorMessage, setFacebookErrorMessage] = useState<
    string | null
  >(null);
  // const dispatch = useAppDispatch();
  const {
    code,
    state,
    currentLocation,
    twitterUrl,
    googleAuthCode,
    twitterAuthCode,
    faceBookState,
    facebookAuthCode,
    setTwitterAuthCode,
    setFacebookAuthCode,
    setGoogleAuthCode,
    setSearchParams,
  } = useGetOAthUrlParams({ setFacebookErrorMessage, stateId });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (
        variant === "google" &&
        googleAuthCode &&
        (state === VITE_GOOGLE_STATE + stateId ||
          state === VITE_GOOGLE_STATE + VITE_BASE_OAUTH_STATE)
      ) {
        new OAuthApi({
          token: googleAuthCode,
          redirectUri: currentLocation,
          setSearchParams,
          navigate,
          setLoading,
          setAuthCode: setGoogleAuthCode,
          // dispatch,
        }).googleDataHandler();
      }
      if (
        variant === "facebook" &&
        facebookAuthCode &&
        (faceBookState === VITE_FACEBOOK_STATE + stateId ||
          faceBookState === VITE_FACEBOOK_STATE + VITE_BASE_OAUTH_STATE)
      ) {
        new OAuthApi({
          token: facebookAuthCode,
          setSearchParams,
          navigate,
          setLoading,
          setAuthCode: setFacebookAuthCode,
          // dispatch,
        }).facebookDataHandler();
      }
      if (
        variant === "twitter" &&
        twitterAuthCode &&
        (state === VITE_TWITTER_STATE + stateId ||
          state === VITE_TWITTER_STATE + VITE_BASE_OAUTH_STATE)
      ) {
        new OAuthApi({
          token: twitterAuthCode,
          setSearchParams,
          navigate,
          setAuthCode: setTwitterAuthCode,
          setLoading,
          // dispatch,
        }).twitterDataHandler();
      }
    })();
  }, [
    code,
    currentLocation,
    faceBookState,
    facebookAuthCode,
    googleAuthCode,
    state,
    stateId,
    variant,
    twitterAuthCode,
    navigate,
    setFacebookAuthCode,
    setSearchParams,
    setGoogleAuthCode,
    setTwitterAuthCode,
  ]);

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
          setLoading,
          // dispatch,
        }).googleDataHandler();
      }
    },
    onError: (error) => {
      console.log("Google Login Failed!", error);
    },
  });

  const onFacebookOauthSuccess = async (codeResponse: SuccessResponse) => {
    new OAuthApi({
      token: codeResponse.accessToken,
      navigate,
      setLoading,
      // dispatch,
    }).facebookDataHandler();
  };

  const onFacebookOauthFail = (error: FailResponse) => {
    console.log("Facebook Login Failed!", error);
    setFacebookErrorMessage(error.status);
  };

  const onFacebookOauthProfileSuccess = (response: ProfileSuccessResponse) => {
    console.log("Get Facebook Profile Success!", response);
  };

  return {
    twitterUrl,
    facebookErrorMessage,
    loading,
    currentLocation,
    onFacebookOauthSuccess,
    onFacebookOauthFail,
    onFacebookOauthProfileSuccess,
    googleOAuthLogin,
  };
};

export default useOAuth;
