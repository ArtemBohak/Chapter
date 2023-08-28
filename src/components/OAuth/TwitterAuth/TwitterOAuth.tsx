import { FC } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { type TwitterOAuthProps } from "./TwitterOAuth.type";
import { IconEnum } from "@/src/components/Icon";

import { Icon } from "@/src/components/Icon";

const { VITE_TWITTER_API_KEY, VITE_TWITTER_API_SECRET } = import.meta.env;

const TwitterOAuth: FC<TwitterOAuthProps> = ({ className, size = 24 }) => {
  const signature = oauthSignature.generate();
  const onHandleClick = async () => {
    const res = await axios.post(
      "https://api.twitter.com/oauth/request_token",
      null,
      {
        headers: {
          Authorization: `OAuth oauth_consumer_key="${VITE_TWITTER_API_KEY}", oauth_nonce="${nanoid()}", oauth_signature="oauth_signature", oauth_signature_method="HMAC-SHA1", oauth_timestamp="${Math.floor(
            new Date().getTime() / 1000
          )}", oauth_version="1.0"`,
          "Access-Control-Allow-Origin": window.location.origin,
        },
        params: { oauth_callback: "https://localhost:5173" },
      }
    );

    console.log(res);
  };

  return (
    <button className={className} onClick={onHandleClick}>
      <Icon icon={IconEnum.Twitter} size={size} />
    </button>
  );
};

export default TwitterOAuth;

// import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
// import { auth } from "twitter-api-sdk";

//  <a
//    href={getTwitterOauthUrl(currentLocation + location.pathname)}
//    className={className}
//  >
//    <Icon icon={IconEnum.Twitter} size={size} />
//  </a>;

//  <button className={className} onClick={onHandleClick}>
//    <Icon icon={IconEnum.Twitter} size={size} />
//  </button>;

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

// const [searchParams] = useSearchParams();
// const location = useLocation();
// const navigate = useNavigate();

// const params = useMemo(
//   () => Object.fromEntries([...searchParams]),
//   [searchParams]
// );
// const { state, code } = params;

// const currentLocation = window.location.origin;
