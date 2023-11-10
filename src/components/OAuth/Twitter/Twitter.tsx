import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TwitterApi from "./TwitterApi";
import { useGetUrlParams } from "../hooks";
import { SocialsProps, OAuthVariant } from "../OAuth.type";
import styles from "../OAuth.module.scss";

import { Icon, IconEnum } from "../../Icon";
import { UIbutton } from "@/src/components/Buttons";

const { VITE_BASE_OAUTH_STATE, VITE_TWITTER_STATE } = import.meta.env;

const Twitter: FC<SocialsProps> = ({
  stateId,
  oAuthVariant,
  text = "Enter with",
  iconSize = 24,
  buttonSize = "small",
  buttonColor = "secondary",
  buttonVariant = "outlined",
  dataAutomation = "oAuthButton",
  className,
}) => {
  const { state, code, currentLocation, setSearchParams } = useGetUrlParams();
  const [twitterAuthCode, setTwitterAuthCode] = useState(code);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const twitterRedirectUrl = TwitterApi.createRedirectUrl(
    currentLocation,
    stateId
  );

  useEffect(() => {
    if (
      oAuthVariant === OAuthVariant.TWITTER &&
      twitterAuthCode &&
      (state === VITE_TWITTER_STATE + stateId ||
        state === VITE_TWITTER_STATE + VITE_BASE_OAUTH_STATE)
    ) {
      new TwitterApi({
        token: twitterAuthCode,
        navigate,
        setIsLoading,
      });

      setSearchParams("");
      setTwitterAuthCode("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, stateId, twitterAuthCode, oAuthVariant]);

  return (
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
  );
};

export default Twitter;
