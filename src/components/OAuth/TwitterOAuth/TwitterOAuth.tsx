import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useGetOAthUrlParams from "../hooks/useGetOAthUrlParams";

import { type OAuthProps } from "../OAuth.type";
import { IconEnum } from "@/src/components/Icon";

import { Icon } from "@/src/components/Icon";

const TwitterOAuth: FC<OAuthProps> = ({ size = 24, className, url = "/" }) => {
  const { authCode, twitterUrl, state, setSearchParams, setAuthCode } =
    useGetOAthUrlParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (authCode && state === import.meta.env.VITE_TWITTER_STATE) {
        console.log("POST auth/twitter/login => ", authCode);
        setSearchParams("");
        setAuthCode("");
        navigate(url);
      }
    })();
  }, [authCode, navigate, setAuthCode, setSearchParams, state, url]);

  return (
    <button
      className={className}
      onClick={() => window.location.replace(twitterUrl)}
    >
      <Icon icon={IconEnum.Twitter} size={size} />
    </button>
  );
};

export default TwitterOAuth;
