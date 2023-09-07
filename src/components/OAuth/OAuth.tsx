import { FC, useEffect } from "react";
import { nanoid } from "nanoid";
import FacebookLogin from "@greatsumini/react-facebook-login";

import { useOAuth } from "./hooks";
import { type OAuthProps } from "./OAuth.type";
import { cookieParser } from "./helpers";

import { UIbutton } from "@/src/components/Buttons";
import { Icon } from "@/src/components/Icon";
import { IconEnum } from "@/src/components/Icon";

const OAuth: FC<OAuthProps> = ({
  variant,
  text = "Enter with",
  size = 24,
  facebookPopupMode = false,
  googlePopupMode,
  dataAutomation = "oAuthButton",
  className,
}) => {
  const {
    twitterUrl,
    onFacebookOauthSuccess,
    onFacebookOauthFail,
    currentLocation,
    googleOAuthLogin,
  } = useOAuth({ variant, googlePopupMode });

  const stateId = cookieParser()
    ? cookieParser("stateId")
    : import.meta.env.VITE_BASE_OAUTH_STATE;

  useEffect(() => {
    if (!cookieParser())
      document.cookie = `stateId=${nanoid()}; max-age=${
        import.meta.env.VITE_STATE_ID_COOKIE_LIFETIME
      }`;
  }, []);

  if (variant === "google")
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
          {text} {variant}
        </span>
      </UIbutton>
    );

  if (variant === "facebook")
    return (
      <FacebookLogin
        appId={import.meta.env.VITE_FACEBOOK_APP_ID}
        autoLoad={false}
        useRedirect={!facebookPopupMode}
        fields="name,email,picture"
        onSuccess={onFacebookOauthSuccess}
        onFail={onFacebookOauthFail}
        dialogParams={{
          state: import.meta.env.VITE_FACEBOOK_STATE + stateId,
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
                {text} {variant}
              </span>
            </UIbutton>
          );
        }}
      />
    );

  if (variant === "twitter")
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
          {text} {variant}
        </span>
      </UIbutton>
    );
};

export default OAuth;
