import { SetURLSearchParams } from "react-router-dom";

export enum OAuthApiEndPoints {
  GOOGLE_TOKEN = "/token",
}

export type OAuthProps = {
  className?: string;
  size?: number;
  url?: string;
  facebookUxMode?: boolean;
  googleUxMode?: "popup" | "redirect";
  type: "facebook" | "google" | "twitter";
  dataAutomation?: string;
};

export type UseOAuthProps = Pick<OAuthProps, "url" | "googleUxMode" | "type">;

export type ApiDataArgs = {
  facebookAccessToken?: string;
  googleIdToken?: string;
  redirectUri?: string;
  googleCode?: string;
};

export type OAuthResponse = { data: { id_token?: string } };

export type ErrorResponse = {
  error: string;
  error_description?: string;
  status: number;
  errors: { [key: string]: string };
};

export interface IOAuthApiType {
  redirectUri?: string;
  token?: string;
  url: string;
  setSearchParams?: SetURLSearchParams | null;
  setAuthCode?: ((data: string) => void) | null;
  navigate: (data: string) => void;
}
