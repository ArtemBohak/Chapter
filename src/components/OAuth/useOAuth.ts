import { useGoogleLogin } from "@react-oauth/google";
import {
  SuccessResponse,
  FailResponse,
  ProfileSuccessResponse,
} from "@greatsumini/react-facebook-login";
import { useNavigate } from "react-router-dom";

import { getAuthCode, facebookOAuthApi } from "./helpers";
import { type UseOAuth } from "./OAuth.type";

const useOAuth = ({ url }: UseOAuth) => {
  const navigate = useNavigate();

  const googleOAuthLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      console.log("Google Login Success!", codeResponse);
      navigate(url);
      const data = await getAuthCode({ googleCode: codeResponse.code });

      console.log("POST auth/google/login => ", data?.data.id_token);
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
  };
};

export { useOAuth };
