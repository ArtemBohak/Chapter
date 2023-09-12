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

import { useAppDispatch } from "@/src/redux/hooks";

import OAuthApi from "../OAuthApi";

const {
  VITE_BASE_OAUTH_STATE,
  VITE_TWITTER_STATE,
  VITE_FACEBOOK_STATE,
  VITE_GOOGLE_STATE,
  VITE_GOOGLE_REDIRECT_URI,
} = import.meta.env;

const useOAuth = ({
  oAuthVariant,
  googlePopupMode,
  stateId,
}: UseOAuthProps) => {
  const [facebookErrorMessage, setFacebookErrorMessage] = useState<
    string | null
  >(null);
  const dispatch = useAppDispatch();
  const {
    oAuthState,
    faceBookState,
    googleAuthCode,
    twitterAuthCode,
    facebookAuthCode,
    twitterRedirectUrl,
    currentLocation,
    setGoogleAuthCode,
    setFacebookAuthCode,
    setTwitterAuthCode,
    setSearchParams,
  } = useGetOAthUrlParams({ setFacebookErrorMessage, stateId });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (
        oAuthVariant === "google" &&
        googleAuthCode &&
        (oAuthState === VITE_GOOGLE_STATE + stateId ||
          oAuthState === VITE_GOOGLE_STATE + VITE_BASE_OAUTH_STATE)
      ) {
        const google = new OAuthApi({
          token: googleAuthCode,
          redirectUri: currentLocation,
          setSearchParams,
          navigate,
          setIsLoading,
          setAuthCode: setGoogleAuthCode,
          dispatch,
        });
        await google.googleLogin();
      }
      if (
        oAuthVariant === "facebook" &&
        facebookAuthCode &&
        (faceBookState === VITE_FACEBOOK_STATE + stateId ||
          faceBookState === VITE_FACEBOOK_STATE + VITE_BASE_OAUTH_STATE)
      ) {
        const facebook = new OAuthApi({
          token: facebookAuthCode,
          setSearchParams,
          navigate,
          setIsLoading,
          setAuthCode: setFacebookAuthCode,
          dispatch,
        });
        await facebook.facebookLogin();
      }
      if (
        oAuthVariant === "twitter" &&
        twitterAuthCode &&
        (oAuthState === VITE_TWITTER_STATE + stateId ||
          oAuthState === VITE_TWITTER_STATE + VITE_BASE_OAUTH_STATE)
      ) {
        const twitterLogin = new OAuthApi({
          token: twitterAuthCode,
          setSearchParams,
          navigate,
          setAuthCode: setTwitterAuthCode,
          setIsLoading,
          dispatch,
        });
        await twitterLogin.twitterLogin();
      }
    })();
  }, [
    faceBookState,
    oAuthState,
    stateId,
    facebookAuthCode,
    twitterAuthCode,
    googleAuthCode,
    oAuthVariant,
    currentLocation,
    navigate,
    setFacebookAuthCode,
    setSearchParams,
    setGoogleAuthCode,
    setTwitterAuthCode,
    dispatch,
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
        const google = new OAuthApi({
          token: codeResponse.code,
          redirectUri: VITE_GOOGLE_REDIRECT_URI,
          navigate,
          setIsLoading,
          dispatch,
        });
        await google.googleLogin();
      }
    },
    onError: (error) => {
      console.log("Google Login Failed!", error);
    },
  });

  const onFacebookOauthSuccess = async (codeResponse: SuccessResponse) => {
    const facebook = new OAuthApi({
      token: codeResponse.accessToken,
      navigate,
      setIsLoading,
      dispatch,
    });
    await facebook.facebookLogin();
  };

  const onFacebookOauthFail = (error: FailResponse) => {
    console.log("Facebook Login Failed!", error);
    setFacebookErrorMessage(error.status);
  };

  const onFacebookOauthProfileSuccess = (response: ProfileSuccessResponse) => {
    console.log("Get Facebook Profile Success!", response);
  };

  return {
    twitterRedirectUrl,
    facebookErrorMessage,
    isLoading,
    currentLocation,
    onFacebookOauthSuccess,
    onFacebookOauthFail,
    onFacebookOauthProfileSuccess,
    googleOAuthLogin,
  };
};

export default useOAuth;
