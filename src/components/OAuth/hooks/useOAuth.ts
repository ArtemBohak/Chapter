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
import { facebookApi, getGoogleAuthCode, googleApi } from "../helpers/oAuthapi";

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
        const response = await facebookApi({
          facebookAccessToken: authCode,
        });
        console.log(response);
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
        const data = await getGoogleAuthCode({
          googleCode: authCode,
          redirectUri: currentLocation,
        });
        const response = await googleApi({
          idToken: (data as OAuthResponse).id_token,
        });
        console.log(response);
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
    const response = await facebookApi({
      facebookAccessToken: codeResponse.accessToken,
    });
    console.log(response);
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
        const data = await getGoogleAuthCode({
          googleCode: codeResponse.code,
          redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
        });

        const response = await googleApi({
          idToken: (data as OAuthResponse).id_token,
        });
        console.log(response);
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
