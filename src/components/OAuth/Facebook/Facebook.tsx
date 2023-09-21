import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FacebookLogin, {
  SuccessResponse,
  FailResponse,
  ProfileSuccessResponse,
} from "@greatsumini/react-facebook-login";

import useGetUrlParams from "../useGetUrlParams";
import FacebookApi from "./FacebookApi";
import { getUrlParams } from "../helpers";
import { useAppDispatch } from "@/src/redux/hooks";
import { SocialsProps } from "../OAuth.type";
import styles from "../OAuth.module.scss";

import { Icon, IconEnum } from "../../Icon";
import { UIbutton } from "@/src/components/Buttons";

const { VITE_BASE_OAUTH_STATE, VITE_FACEBOOK_APP_ID, VITE_FACEBOOK_STATE } =
  import.meta.env;

const Facebook: FC<SocialsProps> = ({
  stateId,
  oAuthVariant,
  facebookPopupMode = false,
  text = "Enter with",
  iconSize = 24,
  buttonSize = "small",
  buttonColor = "secondary",
  buttonVariant = "outlined",
  dataAutomation = "oAuthButton",
  className,
}) => {
  const { currentLocation, setSearchParams, error_message } = useGetUrlParams();
  const [facebookErrorMessage, setFacebookErrorMessage] = useState<
    string | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [facebookCode, faceBookState] = getUrlParams(
    location.hash.slice(1),
    "access_token",
    "state"
  );
  const [facebookAuthCode, setFacebookAuthCode] = useState(facebookCode);

  console.log(facebookErrorMessage);

  useEffect(() => {
    if (error_message) {
      setFacebookErrorMessage(error_message);
      setSearchParams("");
    }
  }, [error_message, setFacebookErrorMessage, setSearchParams]);

  useEffect(() => {
    (async () => {
      if (
        oAuthVariant === "facebook" &&
        facebookAuthCode &&
        (faceBookState === VITE_FACEBOOK_STATE + stateId ||
          faceBookState === VITE_FACEBOOK_STATE + VITE_BASE_OAUTH_STATE)
      ) {
        const facebook = new FacebookApi({
          token: facebookAuthCode,
          setSearchParams,
          navigate,
          setIsLoading,
          setAuthCode: setFacebookAuthCode,
          dispatch,
        });
        await facebook.login();
      }
    })();
  }, [
    dispatch,
    faceBookState,
    facebookAuthCode,
    navigate,
    oAuthVariant,
    setSearchParams,
    stateId,
  ]);

  const onFacebookOauthSuccess = async (codeResponse: SuccessResponse) => {
    const facebook = new FacebookApi({
      token: codeResponse.accessToken,
      navigate,
      setIsLoading,
      dispatch,
    });
    await facebook.login();
  };

  const onFacebookOauthFail = (error: FailResponse) => {
    setFacebookErrorMessage(error.status);
  };

  const onFacebookOauthProfileSuccess = (response: ProfileSuccessResponse) => {
    console.log("Get Facebook Profile Success!", response);
  };
  return (
    <FacebookLogin
      appId={VITE_FACEBOOK_APP_ID}
      autoLoad={false}
      useRedirect={!facebookPopupMode}
      fields="name,email,picture"
      onSuccess={onFacebookOauthSuccess}
      onFail={onFacebookOauthFail}
      onProfileSuccess={onFacebookOauthProfileSuccess}
      dialogParams={{
        state: VITE_FACEBOOK_STATE + stateId,
        redirect_uri: currentLocation,
        response_type: "token",
      }}
      render={(renderProps) => (
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
      )}
    />
  );
};

export default Facebook;
