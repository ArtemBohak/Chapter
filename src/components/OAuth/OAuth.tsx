import { FC } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";

import { useOAuth } from "./hooks";
import { type OAuthProps } from "./OAuth.type";

import { UIbutton } from "@/src/components/Buttons";
import { Icon } from "@/src/components/Icon";
import { IconEnum } from "@/src/components/Icon";

const OAuth: FC<OAuthProps> = ({
  type,
  text = "Enter with",
  size = 24,

  facebookUxMode = true,
  googleUxMode,
  dataAutomation = "oAuthButton",
  className,
}) => {
  const {
    twitterUrl,
    onFacebookOauthSuccess,
    onFacebookOauthFail,
    currentLocation,
    googleOAuthLogin,
  } = useOAuth({ type, googleUxMode });

  if (type === "google")
    return (
      <UIbutton
        className={className}
        onClick={() => googleOAuthLogin()}
        dataAutomation={dataAutomation}
        fullWidth
        variant="outlined"
        color="secondary"
      >
        <Icon icon={IconEnum.Google} size={size} />
        <span>
          {text} {type}
        </span>
      </UIbutton>
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
            <UIbutton
              className={className}
              onClick={renderProps.onClick}
              dataAutomation={dataAutomation}
              fullWidth
              variant="outlined"
              color="secondary"
            >
              <Icon icon={IconEnum.Facebook} size={size} />
              <span>
                {text} {type}
              </span>
            </UIbutton>
          );
        }}
      />
    );

  if (type === "twitter")
    return (
      <UIbutton
        className={className}
        onClick={() => window.location.replace(twitterUrl)}
        dataAutomation={dataAutomation}
        fullWidth
        variant="outlined"
        color="secondary"
      >
        <Icon icon={IconEnum.Twitter} size={size} />
        <span>
          {text} {type}
        </span>
      </UIbutton>
    );
};

export default OAuth;
