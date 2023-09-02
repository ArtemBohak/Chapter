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

import {
  facebookDataHandler,
  googleDataHandler,
  twitterDataHandler,
} from "../helpers";

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
        twitterDataHandler({
          token: authCode,
          url,
          setSearchParams,
          setAuthCode,
          navigate,
        });
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
        facebookDataHandler({
          token: authCode,
          url,
          setSearchParams,
          setAuthCode,
          navigate,
        });
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
        googleDataHandler({
          token: authCode,
          redirectUri: currentLocation,
          url,
          setSearchParams,
          setAuthCode,
          navigate,
        });
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
    facebookDataHandler({
      token: codeResponse.accessToken,
      url,
      navigate,
    });
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
        googleDataHandler({
          token: codeResponse.code,
          redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
          url,
          navigate,
        });
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
