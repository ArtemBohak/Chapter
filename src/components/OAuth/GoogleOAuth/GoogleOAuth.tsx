import { FC, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";

import useGetOAthUrlParams from "../hooks/useGetOAthUrlParams";
import { getGoogleAuthCode } from "../helpers";
import { type GoogleOAuthProps } from "../OAuth.type";
import { IconEnum } from "@/src/components/Icon";

import { Icon } from "@/src/components/Icon";
import { useNavigate } from "react-router-dom";

const GoogleOAuth: FC<GoogleOAuthProps> = ({
  size = 24,
  className,
  url = "/",
  mode = "redirect",
}) => {
  const { authCode, state, setSearchParams, setAuthCode, currentLocation } =
    useGetOAthUrlParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (authCode && state === import.meta.env.VITE_GOOGLE_STATE) {
        const response = await getGoogleAuthCode({
          googleCode: authCode,
          redirectUri: currentLocation,
        });
        console.log("POST auth/google/login => ", response);
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
    url,
  ]);

  const googleOAuthLogin = useGoogleLogin({
    flow: "auth-code",
    ux_mode: mode,
    redirect_uri: currentLocation,
    state: import.meta.env.VITE_GOOGLE_STATE,
    onSuccess: async (codeResponse) => {
      if (codeResponse.state === import.meta.env.VITE_GOOGLE_STATE) {
        const response = await getGoogleAuthCode({
          googleCode: codeResponse.code,
          redirectUri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
        });

        console.log("POST auth/google/login => ", response);
        navigate(url);
      }
    },
    onError: (onError) => {
      console.log("Google Login Failed!", onError);
    },
  });
  return (
    <button className={className} onClick={() => googleOAuthLogin()}>
      <Icon icon={IconEnum.Google} size={size} />
    </button>
  );
};

export default GoogleOAuth;
