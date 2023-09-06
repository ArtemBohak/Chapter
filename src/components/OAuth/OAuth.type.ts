import { SetURLSearchParams } from "react-router-dom";

export enum OAuthApiEndPoints {
  GOOGLE_TOKEN = "/token",
}
export type OAuthResponse = { data: { id_token?: string } };

export type OAuthProps = {
  className?: string;
  text?: string;
  size?: number;
  facebookPopupMode?: boolean;
  googlePopupMode?: boolean;
  variant: "facebook" | "google" | "twitter";
  dataAutomation?: string;
};

export type UseOAuthProps = Pick<OAuthProps, "googlePopupMode" | "variant">;

export type ApiDataArgs = {
  facebookAccessToken?: string;
  googleIdToken?: string;
  redirectUri?: string;
  googleCode?: string;
};

export type ErrorResponse = {
  error: string;
  error_description?: string;
  status: number;
  errors: { [key: string]: string };
};

export type OAuthApiArgs = {
  redirectUri?: string;
  token?: string;
  setSearchParams?: SetURLSearchParams | null;
  setAuthCode?: ((data: string) => void) | null;
  navigate: (data: string) => void;
};
