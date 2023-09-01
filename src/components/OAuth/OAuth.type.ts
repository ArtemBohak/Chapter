import { AxiosResponse, AxiosError, AxiosPromise } from "axios";

export type OAuthProps = {
  className?: string;
  size?: number;
  url?: string;
  facebookUxMode?: boolean;
  googleUxMode?: "popup" | "redirect";
  type: "facebook" | "google" | "twitter";
};

export type UseOAuthProps = Pick<OAuthProps, "url" | "googleUxMode" | "type">;

export type OAuthResponse = { id_token?: string };

export type ApiData = {
  facebookAccessToken?: string;
  idToken?: string;
  redirectUri?: string;
  googleCode?: string;
};

export type TryCatchWrapperCb = (
  data: ApiData
) => AxiosPromise<AxiosResponse | AxiosError>;

export enum OAuthApiEndPoints {
  GOOGLE_TOKEN = "/token",
}
