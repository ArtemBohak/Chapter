import { oAuthApi, api, EndpointsEnum } from "@/src/axios";
import { tryCatchWrapper } from "@/src/utils";
import { OAuthApiEndPoints } from "./OAuth.type";
import { type Data } from "@/src/types";

const {
  VITE_GOOGLE_CLIENT_ID,
  VITE_GOOGLE_CLIENT_SECRET,
  VITE_TWITTER_STATE,
  VITE_TWITTER_CLIENT_ID,
  VITE_TWITTER_CODE_VERIFIER,
} = import.meta.env;

export const getGoogleAuthCode = tryCatchWrapper((data: Data) =>
  oAuthApi.post(OAuthApiEndPoints.GOOGLE_TOKEN, null, {
    params: {
      grant_type: "authorization_code",
      client_id: VITE_GOOGLE_CLIENT_ID,
      client_secret: VITE_GOOGLE_CLIENT_SECRET,
      redirect_uri: data.redirectUri,
      code: data.googleCode,
    },
  })
);

export const facebookOAuthApi = tryCatchWrapper((data: Data) =>
  api.post(EndpointsEnum.FACEBOOK_LOGIN, {
    accessToken: data.facebookAccessToken,
  })
);

export const getTwitterOAuthUrl = (redirectUri: string) => {
  const rootUrl = import.meta.env.VITE_TWITTER__AUTH_CODE_BASE_URL;
  const options = {
    redirect_uri: redirectUri,
    client_id: VITE_TWITTER_CLIENT_ID,
    state: VITE_TWITTER_STATE,
    response_type: "code",
    code_challenge: VITE_TWITTER_CODE_VERIFIER,
    code_challenge_method: "plain",
    scope: ["users.read", "offline.access"].join(" "),
  };
  const qs = new URLSearchParams(options).toString();
  return `${rootUrl}?${qs}`;
};
