import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FacebookLogin, {
  SuccessResponse,
  FailResponse,
  //   ProfileSuccessResponse,
} from "@greatsumini/react-facebook-login";

import useGetOAthUrlParams from "../hooks/useGetOAthUrlParams";
import { facebookOAuthApi } from "../helpers";
import { type FacebookOAuthProps } from "../OAuth.type";
import { IconEnum } from "@/src/components/Icon";

import { Icon } from "@/src/components/Icon";

const FacebookOAuth: FC<FacebookOAuthProps> = ({
  size = 24,
  className,
  url = "/",
  mode = false,
}) => {
  const { authCode, state, setSearchParams, setAuthCode, currentLocation } =
    useGetOAthUrlParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (authCode && state === import.meta.env.VITE_FACEBOOK_STATE) {
        const res = await facebookOAuthApi({
          facebookAccessToken: authCode,
        });
        console.log(res?.data);
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

  //   const onFacebookOauthProfileSuccess = (response: ProfileSuccessResponse) => {
  //     console.log("Get Facebook Profile Success!", response);
  //   };

  return (
    <FacebookLogin
      appId={import.meta.env.VITE_FACEBOOK_APP_ID}
      autoLoad={false}
      useRedirect={mode}
      fields="name,email,picture"
      onSuccess={onFacebookOauthSuccess}
      onFail={onFacebookOauthFail}
      dialogParams={{
        state: import.meta.env.VITE_FACEBOOK_STATE,
        redirect_uri: currentLocation,
      }}
      render={(renderProps) => {
        return (
          <button className={className} onClick={renderProps.onClick}>
            <Icon icon={IconEnum.Facebook} size={size} />
          </button>
        );
      }}
    />
  );
};

export default FacebookOAuth;
