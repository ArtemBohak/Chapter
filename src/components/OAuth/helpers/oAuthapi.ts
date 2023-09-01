import { googleOAuthApi, api, EndpointsEnum } from "@/src/axios";
import tryCatchWrapper from "./tryCatchWrapper";
import { type ApiData, OAuthApiEndPoints } from "../OAuth.type";

const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_CLIENT_SECRET } = import.meta.env;

export const getGoogleAuthCode = tryCatchWrapper(async (data: ApiData) => {
  const response = await googleOAuthApi.post(
    OAuthApiEndPoints.GOOGLE_TOKEN,
    null,
    {
      params: {
        grant_type: "authorization_code",
        client_id: VITE_GOOGLE_CLIENT_ID,
        client_secret: VITE_GOOGLE_CLIENT_SECRET,
        redirect_uri: data.redirectUri,
        code: data.googleCode,
      },
    }
  );

  return response.data;
});

export const facebookApi = tryCatchWrapper(async (data: ApiData) => {
  const response = await api.post(EndpointsEnum.FACEBOOK_LOGIN, {
    accessToken: data.facebookAccessToken,
  });
  return response.data;
});

export const googleApi = tryCatchWrapper(async (data: ApiData) => {
  const response = await api.post(EndpointsEnum.GOOGLE_LOGIN, {
    idToken: data.idToken,
  });
  return response.data;
});
