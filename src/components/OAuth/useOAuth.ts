import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import {
  SuccessResponse,
  FailResponse,
  ProfileSuccessResponse,
} from "@greatsumini/react-facebook-login";

import useGetTwitterUrlParams from "./useGetTwitterUrlParams";
import { getGoogleAuthCode, facebookOAuthApi } from "./helpers";
import { type UseOAuth } from "./OAuth.type";
import { useEffect } from "react";

const useOAuth = ({ url }: UseOAuth) => {
  const navigate = useNavigate();
  const { authCode, twitterUrl } = useGetTwitterUrlParams();

  useEffect(() => {
    if (authCode) {
      console.log("POST auth/twitter/login => ", authCode);
      navigate(url);
    }
  }, [authCode, navigate, url]);

  const googleOAuthLogin = useGoogleLogin({
    flow: "auth-code",
    state: import.meta.env.VITE_GOOGLE_STATE,
    onSuccess: async (codeResponse) => {
      if (codeResponse.state === import.meta.env.VITE_GOOGLE_STATE) {
        const data = await getGoogleAuthCode({ googleCode: codeResponse.code });

        console.log("POST auth/google/login => ", data?.data.id_token);

        navigate(url);
      }
    },
    onError: (onError) => {
      console.log("Google Login Failed!", onError);
    },
  });

  const onFacebookOauthSuccess = async (response: SuccessResponse) => {
    const res = await facebookOAuthApi({
      facebookAccessToken: response.accessToken,
    });
    console.log(res?.data);

    navigate(url);
  };

  const onFacebookOauthFail = (error: FailResponse) => {
    console.log("Facebook Login Failed!", error);
  };

  const onFacebookOauthProfileSuccess = (response: ProfileSuccessResponse) => {
    console.log("Get Facebook Profile Success!", response);
  };

  return {
    googleOAuthLogin,
    onFacebookOauthSuccess,
    onFacebookOauthFail,
    onFacebookOauthProfileSuccess,
    twitterAuthCode: authCode,
    twitterUrl,
  };
};

export default useOAuth;
