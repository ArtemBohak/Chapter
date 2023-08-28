import { FC, useMemo } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { type TwitterOAuthProps } from "./TwitterOAuth.type";
import { IconEnum } from "@/src/components/Icon";

import { Icon } from "@/src/components/Icon";

const {
  VITE_TWITTER_CONSUMER_KEY,
  VITE_TWITTER_CONSUMER_SECRET,
  VITE_TWITTER_CLIENT_ID,
  VITE_TWITTER_STATE,
} = import.meta.env;

// function getTwitterOauthUrl(redirectUri: string) {
//   const rootUrl = "https://twitter.com/i/oauth2/authorize";
//   const options = {
//     redirect_uri: redirectUri,
//     client_id: VITE_TWITTER_CLIENT_ID,
//     state: VITE_TWITTER_STATE,
//     response_type: "code",
//     code_challenge: "challenge",
//     code_challenge_method: "plain",
//     scope: ["users.read", "tweet.read", "follows.read", "follows.write"].join(
//       " "
//     ),
//   };
//   const qs = new URLSearchParams(options).toString();
//   return `${rootUrl}?${qs}`;
// }

const TwitterOAuth: FC<TwitterOAuthProps> = ({ className, size = 24 }) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const params = useMemo(
    () => Object.fromEntries([...searchParams]),
    [searchParams]
  );
  const { state, code } = params;

  const currentLocation = window.location.origin;

  const onHandleClick = () => {};

  return (
    <button className={className}>
      <Icon icon={IconEnum.Twitter} size={size} />
    </button>
  );
};

export default TwitterOAuth;

//  <a
//    href={getTwitterOauthUrl(currentLocation + location.pathname)}
//    className={className}
//  >
//    <Icon icon={IconEnum.Twitter} size={size} />
//  </a>;

//  <button className={className} onClick={onHandleClick}>
//    <Icon icon={IconEnum.Twitter} size={size} />
//  </button>;
