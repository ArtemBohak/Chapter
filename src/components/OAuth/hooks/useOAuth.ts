import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import {
  SuccessResponse,
  FailResponse,
  ProfileSuccessResponse,
} from "@greatsumini/react-facebook-login";

import { type UseOAuthProps, type OAuthResponse } from "../OAuth.type";
import useGetOAthUrlParams from "../hooks/useGetOAthUrlParams";
import { facebookOAuthApi, getGoogleAuthCode } from "../helpers/api";

export const useOAuth = ({
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
        console.log("POST auth/twitter/login => ", authCode);
        setSearchParams("");
        setAuthCode("");
        navigate(url);
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
        const response = await facebookOAuthApi({
          facebookAccessToken: authCode,
        });
        console.log((response as OAuthResponse)?.data);
        setSearchParams("");
        setAuthCode("");
        navigate(url);
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
        const response = await getGoogleAuthCode({
          googleCode: authCode,
          redirectUri: currentLocation,
        });
        console.log(
          "POST auth/google/login => ",
          (response as OAuthResponse)?.data
        );
        setSearchParams("");
        setAuthCode("");
        navigate(url);
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
    const response = await facebookOAuthApi({
      facebookAccessToken: codeResponse.accessToken,
    });
    console.log((response as OAuthResponse)?.data);
    navigate(url);
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
        const response = await getGoogleAuthCode({
          googleCode: codeResponse.code,
          redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
        });

        console.log(
          "POST auth/google/login => ",
          (response as OAuthResponse)?.data
        );
        navigate(url);
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
