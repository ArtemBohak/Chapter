import { FC, useEffect } from "react";
import { nanoid } from "nanoid";
import FacebookLogin from "@greatsumini/react-facebook-login";

import { useOAuth } from "./hooks";
import { type OAuthProps } from "./OAuth.type";
import { getCookie } from "./helpers";
import styles from "./OAuth.module.scss";

import { UIbutton } from "@/src/components/Buttons";
import { Icon } from "@/src/components/Icon";
import { IconEnum } from "@/src/components/Icon";

const {
  VITE_BASE_OAUTH_STATE,
  VITE_STATE_ID_COOKIE_LIFETIME,
  VITE_FACEBOOK_APP_ID,
  VITE_FACEBOOK_STATE,
} = import.meta.env;

const OAuth: FC<OAuthProps> = ({
  oAuthVariant,
  googlePopupMode = false,
  facebookPopupMode = false,
  text = "Enter with",
  iconSize = 24,
  buttonSize = "small",
  buttonColor = "secondary",
  buttonVariant = "outlined",
  dataAutomation = "oAuthButton",
  className,
}) => {
  const stateId = getCookie("stateId")
    ? getCookie("stateId")
    : VITE_BASE_OAUTH_STATE;
  const {
    currentLocation,
    twitterRedirectUrl,
    isLoading,
    onFacebookOauthSuccess,
    onFacebookOauthFail,
    googleOAuthLogin,
  } = useOAuth({ oAuthVariant, googlePopupMode, stateId });

  useEffect(() => {
    if (!getCookie("stateId")) {
      document.cookie = `stateId=${nanoid()}; path=/; max-age=${VITE_STATE_ID_COOKIE_LIFETIME};`;
    }
  }, []);

  if (oAuthVariant === "google")
    return (
      <>
        <UIbutton
          className={`${styles["oauth-btn"]} ${className}`}
          onClick={() => googleOAuthLogin()}
          dataAutomation={dataAutomation}
          fullWidth
          variant={buttonVariant}
          isLoading={isLoading}
          disabled={isLoading}
          color={buttonColor}
          size={buttonSize}
        >
          <Icon icon={IconEnum.Google} size={iconSize} />
          <span>
            {text} {oAuthVariant}
          </span>
        </UIbutton>
      </>
    );

  if (oAuthVariant === "facebook")
    return (
      <FacebookLogin
        appId={VITE_FACEBOOK_APP_ID}
        autoLoad={false}
        useRedirect={!facebookPopupMode}
        fields="name,email,picture"
        onSuccess={onFacebookOauthSuccess}
        onFail={onFacebookOauthFail}
        dialogParams={{
          state: VITE_FACEBOOK_STATE + stateId,
          redirect_uri: currentLocation,
          response_type: "token",
        }}
        render={(renderProps) => {
          return (
            <>
              <UIbutton
                className={`${styles["oauth-btn"]} ${className}`}
                onClick={renderProps.onClick}
                dataAutomation={dataAutomation}
                fullWidth
                variant={buttonVariant}
                color={buttonColor}
                isLoading={isLoading}
                disabled={isLoading}
                size={buttonSize}
              >
                <Icon icon={IconEnum.Facebook} size={iconSize} />
                <span>
                  {text} {oAuthVariant}
                </span>
              </UIbutton>
            </>
          );
        }}
      />
    );

  if (oAuthVariant === "twitter")
    return (
      <>
        <UIbutton
          className={`${styles["oauth-btn"]} ${className}`}
          onClick={() => window.location.replace(twitterRedirectUrl)}
          dataAutomation={dataAutomation}
          fullWidth
          variant={buttonVariant}
          color={buttonColor}
          isLoading={isLoading}
          disabled={isLoading}
          size={buttonSize}
        >
          <Icon icon={IconEnum.Twitter} size={iconSize} />
          <span>
            {text} {oAuthVariant}
          </span>
        </UIbutton>
      </>
    );
};

export default OAuth;
