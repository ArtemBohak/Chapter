import { FC, useCallback } from "react";
import axios from "axios";
import oauthSignature from "oauth-signature";
import { LoginSocialTwitter, IResolveParams } from "reactjs-social-login";

import { type TwitterOAuthProps } from "./TwitterOAuth.type";
import { IconEnum } from "@/src/components/Icon";

import { Icon } from "@/src/components/Icon";

const { VITE_TWITTER_API_KEY, VITE_TWITTER_API_SECRET } = import.meta.env;

// const params = {
//   oauth_consumer_key: VITE_TWITTER_API_KEY,
//   oauth_version: "1.0",
//   oauth_signature_method: "HMAC-SHA1",
//   oauth_callback: "https://localhost:5173",
//   oauth_timestamp: Math.floor(Date.now() / 1000),
//   oauth_nonce: Math.random().toString(36).substr(2, 11),
// };

//  const url = "https://api.twitter.com/oauth/request_token";

//  const method = "POST";
//  const consumerSecret = VITE_TWITTER_API_SECRET;
//  const tokenSecret = "";
//  const signature = oauthSignature.generate(
//    method,
//    url,
//    params,
//    consumerSecret,
//    tokenSecret
//  );

const TwitterOAuth: FC<TwitterOAuthProps> = ({ className, size = 24 }) => {
  const REDIRECT_URI = "https://www.localhot:5173/register";

  // const onHandleClick = async () => {
  //   const headers = {
  //     Authorization: `OAuth oauth_callback="https://localhost:5173",oauth_consumer_key="${params.oauth_consumer_key}",oauth_nonce="${params.oauth_nonce}",oauth_signature="${signature}",oauth_signature_method="${params.oauth_signature_method}",oauth_timestamp="${params.oauth_timestamp}",oauth_version="${params.oauth_version}"`,
  //   };
  //   const res = await axios.post(url, null, {
  //     headers,
  //     params: { oauth_callback: "https://localhost:5173" },
  //   });
  //   console.log(res);
  // };

  return (
    <LoginSocialTwitter
      isOnlyGetToken
      fields="created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,public_metrics,url,username,verified,withheld"
      state="chapter"
      scope="users.read"
      client_id={VITE_TWITTER_API_KEY}
      redirect_uri={REDIRECT_URI}
      onLoginStart={console.log}
      onResolve={({ provider, data }: IResolveParams) => {
        console.log(provider);
        console.log(data);
      }}
      onReject={(err: any) => {
        console.log(err);
      }}
    >
      <button className={className}>
        <Icon icon={IconEnum.Twitter} size={size} />
      </button>
    </LoginSocialTwitter>
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
