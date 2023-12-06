import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";

import { IUserStore } from "@/src/redux";
import {
  ButtonColorType,
  ButtonVariantType,
  ButtonSizeType,
} from "../Buttons/UIbutton/UIbutton.type";
import { SetErrorType } from "@/src/types";

export enum OAuthApiEndPoints {
  GOOGLE_TOKEN = "/token",
}

export enum OAuthVariant {
  FACEBOOK = "facebook",
  GOOGLE = "google",
  TWITTER = "twitter",
}

export type OAuthProps = {
  className?: string;
  text?: string;
  buttonColor?: ButtonColorType;
  buttonVariant?: ButtonVariantType;
  buttonSize?: ButtonSizeType;
  iconSize?: number;
  facebookPopupMode?: boolean;
  googlePopupMode?: boolean;
  oAuthVariant: "facebook" | "google" | "twitter";
  dataAutomation?: string;
};

export type SocialsProps = { stateId: string } & OAuthProps;

export type SetIsLoadingType = Dispatch<SetStateAction<boolean>>;

export type OAuthApiArgs = {
  navigate: NavigateFunction;
  setIsLoading: SetIsLoadingType;
  setError: SetErrorType;
  redirectUri?: string;
  token?: string;
};

export type UserData = IUserStore;
