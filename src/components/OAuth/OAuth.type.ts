import { SetURLSearchParams } from "react-router-dom";

import { AppDispatch } from "@/src/redux/store";
import { IUserStore } from "@/src/redux/types/user";

export enum OAuthApiEndPoints {
  GOOGLE_TOKEN = "/token",
}

export type OAuthProps = {
  className?: string;
  text?: string;
  buttonColor?: "primary" | "secondary";
  buttonVariant?: "outlined" | "contained" | "text";
  buttonSize?: "small" | "medium" | "large";
  iconSize?: number;
  facebookPopupMode?: boolean;
  googlePopupMode?: boolean;
  oAuthVariant: "facebook" | "google" | "twitter";
  dataAutomation?: string;
};

export type SocialsProps = { stateId: string } & Partial<OAuthProps>;

export type OAuthApiArgs = {
  redirectUri?: string;
  token?: string;
  setSearchParams?: SetURLSearchParams | null;
  setAuthCode?: ((data: string) => void) | null;
  navigate: (data: string) => void;
  dispatch: AppDispatch;
  setIsLoading: (data: boolean) => void;
};

export type ApiData = {
  user: IUserStore;
  token: string;
  tokenExpires: string;
};
