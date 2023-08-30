import { FC } from "react";

import FacebookLogin from "@greatsumini/react-facebook-login";

import { useOAuth } from "./useOAuth";

import { type OAuthProps } from "./OAuth.type";

import { IconEnum } from "@/src/components/Icon";

import { Icon } from "@/src/components/Icon";

const { VITE_FACEBOOK_APP_ID } = import.meta.env;

const OAuth: FC<OAuthProps> = ({ type, size = 24, className, url = "/" }) => {
  const { googleOAuthLogin, onFacebookOauthSuccess, onFacebookOauthFail } =
    useOAuth({ url });

  const googleOAuth =
    type === "google" ? (
      <button className={className} onClick={() => googleOAuthLogin()}>
        <Icon icon={IconEnum.Google} size={size} />
      </button>
    ) : null;

  const facebookOAuth =
    type === "facebook" ? (
      <FacebookLogin
        appId={VITE_FACEBOOK_APP_ID}
        autoLoad={false}
        fields="name,email,picture"
        onSuccess={onFacebookOauthSuccess}
        onFail={onFacebookOauthFail}
        render={(renderProps) => {
          return (
            <button className={className} onClick={renderProps.onClick}>
              <Icon icon={IconEnum.Facebook} size={size} />
            </button>
          );
        }}
      />
    ) : null;
  return (
    <>
      {googleOAuth}
      {facebookOAuth}
    </>
  );
};

export default OAuth;
