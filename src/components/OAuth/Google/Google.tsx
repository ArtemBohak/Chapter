import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import GoogleApi from "./GoogleApi";
import { useGetUrlParams } from "../hooks";
import { SocialsProps, OAuthVariant } from "../OAuth.type";
import styles from "../OAuth.module.scss";

import { UIbutton } from "../../Buttons";
import { Icon, IconEnum } from "../..";

const { VITE_BASE_OAUTH_STATE, VITE_GOOGLE_STATE, VITE_GOOGLE_REDIRECT_URI } =
  import.meta.env;

const Google: FC<SocialsProps> = ({
  stateId,
  oAuthVariant,
  googlePopupMode = false,
  text = "Enter with",
  iconSize = 24,
  buttonSize = "small",
  buttonColor = "secondary",
  buttonVariant = "outlined",
  dataAutomation = "oAuthButton",
  className,
}) => {
  const { state, code, currentLocation, setSearchParams } = useGetUrlParams();
  const [googleAuthCode, setGoogleAuthCode] = useState(code);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      oAuthVariant === OAuthVariant.GOOGLE &&
      googleAuthCode &&
      (state === VITE_GOOGLE_STATE + stateId ||
        state === VITE_GOOGLE_STATE + VITE_BASE_OAUTH_STATE)
    ) {
      new GoogleApi({
        token: googleAuthCode,
        redirectUri: currentLocation,
        navigate,
        setIsLoading,
      });

      setGoogleAuthCode("");
      setSearchParams("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation, googleAuthCode, oAuthVariant, stateId, state]);

  const googleOAuthLogin = useGoogleLogin({
    flow: "auth-code",
    ux_mode: googlePopupMode ? "popup" : "redirect",
    redirect_uri: currentLocation,
    state: VITE_GOOGLE_STATE + stateId,
    onSuccess: async (codeResponse) => {
      if (
        codeResponse.state === VITE_GOOGLE_STATE + stateId ||
        codeResponse.state === VITE_GOOGLE_STATE + VITE_BASE_OAUTH_STATE
      ) {
        new GoogleApi({
          token: codeResponse.code,
          redirectUri: VITE_GOOGLE_REDIRECT_URI,
          navigate,
          setIsLoading,
        });
      }
    },
    onError: (error) => {
      console.log("Google Login Failed!", error);
    },
  });

  return (
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
  );
};

export default Google;
