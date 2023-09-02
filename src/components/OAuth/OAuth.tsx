import { FC } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";

import { useOAuth } from "./hooks";
import { type OAuthProps } from "./OAuth.type";

import { Icon } from "@/src/components/Icon";
import { IconEnum } from "@/src/components/Icon";

const OAuth: FC<OAuthProps> = ({
  type,
  size = 24,
  className,
  url,
  facebookUxMode = true,
  googleUxMode,
  dataAutomation = "authButton",
}) => {
  const {
    twitterUrl,
    onFacebookOauthSuccess,
    onFacebookOauthFail,
    currentLocation,
    googleOAuthLogin,
  } = useOAuth({ type, url, googleUxMode });

  if (type === "google")
    return (
      <button
        className={className}
        onClick={() => googleOAuthLogin()}
        data-automation={dataAutomation}
      >
        <Icon icon={IconEnum.Google} size={size} />
      </button>
    );

  if (type === "facebook")
    return (
      <FacebookLogin
        appId={import.meta.env.VITE_FACEBOOK_APP_ID}
        autoLoad={false}
        useRedirect={facebookUxMode}
        fields="name,email,picture"
        onSuccess={onFacebookOauthSuccess}
        onFail={onFacebookOauthFail}
        dialogParams={{
          state: import.meta.env.VITE_FACEBOOK_STATE,
          redirect_uri: currentLocation,
        }}
        render={(renderProps) => {
          return (
            <button
              className={className}
              onClick={renderProps.onClick}
              data-automation={dataAutomation}
            >
              <Icon icon={IconEnum.Facebook} size={size} />
            </button>
          );
        }}
      />
    );

  if (type === "twitter")
    return (
      <button
        className={className}
        onClick={() => window.location.replace(twitterUrl)}
        data-automation={dataAutomation}
      >
        <Icon icon={IconEnum.Twitter} size={size} />
      </button>
    );
};

export default OAuth;
