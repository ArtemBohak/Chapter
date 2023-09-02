import { googleOAuthApi, api, EndpointsEnum } from "@/src/axios";
import { type ApiData, OAuthApiEndPoints } from "../OAuth.type";

const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_CLIENT_SECRET } = import.meta.env;

export const getGoogleAuthCode = async ({ redirectUri, googleCode }: ApiData) =>
  googleOAuthApi.post(OAuthApiEndPoints.GOOGLE_TOKEN, null, {
    params: {
      grant_type: "authorization_code",
      client_id: VITE_GOOGLE_CLIENT_ID,
      client_secret: VITE_GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri,
      code: googleCode,
    },
  });

export const facebookApi = async ({ facebookAccessToken }: ApiData) =>
  api.post(EndpointsEnum.FACEBOOK_LOGIN, {
    accessToken: facebookAccessToken,
  });

export const googleApi = ({ googleIdToken }: ApiData) =>
  api.post(EndpointsEnum.GOOGLE_LOGIN, {
    idToken: googleIdToken,
  });
