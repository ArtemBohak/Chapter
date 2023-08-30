import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import {
  SuccessResponse,
  FailResponse,
  ProfileSuccessResponse,
} from "@greatsumini/react-facebook-login";

import { getAuthCode, facebookOAuthApi } from "./helpers";
import { type UseOAuth } from "./OAuth.type";

const { VITE_GOOGLE_STATE } = import.meta.env;

const useOAuth = ({ url }: UseOAuth) => {
  const navigate = useNavigate();

  const googleOAuthLogin = useGoogleLogin({
    flow: "auth-code",
    ux_mode: "popup",
    state: VITE_GOOGLE_STATE,

    onSuccess: async (codeResponse) => {
      if (codeResponse.state === VITE_GOOGLE_STATE) {
        navigate(url);
        const data = await getAuthCode({ googleCode: codeResponse.code });

        console.log("POST auth/google/login => ", data?.data.id_token);
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
  };
};

export { useOAuth };
