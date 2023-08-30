import { FC } from "react";

import FacebookLogin from "@greatsumini/react-facebook-login";

import { useOAuth } from "./useOAuth";

import { type OAuthProps } from "./OAuth.type";

import { IconEnum } from "@/src/components/Icon";

import { Icon } from "@/src/components/Icon";

const { VITE_FACEBOOK_APP_ID } = import.meta.env;

const OAuth: FC<OAuthProps> = ({ size = 24, className, url = "/", type }) => {
  const { googleOAuthLogin, onFacebookOauthSuccess, onFacebookOauthFail } =
    useOAuth({ url });

  if (type === "google")
    return (
      <button className={className} onClick={() => googleOAuthLogin()}>
        <Icon icon={IconEnum.Google} size={size} />
      </button>
    );

  if (type === "facebook")
    return (
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
    );

  if (type === "twitter") return <>Twitter</>;
};

export default OAuth;
