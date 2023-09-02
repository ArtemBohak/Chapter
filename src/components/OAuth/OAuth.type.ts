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

export type OAuthResponse = { data: { id_token?: string } };

export type ApiData = {
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

export type GoogleDataHandler = {
  token: string;
  redirectUri: string;
  url: string;
  setSearchParams?: SetURLSearchParams;
  setAuthCode?: (data: string) => void;
  navigate: (data: string) => void;
};

export type FacebookDataHandler = {
  token: string;
  url: string;
  setSearchParams?: SetURLSearchParams;
  setAuthCode?: (data: string) => void;
  navigate: (data: string) => void;
};

export type TwitterDataHandler = {
  token: string;
  url: string;
  setSearchParams?: SetURLSearchParams;
  setAuthCode?: (data: string) => void;
  navigate: (data: string) => void;
};
